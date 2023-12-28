import { z } from "zod";
import { ZodRequestValidator } from "@/shared/providers/validators";

const schema = z.object({
  id: z.string({ required_error: "Id is required" }),
  menuId: z.string({ required_error: "Menu id is required" }),
});

export class ZodRequestWithIdAndMenuIdValidator extends ZodRequestValidator<{ id: string; menuId: string }> {
  constructor() {
    super(schema);
  }
}
