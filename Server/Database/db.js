import mongoose from "mongoose";

const  Connection= async (username="rishin",password="rishin")=>{
     
    const URL=`mongodb+srv://rishin:rishin@cluster0.fhukxqx.mongodb.net/?retryWrites=true&w=majority`
    
     try{
         await mongoose.connect(URL,{useUnifiedTopology: true, useNewUrlParser:true});// async function
         console.log('Database connected successfully.');
     }catch(error){
        console.log('Error while connecting to the database', error);
     }
}

export default Connection;