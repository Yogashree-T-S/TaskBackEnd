 /* 1.Take File from the user check if the file is present or not.
the file should be of only .txt form .check that file size should 
not exceed 10 KB */


const http = require('http')
const formidable = require('formidable');
const fs = require('fs')


http.createServer(function (req, res){
    res.writeHead(200, { 'Content-Type': 'text/html' })
    if(req.url=='/fileuploaded'){
        var form =new formidable.IncomingForm();
        
        form.parse(req,(err,fields,files)=>{
            try{
                var oldpath=files.filetoupload[0].filepath;
                var newpath=__dirname+'/'+files.filetoupload[0].originalFilename
                if(newpath.endsWith('.txt')){
                    if(files.filetoupload[0].size<10240){
                        fs.rename(oldpath,newpath,(err)=>{
                            if(err) 
                                console.log('error');
                            res.write("File Uploaded");
                            res.end();
                        })
                    }
                    else{
                        res.end("File size is huge");
                    }
                }
                else{
                    res.end("Select only text files");
                }
                
            }
            catch(err){
                res.write("No file chosen         "+err);
                res.end();
            }
            
        })
    }else{
        res.write("<form action='fileuploaded' method='post' enctype='multipart/form-data'>")
        res.write("Select a file")
        res.write("<br/>")
        res.write("<input type='file' name='filetoupload'>")
        res.write("<br/>")
        // res.write("<input type='submit'  value='submit'>")
        res.write("<button type='submit'>Submit</button>")
        res.write("</form>")
        res.end()
    }

}).listen(8000,()=>console.log('listening on port'));