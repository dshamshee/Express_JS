const http = require('http');
const server = http.createServer(function(request, responce){
    responce.end("Server Created Successfully.")
})
server.listen(7000)