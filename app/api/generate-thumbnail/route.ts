// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextRequest, NextResponse } from "next/server";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt, style, aspectRatio } = await req.json();

//     if (!prompt) {
//       return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
//     }

//     // Build an enhanced prompt for thumbnails
//     const enhancedPrompt = buildThumbnailPrompt(prompt, style, aspectRatio);

//     // Use Imagen 3 for image generation
//     const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-001" });

//     const result = await model.generateImages({
//       prompt: enhancedPrompt,
//       numberOfImages: 4,           // Generate 4 variants
//       aspectRatio: aspectRatio || "16:9",  // YouTube default
//       outputOptions: {
//         mimeType: "image/jpeg",
//         compressionQuality: 95,
//       },
//     });

//     // Convert images to base64
//     const images = result.generatedImages.map((img, index) => ({
//       id: index,
//       data: `data:image/jpeg;base64,${Buffer.from(img.image.imageBytes).toString("base64")}`,
//     }));

//     return NextResponse.json({ images, prompt: enhancedPrompt });

//   } catch (error: any) {
//     console.error("Gemini API Error:", error);
//     return NextResponse.json(
//       { error: error.message || "Image generation failed" },
//       { status: 500 }
//     );
//   }
// }

// // Helper to craft thumbnail-optimized prompts
// function buildThumbnailPrompt(
//   userPrompt: string,
//   style: string = "modern",
//   aspectRatio: string = "16:9"
// ): string {
//   const styleMap: Record<string, string> = {
//     modern:     "modern, clean, professional thumbnail design, bold typography",
//     cinematic:  "cinematic lighting, dramatic composition, movie-poster style",
//     minimal:    "minimalist design, lots of white space, clean lines",
//     vibrant:    "vibrant colors, high contrast, eye-catching, energetic",
//     gaming:     "gaming aesthetic, neon colors, dark background, futuristic",
//     educational:"educational, clean infographic style, bright and friendly",
//     vlog:       "lifestyle vlog thumbnail, natural lighting, authentic feel",
//     tech:       "tech product, sleek, dark background, glowing elements",
//   };

//   const styleDesc = styleMap[style] || styleMap.modern;

//   return `YouTube thumbnail for: "${userPrompt}". 
//     Style: ${styleDesc}. 
//     Requirements: high resolution, visually striking, 
//     optimized for ${aspectRatio} aspect ratio, 
//     click-worthy design, professional quality, 
//     no watermarks, no text overlays.`;
// }


import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, style, aspectRatio } = body;

    // Validate input
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    // Build enhanced prompt
    const enhancedPrompt = buildThumbnailPrompt(
      prompt,
      style,
      aspectRatio
    );

    const apiKey = process.env.GEMINI_API_KEY;

    // Safety check
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    // Call Imagen API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImages?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          sampleCount: 4,
          aspectRatio: aspectRatio || "16:9",
        }),
      }
    );

    const data = await response.json();

    //  Handle API errors
    if (!response.ok) {
      console.error("Imagen API Error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message || "Failed to generate images",
        },
        { status: 500 }
      );
    }

    // Correct field: data.images (NOT generatedImages)
    const images =
      data?.images?.map((img: any, index: number) => {
        if (!img?.bytesBase64Encoded) return null;

        return {
          id: index,
          data: `data:image/jpeg;base64,${img.bytesBase64Encoded}`,
        };
      }).filter(Boolean) || [];

    return NextResponse.json({
      success: true,
      images,
      prompt: enhancedPrompt,
    });

  } catch (error: any) {
    console.error("Server Error:", error);

    return NextResponse.json(
      {
        error:
          error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Prompt builder
function buildThumbnailPrompt(
  userPrompt: string,
  style: string = "modern",
  aspectRatio: string = "16:9"
): string {
  const styleMap: Record<string, string> = {
    modern:
      "modern, clean, professional thumbnail design, bold typography",
    cinematic:
      "cinematic lighting, dramatic composition, movie-poster style",
    minimal:
      "minimalist design, lots of white space, clean lines",
    vibrant:
      "vibrant colors, high contrast, eye-catching, energetic",
    gaming:
      "gaming aesthetic, neon colors, dark background, futuristic",
    educational:
      "educational, clean infographic style, bright and friendly",
    vlog:
      "lifestyle vlog thumbnail, natural lighting, authentic feel",
    tech:
      "tech product, sleek, dark background, glowing elements",
  };

  const styleDesc = styleMap[style] || styleMap.modern;

  return `YouTube thumbnail for: "${userPrompt}"
Style: ${styleDesc}
High resolution, visually striking, optimized for ${aspectRatio}, click-worthy, professional, no watermarks, no text overlays`;
}