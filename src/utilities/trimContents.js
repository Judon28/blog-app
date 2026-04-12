

/*export function trimContents(text, length = 210) {
  if (!text) return "";

  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length) + "...";
}*/


export function trimContents(text, length = 210) {

  if (!text) return "";

  // 1️⃣ Remove all HTML tags
  const plainText = text.replace(/<[^>]*>/g, "");
  // add spaces 
  const spacedText = plainText.replace(/&nbsp;/g, " ");
  //add quotes
  const quoteText = spacedText.replace(/&quot;/g, '"')

  // 2️⃣ Trim extra spaces
  const cleanText = quoteText.trim();

  // 3️⃣ If text is already short, return it
  if (cleanText.length <= length) {
    return cleanText;
  }

  // 4️⃣ Otherwise slice and add ellipsis
  return cleanText.slice(0, length) + "...";

}
