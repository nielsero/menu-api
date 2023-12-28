import {
  ZodCreateMenuRequestValidator,
  ZodEditMenuRequestValidator,
} from "@/modules/menu/providers/validators";
import { CreateMenuRequest, EditMenuRequest } from "@/modules/menu/services";
import { RequestValidator } from "@/shared/protocols";

// Build
const createMenuValidator = new ZodCreateMenuRequestValidator();
const editMenuValidator = new ZodEditMenuRequestValidator();

// Export
export const buyCreateMenuValidator = (): RequestValidator<CreateMenuRequest> => createMenuValidator;
export const buyEditMenuValidator = (): RequestValidator<EditMenuRequest> => editMenuValidator;
