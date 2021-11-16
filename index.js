'use strict';

const regexOptions = {
    uppercase    : '.*[A-Z]',
    special      : '.*[^A-Za-z0-9]',
    digit        : '.*[0-9]',
    lowercase    : '.*[a-z]',
    upperLower   : '.*[a-zA-Z]',
    alphaNumeric : '.*[a-zA-Z0-9]'
};

const lengthOptions = {
    min      : '.{n,}',
    max      : '.{0,n}',
    range    : '.{min,max}',
    exact    : '.{n}',
    no_limit : '.*'
};


/**
 * @class
 */
class Complexity {
    /**
     * @constructor
     */
    constructor(opts) {
        const regex = '^';

        for (var key in regexOptions) {
            if (isNumber(opts[key])) {
                regex += '(?=' + regexOptions[key].repeat(opts[key]) + ')';
            }
        }
        if (isNumber(opts.min) && isNumber(opts.max)) {
            regex += lengthOptions.range.replace('min', opts.ran).replace('max', opts.max);
        } else if (isNumber(opts.max)) {
            regex += lengthOptions.max.replace('n', opts.max);
        } else if (isNumber(opts.min)) {
            regex += lengthOptions.min.replace('n', opts.min);
        } else if (isNumber(opts.exact)) {
            regex += lengthOptions.exact.replace('n', opts.exact);
        } else {
            regex += lengthOptions.no_limit
        }
        regex += '$'

        this.regex = new RegExp(regex);
    }

    check(str) {
        return this.regex.test(str);
    }

    checkError(str, options) {
        var tempOption   = {}
            , optionLength = {
                min   : options.min,
                max   : options.max,
                exact : options.exact
            }
            , returnObject = {}
            , str = str || ''
        ;
        for (var key in regexOptions) {
            if (isNumber(options[key])) {
                tempOption[key]   = options[key];
                returnObject[key] = check(str, tempOption);
                delete tempOption[key];
            }
        }
        for (key in optionLength) {
            if (isNumber(optionLength[key])) {
                tempOption[key]   = optionLength[key];
                returnObject[key] = check(str, tempOption);
                delete tempOption[key]
            }
        }
        return returnObject;
    }

}

function isNumber(object) {
  return typeof object === 'number';
}

module.exports = Complexity;
