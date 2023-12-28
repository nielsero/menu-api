import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";
import { GetMenuItemRequest } from "@/modules/menu-item/services";

const schema = z.object({
  id: z.string(),
  menuId: z.string(),
  userId: z.string(),
});

export class ZodGetMenuItemRequestValidator extends ZodRequestValidator<GetMenuItemRequest> {
  constructor() {
    super(schema);
  }
}
