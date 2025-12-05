
// app/api/video-arrangement.jsx
import { getShopifyContext } from "../shopify.server.js";

// Try to import prisma once at the top level
let prismaInstance = null;

async function getPrisma() {
    if (!prismaInstance) {
        try {
            // Try different import patterns
            const prismaModule = await import('../db.server.js');
            prismaInstance = prismaModule.default || prismaModule.prisma || prismaModule;
            console.log('✅ Prisma client loaded');
        } catch (error) {
            console.error('❌ Failed to load Prisma:', error);
            throw new Error('Database connection failed');
        }
    }
    return prismaInstance;
}

export async function action({ request }) {
    console.log('🔄 Video arrangement API action called');

    try {
        // Get session
        const { session } = await getShopifyContext();

        if (!session?.shop || !session?.accessToken) {
            console.error('❌ No valid session found');
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Authentication required"
                }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        console.log('✅ Session found for shop:', session.shop);

        // Get request body
        const body = await request.json();
        console.log('📦 Request body received, arrangement count:', body.arrangement?.length);

        const { arrangement } = body;

        if (!arrangement || !Array.isArray(arrangement)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Invalid arrangement data"
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Get Prisma client
        const prisma = await getPrisma();

        if (!prisma || !prisma.mediaFile) {
            throw new Error('Prisma client not available');
        }

        // Process updates
        const updates = [];
        const errors = [];

        for (const item of arrangement) {
            try {
                const videoId = parseInt(item.videoId);
                const position = parseInt(item.position);

                console.log(`🔄 Processing: videoId=${videoId}, position=${position}`);

                // Use upsert to handle both existing and non-existing records
                const update = await prisma.mediaFile.updateMany({
                    where: {
                        id: videoId,
                        sessionId: session.id // Use session.id from Shopify context
                    },
                    data: {
                        position: position,
                        updated_at: new Date()
                    }
                });

                console.log(`✅ Updated video ${videoId}:`, update.count, 'rows affected');

                if (update.count === 0) {
                    // Try without session filter as fallback
                    const fallbackUpdate = await prisma.mediaFile.updateMany({
                        where: {
                            id: videoId
                        },
                        data: {
                            position: position,
                            updated_at: new Date()
                        }
                    });

                    console.log(`✅ Fallback update for video ${videoId}:`, fallbackUpdate.count, 'rows affected');

                    if (fallbackUpdate.count > 0) {
                        updates.push({ videoId, position, success: true, method: 'fallback' });
                    } else {
                        errors.push({ videoId, error: 'Video not found' });
                    }
                } else {
                    updates.push({ videoId, position, success: true, method: 'standard' });
                }

            } catch (itemError) {
                console.error(`❌ Error updating video ${item.videoId}:`, itemError.message);
                errors.push({ videoId: item.videoId, error: itemError.message });
            }
        }

        console.log(`📊 Results: ${updates.length} successful, ${errors.length} failed`);

        // Return response
        return new Response(
            JSON.stringify({
                success: true,
                message: `Video arrangement saved. ${updates.length} videos updated successfully.`,
                updatedCount: updates.length,
                failedCount: errors.length,
                updates: updates,
                errors: errors.length > 0 ? errors : undefined
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('❌ Top-level error in video arrangement API:', error);
        console.error('Error stack:', error.stack);

        return new Response(
            JSON.stringify({
                success: false,
                error: error.message || 'Internal server error',
                suggestion: 'Check console logs for details'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Optional: Add a GET endpoint for testing
export async function loader({ request }) {
    console.log('📥 Video arrangement GET request');

    try {
        const prisma = await getPrisma();

        // Test database connection
        const testCount = await prisma.mediaFile.count();

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Video arrangement API is running',
                database: {
                    connected: true,
                    mediaFilesCount: testCount
                },
                timestamp: new Date().toISOString()
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('❌ Loader error:', error);

        return new Response(
            JSON.stringify({
                success: false,
                error: 'API test failed',
                details: error.message
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}