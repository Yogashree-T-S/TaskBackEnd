const Note=require('../models/note');

exports.findOne=(req,res)=>{
    Note.find({_id:req.params.noteId}).then((resp)=>res.send({status:200,msg:resp}))
    .catch((err)=>res.send({status:400,msg:err}))
}