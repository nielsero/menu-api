import { z } from "zod";
import { ZodRequestValidator } from "@/shared/providers/validators";

const schema = z.object({
  id: z.string({ required_error: "Id is required" }),
});

export class ZodRequestWithIdValidator extends ZodRequestValidator<{ id: string }> {
  constructor() {
    super(schema);
  }
}
