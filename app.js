/* opBeat module integration to send error notification,statistics in realtime
 * https://opbeat.com/semih-personal/semih-personal-backend/errors/4/list/
*/
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

// Routes
import index from './routes/index'
import todos from './routes/todos'

// MongoDB
import mongoose from 'mongoose'

// opBeat Error Logger
import opbeat from 'opbeat'
opbeat.start({
  appId: 'f488d9f4a9',
  organizationId: 'bf09f7ac168f48adb9a7acce37ecfde0',
  secretToken: '841a590acc78fe16275fbb613956fc8871f0085f'
})

// .env file reader
dotenv.config()

mongoose.Promise = global.Promise
mongoose.connection.openUri(process.env.DATABASE_CONNECTION)

const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(opbeat.middleware.express())

// Bind routes
app.use('/', index)
app.use('/todos', todos)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
/**
 * development error handler will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
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
    error: {}
  })
  next()
})

module.exports = app
