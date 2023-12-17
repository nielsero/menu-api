import crypto from "crypto";

type MenuItemType = "food" | "beverage";

export type MenuItemProps = {
  id?: string;
  name: string;
  price: number;
  type: MenuItemType;
  description?: string;
  image?: string;
  menuId: string;
};

export class MenuItem {
  readonly id: string;
  name: string;
  price: number;
  type: MenuItemType;
  description?: string;
  image?: string;
  menuId: string;

  constructor(props: MenuItemProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.price = props.price;
    this.type = props.type;
    this.description = props.description;
    this.image = props.image;
    this.menuId = props.menuId;
  }
}
