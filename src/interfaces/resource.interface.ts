import { Document } from "mongoose";

export interface IResource extends Document {
    name: string;
    description: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}
