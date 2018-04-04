const userRouter = require('../controllers/userRouter');
const postRouter = require('../controllers/postRouter');
const { authenticate } = require('../utils/middlewares');

module.exports = (server) => {
    //Posts
    server.route('/create-post').post(postRouter.createPost)
    server.route('/posts').get(postRouter.getPosts)
    server.route('/posts/:id').get(postRouter.getPostById)
    server.route('/posts/:id').put(postRouter.updatePostById)
    server.route('/posts/:id').delete(postRouter.deletePostById)

    //Users
    server.route('/sign-up').post(userRouter.newUser).get(authenticate, userRouter.getUsers)
    server.route('/login').post(userRouter.newLogin)
    server.route('/users/:id').delete(userRouter.deleteUserById)
    server.route('/users').get(userRouter.getUsers)
    server.route('/users/:id').get(userRouter.getUserById)
    server.route('/login/:id').put(authenticate, userRouter.updateUserById)

    //Test
    server.get('/jokes', authenticate, userRouter.getAllJokes)
};