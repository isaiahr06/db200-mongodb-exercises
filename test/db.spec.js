const path = require('path');
const expect = require('chai').expect;
const { MongoClient } = require('mongodb');
var url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const database = 'mongo_exercises';

describe('Mongo Exercises collection', function main() {
  this.timeout(12000);
  this.slow(4000);

  beforeEach(() => {
    // setup
  });

  it('should be able to connect to db without error', (done) => {
    client.connect()
    .then(() => {
      client.close();
      done();
    })
    .catch(err => {
      client.close();
      done(err);
    });
  });

  it('should be able to find documents in movies collection ', (done) => {
    client.connect()
    .then(() => {
      const db = client.db(database);
      const collection = db.collection('movies');
      return collection.find({}).toArray();
    })
    .then(result => {
      expect(result.length).to.be.greaterThan(0);
      client.close();
      done();
    })
    .catch(err => {
      console.error('Error finding documents:', err);
      client.close();
      done(err);
    });
  });
});