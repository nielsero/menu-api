import { Document, Schema, model } from "mongoose";

type MenuDocument = Document & {
  id: string;
  name: string;
  description: string;
  published: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

const menuSchema = new Schema<MenuDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    published: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

export const MenuModel = model<MenuDocument>("Menu", menuSchema);
