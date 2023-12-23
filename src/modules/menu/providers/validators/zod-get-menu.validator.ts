import { GetMenuRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export class ZodGetMenuValidator extends ZodRequestValidator<GetMenuRequest> {
  constructor() {
    super(schema);
  }
}
