import { useState } from "react";
import { GenerateRequest, GeneratedImage } from "@/types/thumbnail";

export function useThumbnailGenerator() {
  const [images, setImages]       = useState<GeneratedImage[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [usedPrompt, setUsedPrompt] = useState("");

  const generate = async (params: GenerateRequest) => {
    setLoading(true);
    setError(null);
    setImages([]);

    try {
      const res = await fetch("/api/generate-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Generation failed");

      setImages(data.images);
      setUsedPrompt(data.prompt);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (image: GeneratedImage, index: number) => {
    const link = document.createElement("a");
    link.href = image.data;
    link.download = `thumbnail-${index + 1}.jpg`;
    link.click();
  };

  return { images, loading, error, usedPrompt, generate, downloadImage };
}