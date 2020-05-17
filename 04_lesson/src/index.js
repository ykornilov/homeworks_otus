#!/usr/bin/env node

const {program} = require('commander');
const {ls} = require('./fsutils');
const {print} = require('./tree');

program
    .arguments('<path>')
    .action(path => {directory = path})
    .option('-d, --depth <number>', 'depth argument', value => parseInt(value, 10), 1);

program.parse(process.argv);

ls(directory, program.depth, (error, tree) => {
    if (error) {
        console.log(error);
        return;
    }

    print(tree);
});
