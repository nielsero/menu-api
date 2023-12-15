import crypto from "crypto";

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export class User {
  readonly id: string;
  name: string;
  email: string;
  password: string;

  constructor(user: UserProps) {
    this.id = user.id ?? crypto.randomUUID();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }
}
