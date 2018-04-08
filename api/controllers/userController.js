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

    UserModel.findOne({email: user.email})
        .then(usr => {

            if(usr === null) {
                res.status(401).send();
            }else{
                const tUser = {};
                usr.checkPassword(user.password)
                    .then(isValid => {
                        if (isValid) {
                            const token = getTokenForUser({ user: user,
                                access: true }, '10m');

                            res.cookie('access_token', token, { maxAge: 604800, httpOnly: true });

                            res.status(200).send({"user":usr, "token":token});

                        } else {
                            res.status(400).json({ msg: 'Incorrect password' });
                        }
                    })
                    .catch(err => {
                        res.error(err)
                    });
            }
        })
        .catch(err => {
            res.status(500).send({error: "Something went wrong login you in. Try again.", info: err});
        });
};

module.exports = {createUser, getUsers, signInUser, logOut};
