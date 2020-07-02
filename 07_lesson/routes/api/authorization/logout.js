const resolveLogout = (req, res) => {
    res.clearCookie('token');
    req.logout();
    res.redirect('/');
}

module.exports = {
    resolveLogout,
};
