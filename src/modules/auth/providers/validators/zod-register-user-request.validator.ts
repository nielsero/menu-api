import { RegisterUserRequest } from "@/modules/auth/services";
import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";

const schema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3, "Name must be at least 3 characters long"),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

export class ZodRegisterUserRequestValidator extends ZodRequestValidator<RegisterUserRequest> {
  constructor() {
    super(schema);
  }
}
