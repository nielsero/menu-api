import { CreateMenuRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";

const createMenuSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  userId: z.string(),
});

export class ZodCreateMenuRequestValidator extends ZodRequestValidator<CreateMenuRequest> {
  constructor() {
    super(createMenuSchema);
  }
}
