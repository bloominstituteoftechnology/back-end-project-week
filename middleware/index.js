exports.errorHandler = (err, req, res, next) => {
    switch (err.code) {
        case 404:
            res.status(404).json({
                message: "The requested notes does not exist."
            });
            break;
        case 400:
            res.status(400).json({
                message: "There was an error regarding your input."
            });
        case 406:
            res.status(406).json({
                message: "Missing title or content."
            });
        default:
            res.status(500).json({
                message: "There was an error performing the required operation"
            });
            break;
    }
}

const secret = process.env.SECRET || "alma a fa alatt piros nyari alma";
exports.protected = (req, res, next) => {
    const token = req.headers.authorization;
    if (token !== 'null') {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(401).json({ message: 'Invalid token.' });
            } else {
                req.user = { username: decodedToken.username };
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Please log in.' });
    }
}