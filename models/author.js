import mongoose from "mongoose";
const {Schema, model} = mongoose;

const  authorSchema = new Schema({
    name: {type: String, required: true, trim: true},
    age: {type: Number}
});

const Author = model('Author', authorSchema);
export default Author;