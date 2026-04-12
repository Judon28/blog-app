import DOMPurify from "dompurify";

export function sanitizeHtml(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p","br","strong","em","u","s",
      "h1","h2","h3",
      "a",
      "ul","ol","li",
      "blockquote",
      "code","pre",
      "img",
      "iframe"
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "target",
      "rel"
    ]
  });
}



/*export function sanitizeHtml (html) {
    return DOMPurify.sanitize(html);
}*/