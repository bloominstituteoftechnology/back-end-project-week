// const port = process.env.PORT || 3333;
const mongoose = require('mongoose');

// module.exports = {
//     connectTo: function(database = 'sandbox', host = 'localhost') {
//       return mongoose.connect(`mongodb://${host}/${database}`);
//     },
//   };

  module.exports = {
    connectTo: function(database = 'dbLambdaNotes', host = 'localhost') {
      return mongoose.connect(`mongodb://${host}/${database}`);
    },
  };


// mongoose.connect('mongodb://localhost/dbLambdaNotes', {}, (err) => {
//     if(err) {
//         console.log(err);
//         return;
//     } 
//     console.log("Successfully Connected to MongoDB");
// });



// // sanity check 
// server.listen(port, () => {
//     console.log(`Server up and running on port ${port}`);
// });
