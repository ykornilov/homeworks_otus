// Модуль работы с деревом данных

const {print, traverse} = require('./utils');

/**
 * Функция печати дерева
 * @param {object} data 
 */
const printTree = data => {
    traverse(print, data);
}

module.exports = {
    print: printTree,
};
