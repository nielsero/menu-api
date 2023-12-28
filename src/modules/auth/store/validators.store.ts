import {
  ZodLoginUserRequestValidator,
  ZodRegisterUserRequestValidator,
} from "@/modules/auth/providers/validators";
import { LoginUserRequest, RegisterUserRequest } from "@/modules/auth/services";
import { RequestValidator } from "@/shared/protocols";

const registerUserValidator = new ZodRegisterUserRequestValidator();
const loginUserValidator = new ZodLoginUserRequestValidator();
export const buyRegisterUserValidator = (): RequestValidator<RegisterUserRequest> => registerUserValidator;
export const buyLoginUserValidator = (): RequestValidator<LoginUserRequest> => loginUserValidator;
