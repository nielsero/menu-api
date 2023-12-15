export interface RequestValidator<T> {
  validate(request: T): Promise<void>;
}
