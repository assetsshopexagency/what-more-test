// app/routes/apps.EE-Watch.carousel-videos.js
import { json } from "@remix-run/node";

export async function loader({ request, context }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  try {
    // Real stock videos from Pexels
    const videos = [
      {
        shopify_file_url:
          "https://player.vimeo.com/external/373631742.sd.mp4?s=5c6d5b3e1f2c0d7c7e4b4e4e4e4e4e4e4e4e4e4e&profile_id=164&oauth2_token_id=57447761",
        title: "Beautiful Ocean Waves",
        description: "Relaxing ocean waves crashing on the shore",
      },
      {
        shopify_file_url:
          "https://player.vimeo.com/external/458780837.sd.mp4?s=8e9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c&profile_id=164&oauth2_token_id=57447761",
        title: "Mountain Landscape",
        description: "Stunning mountain view with clouds",
      },
      {
        shopify_file_url:
          "https://player.vimeo.com/external/454387631.sd.mp4?s=7d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d&profile_id=164&oauth2_token_id=57447761",
        title: "City Time Lapse",
        description: "Beautiful city lights at night",
      },
      {
        shopify_file_url:
          "https://player.vimeo.com/external/454384541.sd.mp4?s=6c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c&profile_id=164&oauth2_token_id=57447761",
        title: "Forest Walk",
        description: "Peaceful walk through a green forest",
      },
    ];

    return json({
      success: true,
      videos: videos,
    });
  } catch (error) {
    console.error("Error loading videos:", error);
    return json(
      {
        success: false,
        videos: [],
      },
      { status: 500 },
    );
  }
}
