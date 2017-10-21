var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

/* GET /todos listing. */
router.get('/', (req, res, next) => {
  User.find((err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

/* POST /todos */
router.post('/', (req, res, next) => {
  User.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
