var DarkEditable=function(a,r){"use strict";var g=Object.defineProperty;var L=(a,r,m)=>r in a?g(a,r,{enumerable:!0,configurable:!0,writable:!0,value:m}):a[r]=m;var o=(a,r,m)=>L(a,typeof r!="symbol"?r+"":r,m);var m=document.createElement("style");m.textContent=`.dark-editable-element{border-bottom:dashed 1px #0088cc;text-decoration:none;cursor:pointer}.dark-editable-element-disabled{border-bottom:none;cursor:default}.dark-editable-element-empty{font-style:italic;color:#d14}.dark-editable{max-width:none}.dark-editable-loader{font-size:5px;left:50%;top:50%;width:1em;height:1em;border-radius:50%;position:relative;text-indent:-9999em;-webkit-animation:load5 1.1s infinite ease;animation:load5 1.1s infinite ease;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0)}@-webkit-keyframes load5{0%,to{box-shadow:0 -2.6em #000,1.8em -1.8em #0003,2.5em 0 #0003,1.75em 1.75em #0003,0 2.5em #0003,-1.8em 1.8em #0003,-2.6em 0 #00000080,-1.8em -1.8em #000000b3}12.5%{box-shadow:0 -2.6em #000000b3,1.8em -1.8em #000,2.5em 0 #0003,1.75em 1.75em #0003,0 2.5em #0003,-1.8em 1.8em #0003,-2.6em 0 #0003,-1.8em -1.8em #00000080}25%{box-shadow:0 -2.6em #00000080,1.8em -1.8em #000000b3,2.5em 0 #000,1.75em 1.75em #0003,0 2.5em #0003,-1.8em 1.8em #0003,-2.6em 0 #0003,-1.8em -1.8em #0003}37.5%{box-shadow:0 -2.6em #0003,1.8em -1.8em #00000080,2.5em 0 #000000b3,1.75em 1.75em #000,0 2.5em #0003,-1.8em 1.8em #0003,-2.6em 0 #0003,-1.8em -1.8em #0003}50%{box-shadow:0 -2.6em #0003,1.8em -1.8em #0003,2.5em 0 #00000080,1.75em 1.75em #000000b3,0 2.5em #000,-1.8em 1.8em #0003,-2.6em 0 #0003,-1.8em -1.8em #0003}62.5%{box-shadow:0 -2.6em #0003,1.8em -1.8em #0003,2.5em 0 #0003,1.75em 1.75em #00000080,0 2.5em #000000b3,-1.8em 1.8em #000,-2.6em 0 #0003,-1.8em -1.8em #0003}75%{box-shadow:0 -2.6em #0003,1.8em -1.8em #0003,2.5em 0 #0003,1.75em 1.75em #0003,0 2.5em #00000080,-1.8em 1.8em #000000b3,-2.6em 0 #000,-1.8em -1.8em #0003}87.5%{box-shadow:0 -2.6em #0003,1.8em -1.8em #0003,2.5em 0 #0003,1.75em 1.75em #0003,0 2.5em #0003,-1.8em 1.8em #00000080,-2.6em 0 #000000b3,-1.8em -1.8em #000}}@keyframes load5{0%,to{box-shadow:0 -2.6em #000,1.8em -1.8em #0003,2.5em 0 #0003,1.75em 1.75em #0003,0 2.5em #0003,-1.8em 1.8em #0003,-2.6em 0 #00000080,-1.8em -1.8em #000000b3}12.5%{box-shadow:0 -2.6em #000000b3,1.8em -1.8em #000,2.5em 0 #0003,1.75em 1.75em #0003,0 2.5em #0003,-1.8em 1.8em #0003,-2.6em 0 #0003,-1.8em -1.8em #00000080}25%{box-shadow:0 -2.6em #00000080,1.8em -1.8em #000000b3,2.5em 0 #000,1.75em 1.75em #0003,0 2.5em #0003,-1.8em 1.8em #0003,-2.6em 0 #0003,-1.8em -1.8em #0003}37.5%{box-shadow:0 -2.6em #0003,1.8em -1.8em #00000080,2.5em 0 #000000b3,1.75em 1.75em #000,0 2.5em #0003,-1.8em 1.8em #0003,-2.6em 0 #0003,-1.8em -1.8em #0003}50%{box-shadow:0 -2.6em #0003,1.8em -1.8em #0003,2.5em 0 #00000080,1.75em 1.75em #000000b3,0 2.5em #000,-1.8em 1.8em #0003,-2.6em 0 #0003,-1.8em -1.8em #0003}62.5%{box-shadow:0 -2.6em #0003,1.8em -1.8em #0003,2.5em 0 #0003,1.75em 1.75em #00000080,0 2.5em #000000b3,-1.8em 1.8em #000,-2.6em 0 #0003,-1.8em -1.8em #0003}75%{box-shadow:0 -2.6em #0003,1.8em -1.8em #0003,2.5em 0 #0003,1.75em 1.75em #0003,0 2.5em #00000080,-1.8em 1.8em #000000b3,-2.6em 0 #000,-1.8em -1.8em #0003}87.5%{box-shadow:0 -2.6em #0003,1.8em -1.8em #0003,2.5em 0 #0003,1.75em 1.75em #0003,0 2.5em #0003,-1.8em 1.8em #00000080,-2.6em 0 #000000b3,-1.8em -1.8em #000}}
/*$vite$:1*/`,document.head.appendChild(m);class l{constructor(e){o(this,"context");if(this.constructor===l)throw new Error("It's abstract class");this.context=e}event_show(){if(this.context.typeElement.hideError(),!this.context.typeElement.element)throw new Error("Element is missing!");this.context.typeElement.element.value=this.context.getValue(),this.context.element.dispatchEvent(new CustomEvent("show"))}event_shown(){this.context.element.dispatchEvent(new CustomEvent("shown"))}event_hide(){this.context.element.dispatchEvent(new CustomEvent("hide"))}event_hidden(){this.context.element.dispatchEvent(new CustomEvent("hidden"))}init(){throw new Error("Method `init` not define!")}enable(){throw new Error("Method `enable` not define!")}disable(){throw new Error("Method `disable` not define!")}hide(){throw new Error("Method `hide` not define!")}}class u extends l{constructor(){super(...arguments);o(this,"popover",null)}init(){this.popover=new a.Popover(this.context.element,{container:"body",content:this.context.typeElement.create(),html:!0,customClass:"dark-editable",title:this.context.options.title}),this.context.element.addEventListener("show.bs.popover",()=>{this.event_show()}),this.context.element.addEventListener("shown.bs.popover",()=>{this.event_shown()}),this.context.element.addEventListener("hide.bs.popover",()=>{this.event_hide()}),this.context.element.addEventListener("hidden.bs.popover",()=>{this.event_hidden()}),document.addEventListener("click",t=>{const s=t.target;if(this.popover&&s===this.popover.tip||s===this.context.element)return;let n=s.parentNode;for(;n;){if(n===this.popover.tip)return;n=n.parentNode}this.hide()})}enable(){this.popover&&this.popover.enable()}disable(){this.popover&&this.popover.disable()}hide(){this.popover&&this.popover.hide()}}class x extends l{init(){const e=()=>{if(!this.context.options.disabled){const t=this.context.typeElement.create();this.event_show(),this.context.element.removeEventListener("click",e),this.context.element.innerHTML="",this.context.element.append(t),this.event_shown()}};this.context.element.addEventListener("click",e)}enable(){}disable(){}hide(){this.event_hide(),this.context.element.innerHTML=this.context.getValue(),setTimeout(()=>{this.init(),this.event_hidden()},100)}}class c{constructor(e){o(this,"context");o(this,"element",null);o(this,"error",null);o(this,"form",null);o(this,"load",null);o(this,"buttons",{success:null,cancel:null});if(this.constructor===c)throw new Error("It's abstract class");this.context=e}create(){throw new Error("Method `create` not define!")}createContainer(e){const t=document.createElement("div");return this.element=e,this.error=this.createContainerError(),this.form=this.createContainerForm(),this.load=this.createContainerLoad(),this.form.append(e,this.load),this.buttons.success=null,this.buttons.cancel=null,this.context.options.showbuttons&&(this.buttons.success=this.createButtonSuccess(),this.buttons.cancel=this.createButtonCancel(),this.form.append(this.buttons.success,this.buttons.cancel)),t.append(this.error,this.form),t}createContainerError(){const e=document.createElement("div");return e.classList.add("text-danger","fst-italic","mb-2","fw-bold"),e.style.display="none",e}createContainerForm(){const e=document.createElement("form");return e.classList.add("d-flex","align-items-start"),e.style.gap="20px",e.addEventListener("submit",async t=>{t.preventDefault();const s=this.getValue();if(this.context.options.send&&this.context.options.pk&&this.context.options.url&&this.context.getValue()!==s){this.showLoad();let n;try{const i=await this.ajax(s);i.ok?n=await this.context.success(i,s):n=await this.context.error(i,s)||`${i.status} ${i.statusText}`}catch(i){console.error(i),n=i}n?(this.setError(n),this.showError()):(this.setError(""),this.hideError(),this.context.setValue(this.getValue()),this.context.modeElement.hide(),this.initText()),this.hideLoad()}else this.context.setValue(this.getValue()),this.context.modeElement.hide(),this.initText();this.context.element.dispatchEvent(new CustomEvent("save"))}),e}createContainerLoad(){const e=document.createElement("div");e.style.display="none",e.style.position="absolute",e.style.background="white",e.style.width="100%",e.style.height="100%",e.style.top="0",e.style.left="0";const t=document.createElement("div");return t.classList.add("dark-editable-loader"),e.append(t),e}createButton(){const e=document.createElement("button");return e.type="button",e.classList.add("btn","btn-sm"),e.style.color="transparent",e.style.textShadow="0 0 0 white",e}createButtonSuccess(){const e=this.createButton();return e.type="submit",e.classList.add("btn-success"),e.innerHTML="✔",e}createButtonCancel(){const e=this.createButton();e.classList.add("btn-danger");const t=document.createElement("div");return t.innerHTML="✖",e.append(t),e.addEventListener("click",()=>{this.context.modeElement.hide()}),e}hideLoad(){this.load&&(this.load.style.display="none")}showLoad(){this.load&&(this.load.style.display="block")}ajax(e){var i;let t=this.context.options.url;if(!t)throw new Error("URL is required!");if(!this.context.options.pk)throw new Error("pk is required!");if(!this.context.options.name)throw new Error("Name is required!");const s=new FormData;if(s.append("pk",this.context.options.pk),s.append("name",this.context.options.name),s.append("value",e),((i=this.context.options.ajaxOptions)==null?void 0:i.method)==="GET"){const p=[];s.forEach((v,_)=>{p.push(`${_}=${v}`)}),t+="?"+p.join("&")}const n={...this.context.options.ajaxOptions};return n.body=s,fetch(t,n)}async successResponse(e,t){}async errorResponse(e,t){}setError(e){this.error&&(this.error.innerHTML=e)}showError(){this.error&&(this.error.style.display="block")}hideError(){this.error&&(this.error.style.display="none")}createElement(e){const t=document.createElement(e);return t.classList.add("form-control"),this.context.options.required&&(t.required=this.context.options.required),this.context.options.showbuttons||t.addEventListener("change",()=>{this.form&&this.form.dispatchEvent(new Event("submit"))}),this.add_focus(t),t}add_focus(e){this.context.element.addEventListener("shown",function(){e.focus()})}initText(){return this.context.getValue()===""?(this.context.element.innerHTML=this.context.options.emptytext||"",!0):(this.context.element.innerHTML=this.context.getValue(),!1)}initOptions(){}getValue(){return this.element?this.element.value:""}}class b extends c{create(){const e=this.createElement("input");return e.type=typeof this.context.options.type=="string"?this.context.options.type:"text",this.createContainer(e)}}class f extends c{create(){const e=this.createElement("textarea");return this.createContainer(e)}}class w extends c{create(){const e=this.createElement("select");return this.context.options.source&&Array.isArray(this.context.options.source)&&this.context.options.source.forEach(t=>{const s=document.createElement("option");s.value=t.value,s.innerHTML=t.text,e.append(s)}),this.createContainer(e)}initText(){if(this.context.element.innerHTML=this.context.options.emptytext||"",this.context.getValue()!==""&&this.context.options.source&&Array.isArray(this.context.options.source)&&this.context.options.source.length>0)for(let e=0;e<this.context.options.source.length;e++){const t=this.context.options.source[e];if(t.value==this.context.getValue())return this.context.element.innerHTML=t.text,!1}return!0}initOptions(){this.context.get_opt("source",[]),this.context.options&&typeof this.context.options.source=="string"&&this.context.options.source!==""&&(this.context.options.source=JSON.parse(this.context.options.source))}}class d extends c{create(){const e=this.createElement("input");return e.type="date",this.createContainer(e)}initText(){return this.context.getValue()===""?(this.context.element.innerHTML=this.context.options.emptytext||"",!0):(this.context.element.innerHTML=r(this.context.getValue()).format(this.context.options.viewformat),!1)}initOptions(){this.context.get_opt("format","YYYY-MM-DD"),this.context.get_opt("viewformat","YYYY-MM-DD")}}class E extends d{create(){const e=this.createElement("input");return e.type="datetime-local",this.createContainer(e)}initOptions(){this.context.get_opt("format","YYYY-MM-DD HH:mm"),this.context.get_opt("viewformat","YYYY-MM-DD HH:mm"),this.context.setValue(r(this.context.getValue()).format("YYYY-MM-DDTHH:mm"))}}/*!
 * DarkEditable.js
 * License: MIT
 */class y{constructor(e,t={}){o(this,"element");o(this,"options");o(this,"typeElement");o(this,"modeElement");this.element=e,this.options={...t},this.init_options(),this.typeElement=this.route_type(),this.typeElement.initOptions(),this.modeElement=this.route_mode(),this.modeElement.init(),this.init_text(),this.init_style(),this.options.disabled&&this.disable(),this.element.dispatchEvent(new CustomEvent("init"))}get_opt(e,t){var s,n;this.options[e]=((s=this.element.dataset)==null?void 0:s[e])??((n=this.options)==null?void 0:n[e])??t}get_opt_bool(e,t){if(this.get_opt(e,t),typeof this.options[e]!="boolean"){if(this.options[e]==="true"){this.options[e]=!0;return}if(this.options[e]==="false"){this.options[e]=!1;return}this.options[e]=t}}init_options(){var e,t,s,n;this.get_opt("value",this.element.innerHTML),this.get_opt("name",this.element.id),this.get_opt("pk",null),this.get_opt("title",""),this.get_opt("type","text"),this.get_opt("emptytext","Empty"),this.get_opt("mode","popup"),this.get_opt("url",null),this.get_opt("ajaxOptions",{}),this.options.ajaxOptions=Object.assign({method:"POST",dataType:"text"},this.options.ajaxOptions),this.get_opt_bool("send",!0),this.get_opt_bool("disabled",!1),this.get_opt_bool("required",!1),this.get_opt_bool("showbuttons",!0),(e=this.options)!=null&&e.success&&typeof((t=this.options)==null?void 0:t.success)=="function"&&(this.success=this.options.success),(s=this.options)!=null&&s.error&&typeof((n=this.options)==null?void 0:n.error)=="function"&&(this.error=this.options.error)}init_text(){const e="dark-editable-element-empty";this.element.classList.remove(e),this.typeElement.initText()&&this.element.classList.add(e)}init_style(){this.element.classList.add("dark-editable-element")}route_mode(){switch(this.options.mode){default:throw new Error(`Mode ${this.options.mode} not found!`);case"popup":return new u(this);case"inline":return new x(this)}}route_type(){if(this.options.type&&typeof this.options.type!="string")return new this.options.type(this);switch(this.options.type){case"text":case"password":case"email":case"url":case"tel":case"number":case"range":case"time":return new b(this);case"textarea":return new f(this);case"select":return new w(this);case"date":return new d(this);case"datetime":return new E(this)}throw new Error("Undefined type")}async success(e,t){return await this.typeElement.successResponse(e,t)}async error(e,t){return await this.typeElement.errorResponse(e,t)}enable(){this.options.disabled=!1,this.element.classList.remove("dark-editable-element-disabled"),this.modeElement.enable()}disable(){this.options.disabled=!0,this.element.classList.add("dark-editable-element-disabled"),this.modeElement.enable()}setValue(e){this.options.value=e,this.init_text()}getValue(){return this.options.value??""}}return y}(bootstrap,moment);
//# sourceMappingURL=dark-editable.iife.js.map
