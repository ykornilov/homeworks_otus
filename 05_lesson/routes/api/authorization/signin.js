const {signin} = require('../../../utils/users');

const resolveSignin = (req, res) => {
    const {login, password} = req.body;
    const token = signin({login, password});
  
    if (!token) {
        res.status(403);
        return res.render('index', { title: 'Express' });
    }
  
    res.cookie('my_courses', token, {httpOnly: true});
    res.redirect('/course');
}

module.exports = {
    resolveSignin,
};
