import { ZodRequestValidator } from "@/shared/providers";
import { z } from "zod";
import { EditMenuItemRequest } from "@/modules/menu-item/services";

const schema = z.object({
  id: z.string(),
  name: z.string().min(3).optional(),
  price: z.number().min(0).optional(),
  type: z.enum(["food", "drink"]).optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  menuId: z.string(),
  userId: z.string(),
});

export class ZodEditMenuItemRequestValidator extends ZodRequestValidator<EditMenuItemRequest> {
  constructor() {
    super(schema);
  }
}
