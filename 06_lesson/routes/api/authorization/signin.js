const {UserModel} = require('../../../mongo');
const {atob} = require('../../../utils/base64');

const resolveSignin = (req, res) => {
    const {login, password} = req.body;

    UserModel.find({login, password}, (error, docs) => {
        if (error) {
            res.statusCode = 500;
            return res.send({error: `Server error: ${error}`});
        }

        if (docs.length === 0) {
            res.status(403);
            return res.render('index', { title: 'Express' });
        }

        res.cookie('my_courses', atob(`${login}:${password}`), {httpOnly: true});
        res.redirect('/course');
    })
}

module.exports = {
    resolveSignin,
};
