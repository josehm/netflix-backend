const server = require('../index');
const request = require('request');
const should = require('chai').should();
const mongoose = require('mongoose');
const HOST = "http://localhost:4000";

let token = "";

describe('server on', () => {
  it('deberia registrar un usuario', (done) => {
    const json = {
      operation: null,
      query: "mutation addUser($data: UserInput) { addUser(data:$data) {token}}",
      variables: {
        "data": {
          "name": "user test",
          "lastName": "last name",
          "email": "hola@gmail.com",
          "password": "123"
        }
      }
    }

    request.post({
      url: HOST,
      json
    }, function(err, res, body) {
      should.not.exist(err);
      should.exist(res);
      expect(res.statusCode).toBe(200);
      body.should.have.property('data');
      token = body.data.addUser.token;
      done(err);
    });

  }) 

  it('debe hacer la peticion de los libros', function (done) {
    const json = {
      query: "{getTags{ title }}",
    };
    request.post({
      url: HOST,
      json,
      headers: {
        "Authorization": token,
      }
    }, function (err, res, body) {
      should.not.exist(err);
      should.exist(res);
      expect(res.statusCode).toBe(200);
      body.should.have.property('data');
      //const books = body.data.books;
      console.log(body.data);
      done(err);
    })
  })

})

/*

process.env.NODE_ENV = 'test';

function clearDataBase() {
  console.log('Limpiando DATABASE');
  return new Promise(resolve => {
    let count = 0;
    const max = Object.keys(mongoose.connection.collections).length;
    for (const i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function () {
        count++;
        if (count >= max) {
          resolve();
        }
      })
    }
  })
};

beforeEach() {
  clearDataBase();
}
*/