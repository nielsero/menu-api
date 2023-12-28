import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";
import { GetAllMenuItemsRequest } from "@/modules/menu-item/services";

const schema = z.object({
  menuId: z.string(),
  userId: z.string(),
});

export class ZodGetAllMenuItemsRequestValidator extends ZodRequestValidator<GetAllMenuItemsRequest> {
  constructor() {
    super(schema);
  }
}
