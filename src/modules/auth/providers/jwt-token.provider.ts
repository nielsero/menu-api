import jwt from "jsonwebtoken";

export class JwtTokenProvider {
  constructor(private readonly secret: string) {}

  async generateToken(payload: string): Promise<string> {
    return jwt.sign(payload, this.secret);
  }

  async verifyToken(token: string): Promise<string> {
    return jwt.verify(token, this.secret) as string;
  }
}
