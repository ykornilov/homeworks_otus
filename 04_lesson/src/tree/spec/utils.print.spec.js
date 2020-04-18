const {print} = require('../utils')

describe('function print', () => {
    let spy;
    beforeEach(() => {
        jest.resetAllMocks();
        spy = jest.spyOn(console, 'log');
    });

    it('should print first argument if second argument is empty', () => {
        print('test', []);
        expect(spy).toHaveBeenCalledWith('test');
    });

    it('should print (case 1)', () => {
        print('test', [false, false]);
        expect(spy).toHaveBeenCalledWith('┃  ┣━ test');
    });

    it('should print (case 2)', () => {
        print('test', [false, true]);
        expect(spy).toHaveBeenCalledWith('┃  ┗━ test');
    });

    it('should print (case 3)', () => {
        print('test', [true, false]);
        expect(spy).toHaveBeenCalledWith('   ┣━ test');
    });

    it('should print (case 4)', () => {
        print('test', [true, true]);
        expect(spy).toHaveBeenCalledWith('   ┗━ test');
    });
});
