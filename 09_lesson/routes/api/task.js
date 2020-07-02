const resolveTask = (_, res) => {
    setTimeout(() => {
        res.json('Complete!');
    }, 2000)
}

module.exports = {
    resolveTask,
};
