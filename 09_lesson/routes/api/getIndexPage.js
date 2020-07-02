const resolveGetIndexPage = (_, res) => {
    res.render('index', {title: 'Highload application'});
}

module.exports = {
    resolveGetIndexPage,
};
