// Placeholder photos from Unsplash (Unsplash License). Replace files in ./assets/photos keeping the names.
const files = import.meta.glob("./assets/photos/*.webp", { eager: true, import: "default" });

function photo(name) {
  const sizes = Object.entries(files)
    .map(([path, url]) => [path.match(/\/([\w-]+)-(\d+)\.webp$/), url])
    .filter(([m]) => m && m[1] === name)
    .map(([m, url]) => [Number(m[2]), url])
    .sort((a, b) => a[0] - b[0]);
  if (!sizes.length) throw new Error(`Missing photo: ${name}`);
  return { src: sizes[sizes.length - 1][1], srcSet: sizes.map(([w, url]) => `${url} ${w}w`).join(", ") };
}

export const photos = {
  hero: photo("hero"),
  wedding: photo("wedding"),
  family: photo("family"),
  portrait: photo("portrait"),
  landscape: photo("landscape"),
  weddingSilhouette: photo("wedding-silhouette"),
  familyPlay: photo("family-play"),
  mountainLake: photo("mountain-lake"),
  portraitStripes: photo("portrait-stripes"),
  bouquet: photo("bouquet"),
  krakow: photo("krakow"),
  familyKiss: photo("family-kiss"),
  portraitCity: photo("portrait-city"),
  photographer: photo("photographer")
};
