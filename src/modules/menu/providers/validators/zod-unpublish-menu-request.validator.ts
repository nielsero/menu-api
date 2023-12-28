import { UnpublishMenuRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";

const unpublishMenuSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export class ZodUnpublishMenuRequestValidator extends ZodRequestValidator<UnpublishMenuRequest> {
  constructor() {
    super(unpublishMenuSchema);
  }
}
