const express=require('express');
const app=express();
const http=require('http');
const port=3000;
const server=http.createServer(app);
const server_msg=()=>{console.log('Server running on *:3000')};

app.use(express.static("./"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
});

server.listen(port,server_msg);