import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sortDescription: {
        type: String,
        required: true
    },
    detailDescription: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

export const Document = mongoose.model('Document', documentSchema);

