const { Socket } = require('socket.io');

module.exports.chatSockets = function(socketServer){
    //we also has to give it cors to run
    const io = require('socket.io')(socketServer, {
        cors: {
          origin: "http://localhost:8000",
          methods: ["GET", "POST"],
          credentials: true
        }
    });

    io.sockets.on('connection', (socket)=>{
        console.log('new connection received', socket.id);

        socket.on('disconnect', ()=>{
            console.log('socket disconnected');
        });

        socket.on('join_room', (data)=>{
            console.log('joining request received', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', data=>{
            io.in(data.chatroom).emit('receive_message', data);
        })

    });
  
}