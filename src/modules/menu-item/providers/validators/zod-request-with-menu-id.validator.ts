import { z } from "zod";
import { ZodRequestValidator } from "@/shared/providers/validators";

const schema = z.object({
  menuId: z.string({ required_error: "Menu id is required" }),
});

export class ZodRequestWithMenuIdValidator extends ZodRequestValidator<{ menuId: string }> {
  constructor() {
    super(schema);
  }
}
