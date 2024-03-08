import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false
});

export default mongoose.model('Book',bookSchema )