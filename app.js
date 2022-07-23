//main configuration
const { Socket } = require('dgram');
const express=require('express');
const app=express();
const http=require('http');
const port=3000;
const server=http.createServer(app);
const server_msg=()=>{console.log('Server running on *:3000')};

//socket server
const { Server }=require('socket.io');
const io=new Server(server);  //passing app server to Socket Server constructor for communication

app.use(express.static("./")); 

io.on('connection',(socket)=>{
    console.log('A user connected');
    socket.on('chat',(msg)=>{
        console.log(msg);
        //socket.broadcast.emit(msg);  //broadcst to other user
        io.emit('chat',msg);      //broadcast to everyone
    });

    socket.on('disconnect',()=>{
        console.log("User disconnected");
    });
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
});

server.listen(port,server_msg);