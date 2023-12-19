import {
  ZodLoginUserRequestValidator,
  ZodRegisterUserRequestValidator,
} from "@/modules/auth/providers/validators";
import { LoginUserRequest, RegisterUserRequest } from "@/modules/auth/services";
import { RequestValidator } from "@/shared/protocols";

type Store = {
  registerUserValidator: RequestValidator<RegisterUserRequest>;
  loginUserValidator: RequestValidator<LoginUserRequest>;
};

const registerUserValidator = new ZodRegisterUserRequestValidator();
const loginUserValidator = new ZodLoginUserRequestValidator();

export const buyAuthValidators = (): Store => {
  return { registerUserValidator, loginUserValidator };
};
