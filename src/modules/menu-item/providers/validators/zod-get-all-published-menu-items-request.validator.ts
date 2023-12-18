import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";
import { GetAllPublishedMenuItemsRequest } from "@/modules/menu-item/services";

const schema = z.object({
  menuId: z.string(),
});

export class ZodGetAllPublishedMenuItemsRequestValidator extends ZodRequestValidator<GetAllPublishedMenuItemsRequest> {
  constructor() {
    super(schema);
  }
}
