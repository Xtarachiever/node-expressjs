const crypto = require("crypto");
const requestBodyParser = require('../util/body-parser');
const writeToFile = require('../util/write-to-file');
module.exports = async (req, res)=>{
    if(req.url === '/api/movies'){
        try{
            let body = await requestBodyParser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            res.writeHead(201, {"Content-Type":"application/json"});
            writeToFile(req.movies);
            res.end()
        }catch(err){
            console.log(err)
        }
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type","application/json");
        res.write(JSON.stringify({title:"Not Found", message:"Route not found"}));
        res.end();
    }
}