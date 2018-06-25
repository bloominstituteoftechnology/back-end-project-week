const httpStatus = require('../utils/HTTPStatusCodes');

module.exports = (notesModel) => {
  return {
    "GET": (req, res) => {
    // res.status(httpStatus.OK).json({success: "in the end, it doesn't even matter"});
    notesModel.find()
      .then(notes => {
        res.status(httpStatus.OK).json(notes);
      })
      .catch(err => {
        console.log('noteRoutes--GET ERROR:',err);
        res.status(500).json(err);
      });
    },
  };
};