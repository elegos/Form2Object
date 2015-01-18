Form2Object
===
by Giacomo Furlan
<[Blogfolio](http://giacomofurlan.name "Giacomo Furlan's Blogfolio")>

This is a plain javascript function, and thus requires no external libraries to work.

Form2Object allows the developer to generate an object structure loaded with data starting from the names of the inputs of a form (or any DOM structure containing nodes with the name attribute).

DOM values are always strings, but the function automatically detects numbers and convert them in numeric values.

You can try the function in the [live example](http://giacomofurlan.name/projects/form2obj/ "form2object live example").

How to use
===

All the function needs is a DOM element containing zero or more elements with the `name` and `value` attributes set. The `value` attribute may not be set, but the element will be discarded if the value is `undefined` (note: empty values are still accepted).

The `name` attribute must be set according to the object's path, for example `firstLevelVar.secondLevelVar.myVar`.

The function allows arrays, too. The only requirement is that indexes must be specified. There is no array nesting limit. For example: `arrVarOne[3].secondLevelVar.arrVarTwo[6].myVar`. Another example: `firstLevelVar.arrVarOne[0].myVar[3]`.

**Attention**: this is an **INVALID** name attribute (due to the lack of array index): `a[].b.c`.

To get the object simply call `[window.]Form2Object(myContainerElement)`.