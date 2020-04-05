// Модуль работы с деревом данных

/**
 * Функция печати узла дерева
 * @param {string} name имя узла 
 * @param {boolean[]} arrIsLast массив флагов, которые показывают являются ли вышенаходящиеся узлы последними на своем уровне или нет
 */
function print(name, arrIsLast) {
    let str = '';
    if (arrIsLast.length === 0) {
        str = name;
    } else {
        const start = arrIsLast
            .slice(0, -1)
            .reduce((acc, isLast) => isLast 
                ? acc + ' '.repeat(3)
                : acc + '\u2503' + ' '.repeat(2)
            , '')
        const tail = `${arrIsLast[arrIsLast.length - 1] ? '\u2517' : '\u2523'}\u2501 ${name}`;
        str = start + tail;
    }
    console.log(str);
}

/**
 * Функция обхода дерева и применения выбранного метода (action) к его узлам
 * @param {function} action метод, который надо применить к узлу дерева данных
 * @param {object} data данные
 * @param {boolean[]} arrIsLast массив флагов, которые показывают являются ли вышенаходящиеся узлы последними на своем уровне или нет
 */
function traverse(action, data, arrIsLast = []) {
    if (!data || typeof data != 'object') return;
    const {name, items} = data;

    action(name, arrIsLast);
    (items || []).forEach((item, i, arr) => 
        traverse(action, item, [...arrIsLast, i === arr.length - 1]));
}

/**
 * Функция печати дерева
 * @param {object} data 
 */
function printTree(data) {
    traverse(print, data);
}

exports.print = printTree;
