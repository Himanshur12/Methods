const http = require('http');
var fs = require('fs');

const server = http.createServer((request, response) => {
    
    var fileData = fs.readFileSync('./myJson.json');
    var toStingConvert = fileData.toString();

    if(request.method=='GET')
    {    
        if (toStingConvert.length > 0) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.write(toStingConvert);
            response.end();
        } else {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'application/json');
            response.write("My data Not found!");
            response.end();
        }        
    } 
   else if(request.method=='POST') 
    {  
        myData = ''
        request.on('data', (chunk) => {
            myData += chunk.toString()
        });

        request.on('end', () => {

            console.log(myData);
            fs.writeFile("myJson.json",myData,function(err,data){
                if(err){
                    console.log(err);
                } });
            response.writeHead(200, 'OK', {'Content-Type': 'application/html'})
            response.end();
        });
    }
    else if(request.method=='DELETE')
    { 
        var myData = [ ];
        var id = [];
       myData =  fs.readFile("myJson.json",myData,function(err,data){
            if(err){
                console.log(err);
            } });
       
        request.on('data',(chunk)=>{
            var chunk = parseInt(chunk.toString());
            deleteUser(_users,chunk);
            function deleteUser(_users,chunk){
             
                for(x of _users){
                    ids.push(x.id);
                }
                setTimeout(function () {
                    if(ids.indexOf(chunk.id) !== -1){
                
                        console.log('id not exist');
                
                    } else{
                
                        _users.splice(ids.indexOf(chunk.id), 1 );
                
                    }},100);
            }
        });
        setTimeout(function () {
            writeUsers(_users);},200);
    }
    else if(request.method=='PUT')
    {
        myData = ''
        request.on('data', (chunk) => {
            myData += chunk.toString()
        });
        request.on('end', () => {

            console.log(myData);
            fs.appendFile("myJson.json",myData,function(err,data){
                if(err){
                    console.log(err);
                } });
            response.writeHead(200, 'OK', {'Content-Type': 'application/html'})
            response.end();
        });
    }
        
     else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/json');
        res.end("Failed");
        
    }
});

server.listen(8000,() => {
    console.log('Server running at 8000');
});
