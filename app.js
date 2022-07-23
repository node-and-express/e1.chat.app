//main configuration
const { Socket } = require('dgram');
const express=require('express');
const app=express();
const http=require('http');
const port=3000;
const server=http.createServer(app);
const server_msg=()=>{console.log('Server running on *:3000')};

//configure mail sending
const nodemailer=require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'martin.vandervort50@ethereal.email',
        pass: 'AyUCdNj7RgfGrp7DD9'
    }
});

var mailOptions={
    from:'martin.vandervort50@ethereal.email',
    to:'chabid492@gmail.com',
    subject:'Welcome',
    text:'It is testing mail of node js project',
};

transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        console.log(error);
    }else{
        console.log(info.response);
    }
});

//socket server
const { Server }=require('socket.io');
const io=new Server(server);  //passing app server to Socket Server constructor for communication

app.use(express.static("./")); 

//all about real time chat
io.on('connection',(socket)=>{
    
    //broadcast message on any user connected
    console.log('A user connected to chat');
    io.emit('chat','An user has joind chat');

    //broadcast message
    socket.on('chat',(msg)=>{
        //console.log(msg);
        //socket.broadcast.emit(msg);  //broadcst to other user
        io.emit('chat',msg);      //broadcast to everyone
    });

    //broadcast messsage on any user disconnect
    socket.on('disconnect',()=>{
        console.log("User disconnected");
        io.emit('chat','An user has leaved chat');
    });
});

//app routes
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
});

server.listen(port,server_msg);