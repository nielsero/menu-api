import { CreateMenuRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";

const schema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
});

export class ZodCreateMenuRequestValidator extends ZodRequestValidator<Omit<CreateMenuRequest, "userId">> {
  constructor() {
    super(schema);
  }
}
