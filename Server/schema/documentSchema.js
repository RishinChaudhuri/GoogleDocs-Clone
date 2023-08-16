import mongoose from "mongoose";
// we make schema to validate the data before storing in database. (format)

const documentSchema= mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    data:{
        type: Object,
        required:true
    }
});
const document= mongoose.model('document',documentSchema);


export default document;