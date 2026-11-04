import Image from "next/image";
import { photos, type PhotoKey } from "@/data/photos";

type Props = {
  name: PhotoKey;
  sizes: string;
  className?: string;
  preload?: boolean;
  /** Use "" when the photo is decorative or the surrounding text already names the place. */
  alt?: string;
};

export function Photo({ name, sizes, className = "", preload, alt }: Props) {
  const photo = photos[name];
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      fill
      sizes={sizes}
      preload={preload}
      placeholder="blur"
      blurDataURL={photo.blur}
      className={`object-cover ${className}`}
    />
  );
}
