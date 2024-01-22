/**
 * Check whether string is not empty.
 * @param value         string to check
 * @return              true if string contains at least one non-whitespace character; false otherwise
 */
export const isNotEmptyString = (value: string | undefined | null) => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return false;
};