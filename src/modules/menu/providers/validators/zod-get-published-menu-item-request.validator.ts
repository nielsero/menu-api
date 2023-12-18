import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";
import { GetPublishedMenuItemRequest } from "../../services";

const schema = z.object({
  id: z.string(),
  menuId: z.string(),
});

export class ZodGetPublishedMenuItemRequestValidator extends ZodRequestValidator<GetPublishedMenuItemRequest> {
  constructor() {
    super(schema);
  }
}
