import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String
})

module.exports = mongoose.model('Todo', TodoSchema)
