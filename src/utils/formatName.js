export function formatName(name) {
  return name
    .replace(/[0-9]/g, "")
    .replace(/_/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
