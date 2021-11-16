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
 *
 * @prop {Object} opts Options Object
 * @prop {RegExp} regex Build Regexp
 */
class Complexity {

    /**
     * @constructor
     *
     * @param {Object} opts                 Options Object
     * @param {Number} opts.uppercase       Number of required chars - A through Z
     * @param {Number} opts.lowercase       Number of required chars - a through z
     * @param {Number} opts.special         Number of required chars - ! @ # $ & *
     * @param {Number} opts.digit           Number of required chars - 0 through 9
     * @param {Number} opts.alphaNumeric    Number of required chars - a through Z
     * @param {Number} opts.min             Minumum number of chars
     * @param {Number} opts.max             Maximum number of chars
     * @param {Number} opts.exact           Exact number of chars
     */
    constructor(opts = {}) {
        this.opts = opts;

        let regex = '^';

        for (const key in regexOptions) {
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
            regex += lengthOptions.no_limit;
        }
        regex += '$';

        this.regex = new RegExp(regex);
    }

    check(str) {
        return this.regex.test(str);
    }

    checkError(str, options) {
        const tempOption = {};
        const optionLength = {
            min   : options.min,
            max   : options.max,
            exact : options.exact
        };
        const returnObject = {};
        str = str || '';

        for (const key in regexOptions) {
            if (isNumber(options[key])) {
                tempOption[key]   = options[key];
                returnObject[key] = this.check(str, tempOption);
                delete tempOption[key];
            }
        }
        for (const key in optionLength) {
            if (isNumber(optionLength[key])) {
                tempOption[key]   = optionLength[key];
                returnObject[key] = this.check(str, tempOption);
                delete tempOption[key];
            }
        }
        return returnObject;
    }

}

function isNumber(object) {
    return typeof object === 'number';
}

module.exports = Complexity;
