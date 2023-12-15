export interface TokenProvider {
  generateToken(payload: string): Promise<string>;
  verifyToken(token: string): Promise<string>;
}
