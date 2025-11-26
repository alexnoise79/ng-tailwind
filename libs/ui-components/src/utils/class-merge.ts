/**
 * Merges multiple class strings, removing duplicates and empty values
 */
export function classMerge(...classes: Array<string | undefined | null | false>): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter((cls, index, arr) => arr.indexOf(cls) === index)
    .join(' ')
    .trim();
}
