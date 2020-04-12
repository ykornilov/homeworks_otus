// Модуль для работы с параметрами, с которыми запускалась программа

const OPTIONS = {
    depth: {
        longName: '--depth',
        shortName: '-d',
        parse: Number,
    },
};

/**
 * Функция нормализации ключей и их значений, которые были указаны при запуске программы
 * @param {string[]} args ключи и их значения
 */
function getOptions(args) {
    return args
        .join(' ')
        .split(' -')
        .reduce((acc, option) => {
            const [optionName, optionValue] = option.split(' ');
            const options = Object.entries(OPTIONS);
            const optionIndex = options.findIndex(([, {longName, shortName}]) => 
                [longName, shortName].includes(optionName));
            if (optionIndex !== -1) {
                const [key, {parse = value => value}] = options[optionIndex];
                return {
                    ...acc,
                    [key]: parse(optionValue),
                };
            }
            return acc;
        }, {});
};

/**
 * Функция подготовки аргументов, с которыми была запущена программа
 */
function getArgs() {
    const args = process.argv;

    return {
        directory: args[2],
        options: getOptions(args.slice(3)),
    }
}

module.exports = {
    getArgs,
};
