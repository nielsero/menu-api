import { Document, Schema, model } from "mongoose";

type MenuItemDocument = Document & {
  id: string;
  name: string;
  price: number;
  type: string;
  description: string;
  image: string;
  menuId: string;
  createdAt: Date;
  updatedAt: Date;
};

const menuItemSchema = new Schema<MenuItemDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    menuId: { type: String, required: true },
  },
  { timestamps: true },
);

export const MenuItemModel = model<MenuItemDocument>("MenuItem", menuItemSchema);
