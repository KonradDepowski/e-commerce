import { Schema } from "mongoose";
import mongoose from "mongoose";

export type orderSchemaType = {
  products: Array<Object>;
  buyerId: string;
};

const orderSchema = new Schema({
  products: {
    type: Array,
    required: true,
    unique: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
  
});

export default mongoose.models.user || mongoose.model("order", orderSchema);
