const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String
});

modules.export = mongoose.model('Image', ImageSchema);
