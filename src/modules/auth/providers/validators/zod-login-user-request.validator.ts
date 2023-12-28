import { LoginUserRequest } from "@/modules/auth/services";
import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});

export class ZodLoginUserRequestValidator extends ZodRequestValidator<LoginUserRequest> {
  constructor() {
    super(schema);
  }
}
