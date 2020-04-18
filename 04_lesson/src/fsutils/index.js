// Модуль утилит для работы с файловой системой

const {getDirectoryAbsolutePath, fillTree} = require('./utils');

/**
 * Функция формирования дерева данных для заданной директории
 * @param {string} dirPath путь к директории
 * @param {number} depth глубина обхода директории
 * @param {function} cb функция обратного вызова
 */
const ls = (dirPath, depth, cb) => {
    if (!dirPath || !depth) return cb('Please enter directory and depth')

    getDirectoryAbsolutePath(dirPath, (error, absolutePath) => {
        if (error) return cb(error);

        const tree = {
            name: absolutePath,
            items: [],
        };

        fillTree(tree, absolutePath, depth, error => {
            if (error) return cb(error);

            cb(null, tree);
        });
    });
}

module.exports = {
    ls,
};
