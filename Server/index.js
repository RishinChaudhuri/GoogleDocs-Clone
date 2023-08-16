// npm init command in terminal gives package.json with all node modules in server 
// socket.io is for real time chatting, editing, etc.
import {Server} from "socket.io";
import Connection from "./Database/db.js";
import { getDocument,updateDocument } from "./Controller/document-controller.js";
const PORT= 9000;
Connection();

const io= new Server(PORT,{
    cors: {
       origin:"http://localhost:3000",
       methods:['GET', 'POST']
    }
})
// cors is a cross origin resourse sharing security error and hence we need to bypass it.
//Cross-origin resource sharing (CORS) is a mechanism for integrating applications. 
//CORS defines a way for client web applications that are loaded in one domain to interact with
//resources in a different domain.
io.on("connection",socket => {
    //Broadcasting only when that document exits in the server
    socket.on('get-document', async documentId =>{
        
        const document = await getDocument(documentId);
        socket.join(documentId);// Connect with that documnetId
        socket.emit('load-document',document);

        socket.on('send-changes', delta =>{
            socket.broadcast.to(documentId).emit('receive-changes', delta); // broadcast the changes to all viewers|| receive changes is the event and delta is the change obtained
        })
        socket.on('save-document', async data =>{
             await updateDocument(documentId,data);
        })
    })
    
});

//io.on(eventName,handlerFunction)
/*
eventName->The name of the socket event
handlerFunction()-> An event handler that will be called when the server broadcasts a notification to this socket. 
Will only be called if the incoming socket notification matches eventName.
*/
