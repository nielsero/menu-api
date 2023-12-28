import { EditMenuRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";

const schema = z.object({
  id: z.string({ required_error: "Id is required" }),
  name: z.string().min(3).optional(),
  description: z.string().optional(),
});

export class ZodEditMenuRequestValidator extends ZodRequestValidator<Omit<EditMenuRequest, "userId">> {
  constructor() {
    super(schema);
  }
}
