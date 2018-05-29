const fetch = require('node-fetch');

const getNote = (req,res) =>  {
    if (req.decoded) {
        fetch(
            'dummy url'
        )
            .then(ok => ok.json())
            .then(notes => res.json(notes))
            .catch(err => res.status(500).json({error: 'Error fetching Notes'}));
    }   else {
        return res.status(422).json({error: `Can't get the notes`});
    }
};

module.exports = {
    getNote
}