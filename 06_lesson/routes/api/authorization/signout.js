const resolveSignout = (req, res) => {
    res.clearCookie('my_courses');
    res.redirect('/');
}

module.exports = {
    resolveSignout,
};
