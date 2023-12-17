import { RegisterUserRequest } from "@/modules/auth/services";
import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export class ZodRegisterUserRequestValidator extends ZodRequestValidator<RegisterUserRequest> {
  constructor() {
    super(registerUserSchema);
  }
}
