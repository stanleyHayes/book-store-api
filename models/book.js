import mongoose from "mongoose";
const {Schema, model} = mongoose;
const  bookSchema = new Schema({
    name: {type: String, required: true, trim: true},
    author: {type: String},
    genre: {type: String}
});

const Book = model('Book', bookSchema);
export default Book;