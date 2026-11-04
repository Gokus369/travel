import photoData from "@/data/photos.json";

export const photos = photoData;

export type PhotoKey = keyof typeof photoData;
