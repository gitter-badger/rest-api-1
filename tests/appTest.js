import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'
import mongoose from 'mongoose'

chai.should()
chai.use(chaiHttp)

describe('Test GET Routes', () => {
  it('It should GET index page', function (done) {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})

/* describe('Test POST Routes', () => {
  it('It should POST ToDo page', function (done) {
    chai.request(app)
      .get('/todo')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('_id')
        res.body.should.have.property('name')
        res.body.should.have.property('lastName')
        res.body.name.should.equal('Super')
        res.body.lastName.should.equal('man')
        res.body._id.should.equal(data.id)
        done()
      })
  })
}) */
