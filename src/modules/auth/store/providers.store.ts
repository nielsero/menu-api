import { SALT_ROUNDS, TOKEN_SECRET } from "@/config/constants";
import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { BcryptHashProvider, JwtTokenProvider } from "@/modules/auth/providers";

// Build
const hashProvider = new BcryptHashProvider(SALT_ROUNDS);
const tokenProvider = new JwtTokenProvider(TOKEN_SECRET);

// Export
export const buyHashProvider = (): HashProvider => hashProvider;
export const buyTokenProvider = (): TokenProvider => tokenProvider;
