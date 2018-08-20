function errorHandler(error, req, res, next) {
    switch (error.code) {
        case 400:
            return res.status(400).json({ error: error.errorMessage });

        case 404:
            return res.status(404).json({ error: error.message });

        default:
            return res.status(500).json({ error: error.error });
    }
}

module.exports = errorHandler;