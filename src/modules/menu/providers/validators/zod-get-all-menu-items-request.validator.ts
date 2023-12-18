import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";
import { GetAllMenuItemsRequest } from "../../services";

const schema = z.object({
  menuId: z.string(),
  userId: z.string(),
});

export class ZodGetAllMenuItemsRequestValidator extends ZodRequestValidator<GetAllMenuItemsRequest> {
  constructor() {
    super(schema);
  }
}
