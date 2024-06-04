
export function validRequiredFields(requiredFields: string[], body: Record<string, any>) {
  return requiredFields.filter((field) => !body[field]);
}
