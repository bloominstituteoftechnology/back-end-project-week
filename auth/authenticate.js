const jwt = require("jsonwebtoken");

const jwtKey =
    process.env.JWT_SECRET ||
    "add a .env file to root of project with the JWT_SECRET variable";

// Add an authentication function
function authenticate(req, res, next) {
    const token = req.get("Authorization");

    if (token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) return res.status(401).json(err);

            req.decoded = decoded;

            next();
        });
    } else {
        return res.status(401).json({
            error: "No token provided, must be set on the Authorization Header"
        });
    }
}

// Add a function to generate a JWT
function generateToken(user) {
    const payload = {
        usernanme: user.usernanme
    };

    // TODO: Determine best practice for jwtid
    const options = {
        expiresIn: "8h",
        jwtid: "8675309"
    };

    return jwt.sign(payload, jwtKey, options);
}

module.exports = {
    authenticate,
    generateToken
};
