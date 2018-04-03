const userRouter = require('../controllers/userRouter');
const postRouter = require('../controllers/postRouter');

module.exports = (server) => {
    //Posts
server.route('/create-post').post(postRouter.createPost)
server.route('/posts').get(postRouter.getPosts)
server.route('/posts/:id').get(postRouter.getPostById)
server.route('/posts/:id').put(postRouter.updatePostById)
server.route('/posts/:id').delete(postRouter.deletePostById)

    //Users
server.route('/new-user').post(userRouter.newUser)
server.route('/login').post(userRouter.newLogin)
};