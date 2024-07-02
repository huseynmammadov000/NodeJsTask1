

const http = require("http");
const EventEmitter = require("events");
const encrypt = require("./encrypt");
const emitter = new EventEmitter();


emitter.on("encryptString",async (data)=>{
   const value = await encrypt.encryptString(data);
   console.log(value); ;
});

emitter.on("compareString",async(data)=>{
    try {
        const value = await encrypt.compareString(data.myString, data.hash);
        console.log("Comparison result:", value);
    } catch (err) {
        console.error("Error comparing strings:", err);
    }
});


const server  = http.createServer((req,res)=>{
    if(req.method ==="POST" && req.url === "/encrypt"){
        let body = "";

        req.on("data",(chunk)=>{
            body+= chunk.toString();
        });

        req.on("end",()=>{
            const data = JSON.parse(body);
            emitter.emit("encryptString",data);
            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify({status:"success"})); 
        });
    }
    else if(req.method ==="POST" && req.url === "/compare"){
        let body = "";

        req.on("data",(chunk)=>{
            body+= chunk.toString();
        });

        req.on("end",()=>{
            const data = JSON.parse(body);
            emitter.emit("compareString",data);
            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify({status:"success"})); 
        });
    }
    else{
        res.writeHead(404);
        res.end();
    }
})


server.listen(5007,()=>{
    console.log("server listening on port 5007");
})