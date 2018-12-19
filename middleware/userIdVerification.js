module.exports = async (req, res, next) => {
    const decodedToken = req.decodedToken;
    if(Number(req.params.id) === decodedToken.id){
        next();
    } else {
        res.status(401).json({ message: 'Get outta here!' });
    }
}