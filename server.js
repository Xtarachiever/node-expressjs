const http = require("http");
// require('dotenv').config();
const getReq = require("./methods/getRequest");
const postReq = require("./methods/postRequest");
const movies = require('./data/movies.json');
const deleteRequest = require("./methods/deleteRequest");
const putRequest = require("./methods/putRequest");
const PORT = process.env.PORT || 5001;

const server = http.createServer((req,res)=>{
    req.movies = movies
    switch(req.method){
        case "GET":
            getReq(req,res);
            break;
        case "POST":
            postReq(req,res);
            break;
        case "DELETE":
            deleteRequest(req,res);
            break;
        case "PUT":
            putRequest(req,res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type","application/json");
            res.write(JSON.stringify({title:"Not Found", message:"Route not found"}));
            res.end();
    }
});

server.listen(PORT, ()=>{
    console.log(`server started on port: ${PORT}`)
})