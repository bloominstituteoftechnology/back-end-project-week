const Tag = require('./Tags');

module.exports = server => {
    server.get('/tags', (req, res) => {
        Tag.find().then(tags => {
            res.status(200).json(tags);
        }).catch(err => res.status(500).json(err));
    });
    server.post('./newtag', (req, res) => {
        const tag = new Tag(req.body);
        tag.save()
        .then(tag => res.status(201).send(tag))
        .catch(err => res.status(500).json(err))
    });
}