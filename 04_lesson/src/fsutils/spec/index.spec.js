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
        const cb = error => {
            expect(error).toBe('Please enter directory and depth');
            done();
        };

        ls(undefined, 2, cb);
    });

    it('should return error in callback if option depth is undefined', done => {
        const cb = error => {
            expect(error).toBe('Please enter directory and depth');
            done();
        };

        ls('/testPath', undefined, cb);
    });

    it('should return error in callback if getDirectoryAbsolutePath return error', done => {
        getDirectoryAbsolutePath.mockImplementation((_, cb) => {
            cb('getDirectoryAbsolutePath error');
        });

        const cb = error => {
            expect(error).toBe('getDirectoryAbsolutePath error');
            done();
        };

        ls('/testPath', 2, cb);
    });

    it('should return error in callback if fillTree return error', done => {
        getDirectoryAbsolutePath.mockImplementation((_, cb) => {
            cb(null, '/absolutePath');
        });
        fillTree.mockImplementation((_, __, ___, cb) => {
            cb('fillTree error');
        });

        const cb = error => {
            expect(error).toBe('fillTree error');
            done();
        };

        ls('/testPath', 2, cb);
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

        const cb = (_, data) => {
            expect(data).toStrictEqual(expectedResult);
            done();
        };

        ls('/testPath', 2, cb);
    });
});
