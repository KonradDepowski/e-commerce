import { Schema } from "mongoose";
import mongoose from "mongoose";

const discountSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.discount ||
  mongoose.model("discount", discountSchema);
