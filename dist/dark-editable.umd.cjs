(function(o,l){typeof exports=="object"&&typeof module<"u"?module.exports=l():typeof define=="function"&&define.amd?define(l):(o=typeof globalThis<"u"?globalThis:o||self,o["dark-editable"]=l())})(this,function(){"use strict";var E=Object.defineProperty;var C=(o,l,a)=>l in o?E(o,l,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[l]=a;var d=(o,l,a)=>(C(o,typeof l!="symbol"?l+"":l,a),a);const o={tpl:"",inputclass:null,escape:!0,scope:null,showbuttons:!0};class l{init(t,e,i){this.type=t,this.options=Object.assign({},i,e)}prerender(){this.tpl=this.options.tpl,this.input=this.tpl,this.clear=null,this.error=null}render(){}value2html(t,e){const i=t.trim();this.options.escape?e.innerText=i:e.innerHTML=i}html2value(t){const e=document.createElement("div");return e.innerHTML=t,e.innerText}value2str(t){return String(t)}str2value(t){return t}value2submit(t){return t}value2input(t){this.input.value=t}input2value(){return this.input.value}activate(){this.input.style.display!="none"&&this.input.style.visibility!="hidden"&&this.input.focus()}clear(){this.input.value=null}escape(t){const e=document.createElement("div");return e.innerText=t,e.innerHTML}autosubmit(){}destroy(){}setClass(){this.options.inputclass&&this.input.classList.add(this.options.inputclass)}setAttr(t){this.options[t]!==void 0&&this.options[t]!==null&&(this.input[t]=this.options[t])}option(t,e){this.options[t]=e}}d(l,"defaults",o);const u=class extends l{constructor(t){super(),this.init("text",t,u.defaults)}render(){this.renderClear(),this.setClass(),this.setAttr("placeholder")}activate(){this.$input.is(":visible")&&(this.$input.focus(),this.$input.is("input,textarea")&&!this.$input.is('[type="checkbox"],[type="range"]')&&$.fn.editableutils.setCursorPosition(this.$input.get(0),this.$input.val().length),this.toggleClear&&this.toggleClear())}renderClear(){this.options.clear&&(this.$clear=$('<span class="editable-clear-x"></span>'),this.$input.after(this.$clear).css("padding-right",24).keyup($.proxy(function(t){if(!~$.inArray(t.keyCode,[40,38,9,13,27])){clearTimeout(this.t);var e=this;this.t=setTimeout(function(){e.toggleClear(t)},100)}},this)).parent().css("position","relative"),this.$clear.click($.proxy(this.clear,this)))}postrender(){}toggleClear(t){if(this.$clear){var e=this.$input.val().length,i=this.$clear.is(":visible");e&&!i&&this.$clear.show(),!e&&i&&this.$clear.hide()}}clear(){this.$clear.hide(),this.$input.val("").focus()}};let a=u;d(a,"defaults",Object.assign({},o,{tpl:'<input type="text">',placeholder:null,clear:!0}));const r={abstractinput:l,text:a};function c(n,t,e){let i,s,h={};if(!Array.isArray(t)||!t.length)return h;for(var p=0;p<t.length;p++)i=t[p],n.hasOwnProperty(i)&&(h[i]=n[i]),e!==!0&&(s=i.toLowerCase(),n.hasOwnProperty(s)&&(h[i]=n[s]));return h}function f(n){const t={},e=n.dataset;for(const i in e){const s=e[i];(typeof s!="object"||s&&typeof s=="object"&&(s.constructor===Object||s.constructor===Array))&&(t[i]=s)}return t}function m(n){if(Object.keys)return Object.keys(n);{if(n!==Object(n))throw new TypeError("Object.keys called on a non-object");const t=[];for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.push(e);return t}}function v(n){let t,e,i,s=n.type;return s==="date"&&(n.mode==="inline"?r.datefield?s="datefield":r.dateuifield&&(s="dateuifield"):r.date?s="date":r.dateui&&(s="dateui"),s==="date"&&!r.date&&(s="combodate")),s==="datetime"&&n.mode==="inline"&&(s="datetimefield"),s==="wysihtml5"&&!$.fn.editabletypes[s]&&(s="textarea"),typeof r[s]=="function"?(t=r[s],e=c(n,m(t.defaults)),i=new t(e),i):(console.error(`Unknown type: ${s}`),!1)}function y(){let n=document.body||document.documentElement,t=n.style,e="transition",i=["Moz","Webkit","Khtml","O","ms"];if(typeof t[e]=="string")return!0;e=e.charAt(0).toUpperCase()+e.substr(1);for(let s=0;s<i.length;s++)if(typeof t[i[s]+e]=="string")return!0;return!1}function b(n){return!(n.style.display==="none"||n.style.visibility==="hidden")}const g={container:null};class x{constructor(t,e={}){this.element=t,this.options=Object.assign({},w,e,f(this.element)),this.options.selector?this.initLive():this.init(),this.options.highlight&&!y()&&(this.options.highlight=!1)}init(){let t=!1,e;if(this.options.name=this.options.name||this.element.id,this.options.scope=this.element,this.input=v(this.options),!!this.input){switch(this.options.value===void 0||this.options.value===null?(this.value=this.input.html2value(this.element.innerHTML.trim()),t=!0):(this.options.value=$.fn.editableutils.tryParseJson(this.options.value,!0),typeof this.options.value=="string"?this.value=this.input.str2value(this.options.value):this.value=this.options.value),this.element.classList.add("editable"),this.input.type==="textarea"&&this.element.addClass("editable-pre-wrapped"),this.options.toggle!=="manual"?(this.element.classList.add("editable-click"),this.element.addEventListener(this.options.toggle,i=>{if(this.options.disabled||i.preventDefault(),this.options.toggle==="mouseenter")this.show();else{var s=this.options.toggle!=="click";this.toggle(s)}})):this.element.tabindex=-1,typeof this.options.display=="function"&&(this.options.autotext="always"),this.options.autotext){case"always":e=!0;break;case"auto":e=!this.element.innerText.trim().length&&this.value!==null&&this.value!==void 0&&!t;break;default:e=!1}(async()=>e?await this.render():Promise.resolve)().then(()=>{this.options.disabled?this.disable():this.enable(),this.element.dispatchEvent(new Event("init"))})}}initLive(){var t=this.options.selector;this.options.selector=!1,this.options.autotext="never",this.$element.on(this.options.toggle+".editable",t,$.proxy(function(e){var i=$(e.target).closest(t);i.data("editable")||(i.hasClass(this.options.emptyclass)&&i.empty(),i.editable(this.options).trigger(e))},this))}render(t){return new Promise((e,i)=>this.options.display===!1?i:this.input.value2htmlFinal?e(this.input.value2html(this.value,this.element,this.options.display,t)):typeof this.options.display=="function"?e(this.options.display.call(this.element,this.value,t)):e(this.input.value2html(this.value,this.element)))}enable(){this.options.disabled=!1,this.element.classList.remove("editable-disabled"),this.handleEmpty(this.isEmpty),this.options.toggle!=="manual"&&this.element.tabindex==="-1"&&this.element.removeAttribute("tabindex")}disable(){this.options.disabled=!0,this.hide(),this.$element.addClass("editable-disabled"),this.handleEmpty(this.isEmpty),this.$element.attr("tabindex",-1)}toggleDisabled(){this.options.disabled?this.enable():this.disable()}option(t,e){if(t&&typeof t=="object"){$.each(t,$.proxy(function(i,s){this.option($.trim(i),s)},this));return}if(this.options[t]=e,t==="disabled")return e?this.disable():this.enable();t==="value"&&this.setValue(e),this.container&&this.container.option(t,e),this.input.option&&this.input.option(t,e)}handleEmpty(t){this.options.display!==!1&&(t!==void 0?this.isEmpty=t:typeof this.input.isEmpty=="function"?this.isEmpty=this.input.isEmpty(this.element):this.isEmpty=this.element.innerHTML.trim()==="",this.options.disabled?this.isEmpty&&(this.element.empty(),this.options.emptyclass&&this.element.classList.remove(this.options.emptyclass)):this.isEmpty?(this.element.innerHTML=this.options.emptytext,this.options.emptyclass&&this.element.classList.add(this.options.emptyclass)):this.options.emptyclass&&this.element.classList.remove(this.options.emptyclass))}show(t=!0){if(!this.options.disabled){if(this.container){if(this.container.tip().is(":visible"))return}else{const e=Object.assign({},this.options,{value:this.value,input:this.input});this.container=new g.container(this.element,e),this.element.addEventListener("save.internal",this.save)}this.container.show(t)}}hide(){this.container&&this.container.hide()}toggle(t){this.container&&b(this.container.tip())?this.hide():this.show(t)}save(t,e){if(this.options.unsavedclass){var i=!1;i=i||typeof this.options.url=="function",i=i||this.options.display===!1,i=i||e.response!==void 0,i=i||this.options.savenochange&&this.input.value2str(this.value)!==this.input.value2str(e.newValue),i?this.$element.removeClass(this.options.unsavedclass):this.$element.addClass(this.options.unsavedclass)}if(this.options.highlight){var s=this.$element,h=s.css("background-color");s.css("background-color",this.options.highlight),setTimeout(function(){h==="transparent"&&(h=""),s.css("background-color",h),s.addClass("editable-bg-transition"),setTimeout(function(){s.removeClass("editable-bg-transition")},1700)},10)}this.setValue(e.newValue,!1,e.response)}validate(){if(typeof this.options.validate=="function")return this.options.validate.call(this,this.value)}setValue(t,e,i){e?this.value=this.input.str2value(t):this.value=t,this.container&&this.container.option("value",this.value),$.when(this.render(i)).then($.proxy(function(){this.handleEmpty()},this))}activate(){this.container&&this.container.activate()}destroy(){this.disable(),this.container&&this.container.destroy(),this.input.destroy(),this.options.toggle!=="manual"&&(this.$element.removeClass("editable-click"),this.$element.off(this.options.toggle+".editable")),this.$element.off("save.internal"),this.$element.removeClass("editable editable-open editable-disabled"),this.$element.removeData("editable")}}const w={type:"text",disabled:!1,toggle:"click",emptytext:"Empty",autotext:"auto",value:null,display:null,emptyclass:"editable-empty",unsavedclass:"editable-unsaved",selector:null,highlight:"#FFFF80"};return x});