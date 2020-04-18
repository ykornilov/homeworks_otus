jest.mock('fs');

const {fillTree} = require('../utils');

describe('function fillTree', () => {
    const MOCK_FILE_INFO = {
        '/path/to/level1/file1.js': 'console.log("file1 contents");',
        '/path/to/level1/file2.txt': 'file2 contents',
        '/path/to/level1/level2': null,
        '/path/to/level1/level2/file3.txt': 'file3 contents',
    };

    beforeEach(() => {
        jest.resetAllMocks();
        require('fs').__setMockFiles(MOCK_FILE_INFO);
    });

    it('should return error in callback if fs.readdir return error', done => {
        const tree = {
            name: '/error-path',
            items: [],
        }

        const cb = error => {
            expect(error).toBe('fs.readdir error');
            done();
        };

        fillTree(tree, '/error-path', 1, cb);
    });

    it('should return error in callback if fs.stat return error', done => {
        require('fs').__setMockFiles({
            '/path/to/level1/error-path': '',
        });

        const tree = {
            name: '/path/to/level1',
            items: [],
        }

        const cb = error => {
            expect(error).toBe('fs.stat error');
            done();
        };

        fillTree(tree, '/path/to/level1', 1, cb);
    });

    it('should build empty tree if files are not found', done => {
        require('fs').__setMockFiles({});
        const tree = {
            name: '/path/to/level1',
            items: [],
        }

        const expectedResult = {
            name: '/path/to/level1',
            items: []
        }

        const cb = () => {
            expect(tree).toStrictEqual(expectedResult);
            done();
        };

        fillTree(tree, '/path/to/level1', 1, cb);
    });

    it('should build one-level tree', done => {
        const tree = {
            name: '/path/to/level1',
            items: [],
        }

        const expectedResult = {
            name: '/path/to/level1',
            items: [
                {name: 'file1.js'},
                {name: 'file2.txt'},
                {name: 'level2'},
            ]
        }

        const cb = () => {
            expect(tree).toStrictEqual(expectedResult);
            done();
        };

        fillTree(tree, '/path/to/level1', 1, cb);
    });

    it('should build two-level tree', done => {
        const tree = {
            name: '/path/to/level1',
            items: [],
        }

        const expectedResult = {
            name: '/path/to/level1',
            items: [
                {name: 'file1.js'},
                {name: 'file2.txt'},
                {
                    name: 'level2',
                    items: [
                        {name: 'file3.txt'},
                    ],
                },
            ]
        }

        const cb = () => {
            expect(tree).toStrictEqual(expectedResult);
            done();
        };

        fillTree(tree, '/path/to/level1', 2, cb);
    });
});
