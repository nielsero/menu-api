import { GetAllMenusRequest } from "@/modules/menu/services";
import { ZodRequestValidator } from "@/shared/providers/validators";
import { z } from "zod";

const getAllMenusSchema = z.object({
  userId: z.string(),
});

export class ZodGetAllMenusRequestValidator extends ZodRequestValidator<GetAllMenusRequest> {
  constructor() {
    super(getAllMenusSchema);
  }
}
