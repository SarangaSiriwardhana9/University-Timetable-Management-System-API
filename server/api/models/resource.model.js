import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
