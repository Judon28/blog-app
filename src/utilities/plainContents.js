

export function plainContents(text) {

  if (!text) return "";

  // 1️⃣ Remove all HTML tags
  const plainText = text.replace(/<[^>]*>/g, "");
  // add spaces 
  const spacedText = plainText.replace(/&nbsp;/g, " ");
  //add quotes
  const quoteText = spacedText.replace(/&quot;/g, '"');
  //add apostrophe
  const aposText = quoteText.replace(/&#39;/g, "'");

  // 2️⃣ Trim extra spaces
  const cleanText = aposText.trim();

  // 3️⃣ Otherwise slice and add ellipsis
  return cleanText;

}