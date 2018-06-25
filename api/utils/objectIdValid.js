const mongoose = require('mongoose');

const objectIdValid = (model, value, cb) => {
  mongoose.model(model).count({ _id: value }, (error, count) => {
    cb(error || count === 0 ? false : true);
  });
};

module.exports = {
  objectIdValid
};