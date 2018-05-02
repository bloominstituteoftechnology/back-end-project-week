const { getUserController } = require("../controllers");

// a server function being exported
module.exports = server => {
    server.get("/", (req, res) => {
        res.status(200).json({ msg: "api running" });
    });
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
};
