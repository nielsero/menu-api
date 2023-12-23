import { GetPublishedMenuRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export class ZodGetPublishedMenuValidator extends ZodRequestValidator<GetPublishedMenuRequest> {
  constructor() {
    super(schema);
  }
}
