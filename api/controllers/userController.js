const UserModel = require('../models/userModel');
const { requireAuth, getTokenForUser } = require('../service/auth');

const createUser = (req, res, next) => {
    const user = new UserModel(req.body);

    user.save()
        .then(user => {
            // send the JWT for quick auto sign_in
            const token = getTokenForUser({ user: user,
                                            access: true }, '1m');

            res.cookie('access_token', token, { maxAge: 604800, httpOnly: true });
            res.send({"user":user, "token":token});
            return next();
        })
        .catch(err => {
            res.status(500).send({error: "Something went wrong saving your user information", info: err});
        });
};

const logOut = (req, res, next) => {
    res.clearCookie('access_token');
    res.status(200).send({"message":"Successfully LogOut"});
    return next();
};

const getUsers = (req, res) => {
    UserModel.find({})
        .populate()
        .exec((err, resp) => res.status(200).send(resp));
};

const signInUser = (req, res) => {
    const user = new UserModel(req.body);
    UserModel.findOne({$and: [{username: user.username}, {password: user.password}]})
        .then(usr => {
            if(usr === null) {
                res.status(401).send();
            }else{
                res.status(200).send(usr);
            }
        })
        .catch(err => {
            res.status(500).send({error: "Something went wrong login you in. Try again.", info: err});
        });
};

module.exports = {createUser, getUsers, signInUser, logOut};
