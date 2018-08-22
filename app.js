console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash')
const notes = require('./notes.js')

// console.log(_.isString(true))
// console.log(_.isString('Terrance'))
let filteredArray = _.uniq(['Terrance', 'Terrance', 1,2,1,2,3,4])
console.log(filteredArray)

// var user = os.userInfo();

// console.log('Result:', notes.add(9,-2));

// fs.appendFileSync('greetings.txt', ` Hello ${user.username}!`);
