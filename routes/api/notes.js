const express = require('express');
const router = express.Router();
const db = require('../../database');

router.get('/get/all', function (req, res) {
    db.select().from('notes').orderBy('id').then(function (data) {
        res.send(data);
    });
});

router.get('/get/:id', function (req, res) {
    db('notes').where({id: req.params.id}).select().then(function (data) {
        res.send(data);
    });
});

router.post('/create', function (req, res) {
    db.insert(req.body).into('notes').then(function (returning) {

        db('notes').where({id: returning[0]}).select().then(function (data) {
            res.send(data);
        });

    });
});

router.put('/edit/:id', function (req, res) {
    db('notes').where({id: req.params.id}).update({
        title: req.body.title || "",
        textBody: req.body.textBody || ""
    }).then(function () {

        db('notes').where({id: req.params.id}).select().then(function (data) {
            res.send(data);
        });

    });
});

router.delete('/delete/:id', function (req, res) {
    db('notes').where({id: req.params.id}).del().then(function () {
        res.json({success: true});
    });
});

module.exports = router;