<h1 align=center>Complexity</h1>

Helps validate the complexity of a string. It builds regular expressions based on common settings for passwords, usernames, and other user identification methods

Forked from [mlabieniec/complexity](https://github.com/mlabieniec/complexity)

## Install

Command Line

```
npm add @openaddresses/complexity
```

## Use

First, you will need to have an object defining your options. Each key is a setting for your regular expression,
and the value is the number of occurances you would like to have for that setting:

```js
const Complexity = require('complexity');

const compexity = new Complexity({
    uppercase    : 1,  // A through Z
    lowercase    : 1,  // a through z
    special      : 1,  // ! @ # $ & *
    digit        : 1,  // 0 through 9
    alphaNumeric : 1,  // a through Z and 0 through 9
    min          : 8,  // minumum number of chars
    max          : 16, // maximum number of chars (not recommended)
    exact        : 20  // exact number of chars (not recommended)
});
```

#### `complexity.check(password)`

Takes in a string to check against the regex that will be created from the options given. Return true if the string matches, returns false if it doesn't

```js
if (complexity.check(pass)) {
  // now that your password checks out...
}
```

#### `complexity.checkError(password)`

This method is similar to one mentioned above, but rather than just returning true or false,
it returns an object with all of the settings you passed in. For each key in the object,
it will be set to true if the string passed in matches that setting, or false if the string
passed in fails that setting.

```js
const passwordComplexity = complexity.checkError(pass)

console.log(passwordComplexity);

//  {
//    uppercase : true,
//    lowercase : true,
//    special   : false,
//    digit     : false,
//    min       : true,
//    max       : true
//  }

