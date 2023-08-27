const mongoose=require('mongoose');
const NoteSchema=mongoose.Schema({
    title:String,
    content:String,
    
},{
    timestamps:true
})
const Note=mongoose.model('Note',NoteSchema);
module.exports=Note;