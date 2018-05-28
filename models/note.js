import mongoose, { Schema } from 'mongoose'
const { ObjectId } = Schema.Types

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: false }
})

const NoteModel = mongoose.model('Note', NoteSchema)

export default NoteModel
