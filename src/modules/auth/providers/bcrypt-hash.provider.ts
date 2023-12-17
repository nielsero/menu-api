import bcrypt from "bcrypt";
import { HashProvider } from "@/modules/auth/protocols";

export class BcryptHashProvider implements HashProvider {
  constructor(private readonly salt: number) {}

  hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.salt);
  }

  compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
