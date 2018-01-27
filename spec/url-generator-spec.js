'use babel';

import { range } from 'ramda';

import { CARBON_URL, getCarbonURL } from '../lib/generate-url';

describe('.getCarbonURL', () => {
    it('should be a function with arity 1', () => {
        // Assert
        expect(typeof(getCarbonURL)).toBe('function');
        expect(getCarbonURL.length).toBe(1);
    });

    it('should return the CARBON_URL concat\'d with the code', () => {
        // Arrange
        const code = '  var test;  ';

        // Act
        const result = getCarbonURL(code);

        // Assert
        expect(result).toEqual(`${CARBON_URL}${encodeURI(code.trim())}`);
    });

    it('should return undefined if code is longer than 500 chars', () => {
        // Arrange
        const code = range(0, 500).map(i => `${i}`).join(' ');

        // Act
        const result = getCarbonURL(code);

        // Assert
        expect(result).toBeUndefined();
    });
});
