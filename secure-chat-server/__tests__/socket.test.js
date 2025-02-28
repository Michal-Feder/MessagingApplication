const socketio = require('socket.io-client'); 
jest.setTimeout(10000);
describe('Socket.IO Messaging', () => {
  let socketClient;

  beforeAll((done) => {
    socketClient = socketio.connect('http://localhost:5000');
    socketClient.on('connect', done);
  });

  afterAll(() => {
    if (socketClient) {
      socketClient.disconnect();
    }
  });

  it('should broadcast message to all clients', (done) => {
    socketClient.on('receiveMessage', (message) => {
      expect(message).toBe('Hello, world!');
      done();
    });

    socketClient.emit('sendMessage', 'Hello, world!');
  });
});
