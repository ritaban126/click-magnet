export type ThumbnailStyle =
  | "modern" | "cinematic" | "minimal"
  | "vibrant" | "gaming" | "educational"
  | "vlog" | "tech";

export type AspectRatio = "16:9" | "1:1" | "9:16" | "4:3";

export interface GenerateRequest {
  prompt: string;
  style: ThumbnailStyle;
  aspectRatio: AspectRatio;
}

export interface GeneratedImage {
  id: number;
  data: string; // base64 data URL
}

export interface GenerateResponse {
  images: GeneratedImage[];
  prompt: string;
  error?: string;
}