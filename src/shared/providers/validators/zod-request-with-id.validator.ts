import { z } from "zod";
import { ZodRequestValidator } from "@/shared/providers/validators";

const schema = z.object({
  id: z.string().uuid("Invalid id"),
});

export class ZodRequestWithIdValidator extends ZodRequestValidator<{ id: string }> {
  constructor() {
    super(schema);
  }
}
