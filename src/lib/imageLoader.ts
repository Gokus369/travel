const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** GitHub Pages has no image server, so widths come from files made by scripts/build-photos.mjs. */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (src.startsWith("/photos/") && width <= 1280) {
    const folder = width <= 640 ? "w640" : "w1280";
    return `${base}${src.replace("/photos/", `/photos/${folder}/`)}`;
  }
  return `${base}${src}?w=${width}`;
}
