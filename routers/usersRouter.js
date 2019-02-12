const express = require('express');
const router = express.Router();
const users = require('../data/helpers/usersModel')

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

/************************************ USERS SECTION ***********************************/

/********* Get Users *************/
router.get('/', (req, res) => {
    users.get()
        .then((user) => {
            res.json(user);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users could not be retrieved." });
        });
});

/********* Get Single User *************/
router.get('/:id', (req, res) => {
    const { id } = req.params
    users.get(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users information could not be retrieved." });
        });
});


/************* Delete User *************/
router.delete('/:id', (req, res) => {
    const { id } = req.params

    if (id) {
        users.remove(id)
            .then(user => {
                if (user) {
                    res.json({ message: "The user was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The user with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The user could not be removed." });
            });
    }
});

/********* Update User *************/
router.put('/:id', (req, res) => {
    const { id } = req.params
    const newUser = req.body

    if (!newUser.username || !newUser.password) {
        res
            .status(400)
            .json({ message: "Please provide name and password." });
    } else {
       
        if (newUser) {
            users.update(id, newUser)
                .then(user => {
                   
                        
                        if (user) {
                            res
                                .status(201)
                                .json(user);
                        } else {
                            res
                                .status(404)
                                .json({ message: "The user with the specified ID does not exist." })
                        }
                 
                   
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The user could not be modified." });
                });
        } else {

            res
                .status(404)
                .json({ message: "The user with the specified ID does not exist." })
        }
    }
})

/********* Create New User *************/
router.post('/', (req, res) => {
    const user = req.body;
    if (user.username || user.password) {
        users.insert(user)
            .then(user => {
                res.status(201)
                    .json(user)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: "failed to insert user in db" })
            });
    } else {
        res
            .status(400)
            .json({ message: "missing username and/or password." })
    }
});

/************* Get Single Project's Actions *************/
/* router.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    projects
        .getProjectActions(id)
        .then(usersActions => {
            if (usersActions === 0) {
                return sendUserError(404, 'No actions in the project', res);
            }
            res.json(usersActions);
        })
        .catch(err => {
            return sendUserError(500, 'Unable to access db', res);
        });
});
 */


module.exports = router;