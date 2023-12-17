import { LoginUserRequest } from "@/modules/auth/services";
import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class ZodLoginUserRequestValidator extends ZodRequestValidator<LoginUserRequest> {
  constructor() {
    super(loginUserSchema);
  }
}
