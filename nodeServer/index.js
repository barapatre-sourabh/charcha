
// const express = require('express');
// const app = express();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//   origins: ['http://127.0.0.1:5500']
// });

// server.listen(8000, () => {
//   console.log('Server listening on port 8000');
// });


// const io = require('socket.io')(8000);
// const io = require('socket.io')(http, {
//     origins: ['http://127.0.0.1:5500']
//   });

//   const cors = require('cors');
// const io = require('socket.io')(http);



// io.on('connection', (socket) => {
//   socket.on('request', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     // ...
//   });
// });

// io.use(cors());
// const users = {};
// io.on('connection', socket =>{
//     socket.on('new-user-joined', name =>{
//         console.log('new-user',name);
//         users[socket.id]= name;
//         socket.broadcast.emit('user-joined', name);

//     })

//     socket.on('send', message=>{
//         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
//     })
// })
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

server.listen(8000, () => {
  console.log('Server listening on port 8000');
});

const users = {};
io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log('new-user',name);
        users[socket.id]= name;
        socket.broadcast.emit('user-joined', name);

    })

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })

socket.on('disconnect', message=>{
    socket.broadcast.emit('leave', users[socket.id]);
    delete users[socket.id];

})
});