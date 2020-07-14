const bcrypt = require('bcryptjs');
const db = require('../../data/knexConfig');
const jwt = require('jsonwebtoken');

module.exports = {
    error: (error, req, res, next) => {
        res.status(error.status || 500).json(error.message || "request couldnt be found")
    },
    tokenGenerator: user => {
        console.log('genereting token')
        const {
            id,
            username
        } = user
        const token = jwt.sign({
            id,
            username
        }, process.env.SECERETKEY)
        return token;
    },
    getUsers: (req, res, next) => {
        const qurey = db('users')
        if (req.params.id) {
            qurey.where({
                id: req.params.id
            }).first().then(result => {
                res.status(200).json(result)
            }).catch(error => next({
                message: error.message,
                status: 500
            }))
        } else {

            qurey.then(result => {
                res.status(200).json(result)
            }).catch(error => next({
                message: error.message,
                status: 500
            }))
        }
    },
    getUserNotes: (req, res, next) => {
        db('users').where({
            id: req.params.user_id
        }).first().then(result => {
            if (result) {
                db('notes').where({
                    user_id: result.id
                }).then(notes_Result => {
                    result.notes = notes_Result
                    res.status(200).json({
                        result
                    })
                })
            } else {
                next({
                    message: "user donst have notes"
                })
            }
        })
    },
    register: (req, res, next) => {
        const newUser = req.body;
        console.log(newUser)
        if (newUser.fullname && newUser.email && newUser.password) {
            newUser.password = bcrypt.hashSync(newUser.password, 14);
            db('users').insert(newUser).then(result => {
                res.status(200).json(result);
            }).catch(error => next({
                message: error.message,
                status: 401
            }))

        } else {
            next({
                message: 'username and password is required'
            })
        }
    },
    signIn: (req, res, next) => {
        const newUser = req.body;
        if (newUser.email && newUser.password) {
            db('users').where({
                email: newUser.email
            }).first().then(result => {
                // check if the user has signed up
                if (result) {
                    // authenticate user
                    if (bcrypt.compareSync(newUser.password, result.password)) {
                        const token = module.exports.tokenGenerator(result);
                        const {
                            id,
                            fullname
                        } = result;
                        res.status(200).json({
                            token,
                            id,
                            fullname
                        })
                    } else {
                        next({
                            message: 'incorrect password '
                        })
                    };
                } else {
                    next({
                        message: 'username has not signed up'
                    })
                }
            })
        } else {
            next({
                message: 'username and password is required'
            })
        }
    },
    getNotes: (req, res, next) => {
        db('notes')
            .then(result => {
                res.status(200).json(result)
            }).catch(error => next({
                message: error.message,
                status: 500
            }))
    },
    postNote: (req, res, next) => {
        const newNote = req.body;
        newNote.user_id = req.params.user_id;
        if (newNote.body) {
            console.log("note to be added ", newNote)
            db('notes').insert(newNote).then(ids => {
                db('notes').where({
                    id: ids[0]
                }).first().then(result => {
                    res.status(200).json(result)
                }).catch(error => next({
                    // handle error incase db didnt get the newly added note
                    message: error.message,
                    status: 401
                }))
            }).catch(error => next({
                // handle error incase db didnt add the new note
                message: error.message,
                status: 401
            }))
        } else {
            next({
                message: "text is reqired",
                status: 401
            })
        }
    },
    getANote: (req, res, next) => {
        //check if the note id is valid and exist in db, and handle appropirate cases. 
        const user_id = req.params.user_id;
        const note_id = req.params.note_id;
        if (note_id) {
            db('notes').where({
                    user_id: user_id,
                    id: note_id
                }).first()
                .then(result => {
                    // check if the giving note id is valid
                    res.status(200).json(result)

                })
                .catch(error => {
                    next({
                        message: error.message,
                        status: 500
                    })
                })

        }
    },
    deleteNote: (req, res, next) => {
        const note_id = req.params.note_id;
        db('notes')
            .where({
                id: note_id
            }).del()
            .then(result => {
                // send status 200 in success             
                res.status(200).json(result)
            }).catch(error => next({
                // handle error incase db didnt delet note
                message: error.message,
                status: 500
            }))


    },
    verifyUser: (req, res, next) => {
        if (req.params.user_id) {
            db('users').where({
                id: req.params.user_id
            }).first().then(result => {
                if (result) {
                    next()
                } else {
                    next({
                        message: "wrong user id",
                        status: 401
                    })
                }
            })
        } else {
            next({
                message: "user id is required",
                status: 401
            })
        }
    },
    verifyNote: (req, res, next) => {
        if (req.params.note_id) {
            db('notes').where({
                id: req.params.note_id
            }).first().then(result => {
                if (result) {
                    next()
                } else {
                    next({
                        message: "wrong note id",
                        status: 401
                    })
                }
            })
        } else {
            next({
                message: "note id is required",
                status: 401
            })
        }
    },
    deleteUser: (req, res, next) => {
        db('users')
            .where({
                id: req.params.user_id
            })
            .first()
            .del()
            .then(result => {
                res.status(200).json(result)
            }).catch(error => next({
                // handle error incase db didnt delete the note
                message: error.message,
                status: 401
            }))
    }
}