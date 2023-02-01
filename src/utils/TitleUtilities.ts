export function rawTitleToDisplayTitle(rawTitle: string): string {
  if (rawTitle == null) {
    return "";
  }
  const title = rawTitle.replace(/\$/g, "").replace(/{[a-zA-Z]*}/, "");
  return toTitleCase(title);
}

function toTitleCase(input: string): string {
  input = input.toLowerCase();
  const words = input.split(" ");
  const results = [];
  for (let i = 0; i < words.length; i++) {
    const letter = words[i].charAt(0).toUpperCase();
    results.push(letter + words[i].slice(1));
  }
  return results.join(" ");
}
