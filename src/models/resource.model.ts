import mongoose, { Schema } from "mongoose";
import { IResource } from "../interfaces/resource.interface";

const ResourceSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IResource>("Resource", ResourceSchema);
