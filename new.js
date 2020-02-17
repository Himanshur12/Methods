var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req,res){
    console.log("The Request Made By  :"+req.url);
    res.writeHead(200,{'Content-type': 'application/json'});
    
    var myobj = {
        id : 101 ,
        name : "Himanshu",
        Surname : "Rawat",
        age : 22 
    };
    res.end(JSON.stringify(myobj));
    console.log("My Server Works!");
});
server.listen(3000);
console.log("Server working On Port : 3000");