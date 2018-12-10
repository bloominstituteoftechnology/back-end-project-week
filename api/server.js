const express = require('express');






const server = express();
server.use(express.json());












server.get('/', (req, res) => {
  res.json({ api: 'Lambda Notes (Backend): running' });
});

module.exports = server;
/**
 * exact path="/" 
 * exact path='/CreateNewView'
 * exact path = '/note/:id'
 * path = '/note/edit/:id'
 * path = '/note/delete/:id'
 * 
 * 
 * 
 **/

// ```js
// {
//   "tags": ["tag", "otherTag"],
//   "title": "Note Title",
//   "textBody": "Note Body",
// }
// ```
