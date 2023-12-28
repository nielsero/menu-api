import { RequestValidator } from "@/shared/protocols";
import { ZodRequestWithIdAndMenuIdValidator, ZodRequestWithIdValidator } from "@/shared/providers/validators";

// Build
const requestWithIdValidator = new ZodRequestWithIdValidator();
const requestWitIdAndMenuIdValidator = new ZodRequestWithIdAndMenuIdValidator();

// Export
export const buyRequestWithIdValidator = (): RequestValidator<{ id: string }> => requestWithIdValidator;
export const buyRequestWithIdAndMenuIdValidator = (): RequestValidator<{ id: string; menuId: string }> =>
  requestWitIdAndMenuIdValidator;
