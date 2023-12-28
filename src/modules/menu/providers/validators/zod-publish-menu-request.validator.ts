import { PublishMenuRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";

const publishMenuSchema = z.object({
  id: z.string(),
  userId: z.string(),
});

export class ZodPublishMenuRequestValidator extends ZodRequestValidator<PublishMenuRequest> {
  constructor() {
    super(publishMenuSchema);
  }
}
