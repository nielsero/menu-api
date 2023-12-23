import { LoginUserService, RegisterUserService } from "@/modules/auth/services";
import { buyAuthProviders, buyAuthValidators } from "@/store/auth";
import { buyUserServices } from "@/store/user";

type Store = {
  registerUserService: RegisterUserService;
  loginUserService: LoginUserService;
};

const { tokenProvider, hashProvider } = buyAuthProviders();
const { createUserService, getUserByEmailService } = buyUserServices();
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

export const buyAuthServices = (): Store => {
  return { loginUserService, registerUserService };
};
