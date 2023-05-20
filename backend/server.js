const bodyParser = require('body-parser');
const express=require('express');
const path = require('path');
 const app=express();
 const PORT=80;
 const cors=require('cors');
 const db=require('./db');
 const router=require('./routes');

 //database connection
 db.connect();
 
 //middle ware

 app.use(bodyParser.json({limit:"50mb"}));
 app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));

 //cors 
 app.use((req,res,next)=>{
        req.header("Access-Control-Allow-Origin","*")
            res.header("Access-Control-Allow-Headers","*");
            next();
 })

 //routes
 
 app.use('/api',router)


 app.use('/uploads',express.static(path.join(__dirname,"/../uploads")))
 app.use(express.static(path.join(__dirname,"/../client/build")));

 app.get("*",(req,res)=>{
    try{
        res.sendFile(path.join(`${__dirname}/../client/build/index.html`))
    }
    catch (e){
               res.send("Oops ! unexcepted error")
    }
 })

 app.use(cors());
 app.listen(process.env.port||80,()=>{
    console.log(`listening on port no. ${PORT}`)
 })
