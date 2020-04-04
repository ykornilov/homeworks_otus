const fs = require('fs');
const {print} = require('./tree');

fs.readFile(process.argv[2], (err, rawData) => {
    if (err) {
        console.log(err);
        return;
    }

    const data = JSON.parse(rawData);
    print(data);
})
