const passport = require('passport');

module.exports = (server) => {

    server.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    server.get('/auth/google/callback', passport.authenticate('google'));

    //kills the cookie and say's that's it you are no longer this user
    server.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    server.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};