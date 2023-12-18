import { SALT_ROUNDS, TOKEN_SECRET } from "@/config";
import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { BcryptHashProvider, JwtTokenProvider } from "@/modules/auth/providers";

type Store = {
  hashProvider: HashProvider;
  tokenProvider: TokenProvider;
};

const hashProvider = new BcryptHashProvider(SALT_ROUNDS);
const tokenProvider = new JwtTokenProvider(TOKEN_SECRET);

export const buyAuthProviders = (): Store => {
  return { hashProvider, tokenProvider };
};
