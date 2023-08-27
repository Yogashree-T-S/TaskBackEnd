const noteController=require('../controllers/notecontroller')
const express = require('express')
const router=express.Router();

router.get('/one/:noteId',noteController.findOne);
module.exports=router;