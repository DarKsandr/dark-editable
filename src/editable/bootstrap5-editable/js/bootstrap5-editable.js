import { buttons, defaults as form_defaults, loading, template } from "../../../editable-form/editable-form";

export class EditableForm{
    constructor(div, options){
        this.options = Object.assign({}, form_defaults, options);
        this.div = div;
        if(!this.options.scope) {
            this.options.scope = this;
        }
    }

    initInput() {  //called once
        //take input from options (as it is created in editable-element)
        this.input = this.options.input;
        
        //set initial value
        //todo: may be add check: typeof str === 'string' ? 
        this.value = this.input.str2value(this.options.value); 
        
        //prerender: get input.$input
        this.input.prerender();
    }
    initTemplate() {
        this.form = template; 
    }
    initButtons() {
        const btn = this.form.querySelectorAll('.editable-buttons');
        btn.append(buttons);
        if(this.options.showbuttons === 'bottom') {
            btn.classList.add('editable-buttons-bottom');
        }
    }
    /**
    Renders editableform

    @method render
    **/        
    render() {
        //init loader
        this.loading = loading;
        this.div.innerHTML = '';
        this.div.append(this.loading);
        
        //init form template and buttons
        this.initTemplate();
        if(this.options.showbuttons) {
            this.initButtons();
        } else {
            this.form.querySelectorAll('.editable-buttons').forEach(element => {
                element.remove();
            });
        }

        //show loading state
        this.showLoading();            
        
        //flag showing is form now saving value to server. 
        //It is needed to wait when closing form.
        this.isSaving = false;
        
        /**        
        Fired when rendering starts
        @event rendering 
        @param {Object} event event object
        **/            
        this.div.triggerHandler('rendering');
        
        //init input
        this.initInput();
        
        //append input to form
        this.form.querySelectorAll('div.editable-input').forEach(element => {
            element.append(this.input.tpl);
        })
        
        //append form to container
        this.div.append(this.form);
        
        //render input
        this.input.render()
        .then(() => {
            //setup input to submit automatically when no buttons shown
            if(!this.options.showbuttons) {
                this.input.autosubmit(); 
            }
             
            //attach 'cancel' handler
            this.form.querySelectorAll('.editable-cancel').click($.proxy(this.cancel, this));
            
            if(this.input.error) {
                this.error(this.input.error);
                this.$form.find('.editable-submit').attr('disabled', true);
                this.input.$input.attr('disabled', true);
                //prevent form from submitting
                this.$form.submit(function(e){ e.preventDefault(); });
            } else {
                this.error(false);
                this.input.$input.removeAttr('disabled');
                this.$form.find('.editable-submit').removeAttr('disabled');
                var value = (this.value === null || this.value === undefined || this.value === '') ? this.options.defaultValue : this.value;
                this.input.value2input(value);
                //attach submit handler
                this.$form.submit($.proxy(this.submit, this));
            }

            /**        
            Fired when form is rendered
            @event rendered
            @param {Object} event event object
            **/            
            this.$div.triggerHandler('rendered');                

            this.showForm();
            
            //call postrender method to perform actions required visibility of form
            if(this.input.postrender) {
                this.input.postrender();
            }                
        });
    }
    cancel() {   
        /**        
        Fired when form was cancelled by user
        @event cancel 
        @param {Object} event event object
        **/              
        this.div.triggerHandler('cancel');
    }
    showLoading() {
        var w, h;
        if(this.form) {
            //set loading size equal to form
            w = this.form.outerWidth();
            h = this.form.outerHeight(); 
            if(w) {
                this.loading.width(w);
            }
            if(h) {
                this.loading.height(h);
            }
            this.form.hide();
        } else {
            //stretch loading to fill container width
            w = this.loading.parent().width();
            if(w) {
                this.loading.width(w);
            }
        }
        this.loading.show(); 
    }

    showForm(activate) {
        this.loading.hide();
        this.form.show();
        if(activate !== false) {
            this.input.activate(); 
        }
        /**        
        Fired when form is shown
        @event show 
        @param {Object} event event object
        **/                    
        this.div.triggerHandler('show');
    }

    error(msg) {
        var $group = this.$form.find('.control-group'),
            $block = this.$form.find('.editable-error-block'),
            lines;

        if(msg === false) {
            $group.removeClass($.fn.editableform.errorGroupClass);
            $block.removeClass($.fn.editableform.errorBlockClass).empty().hide(); 
        } else {
            //convert newline to <br> for more pretty error display
            if(msg) {
                lines = (''+msg).split('\n');
                for (var i = 0; i < lines.length; i++) {
                    lines[i] = $('<div>').text(lines[i]).html();
                }
                msg = lines.join('<br>');
            }
            $group.addClass($.fn.editableform.errorGroupClass);
            $block.addClass($.fn.editableform.errorBlockClass).html(msg).show();
        }
    }

    submit(e) {
        e.stopPropagation();
        e.preventDefault();
        
        //get new value from input
        var newValue = this.input.input2value(); 

        //validation: if validate returns string or truthy value - means error
        //if returns object like {newValue: '...'} => submitted value is reassigned to it
        var error = this.validate(newValue);
        if ($.type(error) === 'object' && error.newValue !== undefined) {
            newValue = error.newValue;
            this.input.value2input(newValue);
            if(typeof error.msg === 'string') {
                this.error(error.msg);
                this.showForm();
                return;
            }
        } else if (error) {
            this.error(error);
            this.showForm();
            return;
        } 
        
        //if value not changed --> trigger 'nochange' event and return
        /*jslint eqeq: true*/
        if (!this.options.savenochange && this.input.value2str(newValue) === this.input.value2str(this.value)) {
        /*jslint eqeq: false*/                
            /**        
            Fired when value not changed but form is submitted. Requires savenochange = false.
            @event nochange 
            @param {Object} event event object
            **/                    
            this.$div.triggerHandler('nochange');            
            return;
        } 

        //convert value for submitting to server
        var submitValue = this.input.value2submit(newValue);
        
        this.isSaving = true;
        
        //sending data to server
        $.when(this.save(submitValue))
        .done($.proxy(function(response) {
            this.isSaving = false;

            //run success callback
            var res = typeof this.options.success === 'function' ? this.options.success.call(this.options.scope, response, newValue) : null;

            //if success callback returns false --> keep form open and do not activate input
            if(res === false) {
                this.error(false);
                this.showForm(false);
                return;
            }

            //if success callback returns string -->  keep form open, show error and activate input               
            if(typeof res === 'string') {
                this.error(res);
                this.showForm();
                return;
            }

            //if success callback returns object like {newValue: <something>} --> use that value instead of submitted
            //it is useful if you want to chnage value in url-function
            if(res && typeof res === 'object' && res.hasOwnProperty('newValue')) {
                newValue = res.newValue;
            }

            //clear error message
            this.error(false);   
            this.value = newValue;
            /**        
            Fired when form is submitted
            @event save 
            @param {Object} event event object
            @param {Object} params additional params
            @param {mixed} params.newValue raw new value
            @param {mixed} params.submitValue submitted value as string
            @param {Object} params.response ajax response

            @example
            $('#form-div').on('save'), function(e, params){
                if(params.newValue === 'username') {...}
            });
            **/
            this.$div.triggerHandler('save', {newValue: newValue, submitValue: submitValue, response: response});
        }, this))
        .fail($.proxy(function(xhr) {
            this.isSaving = false;

            var msg;
            if(typeof this.options.error === 'function') {
                msg = this.options.error.call(this.options.scope, xhr, newValue);
            } else {
                msg = typeof xhr === 'string' ? xhr : xhr.responseText || xhr.statusText || 'Unknown error!';
            }

            this.error(msg);
            this.showForm();
        }, this));
    }

    save(submitValue) {
        //try parse composite pk defined as json string in data-pk 
        this.options.pk = $.fn.editableutils.tryParseJson(this.options.pk, true); 
        
        var pk = (typeof this.options.pk === 'function') ? this.options.pk.call(this.options.scope) : this.options.pk,
        /*
          send on server in following cases:
          1. url is function
          2. url is string AND (pk defined OR send option = always) 
        */
        send = !!(typeof this.options.url === 'function' || (this.options.url && ((this.options.send === 'always') || (this.options.send === 'auto' && pk !== null && pk !== undefined)))),
        params;

        if (send) { //send to server
            this.showLoading();

            //standard params
            params = {
                name: this.options.name || '',
                value: submitValue,
                pk: pk 
            };

            //additional params
            if(typeof this.options.params === 'function') {
                params = this.options.params.call(this.options.scope, params);  
            } else {
                //try parse json in single quotes (from data-params attribute)
                this.options.params = $.fn.editableutils.tryParseJson(this.options.params, true);   
                $.extend(params, this.options.params);
            }

            if(typeof this.options.url === 'function') { //user's function
                return this.options.url.call(this.options.scope, params);
            } else {  
                //send ajax to server and return deferred object
                return $.ajax($.extend({
                    url     : this.options.url,
                    data    : params,
                    type    : 'POST'
                }, this.options.ajaxOptions));
            }
        }
    }

    validate (value) {
        if (value === undefined) {
            value = this.value;
        }
        if (typeof this.options.validate === 'function') {
            return this.options.validate.call(this.options.scope, value);
        }
    }

    option(key, value) {
        if(key in this.options) {
            this.options[key] = value;
        }
        
        if(key === 'value') {
            this.setValue(value);
        }
        
        //do not pass option to input as it is passed in editable-element
    }

    setValue(value, convertStr) {
        if(convertStr) {
            this.value = this.input.str2value(value);
        } else {
            this.value = value;
        }
        
        //if form is visible, update input
        if(this.$form && this.$form.is(':visible')) {
            this.input.value2input(this.value);
        }            
    }
}

const defaults = {
    /**
    Initial value of form input

    @property value 
    @type mixed
    @default null
    @private
    **/        
    value: null,
    /**
    Placement of container relative to element. Can be <code>top|right|bottom|left</code>. Not used for inline container.

    @property placement 
    @type string
    @default 'top'
    **/        
    placement: 'top',
    /**
    Whether to hide container on save/cancel.

    @property autohide 
    @type boolean
    @default true
    @private 
    **/        
    autohide: true,
    /**
    Action when user clicks outside the container. Can be <code>cancel|submit|ignore</code>.  
    Setting <code>ignore</code> allows to have several containers open. 

    @property onblur 
    @type string
    @default 'cancel'
    @since 1.1.1
    **/        
    onblur: 'cancel',
    
    /**
    Animation speed (inline mode only)
    @property anim 
    @type string
    @default false
    **/        
    anim: false,
    
    /**
    Mode of editable, can be `popup` or `inline` 
    
    @property mode 
    @type string         
    @default 'popup'
    @since 1.4.0        
    **/        
    mode: 'popup'        
};

class Popup {

    containerName = null; //method to call container on element
    containerDataName = null; //object name in element's .data()
    innerCss = null; //tbd in child class
    containerClass = 'editable-container editable-popup'; //css class applied to container element
    defaults = {}; //container itself defaults

    constructor (element, options){
        this.init(element, options);
    }
    
    init(element, options) {
        this.element = element;
        //since 1.4.1 container do not use data-* directly as they already merged into options.
        this.options = Object.assign({}, defaults, options);         
        this.splitOptions();
        
        //set scope of form callbacks to element
        this.formOptions.scope = this.element; 
        
        this.initContainer();
        
        //flag to hide container, when saving value will finish
        this.delayedHide = false;

        //bind 'destroyed' listener to destroy container when element is removed from dom
        this.element.addEventListener('destroyed', () => {
            this.destroy()
        }); 
        
        //attach document handler to close containers on click / escape
        if(document?.dataset && !('editable-handlers-attached' in document.dataset)) {
            //close all on escape
            document.addEventListener('keyup', function(e){
                if (e.which === 27) {
                    $('.editable-open').editableContainer('hide', 'cancel');
                    //todo: return focus on element 
                }
            })

            //close containers when click outside 
            //(mousedown could be better than click, it closes everything also on drag drop)
            $(document).on('click.editable', function(e) {
                var $target = $(e.target), i,
                    exclude_classes = ['.editable-container', 
                                       '.ui-datepicker-header', 
                                       '.datepicker', //in inline mode datepicker is rendered into body
                                       '.modal-backdrop', 
                                       '.bootstrap-wysihtml5-insert-image-modal', 
                                       '.bootstrap-wysihtml5-insert-link-modal'
                                       ];

                // select2 has extra body click in IE
                // see: https://github.com/ivaynberg/select2/issues/1058 
                if ($('.select2-drop-mask').is(':visible')) {
                    return;
                }

                //check if element is detached. It occurs when clicking in bootstrap datepicker
                if (!$.contains(document.documentElement, e.target)) {
                    return;
                }

                //for some reason FF 20 generates extra event (click) in select2 widget with e.target = document
                //we need to filter it via construction below. See https://github.com/vitalets/x-editable/issues/199
                //Possibly related to http://stackoverflow.com/questions/10119793/why-does-firefox-react-differently-from-webkit-and-ie-to-click-event-on-selec
                if($target.is(document)) {
                    return;
                }
                
                //if click inside one of exclude classes --> no nothing
                for(i=0; i<exclude_classes.length; i++) {
                     if($target.is(exclude_classes[i]) || $target.parents(exclude_classes[i]).length) {
                         return;
                     }
                }
                  
                //close all open containers (except one - target)
                Popup.prototype.closeOthers(e.target);
            });
            
            $(document).data('editable-handlers-attached', true);
        }                        
    }

    //split options on containerOptions and formOptions
    splitOptions() {
        this.containerOptions = {};
        this.formOptions = {};
        
        //keys defined in container defaults go to container, others go to form
        for(var k in this.options) {
          if(k in this.defaults) {
             this.containerOptions[k] = this.options[k];
          } else {
             this.formOptions[k] = this.options[k];
          } 
        }
    }
    
    /*
    Returns jquery object of container
    @method tip()
    */         
    tip() {
        return this.container() ? this.container().$tip : null;
    }

    /* returns container object */
    container() {
        let container;
        //first, try get it by `containerDataName`
        if(this.containerDataName) {
            if(container = this.element.dataset[this.containerDataName]) {
                return container;
            }
        }
        //second, try `containerName`
        container = this.element.dataset[this.containerDataName];
        return container;
    }

    /* call native method of underlying container, e.g. this.$element.popover('method') */ 
    call() {
        // this.element[this.containerName].apply(this.element, arguments); 
    }
    
    initContainer(){
        this.call(this.containerOptions);
    }

    renderForm() {
        this.$form
        .editableform(this.formOptions)
        .on({
            save: $.proxy(this.save, this), //click on submit button (value changed)
            nochange: $.proxy(function(){ this.hide('nochange'); }, this), //click on submit button (value NOT changed)                
            cancel: $.proxy(function(){ this.hide('cancel'); }, this), //click on cancel button
            show: $.proxy(function() {
                if(this.delayedHide) {
                    this.hide(this.delayedHide.reason);
                    this.delayedHide = false;
                } else {
                    this.setPosition();
                }
            }, this), //re-position container every time form is shown (occurs each time after loading state)
            rendering: $.proxy(this.setPosition, this), //this allows to place container correctly when loading shown
            resize: $.proxy(this.setPosition, this), //this allows to re-position container when form size is changed 
            rendered: $.proxy(function(){
                /**        
                Fired when container is shown and form is rendered (for select will wait for loading dropdown options).  
                **Note:** Bootstrap popover has own `shown` event that now cannot be separated from x-editable's one.
                The workaround is to check `arguments.length` that is always `2` for x-editable.                     
                
                @event shown 
                @param {Object} event event object
                @example
                $('#username').on('shown', function(e, editable) {
                    editable.input.$input.val('overwriting value of input..');
                });                     
                **/                      
                /*
                 TODO: added second param mainly to distinguish from bootstrap's shown event. It's a hotfix that will be solved in future versions via namespaced events.  
                */
                this.$element.triggerHandler('shown', $(this.options.scope).data('editable')); 
            }, this) 
        })
        .editableform('render');
    } 

    /**
    Shows container with form
    @method show()
    @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
    **/
    /* Note: poshytip owerwrites this method totally! */          
    show (closeAll) {
        this.$element.addClass('editable-open');
        if(closeAll !== false) {
            //close all open containers (except this)
            this.closeOthers(this.$element[0]);  
        }
        
        //show container itself
        this.innerShow();
        this.tip().addClass(this.containerClass);

        /*
        Currently, form is re-rendered on every show. 
        The main reason is that we dont know, what will container do with content when closed:
        remove(), detach() or just hide() - it depends on container.
        
        Detaching form itself before hide and re-insert before show is good solution, 
        but visually it looks ugly --> container changes size before hide.  
        */             
        
        //if form already exist - delete previous data 
        if(this.$form) {
            //todo: destroy prev data!
            //this.$form.destroy();
        }

        this.$form = $('<div>');
        
        //insert form into container body
        if(this.tip().is(this.innerCss)) {
            //for inline container
            this.tip().append(this.$form); 
        } else {
            this.tip().find(this.innerCss).append(this.$form);
        } 
        
        //render form
        this.renderForm();
    }

    /**
    Hides container with form
    @method hide()
    @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|undefined (=manual)</code>
    **/         
    hide(reason) {  
        if(!this.tip() || !this.tip().is(':visible') || !this.$element.hasClass('editable-open')) {
            return;
        }
        
        //if form is saving value, schedule hide
        if(this.$form.data('editableform').isSaving) {
            this.delayedHide = {reason: reason};
            return;    
        } else {
            this.delayedHide = false;
        }

        this.$element.removeClass('editable-open');   
        this.innerHide();

        /**
        Fired when container was hidden. It occurs on both save or cancel.  
        **Note:** Bootstrap popover has own `hidden` event that now cannot be separated from x-editable's one.
        The workaround is to check `arguments.length` that is always `2` for x-editable. 

        @event hidden 
        @param {object} event event object
        @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|manual</code>
        @example
        $('#username').on('hidden', function(e, reason) {
            if(reason === 'save' || reason === 'cancel') {
                //auto-open next editable
                $(this).closest('tr').next().find('.editable').editable('show');
            } 
        });
        **/
        this.$element.triggerHandler('hidden', reason || 'manual');   
    }

    /* internal show method. To be overwritten in child classes */
    innerShow () {
         
    }

    /* internal hide method. To be overwritten in child classes */
    innerHide () {

    }
    
    /**
    Toggles container visibility (show / hide)
    @method toggle()
    @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
    **/          
    toggle(closeAll) {
        if(this.container() && this.tip() && this.tip().is(':visible')) {
            this.hide();
        } else {
            this.show(closeAll);
        } 
    }

    /*
    Updates the position of container when content changed.
    @method setPosition()
    */       
    setPosition() {
        //tbd in child class
    }

    save(e, params) {
        /**        
        Fired when new value was submitted. You can use <code>$(this).data('editableContainer')</code> inside handler to access to editableContainer instance
        
        @event save 
        @param {Object} event event object
        @param {Object} params additional params
        @param {mixed} params.newValue submitted value
        @param {Object} params.response ajax response
        @example
        $('#username').on('save', function(e, params) {
            //assuming server response: '{success: true}'
            var pk = $(this).data('editableContainer').options.pk;
            if(params.response && params.response.success) {
                alert('value: ' + params.newValue + ' with pk: ' + pk + ' saved!');
            } else {
                alert('error!'); 
            } 
        });
        **/             
        this.$element.triggerHandler('save', params);
        
        //hide must be after trigger, as saving value may require methods of plugin, applied to input
        this.hide('save');
    }

    /**
    Sets new option
    
    @method option(key, value)
    @param {string} key 
    @param {mixed} value 
    **/         
    option(key, value) {
        this.options[key] = value;
        if(key in this.containerOptions) {
            this.containerOptions[key] = value;
            this.setContainerOption(key, value); 
        } else {
            this.formOptions[key] = value;
            if(this.$form) {
                this.$form.editableform('option', key, value);  
            }
        }
    }
    
    setContainerOption(key, value) {
        this.call('option', key, value);
    }

    /**
    Destroys the container instance
    @method destroy()
    **/        
    destroy() {
        this.hide();
        this.innerDestroy();
        this.$element.off('destroyed');
        this.$element.removeData('editableContainer');
    }
    
    /* to be overwritten in child classes */
    innerDestroy() {
        
    }
    
    /*
    Closes other containers except one related to passed element. 
    Other containers can be cancelled or submitted (depends on onblur option)
    */
    closeOthers(element) {
        $('.editable-open').each(function(i, el){
            //do nothing with passed element and it's children
            if(el === element || $(el).find(element).length) {
                return;
            }

            //otherwise cancel or submit all open containers 
            var $el = $(el),
            ec = $el.data('editableContainer');

            if(!ec) {
                return;  
            }
            
            if(ec.options.onblur === 'cancel') {
                $el.data('editableContainer').hide('onblur');
            } else if(ec.options.onblur === 'submit') {
                $el.data('editableContainer').tip().find('form').submit();
            }
        });

    }
    
    /**
    Activates input of visible container (e.g. set focus)
    @method activate()
    **/         
    activate() {
        if(this.tip && this.tip().is(':visible') && this.$form) {
           this.$form.data('editableform').input.activate(); 
        }
    } 
}

class Inline {
    constructor (element, options){
        this.init(element, options);
    }
    
};  

export class EditableContainer{
    constructor(element, option){
        const dataKey = 'editableContainer',
        options = typeof option === 'object' && option,
        Constructor = (options.mode === 'inline') ? Inline : Popup;
        let data = element.dataset[dataKey];

        if (!data) {
            element.dataset[dataKey] = data = new Constructor(element, options);
        }

        // if (typeof option === 'string') { //call method 
        //     data[option].apply(data, Array.prototype.slice.call(args, 1));
        // }  
    }
}