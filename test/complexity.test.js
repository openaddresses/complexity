'use strict';

const test = require('tape');
const Complexity = require('..');

test('Complexity()', (t) => {
    try {
        const c = new Complexity();
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(not-numeric)', (t) => {
    try {
        const c = new Complexity({
            min: 'd'
        });

        t.fail('Should Error');
    } catch (err) {
        t.equals(err.message, 'min option must be numeric');
    }

    t.end();
});


test('Complexity(min)', (t) => {
    try {
        const c = new Complexity({
            min: 3
        });

        t.equals(c.check('1'), false)
        t.equals(c.check('1dt'), true)
        t.equals(c.check('1dtdgcC'), true)
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(max)', (t) => {
    try {
        const c = new Complexity({
            max: 3
        });

        t.equals(c.check('123'), true)
        t.equals(c.check('1'), true)
        t.equals(c.check('14fs'), false)
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(exact)', (t) => {
    try {
        const c = new Complexity({
            exact: 5
        });

        t.equals(c.check('1'), false)
        t.equals(c.check('14fs'), false)
        t.equals(c.check('14fs$'), true)
        t.equals(c.check('sfgTs#'), false)
        t.equals(c.check('fnLK-4d'), false)
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(exact/min)', (t) => {
    try {
        const c = new Complexity({
            exact: 2,
            min: 1
        });

        t.fail('Should Error');
    } catch (err) {
        t.equals(err.message, 'exact and min/max options cannot be used together');
    }

    t.end();
});

test('Complexity(exact/max)', (t) => {
    try {
        const c = new Complexity({
            exact: 2,
            max: 1
        });

        t.fail('Should Error');
    } catch (err) {
        t.equals(err.message, 'exact and min/max options cannot be used together');
    }

    t.end();
});

test('Complexity(lowercase)', (t) => {
    try {
        const c = new Complexity({
            lowercase: 2
        });

        t.equals(c.check('4Fd'), false)
        t.equals(c.check('e4Fd'), true)
        t.equals(c.check('ee'), true)
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(lowercase/min)', (t) => {
    try {
        const c = new Complexity({
            min: 4,
            lowercase: 2
        });

        t.equals(c.check('eDAFB'), false)
        t.equals(c.check('eDAFe'), true)
        t.equals(c.check('ee'), false)
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(uppercase)', (t) => {
    try {
        const c = new Complexity({
            uppercase: 2
        });

        t.equals(c.check('4Fd'), false)
        t.equals(c.check('e4Fd'), false)
        t.equals(c.check('FG'), true)
        t.equals(c.check('Fd6@6G'), true)
        t.equals(c.check('DSGFd6@6G'), true)
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(uppercase/min)', (t) => {
    try {
        const c = new Complexity({
            min: 4,
            uppercase: 2
        });

        t.equals(c.check('eDAFB'), true)
        t.equals(c.check('eDafe'), false)
        t.equals(c.check('EE'), false)
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(uppercase/lowercase/min)', (t) => {
    try {
        const c = new Complexity({
            min: 5,
            lowercase: 2,
            uppercase: 2

        });

        t.equals(c.check('eeEE'), false);
        t.equals(c.check('eEeE!'), true);
        t.equals(c.check('eeEeee'), false);
        t.equals(c.check('eEEEEE'), false);
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(digit)', (t) => {
    try {
        const c = new Complexity({
            digit: 2

        });

        t.equals(c.check('1ee'), false);
        t.equals(c.check('1ee2'), true);
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});

test('Complexity(special)', (t) => {
    try {
        const c = new Complexity({
            special: 2
        });

        t.equals(c.check('12aa'), false);
        t.equals(c.check('12aa!'), false);
        t.equals(c.check('12aa!@!'), true);
    } catch (err) {
        t.error(err, 'no errors');
    }

    t.end();
});
