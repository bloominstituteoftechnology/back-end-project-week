const express = require('express');
const axios = require('axios')

const auth = express.Router();

const dbFunc = require('../db/db.js')

auth.use(express.json());

auth.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN api/auth/ is running."})
})

auth.get('/twitter', (req, res) => {
    console.log(req)
    // dbFunc.saveTwitterToken().then(res => {
    //     console.log('resend to get teh real token')
    // })
    res.status(200).json({message: "twitter auth token recieved"})
})

auth.get('/slack/:id', (req, res) => {
    // console.log(req.params.id)//should be username
    if(req.query.code){
        dbFunc.getSlackSecret('slack').then(secret => {
            // console.log(req.query.code, '3')
            // console.log(req.query.state, '4')
            let code = req.query.code
            let username = req.params.id
            let client_id = '465374768868.465546770546'
            let client_secret = secret //should be var
            let redirect_uri = `http://localhost:3333/api/auth/slack/${username}`
            let tokenRequest = `client_id=${client_id}&code=${code}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`
            console.log(tokenRequest, 'tokenRequest')
            axios.post('https://slack.com/api/oauth.access', tokenRequest).then(foo => {
                let token = foo.data.access_token
                dbFunc.addAccessToken(req.params.id, token, 'slack').then(foobar => {
                    res.status(200).json('you may exit and return to anotesappthatdoesntsuck')
                }).catch(err => {
                    res.status(400).send(err)
                })
            }).catch(err => {
                console.log(err.message, "there was an error processing your request")
            })
            }).catch(err => {
                res.send(500).json(err, 'database error')
            })
    } else {
        res.send(500).send('unable to process request. failed at redirect_uri')
    }
})

auth.get('/accounts/:username', (req, res) => {
    dbFunc.userAccounts(req.params.username).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err.message)
    })
})

module.exports = auth
