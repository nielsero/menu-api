import { EditMenuRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";

const editMenuSchema = z.object({
  id: z.string(),
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  userId: z.string(),
});

export class ZodEditMenuRequestValidator extends ZodRequestValidator<EditMenuRequest> {
  constructor() {
    super(editMenuSchema);
  }
}
