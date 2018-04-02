const userRouter = require('../controllers/userRouter');
const postRouter = require('../controllers/postRouter');

module.exports = (server) => {
server.route('/create-post').post(postController.createPost)
server.route('/posts').get(postController.getPosts)
server.route('/posts/:id').post(postController.getPostById)
server.route('/posts/:id').put(postController.updatePostById)
server.route('/new-user').post(userController.newUser)
server.route('/login').post(userController.newLogin)
};