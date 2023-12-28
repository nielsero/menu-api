import { RequestValidator } from "@/shared/protocols";
import { ValidationError } from "@/shared/errors";
import { z } from "zod";

export class ZodRequestValidator<T> implements RequestValidator<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(protected readonly schema: z.ZodObject<any>) {}

  async validate(request: T) {
    try {
      this.schema.parse(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.errors.map((error) => error.message).toString());
      }
    }
  }
}
