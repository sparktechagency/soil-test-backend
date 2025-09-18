import mongoose, { Schema } from "mongoose";

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sortDescription: {
    type: String,
    required: true,
  },
  detailDescription: {
    type: String,
    required: true,
  },
  document: {
    type: [String],
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Document = mongoose.model("Document", documentSchema);
