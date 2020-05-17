const {ls} = require('..');
const {getDirectoryAbsolutePath, fillTree} = require('../utils');

jest.mock('../utils', () => ({
    getDirectoryAbsolutePath: jest.fn(),
    fillTree: jest.fn(),
}));

describe('function ls', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return error in callback if path is undefined', done => {
        ls(undefined, 2, error => {
            expect(error).toBe('Please enter directory and depth');
            done();
        });
    });

    it('should return error in callback if option depth is undefined', done => {
        ls('/testPath', undefined, error => {
            expect(error).toBe('Please enter directory and depth');
            done();
        });
    });

    it('should return error in callback if getDirectoryAbsolutePath return error', done => {
        getDirectoryAbsolutePath.mockImplementation((_, cb) => {
            cb('getDirectoryAbsolutePath error');
        });

        ls('/testPath', 2, error => {
            expect(error).toBe('getDirectoryAbsolutePath error');
            done();
        });
    });

    it('should return error in callback if fillTree return error', done => {
        getDirectoryAbsolutePath.mockImplementation((_, cb) => {
            cb(null, '/absolutePath');
        });
        fillTree.mockImplementation((_, __, ___, cb) => {
            cb('fillTree error');
        });

        ls('/testPath', 2, error => {
            expect(error).toBe('fillTree error');
            done();
        });
    });

    it('should return tree in callback', done => {
        getDirectoryAbsolutePath.mockImplementation((_, cb) => {
            cb(null, '/absolutePath');
        });
        fillTree.mockImplementation((tree, _, __, cb) => {
            cb(null, tree);
        });
        const expectedResult = {
            name: '/absolutePath',
            items: [],
        };

        ls('/testPath', 2, (_, data) => {
            expect(data).toStrictEqual(expectedResult);
            done();
        });
    });
});
