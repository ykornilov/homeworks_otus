#!/usr/bin/env node

const {getArgs} = require('./cli');
const {ls} = require('./fsutils');
const {print} = require('./tree');

const args = getArgs();

ls(args.directory, args.options.depth, (error, tree) => {
    if (error) {
        console.log(error);
        return;
    }

    print(tree);
});
