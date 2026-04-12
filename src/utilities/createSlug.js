

export function createSlug(title, id) {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return `${baseSlug}-${id}`;
}