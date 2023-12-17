import crypto from "crypto";

export type MenuProps = {
  id?: string;
  name: string;
  description?: string;
  published?: boolean;
  userId: string;
};

export class Menu {
  readonly id: string;
  name: string;
  description?: string;
  published: boolean;
  userId: string;

  constructor(props: MenuProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.description = props.description;
    this.published = props.published ?? false;
    this.userId = props.userId;
  }
}
