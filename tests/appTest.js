import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
chai.should()
chai.use(chaiHttp)

const TEST_ID = '5a3037ccbbfa8617ff764000'

describe('Database Connection Test', () => {
  it('It should connect to MongoDB', (done) => {
    mongoose.Promise = global.Promise
    mongoose.connection.openUri(process.env.DATABASE_CONNECTION)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Connection Error'))
    db.once('open', () => {
      done()
    })
  })
})

describe('Test GET Route Index', () => {
  it('It should GET index page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        if (err) {
          console.log(err)
        }
        done()
      })
  })
})

describe('Test GET Route ToDo', () => {
  it('It should GET ToDo page', (done) => {
    chai.request(app)
      .get('/#/' + TEST_ID)
      .end((err, res) => {
        res.should.have.status(200)
        if (err) {
          console.log(err)
        }
        done()
      })
  })
})

describe('Test Handle 404 Not Found', () => {
  it('It should handle 4040 Not Found', (done) => {
    chai.request(app)
      .get('/noSuchPageHereForTestOrNotTest')
      .end((err, res) => {
        res.should.have.status(404)
        if (err) {
          console.log(err)
        }
        done()
      })
  })
})

describe('Test POST to create ToDo', () => {
  it('It should POST and create a ToDO with name mocha-chai', (done) => {
    const todo = {name: 'mocha-chai-testing', completed: false}
    chai.request(app)
      .post('/todos')
      .send(todo)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('name').eql('mocha-chai-testing')
        res.body.should.have.property('completed').eql(false)
        if (err) {
          console.log(err)
        }
        done()
      })
  })
})

describe('Test PUT to update existing ToDo', () => {
  it('It should PUT and update ToDO with name mocha-chai as completed', (done) => {
    const todo = {_id: TEST_ID, name: 'mocha-chai-testing', completed: true, __v: 0}
    chai.request(app)
      .put(`/todos/${todo._id}`)
      .send(todo)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('name').eql('mocha-chai-testing')
        res.body.should.have.property('completed').eql(false)
        if (err) {
          console.log(err)
        }
        done()
      })
  })
})

describe('Test DELETE to delete existing ToDo', () => {
  it('It should DELETE ToDO with a name mocha-chai', (done) => {
    const todo = {_id: TEST_ID, name: 'mocha-chai-testing', completed: true, __v: 0}
    chai.request(app)
      .delete(`/todos/${todo._id}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('name').eql('mocha-chai-testing')
        if (err) {
          console.log(err)
        }
        done()
      })
  })
})
