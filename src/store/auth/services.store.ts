import { GetUserSessionService, LoginUserService, RegisterUserService } from "@/modules/auth/services";
import { buyAuthProviders, buyAuthValidators } from "@/store/auth";
import { buyUserServices } from "@/store/user";

type Store = {
  registerUserService: RegisterUserService;
  loginUserService: LoginUserService;
  getUserSessionService: GetUserSessionService;
};

const { tokenProvider, hashProvider } = buyAuthProviders();
const { createUserService, getUserByEmailService, getUserByIdService } = buyUserServices();
const { registerUserValidator, loginUserValidator } = buyAuthValidators();
const registerUserService = new RegisterUserService({
  tokenProvider,
  hashProvider,
  createUserService,
  requestValidator: registerUserValidator,
});
const loginUserService = new LoginUserService({
  tokenProvider,
  hashProvider,
  getUserByEmailService,
  requestValidator: loginUserValidator,
});
const getUserSessionService = new GetUserSessionService({ getUserByIdService });

export const buyAuthServices = (): Store => {
  return { loginUserService, registerUserService, getUserSessionService };
};
