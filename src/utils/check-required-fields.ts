import { ValidationError } from "@/shared/errors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkRequiredFields = (request: any, fields: string[]) => {
  fields.forEach((field) => {
    if (!request[field]) throw new ValidationError(`${field} is required`);
  });
};
