export interface TokenProvider {
  generate(payload: string): Promise<string>;
  verify(token: string): Promise<string>;
}
