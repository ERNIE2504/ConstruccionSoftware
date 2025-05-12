const log = console.log;
const multer = require("multer");
const path    = require('path');

const storage = multer.diskStorage({
    destination : function(req, file, callback){
        log("File destination:", "./public"); //Log destination path
        callback(null,"./public");
    },
    filename : function(req,file,callback){
        log("Uploaded file:", req.body); //Log receive from data
        return callback(null,file.originalname);
    }
})

const upload = multer({storage: storage}).array("file",1);

module.exports.upload_file = async (req,res) =>{
    log("Cargando el archivo");

    upload(req,res,function(err){
        if(err){
            console.error(err);
            return res.status(500).json({code: 500, msg:"Error uploading file"});
        }

        log("Upload succesful:", req.files); //Log uploaded files
        res.status(200).json({code:200,msg:"Ok"});
    })
}

const storage_private = multer.diskStorage({
    destination : function(req, file, callback){
        log("File destination:", "./private"); //Log destination path
        callback(null,"./private");
    },
    filename : function(req,file,callback){
        log("Uploaded file:", req.body); //Log receive from data
        return callback(null,file.originalname);
    }
})

const upload_private = multer({storage: storage_private}).array("file",1);

module.exports.upload_file_private = async (req,res) =>{
    log("Cargando el archivo");

    upload_private(req,res,function(err){
        if(err){
            console.error(err);
            return res.status(500).json({code: 500, msg:"Error uploading file"});
        }

        log("Upload succesful:", req.files); //Log uploaded files
        res.status(200).json({code:200,msg:"Ok"});
    })
}