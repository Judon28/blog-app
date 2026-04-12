
export function formatContent(htmlString) {
  if (!htmlString) return "";

  // Create a temporary DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Walk through all text nodes
  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.nodeValue;

      // Replace multiple spaces with single spaces (clean text)
      text = text.replace(/\s+/g, " ");

      // Add zero-width space ONLY at safe break points (spaces)
      text = text.split(" ").join(" \u200B");

      node.nodeValue = text;
    } else {
      node.childNodes.forEach(processNode);
    }
  }

  processNode(doc.body);

  return doc.body.innerHTML;
}