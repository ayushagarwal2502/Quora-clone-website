const express=require('express');
const router=express.Router();

const question=require('./Question');
const answer=require('./Answer');

router.get('/',(req,res)=>{
    res.send("this api is reserved for quora clone");

})
router.use('/questions',question)
router.use('/answers',answer)

module.exports=router
