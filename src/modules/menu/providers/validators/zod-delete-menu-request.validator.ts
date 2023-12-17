import { DeleteMenuRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";

const deleteMenuSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export class ZodDeleteMenuRequestValidator extends ZodRequestValidator<DeleteMenuRequest> {
  constructor() {
    super(deleteMenuSchema);
  }
}
