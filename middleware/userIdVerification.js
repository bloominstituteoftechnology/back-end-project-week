module.exports = async (req, res, next) => {
    const decodedToken = req.decodedToken;
    console.log(decodedToken);
    if(Number(req.params.id) === decodedToken){
        next();
    } else {
        res.status(401).json({ message: 'Get outta here!' });
    }
}