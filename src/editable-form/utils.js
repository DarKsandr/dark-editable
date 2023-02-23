import {editabletypes} from "../inputs/editable-types";

/**
* classic JS inheritance function
*/  
export function inherit (Child, Parent) {
    class F {}
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

/**
* set caret position in input
* see http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
*/        
export function setCursorPosition(elem, pos) {
    // see: https://github.com/vitalets/x-editable/issues/939
    if (elem.setSelectionRange && /text|search|password|tel|url/i.test(elem.type)) {
        try { elem.setSelectionRange(pos, pos); } catch (e) {}
    } else if (elem.createTextRange) {
        const range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

/**
* function to parse JSON in *single* quotes. (jquery automatically parse only double quotes)
* That allows such code as: <a data-source="{'a': 'b', 'c': 'd'}">
* safe = true --> means no exception will be thrown
* for details see http://stackoverflow.com/questions/7410348/how-to-set-json-format-to-html5-data-attributes-in-the-jquery
*/
export function tryParseJson(s, safe) {
    if (typeof s === 'string' && s.length && s.match(/^[\{\[].*[\}\]]$/)) {
        if (safe) {
            try {
                /*jslint evil: true*/
                s = (new Function('return ' + s))();
                /*jslint evil: false*/
            } catch (e) {} finally {
                return s;
            }
        } else {
            /*jslint evil: true*/
            s = (new Function('return ' + s))();
            /*jslint evil: false*/
        }
    }
    return s;
}

/**
* slice object by specified keys
*/
export function sliceObj(obj, keys, caseSensitive /* default: false */) {
    let key, keyLower, newObj = {};

    if (!Array.isArray(keys) || !keys.length) {
        return newObj;
    }

    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }

        if(caseSensitive === true) {
            continue;
        }

        //when getting data-* attributes via $.data() it's converted to lowercase.
        //details: http://stackoverflow.com/questions/7602565/using-data-attributes-with-jquery
        //workaround is code below.
        keyLower = key.toLowerCase();
        if (obj.hasOwnProperty(keyLower)) {
            newObj[key] = obj[keyLower];
        }
    }

    return newObj;
}

/*
exclude complex objects from $.data() before pass to config
*/
export function getConfigData(element) {
    const data = {};
    const dataset = element.dataset;
    for(const k in dataset){
        const v = dataset[ k ];
        if(typeof v !== 'object' || (v && typeof v === 'object' && (v.constructor === Object || v.constructor === Array))) {
            data[k] = v;
        }
    }
    return data;
}

/*
 returns keys of object
*/
export function objectKeys(o) {
    if (Object.keys) {
        return Object.keys(o);  
    } else {
        if (o !== Object(o)) {
            throw new TypeError('Object.keys called on a non-object');
        }
        const k=[];
        for (const p in o) {
            if (Object.prototype.hasOwnProperty.call(o,p)) {
                k.push(p);
            }
        }
        return k;
    }

}

/**
method to escape html.
**/
export function escape(str) {
   return $('<div>').text(str).html();
}

/*
returns array items from sourceData having value property equal or inArray of 'value'
*/
export function itemsByValue(value, sourceData, valueProp) {
   if(!sourceData || value === null) {
       return [];
   }
   
   if (typeof(valueProp) !== "function") {
       var idKey = valueProp || 'value';
       valueProp = function (e) { return e[idKey]; };
   }
              
   var isValArray = $.isArray(value),
   result = [], 
   that = this;

   $.each(sourceData, function(i, o) {
       if(o.children) {
           result = result.concat(that.itemsByValue(value, o.children, valueProp));
       } else {
           /*jslint eqeq: true*/
           if(isValArray) {
               if($.grep(value, function(v){  return v == (o && typeof o === 'object' ? valueProp(o) : o); }).length) {
                   result.push(o); 
               }
           } else {
               var itemValue = (o && (typeof o === 'object')) ? valueProp(o) : o;
               if(value == itemValue) {
                   result.push(o); 
               }
           }
           /*jslint eqeq: false*/
       }
   });
   
   return result;
}

/*
Returns input by options: type, mode. 
*/
export function createInput(options) {
   let TypeConstructor, typeOptions, input,
   type = options.type;

   //`date` is some kind of virtual type that is transformed to one of exact types
   //depending on mode and core lib
   if(type === 'date') {
       //inline
       if(options.mode === 'inline') {
           if(editabletypes.datefield) {
               type = 'datefield';
           } else if(editabletypes.dateuifield) {
               type = 'dateuifield';
           }
       //popup
       } else {
           if(editabletypes.date) {
               type = 'date';
           } else if(editabletypes.dateui) {
               type = 'dateui';
           }
       }
       
       //if type still `date` and not exist in types, replace with `combodate` that is base input
       if(type === 'date' && !editabletypes.date) {
           type = 'combodate';
       } 
   }
   
   //`datetime` should be datetimefield in 'inline' mode
   if(type === 'datetime' && options.mode === 'inline') {
     type = 'datetimefield';  
   }           

   //change wysihtml5 to textarea for jquery UI and plain versions
   if(type === 'wysihtml5' && !$.fn.editabletypes[type]) {
       type = 'textarea';
   }

   //create input of specified type. Input will be used for converting value, not in form
   if(typeof editabletypes[type] === 'function') {
       TypeConstructor = editabletypes[type];
       typeOptions = sliceObj(options, objectKeys(TypeConstructor.defaults));
       input = new TypeConstructor(typeOptions);
       return input;
   } else {
       console.error(`Unknown type: ${type}`);
       return false; 
   }  
}

//see http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
export function supportsTransitions() {
   let b = document.body || document.documentElement,
       s = b.style,
       p = 'transition',
       v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
       
   if(typeof s[p] === 'string') {
       return true; 
   }

   // Tests for vendor specific prop
   p = p.charAt(0).toUpperCase() + p.substr(1);
   for(let i=0; i<v.length; i++) {
       if(typeof s[v[i] + p] === 'string') { 
           return true; 
       }
   }
   return false;
}

export function is_visible(element){
    return !(element.style.display === 'none' || element.style.visibility === "hidden");
}