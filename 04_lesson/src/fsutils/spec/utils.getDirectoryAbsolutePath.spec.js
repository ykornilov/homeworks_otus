jest.mock('fs');

const {getDirectoryAbsolutePath} = require('../utils');

describe('function getDirectoryAbsolutePath', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(process, 'cwd').mockImplementation(() => '/testWorkDirectory');
    });

    it('should build and return absolute path in callback for relative path', done => {
        const cb = (_, data) => {
            expect(data).toBe('/testWorkDirectory/testRelativePath');
            done();
        };

        getDirectoryAbsolutePath('testRelativePath', cb);
    });

    it('should return path in callback for absolute path', done => {
        const cb = (_, data) => {
            expect(data).toBe('/testAbsolutePath');
            done();
        };

        getDirectoryAbsolutePath('/testAbsolutePath', cb);
    });

    it('should return error in callback if fs.stat return error', done => {
        const cb = error => {
            expect(error).toBe('fs.stat error');
            done();
        };

        getDirectoryAbsolutePath('/error-path', cb);
    });

    it('should return error in callback if path is not a directory', done => {
        const cb = error => {
            expect(error).toBe('Path is not a directory');
            done();
        };

        getDirectoryAbsolutePath('/not-a-directory.txt', cb);
    });
});
