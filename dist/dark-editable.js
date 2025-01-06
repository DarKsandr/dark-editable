import './dark-editable.css';var l = Object.defineProperty;
var d = (o, t, e) => t in o ? l(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var i = (o, t, e) => d(o, typeof t != "symbol" ? t + "" : t, e);
import { Popover as u } from "bootstrap";
import p from "moment";
class c {
  constructor(t) {
    if (this.constructor === c)
      throw new Error("It's abstract class");
    this.context = t;
  }
  event_show() {
    this.context.typeElement.hideError(), this.context.typeElement.element.value = this.context.value, this.context.element.dispatchEvent(new CustomEvent("show"));
  }
  event_shown() {
    this.context.element.dispatchEvent(new CustomEvent("shown"));
  }
  event_hide() {
    this.context.element.dispatchEvent(new CustomEvent("hide"));
  }
  event_hidden() {
    this.context.element.dispatchEvent(new CustomEvent("hidden"));
  }
  init() {
    throw new Error("Method `init` not define!");
  }
  enable() {
    throw new Error("Method `enable` not define!");
  }
  disable() {
    throw new Error("Method `disable` not define!");
  }
  hide() {
    throw new Error("Method `hide` not define!");
  }
}
class m extends c {
  init() {
    this.popover = new u(this.context.element, {
      container: "body",
      content: this.context.typeElement.create(),
      html: !0,
      customClass: "dark-editable",
      title: this.context.title
    }), this.context.element.addEventListener("show.bs.popover", () => {
      this.event_show();
    }), this.context.element.addEventListener("shown.bs.popover", () => {
      this.event_shown();
    }), this.context.element.addEventListener("hide.bs.popover", () => {
      this.event_hide();
    }), this.context.element.addEventListener("hidden.bs.popover", () => {
      this.event_hidden();
    }), document.addEventListener("click", (t) => {
      const e = t.target;
      if (e === this.popover.tip || e === this.context.element) return;
      let s = e;
      for (; s = s.parentNode; )
        if (s === this.popover.tip) return;
      this.hide();
    });
  }
  enable() {
    this.popover.enable();
  }
  disable() {
    this.popover.disable();
  }
  hide() {
    this.popover.hide();
  }
}
class x extends c {
  init() {
    const t = () => {
      if (!this.context.disabled) {
        const e = this.context.typeElement.create();
        this.event_show(), this.context.element.removeEventListener("click", t), this.context.element.innerHTML = "", this.context.element.append(e), this.event_shown();
      }
    };
    this.context.element.addEventListener("click", t);
  }
  enable() {
  }
  disable() {
  }
  hide() {
    this.event_hide(), this.context.element.innerHTML = this.context.value, setTimeout(() => {
      this.init(), this.event_hidden();
    }, 100);
  }
}
class a {
  constructor(t) {
    i(this, "context", null);
    i(this, "element", null);
    i(this, "error", null);
    i(this, "form", null);
    i(this, "load", null);
    i(this, "buttons", { success: null, cancel: null });
    if (this.constructor === a)
      throw new Error("It's abstract class");
    this.context = t;
  }
  create() {
    throw new Error("Method `create` not define!");
  }
  createContainer(t) {
    const e = document.createElement("div");
    return this.element = t, this.error = this.createContainerError(), this.form = this.createContainerForm(), this.load = this.createContainerLoad(), this.form.append(t, this.load), this.buttons.success = null, this.buttons.cancel = null, this.context.showbuttons && (this.buttons.success = this.createButtonSuccess(), this.buttons.cancel = this.createButtonCancel(), this.form.append(this.buttons.success, this.buttons.cancel)), e.append(this.error, this.form), e;
  }
  createContainerError() {
    const t = document.createElement("div");
    return t.classList.add("text-danger", "fst-italic", "mb-2", "fw-bold"), t.style.display = "none", t;
  }
  createContainerForm() {
    const t = document.createElement("form");
    return t.classList.add("d-flex", "align-items-start"), t.style.gap = "20px", t.addEventListener("submit", async (e) => {
      e.preventDefault();
      const s = this.getValue();
      if (this.context.send && this.context.pk && this.context.url && this.context.value !== s) {
        this.showLoad();
        let n;
        try {
          const r = await this.ajax(s);
          r.ok ? n = await this.context.success(r, s) : n = await this.context.error(r, s) || `${r.status} ${r.statusText}`;
        } catch (r) {
          console.error(r), n = r;
        }
        n ? (this.setError(n), this.showError()) : (this.setError(null), this.hideError(), this.context.value = this.getValue(), this.context.modeElement.hide(), this.initText()), this.hideLoad();
      } else
        this.context.value = this.getValue(), this.context.modeElement.hide(), this.initText();
      this.context.element.dispatchEvent(new CustomEvent("save"));
    }), t;
  }
  createContainerLoad() {
    const t = document.createElement("div");
    t.style.display = "none", t.style.position = "absolute", t.style.background = "white", t.style.width = "100%", t.style.height = "100%", t.style.top = 0, t.style.left = 0;
    const e = document.createElement("div");
    return e.classList.add("dark-editable-loader"), t.append(e), t;
  }
  createButton() {
    const t = document.createElement("button");
    return t.type = "button", t.classList.add("btn", "btn-sm"), t.style.color = "transparent", t.style.textShadow = "0 0 0 white", t;
  }
  createButtonSuccess() {
    const t = this.createButton();
    return t.type = "submit", t.classList.add("btn-success"), t.innerHTML = "✔", t;
  }
  createButtonCancel() {
    const t = this.createButton();
    t.classList.add("btn-danger");
    const e = document.createElement("div");
    return e.innerHTML = "✖", t.append(e), t.addEventListener("click", () => {
      this.context.modeElement.hide();
    }), t;
  }
  hideLoad() {
    this.load.style.display = "none";
  }
  showLoad() {
    this.load.style.display = "block";
  }
  ajax(t) {
    let e = this.context.url;
    const s = new FormData();
    s.append("pk", this.context.pk), s.append("name", this.context.name), s.append("value", t);
    const n = {};
    return n.method = this.context.ajaxOptions.method, n.method === "POST" ? n.body = s : e += "?" + new URLSearchParams(s).toString(), fetch(e, n);
  }
  async successResponse(t, e) {
  }
  async errorResponse(t, e) {
  }
  setError(t) {
    this.error.innerHTML = t;
  }
  showError() {
    this.error.style.display = "block";
  }
  hideError() {
    this.error && (this.error.style.display = "none");
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.classList.add("form-control"), this.context.required && (e.required = this.context.required), this.context.showbuttons || e.addEventListener("change", () => {
      this.form.dispatchEvent(new Event("submit"));
    }), this.add_focus(e), e;
  }
  add_focus(t) {
    this.context.element.addEventListener("shown", function() {
      t.focus();
    });
  }
  initText() {
    return this.context.value === "" ? (this.context.element.innerHTML = this.context.emptytext, !0) : (this.context.element.innerHTML = this.context.value, !1);
  }
  initOptions() {
  }
  getValue() {
    return this.element.value;
  }
}
class v extends a {
  create() {
    const t = this.createElement("input");
    return t.type = this.context.type, this.createContainer(t);
  }
}
class f extends a {
  create() {
    const t = this.createElement("textarea");
    return this.createContainer(t);
  }
}
class E extends a {
  create() {
    const t = this.createElement("select");
    return this.context.source.forEach((e) => {
      const s = document.createElement("option");
      s.value = e.value, s.innerHTML = e.text, t.append(s);
    }), this.createContainer(t);
  }
  initText() {
    if (this.context.element.innerHTML = this.context.emptytext, this.context.value !== "" && this.context.source.length > 0)
      for (const t in this.context.source) {
        const e = this.context.source[t];
        if (e.value == this.context.value)
          return this.context.element.innerHTML = e.text, !1;
      }
    return !0;
  }
  initOptions() {
    this.context.get_opt("source", []), typeof this.context.source == "string" && this.context.source !== "" && (this.context.source = JSON.parse(this.context.source));
  }
}
class h extends a {
  create() {
    const t = this.createElement("input");
    return t.type = "date", this.createContainer(t);
  }
  initText() {
    return this.value === "" ? (this.context.element.innerHTML = this.context.emptytext, !0) : (this.context.element.innerHTML = moment(this.context.value).format(this.context.viewformat), !1);
  }
  initOptions() {
    this.context.get_opt("format", "YYYY-MM-DD"), this.context.get_opt("viewformat", "YYYY-MM-DD");
  }
}
class y extends h {
  create() {
    const t = this.createElement("input");
    return t.type = "datetime-local", this.createContainer(t);
  }
  initOptions() {
    this.context.get_opt("format", "YYYY-MM-DD HH:mm"), this.context.get_opt("viewformat", "YYYY-MM-DD HH:mm"), this.context.value = p(this.context.value).format("YYYY-MM-DDTHH:mm");
  }
}
/*!
 * DarkEditable.js
 * License: MIT
 */
class L {
  constructor(t, e = {}) {
    i(this, "modeElement", null);
    i(this, "typeElement", null);
    i(this, "mode", null);
    i(this, "type", null);
    i(this, "emptytext", null);
    i(this, "viewformat", null);
    i(this, "pk", null);
    i(this, "name", null);
    this.element = t, this.options = e, this.init_options(), this.typeElement = this.route_type(), this.typeElement.initOptions(), this.modeElement = this.route_mode(), this.modeElement.init(), this.init_text(), this.init_style(), this.disabled && this.disable(), this.element.dispatchEvent(new CustomEvent("init"));
  }
  /* INIT METHODS */
  get_opt(t, e) {
    var s, n;
    return this[t] = ((s = this.element.dataset) == null ? void 0 : s[t]) ?? ((n = this.options) == null ? void 0 : n[t]) ?? e;
  }
  get_opt_bool(t, e) {
    return this.get_opt(t, e), typeof this[t] != "boolean" && (this[t] === "true" ? this[t] = !0 : this[t] === "false" ? this[t] = !1 : this[t] = e), this[t];
  }
  init_options() {
    var t, e, s, n;
    this.get_opt("value", this.element.innerHTML), this.get_opt("name", this.element.id), this.get_opt("pk", null), this.get_opt("title", ""), this.get_opt("type", "text"), this.get_opt("emptytext", "Empty"), this.get_opt("mode", "popup"), this.get_opt("url", null), this.get_opt("ajaxOptions", {}), this.ajaxOptions = Object.assign({
      method: "POST",
      dataType: "text"
    }, this.ajaxOptions), this.get_opt_bool("send", !0), this.get_opt_bool("disabled", !1), this.get_opt_bool("required", !1), this.get_opt_bool("showbuttons", !0), (t = this.options) != null && t.success && typeof ((e = this.options) == null ? void 0 : e.success) == "function" && (this.success = this.options.success), (s = this.options) != null && s.error && typeof ((n = this.options) == null ? void 0 : n.error) == "function" && (this.error = this.options.error);
  }
  init_text() {
    const t = "dark-editable-element-empty";
    this.element.classList.remove(t), this.typeElement.initText() && this.element.classList.add(t);
  }
  init_style() {
    this.element.classList.add("dark-editable-element");
  }
  /* INIT METHODS END */
  route_mode() {
    switch (this.mode) {
      default:
        throw new Error(`Mode ${this.mode} not found!`);
      case "popup":
        return new m(this);
      case "inline":
        return new x(this);
    }
  }
  route_type() {
    if (this.type.prototype instanceof a)
      return new this.type(this);
    if (typeof this.type == "string")
      switch (this.type) {
        case "text":
        case "password":
        case "email":
        case "url":
        case "tel":
        case "number":
        case "range":
        case "time":
          return new v(this);
        case "textarea":
          return new f(this);
        case "select":
          return new E(this);
        case "date":
          return new h(this);
        case "datetime":
          return new y(this);
      }
    throw new Error("Undefined type");
  }
  /* AJAX */
  async success(t, e) {
    return await this.typeElement.successResponse(t, e);
  }
  async error(t, e) {
    return await this.typeElement.errorResponse(t, e);
  }
  /* AJAX END */
  /* METHODS */
  enable() {
    this.disabled = !1, this.element.classList.remove("dark-editable-element-disabled"), this.modeElement.enable();
  }
  disable() {
    this.disabled = !0, this.element.classList.add("dark-editable-element-disabled"), this.modeElement.enable();
  }
  setValue(t) {
    this.value = t, this.init_text();
  }
  getValue() {
    return this.value;
  }
  /* METHODS END */
}
export {
  L as default
};
