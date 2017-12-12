import express from 'express'
import Todo from '../models/Todo.js'
const router = express.Router()

/* GET /todos listing. */
router.get('/', (req, res, next) => {
  Todo.find((err, todos) => {
    if (err) return next(err)
    res.status(200).json(todos)
  })
})

/* POST /todos */
router.post('/', (req, res, next) => {
  Todo.create(req.body, (err, post) => {
    if (err) return next(err)
    res.status(201).json(post)
  })
})

/* GET /todos/id */
router.get('/:id', (req, res, next) => {
  console.log(req.params)
  Todo.findById(req.params.id, (err, post) => {
    if (err) return next(err)
    res.status(200).json(post)
  })
})

/* PUT /todos/:id */
router.put('/:id', (req, res, next) => {
  console.log(req.params)
  Todo.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err)
    res.status(201).json(post)
  })
})

/* DELETE /todos/:id */
router.delete('/:id', function (req, res, next) {
  console.log(req.params)
  Todo.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err)
    res.status(200).json(post)
  })
})

module.exports = router
