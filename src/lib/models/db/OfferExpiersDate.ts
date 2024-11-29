import { Schema } from "mongoose";
import mongoose from "mongoose";

const offerExpiresDate = new Schema({
  date: {
    type: Date,
  },
});

export default mongoose.models.offerExpiresDate ||
  mongoose.model("offerExpiresDate", offerExpiresDate);
