const { Server } = require('socket.io');
const { createServer } = require('http');
const Client = require('socket.io-client');

describe('Socket.IO Server', () => {
  let ioServer;
  let clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    ioServer = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:3006`);
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    ioServer.close();
    clientSocket.close();
  });

  test('should create a new game room if it does not exist', (done) => {
    const nombreAldea = 'Aldea1';

    clientSocket.emit('newSalaGame', { nombreAldea });

    clientSocket.on('newSalagameAprob', (data) => {
      expect(data.create).toBe(true);
      // expect(data.message).toBe(`El namespace ${nombreAldea} se creo bien `);
      expect(data.sala).toBe(nombreAldea);
      clientSocket.off('newSalagameAprob')

      done();
    });
  });

  test('should not create a new game room if it already exists', (done) => {
    const nombreAldea = 'Aldea1';

    clientSocket.emit('newSalaGame', { nombreAldea });

    clientSocket.on('newSalagameAprob', (data) => {
      expect(data.create).toBe(false);
      // expect(data.message).toBe(`El namespace ${nombreAldea} ya existe`);
      clientSocket.off('newSalagameAprob')
      done();
    });
  });

  test('should connect and disconnect', (done) => {
    clientSocket.on('disconnect', () => {
      done();
    });

    clientSocket.close();
  });
});