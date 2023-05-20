const mongoose=require('mongoose');

const url="mongodb://ayushagarwal2502:AYUSH@ac-d9aqom3-shard-00-00.zwk01l6.mongodb.net:27017,ac-d9aqom3-shard-00-01.zwk01l6.mongodb.net:27017,ac-d9aqom3-shard-00-02.zwk01l6.mongodb.net:27017/?ssl=true&replicaSet=atlas-y6boso-shard-0&authSource=admin&retryWrites=true&w=majority"

module.exports.connect=()=>{
    mongoose.connect(url,{
        useNewUrlParser:true ,
        useUnifiedTopology:true
    }).then(()=>{ 
        console.log("mongo db connected succesfully");
    }).catch((error)=>{
        console.log(error); 
    })  
}