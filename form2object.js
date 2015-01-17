/*jshint browser: true, -W084, -W098*/

/**
* Form2Object by Giacomo Furlan
* For contacts and more info:
* <http://giacomofurlan.name>
* 
* This function allows the developer to generate an object structure
* starting from the names of the inputs of a form (or any DOM structure
* containing nodes with the name attribute).
* 
* Values can be numeric or strings (they are automatically recognised via isNaN).
*
* Object may contain other objects or arrays.
* ARRAY INDEXES MUST BE SPECIFIED.
* 
* *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***
* 
* For example an input with name="a.b.c" and value="7" will generate an object
* like this: { a: { b: { c: 7 } } }
* 
* Array example: name="a.b[2]" value="ab2" will generate the following object:
* { a: { b = [ null, null, "ab2" ] } }
* NOTE: name="a.b[]" is ILLEGAL and won't work.
* 
*/

window.Form2Object = function (formElement) {
  "use strict";

  var elements = formElement.querySelectorAll('[name]'),
      elem = null,
      output = {},
      variable = '',
      value = '',
      path = [],
      obj = null,
      node = "",
      nodeName = "",
      index = 0,
      i = 0,
      j = 0,
      arrayNode = /(.*)\[(\d+)\]/,
      matches = null;

  function isArray(varName) {
    return varName.match(arrayNode);
  }

  for (i; i < elements.length; i += 1) {
    elem = elements[i];

    if (!elem.name || elem.value === undefined) {
      continue;
    }

    obj = output;

    path = elem.name.split('.');
    variable = path.pop();
    value = elem.value;


    while (node = nodeName = path.shift()) {
      if (matches = isArray(node)) {
        nodeName = matches[1];
        index = parseInt(matches[2]);
      }

      if (!obj.hasOwnProperty(nodeName)) {
        if (matches !== null) {
          obj[nodeName] = [];
        } else {
          obj[nodeName] = {};
        }
      }

      obj = obj[nodeName];

      if(matches) {
        if (obj[index] === undefined) {
          obj[index] = {};
        }
        obj = obj[index];
      }
    }

    if (matches = isArray(variable)) {
      nodeName = matches[1];
      index = parseInt(matches[2]);

      if (!Array.isArray(obj[nodeName])) {
        obj[nodeName] = [];
      }
      obj[nodeName][index] = value;
    } else {
      obj[variable] = value;
    }
  }

  return output;

};