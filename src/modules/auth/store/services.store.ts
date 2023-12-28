import { GetUserSessionService, LoginUserService, RegisterUserService } from "@/modules/auth/services";
import { buyHashProvider, buyTokenProvider } from "@/modules/auth/store";
import { buyCreateUserService, buyGetUserByEmailService, buyGetUserByIdService } from "@/modules/user/store";

// Setup
const tokenProvider = buyTokenProvider();
const hashProvider = buyHashProvider();
const createUserService = buyCreateUserService();
const getUserByEmailService = buyGetUserByEmailService();
const getUserByIdService = buyGetUserByIdService();

// Build
const registerUserService = new RegisterUserService({
  tokenProvider,
  hashProvider,
  createUserService,
});
const loginUserService = new LoginUserService({
  tokenProvider,
  hashProvider,
  getUserByEmailService,
});
const getUserSessionService = new GetUserSessionService(getUserByIdService);

// Export
export const buyRegisterUserService = () => registerUserService;
export const buyLoginUserService = () => loginUserService;
export const buyGetUserSessionService = () => getUserSessionService;
