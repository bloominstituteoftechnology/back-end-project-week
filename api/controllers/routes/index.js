const { getUserController } = require("../controllers");

// a server function being exported
module.exports = server => {
    server
        .route("/users")
        .get(getUserController.getUsers)
        .post(getUserController.createUser);
    server
        .route("/users/:id")
        .get(getUserController.getUserById)
        .put(getUserController.editUser)
        .delete(getUserController.deleteUser);

    server.put("/users/:id/changepassword", getUserController.changePassword);

    server.route("/users/login").post(getUserController.login);
    server.route("/users/logout").post(getUserController.logout);
};
