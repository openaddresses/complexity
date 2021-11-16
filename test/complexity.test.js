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
