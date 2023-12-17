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

  constructor(props: UserProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
}
