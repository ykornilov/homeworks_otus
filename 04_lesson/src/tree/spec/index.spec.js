const {print: printTree} = require('..');
const {print, traverse} = require('../utils');

jest.mock('../utils', () => ({
    print: jest.fn(),
    traverse: jest.fn(),
}));

describe('function print', () => {
    it('should call traverse with right arguments', () => {
        const mockObject = {test: 'fake-data'};

        printTree(mockObject);
        expect(traverse).toHaveBeenCalledWith(print, mockObject);
    });
});
