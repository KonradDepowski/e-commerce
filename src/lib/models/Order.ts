import { Schema } from "mongoose";
import mongoose from "mongoose";

export type orderSchemaType = {
  id: string;
  productsIds: Object;
  buyerId: string;
  createdAt: Date;
  totalAmount: number;
};

const orderSchema = new Schema({
  id: {
    type: String,
  },
  productsIds: {
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

export default mongoose.models.orders || mongoose.model("order", orderSchema);
