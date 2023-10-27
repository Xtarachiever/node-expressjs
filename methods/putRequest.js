const requestBodyParser = require('../util/body-parser');
const writeToFile = require('../util/write-to-file');
module.exports = async (req,res) =>{
    const baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    let id = req.url.split('/')[3];
    if(baseUrl === '/api/movies/'){
        if(regexV4.test(id)){
            const body = await requestBodyParser(req)
            const updateData = req.movies.findIndex((movie)=>{
                return movie.id === id
            })
            if(updateData === -1){
                res.writeHead(404,{"Content-Type":"application/json"});
                res.end(JSON.stringify({
                    title:'Not Found',
                    message:"No content found"
                }))
            }else{
                req.movies[updateData] = {id, ...body}
                writeToFile(req.movies);
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(JSON.stringify(req.movies))
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