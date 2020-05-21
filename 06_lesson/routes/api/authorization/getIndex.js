const resolveGetIndex = (_, res) => {
    res.render('index', {title: 'My Courses'});
}

module.exports = {
    resolveGetIndex,
};
