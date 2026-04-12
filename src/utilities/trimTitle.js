
export function trimTitle(text, length = 60) {
  if (!text) return "";

  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length) + "...";
}

export function trimTableTitle(text, length = 20) {
  if (!text) return "";

  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length) + "...";
}

export function trimSideTitle(text, length = 52) {
  if (!text) return "";

  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length) + "...";
}