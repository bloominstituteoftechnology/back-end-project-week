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
server.route('/new-user').post(userRouter.newUser).get(authenticate, userRouter.getUsers)
server.route('/login').post(userRouter.newLogin)

    //Test
server.get('/jokes', authenticate, userRouter.getAllJokes)
};