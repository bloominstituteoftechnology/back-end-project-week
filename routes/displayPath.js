const fetch = require('node-fetch');

const getNote = (req,res) =>  {
    if (req.decoded) {
        fetch(
            'dummy url'
        )
            .then(ok => ok.json())
            .then(notes => res.json(notes))
            .catch(err => res.status(500).json({error: 'Error fetching user'}));
    }   else {
        return res.status(422).json({error: `Can't get the user`});
    }
};

module.exports = {
    getNote
}