var c = Object.defineProperty;
var f = (n, t, e) => t in n ? c(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var r = (n, t, e) => (f(n, typeof t != "symbol" ? t + "" : t, e), e);
const d = {
  /**
      HTML template of input. Normally you should not change it.
  
      @property tpl 
      @type string
      @default ''
      **/
  tpl: "",
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
  escape: !0,
  //scope for external methods (e.g. source defined as function)
  //for internal use only
  scope: null,
  //need to re-declare showbuttons here to get it's value from common config (passed only options existing in defaults)
  showbuttons: !0
};
class u {
  /**
      Initializes input
  
      @method init() 
      **/
  init(t, e, i) {
    this.type = t, this.options = Object.assign({}, i, e);
  }
  /*
  this method called before render to init $tpl that is inserted in DOM
  */
  prerender() {
    this.tpl = this.options.tpl, this.input = this.tpl, this.clear = null, this.error = null;
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
  value2html(t, e) {
    const i = t.trim();
    this.options.escape ? e.innerText = i : e.innerHTML = i;
  }
  /**
      Converts element's html to value
  
      @method html2value(html)
      @param {string} html
      @returns {mixed}
     **/
  html2value(t) {
    const e = document.createElement("div");
    return e.innerHTML = t, e.innerText;
  }
  /**
      Converts value to string (for internal compare). For submitting to server used value2submit().
  
      @method value2str(value) 
      @param {mixed} value
      @returns {string}
     **/
  value2str(t) {
    return String(t);
  }
  /**
      Converts string received from server into value. Usually from `data-value` attribute.
  
      @method str2value(str)
      @param {string} str
      @returns {mixed}
     **/
  str2value(t) {
    return t;
  }
  /**
      Converts value for submitting to server. Result can be string or object.
  
      @method value2submit(value) 
      @param {mixed} value
      @returns {mixed}
     **/
  value2submit(t) {
    return t;
  }
  /**
      Sets value of input.
  
      @method value2input(value) 
      @param {mixed} value
     **/
  value2input(t) {
    this.input.value = t;
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
    this.input.style.display != "none" && this.input.style.visibility != "hidden" && this.input.focus();
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
  escape(t) {
    const e = document.createElement("div");
    return e.innerText = t, e.innerHTML;
  }
  /**
   attach handler to automatically submit form when value changed (useful when buttons not shown)
  **/
  autosubmit() {
  }
  /**
  Additional actions when destroying element 
  **/
  destroy() {
  }
  // -------- helper functions --------
  setClass() {
    this.options.inputclass && this.input.classList.add(this.options.inputclass);
  }
  setAttr(t) {
    this.options[t] !== void 0 && this.options[t] !== null && (this.input[t] = this.options[t]);
  }
  option(t, e) {
    this.options[t] = e;
  }
}
r(u, "defaults", d);
const p = class extends u {
  constructor(t) {
    super(), this.init("text", t, p.defaults);
  }
  render() {
    this.renderClear(), this.setClass(), this.setAttr("placeholder");
  }
  activate() {
    this.$input.is(":visible") && (this.$input.focus(), this.$input.is("input,textarea") && !this.$input.is('[type="checkbox"],[type="range"]') && $.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length), this.toggleClear && this.toggleClear());
  }
  //render clear button
  renderClear() {
    this.options.clear && (this.$clear = $('<span class="editable-clear-x"></span>'), this.$input.after(this.$clear).css("padding-right", 24).keyup($.proxy(function(t) {
      if (!~$.inArray(t.keyCode, [40, 38, 9, 13, 27])) {
        clearTimeout(this.t);
        var e = this;
        this.t = setTimeout(function() {
          e.toggleClear(t);
        }, 100);
      }
    }, this)).parent().css("position", "relative"), this.$clear.click($.proxy(this.clear, this)));
  }
  postrender() {
  }
  //show / hide clear button
  toggleClear(t) {
    if (this.$clear) {
      var e = this.$input.val().length, i = this.$clear.is(":visible");
      e && !i && this.$clear.show(), !e && i && this.$clear.hide();
    }
  }
  clear() {
    this.$clear.hide(), this.$input.val("").focus();
  }
};
let o = p;
r(o, "defaults", Object.assign({}, d, {
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
  clear: !0
}));
const a = {
  abstractinput: u,
  text: o
};
function m(n, t, e) {
  let i, s, l = {};
  if (!Array.isArray(t) || !t.length)
    return l;
  for (var h = 0; h < t.length; h++)
    i = t[h], n.hasOwnProperty(i) && (l[i] = n[i]), e !== !0 && (s = i.toLowerCase(), n.hasOwnProperty(s) && (l[i] = n[s]));
  return l;
}
function v(n) {
  const t = {}, e = n.dataset;
  for (const i in e) {
    const s = e[i];
    (typeof s != "object" || s && typeof s == "object" && (s.constructor === Object || s.constructor === Array)) && (t[i] = s);
  }
  return t;
}
function y(n) {
  if (Object.keys)
    return Object.keys(n);
  {
    if (n !== Object(n))
      throw new TypeError("Object.keys called on a non-object");
    const t = [];
    for (const e in n)
      Object.prototype.hasOwnProperty.call(n, e) && t.push(e);
    return t;
  }
}
function b(n) {
  let t, e, i, s = n.type;
  return s === "date" && (n.mode === "inline" ? a.datefield ? s = "datefield" : a.dateuifield && (s = "dateuifield") : a.date ? s = "date" : a.dateui && (s = "dateui"), s === "date" && !a.date && (s = "combodate")), s === "datetime" && n.mode === "inline" && (s = "datetimefield"), s === "wysihtml5" && !$.fn.editabletypes[s] && (s = "textarea"), typeof a[s] == "function" ? (t = a[s], e = m(n, y(t.defaults)), i = new t(e), i) : (console.error(`Unknown type: ${s}`), !1);
}
function g() {
  let n = document.body || document.documentElement, t = n.style, e = "transition", i = ["Moz", "Webkit", "Khtml", "O", "ms"];
  if (typeof t[e] == "string")
    return !0;
  e = e.charAt(0).toUpperCase() + e.substr(1);
  for (let s = 0; s < i.length; s++)
    if (typeof t[i[s] + e] == "string")
      return !0;
  return !1;
}
function x(n) {
  return !(n.style.display === "none" || n.style.visibility === "hidden");
}
const w = {
  container: null
};
class L {
  constructor(t, e = {}) {
    this.element = t, this.options = Object.assign({}, E, e, v(this.element)), this.options.selector ? this.initLive() : this.init(), this.options.highlight && !g() && (this.options.highlight = !1);
  }
  init() {
    let t = !1, e;
    if (this.options.name = this.options.name || this.element.id, this.options.scope = this.element, this.input = b(this.options), !!this.input) {
      switch (this.options.value === void 0 || this.options.value === null ? (this.value = this.input.html2value(this.element.innerHTML.trim()), t = !0) : (this.options.value = $.fn.editableutils.tryParseJson(this.options.value, !0), typeof this.options.value == "string" ? this.value = this.input.str2value(this.options.value) : this.value = this.options.value), this.element.classList.add("editable"), this.input.type === "textarea" && this.element.addClass("editable-pre-wrapped"), this.options.toggle !== "manual" ? (this.element.classList.add("editable-click"), this.element.addEventListener(this.options.toggle, (i) => {
        if (this.options.disabled || i.preventDefault(), this.options.toggle === "mouseenter")
          this.show();
        else {
          var s = this.options.toggle !== "click";
          this.toggle(s);
        }
      })) : this.element.tabindex = -1, typeof this.options.display == "function" && (this.options.autotext = "always"), this.options.autotext) {
        case "always":
          e = !0;
          break;
        case "auto":
          e = !this.element.innerText.trim().length && this.value !== null && this.value !== void 0 && !t;
          break;
        default:
          e = !1;
      }
      (async () => e ? await this.render() : Promise.resolve)().then(() => {
        this.options.disabled ? this.disable() : this.enable(), this.element.dispatchEvent(new Event("init"));
      });
    }
  }
  /*
   Initializes parent element for live editables 
  */
  initLive() {
    var t = this.options.selector;
    this.options.selector = !1, this.options.autotext = "never", this.$element.on(this.options.toggle + ".editable", t, $.proxy(function(e) {
      var i = $(e.target).closest(t);
      i.data("editable") || (i.hasClass(this.options.emptyclass) && i.empty(), i.editable(this.options).trigger(e));
    }, this));
  }
  /*
  Renders value into element's text.
  Can call custom display method from options.
  Can return deferred object.
  @method render()
  @param {mixed} response server response (if exist) to pass into display function
  */
  render(t) {
    return new Promise((e, i) => this.options.display === !1 ? i : this.input.value2htmlFinal ? e(this.input.value2html(this.value, this.element, this.options.display, t)) : typeof this.options.display == "function" ? e(this.options.display.call(this.element, this.value, t)) : e(this.input.value2html(this.value, this.element)));
  }
  /**
  Enables editable
  @method enable()
  **/
  enable() {
    this.options.disabled = !1, this.element.classList.remove("editable-disabled"), this.handleEmpty(this.isEmpty), this.options.toggle !== "manual" && this.element.tabindex === "-1" && this.element.removeAttribute("tabindex");
  }
  /**
  Disables editable
  @method disable()
  **/
  disable() {
    this.options.disabled = !0, this.hide(), this.$element.addClass("editable-disabled"), this.handleEmpty(this.isEmpty), this.$element.attr("tabindex", -1);
  }
  /**
  Toggles enabled / disabled state of editable element
  @method toggleDisabled()
  **/
  toggleDisabled() {
    this.options.disabled ? this.enable() : this.disable();
  }
  /**
  Sets new option
  
  @method option(key, value)
  @param {string|object} key option name or object with several options
  @param {mixed} value option new value
  @example
  $('.editable').editable('option', 'pk', 2);
  **/
  option(t, e) {
    if (t && typeof t == "object") {
      $.each(t, $.proxy(function(i, s) {
        this.option($.trim(i), s);
      }, this));
      return;
    }
    if (this.options[t] = e, t === "disabled")
      return e ? this.disable() : this.enable();
    t === "value" && this.setValue(e), this.container && this.container.option(t, e), this.input.option && this.input.option(t, e);
  }
  /*
  * set emptytext if element is empty
  */
  handleEmpty(t) {
    this.options.display !== !1 && (t !== void 0 ? this.isEmpty = t : typeof this.input.isEmpty == "function" ? this.isEmpty = this.input.isEmpty(this.element) : this.isEmpty = this.element.innerHTML.trim() === "", this.options.disabled ? this.isEmpty && (this.element.empty(), this.options.emptyclass && this.element.classList.remove(this.options.emptyclass)) : this.isEmpty ? (this.element.innerHTML = this.options.emptytext, this.options.emptyclass && this.element.classList.add(this.options.emptyclass)) : this.options.emptyclass && this.element.classList.remove(this.options.emptyclass));
  }
  /**
  Shows container with form
  @method show()
  @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
  **/
  show(t = !0) {
    if (!this.options.disabled) {
      if (this.container) {
        if (this.container.tip().is(":visible"))
          return;
      } else {
        const e = Object.assign({}, this.options, {
          value: this.value,
          input: this.input
          //pass input to form (as it is already created)
        });
        this.container = new w.container(this.element, e), this.element.addEventListener("save.internal", this.save);
      }
      this.container.show(t);
    }
  }
  /**
  Hides container with form
  @method hide()
  **/
  hide() {
    this.container && this.container.hide();
  }
  /**
  Toggles container visibility (show / hide)
  @method toggle()
  @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
  **/
  toggle(t) {
    this.container && x(this.container.tip()) ? this.hide() : this.show(t);
  }
  /*
  * called when form was submitted
  */
  save(t, e) {
    if (this.options.unsavedclass) {
      var i = !1;
      i = i || typeof this.options.url == "function", i = i || this.options.display === !1, i = i || e.response !== void 0, i = i || this.options.savenochange && this.input.value2str(this.value) !== this.input.value2str(e.newValue), i ? this.$element.removeClass(this.options.unsavedclass) : this.$element.addClass(this.options.unsavedclass);
    }
    if (this.options.highlight) {
      var s = this.$element, l = s.css("background-color");
      s.css("background-color", this.options.highlight), setTimeout(function() {
        l === "transparent" && (l = ""), s.css("background-color", l), s.addClass("editable-bg-transition"), setTimeout(function() {
          s.removeClass("editable-bg-transition");
        }, 1700);
      }, 10);
    }
    this.setValue(e.newValue, !1, e.response);
  }
  validate() {
    if (typeof this.options.validate == "function")
      return this.options.validate.call(this, this.value);
  }
  /**
  Sets new value of editable
  @method setValue(value, convertStr)
  @param {mixed} value new value 
  @param {boolean} convertStr whether to convert value from string to internal format
  **/
  setValue(t, e, i) {
    e ? this.value = this.input.str2value(t) : this.value = t, this.container && this.container.option("value", this.value), $.when(this.render(i)).then($.proxy(function() {
      this.handleEmpty();
    }, this));
  }
  /**
  Activates input of visible container (e.g. set focus)
  @method activate()
  **/
  activate() {
    this.container && this.container.activate();
  }
  /**
  Removes editable feature from element
  @method destroy()
  **/
  destroy() {
    this.disable(), this.container && this.container.destroy(), this.input.destroy(), this.options.toggle !== "manual" && (this.$element.removeClass("editable-click"), this.$element.off(this.options.toggle + ".editable")), this.$element.off("save.internal"), this.$element.removeClass("editable editable-open editable-disabled"), this.$element.removeData("editable");
  }
}
const E = {
  /**
      Type of input. Can be <code>text|textarea|select|date|checklist</code> and more
  
      @property type 
      @type string
      @default 'text'
      **/
  type: "text",
  /**
      Sets disabled state of editable
  
      @property disabled 
      @type boolean
      @default false
      **/
  disabled: !1,
  /**
      How to toggle editable. Can be <code>click|dblclick|mouseenter|manual</code>.   
      When set to <code>manual</code> you should manually call <code>show/hide</code> methods of editable.    
      **Note**: if you call <code>show</code> or <code>toggle</code> inside **click** handler of some DOM element, 
      you need to apply <code>e.stopPropagation()</code> because containers are being closed on any click on document.
      
      @example
      $('#edit-button').click(function(e) {
          e.stopPropagation();
          $('#username').editable('toggle');
      });
  
      @property toggle 
      @type string
      @default 'click'
      **/
  toggle: "click",
  /**
      Text shown when element is empty.
  
      @property emptytext 
      @type string
      @default 'Empty'
      **/
  emptytext: "Empty",
  /**
      Allows to automatically set element's text based on it's value. Can be <code>auto|always|never</code>. Useful for select and date.
      For example, if dropdown list is <code>{1: 'a', 2: 'b'}</code> and element's value set to <code>1</code>, it's html will be automatically set to <code>'a'</code>.  
      <code>auto</code> - text will be automatically set only if element is empty.  
      <code>always|never</code> - always(never) try to set element's text.
  
      @property autotext 
      @type string
      @default 'auto'
      **/
  autotext: "auto",
  /**
  Initial value of input. If not set, taken from element's text.  
  Note, that if element's text is empty - text is automatically generated from value and can be customized (see `autotext` option).  
  For example, to display currency sign:
  @example
  <a id="price" data-type="text" data-value="100"></a>
  <script>
  $('#price').editable({
      ...
      display: function(value) {
        $(this).text(value + '$');
      } 
  }) 
  <\/script>
          
  @property value 
  @type mixed
  @default element's text
  **/
  value: null,
  /**
  Callback to perform custom displaying of value in element's text.  
  If `null`, default input's display used.  
  If `false`, no displaying methods will be called, element's text will never change.  
  Runs under element's scope.  
  _**Parameters:**_  
  
  * `value` current value to be displayed
  * `response` server response (if display called after ajax submit), since 1.4.0
   
  For _inputs with source_ (select, checklist) parameters are different:  
    
  * `value` current value to be displayed
  * `sourceData` array of items for current input (e.g. dropdown items) 
  * `response` server response (if display called after ajax submit), since 1.4.0
            
  To get currently selected items use `$.fn.editableutils.itemsByValue(value, sourceData)`.
  
  @property display 
  @type function|boolean
  @default null
  @since 1.2.0
  @example
  display: function(value, sourceData) {
     //display checklist as comma-separated values
     var html = [],
         checked = $.fn.editableutils.itemsByValue(value, sourceData);
         
     if(checked.length) {
         $.each(checked, function(i, v) { html.push($.fn.editableutils.escape(v.text)); });
         $(this).html(html.join(', '));
     } else {
         $(this).empty(); 
     }
  }
  **/
  display: null,
  /**
      Css class applied when editable text is empty.
  
      @property emptyclass 
      @type string
      @since 1.4.1        
      @default editable-empty
      **/
  emptyclass: "editable-empty",
  /**
      Css class applied when value was stored but not sent to server (`pk` is empty or `send = 'never'`).  
      You may set it to `null` if you work with editables locally and submit them together.  
  
      @property unsavedclass 
      @type string
      @since 1.4.1        
      @default editable-unsaved
      **/
  unsavedclass: "editable-unsaved",
  /**
      If selector is provided, editable will be delegated to the specified targets.  
      Usefull for dynamically generated DOM elements.  
      **Please note**, that delegated targets can't be initialized with `emptytext` and `autotext` options, 
      as they actually become editable only after first click.  
      You should manually set class `editable-click` to these elements.  
      Also, if element originally empty you should add class `editable-empty`, set `data-value=""` and write emptytext into element:
  
      @property selector 
      @type string
      @since 1.4.1        
      @default null
      @example
      <div id="user">
        <!-- empty -->
        <a href="#" data-name="username" data-type="text" class="editable-click editable-empty" data-value="" title="Username">Empty</a>
        <!-- non-empty -->
        <a href="#" data-name="group" data-type="select" data-source="/groups" data-value="1" class="editable-click" title="Group">Operator</a>
      </div>     
      
      <script>
      $('#user').editable({
          selector: 'a',
          url: '/post',
          pk: 1
      });
      <\/script>
      **/
  selector: null,
  /**
  Color used to highlight element after update. Implemented via CSS3 transition, works in modern browsers.
  
  @property highlight 
  @type string|boolean
  @since 1.4.5        
  @default #FFFF80 
  **/
  highlight: "#FFFF80"
};
export {
  L as default
};
