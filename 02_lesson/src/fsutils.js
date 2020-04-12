// Модуль утилит для работы с файловой системой

const fs = require('fs');
const path = require('path');

/**
 * Функция заполнения узла дерева данными о содержимом указанной директории
 * @param {object} tree узел дерева, который надо заполнить
 * @param {string} dirPath путь директории для данного узла
 * @param {number} depth глубина обхода директорий от данного узла
 * @param {function} cb функция обратного вызова
 */
function fillTree(tree, dirPath, depth, cb) {
    fs.readdir(dirPath, (error, files) => {
        if (error) return cb(error);
        if (!files.length) return cb();

        let counter = files.length;
        files.forEach((file, i) => {
            const filePath = path.join(dirPath, file);
            fs.stat(filePath, (error, stats) => {
                if (error) return cb(error);

                tree.items[i] = {name: file};
                if (!stats.isDirectory() || depth === 1) {
                    counter -= 1;
                    if (counter === 0) return cb();
                } else {
                    tree.items[i].items = [];
                    fillTree(tree.items[i], filePath, depth - 1, error => {
                        if (error) return cb(error);

                        counter -= 1;
                        if (counter === 0) return cb();
                    });
                }
            });
        });
    });
}

/**
 * Функция определения абсолютного пути директории
 * @param {string} directory путь директории (абсолютный или относительный)
 * @param {function} cb функция обратного вызова
 */
function getDirectoryAbsolutePath(directory, cb) {
    const absolutePath = path.isAbsolute(directory)
        ? directory
        : path.join(process.cwd(), directory);
    
    fs.stat(absolutePath, (error, stats) => {
        if (error) return cb(error);
        if (!stats.isDirectory) return cb('Path is not a directory');

        cb(null, absolutePath);
    });
}

/**
 * Функция формирования дерева данных для заданной директории
 * @param {string} dirPath путь к директории
 * @param {number} depth глубина обхода директории
 * @param {function} cb функция обратного вызова
 */
function ls(dirPath, depth, cb) {
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
