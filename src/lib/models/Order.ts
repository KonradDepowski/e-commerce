import { Schema } from "mongoose";
import mongoose from "mongoose";

export type orderSchemaType = {
  _id?: string;
  id?: string;
  productsIds: Object;
  buyerId: string;
  buyerAvatar: string;
  createdAt?: Date;
  totalAmount: number;
  discount: string;
  deliveryData: Object;
  status?: string;
};

const orderSchema = new Schema({
  id: {
    type: String,
  },
  productsIds: {
    type: Array,
    required: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
  buyerAvatar: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  totalAmount: {
    type: Number,
  },
  discount: {
    type: String,
  },
  deliveryData: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
  },
});

export default mongoose.models.order || mongoose.model("order", orderSchema);
