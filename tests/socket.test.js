const { Server } = require('socket.io');
const { createServer } = require('http');
const Client = require('socket.io-client');

const nombreAldea = 'Aldea1';

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

describe('conectamos un cliente a una sala', () => {
  let clientSocket1, clientSocket2

  beforeAll((done) => {
    //nos conectamos con un usuario
    clientSocket1 = new Client(`http://localhost:3006/${nombreAldea}`,
      {
        withCredentials: true,
        auth: {
          token: "123",
          user: 'pedro',
          userName: 'USER02',
          password: 'PASSWORD02'
        },
      }
    );

    clientSocket1.on('connect', (socket) => {
      done()
    });

  });

  afterAll(() => {
    clientSocket1.close();
  });

  test('miramso que ser resiba los usuarios', (done) => {

    clientSocket1.on('users', (data) => {
      expect(data).toBeDefined();
      done();
    });

    clientSocket1.emit('openSala');
  });

  test('si entra un usuario, recibimos su data', (done) => {

    clientSocket1.on('newUser', (data) => {
      // console.log("[new user]", data)
      expect(data).toBeDefined();
      expect(data).toHaveProperty('userName');
      expect(data).toHaveProperty('password');
      done();
    });


    //nos conectamos con un usuario para poder recibir el evento de newUser
    clientSocket2 = new Client(`http://localhost:3006/${nombreAldea}`,
      {
        withCredentials: true,
        auth: {
          token: "123",
          user: 'pedro',
          userName: 'USER03',
          password: 'PASSWORD03'
        },
      }
    );

    clientSocket2.on('connect', (socket) => { })

    // clientSocket1.emit('openSala');
  })

  test('recibimos un mensage al mandar un mensage de pin ', (done) => {

    const message = 'pin'

    clientSocket1.on('message', (data) => {
      expect(data).toBe('pon');
      done();
    });

    clientSocket1.emit('message', message);
  });

  test('iniciamos el juego y pedimos presencian', (done) => {

    clientSocket2.on('confirmacionPresencia', (data) => {

      done();
    });

    clientSocket1.emit('startGame');
  });


  test('should connect and disconnect', (done) => {
    clientSocket1.on('disconnect', () => {
      done();
    });

    clientSocket1.close();
  });

});