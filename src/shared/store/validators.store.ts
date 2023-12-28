import { RequestValidator } from "@/shared/protocols";
import { ZodRequestWithIdValidator } from "@/shared/providers/validators";

// Build
const requestWithIdValidator = new ZodRequestWithIdValidator();

// Export
export const buyRequestWithIdValidator = (): RequestValidator<{ id: string }> => requestWithIdValidator;
