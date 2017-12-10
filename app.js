const opbeat = require('opbeat').start({
  appId: 'f488d9f4a9',
  organizationId: 'bf09f7ac168f48adb9a7acce37ecfde0',
  secretToken: '841a590acc78fe16275fbb613956fc8871f0085f',
})

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const io = require('socket.io')
const session = require('express-session')

// Routes
const index = require('./routes/index')
const login = require('./routes/login')
const users = require('./routes/users')
const todos = require('./routes/todos')
const news = require('./routes/news')

// load bunyan logger
const bunyan = require('bunyan')
const log = bunyan.createLogger({
  name: 'restAPI',
  level: bunyan.INFO,
  streams: [
    {
      level: 'debug',
      stream: process.stdout,
    },
    {
      level: 'debug',
      path: 'logs/app.json',
    },
  ],
})

// load mongoose package
let mongoose = require('mongoose')

// Use native Node promises
mongoose.Promise = global.Promise

// connect to MongoDB
mongoose.connect('mongodb://admin:CgySm27C@ds129706.mlab.com:29706/api').
  then(() => {
    log.info('MongoDB connected')
    return console.log('connection succesful')
  }).catch((err) => console.error(err))

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(opbeat.middleware.express())

app.use(session({ secret: 'test-session' }))

/*let sess
app.get('/', function (req, res) {
  res.render('index2');
  sess = req.session
})*/

app.use('/', index)
app.use('/login', login)
app.use('/users', users)
app.use('/todos', todos)
app.use('/news', news)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

/*io.sockets.on('connection', (socket) => {
  let currentRoom;
  socket.on('adduser', userInfo => {
    socket.username = userInfo.username;
    socket.room = userInfo.room;
    currentRoom = userInfo.room;
    socket.join(userInfo.room);
  });

  socket.on('message', (data) => {
    io.sockets.in(socket.room).emit('message', data);
  });

  socket.on('switchRoom', newroom => {
    socket.leave(socket.room);
    socket.join(newroom);
    currentRoom = newroom;
    socket.emit('updatechat', 'Room :' + newroom + ' as ' + socket.username);
    socket.room = newroom;
    socket.emit('updaterooms', rooms, newroom);
  });

  socket.on('disconnect', () => {
    delete usernames[socket.username];
    socket.leave(socket.room);
    io.sockets.emit('updateusers', usernames);
    socket.leave(socket.room);
  });
});*/

// error handlers
/**
 * development error handler will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
    })
    next()
  })
}

/**
 * production error handler no stacktraces leaked to user*
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {},
  })
  next()
})

module.exports = app
