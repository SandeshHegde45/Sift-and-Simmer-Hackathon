// Generates a small on-brand illustration (steaming bowl + dish name) as an
// inline SVG data URI. Used as the image for bundled fallback recipes, and
// as a safety net if a live API image fails to load. Because it's a data
// URI, it never depends on a network request to render.

const CATEGORY_PALETTE = {
  Vegetarian: { bg: "#2F4B3C", accent: "#3F6350", icon: "#F3C866" },
  Vegan: { bg: "#2F4B3C", accent: "#3F6350", icon: "#F3C866" },
  Breakfast: { bg: "#E3A62A", accent: "#F3C866", icon: "#2F4B3C" },
  Dessert: { bg: "#7A2E2E", accent: "#9A4444", icon: "#F3C866" },
  Side: { bg: "#3F6350", accent: "#2F4B3C", icon: "#FBF3E7" },
  Starter: { bg: "#9A4444", accent: "#7A2E2E", icon: "#FBF3E7" },
  default: { bg: "#2F4B3C", accent: "#3F6350", icon: "#F3C866" },
};

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function wrapName(name, maxLineLength = 14) {
  if (name.length <= maxLineLength) return [name];
  const words = name.split(" ");
  const lines = [];
  let current = "";
  words.forEach((word) => {
    if ((current + " " + word).trim().length > maxLineLength && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  });
  if (current) lines.push(current);
  return lines;
}

export function generateDishThumb(name, category) {
  const palette = CATEGORY_PALETTE[category] || CATEGORY_PALETTE.default;
  const lines = wrapName(name || "Recipe");
  const startY = lines.length === 1 ? 428 : 408;

  const textSpans = lines
    .map(
      (line, index) =>
        `<tspan x="250" dy="${index === 0 ? 0 : 42}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
    <rect width="500" height="500" fill="${palette.bg}"/>
    <circle cx="250" cy="205" r="150" fill="${palette.accent}" opacity="0.55"/>
    <path d="M140 255 Q250 345 360 255 L348 278 Q250 355 152 278 Z" fill="${palette.icon}"/>
    <ellipse cx="250" cy="250" rx="108" ry="20" fill="${palette.icon}"/>
    <path d="M205 185 Q195 150 212 125 Q229 150 218 185" stroke="${palette.icon}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.75"/>
    <path d="M250 185 Q240 145 257 115 Q274 145 263 185" stroke="${palette.icon}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.75"/>
    <path d="M295 185 Q285 150 302 125 Q319 150 308 185" stroke="${palette.icon}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.75"/>
    <text x="250" y="${startY}" text-anchor="middle" font-family="Georgia, serif" font-size="32" font-weight="600" fill="${palette.icon}">${textSpans}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
