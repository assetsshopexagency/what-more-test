// app/routes/api.show-excluded-products.js
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const videoId = url.searchParams.get("videoId");

  try {
    if (videoId) {
      const video = await prisma.mediaFile.findUnique({
        where: { 
          id: parseInt(videoId),
          sessionId: session.id 
        },
        include: {
          excludedProducts: {
            include: {
              product: true
            }
          }
        }
      });

      if (!video) {
        return json({ success: false, error: "Video not found" }, { status: 404 });
      }

      const excluded = video.excludedProducts.map(ep => ep.product);

      return json({
        success: true,
        video: {
          id: video.id,
          title: video.title,
          excludedCount: excluded.length
        },
        excluded
      });
    } else {
      const allExcluded = await prisma.excludedProduct.findMany({
        where: {
          mediaFile: {
            sessionId: session.id
          }
        },
        include: {
          product: true,
          mediaFile: {
            select: {
              id: true,
              title: true
            }
          }
        }
      });

      const videoMap = {};
      allExcluded.forEach(ep => {
        const vid = ep.mediaFile.id;
        if (!videoMap[vid]) {
          videoMap[vid] = {
            video: {
              id: ep.mediaFile.id,
              title: ep.mediaFile.title,
              excludedCount: 0
            },
            excluded: []
          };
        }
        videoMap[vid].excluded.push(ep.product);
        videoMap[vid].video.excludedCount = videoMap[vid].excluded.length;
      });

      return json({
        success: true,
        videoExcludeds: Object.values(videoMap),
        totalExclusions: allExcluded.length
      });
    }
  } catch (error) {
    console.error("❌ Error loading video excluded products:", error);
    return json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
};