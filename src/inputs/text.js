import { AbstractInput, defaults } from "./abstract";

export class Text extends AbstractInput{

    static defaults = Object.assign({}, defaults, {
        /**
        @property tpl
        @default <input type="text">
        **/
        tpl: '<input type="text">',
        /**
        Placeholder attribute of input. Shown when input is empty.

        @property placeholder
        @type string
        @default null
        **/
        placeholder: null,

        /**
        Whether to show `clear` button

        @property clear
        @type boolean
        @default true
        **/
        clear: true
    });

    constructor(options){
        super();
        this.init('text', options, Text.defaults);
    }

    render() {
        this.renderClear();
        this.setClass();
        this.setAttr('placeholder');
     }

     activate() {
         if(this.$input.is(':visible')) {
             this.$input.focus();
//                if (this.$input.is('input,textarea') && !this.$input.is('[type="checkbox"],[type="range"],[type="number"],[type="email"]')) {
             if (this.$input.is('input,textarea') && !this.$input.is('[type="checkbox"],[type="range"]')) {
                 $.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length);
             }

             if(this.toggleClear) {
                 this.toggleClear();
             }
         }
     }

     //render clear button
     renderClear() {
        if (this.options.clear) {
            this.$clear = $('<span class="editable-clear-x"></span>');
            this.$input.after(this.$clear)
                       .css('padding-right', 24)
                       .keyup($.proxy(function(e) {
                           //arrows, enter, tab, etc
                           if(~$.inArray(e.keyCode, [40,38,9,13,27])) {
                             return;
                           }

                           clearTimeout(this.t);
                           var that = this;
                           this.t = setTimeout(function() {
                             that.toggleClear(e);
                           }, 100);

                       }, this))
                       .parent().css('position', 'relative');

            this.$clear.click($.proxy(this.clear, this));
        }
     }

     postrender() {
         /*
         //now `clear` is positioned via css
         if(this.$clear) {
             //can position clear button only here, when form is shown and height can be calculated
//                var h = this.$input.outerHeight(true) || 20,
             var h = this.$clear.parent().height(),
                 delta = (h - this.$clear.height()) / 2;

             //this.$clear.css({bottom: delta, right: delta});
         }
         */
     }

     //show / hide clear button
     toggleClear(e) {
         if(!this.$clear) {
             return;
         }

         var len = this.$input.val().length,
             visible = this.$clear.is(':visible');

         if(len && !visible) {
             this.$clear.show();
         }

         if(!len && visible) {
             this.$clear.hide();
         }
     }

     clear() {
        this.$clear.hide();
        this.$input.val('').focus();
     }
}