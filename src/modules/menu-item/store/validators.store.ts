import { AddMenuItemRequest, EditMenuItemRequest } from "@/modules/menu-item/services";
import {
  ZodRequestWithIdAndMenuIdValidator,
  ZodRequestWithMenuIdValidator,
  ZodAddMenuItemRequestValidator,
  ZodEditMenuItemRequestValidator,
} from "@/modules/menu-item/providers/validators";
import { RequestValidator } from "@/shared/protocols";

// Build
const requestWithIdAndMenuIdValidator = new ZodRequestWithIdAndMenuIdValidator();
const requestWithMenuIdValidator = new ZodRequestWithMenuIdValidator();
const addMenuItemValidator = new ZodAddMenuItemRequestValidator();
const editMenuItemValidator = new ZodEditMenuItemRequestValidator();

// Export
export const buyRequestWithIdAndMenuIdValidator = (): RequestValidator<{ id: string; menuId: string }> =>
  requestWithIdAndMenuIdValidator;
export const buyRequestWithMenuIdValidator = (): RequestValidator<{ menuId: string }> =>
  requestWithMenuIdValidator;
export const buyAddMenuItemValidator = (): RequestValidator<Omit<AddMenuItemRequest, "userId">> =>
  addMenuItemValidator;
export const buyEditMenuItemValidator = (): RequestValidator<Omit<EditMenuItemRequest, "userId">> =>
  editMenuItemValidator;
