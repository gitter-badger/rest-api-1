var express = require('express');
var router = express.Router();

var Todo = require('../models/Todo.js');

/* GET /todos listing. */
router.get('/', (req, res, next) => {
  Todo.find((err, todos) => {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /todos */
router.post('/', (req, res, next) => {
  Todo.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/:id', (req, res, next) => {
  console.log(req.params);
  Todo.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/:id', (req, res, next) => {
  console.log(req.params);
  Todo.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(200, { content: post });
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  console.log(req.params);
  Todo.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
