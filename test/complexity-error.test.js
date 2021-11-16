'use strict';

const test = require('tape');
const Complexity = require('..');

test('Complexity(min)', (t) => {
    try {
        const c = new Complexity({
            min: 5
        });

        t.deepEquals(c.checkError('432a'), {
            min: false
        });

        t.deepEquals(c.checkError('432adad'), {
            min: true
        });
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(max)', (t) => {
    try {
        const c = new Complexity({
            max: 5
        });

        t.deepEquals(c.checkError('432a'), {
            max: true
        });

        t.deepEquals(c.checkError('432adad'), {
            max: false
        });
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(min/max)', (t) => {
    try {
        const c = new Complexity({
            min: 4,
            max: 5
        });

        t.deepEquals(c.checkError('432a'), {
            min: true,
            max: true
        });

        t.deepEquals(c.checkError('432adad'), {
            min: true,
            max: false
        });
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(exact)', (t) => {
    try {
        const c = new Complexity({
            exact: 4,
        });

        t.deepEquals(c.checkError('432a'), {
            exact: true
        });

        t.deepEquals(c.checkError('432adad'), {
            exact: false
        });
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(special)', (t) => {
    try {
        const c = new Complexity({
            special: 4,
        });

        t.deepEquals(c.checkError('432a'), {
            special: false
        });

        t.deepEquals(c.checkError('DF5$2@&^432ada$d'), {
            special: true
        });
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(lowercase/uppercase)', (t) => {
    try {
        const c = new Complexity({
            lowercase: 4,
            uppercase: 4
        });

        t.deepEquals(c.checkError('432aD'), {
            lowercase: false,
            uppercase: false
        });

        t.deepEquals(c.checkError('432aDDDD'), {
            lowercase: false,
            uppercase: true
        });

        t.deepEquals(c.checkError('432aDDDDfsadf'), {
            lowercase: true,
            uppercase: true
        });

    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});
