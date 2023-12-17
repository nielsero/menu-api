import { SALT_ROUNDS, TOKEN_SECRET } from "@/config";
import { AuthRouter } from "@/modules/auth";
import { RegisterUserController } from "@/modules/auth/controllers";
import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { BcryptHashProvider, JwtTokenProvider } from "@/modules/auth/providers";
import { LoginUserService, RegisterUserService } from "@/modules/auth/services";
import { makeUser } from "@/factories";
import {
  ZodLoginUserRequestValidator,
  ZodRegisterUserRequestValidator,
} from "@/modules/auth/providers/validators";
import { CreateUserService } from "@/modules/user/services";
import { UserRepository } from "@/modules/user/protocols";

export type AuthTypes = {
  authRouter: AuthRouter;
  registerUserController: RegisterUserController;
  registerUserService: RegisterUserService;
  loginUserService: LoginUserService;
  hashProvider: HashProvider;
  createUserService: CreateUserService;
  userRepository: UserRepository;
  tokenProvider: TokenProvider;
};

const bcryptHashProvider = new BcryptHashProvider(SALT_ROUNDS);
const jwtTokenProvider = new JwtTokenProvider(TOKEN_SECRET);
const registerUserRequestValidator = new ZodRegisterUserRequestValidator();
const loginUserRequestValidator = new ZodLoginUserRequestValidator();

export const makeAuth = (): AuthTypes => {
  const { createUserService, findUserByEmailService, userRepository } = makeUser();
  const registerUserService = new RegisterUserService({
    createUserService,
    requestValidator: registerUserRequestValidator,
    hashProvider: bcryptHashProvider,
    tokenProvider: jwtTokenProvider,
  });
  const registerUserController = new RegisterUserController(registerUserService);
  const loginUserService = new LoginUserService({
    findUserByEmailService,
    requestValidator: loginUserRequestValidator,
    hashProvider: bcryptHashProvider,
    tokenProvider: jwtTokenProvider,
  });
  const authRouter = new AuthRouter(registerUserController);
  return {
    authRouter,
    registerUserController,
    registerUserService,
    loginUserService,
    createUserService,
    userRepository,
    hashProvider: bcryptHashProvider,
    tokenProvider: jwtTokenProvider,
  };
};
