import './dark-editable.css';var m = Object.defineProperty;
var x = (o, t, e) => t in o ? m(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var i = (o, t, e) => x(o, typeof t != "symbol" ? t + "" : t, e);
import { Popover as f } from "bootstrap";
import c from "moment";
class h {
  constructor(t) {
    i(this, "context");
    if (this.constructor === h)
      throw new Error("It's abstract class");
    this.context = t;
  }
  event_show() {
    if (this.context.typeElement.hideError(), !this.context.typeElement.element)
      throw new Error("Element is missing!");
    this.context.typeElement.element.value = this.context.getValue(), this.context.element.dispatchEvent(new CustomEvent("show"));
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
class E extends h {
  constructor() {
    super(...arguments);
    i(this, "popover", null);
  }
  init() {
    this.popover = new f(this.context.element, {
      container: "body",
      content: this.context.typeElement.create(),
      html: !0,
      customClass: "dark-editable",
      title: this.context.options.title
    }), this.context.element.addEventListener("show.bs.popover", () => {
      this.event_show();
    }), this.context.element.addEventListener("shown.bs.popover", () => {
      this.event_shown();
    }), this.context.element.addEventListener("hide.bs.popover", () => {
      this.event_hide();
    }), this.context.element.addEventListener("hidden.bs.popover", () => {
      this.event_hidden();
    }), document.addEventListener("click", (e) => {
      const s = e.target;
      if (this.popover && s === this.popover.tip || s === this.context.element) return;
      let n = s.parentNode;
      for (; n; ) {
        if (n === this.popover.tip) return;
        n = n.parentNode;
      }
      this.hide();
    });
  }
  enable() {
    this.popover && this.popover.enable();
  }
  disable() {
    this.popover && this.popover.disable();
  }
  hide() {
    this.popover && this.popover.hide();
  }
}
class w extends h {
  init() {
    const t = () => {
      if (!this.context.options.disabled) {
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
    this.event_hide(), this.context.element.innerHTML = this.context.getValue(), setTimeout(() => {
      this.init(), this.event_hidden();
    }, 100);
  }
}
class a {
  constructor(t) {
    i(this, "context");
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
    return this.element = t, this.error = this.createContainerError(), this.form = this.createContainerForm(), this.load = this.createContainerLoad(), this.form.append(t, this.load), this.buttons.success = null, this.buttons.cancel = null, this.context.options.showbuttons && (this.buttons.success = this.createButtonSuccess(), this.buttons.cancel = this.createButtonCancel(), this.form.append(this.buttons.success, this.buttons.cancel)), e.append(this.error, this.form), e;
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
      if (this.context.options.send && this.context.options.pk && this.context.options.url && this.context.getValue() !== s) {
        this.showLoad();
        let n;
        try {
          const r = await this.ajax(s);
          r.ok ? n = await this.context.success(r, s) : n = await this.context.error(r, s) || `${r.status} ${r.statusText}`;
        } catch (r) {
          console.error(r), n = r;
        }
        n ? (this.setError(n), this.showError()) : (this.setError(""), this.hideError(), this.context.setValue(this.getValue()), this.context.modeElement.hide(), this.initText()), this.hideLoad();
      } else
        this.context.setValue(this.getValue()), this.context.modeElement.hide(), this.initText();
      this.context.element.dispatchEvent(new CustomEvent("save"));
    }), t;
  }
  createContainerLoad() {
    const t = document.createElement("div");
    t.style.display = "none", t.style.position = "absolute", t.style.background = "white", t.style.width = "100%", t.style.height = "100%", t.style.top = "0", t.style.left = "0";
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
    this.load && (this.load.style.display = "none");
  }
  showLoad() {
    this.load && (this.load.style.display = "block");
  }
  ajax(t) {
    var r;
    let e = this.context.options.url;
    if (!e)
      throw new Error("URL is required!");
    if (!this.context.options.pk)
      throw new Error("pk is required!");
    if (!this.context.options.name)
      throw new Error("Name is required!");
    const s = new FormData();
    if (s.append("pk", this.context.options.pk), s.append("name", this.context.options.name), s.append("value", t), ((r = this.context.options.ajaxOptions) == null ? void 0 : r.method) === "GET") {
      const l = [];
      s.forEach((d, u) => {
        l.push(`${u}=${d}`);
      }), e += "?" + l.join("&");
    }
    const n = { ...this.context.options.ajaxOptions };
    return n.body = s, fetch(e, n);
  }
  async successResponse(t, e) {
  }
  async errorResponse(t, e) {
  }
  setError(t) {
    this.error && (this.error.innerHTML = t);
  }
  showError() {
    this.error && (this.error.style.display = "block");
  }
  hideError() {
    this.error && (this.error.style.display = "none");
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.classList.add("form-control"), this.context.options.required && (e.required = this.context.options.required), this.context.options.showbuttons || e.addEventListener("change", () => {
      this.form && this.form.dispatchEvent(new Event("submit"));
    }), this.add_focus(e), e;
  }
  add_focus(t) {
    this.context.element.addEventListener("shown", function() {
      t.focus();
    });
  }
  initText() {
    return this.context.getValue() === "" ? (this.context.element.innerHTML = this.context.options.emptytext || "", !0) : (this.context.element.innerHTML = this.context.getValue(), !1);
  }
  initOptions() {
  }
  getValue() {
    return this.element ? this.element.value : "";
  }
}
class v extends a {
  create() {
    const t = this.createElement("input");
    return t.type = typeof this.context.options.type == "string" ? this.context.options.type : "text", this.createContainer(t);
  }
}
class y extends a {
  create() {
    const t = this.createElement("textarea");
    return this.createContainer(t);
  }
}
class b extends a {
  create() {
    const t = this.createElement("select");
    return this.context.options.source && Array.isArray(this.context.options.source) && this.context.options.source.forEach((e) => {
      const s = document.createElement("option");
      s.value = e.value, s.innerHTML = e.text, t.append(s);
    }), this.createContainer(t);
  }
  initText() {
    if (this.context.element.innerHTML = this.context.options.emptytext || "", this.context.getValue() !== "" && this.context.options.source && Array.isArray(this.context.options.source) && this.context.options.source.length > 0)
      for (let t = 0; t < this.context.options.source.length; t++) {
        const e = this.context.options.source[t];
        if (e.value == this.context.getValue())
          return this.context.element.innerHTML = e.text, !1;
      }
    return !0;
  }
  initOptions() {
    this.context.get_opt("source", []), this.context.options && typeof this.context.options.source == "string" && this.context.options.source !== "" && (this.context.options.source = JSON.parse(this.context.options.source));
  }
}
class p extends a {
  create() {
    const t = this.createElement("input");
    return t.type = "date", this.createContainer(t);
  }
  initText() {
    return this.context.getValue() === "" ? (this.context.element.innerHTML = this.context.options.emptytext || "", !0) : (this.context.element.innerHTML = c(this.context.getValue()).format(this.context.options.viewformat), !1);
  }
  initOptions() {
    const t = this.context.get_opt("format", "YYYY-MM-DD"), e = this.context.get_opt("viewformat", "YYYY-MM-DD");
    this.context.setValue(c(this.context.getValue(), e).format(t));
  }
}
class g extends p {
  create() {
    const t = this.createElement("input");
    return t.type = "datetime-local", this.createContainer(t);
  }
  initOptions() {
    const t = this.context.get_opt("format", "YYYY-MM-DD HH:mm"), e = this.context.get_opt("viewformat", "YYYY-MM-DD HH:mm");
    this.context.setValue(c(this.context.getValue(), e).format(t));
  }
}
/*!
 * DarkEditable.js
 * License: MIT
 */
class M {
  constructor(t, e = {}) {
    i(this, "element");
    i(this, "options");
    i(this, "typeElement");
    i(this, "modeElement");
    this.element = t, this.options = { ...e }, this.init_options(), this.typeElement = this.route_type(), this.typeElement.initOptions(), this.modeElement = this.route_mode(), this.modeElement.init(), this.init_text(), this.init_style(), this.options.disabled && this.disable(), this.element.dispatchEvent(new CustomEvent("init"));
  }
  /* INIT METHODS */
  get_opt(t, e) {
    var s, n;
    return this.options[t] = ((s = this.element.dataset) == null ? void 0 : s[t]) ?? ((n = this.options) == null ? void 0 : n[t]) ?? e;
  }
  get_opt_bool(t, e) {
    if (this.get_opt(t, e), typeof this.options[t] != "boolean") {
      if (this.options[t] === "true") {
        this.options[t] = !0;
        return;
      }
      if (this.options[t] === "false") {
        this.options[t] = !1;
        return;
      }
      this.options[t] = e;
    }
  }
  init_options() {
    var t, e, s, n;
    this.get_opt("value", this.element.innerHTML), this.get_opt("name", this.element.id), this.get_opt("pk", null), this.get_opt("title", ""), this.get_opt("type", "text"), this.get_opt("emptytext", "Empty"), this.get_opt("mode", "popup"), this.get_opt("url", null), this.get_opt("ajaxOptions", {}), this.options.ajaxOptions = Object.assign({
      method: "POST",
      dataType: "text"
    }, this.options.ajaxOptions), this.get_opt_bool("send", !0), this.get_opt_bool("disabled", !1), this.get_opt_bool("required", !1), this.get_opt_bool("showbuttons", !0), (t = this.options) != null && t.success && typeof ((e = this.options) == null ? void 0 : e.success) == "function" && (this.success = this.options.success), (s = this.options) != null && s.error && typeof ((n = this.options) == null ? void 0 : n.error) == "function" && (this.error = this.options.error);
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
    switch (this.options.mode) {
      default:
        throw new Error(`Mode ${this.options.mode} not found!`);
      case "popup":
        return new E(this);
      case "inline":
        return new w(this);
    }
  }
  route_type() {
    if (this.options.type && typeof this.options.type != "string")
      return new this.options.type(this);
    switch (this.options.type) {
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
        return new y(this);
      case "select":
        return new b(this);
      case "date":
        return new p(this);
      case "datetime":
        return new g(this);
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
    this.options.disabled = !1, this.element.classList.remove("dark-editable-element-disabled"), this.modeElement.enable();
  }
  disable() {
    this.options.disabled = !0, this.element.classList.add("dark-editable-element-disabled"), this.modeElement.enable();
  }
  setValue(t) {
    this.options.value = t, this.init_text();
  }
  getValue() {
    return this.options.value ?? "";
  }
  /* METHODS END */
}
export {
  M as default
};
//# sourceMappingURL=dark-editable.js.map
