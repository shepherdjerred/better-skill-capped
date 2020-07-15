

export function rawTitleToDisplayTitle(rawTitle: string) {
  const title = rawTitle.replace(/\$/g, "");
  return toTitleCase(title);
}

function toTitleCase(input: string) {
  input = input.toLowerCase();
  let words = input.split(" ");
  let results = [];
  for (let i = 0; i < words.length; i++) {
    let letter = words[i].charAt(0).toUpperCase();
    results.push(letter + words[i].slice(1));
  }
  return results.join(" ");
}
