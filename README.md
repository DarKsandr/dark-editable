# Getting started
It is an alternative to [x-editable](https://github.com/vitalets/x-editable). Written in pure JavaScript.

Here's a quick demo on [jfiddle](https://jsfiddle.net/DarKsandr/8zfd32jp/) to give you some example of how it works.

## Quick start
You can install via npm 
```
npm i dark-editable
```
or manually:

Required
- Bootstrap 5
- Popper
- Moment.js
1. Include it on your page. 
    ```
    <link rel="stylesheet" href="bootstrap.min.css">
    <script src="bootstrap.bundle.min.js"></script>
    <script src="moment.js"></script>
    ```

2. Download corresponding dark-editable build and include it on your page:
    ```
    <script src="dark-editable.js"></script>
    ```

    If you can import then use:
    ```
    dist/dark-editable.js
    ```
    If you just want to connect globally to the page then use:
    ```
    dist/dark-editable.iife.js
    ```

3. Markup elements that should be editable. Usually it is ```<A>``` element with additional ```data-*``` attributes

    ```
    <a id="username" data-type="text" data-pk="1" data-url="/post" data-title="Enter username">superuser</a>
    ```
    Main attributes you should define are:
    - ```type``` - type of input (text, textarea, select, etc)
    - ```url``` - url to server-side script to process submitted value (/post, post.php etc)
    - ```pk``` - primary key of record to be updated (ID in db)
    - ```id``` or ```name``` - name of field to be updated (column in db). Taken from ```id``` or ```data-name``` attribute
    - ```value``` - initial value. Usefull for select, where value is integer key of text to be shown. If *empty* - will be taken from element html contents
4. Enable popovers via JavaScript:
    ```
    const usernameEl = document.getElementById('username');
    const popover = new DarkEditable(usernameEl);
    ```
    Alternatively, you can set all options via javascript
    ```
    <a id="username">superuser</a>
    ```
    ```
    const usernameEl = document.getElementById('username');
    const popover = new DarkEditable(usernameEl, {
        type: 'text',
        pk: 1,
        url: '/post',
        title: 'Enter username'
    });
    ```
5. Frontend ready!\
    Open your page and click on element. Enter new value and submit form. It will send ajax request with new value to ```/post```.\
    Request contains name, value and pk of record to be updated:
    ```
    POST /post
    {
        name:  'username',  //name of field (column in db)
        pk:    1            //primary key (record id)
        value: 'superuser!' //new value
    }
    ```
6. Write backend part: \
    X-editable has no limitation to server-side part: you can write it on any language you prefer.\
    For example, you want to validate submitted value on server:
    - If value is valid, you should return HTTP status 200 OK. Element on page will be updated automatically. No response body required.
    - If value is not valid, you should return HTTP status != 200 (e.g. 400 Bad request) with error message in response body. Element on page will not be updated and editable form will display error message.

    **JSON response:**\
    If your server returns JSON, you can always send HTTP status 200 with error flag in response body.\
    To process it use success handler:

    response - [Fetch Response](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
    ```
    const usernameEl = document.getElementById('username');
    const popover = new DarkEditable(usernameEl, {
        ...
        success: async function(response, newValue) {
            const res = await response.json();
            if(res.error == 'error') return res.msg; //msg will be shown in editable form
        }
    });
    ```
    **Work LOCALLY:**\
    If you don't want to send value on server, just keep empty url option. You can process value in success handler:
    ```
    const usernameEl = document.getElementById('username');
    const popover = new DarkEditable(usernameEl, {
        type: 'text',
        title: 'Enter username',
    });
    ```
# Options
Options can be defined via javascript or via data-* html attributes.

| Name         | Type            | Default        | Description                                                                                                                                              |
|--------------|-----------------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| ajaxOptions  | object          | {}           | empty                                                                                                                         |
| disabled     | boolean         | false          | Sets disabled state of editable                                                                                                                          |
| emptytext    | string          | 'Empty'        | Text shown when element is empty.                                                                                                                        |
| error        | function        | null           |                                                                                                                                                          |
| success      | function        | null           |                                                                                                                                                          |
| name         | string          | null           | Name of field. Will be submitted on server. Can be taken from ```id``` attribute                                                                         |
| pk           | string          | null           | Primary key of editable object (e.g. record id in database).                                                                                             |
| send         | boolean         | true           | Strategy for sending data on server. When ```true``` data will be sent on server only if pk and url defined, otherwise new value will be stored locally. |
| showbuttons  | boolean         | true           | Form without buttons is auto-submitted.                                                                                                                  |
| type         | string or Class | 'text'         | Type of input. Can be text/textarea/select/date and more                                                                                                 |
| url          | string          | null           | Url for submit, e.g. ```'/post'```                                                                                                                       |
| value        | mixed           | element's text | Initial value of input. If not set, taken from element's text.                                                                                           |
| mode         | string          | 'popup'        | Mode of editable, can be popup or inline.                                                                                                                |
| popoverOptions         | object          | {}        | Bootstrap Popover Options                                                                                                                |
# Methods
| Method          | Parameters                    | Description                                 |
|-----------------|-------------------------------|---------------------------------------------|
| disable()       | none                          | Disables editable                           |
| enable()        | none                          | Enables editable                            |
| getValue()      | none                          | Returns current values of editable elements |
| setValue(value) | - **value** *Mixed* new value | Sets new value of editable                  |
# Events
```
document.getElementById("username").addEventListener("save", function(e){
    alert('Saved value');
})
```
| Event  | Callback parameters               | Description                                                                                                  |
|--------|-----------------------------------|--------------------------------------------------------------------------------------------------------------|
| show   | - **event** *Object* event object | Fired when container is show and form is rendered.                                                           |
| shown  | - **event** *Object* event object | Fired when container is shown and form is rendered.                                                          |
| hide   | - **event** *Object* event object | Fired when container was hide. It occurs on both save or cancel.                                             |
| hidden | - **event** *Object* event object | Fired when container was hidden. It occurs on both save or cancel.                                           |
| init   | - **event** *Object* event object | Fired when element was initialized. Please note that you should setup init handler before applying editable. |
| save   | - **event** *Object* event object | Fired when new value was submitted.                                                                          |
# Inputs
There are several input types supported by library. Each type may have additional configuration options.\
Currently supported:
- text
- textarea
- select
- date
- datetime
- html5types
## text
Text input

| Name        | Type   | Default | Description                                                |
|-------------|--------|---------|------------------------------------------------------------|
| placeholder | string | null    | Placeholder attribute of input. Shown when input is empty. |

## textarea
Textarea input

| Name        | Type   | Default | Description                                                |
|-------------|--------|---------|------------------------------------------------------------|
| placeholder | string | null    | Placeholder attribute of input. Shown when input is empty. |
## select
Select (dropdown)

| Name   | Type  | Default | Description                                                                                                          |
|--------|-------|---------|----------------------------------------------------------------------------------------------------------------------|
| source | array | []      | Source data for list. If array - it should be in format: [{value: 1, text: "text1"}, {value: 2, text: "text2"}, ...] |
## date
Textarea input

| Name       | Type   | Default    | Description                                                                                                         |
|------------|--------|------------|---------------------------------------------------------------------------------------------------------------------|
| format     | string | YYYY-MM-DD | Format used for sending value to server. Also applied when converting date from data-value attribute. Use moment.js |
| viewformat | string | YYYY-MM-DD | Format used for displaying date. Also applied when converting date from element's text on init. Use moment.js       |
## datetime
Textarea input

| Name       | Type   | Default          | Description                                                                                                         |
|------------|--------|------------------|---------------------------------------------------------------------------------------------------------------------|
| format     | string | YYYY-MM-DD HH:mm | Format used for sending value to server. Also applied when converting date from data-value attribute. Use moment.js |
| viewformat | string | YYYY-MM-DD HH:mm | Format used for displaying date. Also applied when converting date from element's text on init. Use moment.js       |
## html5types
HTML5 input types. Following types are supported:
- password
- email
- url
- tel
- number
- range
- time

| Name        | Type   | Default | Description                                                |
| ----------- | ------ | ------- | ---------------------------------------------------------- |
| attributes  | object |  {}     | A map of HTML5 input attributes to apply on the input.     |

### Example

```js
const popover = new DarkEditable(el, {
    type: 'number',
    attributes: {
        placeholder: 'Enter age',
        min: 0,
        max: 120,
        step: 1,
        required: true
    }
});
```
