import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";
import { DeleteMenuItemRequest } from "../../services";

const schema = z.object({
  id: z.string(),
  menuId: z.string(),
  userId: z.string(),
});

export class ZodDeleteMenuItemRequestValidator extends ZodRequestValidator<DeleteMenuItemRequest> {
  constructor() {
    super(schema);
  }
}
