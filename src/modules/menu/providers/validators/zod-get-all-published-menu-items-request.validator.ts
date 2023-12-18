import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";
import { GetAllPublishedMenuItemsRequest } from "../../services";

const schema = z.object({
  menuId: z.string(),
});

export class ZodGetAllPublishedMenuItemsRequestValidator extends ZodRequestValidator<GetAllPublishedMenuItemsRequest> {
  constructor() {
    super(schema);
  }
}
