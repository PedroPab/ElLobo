// FILEPATH: /home/pedro/dev/ElLobo/serverElLobo/tests/socket.test.js
const { Server } = require('socket.io');
const { createServer } = require('http');
const Client = require('socket.io-client');

describe('Socket.IO Server', () => {
  let clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    httpServer.listen(() => {
      const port = '3006'
      //conectarse con los datos de usuario en las cookies
      clientSocket = new Client(`http://localhost:${port}`, {
        withCredentials: true,
        auth: {
          token: "123",
          user: 'pedro',
          userName: 'USER01',
          password: 'PASSWORD01'
        },
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    clientSocket.close();
  });


  test('should emit newUser when a new user connects', (done) => {
    clientSocket.on('newUser', (data) => {
      console.log("🚀 ~ file: namespaceGame.test.js:32 ~ clientSocket.on ~ data:", data)
      expect(data).toBeDefined();
      done();
    });

    clientSocket.emit('connection');
  });

  test('should emit users when openSala is received', (done) => {
    clientSocket.on('users', (data) => {
      console.log("🚀 ~ file: namespaceGame.test.js:42 ~ clientSocket.on ~ data:", data)
      expect(data).toBeDefined();
      done();
    });

    clientSocket.emit('openSala');
  });

  test('should handle message event', (done) => {
    const message = 'test message';

    clientSocket.on('message', (data) => {
      expect(data).toBe(message);
      done();
    });

    clientSocket.emit('message', message);
  });

  test('should handle presente event', (done) => {
    clientSocket.on('presente', (data) => {
      expect(data).toBeDefined();
      done();
    });

    clientSocket.emit('presente');
  });

  test('should connect and disconnect', (done) => {
    clientSocket.on('disconnect', () => {
      done();
    });

    clientSocket.close();
  });

});