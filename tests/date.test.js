const moment = require('moment');

const date = require('../date');

describe('when passing a duration', () => {
    describe('when passing days', () => {
        test('should return the correct date', () => {
            const actual = date('3 days ago');

            expect(moment().diff(actual, 'days')).toEqual(3);
        });
    });

    describe('when passing weeks', () => {
        const actual = date('3 week');

        expect(moment().diff(actual, 'days')).toEqual(21);
    });
});

describe('when passing a complete date', () => {
    test('should parse it correctly', () => {
        const actual = date('2022-10-16');

        expect(moment('2022-10-16').isSame(actual)).toBeTruthy();
    });
});

describe('when passing a partial date', () => {
    test('should parse it correctly', () => {
        const actual = date('2022');

        expect(moment('2022-01-01').isSame(actual)).toBeTruthy();
    });
});
