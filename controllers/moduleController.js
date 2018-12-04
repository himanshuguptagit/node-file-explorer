
var fs = require('fs');
var path_i = require('path');
const DOCS_DIRECTORY = "./doc_modules/";
const PAT_HTML_FILE = /\.html$/;
const ERR_NOT_A_FOLDER = "Not a Folder";


class ModuleController{

  getModules(req, res){
    getDirContent(DOCS_DIRECTORY)
    .then(function(items){
      // console.log(items);
      return res.json({ data: items });
    })
    .catch(function(err){
      return err;
    });
  }

  getModuleByName(req,res){

    let tree = {name: req.params.name};
    // tree = readDown(DOCS_DIRECTORY+req.params.name,tree,req.params.name,);
    tree['children'] = readDown(DOCS_DIRECTORY+req.params.name);
    return res.json({ data: tree });

  }

  createModule(req,res){
    var path = DOCS_DIRECTORY+req.body.moduleName;
    createDirectory(path)
    .then(function(r){
      console.log(r);
      return res.json({"data":r});
    })
    .catch(function(err){
      if(err.code === "EEXIST"){
        return res.json({error: "Module already exists !"});
      }
      return res.json({error: err});
    });
  }
}

module.exports.ModuleController = ModuleController;


function getDirContent(path){
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function(err, items) {
      if(err){
        reject(err);
      } else{
        resolve(items);
      }
    });
  });
}

function createDirectory(path){
  return new Promise(function(resolve, reject) {
    fs.mkdir(path, function (err) {
      if (err){
        reject(err);
      } else{
        resolve("success");
      }
    });
  });
}

function readDown(path){
  let items = [];
  try{
    items = fs.readdirSync(path);
  } catch(err){
    return null;
  }

  let o = items.map(function(val){
    // console.log(val);
    let children = readDown(path+"/"+val);
    let type = "folder";

    if(children === null){
      if(PAT_HTML_FILE.test(val)){
        type = "html";
      }else{
        type = "file";
      }
    }

    let jsonObj = { name: val,type: type, children: children };
    return jsonObj;
  });
  return o;
}
