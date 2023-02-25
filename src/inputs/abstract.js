import { htmlToElement } from "../editable-form/utils";

export const defaults = {  
    /**
    HTML template of input. Normally you should not change it.

    @property tpl 
    @type string
    @default ''
    **/   
    tpl: '',
    /**
    CSS class automatically applied to input
    
    @property inputclass 
    @type string
    @default null
    **/         
    inputclass: null,
    
    /**
    If `true` - html will be escaped in content of element via $.text() method.  
    If `false` - html will not be escaped, $.html() used.  
    When you use own `display` function, this option obviosly has no effect.
    
    @property escape 
    @type boolean
    @since 1.5.0
    @default true
    **/         
    escape: true,
            
    //scope for external methods (e.g. source defined as function)
    //for internal use only
    scope: null,
    
    //need to re-declare showbuttons here to get it's value from common config (passed only options existing in defaults)
    showbuttons: true 
}

export class AbstractInput{

    static defaults = defaults;
    
    /**
    Initializes input

    @method init() 
    **/
    init(type, options, defaults){
        this.type = type;
        this.options = Object.assign({}, defaults, options);
    }
 
    /*
    this method called before render to init $tpl that is inserted in DOM
    */
    prerender(){
        this.tpl = this.options.tpl; //whole tpl as jquery object    
        this.input = htmlToElement(this.tpl);         //control itself, can be changed in render method
        this.clear = null;              //clear button
        this.error = null;               //error message, if input cannot be rendered           
    }
    
    /**
     Renders input from tpl. Can return jQuery deferred object.
     Can be overwritten in child objects
 
     @method render()
    **/
    render() {
 
    }
 
    /**
     Sets element's html by value. 
 
     @method value2html(value, element)
     @param {mixed} value
     @param {DOMElement} element
    **/
    value2html(value, element) {
        const prepare_value = value.trim();
        if(this.options.escape){
            element.innerText = prepare_value
        } else {
            element.innerHTML = prepare_value;
        }
    }
 
    /**
     Converts element's html to value
 
     @method html2value(html)
     @param {string} html
     @returns {mixed}
    **/
    html2value(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.innerText;
    }
 
    /**
     Converts value to string (for internal compare). For submitting to server used value2submit().
 
     @method value2str(value) 
     @param {mixed} value
     @returns {string}
    **/
    value2str(value) {
        return String(value);
    }
 
    /**
     Converts string received from server into value. Usually from `data-value` attribute.
 
     @method str2value(str)
     @param {string} str
     @returns {mixed}
    **/
    str2value(str) {
        return str;
    }
    
    /**
     Converts value for submitting to server. Result can be string or object.
 
     @method value2submit(value) 
     @param {mixed} value
     @returns {mixed}
    **/
    value2submit(value) {
        return value;
    }
 
    /**
     Sets value of input.
 
     @method value2input(value) 
     @param {mixed} value
    **/
    value2input(value) {
        this.input.value = value;
    }
 
    /**
     Returns value of input. Value can be object (e.g. datepicker)
 
     @method input2value() 
    **/
    input2value() { 
        return this.input.value;
    }
 
    /**
     Activates input. For text it sets focus.
 
     @method activate() 
    **/
    activate() {
        if(this.input.style.display != 'none' && this.input.style.visibility != 'hidden') {
            this.input.focus();
        }
    }
 
    /**
     Creates input.
 
     @method clear() 
    **/        
    clear() {
        this.input.value = null;
    }
 
    /**
     method to escape html.
    **/
    escape(str) {
        const div = document.createElement('div');
        div.innerText = str;
        return div.innerHTML;
    }
    
    /**
     attach handler to automatically submit form when value changed (useful when buttons not shown)
    **/
    autosubmit() {
     
    }
    
    /**
    Additional actions when destroying element 
    **/
    destroy() {}
 
    // -------- helper functions --------
    setClass() {          
        if(this.options.inputclass) {
            this.input.classList.add(this.options.inputclass); 
        } 
    }
 
    setAttr(attr) {
        if (this.options[attr] !== undefined && this.options[attr] !== null) {
            this.input[attr] = this.options[attr];
        } 
    }
    
    option(key, value) {
         this.options[key] = value;
    }
}