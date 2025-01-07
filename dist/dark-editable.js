import './dark-editable.css';var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Popover } from "bootstrap";
import moment$1 from "moment";
class BaseMode {
  constructor(context) {
    if (this.constructor === BaseMode) {
      throw new Error(`It's abstract class`);
    }
    this.context = context;
  }
  event_show() {
    this.context.typeElement.hideError();
    this.context.typeElement.element.value = this.context.value;
    this.context.element.dispatchEvent(new CustomEvent("show"));
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
class PopupMode extends BaseMode {
  init() {
    this.popover = new Popover(this.context.element, {
      container: "body",
      content: this.context.typeElement.create(),
      html: true,
      customClass: "dark-editable",
      title: this.context.title
    });
    this.context.element.addEventListener("show.bs.popover", () => {
      this.event_show();
    });
    this.context.element.addEventListener("shown.bs.popover", () => {
      this.event_shown();
    });
    this.context.element.addEventListener("hide.bs.popover", () => {
      this.event_hide();
    });
    this.context.element.addEventListener("hidden.bs.popover", () => {
      this.event_hidden();
    });
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (target === this.popover.tip || target === this.context.element) return;
      let current = target;
      while (current = current.parentNode) {
        if (current === this.popover.tip) return;
      }
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
class InlineMode extends BaseMode {
  init() {
    const open = () => {
      if (!this.context.disabled) {
        const item = this.context.typeElement.create();
        this.event_show();
        this.context.element.removeEventListener("click", open);
        this.context.element.innerHTML = "";
        this.context.element.append(item);
        this.event_shown();
      }
    };
    this.context.element.addEventListener("click", open);
  }
  enable() {
  }
  disable() {
  }
  hide() {
    this.event_hide();
    this.context.element.innerHTML = this.context.value;
    setTimeout(() => {
      this.init();
      this.event_hidden();
    }, 100);
  }
}
class BaseType {
  constructor(context) {
    __publicField(this, "context", null);
    __publicField(this, "element", null);
    __publicField(this, "error", null);
    __publicField(this, "form", null);
    __publicField(this, "load", null);
    __publicField(this, "buttons", { success: null, cancel: null });
    if (this.constructor === BaseType) {
      throw new Error(`It's abstract class`);
    }
    this.context = context;
  }
  create() {
    throw new Error("Method `create` not define!");
  }
  createContainer(element) {
    const div = document.createElement(`div`);
    this.element = element;
    this.error = this.createContainerError();
    this.form = this.createContainerForm();
    this.load = this.createContainerLoad();
    this.form.append(element, this.load);
    this.buttons.success = null;
    this.buttons.cancel = null;
    if (this.context.showbuttons) {
      this.buttons.success = this.createButtonSuccess();
      this.buttons.cancel = this.createButtonCancel();
      this.form.append(this.buttons.success, this.buttons.cancel);
    }
    div.append(this.error, this.form);
    return div;
  }
  createContainerError() {
    const div = document.createElement(`div`);
    div.classList.add("text-danger", "fst-italic", "mb-2", "fw-bold");
    div.style.display = "none";
    return div;
  }
  createContainerForm() {
    const form = document.createElement(`form`);
    form.classList.add("d-flex", "align-items-start");
    form.style.gap = "20px";
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newValue = this.getValue();
      if (this.context.send && this.context.pk && this.context.url && this.context.value !== newValue) {
        this.showLoad();
        let msg;
        try {
          const response = await this.ajax(newValue);
          if (response.ok) {
            msg = await this.context.success(response, newValue);
          } else {
            msg = await this.context.error(response, newValue) || `${response.status} ${response.statusText}`;
          }
        } catch (error) {
          console.error(error);
          msg = error;
        }
        if (msg) {
          this.setError(msg);
          this.showError();
        } else {
          this.setError(null);
          this.hideError();
          this.context.value = this.getValue();
          this.context.modeElement.hide();
          this.initText();
        }
        this.hideLoad();
      } else {
        this.context.value = this.getValue();
        this.context.modeElement.hide();
        this.initText();
      }
      this.context.element.dispatchEvent(new CustomEvent("save"));
    });
    return form;
  }
  createContainerLoad() {
    const div = document.createElement(`div`);
    div.style.display = "none";
    div.style.position = "absolute";
    div.style.background = "white";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.top = 0;
    div.style.left = 0;
    const loader = document.createElement(`div`);
    loader.classList.add("dark-editable-loader");
    div.append(loader);
    return div;
  }
  createButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn", "btn-sm");
    button.style.color = "transparent";
    button.style.textShadow = "0 0 0 white";
    return button;
  }
  createButtonSuccess() {
    const btn_success = this.createButton();
    btn_success.type = "submit";
    btn_success.classList.add("btn-success");
    btn_success.innerHTML = "✔";
    return btn_success;
  }
  createButtonCancel() {
    const btn_cancel = this.createButton();
    btn_cancel.classList.add("btn-danger");
    const div = document.createElement("div");
    div.innerHTML = "✖";
    btn_cancel.append(div);
    btn_cancel.addEventListener("click", () => {
      this.context.modeElement.hide();
    });
    return btn_cancel;
  }
  hideLoad() {
    this.load.style.display = "none";
  }
  showLoad() {
    this.load.style.display = "block";
  }
  ajax(new_value) {
    let url = this.context.url;
    const form = new FormData();
    form.append("pk", this.context.pk);
    form.append("name", this.context.name);
    form.append("value", new_value);
    const option = {};
    option.method = this.context.ajaxOptions.method;
    if (option.method === "POST") {
      option.body = form;
    } else {
      url += "?" + new URLSearchParams(form).toString();
    }
    return fetch(url, option);
  }
  async successResponse(response, newValue) {
  }
  async errorResponse(response, newValue) {
  }
  setError(errorMsg) {
    this.error.innerHTML = errorMsg;
  }
  showError() {
    this.error.style.display = "block";
  }
  hideError() {
    if (this.error) {
      this.error.style.display = "none";
    }
  }
  createElement(name) {
    const element = document.createElement(name);
    element.classList.add("form-control");
    if (this.context.required) {
      element.required = this.context.required;
    }
    if (!this.context.showbuttons) {
      element.addEventListener("change", () => {
        this.form.dispatchEvent(new Event("submit"));
      });
    }
    this.add_focus(element);
    return element;
  }
  add_focus(element) {
    this.context.element.addEventListener("shown", function() {
      element.focus();
    });
  }
  initText() {
    if (this.context.value === "") {
      this.context.element.innerHTML = this.context.emptytext;
      return true;
    } else {
      this.context.element.innerHTML = this.context.value;
      return false;
    }
  }
  initOptions() {
  }
  getValue() {
    return this.element.value;
  }
}
class InputType extends BaseType {
  create() {
    const input = this.createElement(`input`);
    input.type = this.context.type;
    return this.createContainer(input);
  }
}
class TextAreaType extends BaseType {
  create() {
    const textarea = this.createElement(`textarea`);
    return this.createContainer(textarea);
  }
}
class SelectType extends BaseType {
  create() {
    const select = this.createElement(`select`);
    this.context.source.forEach((item) => {
      const opt = document.createElement(`option`);
      opt.value = item.value;
      opt.innerHTML = item.text;
      select.append(opt);
    });
    return this.createContainer(select);
  }
  initText() {
    this.context.element.innerHTML = this.context.emptytext;
    if (this.context.value !== "" && this.context.source.length > 0) {
      for (const key in this.context.source) {
        const item = this.context.source[key];
        if (item.value == this.context.value) {
          this.context.element.innerHTML = item.text;
          return false;
        }
      }
    }
    return true;
  }
  initOptions() {
    this.context.get_opt("source", []);
    if (typeof this.context.source === "string" && this.context.source !== "") {
      this.context.source = JSON.parse(this.context.source);
    }
  }
}
class DateType extends BaseType {
  create() {
    const input = this.createElement(`input`);
    input.type = "date";
    return this.createContainer(input);
  }
  initText() {
    if (this.value === "") {
      this.context.element.innerHTML = this.context.emptytext;
      return true;
    } else {
      this.context.element.innerHTML = moment(this.context.value).format(this.context.viewformat);
      return false;
    }
  }
  initOptions() {
    this.context.get_opt("format", "YYYY-MM-DD");
    this.context.get_opt("viewformat", "YYYY-MM-DD");
  }
}
class DateTimeType extends DateType {
  create() {
    const input = this.createElement(`input`);
    input.type = "datetime-local";
    return this.createContainer(input);
  }
  initOptions() {
    this.context.get_opt("format", "YYYY-MM-DD HH:mm");
    this.context.get_opt("viewformat", "YYYY-MM-DD HH:mm");
    this.context.value = moment$1(this.context.value).format("YYYY-MM-DDTHH:mm");
  }
}
/*!
 * DarkEditable.js
 * License: MIT
 */
class DarkEditable {
  constructor(element, options = {}) {
    __publicField(this, "modeElement", null);
    __publicField(this, "typeElement", null);
    __publicField(this, "mode", null);
    __publicField(this, "type", null);
    __publicField(this, "emptytext", null);
    __publicField(this, "viewformat", null);
    __publicField(this, "pk", null);
    __publicField(this, "name", null);
    this.element = element;
    this.options = options;
    this.init_options();
    this.typeElement = this.route_type();
    this.typeElement.initOptions();
    this.modeElement = this.route_mode();
    this.modeElement.init();
    this.init_text();
    this.init_style();
    if (this.disabled) {
      this.disable();
    }
    this.element.dispatchEvent(new CustomEvent("init"));
  }
  /* INIT METHODS */
  get_opt(name, default_value) {
    var _a, _b;
    return this[name] = ((_a = this.element.dataset) == null ? void 0 : _a[name]) ?? ((_b = this.options) == null ? void 0 : _b[name]) ?? default_value;
  }
  get_opt_bool(name, default_value) {
    this.get_opt(name, default_value);
    if (typeof this[name] !== "boolean") {
      if (this[name] === "true") {
        this[name] = true;
      } else if (this[name] === "false") {
        this[name] = false;
      } else {
        this[name] = default_value;
      }
    }
    return this[name];
  }
  init_options() {
    var _a, _b, _c, _d;
    this.get_opt("value", this.element.innerHTML);
    this.get_opt("name", this.element.id);
    this.get_opt("pk", null);
    this.get_opt("title", "");
    this.get_opt("type", "text");
    this.get_opt("emptytext", "Empty");
    this.get_opt("mode", "popup");
    this.get_opt("url", null);
    this.get_opt("ajaxOptions", {});
    this.ajaxOptions = Object.assign({
      method: "POST",
      dataType: "text"
    }, this.ajaxOptions);
    this.get_opt_bool("send", true);
    this.get_opt_bool("disabled", false);
    this.get_opt_bool("required", false);
    this.get_opt_bool("showbuttons", true);
    if (((_a = this.options) == null ? void 0 : _a.success) && typeof ((_b = this.options) == null ? void 0 : _b.success) == "function") {
      this.success = this.options.success;
    }
    if (((_c = this.options) == null ? void 0 : _c.error) && typeof ((_d = this.options) == null ? void 0 : _d.error) == "function") {
      this.error = this.options.error;
    }
  }
  init_text() {
    const empty_class = "dark-editable-element-empty";
    this.element.classList.remove(empty_class);
    if (this.typeElement.initText()) {
      this.element.classList.add(empty_class);
    }
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
        return new PopupMode(this);
      case "inline":
        return new InlineMode(this);
    }
  }
  route_type() {
    if (this.type.prototype instanceof BaseType) {
      return new this.type(this);
    }
    if (typeof this.type === "string") {
      switch (this.type) {
        case "text":
        case "password":
        case "email":
        case "url":
        case "tel":
        case "number":
        case "range":
        case "time":
          return new InputType(this);
        case "textarea":
          return new TextAreaType(this);
        case "select":
          return new SelectType(this);
        case "date":
          return new DateType(this);
        case "datetime":
          return new DateTimeType(this);
      }
    }
    throw new Error(`Undefined type`);
  }
  /* AJAX */
  async success(response, newValue) {
    return await this.typeElement.successResponse(response, newValue);
  }
  async error(response, newValue) {
    return await this.typeElement.errorResponse(response, newValue);
  }
  /* AJAX END */
  /* METHODS */
  enable() {
    this.disabled = false;
    this.element.classList.remove("dark-editable-element-disabled");
    this.modeElement.enable();
  }
  disable() {
    this.disabled = true;
    this.element.classList.add("dark-editable-element-disabled");
    this.modeElement.enable();
  }
  setValue(value) {
    this.value = value;
    this.init_text();
  }
  getValue() {
    return this.value;
  }
  /* METHODS END */
}
export {
  DarkEditable as default
};
//# sourceMappingURL=dark-editable.js.map
