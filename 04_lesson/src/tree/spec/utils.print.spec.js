const {print} = require('../utils')

describe('function print', () => {
    let consoleSpy;
    beforeEach(() => {
        jest.resetAllMocks();
        consoleSpy = jest.spyOn(console, 'log');
    });

    it('should print first argument if second argument is empty', () => {
        print('test', []);
        expect(consoleSpy).toHaveBeenCalledWith('test');
    });

    it('should print (case 1)', () => {
        print('test', [false, false]);
        expect(consoleSpy).toHaveBeenCalledWith('┃  ┣━ test');
    });

    it('should print (case 2)', () => {
        print('test', [false, true]);
        expect(consoleSpy).toHaveBeenCalledWith('┃  ┗━ test');
    });

    it('should print (case 3)', () => {
        print('test', [true, false]);
        expect(consoleSpy).toHaveBeenCalledWith('   ┣━ test');
    });

    it('should print (case 4)', () => {
        print('test', [true, true]);
        expect(consoleSpy).toHaveBeenCalledWith('   ┗━ test');
    });
});
