const Tag = require('./Tags');

module.exports = server => {
    server.get('/tags', (req, res) => {
        Tag.find().then(tags => {
            res.status(200).json(tags);
        }).catch(err => res.status(500).json(err));
    });
    server.post('/newtag', (req, res) => {
        const newTag = new Tag(req.body);
        newTag.save()
        .then(tags => res.status(201).send(tags))
        .catch(err => res.status(500).json(err))
    });
}