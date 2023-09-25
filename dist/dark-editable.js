var m = Object.defineProperty;
var p = (o, e, t) => e in o ? m(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var u = (o, e, t) => (p(o, typeof e != "symbol" ? e + "" : e, t), t);
class h {
  constructor(e) {
    if (this.constructor === h)
      throw new Error("It's abstract class");
    this.context = e;
  }
  event_show() {
    this.context.hideError(), this.context._element.element.value = this.context.value, this.context.element.dispatchEvent(new CustomEvent("show"));
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
class v extends h {
  init() {
    this.popover = new bootstrap.Popover(this.context.element, {
      container: "body",
      content: this.context.route_type(),
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
    }), document.addEventListener("click", (e) => {
      const t = e.target;
      if (t === this.popover.tip || t === this.context.element)
        return;
      let s = t;
      for (; s = s.parentNode; )
        if (s === this.popover.tip)
          return;
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
class f extends h {
  init() {
    const e = () => {
      if (!this.context.disabled) {
        const t = this.context.route_type();
        this.event_show(), this.context.element.removeEventListener("click", e), this.context.element.innerHTML = "", this.context.element.append(t), this.event_shown();
      }
    };
    this.context.element.addEventListener("click", e);
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
class E {
  constructor(e, t = {}) {
    u(this, "modeElement", null);
    switch (this._element = { element: null, form: null, load: null, buttons: { success: null, cancel: null } }, this.element = e, this.options = t, this.init_options(), this.mode) {
      default:
        throw new Error(`Mode ${this.mode} not found!`);
      case "popup":
        this.modeElement = new v(this);
        break;
      case "inline":
        this.modeElement = new f(this);
        break;
    }
    this.modeElement.init(), this.init_text(), this.init_style(), this.disabled && this.disable(), this.element.dispatchEvent(new CustomEvent("init"));
  }
  /* INIT METHODS */
  init_options() {
    var s, n, a, r;
    const e = (i, l) => {
      var c, d;
      return this[i] = ((c = this.element.dataset) == null ? void 0 : c[i]) ?? ((d = this.options) == null ? void 0 : d[i]) ?? l;
    }, t = (i, l) => (e(i, l), typeof this[i] != "boolean" && (this[i] === "true" ? this[i] = !0 : this[i] === "false" ? this[i] = !1 : this[i] = l), this[i]);
    switch (e("value", this.element.innerHTML), e("name", this.element.id), e("pk", null), e("title", ""), e("type", "text"), e("emptytext", "Empty"), e("mode", "popup"), e("url", null), e("ajaxOptions", {}), this.ajaxOptions = Object.assign({
      method: "POST",
      dataType: "text"
    }, this.ajaxOptions), t("send", !0), t("disabled", !1), t("required", !1), (s = this.options) != null && s.success && typeof ((n = this.options) == null ? void 0 : n.success) == "function" && (this.success = this.options.success), (a = this.options) != null && a.error && typeof ((r = this.options) == null ? void 0 : r.error) == "function" && (this.error = this.options.error), this.type) {
      case "select":
        e("source", []), typeof this.source == "string" && this.source !== "" && (this.source = JSON.parse(this.source));
        break;
      case "date":
        e("format", "YYYY-MM-DD"), e("viewformat", "YYYY-MM-DD");
        break;
      case "datetime":
        e("format", "YYYY-MM-DD HH:mm"), e("viewformat", "YYYY-MM-DD HH:mm"), this.value = moment(this.value).format("YYYY-MM-DDTHH:mm");
        break;
    }
  }
  init_text() {
    const e = "dark-editable-element-empty";
    this.element.classList.remove(e);
    let t = !0;
    switch (this.type) {
      default:
        this.value === "" ? this.element.innerHTML = this.emptytext : (this.element.innerHTML = this.value, t = !1);
        break;
      case "select":
        this.element.innerHTML = this.emptytext, this.value !== "" && this.source.length > 0 && this.source.forEach((s) => {
          s.value == this.value && (this.element.innerHTML = s.text, t = !1);
        });
        break;
      case "date":
      case "datetime":
        this.value === "" ? this.element.innerHTML = this.emptytext : (this.element.innerHTML = moment(this.value).format(this.viewformat), t = !1);
        break;
    }
    t && this.element.classList.add(e);
  }
  init_style() {
    this.element.classList.add("dark-editable-element");
  }
  /* INIT METHODS END */
  route_type() {
    switch (this.type) {
      default:
        throw new Error("Undefined type");
      case "text":
      case "password":
      case "email":
      case "url":
      case "tel":
      case "number":
      case "range":
      case "time":
        return this.type_input();
      case "textarea":
        return this.type_textarea();
      case "select":
        return this.type_select();
      case "date":
        return this.type_date();
      case "datetime":
        return this.type_datetime();
    }
  }
  /* TYPES */
  createElement(e) {
    const t = document.createElement(e);
    return t.classList.add("form-control"), this.required && (t.required = this.required), this.add_focus(t), t;
  }
  type_input() {
    const e = this.createElement("input");
    return e.type = this.type, this.createContainer(e);
  }
  type_textarea() {
    const e = this.createElement("textarea");
    return this.createContainer(e);
  }
  type_select() {
    const e = this.createElement("select");
    return this.source.forEach((t) => {
      const s = document.createElement("option");
      s.value = t.value, s.innerHTML = t.text, e.append(s);
    }), this.createContainer(e);
  }
  type_date() {
    const e = this.createElement("input");
    return e.type = "date", this.createContainer(e);
  }
  type_datetime() {
    const e = this.createElement("input");
    return e.type = "datetime-local", this.createContainer(e);
  }
  /* TYPES END */
  /* ADD FOCUS */
  add_focus(e) {
    this.element.addEventListener("shown", function() {
      e.focus();
    });
  }
  /* ADD FOCUS END */
  /* DIV LOAD */
  //true/false
  load(e) {
    e ? this._element.load.style.display = "block" : this._element.load.style.display = "none";
  }
  /* DIV LOAD END */
  /* DIV ERROR */
  setError(e) {
    this._element.error.innerHTML = e;
  }
  showError() {
    this._element.error.style.display = "block";
  }
  hideError() {
    this._element.error && (this._element.error.style.display = "none");
  }
  /* DIV ERROR END */
  /* CONTAINER DIV */
  createContainer(e) {
    const t = document.createElement("div");
    return this._element.element = e, this._element.error = this.createContainerError(), this._element.form = this.createContainerForm(e), this._element.load = this.createContainerLoad(), this._element.buttons.success = this.createButtonSuccess(), this._element.buttons.cancel = this.createButtonCancel(), this._element.form.append(e, this._element.load, this._element.buttons.success, this._element.buttons.cancel), t.append(this._element.error, this._element.form), t;
  }
  createContainerError() {
    const e = document.createElement("div");
    return e.classList.add("text-danger", "fst-italic", "mb-2", "fw-bold"), e.style.display = "none", e;
  }
  createContainerForm(e) {
    const t = document.createElement("form");
    return t.classList.add("d-flex", "align-items-start"), t.style.gap = "20px", t.addEventListener("submit", async (s) => {
      s.preventDefault();
      const n = e.value;
      if (this.send && this.pk && this.url && this.value != n) {
        this.load(!0);
        let a;
        try {
          const r = await this.ajax(n);
          r.ok ? a = await this.success(r, n) : a = await this.error(r, n) || `${r.status} ${r.statusText}`;
        } catch (r) {
          console.error(r), a = r;
        }
        a ? (this.setError(a), this.showError()) : (this.setError(null), this.hideError(), this.value = e.value, this.modeElement.hide(), this.init_text()), this.load(!1);
      } else
        this.value = e.value, this.modeElement.hide(), this.init_text();
      this.element.dispatchEvent(new CustomEvent("save"));
    }), t;
  }
  createContainerLoad() {
    const e = document.createElement("div");
    e.style.display = "none", e.style.position = "absolute", e.style.background = "white", e.style.width = "100%", e.style.height = "100%", e.style.top = 0, e.style.left = 0;
    const t = document.createElement("div");
    return t.classList.add("dark-editable-loader"), e.append(t), e;
  }
  /* CONTAINER DIV END */
  /* BUTTONS */
  createButton() {
    const e = document.createElement("button");
    return e.type = "button", e.classList.add("btn", "btn-sm"), e.style.color = "transparent", e.style.textShadow = "0 0 0 white", e;
  }
  createButtonSuccess() {
    const e = this.createButton();
    return e.type = "submit", e.classList.add("btn-success"), e.innerHTML = "✔", e;
  }
  createButtonCancel() {
    const e = this.createButton();
    e.classList.add("btn-danger");
    const t = document.createElement("div");
    return t.innerHTML = "✖", e.append(t), e.addEventListener("click", () => {
      this.modeElement.hide();
    }), e;
  }
  /* BUTTONS END */
  /* AJAX */
  ajax(e) {
    let t = this.url;
    const s = new FormData();
    s.append("pk", this.pk), s.append("name", this.name), s.append("value", e);
    const n = {};
    return n.method = this.ajaxOptions.method, n.method == "POST" ? n.body = s : t += "?" + new URLSearchParams(s).toString(), fetch(t, n);
  }
  async success(e, t) {
  }
  async error(e, t) {
  }
  /* AJAX END */
  /* METHODS */
  enable() {
    this.disabled = !1, this.element.classList.remove("dark-editable-element-disabled"), this.modeElement.enable();
  }
  disable() {
    this.disabled = !0, this.element.classList.add("dark-editable-element-disabled"), this.modeElement.enable();
  }
  setValue(e) {
    this.value = e, this.init_text();
  }
  getValue() {
    return this.value;
  }
  /* METHODS END */
}
export {
  E as default
};