import { mongo } from "globals";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    converImage : {
        type : String,
        required : true
    },
    file : {
        type : String,
        required : true
    },
    genre : {
        type : String,
        required : true
    },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
