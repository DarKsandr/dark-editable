// import { DarkEditable } from "./dark-editable/dark-editable.js";

const text = document.getElementById("text");

// const popover = new DarkEditable(text, {
//     type: "select",
//     value: 1,
//     source: [
//         {value: 1, text: "text1"}, {value: 2, text: "text2"}
//     ],
// });

const popover = new DarkEditable(text, {
    type: "text",
    value: "123",
    url: "/post",
    pk: 1,
    ajaxOptions: {
        method: "GET"
    }
});
