import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";
import { DeleteMenuItemRequest } from "@/modules/menu-item/services";

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
