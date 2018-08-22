const { isObject } = require("./testing-functions");

describe('isObject', () => {
    it('should return false for arrays, strings, numbers, and etc.', () => {
        const testsArr = ['ab', [], null, undefined, 5, '', NaN, 0];

        testsArr.forEach(item => {
            expect(isObject(item)).toBeFalsy();
        });
    });
    it('should return true for objects only', () => {
        expect(isObject({})).toBeTruthy();
        expect(isObject({ test: 'another test'})).toBeTruthy();
        expect(isObject({ test: { 'another test': false }})).toBeTruthy();
    });
})