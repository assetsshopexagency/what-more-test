import { getShopifyContext } from "../shopify.server.js";

export async function action({ request }) {
    try {
        const { session, error } = await getShopifyContext();

        if (error || !session?.shop || !session?.accessToken) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Shopify not configured"
                }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const body = await request.json();
        const { videoId, statusChanges, removals, reorder } = body;

        console.log('🔄 Processing bulk update for video:', videoId);
        console.log('📊 Status changes:', statusChanges);
        console.log('🗑️ Removals:', removals);
        console.log('🔀 Reorder:', reorder);

        const prisma = (await import('../db.server.js')).default;

        // Process status changes (enable/disable products)
        if (statusChanges && statusChanges.length > 0) {
            for (const change of statusChanges) {
                await prisma.enableProduct.upsert({
                    where: {
                        video_id_product_id: {
                            video_id: parseInt(videoId),
                            product_id: change.productId
                        }
                    },
                    update: {
                        status: change.status
                    },
                    create: {
                        video_id: parseInt(videoId),
                        product_id: change.productId,
                        status: change.status
                    }
                });
            }
            console.log(`✅ Updated ${statusChanges.length} status changes`);
        }

        // Process product removals
        if (removals && removals.length > 0) {
            for (const productId of removals) {
                await prisma.videoProduct.deleteMany({
                    where: {
                        video_id: parseInt(videoId),
                        product: {
                            shopify_product_id: String(productId)
                        }
                    }
                });

                // Also remove from enable products
                await prisma.enableProduct.deleteMany({
                    where: {
                        video_id: parseInt(videoId),
                        product: {
                            shopify_product_id: String(productId)
                        }
                    }
                });
            }
            console.log(`✅ Removed ${removals.length} products`);
        }

        // Process reordering
        if (reorder && reorder.length > 0) {
            for (const item of reorder) {
                // First, get the video product ID
                const videoProduct = await prisma.videoProduct.findFirst({
                    where: {
                        video_id: parseInt(videoId),
                        product: {
                            shopify_product_id: String(item.productId)
                        }
                    }
                });

                if (videoProduct) {
                    await prisma.videoProduct.update({
                        where: {
                            id: videoProduct.id
                        },
                        data: {
                            position: item.position
                        }
                    });
                }
            }
            console.log(`✅ Reordered ${reorder.length} products`);
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "All changes saved successfully",
                summary: {
                    statusChanges: statusChanges?.length || 0,
                    removals: removals?.length || 0,
                    reorder: reorder?.length || 0
                }
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error("❌ Error in bulk update:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}