export const nonEmptyString = (message: string) => (value: string) =>
  value.trim().length > 0 || message;
