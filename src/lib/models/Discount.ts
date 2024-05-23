import { Schema } from "mongoose";
import mongoose from "mongoose";

export type userSchemaType = {
  code: string;
  amount: number;
};

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
