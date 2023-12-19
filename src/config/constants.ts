import "dotenv/config";

export const PORT = process.env.PORT ?? 4000;
export const TOKEN_SECRET = process.env.TOKEN_SECRET ?? "secret";
export const SALT_ROUNDS = 10;
export const NODE_ENV = process.env.NODE_ENV ?? "development";
