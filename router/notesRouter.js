const express = require("express")
const router = express.Router();
const notes = require('../helpers/notesModel')

router.get('/get/all', async (req, res) => {

    const list = await notes.fetchAll()
    res.status(200).json(list)

})



module.exports = router;