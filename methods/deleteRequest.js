const writeToFile = require("../util/write-to-file");

module.exports = (req,res) =>{
    const baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    let id = req.url.split('/')[3];
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if(baseUrl === '/api/movies/'){
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        if(regexV4.test(id)){
            const deletedPost = req.movies.findIndex((movie)=>{
                return movie.id === id
            })
            if(deletedPost === -1){
                res.writeHead(404, {"Content-Type":"application/json"});
                res.write(JSON.stringify({title:'Not Found', message:'Movie not found'}));
                res.end()
            }else{
                req.movies.splice(deletedPost, 1);
                writeToFile(req.movies);
                res.writeHead(204, {"Content-Type":"application/json"});
                res.end(JSON.stringify(req.movies));
            }
        }else if(!regexV4.test(id)){
            res.writeHead(400,{"Content-Type":"application/json"});
            res.end(JSON.stringify({
                title:'Validation Failed',
                message:"UUID is not valid"
            }))
        }
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type","application/json");
        res.write(JSON.stringify({title:"Not Found", message:"Route not found"}));
        res.end();
    }
}