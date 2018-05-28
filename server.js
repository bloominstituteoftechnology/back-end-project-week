const express = require('express');

const app = express();

app.use(express.json());

app.get('/testing', (req, res) => {

    res.status(200).json({message: 'Testing working'});

});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));