import { LoginUserService, RegisterUserService } from "@/modules/auth/services";
import { buyAuthProviders, buyAuthValidator } from "@/store/auth";
import { buyUserServices } from "@/store/user";

type Store = {
  registerUserService: RegisterUserService;
  loginUserService: LoginUserService;
};

const { tokenProvider, hashProvider } = buyAuthProviders();
const { registerUserValidator, loginUserValidator } = buyAuthValidator();
const { createUserService, findUserByEmailService } = buyUserServices();
const registerUserService = new RegisterUserService({
  tokenProvider,
  hashProvider,
  createUserService,
  requestValidator: registerUserValidator,
});
const loginUserService = new LoginUserService({
  tokenProvider,
  hashProvider,
  findUserByEmailService,
  requestValidator: loginUserValidator,
});

export const buyAuthServices = (): Store => {
  return { loginUserService, registerUserService };
};
