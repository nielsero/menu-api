import jwt from "jsonwebtoken";
import { TokenProvider } from "@/modules/auth/protocols";

export class JwtTokenProvider implements TokenProvider {
  constructor(private readonly secret: string) {}

  async generate(payload: string): Promise<string> {
    return jwt.sign(payload, this.secret);
  }

  async verify(token: string): Promise<string> {
    return jwt.verify(token, this.secret) as string;
  }
}
