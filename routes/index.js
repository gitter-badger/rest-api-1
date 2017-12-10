let express = require('express')
let router = express.Router()
let Fingerprint2 = require('fingerprintjs2')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'todo API semih' })
})

router.post('/', (req, res) => {
  console.log(req)
})

router.get('/public/js/finger.min.js', (req, res, next) => {
  res.sendFile(process.cwd() + '/node_modules/fingerprintjs2/dist/fingerprint2.min.js')
})

router.get('/public/css/bootstrap.min.css', (req, res, next) => {
  res.sendFile(process.cwd() + '/node_modules/bootswatch/dist/materia/bootstrap.min.css')
})

router.get('/public/js/jquery.min.js', (req, res, next) => {
  res.sendFile(process.cwd() + '/node_modules/jquery/dist/jquery.min.js')
})

router.get('/public/js/jquery.min.js.map', (req, res, next) => {
  res.sendFile(process.cwd() + '/node_modules/jquery/dist/jquery.min.js.map')
})

router.get('/public/js/bootstrap.min.js', (req, res, next) => {
  res.sendFile(process.cwd() + '/node_modules/bootstrap/dist/js/bootstrap.min.js')
})

router.get('/public/js/bootstrap.min.js.map', (req, res, next) => {
  res.sendFile(process.cwd() + '/node_modules/bootstrap/dist/js/bootstrap.min.js.map')
})

router.get('/public/js/popper.min.js', (req, res, next) => {
  res.sendFile(process.cwd() + '/node_modules/popper.js/dist/popper.min.js')
})

router.get('/public/js/popper.min.js.map', (req, res, next) => {
  res.sendFile(process.cwd() + '/node_modules/popper.js/dist/popper.min.js.map')
})

module.exports = router
