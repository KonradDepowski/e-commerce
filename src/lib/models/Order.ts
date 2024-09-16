import { Schema } from "mongoose";
import mongoose from "mongoose";

export type orderSchemaType = {
  id: string;
  products: Object;
  buyerId: string;
  createdAt: Date;
  totalAmount: number;
};

const orderSchema = new Schema({
  id: {
    type: String,
  },
  products: {
    type: Array,
    required: true,
    unique: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  totalAmount: {
    type: Number,
  },
});

export default mongoose.models.user || mongoose.model("order", orderSchema);
