const app = require('./server/app');
const socketIO = require('socket.io');

const server = app.listen(app.get('port'), () => {
    console.log(`Server lisen on port ${app.get('port')}`);
});

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log(`New socket connected ${socket.id}`);

    socket.on('chat:send-message', (data) => {
        io.sockets.emit('chat:send-message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});
