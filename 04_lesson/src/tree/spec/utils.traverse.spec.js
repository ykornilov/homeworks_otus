const {traverse} = require('../utils')

describe('function traverse', () => {
    it('should return undefined if data is not a object', () => {
        const result = traverse(jest.fn(), 5);
        expect(result).toBeUndefined();
    });

    it('should return undefined if data is null (typeof null === "object")', () => {
        const result = traverse(jest.fn(), null);
        expect(result).toBeUndefined();
    });

    it('should call action with right arguments (second argument is default)', () => {
        const action = jest.fn();
        traverse(action, {name: 'test'});
        expect(action).toHaveBeenCalledWith('test', []);
    });

    it('should call action with right arguments', () => {
        const action = jest.fn();
        traverse(action, {name: 'test'}, [true]);
        expect(action).toHaveBeenCalledWith('test', [true]);
    });

    it('should call action several times === count of tree elements', () => {
        const action = jest.fn();
        const data = {
            name: 'mainItem',
            items: [
                {name: 'subItem1'},
                {name: 'subItem2'},
            ],
        };
        traverse(action, data);
        expect(action).toHaveBeenCalledTimes(3);
    });

    it('should build array of flags - is last element in branch or no', () => {
        const action = jest.fn();
        const data = {
            name: 'mainItem',
            items: [
                {name: 'subItem1'},
                {name: 'subItem2'},
            ],
        };
        traverse(action, data);
        expect(action).toHaveBeenNthCalledWith(2, 'subItem1', [false]);
        expect(action).toHaveBeenNthCalledWith(3, 'subItem2', [true]);
    });
});
