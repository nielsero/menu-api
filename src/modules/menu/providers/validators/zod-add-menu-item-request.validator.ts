import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";
import { AddMenuItemRequest } from "@/modules/menu/services";

const schema = z.object({
  name: z.string().min(3).optional(),
  price: z.number().min(0),
  type: z.enum(["food", "drink"]),
  description: z.string().optional(),
  image: z.string().optional(),
  menuId: z.string(),
});

export class ZodAddMenuItemRequestValidator extends ZodRequestValidator<AddMenuItemRequest> {
  constructor() {
    super(schema);
  }
}
