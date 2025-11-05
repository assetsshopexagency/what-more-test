// // // // // // // // // // // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // // // // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // // // // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // // // // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // // // // // // // // // export async function loader({ request }) {
// // // // // // // // // // // // // // // // //   console.log("Loader function called");
// // // // // // // // // // // // // // // // //   const { session } = await authenticate.public.appProxy(request);
// // // // // // // // // // // // // // // // //   const videos = await prisma.mediaFile.findMany({
// // // // // // // // // // // // // // // // //     where: { sessionId: session.id },
// // // // // // // // // // // // // // // // //     select: { shopify_file_url: true, title: true, description: true },
// // // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // // //   return json({ success: true, videos });
// // // // // // // // // // // // // // // // // }



// // // // // // // // // // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // // // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // // // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // // // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // // // // // // // // export async function loader({ request }) {
// // // // // // // // // // // // // // // //   console.log("Loader function called");  // Keep this
// // // // // // // // // // // // // // // //   console.log("Request URL:", request.url);  // Add: Log full proxied URL for debugging

// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const { session } = await authenticate.public.appProxy(request);
// // // // // // // // // // // // // // // //     console.log("Session ID:", session?.id);  // Add: Confirm session loaded

// // // // // // // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // // // // // // //       console.error("No session found - app may not be installed");
// // // // // // // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // // // // // // // // // // //       where: { sessionId: session.id },
// // // // // // // // // // // // // // // //       select: { shopify_file_url: true, title: true, description: true },
// // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // //     console.log("Found videos:", videos.length);  // Add: Log count

// // // // // // // // // // // // // // // //     return json({ success: true, videos });
// // // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // // //     console.error("Loader error:", error);  // Add: Catch auth/DB errors
// // // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // // //   } finally {
// // // // // // // // // // // // // // // //     await prisma.$disconnect();  // Good practice
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // }








// // // // // // // // // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // // // // // // // export async function loader({ request }) {
// // // // // // // // // // // // // // //   console.log("🔄 Loader function called");
// // // // // // // // // // // // // // //   console.log("📝 Request URL:", request.url);

// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { session } = await authenticate.public.appProxy(request);
// // // // // // // // // // // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // // // // // // // // // // //     // Simple video fetch - just get the basic video data
// // // // // // // // // // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // // // // // // // // // //       where: { 
// // // // // // // // // // // // // // //         sessionId: session.id 
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       select: { 
// // // // // // // // // // // // // // //         id: true,
// // // // // // // // // // // // // // //         shopify_file_url: true, 
// // // // // // // // // // // // // // //         title: true, 
// // // // // // // // // // // // // // //         description: true,
// // // // // // // // // // // // // // //         duration: true,
// // // // // // // // // // // // // // //         download_count: true
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     console.log("✅ Found videos:", videos.length);
// // // // // // // // // // // // // // //     console.log("📹 Videos data:", videos);

// // // // // // // // // // // // // // //     // Format the response to match what frontend expects
// // // // // // // // // // // // // // //     const formattedVideos = videos.map(video => ({
// // // // // // // // // // // // // // //       id: video.id,
// // // // // // // // // // // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // // // // // // // // // // //       title: video.title,
// // // // // // // // // // // // // // //       description: video.description,
// // // // // // // // // // // // // // //       duration: video.duration || 0,
// // // // // // // // // // // // // // //       download_count: video.download_count || 0,
// // // // // // // // // // // // // // //       // Default engagement data (will be updated when user interacts)
// // // // // // // // // // // // // // //       user_has_liked: false,
// // // // // // // // // // // // // // //       user_has_shared: false,
// // // // // // // // // // // // // // //       user_has_saved: false,
// // // // // // // // // // // // // // //       like_count: 0,
// // // // // // // // // // // // // // //       share_count: 0,
// // // // // // // // // // // // // // //       save_count: 0,
// // // // // // // // // // // // // // //       comment_count: 0
// // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // //     return json({ 
// // // // // // // // // // // // // // //       success: true, 
// // // // // // // // // // // // // // //       videos: formattedVideos 
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error("❌ Loader error:", error);
// // // // // // // // // // // // // // //     return json({ 
// // // // // // // // // // // // // // //       success: false, 
// // // // // // // // // // // // // // //       error: error.message 
// // // // // // // // // // // // // // //     }, { status: 500 });
// // // // // // // // // // // // // // //   } finally {
// // // // // // // // // // // // // // //     await prisma.$disconnect();
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // export async function action({ request }) {
// // // // // // // // // // // // // // //   console.log("🔄 Action function called");
  
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     // Get current user info
// // // // // // // // // // // // // // //     let currentUser;
// // // // // // // // // // // // // // //     let userId = "anonymous"; // Default for public access
    
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // // // // // // // // // // //         session: session,
// // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // // // // // // // // // // //       console.log("👤 User ID:", userId);
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     const formData = await request.formData();
// // // // // // // // // // // // // // //     const actionType = formData.get('actionType');
// // // // // // // // // // // // // // //     const mediaFileId = parseInt(formData.get('mediaFileId'));
// // // // // // // // // // // // // // //     const comment = formData.get('comment');

// // // // // // // // // // // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // // // // // // // // // // //     switch (actionType) {
// // // // // // // // // // // // // // //       case 'like':
// // // // // // // // // // // // // // //         return await handleLike(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // // //       case 'unlike':
// // // // // // // // // // // // // // //         return await handleUnlike(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // // //       case 'save':
// // // // // // // // // // // // // // //         return await handleSave(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // // //       case 'unsave':
// // // // // // // // // // // // // // //         return await handleUnsave(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // // //       case 'share':
// // // // // // // // // // // // // // //         return await handleShare(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // // //       case 'comment':
// // // // // // // // // // // // // // //         if (!currentUser) {
// // // // // // // // // // // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //         return await handleComment(session.id, mediaFileId, userId, comment, currentUser);
      
// // // // // // // // // // // // // // //       case 'download':
// // // // // // // // // // // // // // //         return await handleDownload(mediaFileId);
      
// // // // // // // // // // // // // // //       case 'getComments':
// // // // // // // // // // // // // // //         return await getComments(mediaFileId);
      
// // // // // // // // // // // // // // //       case 'getSavedVideos':
// // // // // // // // // // // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // // // // // // // // // // //       default:
// // // // // // // // // // // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('❌ Action error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // Engagement handlers (same as before but with better error handling)
// // // // // // // // // // // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // // // // //           userId,
// // // // // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       update: {
// // // // // // // // // // // // // // //         liked: true
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       create: {
// // // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // // //         liked: true
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     return json({ success: true, liked: true });
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('Like error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // // //         mediaFileId
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       data: {
// // // // // // // // // // // // // // //         liked: false
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     return json({ success: true, liked: false });
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('Unlike error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // // // // //           userId,
// // // // // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       update: {
// // // // // // // // // // // // // // //         saved: true
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       create: {
// // // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // // //         saved: true
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     return json({ success: true, saved: true });
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('Save error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // // //         mediaFileId
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       data: {
// // // // // // // // // // // // // // //         saved: false
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     return json({ success: true, saved: false });
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('Unsave error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // // // // //           userId,
// // // // // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       update: {
// // // // // // // // // // // // // // //         shared: true
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       create: {
// // // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // // //         shared: true
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     return json({ success: true, shared: true });
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('Share error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const newComment = await prisma.videoComment.create({
// // // // // // // // // // // // // // //       data: {
// // // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // // //         userEmail: currentUser.email,
// // // // // // // // // // // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // // // // // // // // // // //         comment: comment
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     return json({ success: true, comment: newComment });
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('Comment error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // async function handleDownload(mediaFileId) {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     await prisma.mediaFile.update({
// // // // // // // // // // // // // // //       where: { id: mediaFileId },
// // // // // // // // // // // // // // //       data: {
// // // // // // // // // // // // // // //         download_count: {
// // // // // // // // // // // // // // //           increment: 1
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     return json({ success: true });
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('Download error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // async function getComments(mediaFileId) {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // // // // // // // // // // //       where: { mediaFileId },
// // // // // // // // // // // // // // //       orderBy: { created_at: 'desc' }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     return json({ success: true, comments });
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('Get comments error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // // //         saved: true
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       include: {
// // // // // // // // // // // // // // //         mediaFile: true
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //       orderBy: { updated_at: 'desc' }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // // // // // // // // // // //       id: engagement.mediaFile.id,
// // // // // // // // // // // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // // // // // // // // // // //       title: engagement.mediaFile.title,
// // // // // // // // // // // // // // //       description: engagement.mediaFile.description,
// // // // // // // // // // // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // //     console.error('Get saved videos error:', error);
// // // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }






// // // // // // // // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // // // // // // export async function loader({ request }) {
// // // // // // // // // // // // // //   console.log("🔄 Loader function called");
// // // // // // // // // // // // // //   console.log("📝 Request URL:", request.url);

// // // // // // // // // // // // // //   const url = new URL(request.url);
// // // // // // // // // // // // // //   const action = url.searchParams.get("action");
// // // // // // // // // // // // // //   const mediaFileId = url.searchParams.get("mediaFileId");

// // // // // // // // // // // // // //   // NEW: Handle product requests
// // // // // // // // // // // // // //   if (action === "getProducts" && mediaFileId) {
// // // // // // // // // // // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const videoProducts = await prisma.videoProduct.findMany({
// // // // // // // // // // // // // //         where: {
// // // // // // // // // // // // // //           video_id: parseInt(mediaFileId),
// // // // // // // // // // // // // //         },
// // // // // // // // // // // // // //         include: {
// // // // // // // // // // // // // //           product: true,
// // // // // // // // // // // // // //         },
// // // // // // // // // // // // // //       });

// // // // // // // // // // // // // //       const products = videoProducts.map(vp => vp.product);
// // // // // // // // // // // // // //       console.log("✅ Found products:", products.length);
      
// // // // // // // // // // // // // //       return json({
// // // // // // // // // // // // // //         success: true,
// // // // // // // // // // // // // //         products: products,
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error("❌ Products fetch error:", error);
// // // // // // // // // // // // // //       return json({ 
// // // // // // // // // // // // // //         success: false, 
// // // // // // // // // // // // // //         error: "Failed to load products" 
// // // // // // // // // // // // // //       }, { status: 500 });
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   // YOUR EXISTING VIDEO LOADING LOGIC - UNCHANGED
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const { session } = await authenticate.public.appProxy(request);
// // // // // // // // // // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // // // // // // // // // //     // Simple video fetch - just get the basic video data
// // // // // // // // // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // // // // // // // // //       where: { 
// // // // // // // // // // // // // //         sessionId: session.id 
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       select: { 
// // // // // // // // // // // // // //         id: true,
// // // // // // // // // // // // // //         shopify_file_url: true, 
// // // // // // // // // // // // // //         title: true, 
// // // // // // // // // // // // // //         description: true,
// // // // // // // // // // // // // //         duration: true,
// // // // // // // // // // // // // //         download_count: true
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     console.log("✅ Found videos:", videos.length);
// // // // // // // // // // // // // //     console.log("📹 Videos data:", videos);

// // // // // // // // // // // // // //     // Format the response to match what frontend expects
// // // // // // // // // // // // // //     const formattedVideos = videos.map(video => ({
// // // // // // // // // // // // // //       id: video.id,
// // // // // // // // // // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // // // // // // // // // //       title: video.title,
// // // // // // // // // // // // // //       description: video.description,
// // // // // // // // // // // // // //       duration: video.duration || 0,
// // // // // // // // // // // // // //       download_count: video.download_count || 0,
// // // // // // // // // // // // // //       // Default engagement data (will be updated when user interacts)
// // // // // // // // // // // // // //       user_has_liked: false,
// // // // // // // // // // // // // //       user_has_shared: false,
// // // // // // // // // // // // // //       user_has_saved: false,
// // // // // // // // // // // // // //       like_count: 0,
// // // // // // // // // // // // // //       share_count: 0,
// // // // // // // // // // // // // //       save_count: 0,
// // // // // // // // // // // // // //       comment_count: 0
// // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // //     return json({ 
// // // // // // // // // // // // // //       success: true, 
// // // // // // // // // // // // // //       videos: formattedVideos 
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error("❌ Loader error:", error);
// // // // // // // // // // // // // //     return json({ 
// // // // // // // // // // // // // //       success: false, 
// // // // // // // // // // // // // //       error: error.message 
// // // // // // // // // // // // // //     }, { status: 500 });
// // // // // // // // // // // // // //   } finally {
// // // // // // // // // // // // // //     await prisma.$disconnect();
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // KEEP ALL YOUR EXISTING ACTION CODE EXACTLY AS IS
// // // // // // // // // // // // // // export async function action({ request }) {
// // // // // // // // // // // // // //   console.log("🔄 Action function called");
  
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     // Get current user info
// // // // // // // // // // // // // //     let currentUser;
// // // // // // // // // // // // // //     let userId = "anonymous"; // Default for public access
    
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // // // // // // // // // //         session: session,
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // // // // // // // // // //       console.log("👤 User ID:", userId);
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     const formData = await request.formData();
// // // // // // // // // // // // // //     const actionType = formData.get('actionType');
// // // // // // // // // // // // // //     const mediaFileId = parseInt(formData.get('mediaFileId'));
// // // // // // // // // // // // // //     const comment = formData.get('comment');

// // // // // // // // // // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // // // // // // // // // //     switch (actionType) {
// // // // // // // // // // // // // //       case 'like':
// // // // // // // // // // // // // //         return await handleLike(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // //       case 'unlike':
// // // // // // // // // // // // // //         return await handleUnlike(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // //       case 'save':
// // // // // // // // // // // // // //         return await handleSave(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // //       case 'unsave':
// // // // // // // // // // // // // //         return await handleUnsave(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // //       case 'share':
// // // // // // // // // // // // // //         return await handleShare(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // // //       case 'comment':
// // // // // // // // // // // // // //         if (!currentUser) {
// // // // // // // // // // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //         return await handleComment(session.id, mediaFileId, userId, comment, currentUser);
      
// // // // // // // // // // // // // //       case 'download':
// // // // // // // // // // // // // //         return await handleDownload(mediaFileId);
      
// // // // // // // // // // // // // //       case 'getComments':
// // // // // // // // // // // // // //         return await getComments(mediaFileId);
      
// // // // // // // // // // // // // //       case 'getSavedVideos':
// // // // // // // // // // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // // // // // // // // // //       default:
// // // // // // // // // // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('❌ Action error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // ALL YOUR EXISTING HANDLER FUNCTIONS - COMPLETE AND UNCHANGED
// // // // // // // // // // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // // // //           userId,
// // // // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       update: {
// // // // // // // // // // // // // //         liked: true
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       create: {
// // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // //         liked: true
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return json({ success: true, liked: true });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('Like error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // //         mediaFileId
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       data: {
// // // // // // // // // // // // // //         liked: false
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return json({ success: true, liked: false });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('Unlike error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // // // //           userId,
// // // // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       update: {
// // // // // // // // // // // // // //         saved: true
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       create: {
// // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // //         saved: true
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return json({ success: true, saved: true });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('Save error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // //         mediaFileId
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       data: {
// // // // // // // // // // // // // //         saved: false
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return json({ success: true, saved: false });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('Unsave error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // // // //           userId,
// // // // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       update: {
// // // // // // // // // // // // // //         shared: true
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       create: {
// // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // //         shared: true
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return json({ success: true, shared: true });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('Share error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const newComment = await prisma.videoComment.create({
// // // // // // // // // // // // // //       data: {
// // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // //         userEmail: currentUser.email,
// // // // // // // // // // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // // // // // // // // // //         comment: comment
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return json({ success: true, comment: newComment });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('Comment error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // async function handleDownload(mediaFileId) {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     await prisma.mediaFile.update({
// // // // // // // // // // // // // //       where: { id: mediaFileId },
// // // // // // // // // // // // // //       data: {
// // // // // // // // // // // // // //         download_count: {
// // // // // // // // // // // // // //           increment: 1
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return json({ success: true });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('Download error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // async function getComments(mediaFileId) {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // // // // // // // // // //       where: { mediaFileId },
// // // // // // // // // // // // // //       orderBy: { created_at: 'desc' }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return json({ success: true, comments });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('Get comments error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // // // // // // // // // //       where: {
// // // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // // //         userId,
// // // // // // // // // // // // // //         saved: true
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       include: {
// // // // // // // // // // // // // //         mediaFile: true
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       orderBy: { updated_at: 'desc' }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // // // // // // // // // //       id: engagement.mediaFile.id,
// // // // // // // // // // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // // // // // // // // // //       title: engagement.mediaFile.title,
// // // // // // // // // // // // // //       description: engagement.mediaFile.description,
// // // // // // // // // // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     console.error('Get saved videos error:', error);
// // // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }










// // // // // // // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // // // // // // Price formatting function
// // // // // // // // // // // // // function formatPrice(price, currencyCode) {
// // // // // // // // // // // // //   // Convert price to number if it's a string
// // // // // // // // // // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // // // // // // // // // // //   // Format based on currency
// // // // // // // // // // // // //   const formatter = new Intl.NumberFormat('en-US', {
// // // // // // // // // // // // //     style: 'currency',
// // // // // // // // // // // // //     currency: currencyCode,
// // // // // // // // // // // // //     minimumFractionDigits: 2,
// // // // // // // // // // // // //     maximumFractionDigits: 2
// // // // // // // // // // // // //   });
  
// // // // // // // // // // // // //   return formatter.format(numericPrice).replace(currencyCode, '').trim();
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // Alternative simple formatting if Intl is not available
// // // // // // // // // // // // // function formatPriceSimple(price, currencyCode) {
// // // // // // // // // // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
// // // // // // // // // // // // //   return numericPrice.toFixed(2);
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // Updated function to get products with proper currency
// // // // // // // // // // // // // async function getProductsForMediaFile(mediaFileId, admin) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     // Get shop data to determine currency
// // // // // // // // // // // // //     let storeCurrency = 'USD'; // Default fallback
    
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const shopData = await admin.rest.resources.Shop.all({
// // // // // // // // // // // // //         session: admin.session,
// // // // // // // // // // // // //         fields: 'currency,primary_locale,money_format',
// // // // // // // // // // // // //       });
      
// // // // // // // // // // // // //       if (shopData && shopData.data && shopData.data.length > 0) {
// // // // // // // // // // // // //         storeCurrency = shopData.data[0].currency || 'USD';
// // // // // // // // // // // // //         console.log("💰 Store currency detected:", storeCurrency);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     } catch (shopError) {
// // // // // // // // // // // // //       console.log("⚠️ Could not fetch shop data, using default currency:", shopError.message);
// // // // // // // // // // // // //     }
    
// // // // // // // // // // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // // // // // // // // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // // // // // // // // // // //       where: {
// // // // // // // // // // // // //         video_id: parseInt(mediaFileId),
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       include: {
// // // // // // // // // // // // //         product: true,
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     const products = videoProducts.map(vp => vp.product);
// // // // // // // // // // // // //     console.log("✅ Found products:", products.length);
    
// // // // // // // // // // // // //     // Format products with proper currency
// // // // // // // // // // // // //     const formattedProducts = products.map(product => ({
// // // // // // // // // // // // //       id: product.id,
// // // // // // // // // // // // //       title: product.title,
// // // // // // // // // // // // //       variant_id: product.variant_id,
// // // // // // // // // // // // //       price: formatPrice(product.price || '0.00', storeCurrency),
// // // // // // // // // // // // //       currency_code: storeCurrency,
// // // // // // // // // // // // //       image_url: product.image_url,
// // // // // // // // // // // // //       // other product fields
// // // // // // // // // // // // //     }));
    
// // // // // // // // // // // // //     return formattedProducts;
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error("❌ Products fetch error:", error);
// // // // // // // // // // // // //     return [];
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // export async function loader({ request }) {
// // // // // // // // // // // // //   console.log("🔄 Loader function called");
// // // // // // // // // // // // //   console.log("📝 Request URL:", request.url);

// // // // // // // // // // // // //   const url = new URL(request.url);
// // // // // // // // // // // // //   const action = url.searchParams.get("action");
// // // // // // // // // // // // //   const mediaFileId = url.searchParams.get("mediaFileId");

// // // // // // // // // // // // //   // Handle product requests
// // // // // // // // // // // // //   if (action === "getProducts" && mediaFileId) {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // // // // // // // // //       if (!session?.id) {
// // // // // // // // // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // // // // // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       const products = await getProductsForMediaFile(mediaFileId, admin);
      
// // // // // // // // // // // // //       return json({
// // // // // // // // // // // // //         success: true,
// // // // // // // // // // // // //         products: products,
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("❌ Products fetch error:", error);
// // // // // // // // // // // // //       return json({ 
// // // // // // // // // // // // //         success: false, 
// // // // // // // // // // // // //         error: "Failed to load products" 
// // // // // // // // // // // // //       }, { status: 500 });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   // YOUR EXISTING VIDEO LOADING LOGIC - UPDATED WITH CURRENCY
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // // // // // // // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     // Get shop currency
// // // // // // // // // // // // //     let storeCurrency = 'USD';
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const shopData = await admin.rest.resources.Shop.all({
// // // // // // // // // // // // //         session: admin.session,
// // // // // // // // // // // // //         fields: 'currency,primary_locale,money_format',
// // // // // // // // // // // // //       });
      
// // // // // // // // // // // // //       if (shopData && shopData.data && shopData.data.length > 0) {
// // // // // // // // // // // // //         storeCurrency = shopData.data[0].currency || 'USD';
// // // // // // // // // // // // //         console.log("💰 Store currency:", storeCurrency);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     } catch (shopError) {
// // // // // // // // // // // // //       console.log("⚠️ Could not fetch shop data, using default currency:", shopError.message);
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // // // // // // // // //     // Simple video fetch - just get the basic video data
// // // // // // // // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // // // // // // // //       where: { 
// // // // // // // // // // // // //         sessionId: session.id 
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       select: { 
// // // // // // // // // // // // //         id: true,
// // // // // // // // // // // // //         shopify_file_url: true, 
// // // // // // // // // // // // //         title: true, 
// // // // // // // // // // // // //         description: true,
// // // // // // // // // // // // //         duration: true,
// // // // // // // // // // // // //         download_count: true
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     console.log("✅ Found videos:", videos.length);
// // // // // // // // // // // // //     console.log("📹 Videos data:", videos);

// // // // // // // // // // // // //     // Format the response to match what frontend expects
// // // // // // // // // // // // //     const formattedVideos = videos.map(video => ({
// // // // // // // // // // // // //       id: video.id,
// // // // // // // // // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // // // // // // // // //       title: video.title,
// // // // // // // // // // // // //       description: video.description,
// // // // // // // // // // // // //       duration: video.duration || 0,
// // // // // // // // // // // // //       download_count: video.download_count || 0,
// // // // // // // // // // // // //       // Default engagement data (will be updated when user interacts)
// // // // // // // // // // // // //       user_has_liked: false,
// // // // // // // // // // // // //       user_has_shared: false,
// // // // // // // // // // // // //       user_has_saved: false,
// // // // // // // // // // // // //       like_count: 0,
// // // // // // // // // // // // //       share_count: 0,
// // // // // // // // // // // // //       save_count: 0,
// // // // // // // // // // // // //       comment_count: 0,
// // // // // // // // // // // // //       // Include store currency for frontend
// // // // // // // // // // // // //       store_currency: storeCurrency
// // // // // // // // // // // // //     }));

// // // // // // // // // // // // //     return json({ 
// // // // // // // // // // // // //       success: true, 
// // // // // // // // // // // // //       videos: formattedVideos,
// // // // // // // // // // // // //       store_currency: storeCurrency
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error("❌ Loader error:", error);
// // // // // // // // // // // // //     return json({ 
// // // // // // // // // // // // //       success: false, 
// // // // // // // // // // // // //       error: error.message 
// // // // // // // // // // // // //     }, { status: 500 });
// // // // // // // // // // // // //   } finally {
// // // // // // // // // // // // //     await prisma.$disconnect();
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // KEEP ALL YOUR EXISTING ACTION CODE EXACTLY AS IS
// // // // // // // // // // // // // export async function action({ request }) {
// // // // // // // // // // // // //   console.log("🔄 Action function called");
  
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     // Get current user info
// // // // // // // // // // // // //     let currentUser;
// // // // // // // // // // // // //     let userId = "anonymous"; // Default for public access
    
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // // // // // // // // //         session: session,
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // // // // // // // // //       console.log("👤 User ID:", userId);
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const formData = await request.formData();
// // // // // // // // // // // // //     const actionType = formData.get('actionType');
// // // // // // // // // // // // //     const mediaFileId = parseInt(formData.get('mediaFileId'));
// // // // // // // // // // // // //     const comment = formData.get('comment');

// // // // // // // // // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // // // // // // // // //     switch (actionType) {
// // // // // // // // // // // // //       case 'like':
// // // // // // // // // // // // //         return await handleLike(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // //       case 'unlike':
// // // // // // // // // // // // //         return await handleUnlike(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // //       case 'save':
// // // // // // // // // // // // //         return await handleSave(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // //       case 'unsave':
// // // // // // // // // // // // //         return await handleUnsave(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // //       case 'share':
// // // // // // // // // // // // //         return await handleShare(session.id, mediaFileId, userId);
      
// // // // // // // // // // // // //       case 'comment':
// // // // // // // // // // // // //         if (!currentUser) {
// // // // // // // // // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //         return await handleComment(session.id, mediaFileId, userId, comment, currentUser);
      
// // // // // // // // // // // // //       case 'download':
// // // // // // // // // // // // //         return await handleDownload(mediaFileId);
      
// // // // // // // // // // // // //       case 'getComments':
// // // // // // // // // // // // //         return await getComments(mediaFileId);
      
// // // // // // // // // // // // //       case 'getSavedVideos':
// // // // // // // // // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // // // // // // // // //       default:
// // // // // // // // // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('❌ Action error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // ALL YOUR EXISTING HANDLER FUNCTIONS - COMPLETE AND UNCHANGED
// // // // // // // // // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // // //       where: {
// // // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // // //           userId,
// // // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       update: {
// // // // // // // // // // // // //         liked: true
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       create: {
// // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // //         userId,
// // // // // // // // // // // // //         liked: true
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return json({ success: true, liked: true });
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Like error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // // // //       where: {
// // // // // // // // // // // // //         userId,
// // // // // // // // // // // // //         mediaFileId
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       data: {
// // // // // // // // // // // // //         liked: false
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return json({ success: true, liked: false });
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Unlike error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // // //       where: {
// // // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // // //           userId,
// // // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       update: {
// // // // // // // // // // // // //         saved: true
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       create: {
// // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // //         userId,
// // // // // // // // // // // // //         saved: true
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return json({ success: true, saved: true });
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Save error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // // // //       where: {
// // // // // // // // // // // // //         userId,
// // // // // // // // // // // // //         mediaFileId
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       data: {
// // // // // // // // // // // // //         saved: false
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return json({ success: true, saved: false });
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Unsave error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // // //       where: {
// // // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // // //           userId,
// // // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       update: {
// // // // // // // // // // // // //         shared: true
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       create: {
// // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // //         userId,
// // // // // // // // // // // // //         shared: true
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return json({ success: true, shared: true });
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Share error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const newComment = await prisma.videoComment.create({
// // // // // // // // // // // // //       data: {
// // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // // //         userId,
// // // // // // // // // // // // //         userEmail: currentUser.email,
// // // // // // // // // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // // // // // // // // //         comment: comment
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return json({ success: true, comment: newComment });
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Comment error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // async function handleDownload(mediaFileId) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     await prisma.mediaFile.update({
// // // // // // // // // // // // //       where: { id: mediaFileId },
// // // // // // // // // // // // //       data: {
// // // // // // // // // // // // //         download_count: {
// // // // // // // // // // // // //           increment: 1
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return json({ success: true });
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Download error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // async function getComments(mediaFileId) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // // // // // // // // //       where: { mediaFileId },
// // // // // // // // // // // // //       orderBy: { created_at: 'desc' }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return json({ success: true, comments });
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Get comments error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // // // // // // // // //       where: {
// // // // // // // // // // // // //         sessionId,
// // // // // // // // // // // // //         userId,
// // // // // // // // // // // // //         saved: true
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       include: {
// // // // // // // // // // // // //         mediaFile: true
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       orderBy: { updated_at: 'desc' }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // // // // // // // // //       id: engagement.mediaFile.id,
// // // // // // // // // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // // // // // // // // //       title: engagement.mediaFile.title,
// // // // // // // // // // // // //       description: engagement.mediaFile.description,
// // // // // // // // // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // // // // // // // // //     }));

// // // // // // // // // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // //     console.error('Get saved videos error:', error);
// // // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }




// // // // // // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // // // // // Price formatting function
// // // // // // // // // // // // function formatPrice(price, currencyCode) {
// // // // // // // // // // // //   // Convert price to number if it's a string
// // // // // // // // // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // // // // // // // // // //   // For Pakistani Rupees (PKR) and other currencies, we'll handle formatting
// // // // // // // // // // // //   if (currencyCode === 'PKR') {
// // // // // // // // // // // //     // Format for Pakistani Rupees
// // // // // // // // // // // //     return new Intl.NumberFormat('en-PK', {
// // // // // // // // // // // //       minimumFractionDigits: 0,
// // // // // // // // // // // //       maximumFractionDigits: 0
// // // // // // // // // // // //     }).format(numericPrice);
// // // // // // // // // // // //   } else {
// // // // // // // // // // // //     // Format for other currencies
// // // // // // // // // // // //     const formatter = new Intl.NumberFormat('en-US', {
// // // // // // // // // // // //       style: 'currency',
// // // // // // // // // // // //       currency: currencyCode,
// // // // // // // // // // // //       minimumFractionDigits: 2,
// // // // // // // // // // // //       maximumFractionDigits: 2
// // // // // // // // // // // //     });
    
// // // // // // // // // // // //     // Remove currency symbol since we'll display it separately
// // // // // // // // // // // //     return formatter.format(numericPrice).replace(/[^\d.,]/g, '');
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // // Updated function to get products with proper currency
// // // // // // // // // // // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     // Get shop data to determine currency - FIXED APPROACH
// // // // // // // // // // // //     let storeCurrency = 'USD'; // Default fallback
    
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       console.log("🛍️ Fetching shop data for currency...");
      
// // // // // // // // // // // //       // Use the correct Shopify REST API approach
// // // // // // // // // // // //       const shop = await admin.rest.resources.Shop.all({
// // // // // // // // // // // //         session: session,
// // // // // // // // // // // //         fields: 'currency,primary_locale,money_format',
// // // // // // // // // // // //       });
      
// // // // // // // // // // // //       console.log("📊 Shop data response:", shop);
      
// // // // // // // // // // // //       if (shop && shop.data && shop.data.length > 0) {
// // // // // // // // // // // //         storeCurrency = shop.data[0].currency || 'USD';
// // // // // // // // // // // //         console.log("💰 Store currency detected:", storeCurrency);
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //         console.log("⚠️ No shop data found in response");
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } catch (shopError) {
// // // // // // // // // // // //       console.log("❌ Shop data fetch error:", shopError.message);
// // // // // // // // // // // //       console.log("🔄 Trying alternative method...");
      
// // // // // // // // // // // //       // Alternative approach using GraphQL
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         const shopQuery = `
// // // // // // // // // // // //           query {
// // // // // // // // // // // //             shop {
// // // // // // // // // // // //               currencyCode
// // // // // // // // // // // //             }
// // // // // // // // // // // //           }
// // // // // // // // // // // //         `;
        
// // // // // // // // // // // //         const graphqlResponse = await admin.graphql(shopQuery);
// // // // // // // // // // // //         const shopData = await graphqlResponse.json();
        
// // // // // // // // // // // //         if (shopData.data && shopData.data.shop) {
// // // // // // // // // // // //           storeCurrency = shopData.data.shop.currencyCode || 'USD';
// // // // // // // // // // // //           console.log("💰 GraphQL Store currency:", storeCurrency);
// // // // // // // // // // // //         }
// // // // // // // // // // // //       } catch (graphqlError) {
// // // // // // // // // // // //         console.log("❌ GraphQL also failed:", graphqlError.message);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // // // // // // // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // // // // // // // // // //       where: {
// // // // // // // // // // // //         video_id: parseInt(mediaFileId),
// // // // // // // // // // // //       },
// // // // // // // // // // // //       include: {
// // // // // // // // // // // //         product: true,
// // // // // // // // // // // //       },
// // // // // // // // // // // //     });

// // // // // // // // // // // //     const products = videoProducts.map(vp => vp.product);
// // // // // // // // // // // //     console.log("✅ Found products:", products.length);
    
// // // // // // // // // // // //     // Format products with proper currency
// // // // // // // // // // // //     const formattedProducts = products.map(product => {
// // // // // // // // // // // //       console.log("💰 Product raw price:", product.price, "Currency:", storeCurrency);
      
// // // // // // // // // // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
// // // // // // // // // // // //       console.log("💰 Formatted price:", formattedPrice);
      
// // // // // // // // // // // //       return {
// // // // // // // // // // // //         id: product.id,
// // // // // // // // // // // //         title: product.title,
// // // // // // // // // // // //         variant_id: product.variant_id,
// // // // // // // // // // // //         price: formattedPrice,
// // // // // // // // // // // //         currency_code: storeCurrency,
// // // // // // // // // // // //         image_url: product.image_url,
// // // // // // // // // // // //         raw_price: product.price // Keep original for debugging
// // // // // // // // // // // //       };
// // // // // // // // // // // //     });
    
// // // // // // // // // // // //     return formattedProducts;
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error("❌ Products fetch error:", error);
// // // // // // // // // // // //     return [];
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // export async function loader({ request }) {
// // // // // // // // // // // //   console.log("🔄 Loader function called");
// // // // // // // // // // // //   console.log("📝 Request URL:", request.url);

// // // // // // // // // // // //   const url = new URL(request.url);
// // // // // // // // // // // //   const action = url.searchParams.get("action");
// // // // // // // // // // // //   const mediaFileId = url.searchParams.get("mediaFileId");

// // // // // // // // // // // //   // Handle product requests
// // // // // // // // // // // //   if (action === "getProducts" && mediaFileId) {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // // // // // // // //       if (!session?.id) {
// // // // // // // // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // // // // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // //       }

// // // // // // // // // // // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // // // // // // // //       return json({
// // // // // // // // // // // //         success: true,
// // // // // // // // // // // //         products: products,
// // // // // // // // // // // //       });
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error("❌ Products fetch error:", error);
// // // // // // // // // // // //       return json({ 
// // // // // // // // // // // //         success: false, 
// // // // // // // // // // // //         error: "Failed to load products" 
// // // // // // // // // // // //       }, { status: 500 });
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }

// // // // // // // // // // // //   // VIDEO LOADING LOGIC WITH CURRENCY
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // // // // // // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // //     }

// // // // // // // // // // // //     // Get shop currency - FIXED
// // // // // // // // // // // //     let storeCurrency = 'USD';
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       console.log("🛍️ Fetching shop currency for videos...");
      
// // // // // // // // // // // //       const shop = await admin.rest.resources.Shop.all({
// // // // // // // // // // // //         session: session,
// // // // // // // // // // // //         fields: 'currency',
// // // // // // // // // // // //       });
      
// // // // // // // // // // // //       if (shop && shop.data && shop.data.length > 0) {
// // // // // // // // // // // //         storeCurrency = shop.data[0].currency || 'USD';
// // // // // // // // // // // //         console.log("💰 Main loader store currency:", storeCurrency);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } catch (shopError) {
// // // // // // // // // // // //       console.log("❌ Shop currency fetch error:", shopError.message);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // // // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // // // // // // //       where: { 
// // // // // // // // // // // //         sessionId: session.id 
// // // // // // // // // // // //       },
// // // // // // // // // // // //       select: { 
// // // // // // // // // // // //         id: true,
// // // // // // // // // // // //         shopify_file_url: true, 
// // // // // // // // // // // //         title: true, 
// // // // // // // // // // // //         description: true,
// // // // // // // // // // // //         duration: true,
// // // // // // // // // // // //         download_count: true
// // // // // // // // // // // //       },
// // // // // // // // // // // //     });

// // // // // // // // // // // //     console.log("✅ Found videos:", videos.length);

// // // // // // // // // // // //     // Format the response
// // // // // // // // // // // //     const formattedVideos = videos.map(video => ({
// // // // // // // // // // // //       id: video.id,
// // // // // // // // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // // // // // // // //       title: video.title,
// // // // // // // // // // // //       description: video.description,
// // // // // // // // // // // //       duration: video.duration || 0,
// // // // // // // // // // // //       download_count: video.download_count || 0,
// // // // // // // // // // // //       user_has_liked: false,
// // // // // // // // // // // //       user_has_shared: false,
// // // // // // // // // // // //       user_has_saved: false,
// // // // // // // // // // // //       like_count: 0,
// // // // // // // // // // // //       share_count: 0,
// // // // // // // // // // // //       save_count: 0,
// // // // // // // // // // // //       comment_count: 0,
// // // // // // // // // // // //       store_currency: storeCurrency
// // // // // // // // // // // //     }));

// // // // // // // // // // // //     return json({ 
// // // // // // // // // // // //       success: true, 
// // // // // // // // // // // //       videos: formattedVideos,
// // // // // // // // // // // //       store_currency: storeCurrency
// // // // // // // // // // // //     });

// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error("❌ Loader error:", error);
// // // // // // // // // // // //     return json({ 
// // // // // // // // // // // //       success: false, 
// // // // // // // // // // // //       error: error.message 
// // // // // // // // // // // //     }, { status: 500 });
// // // // // // // // // // // //   } finally {
// // // // // // // // // // // //     await prisma.$disconnect();
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // // ... KEEP ALL YOUR EXISTING ACTION CODE EXACTLY THE SAME ...
// // // // // // // // // // // // export async function action({ request }) {
// // // // // // // // // // // //   console.log("🔄 Action function called");
  
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // // //     }

// // // // // // // // // // // //     // Get current user info
// // // // // // // // // // // //     let currentUser;
// // // // // // // // // // // //     let userId = "anonymous";
    
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // // // // // // // //         session: session,
// // // // // // // // // // // //       });
// // // // // // // // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // // // // // // // //       console.log("👤 User ID:", userId);
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const formData = await request.formData();
// // // // // // // // // // // //     const actionType = formData.get('actionType');
// // // // // // // // // // // //     const mediaFileId = parseInt(formData.get('mediaFileId'));
// // // // // // // // // // // //     const comment = formData.get('comment');

// // // // // // // // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // // // // // // // //     switch (actionType) {
// // // // // // // // // // // //       case 'like':
// // // // // // // // // // // //         return await handleLike(session.id, mediaFileId, userId);
      
// // // // // // // // // // // //       case 'unlike':
// // // // // // // // // // // //         return await handleUnlike(session.id, mediaFileId, userId);
      
// // // // // // // // // // // //       case 'save':
// // // // // // // // // // // //         return await handleSave(session.id, mediaFileId, userId);
      
// // // // // // // // // // // //       case 'unsave':
// // // // // // // // // // // //         return await handleUnsave(session.id, mediaFileId, userId);
      
// // // // // // // // // // // //       case 'share':
// // // // // // // // // // // //         return await handleShare(session.id, mediaFileId, userId);
      
// // // // // // // // // // // //       case 'comment':
// // // // // // // // // // // //         if (!currentUser) {
// // // // // // // // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // // // // // // // //         }
// // // // // // // // // // // //         return await handleComment(session.id, mediaFileId, userId, comment, currentUser);
      
// // // // // // // // // // // //       case 'download':
// // // // // // // // // // // //         return await handleDownload(mediaFileId);
      
// // // // // // // // // // // //       case 'getComments':
// // // // // // // // // // // //         return await getComments(mediaFileId);
      
// // // // // // // // // // // //       case 'getSavedVideos':
// // // // // // // // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // // // // // // // //       default:
// // // // // // // // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // // // // // // // //     }
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('❌ Action error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // // ... KEEP ALL YOUR EXISTING HANDLER FUNCTIONS EXACTLY THE SAME ...
// // // // // // // // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // //       where: {
// // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // //           userId,
// // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // //         }
// // // // // // // // // // // //       },
// // // // // // // // // // // //       update: {
// // // // // // // // // // // //         liked: true
// // // // // // // // // // // //       },
// // // // // // // // // // // //       create: {
// // // // // // // // // // // //         sessionId,
// // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // //         userId,
// // // // // // // // // // // //         liked: true
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return json({ success: true, liked: true });
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('Like error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // // //       where: {
// // // // // // // // // // // //         userId,
// // // // // // // // // // // //         mediaFileId
// // // // // // // // // // // //       },
// // // // // // // // // // // //       data: {
// // // // // // // // // // // //         liked: false
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return json({ success: true, liked: false });
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('Unlike error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // //       where: {
// // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // //           userId,
// // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // //         }
// // // // // // // // // // // //       },
// // // // // // // // // // // //       update: {
// // // // // // // // // // // //         saved: true
// // // // // // // // // // // //       },
// // // // // // // // // // // //       create: {
// // // // // // // // // // // //         sessionId,
// // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // //         userId,
// // // // // // // // // // // //         saved: true
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return json({ success: true, saved: true });
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('Save error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // // //       where: {
// // // // // // // // // // // //         userId,
// // // // // // // // // // // //         mediaFileId
// // // // // // // // // // // //       },
// // // // // // // // // // // //       data: {
// // // // // // // // // // // //         saved: false
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return json({ success: true, saved: false });
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('Unsave error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // // //       where: {
// // // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // // //           userId,
// // // // // // // // // // // //           mediaFileId
// // // // // // // // // // // //         }
// // // // // // // // // // // //       },
// // // // // // // // // // // //       update: {
// // // // // // // // // // // //         shared: true
// // // // // // // // // // // //       },
// // // // // // // // // // // //       create: {
// // // // // // // // // // // //         sessionId,
// // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // //         userId,
// // // // // // // // // // // //         shared: true
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return json({ success: true, shared: true });
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('Share error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const newComment = await prisma.videoComment.create({
// // // // // // // // // // // //       data: {
// // // // // // // // // // // //         sessionId,
// // // // // // // // // // // //         mediaFileId,
// // // // // // // // // // // //         userId,
// // // // // // // // // // // //         userEmail: currentUser.email,
// // // // // // // // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // // // // // // // //         comment: comment
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return json({ success: true, comment: newComment });
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('Comment error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // async function handleDownload(mediaFileId) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     await prisma.mediaFile.update({
// // // // // // // // // // // //       where: { id: mediaFileId },
// // // // // // // // // // // //       data: {
// // // // // // // // // // // //         download_count: {
// // // // // // // // // // // //           increment: 1
// // // // // // // // // // // //         }
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return json({ success: true });
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('Download error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // async function getComments(mediaFileId) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // // // // // // // //       where: { mediaFileId },
// // // // // // // // // // // //       orderBy: { created_at: 'desc' }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return json({ success: true, comments });
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('Get comments error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // // // // // // // //       where: {
// // // // // // // // // // // //         sessionId,
// // // // // // // // // // // //         userId,
// // // // // // // // // // // //         saved: true
// // // // // // // // // // // //       },
// // // // // // // // // // // //       include: {
// // // // // // // // // // // //         mediaFile: true
// // // // // // // // // // // //       },
// // // // // // // // // // // //       orderBy: { updated_at: 'desc' }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // // // // // // // //       id: engagement.mediaFile.id,
// // // // // // // // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // // // // // // // //       title: engagement.mediaFile.title,
// // // // // // // // // // // //       description: engagement.mediaFile.description,
// // // // // // // // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // // // // // // // //     }));

// // // // // // // // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // //     console.error('Get saved videos error:', error);
// // // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // // //   }
// // // // // // // // // // // // }




// // // // // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // // // // Price formatting function
// // // // // // // // // // // function formatPrice(price, currencyCode) {
// // // // // // // // // // //   // Convert price to number if it's a string
// // // // // // // // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // // // // // // // // //   // For Pakistani Rupees (PKR) and other currencies, we'll handle formatting
// // // // // // // // // // //   if (currencyCode === 'PKR') {
// // // // // // // // // // //     // Format for Pakistani Rupees
// // // // // // // // // // //     return new Intl.NumberFormat('en-PK', {
// // // // // // // // // // //       minimumFractionDigits: 0,
// // // // // // // // // // //       maximumFractionDigits: 0
// // // // // // // // // // //     }).format(numericPrice);
// // // // // // // // // // //   } else {
// // // // // // // // // // //     // Format for other currencies
// // // // // // // // // // //     const formatter = new Intl.NumberFormat('en-US', {
// // // // // // // // // // //       style: 'currency',
// // // // // // // // // // //       currency: currencyCode,
// // // // // // // // // // //       minimumFractionDigits: 2,
// // // // // // // // // // //       maximumFractionDigits: 2
// // // // // // // // // // //     });
    
// // // // // // // // // // //     // Remove currency symbol since we'll display it separately
// // // // // // // // // // //     return formatter.format(numericPrice).replace(/[^\d.,]/g, '');
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // // ADD ONLY THIS FUNCTION - Variant ID Cleaner
// // // // // // // // // // // function cleanVariantId(variantId) {
// // // // // // // // // // //   if (!variantId) return null;
  
// // // // // // // // // // //   // Convert to string
// // // // // // // // // // //   const variantString = variantId.toString();
  
// // // // // // // // // // //   // If it's already a clean number, return it
// // // // // // // // // // //   if (/^\d+$/.test(variantString)) {
// // // // // // // // // // //     return variantString;
// // // // // // // // // // //   }
  
// // // // // // // // // // //   // Handle GraphQL ID format: gid://shopify/ProductVariant/44765432901873
// // // // // // // // // // //   if (variantString.includes('gid://shopify/ProductVariant/')) {
// // // // // // // // // // //     return variantString.replace('gid://shopify/ProductVariant/', '');
// // // // // // // // // // //   }
  
// // // // // // // // // // //   // Extract numeric ID from any string
// // // // // // // // // // //   const match = variantString.match(/\d+/);
// // // // // // // // // // //   if (match && match[0]) {
// // // // // // // // // // //     return match[0];
// // // // // // // // // // //   }
  
// // // // // // // // // // //   return variantId;
// // // // // // // // // // // }

// // // // // // // // // // // // Updated function to get products with proper currency
// // // // // // // // // // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     // Get shop data to determine currency - FIXED APPROACH
// // // // // // // // // // //     let storeCurrency = 'USD'; // Default fallback
    
// // // // // // // // // // //     try {
// // // // // // // // // // //       console.log("🛍️ Fetching shop data for currency...");
      
// // // // // // // // // // //       // Use the correct Shopify REST API approach
// // // // // // // // // // //       const shop = await admin.rest.resources.Shop.all({
// // // // // // // // // // //         session: session,
// // // // // // // // // // //         fields: 'currency,primary_locale,money_format',
// // // // // // // // // // //       });
      
// // // // // // // // // // //       console.log("📊 Shop data response:", shop);
      
// // // // // // // // // // //       if (shop && shop.data && shop.data.length > 0) {
// // // // // // // // // // //         storeCurrency = shop.data[0].currency || 'USD';
// // // // // // // // // // //         console.log("💰 Store currency detected:", storeCurrency);
// // // // // // // // // // //       } else {
// // // // // // // // // // //         console.log("⚠️ No shop data found in response");
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (shopError) {
// // // // // // // // // // //       console.log("❌ Shop data fetch error:", shopError.message);
// // // // // // // // // // //       console.log("🔄 Trying alternative method...");
      
// // // // // // // // // // //       // Alternative approach using GraphQL
// // // // // // // // // // //       try {
// // // // // // // // // // //         const shopQuery = `
// // // // // // // // // // //           query {
// // // // // // // // // // //             shop {
// // // // // // // // // // //               currencyCode
// // // // // // // // // // //             }
// // // // // // // // // // //           }
// // // // // // // // // // //         `;
        
// // // // // // // // // // //         const graphqlResponse = await admin.graphql(shopQuery);
// // // // // // // // // // //         const shopData = await graphqlResponse.json();
        
// // // // // // // // // // //         if (shopData.data && shopData.data.shop) {
// // // // // // // // // // //           storeCurrency = shopData.data.shop.currencyCode || 'USD';
// // // // // // // // // // //           console.log("💰 GraphQL Store currency:", storeCurrency);
// // // // // // // // // // //         }
// // // // // // // // // // //       } catch (graphqlError) {
// // // // // // // // // // //         console.log("❌ GraphQL also failed:", graphqlError.message);
// // // // // // // // // // //       }
// // // // // // // // // // //     }
    
// // // // // // // // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // // // // // // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // // // // // // // // //       where: {
// // // // // // // // // // //         video_id: parseInt(mediaFileId),
// // // // // // // // // // //       },
// // // // // // // // // // //       include: {
// // // // // // // // // // //         product: true,
// // // // // // // // // // //       },
// // // // // // // // // // //     });

// // // // // // // // // // //     const products = videoProducts.map(vp => vp.product);
// // // // // // // // // // //     console.log("✅ Found products:", products.length);
    
// // // // // // // // // // //     // Format products with proper currency - ONLY UPDATE THIS PART
// // // // // // // // // // //     const formattedProducts = products.map(product => {
// // // // // // // // // // //       console.log("💰 Product raw price:", product.price, "Currency:", storeCurrency);
      
// // // // // // // // // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // // // // // // // // // //       // ONLY ADD THIS LINE - Clean the variant ID
// // // // // // // // // // //       const cleanVariantIdValue = cleanVariantId(product.variant_id);
      
// // // // // // // // // // //       console.log("💰 Formatted price:", formattedPrice);
// // // // // // // // // // //       console.log("🆔 Cleaned variant ID:", cleanVariantIdValue);
      
// // // // // // // // // // //       return {
// // // // // // // // // // //         id: product.id,
// // // // // // // // // // //         title: product.title,
// // // // // // // // // // //         variant_id: cleanVariantIdValue, // USE CLEANED VARIANT ID
// // // // // // // // // // //         price: formattedPrice,
// // // // // // // // // // //         currency_code: storeCurrency,
// // // // // // // // // // //         image_url: product.image_url,
// // // // // // // // // // //         raw_price: product.price // Keep original for debugging
// // // // // // // // // // //       };
// // // // // // // // // // //     });
    
// // // // // // // // // // //     return formattedProducts;
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error("❌ Products fetch error:", error);
// // // // // // // // // // //     return [];
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // // KEEP EVERYTHING ELSE EXACTLY THE SAME AS YOUR ORIGINAL CODE
// // // // // // // // // // // export async function loader({ request }) {
// // // // // // // // // // //   console.log("🔄 Loader function called");
// // // // // // // // // // //   console.log("📝 Request URL:", request.url);

// // // // // // // // // // //   const url = new URL(request.url);
// // // // // // // // // // //   const action = url.searchParams.get("action");
// // // // // // // // // // //   const mediaFileId = url.searchParams.get("mediaFileId");

// // // // // // // // // // //   // Handle product requests
// // // // // // // // // // //   if (action === "getProducts" && mediaFileId) {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // // // // // // //       if (!session?.id) {
// // // // // // // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // // // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // //       }

// // // // // // // // // // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // // // // // // //       return json({
// // // // // // // // // // //         success: true,
// // // // // // // // // // //         products: products,
// // // // // // // // // // //       });
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("❌ Products fetch error:", error);
// // // // // // // // // // //       return json({ 
// // // // // // // // // // //         success: false, 
// // // // // // // // // // //         error: "Failed to load products" 
// // // // // // // // // // //       }, { status: 500 });
// // // // // // // // // // //     }
// // // // // // // // // // //   }

// // // // // // // // // // //   // VIDEO LOADING LOGIC WITH CURRENCY
// // // // // // // // // // //   try {
// // // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // // // // // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // //     }

// // // // // // // // // // //     // Get shop currency - FIXED
// // // // // // // // // // //     let storeCurrency = 'USD';
// // // // // // // // // // //     try {
// // // // // // // // // // //       console.log("🛍️ Fetching shop currency for videos...");
      
// // // // // // // // // // //       const shop = await admin.rest.resources.Shop.all({
// // // // // // // // // // //         session: session,
// // // // // // // // // // //         fields: 'currency',
// // // // // // // // // // //       });
      
// // // // // // // // // // //       if (shop && shop.data && shop.data.length > 0) {
// // // // // // // // // // //         storeCurrency = shop.data[0].currency || 'USD';
// // // // // // // // // // //         console.log("💰 Main loader store currency:", storeCurrency);
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (shopError) {
// // // // // // // // // // //       console.log("❌ Shop currency fetch error:", shopError.message);
// // // // // // // // // // //     }

// // // // // // // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // // // // // //       where: { 
// // // // // // // // // // //         sessionId: session.id 
// // // // // // // // // // //       },
// // // // // // // // // // //       select: { 
// // // // // // // // // // //         id: true,
// // // // // // // // // // //         shopify_file_url: true, 
// // // // // // // // // // //         title: true, 
// // // // // // // // // // //         description: true,
// // // // // // // // // // //         duration: true,
// // // // // // // // // // //         download_count: true
// // // // // // // // // // //       },
// // // // // // // // // // //     });

// // // // // // // // // // //     console.log("✅ Found videos:", videos.length);

// // // // // // // // // // //     // Format the response
// // // // // // // // // // //     const formattedVideos = videos.map(video => ({
// // // // // // // // // // //       id: video.id,
// // // // // // // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // // // // // // //       title: video.title,
// // // // // // // // // // //       description: video.description,
// // // // // // // // // // //       duration: video.duration || 0,
// // // // // // // // // // //       download_count: video.download_count || 0,
// // // // // // // // // // //       user_has_liked: false,
// // // // // // // // // // //       user_has_shared: false,
// // // // // // // // // // //       user_has_saved: false,
// // // // // // // // // // //       like_count: 0,
// // // // // // // // // // //       share_count: 0,
// // // // // // // // // // //       save_count: 0,
// // // // // // // // // // //       comment_count: 0,
// // // // // // // // // // //       store_currency: storeCurrency
// // // // // // // // // // //     }));

// // // // // // // // // // //     return json({ 
// // // // // // // // // // //       success: true, 
// // // // // // // // // // //       videos: formattedVideos,
// // // // // // // // // // //       store_currency: storeCurrency
// // // // // // // // // // //     });

// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error("❌ Loader error:", error);
// // // // // // // // // // //     return json({ 
// // // // // // // // // // //       success: false, 
// // // // // // // // // // //       error: error.message 
// // // // // // // // // // //     }, { status: 500 });
// // // // // // // // // // //   } finally {
// // // // // // // // // // //     await prisma.$disconnect();
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // // ... KEEP ALL YOUR EXISTING ACTION CODE EXACTLY THE SAME ...
// // // // // // // // // // // export async function action({ request }) {
// // // // // // // // // // //   console.log("🔄 Action function called");
  
// // // // // // // // // // //   try {
// // // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // // // // // // //     if (!session?.id) {
// // // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // // //     }

// // // // // // // // // // //     // Get current user info
// // // // // // // // // // //     let currentUser;
// // // // // // // // // // //     let userId = "anonymous";
    
// // // // // // // // // // //     try {
// // // // // // // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // // // // // // //         session: session,
// // // // // // // // // // //       });
// // // // // // // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // // // // // // //       console.log("👤 User ID:", userId);
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // // // // // // //     }

// // // // // // // // // // //     const formData = await request.formData();
// // // // // // // // // // //     const actionType = formData.get('actionType');
// // // // // // // // // // //     const mediaFileId = parseInt(formData.get('mediaFileId'));
// // // // // // // // // // //     const comment = formData.get('comment');

// // // // // // // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // // // // // // //     switch (actionType) {
// // // // // // // // // // //       case 'like':
// // // // // // // // // // //         return await handleLike(session.id, mediaFileId, userId);
      
// // // // // // // // // // //       case 'unlike':
// // // // // // // // // // //         return await handleUnlike(session.id, mediaFileId, userId);
      
// // // // // // // // // // //       case 'save':
// // // // // // // // // // //         return await handleSave(session.id, mediaFileId, userId);
      
// // // // // // // // // // //       case 'unsave':
// // // // // // // // // // //         return await handleUnsave(session.id, mediaFileId, userId);
      
// // // // // // // // // // //       case 'share':
// // // // // // // // // // //         return await handleShare(session.id, mediaFileId, userId);
      
// // // // // // // // // // //       case 'comment':
// // // // // // // // // // //         if (!currentUser) {
// // // // // // // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // // // // // // //         }
// // // // // // // // // // //         return await handleComment(session.id, mediaFileId, userId, comment, currentUser);
      
// // // // // // // // // // //       case 'download':
// // // // // // // // // // //         return await handleDownload(mediaFileId);
      
// // // // // // // // // // //       case 'getComments':
// // // // // // // // // // //         return await getComments(mediaFileId);
      
// // // // // // // // // // //       case 'getSavedVideos':
// // // // // // // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // // // // // // //       default:
// // // // // // // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // // // // // // //     }
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('❌ Action error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // // ... KEEP ALL YOUR EXISTING HANDLER FUNCTIONS EXACTLY THE SAME ...
// // // // // // // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // //       where: {
// // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // //           userId,
// // // // // // // // // // //           mediaFileId
// // // // // // // // // // //         }
// // // // // // // // // // //       },
// // // // // // // // // // //       update: {
// // // // // // // // // // //         liked: true
// // // // // // // // // // //       },
// // // // // // // // // // //       create: {
// // // // // // // // // // //         sessionId,
// // // // // // // // // // //         mediaFileId,
// // // // // // // // // // //         userId,
// // // // // // // // // // //         liked: true
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     return json({ success: true, liked: true });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Like error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // //       where: {
// // // // // // // // // // //         userId,
// // // // // // // // // // //         mediaFileId
// // // // // // // // // // //       },
// // // // // // // // // // //       data: {
// // // // // // // // // // //         liked: false
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     return json({ success: true, liked: false });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Unlike error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // //       where: {
// // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // //           userId,
// // // // // // // // // // //           mediaFileId
// // // // // // // // // // //         }
// // // // // // // // // // //       },
// // // // // // // // // // //       update: {
// // // // // // // // // // //         saved: true
// // // // // // // // // // //       },
// // // // // // // // // // //       create: {
// // // // // // // // // // //         sessionId,
// // // // // // // // // // //         mediaFileId,
// // // // // // // // // // //         userId,
// // // // // // // // // // //         saved: true
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     return json({ success: true, saved: true });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Save error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // // //       where: {
// // // // // // // // // // //         userId,
// // // // // // // // // // //         mediaFileId
// // // // // // // // // // //       },
// // // // // // // // // // //       data: {
// // // // // // // // // // //         saved: false
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     return json({ success: true, saved: false });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Unsave error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // // //       where: {
// // // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // // //           userId,
// // // // // // // // // // //           mediaFileId
// // // // // // // // // // //         }
// // // // // // // // // // //       },
// // // // // // // // // // //       update: {
// // // // // // // // // // //         shared: true
// // // // // // // // // // //       },
// // // // // // // // // // //       create: {
// // // // // // // // // // //         sessionId,
// // // // // // // // // // //         mediaFileId,
// // // // // // // // // // //         userId,
// // // // // // // // // // //         shared: true
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     return json({ success: true, shared: true });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Share error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const newComment = await prisma.videoComment.create({
// // // // // // // // // // //       data: {
// // // // // // // // // // //         sessionId,
// // // // // // // // // // //         mediaFileId,
// // // // // // // // // // //         userId,
// // // // // // // // // // //         userEmail: currentUser.email,
// // // // // // // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // // // // // // //         comment: comment
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     return json({ success: true, comment: newComment });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Comment error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // async function handleDownload(mediaFileId) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     await prisma.mediaFile.update({
// // // // // // // // // // //       where: { id: mediaFileId },
// // // // // // // // // // //       data: {
// // // // // // // // // // //         download_count: {
// // // // // // // // // // //           increment: 1
// // // // // // // // // // //         }
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     return json({ success: true });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Download error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // async function getComments(mediaFileId) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // // // // // // //       where: { mediaFileId },
// // // // // // // // // // //       orderBy: { created_at: 'desc' }
// // // // // // // // // // //     });

// // // // // // // // // // //     return json({ success: true, comments });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Get comments error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // // // // // // //       where: {
// // // // // // // // // // //         sessionId,
// // // // // // // // // // //         userId,
// // // // // // // // // // //         saved: true
// // // // // // // // // // //       },
// // // // // // // // // // //       include: {
// // // // // // // // // // //         mediaFile: true
// // // // // // // // // // //       },
// // // // // // // // // // //       orderBy: { updated_at: 'desc' }
// // // // // // // // // // //     });

// // // // // // // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // // // // // // //       id: engagement.mediaFile.id,
// // // // // // // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // // // // // // //       title: engagement.mediaFile.title,
// // // // // // // // // // //       description: engagement.mediaFile.description,
// // // // // // // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // // // // // // //     }));

// // // // // // // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     console.error('Get saved videos error:', error);
// // // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // // //   }
// // // // // // // // // // // }










// // // // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // // // Price formatting function
// // // // // // // // // // function formatPrice(price, currencyCode) {
// // // // // // // // // //   if (!price) return '0.00';
  
// // // // // // // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // // // // // // // //   if (isNaN(numericPrice)) return '0.00';
  
// // // // // // // // // //   if (currencyCode === 'PKR') {
// // // // // // // // // //     return new Intl.NumberFormat('en-PK', {
// // // // // // // // // //       minimumFractionDigits: 0,
// // // // // // // // // //       maximumFractionDigits: 0
// // // // // // // // // //     }).format(numericPrice);
// // // // // // // // // //   } else {
// // // // // // // // // //     return new Intl.NumberFormat('en-US', {
// // // // // // // // // //       minimumFractionDigits: 2,
// // // // // // // // // //       maximumFractionDigits: 2
// // // // // // // // // //     }).format(numericPrice);
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // Function to get shop currency
// // // // // // // // // // async function getShopCurrency(admin, session) {
// // // // // // // // // //   let storeCurrency = 'USD';
  
// // // // // // // // // //   try {
// // // // // // // // // //     const shop = await admin.rest.resources.Shop.all({
// // // // // // // // // //       session: session,
// // // // // // // // // //       fields: 'currency',
// // // // // // // // // //     });
    
// // // // // // // // // //     if (shop && shop.data && shop.data.length > 0) {
// // // // // // // // // //       storeCurrency = shop.data[0].currency || 'USD';
// // // // // // // // // //       console.log("💰 Store currency:", storeCurrency);
// // // // // // // // // //     }
// // // // // // // // // //   } catch (shopError) {
// // // // // // // // // //     console.log("❌ Shop currency fetch error:", shopError.message);
// // // // // // // // // //   }
  
// // // // // // // // // //   return storeCurrency;
// // // // // // // // // // }

// // // // // // // // // // // Function to get products with variant IDs
// // // // // // // // // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // // // // // // // // //   try {
// // // // // // // // // //     // Get shop currency
// // // // // // // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // // // // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // // // // // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // // // // // // // //       where: {
// // // // // // // // // //         video_id: parseInt(mediaFileId),
// // // // // // // // // //       },
// // // // // // // // // //       include: {
// // // // // // // // // //         product: true,
// // // // // // // // // //       },
// // // // // // // // // //     });

// // // // // // // // // //     const products = videoProducts.map(vp => vp.product);
// // // // // // // // // //     console.log("✅ Found products:", products.length);
    
// // // // // // // // // //     // Format products with variant IDs
// // // // // // // // // //     const formattedProducts = products.map(product => {
// // // // // // // // // //       console.log("🔍 Product data:", {
// // // // // // // // // //         id: product.id,
// // // // // // // // // //         title: product.title,
// // // // // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // // // // //         shopify_variant_id: product.shopify_variant_id,
// // // // // // // // // //         price: product.price
// // // // // // // // // //       });
      
// // // // // // // // // //       // Use the variant_id from your database (now that you've added shopify_variant_id)
// // // // // // // // // //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// // // // // // // // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // // // // // // // // //       console.log("💰 Formatted price:", formattedPrice);
// // // // // // // // // //       console.log("🆔 Variant ID to use:", variantId);
      
// // // // // // // // // //       return {
// // // // // // // // // //         id: product.id,
// // // // // // // // // //         title: product.title,
// // // // // // // // // //         variant_id: variantId,
// // // // // // // // // //         price: formattedPrice,
// // // // // // // // // //         currency_code: storeCurrency,
// // // // // // // // // //         image_url: product.image_url,
// // // // // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // // // // //         shopify_variant_id: product.shopify_variant_id
// // // // // // // // // //       };
// // // // // // // // // //     });
    
// // // // // // // // // //     return formattedProducts;
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error("❌ Products fetch error:", error);
// // // // // // // // // //     return [];
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // export async function loader({ request }) {
// // // // // // // // // //   console.log("🔄 Loader function called");
// // // // // // // // // //   console.log("📝 Request URL:", request.url);

// // // // // // // // // //   const url = new URL(request.url);
// // // // // // // // // //   const action = url.searchParams.get("action");
// // // // // // // // // //   const mediaFileId = url.searchParams.get("mediaFileId");
// // // // // // // // // //   const shopParam = url.searchParams.get("shop");

// // // // // // // // // //   console.log("🔍 Query parameters:", { action, mediaFileId, shopParam });

// // // // // // // // // //   // Handle product requests
// // // // // // // // // //   if (action === "getProducts" && mediaFileId) {
// // // // // // // // // //     try {
// // // // // // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // // // // // //       if (!session?.id) {
// // // // // // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // //       }

// // // // // // // // // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // // // // // //       console.log("📦 Final products being returned:");
// // // // // // // // // //       products.forEach((product, index) => {
// // // // // // // // // //         console.log(`  Product ${index + 1}:`, {
// // // // // // // // // //           title: product.title,
// // // // // // // // // //           variant_id: product.variant_id,
// // // // // // // // // //           price: product.price,
// // // // // // // // // //           currency: product.currency_code
// // // // // // // // // //         });
// // // // // // // // // //       });
      
// // // // // // // // // //       return json({
// // // // // // // // // //         success: true,
// // // // // // // // // //         products: products,
// // // // // // // // // //       });
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("❌ Products fetch error:", error);
// // // // // // // // // //       return json({ 
// // // // // // // // // //         success: false, 
// // // // // // // // // //         error: "Failed to load products" 
// // // // // // // // // //       }, { status: 500 });
// // // // // // // // // //     }
// // // // // // // // // //   }

// // // // // // // // // //   // VIDEO LOADING LOGIC
// // // // // // // // // //   try {
// // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // // // // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // // // // // //     if (!session?.id) {
// // // // // // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // //     }

// // // // // // // // // //     // Get shop currency
// // // // // // // // // //     const storeCurrency = await getShopCurrency(admin, session);

// // // // // // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // // // // //       where: { 
// // // // // // // // // //         sessionId: session.id 
// // // // // // // // // //       },
// // // // // // // // // //       select: { 
// // // // // // // // // //         id: true,
// // // // // // // // // //         shopify_file_url: true, 
// // // // // // // // // //         title: true, 
// // // // // // // // // //         description: true,
// // // // // // // // // //         duration: true,
// // // // // // // // // //         download_count: true
// // // // // // // // // //       },
// // // // // // // // // //     });

// // // // // // // // // //     console.log("✅ Found videos:", videos.length);

// // // // // // // // // //     // Format the response
// // // // // // // // // //     const formattedVideos = videos.map(video => ({
// // // // // // // // // //       id: video.id,
// // // // // // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // // // // // //       title: video.title,
// // // // // // // // // //       description: video.description,
// // // // // // // // // //       duration: video.duration || 0,
// // // // // // // // // //       download_count: video.download_count || 0,
// // // // // // // // // //       user_has_liked: false,
// // // // // // // // // //       user_has_shared: false,
// // // // // // // // // //       user_has_saved: false,
// // // // // // // // // //       like_count: 0,
// // // // // // // // // //       share_count: 0,
// // // // // // // // // //       save_count: 0,
// // // // // // // // // //       comment_count: 0,
// // // // // // // // // //       store_currency: storeCurrency
// // // // // // // // // //     }));

// // // // // // // // // //     return json({ 
// // // // // // // // // //       success: true, 
// // // // // // // // // //       videos: formattedVideos,
// // // // // // // // // //       store_currency: storeCurrency
// // // // // // // // // //     });

// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error("❌ Loader error:", error);
// // // // // // // // // //     return json({ 
// // // // // // // // // //       success: false, 
// // // // // // // // // //       error: error.message 
// // // // // // // // // //     }, { status: 500 });
// // // // // // // // // //   } finally {
// // // // // // // // // //     await prisma.$disconnect();
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // ACTION HANDLER
// // // // // // // // // // export async function action({ request }) {
// // // // // // // // // //   console.log("🔄 Action function called");
  
// // // // // // // // // //   try {
// // // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // // // // // //     if (!session?.id) {
// // // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // // //     }

// // // // // // // // // //     // Get current user info
// // // // // // // // // //     let currentUser;
// // // // // // // // // //     let userId = "anonymous";
    
// // // // // // // // // //     try {
// // // // // // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // // // // // //         session: session,
// // // // // // // // // //       });
// // // // // // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // // // // // //       console.log("👤 User ID:", userId);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // // // // // //     }

// // // // // // // // // //     const formData = await request.formData();
// // // // // // // // // //     const actionType = formData.get('actionType');
// // // // // // // // // //     const mediaFileId = formData.get('mediaFileId');
// // // // // // // // // //     const comment = formData.get('comment');

// // // // // // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // // // // // //     // Validate mediaFileId
// // // // // // // // // //     if (!mediaFileId || isNaN(parseInt(mediaFileId))) {
// // // // // // // // // //       return json({ success: false, error: 'Invalid media file ID' }, { status: 400 });
// // // // // // // // // //     }

// // // // // // // // // //     const parsedMediaFileId = parseInt(mediaFileId);

// // // // // // // // // //     switch (actionType) {
// // // // // // // // // //       case 'like':
// // // // // // // // // //         return await handleLike(session.id, parsedMediaFileId, userId);
      
// // // // // // // // // //       case 'unlike':
// // // // // // // // // //         return await handleUnlike(session.id, parsedMediaFileId, userId);
      
// // // // // // // // // //       case 'save':
// // // // // // // // // //         return await handleSave(session.id, parsedMediaFileId, userId);
      
// // // // // // // // // //       case 'unsave':
// // // // // // // // // //         return await handleUnsave(session.id, parsedMediaFileId, userId);
      
// // // // // // // // // //       case 'share':
// // // // // // // // // //         return await handleShare(session.id, parsedMediaFileId, userId);
      
// // // // // // // // // //       case 'comment':
// // // // // // // // // //         if (!currentUser) {
// // // // // // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // // // // // //         }
// // // // // // // // // //         if (!comment || comment.trim().length === 0) {
// // // // // // // // // //           return json({ success: false, error: "Comment cannot be empty" }, { status: 400 });
// // // // // // // // // //         }
// // // // // // // // // //         return await handleComment(session.id, parsedMediaFileId, userId, comment, currentUser);
      
// // // // // // // // // //       case 'download':
// // // // // // // // // //         return await handleDownload(parsedMediaFileId);
      
// // // // // // // // // //       case 'getComments':
// // // // // // // // // //         return await getComments(parsedMediaFileId);
      
// // // // // // // // // //       case 'getSavedVideos':
// // // // // // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // // // // // //       default:
// // // // // // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // // // // // //     }
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('❌ Action error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // HANDLER FUNCTIONS
// // // // // // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // // // // // //   try {
// // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // //       where: {
// // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // //           userId,
// // // // // // // // // //           mediaFileId
// // // // // // // // // //         }
// // // // // // // // // //       },
// // // // // // // // // //       update: {
// // // // // // // // // //         liked: true
// // // // // // // // // //       },
// // // // // // // // // //       create: {
// // // // // // // // // //         sessionId,
// // // // // // // // // //         mediaFileId,
// // // // // // // // // //         userId,
// // // // // // // // // //         liked: true
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     return json({ success: true, liked: true });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Like error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // // // // // //   try {
// // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // //       where: {
// // // // // // // // // //         userId,
// // // // // // // // // //         mediaFileId
// // // // // // // // // //       },
// // // // // // // // // //       data: {
// // // // // // // // // //         liked: false
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     return json({ success: true, liked: false });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Unlike error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // // // // // //   try {
// // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // //       where: {
// // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // //           userId,
// // // // // // // // // //           mediaFileId
// // // // // // // // // //         }
// // // // // // // // // //       },
// // // // // // // // // //       update: {
// // // // // // // // // //         saved: true
// // // // // // // // // //       },
// // // // // // // // // //       create: {
// // // // // // // // // //         sessionId,
// // // // // // // // // //         mediaFileId,
// // // // // // // // // //         userId,
// // // // // // // // // //         saved: true
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     return json({ success: true, saved: true });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Save error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // // // // // //   try {
// // // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // // //       where: {
// // // // // // // // // //         userId,
// // // // // // // // // //         mediaFileId
// // // // // // // // // //       },
// // // // // // // // // //       data: {
// // // // // // // // // //         saved: false
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     return json({ success: true, saved: false });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Unsave error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // // // // // //   try {
// // // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // // //       where: {
// // // // // // // // // //         userId_mediaFileId: {
// // // // // // // // // //           userId,
// // // // // // // // // //           mediaFileId
// // // // // // // // // //         }
// // // // // // // // // //       },
// // // // // // // // // //       update: {
// // // // // // // // // //         shared: true
// // // // // // // // // //       },
// // // // // // // // // //       create: {
// // // // // // // // // //         sessionId,
// // // // // // // // // //         mediaFileId,
// // // // // // // // // //         userId,
// // // // // // // // // //         shared: true
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     return json({ success: true, shared: true });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Share error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // // // // // //   try {
// // // // // // // // // //     const newComment = await prisma.videoComment.create({
// // // // // // // // // //       data: {
// // // // // // // // // //         sessionId,
// // // // // // // // // //         mediaFileId,
// // // // // // // // // //         userId,
// // // // // // // // // //         userEmail: currentUser.email,
// // // // // // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // // // // // //         comment: comment
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     return json({ success: true, comment: newComment });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Comment error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // async function handleDownload(mediaFileId) {
// // // // // // // // // //   try {
// // // // // // // // // //     await prisma.mediaFile.update({
// // // // // // // // // //       where: { id: mediaFileId },
// // // // // // // // // //       data: {
// // // // // // // // // //         download_count: {
// // // // // // // // // //           increment: 1
// // // // // // // // // //         }
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     return json({ success: true });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Download error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // async function getComments(mediaFileId) {
// // // // // // // // // //   try {
// // // // // // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // // // // // //       where: { mediaFileId },
// // // // // // // // // //       orderBy: { created_at: 'desc' }
// // // // // // // // // //     });

// // // // // // // // // //     return json({ success: true, comments });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Get comments error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // // // // // //   try {
// // // // // // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // // // // // //       where: {
// // // // // // // // // //         sessionId,
// // // // // // // // // //         userId,
// // // // // // // // // //         saved: true
// // // // // // // // // //       },
// // // // // // // // // //       include: {
// // // // // // // // // //         mediaFile: true
// // // // // // // // // //       },
// // // // // // // // // //       orderBy: { updated_at: 'desc' }
// // // // // // // // // //     });

// // // // // // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // // // // // //       id: engagement.mediaFile.id,
// // // // // // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // // // // // //       title: engagement.mediaFile.title,
// // // // // // // // // //       description: engagement.mediaFile.description,
// // // // // // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // // // // // //     }));

// // // // // // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error('Get saved videos error:', error);
// // // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // // //   }
// // // // // // // // // // }





// // // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // // Price formatting function
// // // // // // // // // function formatPrice(price, currencyCode) {
// // // // // // // // //   if (!price) return '0.00';
  
// // // // // // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // // // // // // //   if (isNaN(numericPrice)) return '0.00';
  
// // // // // // // // //   if (currencyCode === 'PKR') {
// // // // // // // // //     return new Intl.NumberFormat('en-PK', {
// // // // // // // // //       minimumFractionDigits: 0,
// // // // // // // // //       maximumFractionDigits: 0
// // // // // // // // //     }).format(numericPrice);
// // // // // // // // //   } else {
// // // // // // // // //     return new Intl.NumberFormat('en-US', {
// // // // // // // // //       minimumFractionDigits: 2,
// // // // // // // // //       maximumFractionDigits: 2
// // // // // // // // //     }).format(numericPrice);
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // Function to get shop currency
// // // // // // // // // async function getShopCurrency(admin, session) {
// // // // // // // // //   let storeCurrency = 'USD';
  
// // // // // // // // //   try {
// // // // // // // // //     const shop = await admin.rest.resources.Shop.all({
// // // // // // // // //       session: session,
// // // // // // // // //       fields: 'currency',
// // // // // // // // //     });
    
// // // // // // // // //     if (shop && shop.data && shop.data.length > 0) {
// // // // // // // // //       storeCurrency = shop.data[0].currency || 'USD';
// // // // // // // // //       console.log("💰 Store currency:", storeCurrency);
// // // // // // // // //     }
// // // // // // // // //   } catch (shopError) {
// // // // // // // // //     console.log("❌ Shop currency fetch error:", shopError.message);
// // // // // // // // //   }
  
// // // // // // // // //   return storeCurrency;
// // // // // // // // // }

// // // // // // // // // // Function to get products with variant IDs
// // // // // // // // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // // // // // // // //   try {
// // // // // // // // //     // Get shop currency
// // // // // // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // // // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // // // // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // // // // // // //       where: {
// // // // // // // // //         video_id: parseInt(mediaFileId),
// // // // // // // // //       },
// // // // // // // // //       include: {
// // // // // // // // //         product: true,
// // // // // // // // //       },
// // // // // // // // //     });

// // // // // // // // //     const products = videoProducts.map(vp => vp.product);
// // // // // // // // //     console.log("✅ Found products:", products.length);
    
// // // // // // // // //     // Format products with variant IDs
// // // // // // // // //     const formattedProducts = products.map(product => {
// // // // // // // // //       console.log("🔍 Product data:", {
// // // // // // // // //         id: product.id,
// // // // // // // // //         title: product.title,
// // // // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // // // //         shopify_variant_id: product.shopify_variant_id,
// // // // // // // // //         price: product.price
// // // // // // // // //       });
      
// // // // // // // // //       // Use the variant_id from your database (now that you've added shopify_variant_id)
// // // // // // // // //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// // // // // // // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // // // // // // // //       console.log("💰 Formatted price:", formattedPrice);
// // // // // // // // //       console.log("🆔 Variant ID to use:", variantId);
      
// // // // // // // // //       return {
// // // // // // // // //         id: product.id,
// // // // // // // // //         title: product.title,
// // // // // // // // //         variant_id: variantId,
// // // // // // // // //         price: formattedPrice,
// // // // // // // // //         currency_code: storeCurrency,
// // // // // // // // //         image_url: product.image_url,
// // // // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // // // //         shopify_variant_id: product.shopify_variant_id
// // // // // // // // //       };
// // // // // // // // //     });
    
// // // // // // // // //     return formattedProducts;
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("❌ Products fetch error:", error);
// // // // // // // // //     return [];
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // export async function loader({ request }) {
// // // // // // // // //   console.log("🔄 Loader function called");
// // // // // // // // //   console.log("📝 Request URL:", request.url);

// // // // // // // // //   const url = new URL(request.url);
// // // // // // // // //   const action = url.searchParams.get("action");
// // // // // // // // //   const mediaFileId = url.searchParams.get("mediaFileId");
// // // // // // // // //   const shopParam = url.searchParams.get("shop");

// // // // // // // // //   console.log("🔍 Query parameters:", { action, mediaFileId, shopParam });

// // // // // // // // //   // Handle product requests
// // // // // // // // //   if (action === "getProducts" && mediaFileId) {
// // // // // // // // //     try {
// // // // // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // // // // //       if (!session?.id) {
// // // // // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // //       }

// // // // // // // // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // // // // //       console.log("📦 Final products being returned:");
// // // // // // // // //       products.forEach((product, index) => {
// // // // // // // // //         console.log(`  Product ${index + 1}:`, {
// // // // // // // // //           title: product.title,
// // // // // // // // //           variant_id: product.variant_id,
// // // // // // // // //           price: product.price,
// // // // // // // // //           currency: product.currency_code
// // // // // // // // //         });
// // // // // // // // //       });
      
// // // // // // // // //       return json({
// // // // // // // // //         success: true,
// // // // // // // // //         products: products,
// // // // // // // // //       });
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("❌ Products fetch error:", error);
// // // // // // // // //       return json({ 
// // // // // // // // //         success: false, 
// // // // // // // // //         error: "Failed to load products" 
// // // // // // // // //       }, { status: 500 });
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   // VIDEO LOADING LOGIC
// // // // // // // // //   try {
// // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // // // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // // // // //     if (!session?.id) {
// // // // // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // //     }

// // // // // // // // //     // Get shop currency
// // // // // // // // //     const storeCurrency = await getShopCurrency(admin, session);

// // // // // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // // // //       where: { 
// // // // // // // // //         sessionId: session.id 
// // // // // // // // //       },
// // // // // // // // //       select: { 
// // // // // // // // //         id: true,
// // // // // // // // //         shopify_file_url: true, 
// // // // // // // // //         title: true, 
// // // // // // // // //         description: true,
// // // // // // // // //         duration: true,
// // // // // // // // //         download_count: true
// // // // // // // // //       },
// // // // // // // // //     });

// // // // // // // // //     console.log("✅ Found videos:", videos.length);

// // // // // // // // //     // Format the response
// // // // // // // // //     const formattedVideos = videos.map(video => ({
// // // // // // // // //       id: video.id,
// // // // // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // // // // //       title: video.title,
// // // // // // // // //       description: video.description,
// // // // // // // // //       duration: video.duration || 0,
// // // // // // // // //       download_count: video.download_count || 0,
// // // // // // // // //       user_has_liked: false,
// // // // // // // // //       user_has_shared: false,
// // // // // // // // //       user_has_saved: false,
// // // // // // // // //       like_count: 0,
// // // // // // // // //       share_count: 0,
// // // // // // // // //       save_count: 0,
// // // // // // // // //       comment_count: 0,
// // // // // // // // //       store_currency: storeCurrency
// // // // // // // // //     }));

// // // // // // // // //     return json({ 
// // // // // // // // //       success: true, 
// // // // // // // // //       videos: formattedVideos,
// // // // // // // // //       store_currency: storeCurrency
// // // // // // // // //     });

// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("❌ Loader error:", error);
// // // // // // // // //     return json({ 
// // // // // // // // //       success: false, 
// // // // // // // // //       error: error.message 
// // // // // // // // //     }, { status: 500 });
// // // // // // // // //   } finally {
// // // // // // // // //     await prisma.$disconnect();
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // ACTION HANDLER
// // // // // // // // // export async function action({ request }) {
// // // // // // // // //   console.log("🔄 Action function called");
  
// // // // // // // // //   try {
// // // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // // // // //     if (!session?.id) {
// // // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // // //     }

// // // // // // // // //     // Get current user info
// // // // // // // // //     let currentUser;
// // // // // // // // //     let userId = "anonymous";
    
// // // // // // // // //     try {
// // // // // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // // // // //         session: session,
// // // // // // // // //       });
// // // // // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // // // // //       console.log("👤 User ID:", userId);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // // // // //     }

// // // // // // // // //     const formData = await request.formData();
// // // // // // // // //     const actionType = formData.get('actionType');
// // // // // // // // //     const mediaFileId = formData.get('mediaFileId');
// // // // // // // // //     const comment = formData.get('comment');

// // // // // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // // // // //     // Validate mediaFileId
// // // // // // // // //     if (!mediaFileId || isNaN(parseInt(mediaFileId))) {
// // // // // // // // //       return json({ success: false, error: 'Invalid media file ID' }, { status: 400 });
// // // // // // // // //     }

// // // // // // // // //     const parsedMediaFileId = parseInt(mediaFileId);

// // // // // // // // //     switch (actionType) {
// // // // // // // // //       case 'like':
// // // // // // // // //         return await handleLike(session.id, parsedMediaFileId, userId);
      
// // // // // // // // //       case 'unlike':
// // // // // // // // //         return await handleUnlike(session.id, parsedMediaFileId, userId);
      
// // // // // // // // //       case 'save':
// // // // // // // // //         return await handleSave(session.id, parsedMediaFileId, userId);
      
// // // // // // // // //       case 'unsave':
// // // // // // // // //         return await handleUnsave(session.id, parsedMediaFileId, userId);
      
// // // // // // // // //       case 'share':
// // // // // // // // //         return await handleShare(session.id, parsedMediaFileId, userId);
      
// // // // // // // // //       case 'comment':
// // // // // // // // //         if (!currentUser) {
// // // // // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // // // // //         }
// // // // // // // // //         if (!comment || comment.trim().length === 0) {
// // // // // // // // //           return json({ success: false, error: "Comment cannot be empty" }, { status: 400 });
// // // // // // // // //         }
// // // // // // // // //         return await handleComment(session.id, parsedMediaFileId, userId, comment, currentUser);
      
// // // // // // // // //       case 'download':
// // // // // // // // //         return await handleDownload(parsedMediaFileId);
      
// // // // // // // // //       case 'getComments':
// // // // // // // // //         return await getComments(parsedMediaFileId);
      
// // // // // // // // //       case 'getSavedVideos':
// // // // // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // // // // //       default:
// // // // // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // // // // //     }
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('❌ Action error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // HANDLER FUNCTIONS
// // // // // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // // // // //   try {
// // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // //       where: {
// // // // // // // // //         userId_mediaFileId: {
// // // // // // // // //           userId,
// // // // // // // // //           mediaFileId
// // // // // // // // //         }
// // // // // // // // //       },
// // // // // // // // //       update: {
// // // // // // // // //         liked: true
// // // // // // // // //       },
// // // // // // // // //       create: {
// // // // // // // // //         sessionId,
// // // // // // // // //         mediaFileId,
// // // // // // // // //         userId,
// // // // // // // // //         liked: true
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     return json({ success: true, liked: true });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Like error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // // // // //   try {
// // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // //       where: {
// // // // // // // // //         userId,
// // // // // // // // //         mediaFileId
// // // // // // // // //       },
// // // // // // // // //       data: {
// // // // // // // // //         liked: false
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     return json({ success: true, liked: false });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Unlike error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // // // // //   try {
// // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // //       where: {
// // // // // // // // //         userId_mediaFileId: {
// // // // // // // // //           userId,
// // // // // // // // //           mediaFileId
// // // // // // // // //         }
// // // // // // // // //       },
// // // // // // // // //       update: {
// // // // // // // // //         saved: true
// // // // // // // // //       },
// // // // // // // // //       create: {
// // // // // // // // //         sessionId,
// // // // // // // // //         mediaFileId,
// // // // // // // // //         userId,
// // // // // // // // //         saved: true
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     return json({ success: true, saved: true });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Save error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // // // // //   try {
// // // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // // //       where: {
// // // // // // // // //         userId,
// // // // // // // // //         mediaFileId
// // // // // // // // //       },
// // // // // // // // //       data: {
// // // // // // // // //         saved: false
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     return json({ success: true, saved: false });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Unsave error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // // // // //   try {
// // // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // // //       where: {
// // // // // // // // //         userId_mediaFileId: {
// // // // // // // // //           userId,
// // // // // // // // //           mediaFileId
// // // // // // // // //         }
// // // // // // // // //       },
// // // // // // // // //       update: {
// // // // // // // // //         shared: true
// // // // // // // // //       },
// // // // // // // // //       create: {
// // // // // // // // //         sessionId,
// // // // // // // // //         mediaFileId,
// // // // // // // // //         userId,
// // // // // // // // //         shared: true
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     return json({ success: true, shared: true });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Share error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // // // // //   try {
// // // // // // // // //     const newComment = await prisma.videoComment.create({
// // // // // // // // //       data: {
// // // // // // // // //         sessionId,
// // // // // // // // //         mediaFileId,
// // // // // // // // //         userId,
// // // // // // // // //         userEmail: currentUser.email,
// // // // // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // // // // //         comment: comment
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     return json({ success: true, comment: newComment });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Comment error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // async function handleDownload(mediaFileId) {
// // // // // // // // //   try {
// // // // // // // // //     await prisma.mediaFile.update({
// // // // // // // // //       where: { id: mediaFileId },
// // // // // // // // //       data: {
// // // // // // // // //         download_count: {
// // // // // // // // //           increment: 1
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     return json({ success: true });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Download error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // async function getComments(mediaFileId) {
// // // // // // // // //   try {
// // // // // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // // // // //       where: { mediaFileId },
// // // // // // // // //       orderBy: { created_at: 'desc' }
// // // // // // // // //     });

// // // // // // // // //     return json({ success: true, comments });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Get comments error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // // // // //   try {
// // // // // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // // // // //       where: {
// // // // // // // // //         sessionId,
// // // // // // // // //         userId,
// // // // // // // // //         saved: true
// // // // // // // // //       },
// // // // // // // // //       include: {
// // // // // // // // //         mediaFile: true
// // // // // // // // //       },
// // // // // // // // //       orderBy: { updated_at: 'desc' }
// // // // // // // // //     });

// // // // // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // // // // //       id: engagement.mediaFile.id,
// // // // // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // // // // //       title: engagement.mediaFile.title,
// // // // // // // // //       description: engagement.mediaFile.description,
// // // // // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // // // // //     }));

// // // // // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error('Get saved videos error:', error);
// // // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // // //   }
// // // // // // // // // }





// // // // // // // // import { json } from "@remix-run/node";
// // // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // // const prisma = new PrismaClient();

// // // // // // // // // Price formatting function
// // // // // // // // function formatPrice(price, currencyCode) {
// // // // // // // //   if (!price) return '0.00';
  
// // // // // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // // // // // //   if (isNaN(numericPrice)) return '0.00';
  
// // // // // // // //   if (currencyCode === 'PKR') {
// // // // // // // //     return new Intl.NumberFormat('en-PK', {
// // // // // // // //       minimumFractionDigits: 0,
// // // // // // // //       maximumFractionDigits: 0
// // // // // // // //     }).format(numericPrice);
// // // // // // // //   } else {
// // // // // // // //     return new Intl.NumberFormat('en-US', {
// // // // // // // //       minimumFractionDigits: 2,
// // // // // // // //       maximumFractionDigits: 2
// // // // // // // //     }).format(numericPrice);
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // Function to get shop currency
// // // // // // // // async function getShopCurrency(admin, session) {
// // // // // // // //   let storeCurrency = 'USD';
  
// // // // // // // //   try {
// // // // // // // //     const shop = await admin.rest.resources.Shop.all({
// // // // // // // //       session: session,
// // // // // // // //       fields: 'currency',
// // // // // // // //     });
    
// // // // // // // //     if (shop && shop.data && shop.data.length > 0) {
// // // // // // // //       storeCurrency = shop.data[0].currency || 'USD';
// // // // // // // //       console.log("💰 Store currency:", storeCurrency);
// // // // // // // //     }
// // // // // // // //   } catch (shopError) {
// // // // // // // //     console.log("❌ Shop currency fetch error:", shopError.message);
// // // // // // // //   }
  
// // // // // // // //   return storeCurrency;
// // // // // // // // }

// // // // // // // // // Function to get products with variant IDs
// // // // // // // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // // // // // // //   try {
// // // // // // // //     // Get shop currency
// // // // // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // // // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // // // // // //       where: {
// // // // // // // //         video_id: parseInt(mediaFileId),
// // // // // // // //       },
// // // // // // // //       include: {
// // // // // // // //         product: true,
// // // // // // // //       },
// // // // // // // //     });

// // // // // // // //     const products = videoProducts.map(vp => vp.product);
// // // // // // // //     console.log("✅ Found products:", products.length);
    
// // // // // // // //     // Format products with variant IDs
// // // // // // // //     const formattedProducts = products.map(product => {
// // // // // // // //       console.log("🔍 Product data:", {
// // // // // // // //         id: product.id,
// // // // // // // //         title: product.title,
// // // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // // //         shopify_variant_id: product.shopify_variant_id,
// // // // // // // //         price: product.price
// // // // // // // //       });
      
// // // // // // // //       // Use the variant_id from your database (now that you've added shopify_variant_id)
// // // // // // // //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// // // // // // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // // // // // // //       console.log("💰 Formatted price:", formattedPrice);
// // // // // // // //       console.log("🆔 Variant ID to use:", variantId);
      
// // // // // // // //       return {
// // // // // // // //         id: product.id,
// // // // // // // //         title: product.title,
// // // // // // // //         variant_id: variantId,
// // // // // // // //         price: formattedPrice,
// // // // // // // //         currency_code: storeCurrency,
// // // // // // // //         image_url: product.image_url,
// // // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // // //         shopify_variant_id: product.shopify_variant_id
// // // // // // // //       };
// // // // // // // //     });
    
// // // // // // // //     return formattedProducts;
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("❌ Products fetch error:", error);
// // // // // // // //     return [];
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // Function to get collection products with variant IDs
// // // // // // // // async function getCollectionProductsForMediaFile(mediaFileId, admin, session) {
// // // // // // // //   try {
// // // // // // // //     // Get shop currency
// // // // // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // // // // //     console.log("📦 Fetching collection products for video:", mediaFileId);
    
// // // // // // // //     const videoCollections = await prisma.videoCollection.findMany({
// // // // // // // //       where: {
// // // // // // // //         video_id: parseInt(mediaFileId),
// // // // // // // //       },
// // // // // // // //       include: {
// // // // // // // //         collection: true,
// // // // // // // //       },
// // // // // // // //     });

// // // // // // // //     const collections = videoCollections.map(vc => vc.collection);
// // // // // // // //     console.log("✅ Found collections:", collections.length);

// // // // // // // //     // Collect all unique variant GIDs from collections
// // // // // // // //     let allVariantGIDs = new Set();
// // // // // // // //     collections.forEach(coll => {
// // // // // // // //       coll.shopify_collection_products_variant_ids.forEach(gid => allVariantGIDs.add(gid));
// // // // // // // //     });
// // // // // // // //     allVariantGIDs = Array.from(allVariantGIDs);
// // // // // // // //     console.log("✅ Unique collection variant GIDs:", allVariantGIDs.length);

// // // // // // // //     let products = [];

// // // // // // // //     // Query Shopify for collection variant details if any
// // // // // // // //     if (allVariantGIDs.length > 0) {
// // // // // // // //       // Batch query variants (limit to 250 as per Shopify)
// // // // // // // //       const batches = [];
// // // // // // // //       for (let i = 0; i < allVariantGIDs.length; i += 100) { // Smaller batch for safety
// // // // // // // //         batches.push(allVariantGIDs.slice(i, i + 100));
// // // // // // // //       }

// // // // // // // //       for (const batch of batches) {
// // // // // // // //         const variantsQuery = batch.map((gid, idx) => `v${idx}: productVariant(id: "${gid}") {
// // // // // // // //           id
// // // // // // // //           title
// // // // // // // //           price {
// // // // // // // //             amount
// // // // // // // //             currencyCode
// // // // // // // //           }
// // // // // // // //           image {
// // // // // // // //             url
// // // // // // // //           }
// // // // // // // //           product {
// // // // // // // //             id
// // // // // // // //             title
// // // // // // // //             featuredImage {
// // // // // // // //               url
// // // // // // // //             }
// // // // // // // //           }
// // // // // // // //         }`).join('\n');

// // // // // // // //         const response = await admin.graphql(`
// // // // // // // //           query {
// // // // // // // //             ${variantsQuery}
// // // // // // // //           }
// // // // // // // //         `);

// // // // // // // //         const data = await response.json();
        
// // // // // // // //         if (data.errors) {
// // // // // // // //           console.error("❌ GraphQL errors:", data.errors);
// // // // // // // //           continue;
// // // // // // // //         }

// // // // // // // //         Object.values(data.data).forEach(variant => {
// // // // // // // //           if (variant) {
// // // // // // // //             products.push({
// // // // // // // //               id: Math.random().toString(36), // Temp ID for uniqueness
// // // // // // // //               title: `${variant.product.title} - ${variant.title}`,
// // // // // // // //               shopify_product_id: variant.product.id.replace('gid://shopify/Product/', ''),
// // // // // // // //               shopify_variant_id: variant.id.replace('gid://shopify/ProductVariant/', ''),
// // // // // // // //               price: parseFloat(variant.price.amount),
// // // // // // // //               image_url: variant.image?.url || variant.product.featuredImage?.url,
// // // // // // // //               currency_code: variant.price.currencyCode
// // // // // // // //             });
// // // // // // // //           }
// // // // // // // //         });
// // // // // // // //       }
// // // // // // // //     }
    
// // // // // // // //     // Remove duplicates by shopify_variant_id
// // // // // // // //     const uniqueProducts = new Map();
// // // // // // // //     products.forEach(p => {
// // // // // // // //       if (p.shopify_variant_id) {
// // // // // // // //         uniqueProducts.set(p.shopify_variant_id, p);
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //     products = Array.from(uniqueProducts.values());
// // // // // // // //     console.log("✅ Total unique collection products:", products.length);
    
// // // // // // // //     // Format products with variant IDs
// // // // // // // //     const formattedProducts = products.map(product => {
// // // // // // // //       console.log("🔍 Collection Product data:", {
// // // // // // // //         id: product.id,
// // // // // // // //         title: product.title,
// // // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // // //         shopify_variant_id: product.shopify_variant_id,
// // // // // // // //         price: product.price
// // // // // // // //       });
      
// // // // // // // //       // Use the variant_id from your database (now that you've added shopify_variant_id)
// // // // // // // //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// // // // // // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // // // // // // //       console.log("💰 Formatted price:", formattedPrice);
// // // // // // // //       console.log("🆔 Variant ID to use:", variantId);
      
// // // // // // // //       return {
// // // // // // // //         id: product.id,
// // // // // // // //         title: product.title,
// // // // // // // //         variant_id: variantId,
// // // // // // // //         price: formattedPrice,
// // // // // // // //         currency_code: storeCurrency,
// // // // // // // //         image_url: product.image_url,
// // // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // // //         shopify_variant_id: product.shopify_variant_id
// // // // // // // //       };
// // // // // // // //     });
    
// // // // // // // //     return formattedProducts;
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("❌ Collection Products fetch error:", error);
// // // // // // // //     return [];
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // export async function loader({ request }) {
// // // // // // // //   console.log("🔄 Loader function called");
// // // // // // // //   console.log("📝 Request URL:", request.url);

// // // // // // // //   const url = new URL(request.url);
// // // // // // // //   const action = url.searchParams.get("action");
// // // // // // // //   const mediaFileId = url.searchParams.get("mediaFileId");
// // // // // // // //   const shopParam = url.searchParams.get("shop");

// // // // // // // //   console.log("🔍 Query parameters:", { action, mediaFileId, shopParam });

// // // // // // // //   // Handle product requests
// // // // // // // //   if (action === "getProducts" && mediaFileId) {
// // // // // // // //     try {
// // // // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // // // //       if (!session?.id) {
// // // // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // //       }

// // // // // // // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // // // //       console.log("📦 Final products being returned:");
// // // // // // // //       products.forEach((product, index) => {
// // // // // // // //         console.log(`  Product ${index + 1}:`, {
// // // // // // // //           title: product.title,
// // // // // // // //           variant_id: product.variant_id,
// // // // // // // //           price: product.price,
// // // // // // // //           currency: product.currency_code
// // // // // // // //         });
// // // // // // // //       });
      
// // // // // // // //       return json({
// // // // // // // //         success: true,
// // // // // // // //         products: products,
// // // // // // // //       });
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Products fetch error:", error);
// // // // // // // //       return json({ 
// // // // // // // //         success: false, 
// // // // // // // //         error: "Failed to load products" 
// // // // // // // //       }, { status: 500 });
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // Handle collection product requests
// // // // // // // //   if (action === "getCollectionProducts" && mediaFileId) {
// // // // // // // //     try {
// // // // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // // // //       if (!session?.id) {
// // // // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // //       }

// // // // // // // //       const products = await getCollectionProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // // // //       console.log("📦 Final collection products being returned:");
// // // // // // // //       products.forEach((product, index) => {
// // // // // // // //         console.log(`  Collection Product ${index + 1}:`, {
// // // // // // // //           title: product.title,
// // // // // // // //           variant_id: product.variant_id,
// // // // // // // //           price: product.price,
// // // // // // // //           currency: product.currency_code
// // // // // // // //         });
// // // // // // // //       });
      
// // // // // // // //       return json({
// // // // // // // //         success: true,
// // // // // // // //         products: products,
// // // // // // // //       });
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Collection Products fetch error:", error);
// // // // // // // //       return json({ 
// // // // // // // //         success: false, 
// // // // // // // //         error: "Failed to load collection products" 
// // // // // // // //       }, { status: 500 });
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // VIDEO LOADING LOGIC
// // // // // // // //   try {
// // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // // // //     if (!session?.id) {
// // // // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // //     }

// // // // // // // //     // Get shop currency
// // // // // // // //     const storeCurrency = await getShopCurrency(admin, session);

// // // // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // // //       where: { 
// // // // // // // //         sessionId: session.id 
// // // // // // // //       },
// // // // // // // //       select: { 
// // // // // // // //         id: true,
// // // // // // // //         shopify_file_url: true, 
// // // // // // // //         title: true, 
// // // // // // // //         description: true,
// // // // // // // //         duration: true,
// // // // // // // //         download_count: true
// // // // // // // //       },
// // // // // // // //     });

// // // // // // // //     console.log("✅ Found videos:", videos.length);

// // // // // // // //     // Format the response
// // // // // // // //     const formattedVideos = videos.map(video => ({
// // // // // // // //       id: video.id,
// // // // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // // // //       title: video.title,
// // // // // // // //       description: video.description,
// // // // // // // //       duration: video.duration || 0,
// // // // // // // //       download_count: video.download_count || 0,
// // // // // // // //       user_has_liked: false,
// // // // // // // //       user_has_shared: false,
// // // // // // // //       user_has_saved: false,
// // // // // // // //       like_count: 0,
// // // // // // // //       share_count: 0,
// // // // // // // //       save_count: 0,
// // // // // // // //       comment_count: 0,
// // // // // // // //       store_currency: storeCurrency
// // // // // // // //     }));

// // // // // // // //     return json({ 
// // // // // // // //       success: true, 
// // // // // // // //       videos: formattedVideos,
// // // // // // // //       store_currency: storeCurrency
// // // // // // // //     });

// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("❌ Loader error:", error);
// // // // // // // //     return json({ 
// // // // // // // //       success: false, 
// // // // // // // //       error: error.message 
// // // // // // // //     }, { status: 500 });
// // // // // // // //   } finally {
// // // // // // // //     await prisma.$disconnect();
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // ACTION HANDLER
// // // // // // // // export async function action({ request }) {
// // // // // // // //   console.log("🔄 Action function called");
  
// // // // // // // //   try {
// // // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // // // //     if (!session?.id) {
// // // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // // //     }

// // // // // // // //     // Get current user info
// // // // // // // //     let currentUser;
// // // // // // // //     let userId = "anonymous";
    
// // // // // // // //     try {
// // // // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // // // //         session: session,
// // // // // // // //       });
// // // // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // // // //       console.log("👤 User ID:", userId);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // // // //     }

// // // // // // // //     const formData = await request.formData();
// // // // // // // //     const actionType = formData.get('actionType');
// // // // // // // //     const mediaFileId = formData.get('mediaFileId');
// // // // // // // //     const comment = formData.get('comment');

// // // // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // // // //     // Validate mediaFileId
// // // // // // // //     if (!mediaFileId || isNaN(parseInt(mediaFileId))) {
// // // // // // // //       return json({ success: false, error: 'Invalid media file ID' }, { status: 400 });
// // // // // // // //     }

// // // // // // // //     const parsedMediaFileId = parseInt(mediaFileId);

// // // // // // // //     switch (actionType) {
// // // // // // // //       case 'like':
// // // // // // // //         return await handleLike(session.id, parsedMediaFileId, userId);
      
// // // // // // // //       case 'unlike':
// // // // // // // //         return await handleUnlike(session.id, parsedMediaFileId, userId);
      
// // // // // // // //       case 'save':
// // // // // // // //         return await handleSave(session.id, parsedMediaFileId, userId);
      
// // // // // // // //       case 'unsave':
// // // // // // // //         return await handleUnsave(session.id, parsedMediaFileId, userId);
      
// // // // // // // //       case 'share':
// // // // // // // //         return await handleShare(session.id, parsedMediaFileId, userId);
      
// // // // // // // //       case 'comment':
// // // // // // // //         if (!currentUser) {
// // // // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // // // //         }
// // // // // // // //         if (!comment || comment.trim().length === 0) {
// // // // // // // //           return json({ success: false, error: "Comment cannot be empty" }, { status: 400 });
// // // // // // // //         }
// // // // // // // //         return await handleComment(session.id, parsedMediaFileId, userId, comment, currentUser);
      
// // // // // // // //       case 'download':
// // // // // // // //         return await handleDownload(parsedMediaFileId);
      
// // // // // // // //       case 'getComments':
// // // // // // // //         return await getComments(parsedMediaFileId);
      
// // // // // // // //       case 'getSavedVideos':
// // // // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // // // //       default:
// // // // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // // // //     }
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('❌ Action error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // HANDLER FUNCTIONS
// // // // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // // // //   try {
// // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // //       where: {
// // // // // // // //         userId_mediaFileId: {
// // // // // // // //           userId,
// // // // // // // //           mediaFileId
// // // // // // // //         }
// // // // // // // //       },
// // // // // // // //       update: {
// // // // // // // //         liked: true
// // // // // // // //       },
// // // // // // // //       create: {
// // // // // // // //         sessionId,
// // // // // // // //         mediaFileId,
// // // // // // // //         userId,
// // // // // // // //         liked: true
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     return json({ success: true, liked: true });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Like error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // // // //   try {
// // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // //       where: {
// // // // // // // //         userId,
// // // // // // // //         mediaFileId
// // // // // // // //       },
// // // // // // // //       data: {
// // // // // // // //         liked: false
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     return json({ success: true, liked: false });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Unlike error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // // // //   try {
// // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // //       where: {
// // // // // // // //         userId_mediaFileId: {
// // // // // // // //           userId,
// // // // // // // //           mediaFileId
// // // // // // // //         }
// // // // // // // //       },
// // // // // // // //       update: {
// // // // // // // //         saved: true
// // // // // // // //       },
// // // // // // // //       create: {
// // // // // // // //         sessionId,
// // // // // // // //         mediaFileId,
// // // // // // // //         userId,
// // // // // // // //         saved: true
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     return json({ success: true, saved: true });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Save error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // // // //   try {
// // // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // // //       where: {
// // // // // // // //         userId,
// // // // // // // //         mediaFileId
// // // // // // // //       },
// // // // // // // //       data: {
// // // // // // // //         saved: false
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     return json({ success: true, saved: false });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Unsave error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // // // //   try {
// // // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // // //       where: {
// // // // // // // //         userId_mediaFileId: {
// // // // // // // //           userId,
// // // // // // // //           mediaFileId
// // // // // // // //         }
// // // // // // // //       },
// // // // // // // //       update: {
// // // // // // // //         shared: true
// // // // // // // //       },
// // // // // // // //       create: {
// // // // // // // //         sessionId,
// // // // // // // //         mediaFileId,
// // // // // // // //         userId,
// // // // // // // //         shared: true
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     return json({ success: true, shared: true });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Share error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // // // //   try {
// // // // // // // //     const newComment = await prisma.videoComment.create({
// // // // // // // //       data: {
// // // // // // // //         sessionId,
// // // // // // // //         mediaFileId,
// // // // // // // //         userId,
// // // // // // // //         userEmail: currentUser.email,
// // // // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // // // //         comment: comment
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     return json({ success: true, comment: newComment });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Comment error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // async function handleDownload(mediaFileId) {
// // // // // // // //   try {
// // // // // // // //     await prisma.mediaFile.update({
// // // // // // // //       where: { id: mediaFileId },
// // // // // // // //       data: {
// // // // // // // //         download_count: {
// // // // // // // //           increment: 1
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     return json({ success: true });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Download error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // async function getComments(mediaFileId) {
// // // // // // // //   try {
// // // // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // // // //       where: { mediaFileId },
// // // // // // // //       orderBy: { created_at: 'desc' }
// // // // // // // //     });

// // // // // // // //     return json({ success: true, comments });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Get comments error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // // // //   try {
// // // // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // // // //       where: {
// // // // // // // //         sessionId,
// // // // // // // //         userId,
// // // // // // // //         saved: true
// // // // // // // //       },
// // // // // // // //       include: {
// // // // // // // //         mediaFile: true
// // // // // // // //       },
// // // // // // // //       orderBy: { updated_at: 'desc' }
// // // // // // // //     });

// // // // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // // // //       id: engagement.mediaFile.id,
// // // // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // // // //       title: engagement.mediaFile.title,
// // // // // // // //       description: engagement.mediaFile.description,
// // // // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // // // //     }));

// // // // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Get saved videos error:', error);
// // // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }








// // // // // // // import { json } from "@remix-run/node";
// // // // // // // import { authenticate } from "../shopify.server";
// // // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // // const prisma = new PrismaClient();

// // // // // // // // Price formatting function
// // // // // // // function formatPrice(price, currencyCode) {
// // // // // // //   if (!price) return '0.00';
  
// // // // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // // // // //   if (isNaN(numericPrice)) return '0.00';
  
// // // // // // //   if (currencyCode === 'PKR') {
// // // // // // //     return new Intl.NumberFormat('en-PK', {
// // // // // // //       minimumFractionDigits: 0,
// // // // // // //       maximumFractionDigits: 0
// // // // // // //     }).format(numericPrice);
// // // // // // //   } else {
// // // // // // //     return new Intl.NumberFormat('en-US', {
// // // // // // //       minimumFractionDigits: 2,
// // // // // // //       maximumFractionDigits: 2
// // // // // // //     }).format(numericPrice);
// // // // // // //   }
// // // // // // // }

// // // // // // // // Function to get shop currency
// // // // // // // async function getShopCurrency(admin, session) {
// // // // // // //   let storeCurrency = 'USD';
  
// // // // // // //   try {
// // // // // // //     const shop = await admin.rest.resources.Shop.all({
// // // // // // //       session: session,
// // // // // // //       fields: 'currency',
// // // // // // //     });
    
// // // // // // //     if (shop && shop.data && shop.data.length > 0) {
// // // // // // //       storeCurrency = shop.data[0].currency || 'USD';
// // // // // // //       console.log("💰 Store currency:", storeCurrency);
// // // // // // //     }
// // // // // // //   } catch (shopError) {
// // // // // // //     console.log("❌ Shop currency fetch error:", shopError.message);
// // // // // // //   }
  
// // // // // // //   return storeCurrency;
// // // // // // // }

// // // // // // // // Function to get products with variant IDs
// // // // // // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // // // // // //   try {
// // // // // // //     // Get shop currency
// // // // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // // // // //       where: {
// // // // // // //         video_id: parseInt(mediaFileId),
// // // // // // //       },
// // // // // // //       include: {
// // // // // // //         product: true,
// // // // // // //       },
// // // // // // //     });

// // // // // // //     const products = videoProducts.map(vp => vp.product);
// // // // // // //     console.log("✅ Found products:", products.length);
    
// // // // // // //     // Format products with variant IDs
// // // // // // //     const formattedProducts = products.map(product => {
// // // // // // //       console.log("🔍 Product data:", {
// // // // // // //         id: product.id,
// // // // // // //         title: product.title,
// // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // //         shopify_variant_id: product.shopify_variant_id,
// // // // // // //         price: product.price
// // // // // // //       });
      
// // // // // // //       // Use the variant_id from your database (now that you've added shopify_variant_id)
// // // // // // //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// // // // // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // // // // // //       console.log("💰 Formatted price:", formattedPrice);
// // // // // // //       console.log("🆔 Variant ID to use:", variantId);
      
// // // // // // //       return {
// // // // // // //         id: product.id,
// // // // // // //         title: product.title,
// // // // // // //         variant_id: variantId,
// // // // // // //         price: formattedPrice,
// // // // // // //         currency_code: storeCurrency,
// // // // // // //         image_url: product.image_url,
// // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // //         shopify_variant_id: product.shopify_variant_id
// // // // // // //       };
// // // // // // //     });
    
// // // // // // //     return formattedProducts;
// // // // // // //   } catch (error) {
// // // // // // //     console.error("❌ Products fetch error:", error);
// // // // // // //     return [];
// // // // // // //   }
// // // // // // // }

// // // // // // // // Function to get collection products with variant IDs - FIXED VERSION
// // // // // // // async function getCollectionProductsForMediaFile(mediaFileId, admin, session) {
// // // // // // //   try {
// // // // // // //     // Get shop currency
// // // // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // // // //     console.log("📦 Fetching collection products for video:", mediaFileId);
    
// // // // // // //     // First, get the collections associated with this video
// // // // // // //     const videoCollections = await prisma.videoCollection.findMany({
// // // // // // //       where: {
// // // // // // //         video_id: parseInt(mediaFileId),
// // // // // // //       },
// // // // // // //       include: {
// // // // // // //         collection: true,
// // // // // // //       },
// // // // // // //     });

// // // // // // //     const collections = videoCollections.map(vc => vc.collection);
// // // // // // //     console.log("✅ Found collections:", collections.length);

// // // // // // //     // Collect all unique variant GIDs from collections
// // // // // // //     let allVariantGIDs = [];
// // // // // // //     collections.forEach(coll => {
// // // // // // //       if (coll.shopify_collection_products_variant_ids && 
// // // // // // //           Array.isArray(coll.shopify_collection_products_variant_ids)) {
// // // // // // //         allVariantGIDs = [...allVariantGIDs, ...coll.shopify_collection_products_variant_ids];
// // // // // // //       }
// // // // // // //     });
    
// // // // // // //     // Remove duplicates
// // // // // // //     allVariantGIDs = [...new Set(allVariantGIDs)];
// // // // // // //     console.log("✅ Unique collection variant GIDs:", allVariantGIDs.length);

// // // // // // //     let products = [];

// // // // // // //     // Query Shopify for collection variant details if any
// // // // // // //     if (allVariantGIDs.length > 0) {
// // // // // // //       // Batch query variants (limit to 100 as per Shopify GraphQL limits)
// // // // // // //       const batches = [];
// // // // // // //       for (let i = 0; i < allVariantGIDs.length; i += 100) {
// // // // // // //         batches.push(allVariantGIDs.slice(i, i + 100));
// // // // // // //       }

// // // // // // //       for (const batch of batches) {
// // // // // // //         try {
// // // // // // //           const variantsQuery = batch.map((gid, idx) => `v${idx}: productVariant(id: "${gid}") {
// // // // // // //           id
// // // // // // //           title
// // // // // // //           price {
// // // // // // //             amount
// // // // // // //             currencyCode
// // // // // // //           }
// // // // // // //           image {
// // // // // // //             url
// // // // // // //           }
// // // // // // //           product {
// // // // // // //             id
// // // // // // //             title
// // // // // // //             featuredImage {
// // // // // // //               url
// // // // // // //             }
// // // // // // //           }
// // // // // // //         }`).join('\n');

// // // // // // //           const response = await admin.graphql(`
// // // // // // //           query {
// // // // // // //             ${variantsQuery}
// // // // // // //           }
// // // // // // //         `);

// // // // // // //           const data = await response.json();
          
// // // // // // //           if (data.errors) {
// // // // // // //             console.error("❌ GraphQL errors:", data.errors);
// // // // // // //             continue;
// // // // // // //           }

// // // // // // //           // Process the variants data
// // // // // // //           Object.values(data.data).forEach(variant => {
// // // // // // //             if (variant && variant.id) {
// // // // // // //               const variantId = variant.id.replace('gid://shopify/ProductVariant/', '');
// // // // // // //               const productId = variant.product.id.replace('gid://shopify/Product/', '');
              
// // // // // // //               products.push({
// // // // // // //                 id: `collection_${variantId}`, // Unique ID for collection products
// // // // // // //                 title: `${variant.product.title} - ${variant.title}`,
// // // // // // //                 shopify_product_id: productId,
// // // // // // //                 shopify_variant_id: variantId,
// // // // // // //                 price: parseFloat(variant.price.amount),
// // // // // // //                 image_url: variant.image?.url || variant.product.featuredImage?.url,
// // // // // // //                 currency_code: variant.price.currencyCode || storeCurrency,
// // // // // // //                 is_collection_product: true // Flag to identify collection products
// // // // // // //               });
// // // // // // //             }
// // // // // // //           });
// // // // // // //         } catch (batchError) {
// // // // // // //           console.error("❌ Batch processing error:", batchError);
// // // // // // //           continue;
// // // // // // //         }
// // // // // // //       }
// // // // // // //     }
    
// // // // // // //     // Remove duplicates by shopify_variant_id
// // // // // // //     const uniqueProducts = new Map();
// // // // // // //     products.forEach(p => {
// // // // // // //       if (p.shopify_variant_id) {
// // // // // // //         uniqueProducts.set(p.shopify_variant_id, p);
// // // // // // //       }
// // // // // // //     });
// // // // // // //     products = Array.from(uniqueProducts.values());
// // // // // // //     console.log("✅ Total unique collection products:", products.length);
    
// // // // // // //     // Format products with variant IDs
// // // // // // //     const formattedProducts = products.map(product => {
// // // // // // //       console.log("🔍 Collection Product data:", {
// // // // // // //         id: product.id,
// // // // // // //         title: product.title,
// // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // //         shopify_variant_id: product.shopify_variant_id,
// // // // // // //         price: product.price,
// // // // // // //         is_collection_product: product.is_collection_product
// // // // // // //       });
      
// // // // // // //       const variantId = product.shopify_variant_id;
// // // // // // //       const formattedPrice = formatPrice(product.price || '0.00', product.currency_code || storeCurrency);
      
// // // // // // //       console.log("💰 Formatted price:", formattedPrice);
// // // // // // //       console.log("🆔 Variant ID to use:", variantId);
      
// // // // // // //       return {
// // // // // // //         id: product.id,
// // // // // // //         title: product.title,
// // // // // // //         variant_id: variantId,
// // // // // // //         price: formattedPrice,
// // // // // // //         currency_code: product.currency_code || storeCurrency,
// // // // // // //         image_url: product.image_url,
// // // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // // //         shopify_variant_id: product.shopify_variant_id,
// // // // // // //         is_collection_product: true // Mark as collection product
// // // // // // //       };
// // // // // // //     });
    
// // // // // // //     return formattedProducts;
// // // // // // //   } catch (error) {
// // // // // // //     console.error("❌ Collection Products fetch error:", error);
// // // // // // //     return [];
// // // // // // //   }
// // // // // // // }

// // // // // // // // Main loader function - UPDATED to handle both product types
// // // // // // // export async function loader({ request }) {
// // // // // // //   console.log("🔄 Loader function called");
// // // // // // //   console.log("📝 Request URL:", request.url);

// // // // // // //   const url = new URL(request.url);
// // // // // // //   const action = url.searchParams.get("action");
// // // // // // //   const mediaFileId = url.searchParams.get("mediaFileId");
// // // // // // //   const shopParam = url.searchParams.get("shop");

// // // // // // //   console.log("🔍 Query parameters:", { action, mediaFileId, shopParam });

// // // // // // //   // Handle product requests
// // // // // // //   if (action === "getProducts" && mediaFileId) {
// // // // // // //     try {
// // // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // // //       if (!session?.id) {
// // // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // //       }

// // // // // // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // // //       console.log("📦 Final products being returned:");
// // // // // // //       products.forEach((product, index) => {
// // // // // // //         console.log(`  Product ${index + 1}:`, {
// // // // // // //           title: product.title,
// // // // // // //           variant_id: product.variant_id,
// // // // // // //           price: product.price,
// // // // // // //           currency: product.currency_code
// // // // // // //         });
// // // // // // //       });
      
// // // // // // //       return json({
// // // // // // //         success: true,
// // // // // // //         products: products,
// // // // // // //       });
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Products fetch error:", error);
// // // // // // //       return json({ 
// // // // // // //         success: false, 
// // // // // // //         error: "Failed to load products" 
// // // // // // //       }, { status: 500 });
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // Handle collection product requests - FIXED
// // // // // // //   if (action === "getCollectionProducts" && mediaFileId) {
// // // // // // //     try {
// // // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // // //       if (!session?.id) {
// // // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // //       }

// // // // // // //       const products = await getCollectionProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // // //       console.log("📦 Final collection products being returned:");
// // // // // // //       products.forEach((product, index) => {
// // // // // // //         console.log(`  Collection Product ${index + 1}:`, {
// // // // // // //           title: product.title,
// // // // // // //           variant_id: product.variant_id,
// // // // // // //           price: product.price,
// // // // // // //           currency: product.currency_code,
// // // // // // //           is_collection_product: product.is_collection_product
// // // // // // //         });
// // // // // // //       });
      
// // // // // // //       return json({
// // // // // // //         success: true,
// // // // // // //         products: products,
// // // // // // //       });
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Collection Products fetch error:", error);
// // // // // // //       return json({ 
// // // // // // //         success: false, 
// // // // // // //         error: "Failed to load collection products" 
// // // // // // //       }, { status: 500 });
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // VIDEO LOADING LOGIC
// // // // // // //   try {
// // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // // //     if (!session?.id) {
// // // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // //     }

// // // // // // //     // Get shop currency
// // // // // // //     const storeCurrency = await getShopCurrency(admin, session);

// // // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // // //       where: { 
// // // // // // //         sessionId: session.id 
// // // // // // //       },
// // // // // // //       select: { 
// // // // // // //         id: true,
// // // // // // //         shopify_file_url: true, 
// // // // // // //         title: true, 
// // // // // // //         description: true,
// // // // // // //         duration: true,
// // // // // // //         download_count: true
// // // // // // //       },
// // // // // // //     });

// // // // // // //     console.log("✅ Found videos:", videos.length);

// // // // // // //     // Format the response
// // // // // // //     const formattedVideos = videos.map(video => ({
// // // // // // //       id: video.id,
// // // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // // //       title: video.title,
// // // // // // //       description: video.description,
// // // // // // //       duration: video.duration || 0,
// // // // // // //       download_count: video.download_count || 0,
// // // // // // //       user_has_liked: false,
// // // // // // //       user_has_shared: false,
// // // // // // //       user_has_saved: false,
// // // // // // //       like_count: 0,
// // // // // // //       share_count: 0,
// // // // // // //       save_count: 0,
// // // // // // //       comment_count: 0,
// // // // // // //       store_currency: storeCurrency
// // // // // // //     }));

// // // // // // //     return json({ 
// // // // // // //       success: true, 
// // // // // // //       videos: formattedVideos,
// // // // // // //       store_currency: storeCurrency
// // // // // // //     });

// // // // // // //   } catch (error) {
// // // // // // //     console.error("❌ Loader error:", error);
// // // // // // //     return json({ 
// // // // // // //       success: false, 
// // // // // // //       error: error.message 
// // // // // // //     }, { status: 500 });
// // // // // // //   } finally {
// // // // // // //     await prisma.$disconnect();
// // // // // // //   }
// // // // // // // }

// // // // // // // // ACTION HANDLER (keep the same as before)
// // // // // // // export async function action({ request }) {
// // // // // // //   console.log("🔄 Action function called");
  
// // // // // // //   try {
// // // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // // //     if (!session?.id) {
// // // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // // //     }

// // // // // // //     // Get current user info
// // // // // // //     let currentUser;
// // // // // // //     let userId = "anonymous";
    
// // // // // // //     try {
// // // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // // //         session: session,
// // // // // // //       });
// // // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // // //       console.log("👤 User ID:", userId);
// // // // // // //     } catch (error) {
// // // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // // //     }

// // // // // // //     const formData = await request.formData();
// // // // // // //     const actionType = formData.get('actionType');
// // // // // // //     const mediaFileId = formData.get('mediaFileId');
// // // // // // //     const comment = formData.get('comment');

// // // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // // //     // Validate mediaFileId
// // // // // // //     if (!mediaFileId || isNaN(parseInt(mediaFileId))) {
// // // // // // //       return json({ success: false, error: 'Invalid media file ID' }, { status: 400 });
// // // // // // //     }

// // // // // // //     const parsedMediaFileId = parseInt(mediaFileId);

// // // // // // //     switch (actionType) {
// // // // // // //       case 'like':
// // // // // // //         return await handleLike(session.id, parsedMediaFileId, userId);
      
// // // // // // //       case 'unlike':
// // // // // // //         return await handleUnlike(session.id, parsedMediaFileId, userId);
      
// // // // // // //       case 'save':
// // // // // // //         return await handleSave(session.id, parsedMediaFileId, userId);
      
// // // // // // //       case 'unsave':
// // // // // // //         return await handleUnsave(session.id, parsedMediaFileId, userId);
      
// // // // // // //       case 'share':
// // // // // // //         return await handleShare(session.id, parsedMediaFileId, userId);
      
// // // // // // //       case 'comment':
// // // // // // //         if (!currentUser) {
// // // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // // //         }
// // // // // // //         if (!comment || comment.trim().length === 0) {
// // // // // // //           return json({ success: false, error: "Comment cannot be empty" }, { status: 400 });
// // // // // // //         }
// // // // // // //         return await handleComment(session.id, parsedMediaFileId, userId, comment, currentUser);
      
// // // // // // //       case 'download':
// // // // // // //         return await handleDownload(parsedMediaFileId);
      
// // // // // // //       case 'getComments':
// // // // // // //         return await getComments(parsedMediaFileId);
      
// // // // // // //       case 'getSavedVideos':
// // // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // // //       default:
// // // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // // //     }
// // // // // // //   } catch (error) {
// // // // // // //     console.error('❌ Action error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // // HANDLER FUNCTIONS (keep the same as before)
// // // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // // //   try {
// // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // //       where: {
// // // // // // //         userId_mediaFileId: {
// // // // // // //           userId,
// // // // // // //           mediaFileId
// // // // // // //         }
// // // // // // //       },
// // // // // // //       update: {
// // // // // // //         liked: true
// // // // // // //       },
// // // // // // //       create: {
// // // // // // //         sessionId,
// // // // // // //         mediaFileId,
// // // // // // //         userId,
// // // // // // //         liked: true
// // // // // // //       }
// // // // // // //     });

// // // // // // //     return json({ success: true, liked: true });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Like error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // // //   try {
// // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // //       where: {
// // // // // // //         userId,
// // // // // // //         mediaFileId
// // // // // // //       },
// // // // // // //       data: {
// // // // // // //         liked: false
// // // // // // //       }
// // // // // // //     });

// // // // // // //     return json({ success: true, liked: false });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Unlike error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // // //   try {
// // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // //       where: {
// // // // // // //         userId_mediaFileId: {
// // // // // // //           userId,
// // // // // // //           mediaFileId
// // // // // // //         }
// // // // // // //       },
// // // // // // //       update: {
// // // // // // //         saved: true
// // // // // // //       },
// // // // // // //       create: {
// // // // // // //         sessionId,
// // // // // // //         mediaFileId,
// // // // // // //         userId,
// // // // // // //         saved: true
// // // // // // //       }
// // // // // // //     });

// // // // // // //     return json({ success: true, saved: true });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Save error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // // //   try {
// // // // // // //     await prisma.videoEngagement.updateMany({
// // // // // // //       where: {
// // // // // // //         userId,
// // // // // // //         mediaFileId
// // // // // // //       },
// // // // // // //       data: {
// // // // // // //         saved: false
// // // // // // //       }
// // // // // // //     });

// // // // // // //     return json({ success: true, saved: false });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Unsave error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // // //   try {
// // // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // // //       where: {
// // // // // // //         userId_mediaFileId: {
// // // // // // //           userId,
// // // // // // //           mediaFileId
// // // // // // //         }
// // // // // // //       },
// // // // // // //       update: {
// // // // // // //         shared: true
// // // // // // //       },
// // // // // // //       create: {
// // // // // // //         sessionId,
// // // // // // //         mediaFileId,
// // // // // // //         userId,
// // // // // // //         shared: true
// // // // // // //       }
// // // // // // //     });

// // // // // // //     return json({ success: true, shared: true });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Share error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // // //   try {
// // // // // // //     const newComment = await prisma.videoComment.create({
// // // // // // //       data: {
// // // // // // //         sessionId,
// // // // // // //         mediaFileId,
// // // // // // //         userId,
// // // // // // //         userEmail: currentUser.email,
// // // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // // //         comment: comment
// // // // // // //       }
// // // // // // //     });

// // // // // // //     return json({ success: true, comment: newComment });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Comment error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // async function handleDownload(mediaFileId) {
// // // // // // //   try {
// // // // // // //     await prisma.mediaFile.update({
// // // // // // //       where: { id: mediaFileId },
// // // // // // //       data: {
// // // // // // //         download_count: {
// // // // // // //           increment: 1
// // // // // // //         }
// // // // // // //       }
// // // // // // //     });

// // // // // // //     return json({ success: true });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Download error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // async function getComments(mediaFileId) {
// // // // // // //   try {
// // // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // // //       where: { mediaFileId },
// // // // // // //       orderBy: { created_at: 'desc' }
// // // // // // //     });

// // // // // // //     return json({ success: true, comments });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Get comments error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // // //   try {
// // // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // // //       where: {
// // // // // // //         sessionId,
// // // // // // //         userId,
// // // // // // //         saved: true
// // // // // // //       },
// // // // // // //       include: {
// // // // // // //         mediaFile: true
// // // // // // //       },
// // // // // // //       orderBy: { updated_at: 'desc' }
// // // // // // //     });

// // // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // // //       id: engagement.mediaFile.id,
// // // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // // //       title: engagement.mediaFile.title,
// // // // // // //       description: engagement.mediaFile.description,
// // // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // // //     }));

// // // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Get saved videos error:', error);
// // // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // // //   }
// // // // // // // }





// // // // // // // app/routes/api.carousel-videos.jsx
// // // // // // import { json } from "@remix-run/node";
// // // // // // import { authenticate } from "../shopify.server";
// // // // // // import { PrismaClient } from "@prisma/client";

// // // // // // const prisma = new PrismaClient();

// // // // // // // Price formatting function
// // // // // // function formatPrice(price, currencyCode) {
// // // // // //   if (!price) return '0.00';
  
// // // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // // // //   if (isNaN(numericPrice)) return '0.00';
  
// // // // // //   if (currencyCode === 'PKR') {
// // // // // //     return new Intl.NumberFormat('en-PK', {
// // // // // //       minimumFractionDigits: 0,
// // // // // //       maximumFractionDigits: 0
// // // // // //     }).format(numericPrice);
// // // // // //   } else {
// // // // // //     return new Intl.NumberFormat('en-US', {
// // // // // //       minimumFractionDigits: 2,
// // // // // //       maximumFractionDigits: 2
// // // // // //     }).format(numericPrice);
// // // // // //   }
// // // // // // }

// // // // // // // Function to get shop currency
// // // // // // async function getShopCurrency(admin, session) {
// // // // // //   let storeCurrency = 'USD';
  
// // // // // //   try {
// // // // // //     const shop = await admin.rest.resources.Shop.all({
// // // // // //       session: session,
// // // // // //       fields: 'currency',
// // // // // //     });
    
// // // // // //     if (shop && shop.data && shop.data.length > 0) {
// // // // // //       storeCurrency = shop.data[0].currency || 'USD';
// // // // // //       console.log("💰 Store currency:", storeCurrency);
// // // // // //     }
// // // // // //   } catch (shopError) {
// // // // // //     console.log("❌ Shop currency fetch error:", shopError.message);
// // // // // //   }
  
// // // // // //   return storeCurrency;
// // // // // // }

// // // // // // // DEBUG: Check video-collection relationships
// // // // // // async function debugVideoCollectionRelationship(videoId) {
// // // // // //   try {
// // // // // //     console.log("🔍 DEBUG: Checking video-collection relationship for video:", videoId);
    
// // // // // //     const relationships = await prisma.videoCollection.findMany({
// // // // // //       where: { video_id: parseInt(videoId) },
// // // // // //       include: {
// // // // // //         collection: {
// // // // // //           select: {
// // // // // //             id: true,
// // // // // //             title: true,
// // // // // //             shopify_collection_id: true,
// // // // // //             shopify_collection_products_variant_ids: true
// // // // // //           }
// // // // // //         }
// // // // // //       }
// // // // // //     });

// // // // // //     console.log("🔍 DEBUG: Found relationships:", relationships.length);
    
// // // // // //     relationships.forEach((rel, index) => {
// // // // // //       console.log(`🔍 DEBUG: Relationship ${index + 1}:`, {
// // // // // //         video_id: rel.video_id,
// // // // // //         collection_id: rel.collection_id,
// // // // // //         collection_title: rel.collection.title,
// // // // // //         variant_ids_count: rel.collection.shopify_collection_products_variant_ids?.length || 0,
// // // // // //         has_variant_ids: !!rel.collection.shopify_collection_products_variant_ids?.length
// // // // // //       });
// // // // // //     });

// // // // // //     return relationships;
// // // // // //   } catch (error) {
// // // // // //     console.error("🔍 DEBUG: Error checking relationships:", error);
// // // // // //     return [];
// // // // // //   }
// // // // // // }

// // // // // // // Function to get products with variant IDs
// // // // // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // // // // //   try {
// // // // // //     // Get shop currency
// // // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // // // //       where: {
// // // // // //         video_id: parseInt(mediaFileId),
// // // // // //       },
// // // // // //       include: {
// // // // // //         product: true,
// // // // // //       },
// // // // // //     });

// // // // // //     const products = videoProducts.map(vp => vp.product);
// // // // // //     console.log("✅ Found products:", products.length);
    
// // // // // //     // Format products with variant IDs
// // // // // //     const formattedProducts = products.map(product => {
// // // // // //       console.log("🔍 Product data:", {
// // // // // //         id: product.id,
// // // // // //         title: product.title,
// // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // //         shopify_variant_id: product.shopify_variant_id,
// // // // // //         price: product.price
// // // // // //       });
      
// // // // // //       // Use the variant_id from your database (now that you've added shopify_variant_id)
// // // // // //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// // // // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // // // // //       console.log("💰 Formatted price:", formattedPrice);
// // // // // //       console.log("🆔 Variant ID to use:", variantId);
      
// // // // // //       return {
// // // // // //         id: product.id,
// // // // // //         title: product.title,
// // // // // //         variant_id: variantId,
// // // // // //         price: formattedPrice,
// // // // // //         currency_code: storeCurrency,
// // // // // //         image_url: product.image_url,
// // // // // //         shopify_product_id: product.shopify_product_id,
// // // // // //         shopify_variant_id: product.shopify_variant_id
// // // // // //       };
// // // // // //     });
    
// // // // // //     return formattedProducts;
// // // // // //   } catch (error) {
// // // // // //     console.error("❌ Products fetch error:", error);
// // // // // //     return [];
// // // // // //   }
// // // // // // }

// // // // // // // Function to get collection products with variant IDs - DEBUG VERSION
// // // // // // async function getCollectionProductsForMediaFile(mediaFileId, admin, session) {
// // // // // //   try {
// // // // // //     console.log("🔄 DEBUG: Starting collection products fetch for video:", mediaFileId);
    
// // // // // //     // Get shop currency
// // // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // // //     // 1. First, check if video exists
// // // // // //     const video = await prisma.mediaFile.findUnique({
// // // // // //       where: { id: parseInt(mediaFileId) }
// // // // // //     });
    
// // // // // //     if (!video) {
// // // // // //       console.log("❌ DEBUG: Video not found");
// // // // // //       return [];
// // // // // //     }
// // // // // //     console.log("✅ DEBUG: Video found:", video.title);

// // // // // //     // 2. Check collections linked to this video
// // // // // //     const videoCollections = await prisma.videoCollection.findMany({
// // // // // //       where: {
// // // // // //         video_id: parseInt(mediaFileId),
// // // // // //       },
// // // // // //       include: {
// // // // // //         collection: true,
// // // // // //       },
// // // // // //     });

// // // // // //     console.log("✅ DEBUG: Found video-collection links:", videoCollections.length);
    
// // // // // //     if (videoCollections.length === 0) {
// // // // // //       console.log("❌ DEBUG: No collections linked to this video");
// // // // // //       return [];
// // // // // //     }

// // // // // //     const collections = videoCollections.map(vc => vc.collection);
    
// // // // // //     // 3. Check if collections have variant IDs
// // // // // //     let allVariantGIDs = [];
// // // // // //     collections.forEach((coll, index) => {
// // // // // //       console.log(`🔍 DEBUG: Collection ${index + 1}:`, {
// // // // // //         title: coll.title,
// // // // // //         variant_ids_count: coll.shopify_collection_products_variant_ids?.length || 0,
// // // // // //         has_variant_ids: !!coll.shopify_collection_products_variant_ids?.length
// // // // // //       });
      
// // // // // //       if (coll.shopify_collection_products_variant_ids && 
// // // // // //           Array.isArray(coll.shopify_collection_products_variant_ids)) {
// // // // // //         allVariantGIDs = [...allVariantGIDs, ...coll.shopify_collection_products_variant_ids];
// // // // // //       }
// // // // // //     });

// // // // // //     // Remove duplicates
// // // // // //     allVariantGIDs = [...new Set(allVariantGIDs)];
// // // // // //     console.log("✅ DEBUG: Total unique variant GIDs:", allVariantGIDs.length);

// // // // // //     if (allVariantGIDs.length === 0) {
// // // // // //       console.log("❌ DEBUG: No variant IDs found in any collections");
// // // // // //       return [];
// // // // // //     }

// // // // // //     console.log("📝 DEBUG: Sample variant IDs:", allVariantGIDs.slice(0, 3));

// // // // // //     // 4. Fetch product details from Shopify
// // // // // //     let products = [];
// // // // // //     const BATCH_SIZE = 50;
// // // // // //     const batches = [];
    
// // // // // //     for (let i = 0; i < allVariantGIDs.length; i += BATCH_SIZE) {
// // // // // //       batches.push(allVariantGIDs.slice(i, i + BATCH_SIZE));
// // // // // //     }

// // // // // //     console.log("🔄 DEBUG: Processing", batches.length, "batches");

// // // // // //     for (const [batchIndex, batch] of batches.entries()) {
// // // // // //       try {
// // // // // //         console.log(`🔄 DEBUG: Processing batch ${batchIndex + 1}/${batches.length}`);
        
// // // // // //         const variantsQuery = batch.map((gid, idx) => 
// // // // // //           `v${batchIndex}_${idx}: productVariant(id: "${gid}") {
// // // // // //             id
// // // // // //             title
// // // // // //             price {
// // // // // //               amount
// // // // // //               currencyCode
// // // // // //             }
// // // // // //             image {
// // // // // //               url
// // // // // //             }
// // // // // //             product {
// // // // // //               id
// // // // // //               title
// // // // // //               featuredImage {
// // // // // //                 url
// // // // // //               }
// // // // // //             }
// // // // // //           }`
// // // // // //         ).join('\n');

// // // // // //         const response = await admin.graphql(`
// // // // // //           query {
// // // // // //             ${variantsQuery}
// // // // // //           }
// // // // // //         `);

// // // // // //         const data = await response.json();
        
// // // // // //         if (data.errors) {
// // // // // //           console.error("❌ DEBUG: GraphQL errors in batch:", data.errors);
// // // // // //           continue;
// // // // // //         }

// // // // // //         // Process variants
// // // // // //         Object.values(data.data).forEach(variant => {
// // // // // //           if (variant && variant.id) {
// // // // // //             const variantId = variant.id.replace('gid://shopify/ProductVariant/', '');
// // // // // //             const productId = variant.product.id.replace('gid://shopify/Product/', '');
            
// // // // // //             products.push({
// // // // // //               id: `collection_${variantId}`,
// // // // // //               title: `${variant.product.title} - ${variant.title}`,
// // // // // //               shopify_product_id: productId,
// // // // // //               shopify_variant_id: variantId,
// // // // // //               price: parseFloat(variant.price.amount),
// // // // // //               image_url: variant.image?.url || variant.product.featuredImage?.url,
// // // // // //               currency_code: variant.price.currencyCode || storeCurrency,
// // // // // //               is_collection_product: true
// // // // // //             });
// // // // // //           }
// // // // // //         });

// // // // // //       } catch (batchError) {
// // // // // //         console.error(`❌ DEBUG: Batch ${batchIndex + 1} error:`, batchError);
// // // // // //         continue;
// // // // // //       }
// // // // // //     }

// // // // // //     console.log("✅ DEBUG: Successfully fetched", products.length, "collection products");
    
// // // // // //     // Remove duplicates
// // // // // //     const uniqueProducts = [...new Map(products.map(p => [p.shopify_variant_id, p])).values()];
// // // // // //     console.log("✅ DEBUG: Final unique collection products:", uniqueProducts.length);

// // // // // //     return uniqueProducts;

// // // // // //   } catch (error) {
// // // // // //     console.error("❌ DEBUG: Collection Products fetch error:", error);
// // // // // //     return [];
// // // // // //   }
// // // // // // }

// // // // // // export async function loader({ request }) {
// // // // // //   console.log("🔄 Loader function called");
// // // // // //   console.log("📝 Request URL:", request.url);

// // // // // //   const url = new URL(request.url);
// // // // // //   const action = url.searchParams.get("action");
// // // // // //   const mediaFileId = url.searchParams.get("mediaFileId");
// // // // // //   const shopParam = url.searchParams.get("shop");

// // // // // //   console.log("🔍 Query parameters:", { action, mediaFileId, shopParam });

// // // // // //   // Handle product requests
// // // // // //   if (action === "getProducts" && mediaFileId) {
// // // // // //     try {
// // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // //       if (!session?.id) {
// // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // //       }

// // // // // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // //       console.log("📦 Final products being returned:");
// // // // // //       products.forEach((product, index) => {
// // // // // //         console.log(`  Product ${index + 1}:`, {
// // // // // //           title: product.title,
// // // // // //           variant_id: product.variant_id,
// // // // // //           price: product.price,
// // // // // //           currency: product.currency_code
// // // // // //         });
// // // // // //       });
      
// // // // // //       return json({
// // // // // //         success: true,
// // // // // //         products: products,
// // // // // //       });
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Products fetch error:", error);
// // // // // //       return json({ 
// // // // // //         success: false, 
// // // // // //         error: "Failed to load products" 
// // // // // //       }, { status: 500 });
// // // // // //     }
// // // // // //   }

// // // // // //   // Handle collection product requests - DEBUG VERSION
// // // // // //   if (action === "getCollectionProducts" && mediaFileId) {
// // // // // //     try {
// // // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // // //       if (!session?.id) {
// // // // // //         console.error("❌ No session found - app may not be installed");
// // // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // // //       }

// // // // // //       const products = await getCollectionProductsForMediaFile(mediaFileId, admin, session);
      
// // // // // //       console.log("📦 Final collection products being returned:");
// // // // // //       products.forEach((product, index) => {
// // // // // //         console.log(`  Collection Product ${index + 1}:`, {
// // // // // //           title: product.title,
// // // // // //           variant_id: product.variant_id,
// // // // // //           price: product.price,
// // // // // //           currency: product.currency_code,
// // // // // //           is_collection_product: product.is_collection_product
// // // // // //         });
// // // // // //       });
      
// // // // // //       return json({
// // // // // //         success: true,
// // // // // //         products: products,
// // // // // //       });
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Collection Products fetch error:", error);
// // // // // //       return json({ 
// // // // // //         success: false, 
// // // // // //         error: "Failed to load collection products" 
// // // // // //       }, { status: 500 });
// // // // // //     }
// // // // // //   }

// // // // // //   // VIDEO LOADING LOGIC
// // // // // //   try {
// // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // // // //     console.log("🔑 Session ID:", session?.id);

// // // // // //     if (!session?.id) {
// // // // // //       console.error("❌ No session found - app may not be installed");
// // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // //     }

// // // // // //     // Get shop currency
// // // // // //     const storeCurrency = await getShopCurrency(admin, session);

// // // // // //     console.log("📦 Fetching videos from database...");
    
// // // // // //     const videos = await prisma.mediaFile.findMany({
// // // // // //       where: { 
// // // // // //         sessionId: session.id 
// // // // // //       },
// // // // // //       select: { 
// // // // // //         id: true,
// // // // // //         shopify_file_url: true, 
// // // // // //         title: true, 
// // // // // //         description: true,
// // // // // //         duration: true,
// // // // // //         download_count: true
// // // // // //       },
// // // // // //     });

// // // // // //     console.log("✅ Found videos:", videos.length);

// // // // // //     // Format the response
// // // // // //     const formattedVideos = videos.map(video => ({
// // // // // //       id: video.id,
// // // // // //       shopify_file_url: video.shopify_file_url,
// // // // // //       title: video.title,
// // // // // //       description: video.description,
// // // // // //       duration: video.duration || 0,
// // // // // //       download_count: video.download_count || 0,
// // // // // //       user_has_liked: false,
// // // // // //       user_has_shared: false,
// // // // // //       user_has_saved: false,
// // // // // //       like_count: 0,
// // // // // //       share_count: 0,
// // // // // //       save_count: 0,
// // // // // //       comment_count: 0,
// // // // // //       store_currency: storeCurrency
// // // // // //     }));

// // // // // //     return json({ 
// // // // // //       success: true, 
// // // // // //       videos: formattedVideos,
// // // // // //       store_currency: storeCurrency
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error("❌ Loader error:", error);
// // // // // //     return json({ 
// // // // // //       success: false, 
// // // // // //       error: error.message 
// // // // // //     }, { status: 500 });
// // // // // //   } finally {
// // // // // //     await prisma.$disconnect();
// // // // // //   }
// // // // // // }

// // // // // // // ACTION HANDLER (keep the same as before)
// // // // // // export async function action({ request }) {
// // // // // //   console.log("🔄 Action function called");
  
// // // // // //   try {
// // // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // // //     if (!session?.id) {
// // // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // // //     }

// // // // // //     // Get current user info
// // // // // //     let currentUser;
// // // // // //     let userId = "anonymous";
    
// // // // // //     try {
// // // // // //       currentUser = await admin.rest.resources.User.current({
// // // // // //         session: session,
// // // // // //       });
// // // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // // //       console.log("👤 User ID:", userId);
// // // // // //     } catch (error) {
// // // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // // //     }

// // // // // //     const formData = await request.formData();
// // // // // //     const actionType = formData.get('actionType');
// // // // // //     const mediaFileId = formData.get('mediaFileId');
// // // // // //     const comment = formData.get('comment');

// // // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // // //     // Validate mediaFileId
// // // // // //     if (!mediaFileId || isNaN(parseInt(mediaFileId))) {
// // // // // //       return json({ success: false, error: 'Invalid media file ID' }, { status: 400 });
// // // // // //     }

// // // // // //     const parsedMediaFileId = parseInt(mediaFileId);

// // // // // //     switch (actionType) {
// // // // // //       case 'like':
// // // // // //         return await handleLike(session.id, parsedMediaFileId, userId);
      
// // // // // //       case 'unlike':
// // // // // //         return await handleUnlike(session.id, parsedMediaFileId, userId);
      
// // // // // //       case 'save':
// // // // // //         return await handleSave(session.id, parsedMediaFileId, userId);
      
// // // // // //       case 'unsave':
// // // // // //         return await handleUnsave(session.id, parsedMediaFileId, userId);
      
// // // // // //       case 'share':
// // // // // //         return await handleShare(session.id, parsedMediaFileId, userId);
      
// // // // // //       case 'comment':
// // // // // //         if (!currentUser) {
// // // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // // //         }
// // // // // //         if (!comment || comment.trim().length === 0) {
// // // // // //           return json({ success: false, error: "Comment cannot be empty" }, { status: 400 });
// // // // // //         }
// // // // // //         return await handleComment(session.id, parsedMediaFileId, userId, comment, currentUser);
      
// // // // // //       case 'download':
// // // // // //         return await handleDownload(parsedMediaFileId);
      
// // // // // //       case 'getComments':
// // // // // //         return await getComments(parsedMediaFileId);
      
// // // // // //       case 'getSavedVideos':
// // // // // //         return await getSavedVideos(session.id, userId);
      
// // // // // //       default:
// // // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // // //     }
// // // // // //   } catch (error) {
// // // // // //     console.error('❌ Action error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // // HANDLER FUNCTIONS (keep the same as before)
// // // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // // //   try {
// // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // //       where: {
// // // // // //         userId_mediaFileId: {
// // // // // //           userId,
// // // // // //           mediaFileId
// // // // // //         }
// // // // // //       },
// // // // // //       update: {
// // // // // //         liked: true
// // // // // //       },
// // // // // //       create: {
// // // // // //         sessionId,
// // // // // //         mediaFileId,
// // // // // //         userId,
// // // // // //         liked: true
// // // // // //       }
// // // // // //     });

// // // // // //     return json({ success: true, liked: true });
// // // // // //   } catch (error) {
// // // // // //     console.error('Like error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // // //   try {
// // // // // //     await prisma.videoEngagement.updateMany({
// // // // // //       where: {
// // // // // //         userId,
// // // // // //         mediaFileId
// // // // // //       },
// // // // // //       data: {
// // // // // //         liked: false
// // // // // //       }
// // // // // //     });

// // // // // //     return json({ success: true, liked: false });
// // // // // //   } catch (error) {
// // // // // //     console.error('Unlike error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // // //   try {
// // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // //       where: {
// // // // // //         userId_mediaFileId: {
// // // // // //           userId,
// // // // // //           mediaFileId
// // // // // //         }
// // // // // //       },
// // // // // //       update: {
// // // // // //         saved: true
// // // // // //       },
// // // // // //       create: {
// // // // // //         sessionId,
// // // // // //         mediaFileId,
// // // // // //         userId,
// // // // // //         saved: true
// // // // // //       }
// // // // // //     });

// // // // // //     return json({ success: true, saved: true });
// // // // // //   } catch (error) {
// // // // // //     console.error('Save error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // // //   try {
// // // // // //     await prisma.videoEngagement.updateMany({
// // // // // //       where: {
// // // // // //         userId,
// // // // // //         mediaFileId
// // // // // //       },
// // // // // //       data: {
// // // // // //         saved: false
// // // // // //       }
// // // // // //     });

// // // // // //     return json({ success: true, saved: false });
// // // // // //   } catch (error) {
// // // // // //     console.error('Unsave error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // // //   try {
// // // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // // //       where: {
// // // // // //         userId_mediaFileId: {
// // // // // //           userId,
// // // // // //           mediaFileId
// // // // // //         }
// // // // // //       },
// // // // // //       update: {
// // // // // //         shared: true
// // // // // //       },
// // // // // //       create: {
// // // // // //         sessionId,
// // // // // //         mediaFileId,
// // // // // //         userId,
// // // // // //         shared: true
// // // // // //       }
// // // // // //     });

// // // // // //     return json({ success: true, shared: true });
// // // // // //   } catch (error) {
// // // // // //     console.error('Share error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // // //   try {
// // // // // //     const newComment = await prisma.videoComment.create({
// // // // // //       data: {
// // // // // //         sessionId,
// // // // // //         mediaFileId,
// // // // // //         userId,
// // // // // //         userEmail: currentUser.email,
// // // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // // //         comment: comment
// // // // // //       }
// // // // // //     });

// // // // // //     return json({ success: true, comment: newComment });
// // // // // //   } catch (error) {
// // // // // //     console.error('Comment error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // async function handleDownload(mediaFileId) {
// // // // // //   try {
// // // // // //     await prisma.mediaFile.update({
// // // // // //       where: { id: mediaFileId },
// // // // // //       data: {
// // // // // //         download_count: {
// // // // // //           increment: 1
// // // // // //         }
// // // // // //       }
// // // // // //     });

// // // // // //     return json({ success: true });
// // // // // //   } catch (error) {
// // // // // //     console.error('Download error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // async function getComments(mediaFileId) {
// // // // // //   try {
// // // // // //     const comments = await prisma.videoComment.findMany({
// // // // // //       where: { mediaFileId },
// // // // // //       orderBy: { created_at: 'desc' }
// // // // // //     });

// // // // // //     return json({ success: true, comments });
// // // // // //   } catch (error) {
// // // // // //     console.error('Get comments error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // async function getSavedVideos(sessionId, userId) {
// // // // // //   try {
// // // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // // //       where: {
// // // // // //         sessionId,
// // // // // //         userId,
// // // // // //         saved: true
// // // // // //       },
// // // // // //       include: {
// // // // // //         mediaFile: true
// // // // // //       },
// // // // // //       orderBy: { updated_at: 'desc' }
// // // // // //     });

// // // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // // //       id: engagement.mediaFile.id,
// // // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // // //       title: engagement.mediaFile.title,
// // // // // //       description: engagement.mediaFile.description,
// // // // // //       duration: engagement.mediaFile.duration || 0
// // // // // //     }));

// // // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // // //   } catch (error) {
// // // // // //     console.error('Get saved videos error:', error);
// // // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // // //   }
// // // // // // }






// // // // // // app/routes/api.carousel-videos.jsx
// // // // // import { json } from "@remix-run/node";
// // // // // import { authenticate } from "../shopify.server";
// // // // // import { PrismaClient } from "@prisma/client";

// // // // // const prisma = new PrismaClient();

// // // // // // Price formatting function
// // // // // function formatPrice(price, currencyCode) {
// // // // //   if (!price) return '0.00';
  
// // // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // // //   if (isNaN(numericPrice)) return '0.00';
  
// // // // //   if (currencyCode === 'PKR') {
// // // // //     return new Intl.NumberFormat('en-PK', {
// // // // //       minimumFractionDigits: 0,
// // // // //       maximumFractionDigits: 0
// // // // //     }).format(numericPrice);
// // // // //   } else {
// // // // //     return new Intl.NumberFormat('en-US', {
// // // // //       minimumFractionDigits: 2,
// // // // //       maximumFractionDigits: 2
// // // // //     }).format(numericPrice);
// // // // //   }
// // // // // }

// // // // // // Function to get shop currency
// // // // // async function getShopCurrency(admin, session) {
// // // // //   let storeCurrency = 'USD';
  
// // // // //   try {
// // // // //     const shop = await admin.rest.resources.Shop.all({
// // // // //       session: session,
// // // // //       fields: 'currency',
// // // // //     });
    
// // // // //     if (shop && shop.data && shop.data.length > 0) {
// // // // //       storeCurrency = shop.data[0].currency || 'USD';
// // // // //       console.log("💰 Store currency:", storeCurrency);
// // // // //     }
// // // // //   } catch (shopError) {
// // // // //     console.log("❌ Shop currency fetch error:", shopError.message);
// // // // //   }
  
// // // // //   return storeCurrency;
// // // // // }

// // // // // // DEBUG: Check video-collection relationships
// // // // // async function debugVideoCollectionRelationship(videoId) {
// // // // //   try {
// // // // //     console.log("🔍 DEBUG: Checking video-collection relationship for video:", videoId);
    
// // // // //     const relationships = await prisma.videoCollection.findMany({
// // // // //       where: { video_id: parseInt(videoId) },
// // // // //       include: {
// // // // //         collection: {
// // // // //           select: {
// // // // //             id: true,
// // // // //             title: true,
// // // // //             shopify_collection_id: true,
// // // // //             shopify_collection_products_variant_ids: true
// // // // //           }
// // // // //         }
// // // // //       }
// // // // //     });

// // // // //     console.log("🔍 DEBUG: Found relationships:", relationships.length);
    
// // // // //     relationships.forEach((rel, index) => {
// // // // //       console.log(`🔍 DEBUG: Relationship ${index + 1}:`, {
// // // // //         video_id: rel.video_id,
// // // // //         collection_id: rel.collection_id,
// // // // //         collection_title: rel.collection.title,
// // // // //         variant_ids_count: rel.collection.shopify_collection_products_variant_ids?.length || 0,
// // // // //         has_variant_ids: !!rel.collection.shopify_collection_products_variant_ids?.length
// // // // //       });
// // // // //     });

// // // // //     return relationships;
// // // // //   } catch (error) {
// // // // //     console.error("🔍 DEBUG: Error checking relationships:", error);
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // // Function to get products with variant IDs
// // // // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // // // //   try {
// // // // //     // Get shop currency
// // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // // //       where: {
// // // // //         video_id: parseInt(mediaFileId),
// // // // //       },
// // // // //       include: {
// // // // //         product: true,
// // // // //       },
// // // // //     });

// // // // //     const products = videoProducts.map(vp => vp.product);
// // // // //     console.log("✅ Found products:", products.length);
    
// // // // //     // Format products with variant IDs
// // // // //     const formattedProducts = products.map(product => {
// // // // //       console.log("🔍 Product data:", {
// // // // //         id: product.id,
// // // // //         title: product.title,
// // // // //         shopify_product_id: product.shopify_product_id,
// // // // //         shopify_variant_id: product.shopify_variant_id,
// // // // //         price: product.price
// // // // //       });
      
// // // // //       // Use the variant_id from your database (now that you've added shopify_variant_id)
// // // // //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// // // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // // // //       console.log("💰 Formatted price:", formattedPrice);
// // // // //       console.log("🆔 Variant ID to use:", variantId);
      
// // // // //       return {
// // // // //         id: product.id,
// // // // //         title: product.title,
// // // // //         variant_id: variantId,
// // // // //         price: formattedPrice,
// // // // //         currency_code: storeCurrency,
// // // // //         image_url: product.image_url,
// // // // //         shopify_product_id: product.shopify_product_id,
// // // // //         shopify_variant_id: product.shopify_variant_id
// // // // //       };
// // // // //     });
    
// // // // //     return formattedProducts;
// // // // //   } catch (error) {
// // // // //     console.error("❌ Products fetch error:", error);
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // // Function to get collection products with variant IDs - FIXED VERSION
// // // // // async function getCollectionProductsForMediaFile(mediaFileId, admin, session) {
// // // // //   try {
// // // // //     console.log("🔄 DEBUG: Starting collection products fetch for video:", mediaFileId);
    
// // // // //     // Get shop currency
// // // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // // //     // 1. First, check if video exists
// // // // //     const video = await prisma.mediaFile.findUnique({
// // // // //       where: { id: parseInt(mediaFileId) }
// // // // //     });
    
// // // // //     if (!video) {
// // // // //       console.log("❌ DEBUG: Video not found");
// // // // //       return [];
// // // // //     }
// // // // //     console.log("✅ DEBUG: Video found:", video.title);

// // // // //     // 2. Check collections linked to this video
// // // // //     const videoCollections = await prisma.videoCollection.findMany({
// // // // //       where: {
// // // // //         video_id: parseInt(mediaFileId),
// // // // //       },
// // // // //       include: {
// // // // //         collection: true,
// // // // //       },
// // // // //     });

// // // // //     console.log("✅ DEBUG: Found video-collection links:", videoCollections.length);
    
// // // // //     if (videoCollections.length === 0) {
// // // // //       console.log("❌ DEBUG: No collections linked to this video");
// // // // //       return [];
// // // // //     }

// // // // //     const collections = videoCollections.map(vc => vc.collection);
    
// // // // //     // 3. Check if collections have variant IDs
// // // // //     let allVariantGIDs = [];
// // // // //     collections.forEach((coll, index) => {
// // // // //       console.log(`🔍 DEBUG: Collection ${index + 1}:`, {
// // // // //         title: coll.title,
// // // // //         variant_ids_count: coll.shopify_collection_products_variant_ids?.length || 0,
// // // // //         has_variant_ids: !!coll.shopify_collection_products_variant_ids?.length
// // // // //       });
      
// // // // //       if (coll.shopify_collection_products_variant_ids && 
// // // // //           Array.isArray(coll.shopify_collection_products_variant_ids) &&
// // // // //           coll.shopify_collection_products_variant_ids.length > 0) {
// // // // //         allVariantGIDs = [...allVariantGIDs, ...coll.shopify_collection_products_variant_ids];
// // // // //       } else {
// // // // //         console.log(`⚠️ Collection "${coll.title}" has no variant IDs`);
// // // // //       }
// // // // //     });

// // // // //     // Remove duplicates
// // // // //     allVariantGIDs = [...new Set(allVariantGIDs)];
// // // // //     console.log("✅ DEBUG: Total unique variant GIDs:", allVariantGIDs.length);

// // // // //     if (allVariantGIDs.length === 0) {
// // // // //       console.log("❌ DEBUG: No variant IDs found in any collections");
// // // // //       return [];
// // // // //     }

// // // // //     console.log("📝 DEBUG: Sample variant IDs:", allVariantGIDs.slice(0, 3));

// // // // //     // 4. Fetch product details from Shopify
// // // // //     let products = [];
// // // // //     const BATCH_SIZE = 10; // Reduced for safety
// // // // //     const batches = [];
    
// // // // //     for (let i = 0; i < allVariantGIDs.length; i += BATCH_SIZE) {
// // // // //       batches.push(allVariantGIDs.slice(i, i + BATCH_SIZE));
// // // // //     }

// // // // //     console.log("🔄 DEBUG: Processing", batches.length, "batches");

// // // // //     for (const [batchIndex, batch] of batches.entries()) {
// // // // //       try {
// // // // //         console.log(`🔄 DEBUG: Processing batch ${batchIndex + 1}/${batches.length}`);
        
// // // // //         const variantsQuery = batch.map((gid, idx) => 
// // // // //           `v${batchIndex}_${idx}: productVariant(id: "${gid}") {
// // // // //             id
// // // // //             title
// // // // //             price {
// // // // //               amount
// // // // //               currencyCode
// // // // //             }
// // // // //             image {
// // // // //               url
// // // // //             }
// // // // //             product {
// // // // //               id
// // // // //               title
// // // // //               featuredImage {
// // // // //                 url
// // // // //               }
// // // // //             }
// // // // //           }`
// // // // //         ).join('\n');

// // // // //         const response = await admin.graphql(`
// // // // //           query {
// // // // //             ${variantsQuery}
// // // // //           }
// // // // //         `);

// // // // //         const data = await response.json();
        
// // // // //         if (data.errors) {
// // // // //           console.error("❌ DEBUG: GraphQL errors in batch:", data.errors);
// // // // //           continue;
// // // // //         }

// // // // //         // Process variants
// // // // //         Object.values(data.data).forEach(variant => {
// // // // //           if (variant && variant.id) {
// // // // //             const variantId = variant.id.replace('gid://shopify/ProductVariant/', '');
// // // // //             const productId = variant.product.id.replace('gid://shopify/Product/', '');
            
// // // // //             products.push({
// // // // //               id: `collection_${variantId}`,
// // // // //               title: `${variant.product.title} - ${variant.title}`,
// // // // //               shopify_product_id: productId,
// // // // //               shopify_variant_id: variantId,
// // // // //               price: parseFloat(variant.price.amount),
// // // // //               image_url: variant.image?.url || variant.product.featuredImage?.url,
// // // // //               currency_code: variant.price.currencyCode || storeCurrency,
// // // // //               is_collection_product: true
// // // // //             });
// // // // //           }
// // // // //         });

// // // // //       } catch (batchError) {
// // // // //         console.error(`❌ DEBUG: Batch ${batchIndex + 1} error:`, batchError);
// // // // //         continue;
// // // // //       }
// // // // //     }

// // // // //     console.log("✅ DEBUG: Successfully fetched", products.length, "collection products");
    
// // // // //     // Remove duplicates
// // // // //     const uniqueProducts = [...new Map(products.map(p => [p.shopify_variant_id, p])).values()];
// // // // //     console.log("✅ DEBUG: Final unique collection products:", uniqueProducts.length);

// // // // //     return uniqueProducts;

// // // // //   } catch (error) {
// // // // //     console.error("❌ DEBUG: Collection Products fetch error:", error);
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // export async function loader({ request }) {
// // // // //   console.log("🔄 Loader function called");
// // // // //   console.log("📝 Request URL:", request.url);

// // // // //   const url = new URL(request.url);
// // // // //   const action = url.searchParams.get("action");
// // // // //   const mediaFileId = url.searchParams.get("mediaFileId");
// // // // //   const shopParam = url.searchParams.get("shop");

// // // // //   console.log("🔍 Query parameters:", { action, mediaFileId, shopParam });

// // // // //   // Handle product requests
// // // // //   if (action === "getProducts" && mediaFileId) {
// // // // //     try {
// // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // //       if (!session?.id) {
// // // // //         console.error("❌ No session found - app may not be installed");
// // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // //       }

// // // // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // // // //       console.log("📦 Final products being returned:");
// // // // //       products.forEach((product, index) => {
// // // // //         console.log(`  Product ${index + 1}:`, {
// // // // //           title: product.title,
// // // // //           variant_id: product.variant_id,
// // // // //           price: product.price,
// // // // //           currency: product.currency_code
// // // // //         });
// // // // //       });
      
// // // // //       return json({
// // // // //         success: true,
// // // // //         products: products,
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("❌ Products fetch error:", error);
// // // // //       return json({ 
// // // // //         success: false, 
// // // // //         error: "Failed to load products" 
// // // // //       }, { status: 500 });
// // // // //     }
// // // // //   }

// // // // //   // Handle collection product requests - FIXED
// // // // //   if (action === "getCollectionProducts" && mediaFileId) {
// // // // //     try {
// // // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // // //       if (!session?.id) {
// // // // //         console.error("❌ No session found - app may not be installed");
// // // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // // //       }

// // // // //       const products = await getCollectionProductsForMediaFile(mediaFileId, admin, session);
      
// // // // //       console.log("📦 Final collection products being returned:");
// // // // //       products.forEach((product, index) => {
// // // // //         console.log(`  Collection Product ${index + 1}:`, {
// // // // //           title: product.title,
// // // // //           variant_id: product.variant_id,
// // // // //           price: product.price,
// // // // //           currency: product.currency_code,
// // // // //           is_collection_product: product.is_collection_product
// // // // //         });
// // // // //       });
      
// // // // //       return json({
// // // // //         success: true,
// // // // //         products: products,
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("❌ Collection Products fetch error:", error);
// // // // //       return json({ 
// // // // //         success: false, 
// // // // //         error: "Failed to load collection products" 
// // // // //       }, { status: 500 });
// // // // //     }
// // // // //   }

// // // // //   // VIDEO LOADING LOGIC
// // // // //   try {
// // // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // // //     console.log("🔑 Session ID:", session?.id);

// // // // //     if (!session?.id) {
// // // // //       console.error("❌ No session found - app may not be installed");
// // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // //     }

// // // // //     // Get shop currency
// // // // //     const storeCurrency = await getShopCurrency(admin, session);

// // // // //     console.log("📦 Fetching videos from database...");
    
// // // // //     const videos = await prisma.mediaFile.findMany({
// // // // //       where: { 
// // // // //         sessionId: session.id 
// // // // //       },
// // // // //       select: { 
// // // // //         id: true,
// // // // //         shopify_file_url: true, 
// // // // //         title: true, 
// // // // //         description: true,
// // // // //         duration: true,
// // // // //         download_count: true
// // // // //       },
// // // // //     });

// // // // //     console.log("✅ Found videos:", videos.length);

// // // // //     // Format the response
// // // // //     const formattedVideos = videos.map(video => ({
// // // // //       id: video.id,
// // // // //       shopify_file_url: video.shopify_file_url,
// // // // //       title: video.title,
// // // // //       description: video.description,
// // // // //       duration: video.duration || 0,
// // // // //       download_count: video.download_count || 0,
// // // // //       user_has_liked: false,
// // // // //       user_has_shared: false,
// // // // //       user_has_saved: false,
// // // // //       like_count: 0,
// // // // //       share_count: 0,
// // // // //       save_count: 0,
// // // // //       comment_count: 0,
// // // // //       store_currency: storeCurrency
// // // // //     }));

// // // // //     return json({ 
// // // // //       success: true, 
// // // // //       videos: formattedVideos,
// // // // //       store_currency: storeCurrency
// // // // //     });

// // // // //   } catch (error) {
// // // // //     console.error("❌ Loader error:", error);
// // // // //     return json({ 
// // // // //       success: false, 
// // // // //       error: error.message 
// // // // //     }, { status: 500 });
// // // // //   } finally {
// // // // //     await prisma.$disconnect();
// // // // //   }
// // // // // }

// // // // // // ACTION HANDLER
// // // // // export async function action({ request }) {
// // // // //   console.log("🔄 Action function called");
  
// // // // //   try {
// // // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // // //     if (!session?.id) {
// // // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // // //     }

// // // // //     // Get current user info
// // // // //     let currentUser;
// // // // //     let userId = "anonymous";
    
// // // // //     try {
// // // // //       currentUser = await admin.rest.resources.User.current({
// // // // //         session: session,
// // // // //       });
// // // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // // //       console.log("👤 User ID:", userId);
// // // // //     } catch (error) {
// // // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // // //     }

// // // // //     const formData = await request.formData();
// // // // //     const actionType = formData.get('actionType');
// // // // //     const mediaFileId = formData.get('mediaFileId');
// // // // //     const comment = formData.get('comment');

// // // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // // //     // Validate mediaFileId
// // // // //     if (!mediaFileId || isNaN(parseInt(mediaFileId))) {
// // // // //       return json({ success: false, error: 'Invalid media file ID' }, { status: 400 });
// // // // //     }

// // // // //     const parsedMediaFileId = parseInt(mediaFileId);

// // // // //     switch (actionType) {
// // // // //       case 'like':
// // // // //         return await handleLike(session.id, parsedMediaFileId, userId);
      
// // // // //       case 'unlike':
// // // // //         return await handleUnlike(session.id, parsedMediaFileId, userId);
      
// // // // //       case 'save':
// // // // //         return await handleSave(session.id, parsedMediaFileId, userId);
      
// // // // //       case 'unsave':
// // // // //         return await handleUnsave(session.id, parsedMediaFileId, userId);
      
// // // // //       case 'share':
// // // // //         return await handleShare(session.id, parsedMediaFileId, userId);
      
// // // // //       case 'comment':
// // // // //         if (!currentUser) {
// // // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // // //         }
// // // // //         if (!comment || comment.trim().length === 0) {
// // // // //           return json({ success: false, error: "Comment cannot be empty" }, { status: 400 });
// // // // //         }
// // // // //         return await handleComment(session.id, parsedMediaFileId, userId, comment, currentUser);
      
// // // // //       case 'download':
// // // // //         return await handleDownload(parsedMediaFileId);
      
// // // // //       case 'getComments':
// // // // //         return await getComments(parsedMediaFileId);
      
// // // // //       case 'getSavedVideos':
// // // // //         return await getSavedVideos(session.id, userId);
      
// // // // //       default:
// // // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error('❌ Action error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // // HANDLER FUNCTIONS
// // // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // // //   try {
// // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // //       where: {
// // // // //         userId_mediaFileId: {
// // // // //           userId,
// // // // //           mediaFileId
// // // // //         }
// // // // //       },
// // // // //       update: {
// // // // //         liked: true
// // // // //       },
// // // // //       create: {
// // // // //         sessionId,
// // // // //         mediaFileId,
// // // // //         userId,
// // // // //         liked: true
// // // // //       }
// // // // //     });

// // // // //     return json({ success: true, liked: true });
// // // // //   } catch (error) {
// // // // //     console.error('Like error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // // //   try {
// // // // //     await prisma.videoEngagement.updateMany({
// // // // //       where: {
// // // // //         userId,
// // // // //         mediaFileId
// // // // //       },
// // // // //       data: {
// // // // //         liked: false
// // // // //       }
// // // // //     });

// // // // //     return json({ success: true, liked: false });
// // // // //   } catch (error) {
// // // // //     console.error('Unlike error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // // //   try {
// // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // //       where: {
// // // // //         userId_mediaFileId: {
// // // // //           userId,
// // // // //           mediaFileId
// // // // //         }
// // // // //       },
// // // // //       update: {
// // // // //         saved: true
// // // // //       },
// // // // //       create: {
// // // // //         sessionId,
// // // // //         mediaFileId,
// // // // //         userId,
// // // // //         saved: true
// // // // //       }
// // // // //     });

// // // // //     return json({ success: true, saved: true });
// // // // //   } catch (error) {
// // // // //     console.error('Save error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // // //   try {
// // // // //     await prisma.videoEngagement.updateMany({
// // // // //       where: {
// // // // //         userId,
// // // // //         mediaFileId
// // // // //       },
// // // // //       data: {
// // // // //         saved: false
// // // // //       }
// // // // //     });

// // // // //     return json({ success: true, saved: false });
// // // // //   } catch (error) {
// // // // //     console.error('Unsave error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // // //   try {
// // // // //     const engagement = await prisma.videoEngagement.upsert({
// // // // //       where: {
// // // // //         userId_mediaFileId: {
// // // // //           userId,
// // // // //           mediaFileId
// // // // //         }
// // // // //       },
// // // // //       update: {
// // // // //         shared: true
// // // // //       },
// // // // //       create: {
// // // // //         sessionId,
// // // // //         mediaFileId,
// // // // //         userId,
// // // // //         shared: true
// // // // //       }
// // // // //     });

// // // // //     return json({ success: true, shared: true });
// // // // //   } catch (error) {
// // // // //     console.error('Share error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // // //   try {
// // // // //     const newComment = await prisma.videoComment.create({
// // // // //       data: {
// // // // //         sessionId,
// // // // //         mediaFileId,
// // // // //         userId,
// // // // //         userEmail: currentUser.email,
// // // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // // //         comment: comment
// // // // //       }
// // // // //     });

// // // // //     return json({ success: true, comment: newComment });
// // // // //   } catch (error) {
// // // // //     console.error('Comment error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // async function handleDownload(mediaFileId) {
// // // // //   try {
// // // // //     await prisma.mediaFile.update({
// // // // //       where: { id: mediaFileId },
// // // // //       data: {
// // // // //         download_count: {
// // // // //           increment: 1
// // // // //         }
// // // // //       }
// // // // //     });

// // // // //     return json({ success: true });
// // // // //   } catch (error) {
// // // // //     console.error('Download error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // async function getComments(mediaFileId) {
// // // // //   try {
// // // // //     const comments = await prisma.videoComment.findMany({
// // // // //       where: { mediaFileId },
// // // // //       orderBy: { created_at: 'desc' }
// // // // //     });

// // // // //     return json({ success: true, comments });
// // // // //   } catch (error) {
// // // // //     console.error('Get comments error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // async function getSavedVideos(sessionId, userId) {
// // // // //   try {
// // // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // // //       where: {
// // // // //         sessionId,
// // // // //         userId,
// // // // //         saved: true
// // // // //       },
// // // // //       include: {
// // // // //         mediaFile: true
// // // // //       },
// // // // //       orderBy: { updated_at: 'desc' }
// // // // //     });

// // // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // // //       id: engagement.mediaFile.id,
// // // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // // //       title: engagement.mediaFile.title,
// // // // //       description: engagement.mediaFile.description,
// // // // //       duration: engagement.mediaFile.duration || 0
// // // // //     }));

// // // // //     return json({ success: true, savedVideos: formattedVideos });
// // // // //   } catch (error) {
// // // // //     console.error('Get saved videos error:', error);
// // // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // // //   }
// // // // // }





// // // // // app/routes/api.carousel-videos.jsx - DEBUG VERSION
// // // // import { json } from "@remix-run/node";
// // // // import { authenticate } from "../shopify.server";
// // // // import { PrismaClient } from "@prisma/client";

// // // // const prisma = new PrismaClient();

// // // // // Price formatting function
// // // // function formatPrice(price, currencyCode) {
// // // //   if (!price) return '0.00';
  
// // // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // // //   if (isNaN(numericPrice)) return '0.00';
  
// // // //   if (currencyCode === 'PKR') {
// // // //     return new Intl.NumberFormat('en-PK', {
// // // //       minimumFractionDigits: 0,
// // // //       maximumFractionDigits: 0
// // // //     }).format(numericPrice);
// // // //   } else {
// // // //     return new Intl.NumberFormat('en-US', {
// // // //       minimumFractionDigits: 2,
// // // //       maximumFractionDigits: 2
// // // //     }).format(numericPrice);
// // // //   }
// // // // }

// // // // // Function to get shop currency
// // // // async function getShopCurrency(admin, session) {
// // // //   let storeCurrency = 'USD';
  
// // // //   try {
// // // //     const shop = await admin.rest.resources.Shop.all({
// // // //       session: session,
// // // //       fields: 'currency',
// // // //     });
    
// // // //     if (shop && shop.data && shop.data.length > 0) {
// // // //       storeCurrency = shop.data[0].currency || 'USD';
// // // //       console.log("💰 Store currency:", storeCurrency);
// // // //     }
// // // //   } catch (shopError) {
// // // //     console.log("❌ Shop currency fetch error:", shopError.message);
// // // //   }
  
// // // //   return storeCurrency;
// // // // }

// // // // // DEBUG: Check ALL database relationships
// // // // async function debugDatabaseRelationships(mediaFileId) {
// // // //   try {
// // // //     console.log("🔍 DEBUG: Starting database investigation for video:", mediaFileId);
    
// // // //     // 1. Check if video exists
// // // //     const video = await prisma.mediaFile.findUnique({
// // // //       where: { id: parseInt(mediaFileId) }
// // // //     });
    
// // // //     if (!video) {
// // // //       console.log("❌ DEBUG: Video not found in database");
// // // //       return null;
// // // //     }
// // // //     console.log("✅ DEBUG: Video found:", { id: video.id, title: video.title });

// // // //     // 2. Check video-collection relationships
// // // //     const videoCollections = await prisma.videoCollection.findMany({
// // // //       where: { video_id: parseInt(mediaFileId) },
// // // //       include: { collection: true }
// // // //     });

// // // //     console.log("✅ DEBUG: Video-collection relationships:", videoCollections.length);
    
// // // //     if (videoCollections.length === 0) {
// // // //       console.log("❌ DEBUG: NO collections linked to this video!");
// // // //       return { video, collections: [] };
// // // //     }

// // // //     // 3. Check each collection's variant IDs
// // // //     const collectionsWithData = videoCollections.map(vc => ({
// // // //       relationship_id: vc.id,
// // // //       collection_id: vc.collection.id,
// // // //       collection_title: vc.collection.title,
// // // //       shopify_collection_id: vc.collection.shopify_collection_id,
// // // //       variant_ids: vc.collection.shopify_collection_products_variant_ids || [],
// // // //       variant_count: vc.collection.shopify_collection_products_variant_ids?.length || 0
// // // //     }));

// // // //     console.log("📊 DEBUG: Collection details:");
// // // //     collectionsWithData.forEach((coll, index) => {
// // // //       console.log(`   Collection ${index + 1}:`, {
// // // //         title: coll.collection_title,
// // // //         variant_count: coll.variant_count,
// // // //         has_variants: coll.variant_count > 0,
// // // //         sample_variants: coll.variant_ids.slice(0, 2)
// // // //       });
// // // //     });

// // // //     return { video, collections: collectionsWithData };

// // // //   } catch (error) {
// // // //     console.error("🔍 DEBUG: Database investigation error:", error);
// // // //     return null;
// // // //   }
// // // // }

// // // // // Function to get products with variant IDs
// // // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // // //   try {
// // // //     // Get shop currency
// // // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // // //     const videoProducts = await prisma.videoProduct.findMany({
// // // //       where: {
// // // //         video_id: parseInt(mediaFileId),
// // // //       },
// // // //       include: {
// // // //         product: true,
// // // //       },
// // // //     });

// // // //     const products = videoProducts.map(vp => vp.product);
// // // //     console.log("✅ Found products:", products.length);
    
// // // //     // Format products with variant IDs
// // // //     const formattedProducts = products.map(product => {
// // // //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// // // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // // //       return {
// // // //         id: product.id,
// // // //         title: product.title,
// // // //         variant_id: variantId,
// // // //         price: formattedPrice,
// // // //         currency_code: storeCurrency,
// // // //         image_url: product.image_url,
// // // //         shopify_product_id: product.shopify_product_id,
// // // //         shopify_variant_id: product.shopify_variant_id
// // // //       };
// // // //     });
    
// // // //     return formattedProducts;
// // // //   } catch (error) {
// // // //     console.error("❌ Products fetch error:", error);
// // // //     return [];
// // // //   }
// // // // }

// // // // // Function to get collection products with variant IDs - ULTRA DEBUG VERSION
// // // // async function getCollectionProductsForMediaFile(mediaFileId, admin, session) {
// // // //   try {
// // // //     console.log("🔄 ========== COLLECTION PRODUCTS DEBUG START ==========");
// // // //     console.log("🔄 DEBUG: Starting collection products fetch for video:", mediaFileId);
    
// // // //     // STEP 1: Database Investigation
// // // //     const dbInfo = await debugDatabaseRelationships(mediaFileId);
// // // //     if (!dbInfo || dbInfo.collections.length === 0) {
// // // //       console.log("❌ DEBUG: No collections found - returning empty array");
// // // //       return [];
// // // //     }

// // // //     // STEP 2: Check if any collections have variant IDs
// // // //     const collectionsWithVariants = dbInfo.collections.filter(coll => coll.variant_count > 0);
// // // //     console.log("✅ DEBUG: Collections with variant IDs:", collectionsWithVariants.length);
    
// // // //     if (collectionsWithVariants.length === 0) {
// // // //       console.log("❌ DEBUG: No collections have variant IDs stored!");
// // // //       console.log("💡 TIP: Check if collections are being saved properly with variant IDs");
// // // //       return [];
// // // //     }

// // // //     // STEP 3: Collect all variant IDs
// // // //     let allVariantGIDs = [];
// // // //     collectionsWithVariants.forEach(coll => {
// // // //       allVariantGIDs = [...allVariantGIDs, ...coll.variant_ids];
// // // //     });

// // // //     // Remove duplicates
// // // //     allVariantGIDs = [...new Set(allVariantGIDs)];
// // // //     console.log("✅ DEBUG: Total unique variant GIDs to fetch:", allVariantGIDs.length);

// // // //     if (allVariantGIDs.length === 0) {
// // // //       console.log("❌ DEBUG: No variant IDs to fetch after deduplication");
// // // //       return [];
// // // //     }

// // // //     console.log("📝 DEBUG: Sample variant IDs:", allVariantGIDs.slice(0, 3));

// // // //     // STEP 4: Fetch from Shopify
// // // //     const storeCurrency = await getShopCurrency(admin, session);
// // // //     let products = [];
    
// // // //     // Process in small batches to avoid GraphQL limits
// // // //     const BATCH_SIZE = 5;
// // // //     const batches = [];
    
// // // //     for (let i = 0; i < allVariantGIDs.length; i += BATCH_SIZE) {
// // // //       batches.push(allVariantGIDs.slice(i, i + BATCH_SIZE));
// // // //     }

// // // //     console.log("🔄 DEBUG: Processing", batches.length, "batches of variants");

// // // //     for (const [batchIndex, batch] of batches.entries()) {
// // // //       try {
// // // //         console.log(`🔄 DEBUG: Processing batch ${batchIndex + 1}/${batches.length}`);
        
// // // //         // Build GraphQL query for this batch
// // // //         const variantsQuery = batch.map((gid, idx) => 
// // // //           `v${batchIndex}_${idx}: productVariant(id: "${gid}") {
// // // //             id
// // // //             title
// // // //             price {
// // // //               amount
// // // //               currencyCode
// // // //             }
// // // //             image {
// // // //               url
// // // //             }
// // // //             product {
// // // //               id
// // // //               title
// // // //               featuredImage {
// // // //                 url
// // // //               }
// // // //             }
// // // //           }`
// // // //         ).join('\n');

// // // //         const response = await admin.graphql(`
// // // //           query {
// // // //             ${variantsQuery}
// // // //           }
// // // //         `);

// // // //         const data = await response.json();
        
// // // //         if (data.errors) {
// // // //           console.error("❌ DEBUG: GraphQL errors:", data.errors);
// // // //           continue;
// // // //         }

// // // //         // Process the response
// // // //         const variantData = data.data || {};
// // // //         console.log(`✅ DEBUG: Batch ${batchIndex + 1} returned`, Object.keys(variantData).length, "variants");

// // // //         Object.values(variantData).forEach((variant, variantIndex) => {
// // // //           if (variant && variant.id) {
// // // //             const variantId = variant.id.replace('gid://shopify/ProductVariant/', '');
// // // //             const productId = variant.product.id.replace('gid://shopify/Product/', '');
            
// // // //             products.push({
// // // //               id: `collection_${variantId}_${batchIndex}_${variantIndex}`,
// // // //               title: `${variant.product.title} - ${variant.title}`,
// // // //               shopify_product_id: productId,
// // // //               shopify_variant_id: variantId,
// // // //               price: parseFloat(variant.price.amount),
// // // //               image_url: variant.image?.url || variant.product.featuredImage?.url,
// // // //               currency_code: variant.price.currencyCode || storeCurrency,
// // // //               is_collection_product: true
// // // //             });
            
// // // //             console.log(`   ✅ Added product: ${variant.product.title} - ${variant.title}`);
// // // //           }
// // // //         });

// // // //       } catch (batchError) {
// // // //         console.error(`❌ DEBUG: Batch ${batchIndex + 1} error:`, batchError);
// // // //         continue;
// // // //       }
// // // //     }

// // // //     console.log("✅ DEBUG: Successfully processed all batches");
// // // //     console.log("✅ DEBUG: Total products fetched:", products.length);

// // // //     // Remove duplicates by variant ID
// // // //     const uniqueProducts = [...new Map(products.map(p => [p.shopify_variant_id, p])).values()];
// // // //     console.log("✅ DEBUG: Final unique collection products:", uniqueProducts.length);

// // // //     if (uniqueProducts.length === 0) {
// // // //       console.log("❌ DEBUG: No products were successfully fetched from Shopify");
// // // //       console.log("💡 TIP: Check if variant IDs are valid and accessible");
// // // //     }

// // // //     console.log("🔄 ========== COLLECTION PRODUCTS DEBUG END ==========");
// // // //     return uniqueProducts;

// // // //   } catch (error) {
// // // //     console.error("❌ DEBUG: Collection Products fetch error:", error);
// // // //     console.log("🔄 ========== COLLECTION PRODUCTS DEBUG END WITH ERROR ==========");
// // // //     return [];
// // // //   }
// // // // }

// // // // export async function loader({ request }) {
// // // //   console.log("🔄 Loader function called");
// // // //   console.log("📝 Request URL:", request.url);

// // // //   const url = new URL(request.url);
// // // //   const action = url.searchParams.get("action");
// // // //   const mediaFileId = url.searchParams.get("mediaFileId");
// // // //   const shopParam = url.searchParams.get("shop");

// // // //   console.log("🔍 Query parameters:", { action, mediaFileId, shopParam });

// // // //   // Handle product requests
// // // //   if (action === "getProducts" && mediaFileId) {
// // // //     try {
// // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // //       if (!session?.id) {
// // // //         console.error("❌ No session found - app may not be installed");
// // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // //       }

// // // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // // //       console.log("📦 Final products being returned:", products.length);
      
// // // //       return json({
// // // //         success: true,
// // // //         products: products,
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("❌ Products fetch error:", error);
// // // //       return json({ 
// // // //         success: false, 
// // // //         error: "Failed to load products" 
// // // //       }, { status: 500 });
// // // //     }
// // // //   }

// // // //   // Handle collection product requests - DEBUG VERSION
// // // //   if (action === "getCollectionProducts" && mediaFileId) {
// // // //     try {
// // // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // // //       if (!session?.id) {
// // // //         console.error("❌ No session found - app may not be installed");
// // // //         return json({ success: false, error: "No session" }, { status: 401 });
// // // //       }

// // // //       console.log("🎯 COLLECTION PRODUCTS API CALLED - START");
// // // //       const products = await getCollectionProductsForMediaFile(mediaFileId, admin, session);
      
// // // //       console.log("📦 Final collection products being returned:", products.length);
// // // //       console.log("🎯 COLLECTION PRODUCTS API CALLED - END");
      
// // // //       return json({
// // // //         success: true,
// // // //         products: products,
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("❌ Collection Products fetch error:", error);
// // // //       return json({ 
// // // //         success: false, 
// // // //         error: "Failed to load collection products" 
// // // //       }, { status: 500 });
// // // //     }
// // // //   }

// // // //   // VIDEO LOADING LOGIC
// // // //   try {
// // // //     const { session, admin } = await authenticate.public.appProxy(request);
// // // //     console.log("🔑 Session ID:", session?.id);

// // // //     if (!session?.id) {
// // // //       console.error("❌ No session found - app may not be installed");
// // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // //     }

// // // //     // Get shop currency
// // // //     const storeCurrency = await getShopCurrency(admin, session);

// // // //     console.log("📦 Fetching videos from database...");
    
// // // //     const videos = await prisma.mediaFile.findMany({
// // // //       where: { 
// // // //         sessionId: session.id 
// // // //       },
// // // //       select: { 
// // // //         id: true,
// // // //         shopify_file_url: true, 
// // // //         title: true, 
// // // //         description: true,
// // // //         duration: true,
// // // //         download_count: true
// // // //       },
// // // //     });

// // // //     console.log("✅ Found videos:", videos.length);

// // // //     // Format the response
// // // //     const formattedVideos = videos.map(video => ({
// // // //       id: video.id,
// // // //       shopify_file_url: video.shopify_file_url,
// // // //       title: video.title,
// // // //       description: video.description,
// // // //       duration: video.duration || 0,
// // // //       download_count: video.download_count || 0,
// // // //       user_has_liked: false,
// // // //       user_has_shared: false,
// // // //       user_has_saved: false,
// // // //       like_count: 0,
// // // //       share_count: 0,
// // // //       save_count: 0,
// // // //       comment_count: 0,
// // // //       store_currency: storeCurrency
// // // //     }));

// // // //     return json({ 
// // // //       success: true, 
// // // //       videos: formattedVideos,
// // // //       store_currency: storeCurrency
// // // //     });

// // // //   } catch (error) {
// // // //     console.error("❌ Loader error:", error);
// // // //     return json({ 
// // // //       success: false, 
// // // //       error: error.message 
// // // //     }, { status: 500 });
// // // //   } finally {
// // // //     await prisma.$disconnect();
// // // //   }
// // // // }

// // // // // ACTION HANDLER (keep the same)
// // // // export async function action({ request }) {
// // // //   console.log("🔄 Action function called");
  
// // // //   try {
// // // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // // //     if (!session?.id) {
// // // //       return json({ success: false, error: "No session" }, { status: 401 });
// // // //     }

// // // //     // Get current user info
// // // //     let currentUser;
// // // //     let userId = "anonymous";
    
// // // //     try {
// // // //       currentUser = await admin.rest.resources.User.current({
// // // //         session: session,
// // // //       });
// // // //       userId = currentUser?.id?.toString() || "anonymous";
// // // //       console.log("👤 User ID:", userId);
// // // //     } catch (error) {
// // // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // // //     }

// // // //     const formData = await request.formData();
// // // //     const actionType = formData.get('actionType');
// // // //     const mediaFileId = formData.get('mediaFileId');
// // // //     const comment = formData.get('comment');

// // // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // // //     // Validate mediaFileId
// // // //     if (!mediaFileId || isNaN(parseInt(mediaFileId))) {
// // // //       return json({ success: false, error: 'Invalid media file ID' }, { status: 400 });
// // // //     }

// // // //     const parsedMediaFileId = parseInt(mediaFileId);

// // // //     switch (actionType) {
// // // //       case 'like':
// // // //         return await handleLike(session.id, parsedMediaFileId, userId);
      
// // // //       case 'unlike':
// // // //         return await handleUnlike(session.id, parsedMediaFileId, userId);
      
// // // //       case 'save':
// // // //         return await handleSave(session.id, parsedMediaFileId, userId);
      
// // // //       case 'unsave':
// // // //         return await handleUnsave(session.id, parsedMediaFileId, userId);
      
// // // //       case 'share':
// // // //         return await handleShare(session.id, parsedMediaFileId, userId);
      
// // // //       case 'comment':
// // // //         if (!currentUser) {
// // // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // // //         }
// // // //         if (!comment || comment.trim().length === 0) {
// // // //           return json({ success: false, error: "Comment cannot be empty" }, { status: 400 });
// // // //         }
// // // //         return await handleComment(session.id, parsedMediaFileId, userId, comment, currentUser);
      
// // // //       case 'download':
// // // //         return await handleDownload(parsedMediaFileId);
      
// // // //       case 'getComments':
// // // //         return await getComments(parsedMediaFileId);
      
// // // //       case 'getSavedVideos':
// // // //         return await getSavedVideos(session.id, userId);
      
// // // //       default:
// // // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // // //     }
// // // //   } catch (error) {
// // // //     console.error('❌ Action error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // // HANDLER FUNCTIONS (keep the same)
// // // // async function handleLike(sessionId, mediaFileId, userId) {
// // // //   try {
// // // //     const engagement = await prisma.videoEngagement.upsert({
// // // //       where: {
// // // //         userId_mediaFileId: {
// // // //           userId,
// // // //           mediaFileId
// // // //         }
// // // //       },
// // // //       update: {
// // // //         liked: true
// // // //       },
// // // //       create: {
// // // //         sessionId,
// // // //         mediaFileId,
// // // //         userId,
// // // //         liked: true
// // // //       }
// // // //     });

// // // //     return json({ success: true, liked: true });
// // // //   } catch (error) {
// // // //     console.error('Like error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // // //   try {
// // // //     await prisma.videoEngagement.updateMany({
// // // //       where: {
// // // //         userId,
// // // //         mediaFileId
// // // //       },
// // // //       data: {
// // // //         liked: false
// // // //       }
// // // //     });

// // // //     return json({ success: true, liked: false });
// // // //   } catch (error) {
// // // //     console.error('Unlike error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // async function handleSave(sessionId, mediaFileId, userId) {
// // // //   try {
// // // //     const engagement = await prisma.videoEngagement.upsert({
// // // //       where: {
// // // //         userId_mediaFileId: {
// // // //           userId,
// // // //           mediaFileId
// // // //         }
// // // //       },
// // // //       update: {
// // // //         saved: true
// // // //       },
// // // //       create: {
// // // //         sessionId,
// // // //         mediaFileId,
// // // //         userId,
// // // //         saved: true
// // // //       }
// // // //     });

// // // //     return json({ success: true, saved: true });
// // // //   } catch (error) {
// // // //     console.error('Save error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // // //   try {
// // // //     await prisma.videoEngagement.updateMany({
// // // //       where: {
// // // //         userId,
// // // //         mediaFileId
// // // //       },
// // // //       data: {
// // // //         saved: false
// // // //       }
// // // //     });

// // // //     return json({ success: true, saved: false });
// // // //   } catch (error) {
// // // //     console.error('Unsave error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // async function handleShare(sessionId, mediaFileId, userId) {
// // // //   try {
// // // //     const engagement = await prisma.videoEngagement.upsert({
// // // //       where: {
// // // //         userId_mediaFileId: {
// // // //           userId,
// // // //           mediaFileId
// // // //         }
// // // //       },
// // // //       update: {
// // // //         shared: true
// // // //       },
// // // //       create: {
// // // //         sessionId,
// // // //         mediaFileId,
// // // //         userId,
// // // //         shared: true
// // // //       }
// // // //     });

// // // //     return json({ success: true, shared: true });
// // // //   } catch (error) {
// // // //     console.error('Share error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // // //   try {
// // // //     const newComment = await prisma.videoComment.create({
// // // //       data: {
// // // //         sessionId,
// // // //         mediaFileId,
// // // //         userId,
// // // //         userEmail: currentUser.email,
// // // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // // //         comment: comment
// // // //       }
// // // //     });

// // // //     return json({ success: true, comment: newComment });
// // // //   } catch (error) {
// // // //     console.error('Comment error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // async function handleDownload(mediaFileId) {
// // // //   try {
// // // //     await prisma.mediaFile.update({
// // // //       where: { id: mediaFileId },
// // // //       data: {
// // // //         download_count: {
// // // //           increment: 1
// // // //         }
// // // //       }
// // // //     });

// // // //     return json({ success: true });
// // // //   } catch (error) {
// // // //     console.error('Download error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // async function getComments(mediaFileId) {
// // // //   try {
// // // //     const comments = await prisma.videoComment.findMany({
// // // //       where: { mediaFileId },
// // // //       orderBy: { created_at: 'desc' }
// // // //     });

// // // //     return json({ success: true, comments });
// // // //   } catch (error) {
// // // //     console.error('Get comments error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }

// // // // async function getSavedVideos(sessionId, userId) {
// // // //   try {
// // // //     const savedVideos = await prisma.videoEngagement.findMany({
// // // //       where: {
// // // //         sessionId,
// // // //         userId,
// // // //         saved: true
// // // //       },
// // // //       include: {
// // // //         mediaFile: true
// // // //       },
// // // //       orderBy: { updated_at: 'desc' }
// // // //     });

// // // //     const formattedVideos = savedVideos.map(engagement => ({
// // // //       id: engagement.mediaFile.id,
// // // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // // //       title: engagement.mediaFile.title,
// // // //       description: engagement.mediaFile.description,
// // // //       duration: engagement.mediaFile.duration || 0
// // // //     }));

// // // //     return json({ success: true, savedVideos: formattedVideos });
// // // //   } catch (error) {
// // // //     console.error('Get saved videos error:', error);
// // // //     return json({ success: false, error: error.message }, { status: 500 });
// // // //   }
// // // // }






// // // // app/routes/api.carousel-videos.jsx
// // // import { json } from "@remix-run/node";
// // // import { authenticate } from "../shopify.server";
// // // import { PrismaClient } from "@prisma/client";

// // // const prisma = new PrismaClient();

// // // // Price formatting function
// // // function formatPrice(price, currencyCode) {
// // //   if (!price) return '0.00';
  
// // //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// // //   if (isNaN(numericPrice)) return '0.00';
  
// // //   if (currencyCode === 'PKR') {
// // //     return new Intl.NumberFormat('en-PK', {
// // //       minimumFractionDigits: 0,
// // //       maximumFractionDigits: 0
// // //     }).format(numericPrice);
// // //   } else {
// // //     return new Intl.NumberFormat('en-US', {
// // //       minimumFractionDigits: 2,
// // //       maximumFractionDigits: 2
// // //     }).format(numericPrice);
// // //   }
// // // }

// // // // Function to get shop currency
// // // async function getShopCurrency(admin, session) {
// // //   let storeCurrency = 'USD';
  
// // //   try {
// // //     const shop = await admin.rest.resources.Shop.all({
// // //       session: session,
// // //       fields: 'currency',
// // //     });
    
// // //     if (shop && shop.data && shop.data.length > 0) {
// // //       storeCurrency = shop.data[0].currency || 'USD';
// // //       console.log("💰 Store currency:", storeCurrency);
// // //     }
// // //   } catch (shopError) {
// // //     console.log("❌ Shop currency fetch error:", shopError.message);
// // //   }
  
// // //   return storeCurrency;
// // // }

// // // // Function to get products with variant IDs
// // // async function getProductsForMediaFile(mediaFileId, admin, session) {
// // //   try {
// // //     // Get shop currency
// // //     const storeCurrency = await getShopCurrency(admin, session);
    
// // //     console.log("📦 Fetching products for video:", mediaFileId);
    
// // //     const videoProducts = await prisma.videoProduct.findMany({
// // //       where: {
// // //         video_id: parseInt(mediaFileId),
// // //       },
// // //       include: {
// // //         product: true,
// // //       },
// // //     });

// // //     const products = videoProducts.map(vp => vp.product);
// // //     console.log("✅ Found products:", products.length);
    
// // //     // Format products with variant IDs
// // //     const formattedProducts = products.map(product => {
// // //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// // //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// // //       return {
// // //         id: product.id,
// // //         title: product.title,
// // //         variant_id: variantId,
// // //         price: formattedPrice,
// // //         currency_code: storeCurrency,
// // //         image_url: product.image_url,
// // //         shopify_product_id: product.shopify_product_id,
// // //         shopify_variant_id: product.shopify_variant_id
// // //       };
// // //     });
    
// // //     return formattedProducts;
// // //   } catch (error) {
// // //     console.error("❌ Products fetch error:", error);
// // //     return [];
// // //   }
// // // }

// // // // FIXED Function to get collection products with variant IDs
// // // async function getCollectionProductsForMediaFile(mediaFileId, admin, session) {
// // //   try {
// // //     console.log("🚀 COLLECTION PRODUCTS: Starting for video:", mediaFileId);
    
// // //     // 1. Get all collections linked to this video
// // //     const videoCollections = await prisma.videoCollection.findMany({
// // //       where: { video_id: parseInt(mediaFileId) },
// // //       include: { collection: true }
// // //     });

// // //     console.log("📋 Collections linked to video:", videoCollections.length);
    
// // //     if (videoCollections.length === 0) {
// // //       console.log("❌ No collections linked to this video");
// // //       return [];
// // //     }

// // //     // 2. Collect all variant IDs
// // //     let allVariantIds = [];
// // //     videoCollections.forEach(vc => {
// // //       const variantIds = vc.collection.shopify_collection_products_variant_ids || [];
// // //       console.log(`   Collection "${vc.collection.title}" has ${variantIds.length} variant IDs`);
// // //       allVariantIds = [...allVariantIds, ...variantIds];
// // //     });

// // //     // Remove duplicates
// // //     allVariantIds = [...new Set(allVariantIds)];
// // //     console.log("🆔 Total unique variant IDs to fetch:", allVariantIds.length);

// // //     if (allVariantIds.length === 0) {
// // //       console.log("❌ No variant IDs found in any collections");
// // //       return [];
// // //     }

// // //     // 3. Fetch product details from Shopify (ONE AT A TIME to avoid issues)
// // //     const storeCurrency = await getShopCurrency(admin, session);
// // //     let products = [];
    
// // //     for (let i = 0; i < allVariantIds.length; i++) {
// // //       try {
// // //         const variantId = allVariantIds[i];
// // //         console.log(`🔄 Fetching variant ${i + 1}/${allVariantIds.length}: ${variantId}`);
        
// // //         // FIXED GRAPHQL QUERY - removed price.amount and price.currencyCode
// // //         const response = await admin.graphql(`
// // //           query {
// // //             productVariant(id: "${variantId}") {
// // //               id
// // //               title
// // //               price
// // //               image {
// // //                 url
// // //               }
// // //               product {
// // //                 id
// // //                 title
// // //                 featuredImage {
// // //                   url
// // //                 }
// // //               }
// // //             }
// // //           }
// // //         `);

// // //         const data = await response.json();
        
// // //         if (data.errors || !data.data.productVariant) {
// // //           console.log(`❌ Failed to fetch variant ${variantId}`);
// // //           continue;
// // //         }

// // //         const variant = data.data.productVariant;
// // //         const cleanVariantId = variant.id.replace('gid://shopify/ProductVariant/', '');
// // //         const productId = variant.product.id.replace('gid://shopify/Product/', '');
        
// // //         // Parse the price (it now comes as a string like "29.99")
// // //         const price = parseFloat(variant.price) || 0;
// // //         const formattedPrice = formatPrice(price, storeCurrency);
        
// // //         products.push({
// // //           id: `collection_${cleanVariantId}`,
// // //           title: `${variant.product.title} - ${variant.title}`,
// // //           shopify_product_id: productId,
// // //           shopify_variant_id: cleanVariantId,
// // //           price: formattedPrice,
// // //           currency_code: storeCurrency, // Use store currency instead of variant currency
// // //           image_url: variant.image?.url || variant.product.featuredImage?.url,
// // //           is_collection_product: true
// // //         });

// // //         console.log(`✅ Added: ${variant.product.title} - ${formattedPrice}`);

// // //       } catch (variantError) {
// // //         console.error(`❌ Error fetching variant:`, variantError);
// // //         continue;
// // //       }
// // //     }

// // //     console.log("🎉 FINAL COLLECTION PRODUCTS COUNT:", products.length);
// // //     return products;

// // //   } catch (error) {
// // //     console.error("❌ Collection Products fetch error:", error);
// // //     return [];
// // //   }
// // // }

// // // export async function loader({ request }) {
// // //   console.log("🔄 Loader function called");
// // //   console.log("📝 Request URL:", request.url);

// // //   const url = new URL(request.url);
// // //   const action = url.searchParams.get("action");
// // //   const mediaFileId = url.searchParams.get("mediaFileId");
// // //   const shopParam = url.searchParams.get("shop");

// // //   console.log("🔍 Query parameters:", { action, mediaFileId, shopParam });

// // //   // Handle product requests
// // //   if (action === "getProducts" && mediaFileId) {
// // //     try {
// // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // //       if (!session?.id) {
// // //         console.error("❌ No session found - app may not be installed");
// // //         return json({ success: false, error: "No session" }, { status: 401 });
// // //       }

// // //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// // //       console.log("📦 Final products being returned:", products.length);
      
// // //       return json({
// // //         success: true,
// // //         products: products,
// // //       });
// // //     } catch (error) {
// // //       console.error("❌ Products fetch error:", error);
// // //       return json({ 
// // //         success: false, 
// // //         error: "Failed to load products" 
// // //       }, { status: 500 });
// // //     }
// // //   }

// // //   // Handle collection product requests - FIXED
// // //   if (action === "getCollectionProducts" && mediaFileId) {
// // //     try {
// // //       const { session, admin } = await authenticate.public.appProxy(request);
      
// // //       if (!session?.id) {
// // //         console.error("❌ No session found - app may not be installed");
// // //         return json({ success: false, error: "No session" }, { status: 401 });
// // //       }

// // //       console.log("🎯 COLLECTION PRODUCTS API CALLED - START");
// // //       const products = await getCollectionProductsForMediaFile(mediaFileId, admin, session);
      
// // //       console.log("📦 Final collection products being returned:", products.length);
// // //       console.log("🎯 COLLECTION PRODUCTS API CALLED - END");
      
// // //       return json({
// // //         success: true,
// // //         products: products,
// // //       });
// // //     } catch (error) {
// // //       console.error("❌ Collection Products fetch error:", error);
// // //       return json({ 
// // //         success: false, 
// // //         error: "Failed to load collection products" 
// // //       }, { status: 500 });
// // //     }
// // //   }

// // //   // VIDEO LOADING LOGIC
// // //   try {
// // //     const { session, admin } = await authenticate.public.appProxy(request);
// // //     console.log("🔑 Session ID:", session?.id);

// // //     if (!session?.id) {
// // //       console.error("❌ No session found - app may not be installed");
// // //       return json({ success: false, error: "No session" }, { status: 401 });
// // //     }

// // //     // Get shop currency
// // //     const storeCurrency = await getShopCurrency(admin, session);

// // //     console.log("📦 Fetching videos from database...");
    
// // //     const videos = await prisma.mediaFile.findMany({
// // //       where: { 
// // //         sessionId: session.id 
// // //       },
// // //       select: { 
// // //         id: true,
// // //         shopify_file_url: true, 
// // //         title: true, 
// // //         description: true,
// // //         duration: true,
// // //         download_count: true
// // //       },
// // //     });

// // //     console.log("✅ Found videos:", videos.length);

// // //     // Format the response
// // //     const formattedVideos = videos.map(video => ({
// // //       id: video.id,
// // //       shopify_file_url: video.shopify_file_url,
// // //       title: video.title,
// // //       description: video.description,
// // //       duration: video.duration || 0,
// // //       download_count: video.download_count || 0,
// // //       user_has_liked: false,
// // //       user_has_shared: false,
// // //       user_has_saved: false,
// // //       like_count: 0,
// // //       share_count: 0,
// // //       save_count: 0,
// // //       comment_count: 0,
// // //       store_currency: storeCurrency
// // //     }));

// // //     return json({ 
// // //       success: true, 
// // //       videos: formattedVideos,
// // //       store_currency: storeCurrency
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Loader error:", error);
// // //     return json({ 
// // //       success: false, 
// // //       error: error.message 
// // //     }, { status: 500 });
// // //   } finally {
// // //     await prisma.$disconnect();
// // //   }
// // // }

// // // // ACTION HANDLER (keep the same)
// // // export async function action({ request }) {
// // //   console.log("🔄 Action function called");
  
// // //   try {
// // //     const { session, admin } = await authenticate.public.appProxy(request);
    
// // //     if (!session?.id) {
// // //       return json({ success: false, error: "No session" }, { status: 401 });
// // //     }

// // //     // Get current user info
// // //     let currentUser;
// // //     let userId = "anonymous";
    
// // //     try {
// // //       currentUser = await admin.rest.resources.User.current({
// // //         session: session,
// // //       });
// // //       userId = currentUser?.id?.toString() || "anonymous";
// // //       console.log("👤 User ID:", userId);
// // //     } catch (error) {
// // //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// // //     }

// // //     const formData = await request.formData();
// // //     const actionType = formData.get('actionType');
// // //     const mediaFileId = formData.get('mediaFileId');
// // //     const comment = formData.get('comment');

// // //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// // //     // Validate mediaFileId
// // //     if (!mediaFileId || isNaN(parseInt(mediaFileId))) {
// // //       return json({ success: false, error: 'Invalid media file ID' }, { status: 400 });
// // //     }

// // //     const parsedMediaFileId = parseInt(mediaFileId);

// // //     switch (actionType) {
// // //       case 'like':
// // //         return await handleLike(session.id, parsedMediaFileId, userId);
      
// // //       case 'unlike':
// // //         return await handleUnlike(session.id, parsedMediaFileId, userId);
      
// // //       case 'save':
// // //         return await handleSave(session.id, parsedMediaFileId, userId);
      
// // //       case 'unsave':
// // //         return await handleUnsave(session.id, parsedMediaFileId, userId);
      
// // //       case 'share':
// // //         return await handleShare(session.id, parsedMediaFileId, userId);
      
// // //       case 'comment':
// // //         if (!currentUser) {
// // //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// // //         }
// // //         if (!comment || comment.trim().length === 0) {
// // //           return json({ success: false, error: "Comment cannot be empty" }, { status: 400 });
// // //         }
// // //         return await handleComment(session.id, parsedMediaFileId, userId, comment, currentUser);
      
// // //       case 'download':
// // //         return await handleDownload(parsedMediaFileId);
      
// // //       case 'getComments':
// // //         return await getComments(parsedMediaFileId);
      
// // //       case 'getSavedVideos':
// // //         return await getSavedVideos(session.id, userId);
      
// // //       default:
// // //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// // //     }
// // //   } catch (error) {
// // //     console.error('❌ Action error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // // HANDLER FUNCTIONS (keep the same as before)
// // // async function handleLike(sessionId, mediaFileId, userId) {
// // //   try {
// // //     const engagement = await prisma.videoEngagement.upsert({
// // //       where: {
// // //         userId_mediaFileId: {
// // //           userId,
// // //           mediaFileId
// // //         }
// // //       },
// // //       update: {
// // //         liked: true
// // //       },
// // //       create: {
// // //         sessionId,
// // //         mediaFileId,
// // //         userId,
// // //         liked: true
// // //       }
// // //     });

// // //     return json({ success: true, liked: true });
// // //   } catch (error) {
// // //     console.error('Like error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // async function handleUnlike(sessionId, mediaFileId, userId) {
// // //   try {
// // //     await prisma.videoEngagement.updateMany({
// // //       where: {
// // //         userId,
// // //         mediaFileId
// // //       },
// // //       data: {
// // //         liked: false
// // //       }
// // //     });

// // //     return json({ success: true, liked: false });
// // //   } catch (error) {
// // //     console.error('Unlike error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // async function handleSave(sessionId, mediaFileId, userId) {
// // //   try {
// // //     const engagement = await prisma.videoEngagement.upsert({
// // //       where: {
// // //         userId_mediaFileId: {
// // //           userId,
// // //           mediaFileId
// // //         }
// // //       },
// // //       update: {
// // //         saved: true
// // //       },
// // //       create: {
// // //         sessionId,
// // //         mediaFileId,
// // //         userId,
// // //         saved: true
// // //       }
// // //     });

// // //     return json({ success: true, saved: true });
// // //   } catch (error) {
// // //     console.error('Save error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // async function handleUnsave(sessionId, mediaFileId, userId) {
// // //   try {
// // //     await prisma.videoEngagement.updateMany({
// // //       where: {
// // //         userId,
// // //         mediaFileId
// // //       },
// // //       data: {
// // //         saved: false
// // //       }
// // //     });

// // //     return json({ success: true, saved: false });
// // //   } catch (error) {
// // //     console.error('Unsave error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // async function handleShare(sessionId, mediaFileId, userId) {
// // //   try {
// // //     const engagement = await prisma.videoEngagement.upsert({
// // //       where: {
// // //         userId_mediaFileId: {
// // //           userId,
// // //           mediaFileId
// // //         }
// // //       },
// // //       update: {
// // //         shared: true
// // //       },
// // //       create: {
// // //         sessionId,
// // //         mediaFileId,
// // //         userId,
// // //         shared: true
// // //       }
// // //     });

// // //     return json({ success: true, shared: true });
// // //   } catch (error) {
// // //     console.error('Share error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// // //   try {
// // //     const newComment = await prisma.videoComment.create({
// // //       data: {
// // //         sessionId,
// // //         mediaFileId,
// // //         userId,
// // //         userEmail: currentUser.email,
// // //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// // //         comment: comment
// // //       }
// // //     });

// // //     return json({ success: true, comment: newComment });
// // //   } catch (error) {
// // //     console.error('Comment error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // async function handleDownload(mediaFileId) {
// // //   try {
// // //     await prisma.mediaFile.update({
// // //       where: { id: mediaFileId },
// // //       data: {
// // //         download_count: {
// // //           increment: 1
// // //         }
// // //       }
// // //     });

// // //     return json({ success: true });
// // //   } catch (error) {
// // //     console.error('Download error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // async function getComments(mediaFileId) {
// // //   try {
// // //     const comments = await prisma.videoComment.findMany({
// // //       where: { mediaFileId },
// // //       orderBy: { created_at: 'desc' }
// // //     });

// // //     return json({ success: true, comments });
// // //   } catch (error) {
// // //     console.error('Get comments error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }

// // // async function getSavedVideos(sessionId, userId) {
// // //   try {
// // //     const savedVideos = await prisma.videoEngagement.findMany({
// // //       where: {
// // //         sessionId,
// // //         userId,
// // //         saved: true
// // //       },
// // //       include: {
// // //         mediaFile: true
// // //       },
// // //       orderBy: { updated_at: 'desc' }
// // //     });

// // //     const formattedVideos = savedVideos.map(engagement => ({
// // //       id: engagement.mediaFile.id,
// // //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// // //       title: engagement.mediaFile.title,
// // //       description: engagement.mediaFile.description,
// // //       duration: engagement.mediaFile.duration || 0
// // //     }));

// // //     return json({ success: true, savedVideos: formattedVideos });
// // //   } catch (error) {
// // //     console.error('Get saved videos error:', error);
// // //     return json({ success: false, error: error.message }, { status: 500 });
// // //   }
// // // }










// // // app/routes/api.carousel-videos.jsx
// // import { json } from "@remix-run/node";
// // import { authenticate } from "../shopify.server";
// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // // Price formatting function
// // function formatPrice(price, currencyCode) {
// //   if (!price) return '0.00';
  
// //   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
// //   if (isNaN(numericPrice)) return '0.00';
  
// //   if (currencyCode === 'PKR') {
// //     return new Intl.NumberFormat('en-PK', {
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0
// //     }).format(numericPrice);
// //   } else {
// //     return new Intl.NumberFormat('en-US', {
// //       minimumFractionDigits: 2,
// //       maximumFractionDigits: 2
// //     }).format(numericPrice);
// //   }
// // }

// // // Function to get shop currency
// // async function getShopCurrency(admin, session) {
// //   let storeCurrency = 'USD';
  
// //   try {
// //     const shop = await admin.rest.resources.Shop.all({
// //       session: session,
// //       fields: 'currency',
// //     });
    
// //     if (shop && shop.data && shop.data.length > 0) {
// //       storeCurrency = shop.data[0].currency || 'USD';
// //       console.log("💰 Store currency:", storeCurrency);
// //     }
// //   } catch (shopError) {
// //     console.log("❌ Shop currency fetch error:", shopError.message);
// //   }
  
// //   return storeCurrency;
// // }

// // // Function to get products with variant IDs
// // async function getProductsForMediaFile(mediaFileId, admin, session) {
// //   try {
// //     // Get shop currency
// //     const storeCurrency = await getShopCurrency(admin, session);
    
// //     console.log("📦 Fetching products for video:", mediaFileId);
    
// //     const videoProducts = await prisma.videoProduct.findMany({
// //       where: {
// //         video_id: parseInt(mediaFileId),
// //       },
// //       include: {
// //         product: true,
// //       },
// //     });

// //     const products = videoProducts.map(vp => vp.product);
// //     console.log("✅ Found products:", products.length);
    
// //     // Format products with variant IDs
// //     const formattedProducts = products.map(product => {
// //       const variantId = product.shopify_variant_id || product.shopify_product_id;
// //       const formattedPrice = formatPrice(product.price || '0.00', storeCurrency);
      
// //       return {
// //         id: product.id,
// //         title: product.title,
// //         variant_id: variantId,
// //         price: formattedPrice,
// //         currency_code: storeCurrency,
// //         image_url: product.image_url,
// //         shopify_product_id: product.shopify_product_id,
// //         shopify_variant_id: product.shopify_variant_id
// //       };
// //     });
    
// //     return formattedProducts;
// //   } catch (error) {
// //     console.error("❌ Products fetch error:", error);
// //     return [];
// //   }
// // }

// // // FIXED Function to get collection products with variant IDs
// // async function getCollectionProductsForMediaFile(mediaFileId, admin, session) {
// //   try {
// //     console.log("🚀 COLLECTION PRODUCTS: Starting for video:", mediaFileId);
    
// //     // 1. Get all collections linked to this video
// //     const videoCollections = await prisma.videoCollection.findMany({
// //       where: { video_id: parseInt(mediaFileId) },
// //       include: { collection: true }
// //     });

// //     console.log("📋 Collections linked to video:", videoCollections.length);
    
// //     if (videoCollections.length === 0) {
// //       console.log("❌ No collections linked to this video");
// //       return [];
// //     }

// //     // 2. Collect all variant IDs
// //     let allVariantIds = [];
// //     videoCollections.forEach(vc => {
// //       const variantIds = vc.collection.shopify_collection_products_variant_ids || [];
// //       console.log(`   Collection "${vc.collection.title}" has ${variantIds.length} variant IDs`);
// //       allVariantIds = [...allVariantIds, ...variantIds];
// //     });

// //     // Remove duplicates
// //     allVariantIds = [...new Set(allVariantIds)];
// //     console.log("🆔 Total unique variant IDs to fetch:", allVariantIds.length);

// //     if (allVariantIds.length === 0) {
// //       console.log("❌ No variant IDs found in any collections");
// //       return [];
// //     }

// //     // 3. Fetch product details from Shopify (ONE AT A TIME to avoid issues)
// //     const storeCurrency = await getShopCurrency(admin, session);
// //     let products = [];
    
// //     for (let i = 0; i < allVariantIds.length; i++) {
// //       try {
// //         const variantId = allVariantIds[i];
// //         console.log(`🔄 Fetching variant ${i + 1}/${allVariantIds.length}: ${variantId}`);
        
// //         // FIXED GRAPHQL QUERY - removed price.amount and price.currencyCode
// //         const response = await admin.graphql(`
// //           query {
// //             productVariant(id: "${variantId}") {
// //               id
// //               title
// //               price
// //               image {
// //                 url
// //               }
// //               product {
// //                 id
// //                 title
// //                 featuredImage {
// //                   url
// //                 }
// //               }
// //             }
// //           }
// //         `);

// //         const data = await response.json();
        
// //         if (data.errors || !data.data.productVariant) {
// //           console.log(`❌ Failed to fetch variant ${variantId}`);
// //           continue;
// //         }

// //         const variant = data.data.productVariant;
// //         const cleanVariantId = variant.id.replace('gid://shopify/ProductVariant/', '');
// //         const productId = variant.product.id.replace('gid://shopify/Product/', '');
        
// //         // Parse the price (it now comes as a string like "29.99")
// //         const price = parseFloat(variant.price) || 0;
// //         const formattedPrice = formatPrice(price, storeCurrency);
        
// //         // FIX: Ensure variant_id is the clean numeric ID for addToCart
// //         products.push({
// //           id: `collection_${cleanVariantId}`,
// //           title: `${variant.product.title} - ${variant.title}`,
// //           shopify_product_id: productId,
// //           shopify_variant_id: cleanVariantId,
// //           variant_id: cleanVariantId, // This is the key fix - ensure it's the numeric ID
// //           price: formattedPrice,
// //           currency_code: storeCurrency, // Use store currency instead of variant currency
// //           image_url: variant.image?.url || variant.product.featuredImage?.url,
// //           is_collection_product: true
// //         });

// //         console.log(`✅ Added: ${variant.product.title} - ${formattedPrice} - Variant ID: ${cleanVariantId}`);

// //       } catch (variantError) {
// //         console.error(`❌ Error fetching variant:`, variantError);
// //         continue;
// //       }
// //     }

// //     console.log("🎉 FINAL COLLECTION PRODUCTS COUNT:", products.length);
// //     return products;

// //   } catch (error) {
// //     console.error("❌ Collection Products fetch error:", error);
// //     return [];
// //   }
// // }

// // export async function loader({ request }) {
// //   console.log("🔄 Loader function called");
// //   console.log("📝 Request URL:", request.url);

// //   const url = new URL(request.url);
// //   const action = url.searchParams.get("action");
// //   const mediaFileId = url.searchParams.get("mediaFileId");
// //   const shopParam = url.searchParams.get("shop");

// //   console.log("🔍 Query parameters:", { action, mediaFileId, shopParam });

// //   // Handle product requests
// //   if (action === "getProducts" && mediaFileId) {
// //     try {
// //       const { session, admin } = await authenticate.public.appProxy(request);
      
// //       if (!session?.id) {
// //         console.error("❌ No session found - app may not be installed");
// //         return json({ success: false, error: "No session" }, { status: 401 });
// //       }

// //       const products = await getProductsForMediaFile(mediaFileId, admin, session);
      
// //       console.log("📦 Final products being returned:", products.length);
      
// //       return json({
// //         success: true,
// //         products: products,
// //       });
// //     } catch (error) {
// //       console.error("❌ Products fetch error:", error);
// //       return json({ 
// //         success: false, 
// //         error: "Failed to load products" 
// //       }, { status: 500 });
// //     }
// //   }

// //   // Handle collection product requests - FIXED
// //   if (action === "getCollectionProducts" && mediaFileId) {
// //     try {
// //       const { session, admin } = await authenticate.public.appProxy(request);
      
// //       if (!session?.id) {
// //         console.error("❌ No session found - app may not be installed");
// //         return json({ success: false, error: "No session" }, { status: 401 });
// //       }

// //       console.log("🎯 COLLECTION PRODUCTS API CALLED - START");
// //       const products = await getCollectionProductsForMediaFile(mediaFileId, admin, session);
      
// //       console.log("📦 Final collection products being returned:", products.length);
// //       console.log("🎯 COLLECTION PRODUCTS API CALLED - END");
      
// //       return json({
// //         success: true,
// //         products: products,
// //       });
// //     } catch (error) {
// //       console.error("❌ Collection Products fetch error:", error);
// //       return json({ 
// //         success: false, 
// //         error: "Failed to load collection products" 
// //       }, { status: 500 });
// //     }
// //   }

// //   // VIDEO LOADING LOGIC
// //   try {
// //     const { session, admin } = await authenticate.public.appProxy(request);
// //     console.log("🔑 Session ID:", session?.id);

// //     if (!session?.id) {
// //       console.error("❌ No session found - app may not be installed");
// //       return json({ success: false, error: "No session" }, { status: 401 });
// //     }

// //     // Get shop currency
// //     const storeCurrency = await getShopCurrency(admin, session);

// //     console.log("📦 Fetching videos from database...");
    
// //     const videos = await prisma.mediaFile.findMany({
// //       where: { 
// //         sessionId: session.id 
// //       },
// //       select: { 
// //         id: true,
// //         shopify_file_url: true, 
// //         title: true, 
// //         description: true,
// //         duration: true,
// //         download_count: true
// //       },
// //     });

// //     console.log("✅ Found videos:", videos.length);

// //     // Format the response
// //     const formattedVideos = videos.map(video => ({
// //       id: video.id,
// //       shopify_file_url: video.shopify_file_url,
// //       title: video.title,
// //       description: video.description,
// //       duration: video.duration || 0,
// //       download_count: video.download_count || 0,
// //       user_has_liked: false,
// //       user_has_shared: false,
// //       user_has_saved: false,
// //       like_count: 0,
// //       share_count: 0,
// //       save_count: 0,
// //       comment_count: 0,
// //       store_currency: storeCurrency
// //     }));

// //     return json({ 
// //       success: true, 
// //       videos: formattedVideos,
// //       store_currency: storeCurrency
// //     });

// //   } catch (error) {
// //     console.error("❌ Loader error:", error);
// //     return json({ 
// //       success: false, 
// //       error: error.message 
// //     }, { status: 500 });
// //   } finally {
// //     await prisma.$disconnect();
// //   }
// // }

// // // ACTION HANDLER (keep the same)
// // export async function action({ request }) {
// //   console.log("🔄 Action function called");
  
// //   try {
// //     const { session, admin } = await authenticate.public.appProxy(request);
    
// //     if (!session?.id) {
// //       return json({ success: false, error: "No session" }, { status: 401 });
// //     }

// //     // Get current user info
// //     let currentUser;
// //     let userId = "anonymous";
    
// //     try {
// //       currentUser = await admin.rest.resources.User.current({
// //         session: session,
// //       });
// //       userId = currentUser?.id?.toString() || "anonymous";
// //       console.log("👤 User ID:", userId);
// //     } catch (error) {
// //       console.log("⚠️ Could not fetch current user, using anonymous:", error.message);
// //     }

// //     const formData = await request.formData();
// //     const actionType = formData.get('actionType');
// //     const mediaFileId = formData.get('mediaFileId');
// //     const comment = formData.get('comment');

// //     console.log("🎯 Action type:", actionType, "Video ID:", mediaFileId);

// //     // Validate mediaFileId
// //     if (!mediaFileId || isNaN(parseInt(mediaFileId))) {
// //       return json({ success: false, error: 'Invalid media file ID' }, { status: 400 });
// //     }

// //     const parsedMediaFileId = parseInt(mediaFileId);

// //     switch (actionType) {
// //       case 'like':
// //         return await handleLike(session.id, parsedMediaFileId, userId);
      
// //       case 'unlike':
// //         return await handleUnlike(session.id, parsedMediaFileId, userId);
      
// //       case 'save':
// //         return await handleSave(session.id, parsedMediaFileId, userId);
      
// //       case 'unsave':
// //         return await handleUnsave(session.id, parsedMediaFileId, userId);
      
// //       case 'share':
// //         return await handleShare(session.id, parsedMediaFileId, userId);
      
// //       case 'comment':
// //         if (!currentUser) {
// //           return json({ success: false, error: "Login required to comment" }, { status: 401 });
// //         }
// //         if (!comment || comment.trim().length === 0) {
// //           return json({ success: false, error: "Comment cannot be empty" }, { status: 400 });
// //         }
// //         return await handleComment(session.id, parsedMediaFileId, userId, comment, currentUser);
      
// //       case 'download':
// //         return await handleDownload(parsedMediaFileId);
      
// //       case 'getComments':
// //         return await getComments(parsedMediaFileId);
      
// //       case 'getSavedVideos':
// //         return await getSavedVideos(session.id, userId);
      
// //       default:
// //         return json({ success: false, error: 'Invalid action' }, { status: 400 });
// //     }
// //   } catch (error) {
// //     console.error('❌ Action error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // // HANDLER FUNCTIONS (keep the same as before)
// // async function handleLike(sessionId, mediaFileId, userId) {
// //   try {
// //     const engagement = await prisma.videoEngagement.upsert({
// //       where: {
// //         userId_mediaFileId: {
// //           userId,
// //           mediaFileId
// //         }
// //       },
// //       update: {
// //         liked: true
// //       },
// //       create: {
// //         sessionId,
// //         mediaFileId,
// //         userId,
// //         liked: true
// //       }
// //     });

// //     return json({ success: true, liked: true });
// //   } catch (error) {
// //     console.error('Like error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // async function handleUnlike(sessionId, mediaFileId, userId) {
// //   try {
// //     await prisma.videoEngagement.updateMany({
// //       where: {
// //         userId,
// //         mediaFileId
// //       },
// //       data: {
// //         liked: false
// //       }
// //     });

// //     return json({ success: true, liked: false });
// //   } catch (error) {
// //     console.error('Unlike error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // async function handleSave(sessionId, mediaFileId, userId) {
// //   try {
// //     const engagement = await prisma.videoEngagement.upsert({
// //       where: {
// //         userId_mediaFileId: {
// //           userId,
// //           mediaFileId
// //         }
// //       },
// //       update: {
// //         saved: true
// //       },
// //       create: {
// //         sessionId,
// //         mediaFileId,
// //         userId,
// //         saved: true
// //       }
// //     });

// //     return json({ success: true, saved: true });
// //   } catch (error) {
// //     console.error('Save error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // async function handleUnsave(sessionId, mediaFileId, userId) {
// //   try {
// //     await prisma.videoEngagement.updateMany({
// //       where: {
// //         userId,
// //         mediaFileId
// //       },
// //       data: {
// //         saved: false
// //       }
// //     });

// //     return json({ success: true, saved: false });
// //   } catch (error) {
// //     console.error('Unsave error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // async function handleShare(sessionId, mediaFileId, userId) {
// //   try {
// //     const engagement = await prisma.videoEngagement.upsert({
// //       where: {
// //         userId_mediaFileId: {
// //           userId,
// //           mediaFileId
// //         }
// //       },
// //       update: {
// //         shared: true
// //       },
// //       create: {
// //         sessionId,
// //         mediaFileId,
// //         userId,
// //         shared: true
// //       }
// //     });

// //     return json({ success: true, shared: true });
// //   } catch (error) {
// //     console.error('Share error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
// //   try {
// //     const newComment = await prisma.videoComment.create({
// //       data: {
// //         sessionId,
// //         mediaFileId,
// //         userId,
// //         userEmail: currentUser.email,
// //         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
// //         comment: comment
// //       }
// //     });

// //     return json({ success: true, comment: newComment });
// //   } catch (error) {
// //     console.error('Comment error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // async function handleDownload(mediaFileId) {
// //   try {
// //     await prisma.mediaFile.update({
// //       where: { id: mediaFileId },
// //       data: {
// //         download_count: {
// //           increment: 1
// //         }
// //       }
// //     });

// //     return json({ success: true });
// //   } catch (error) {
// //     console.error('Download error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // async function getComments(mediaFileId) {
// //   try {
// //     const comments = await prisma.videoComment.findMany({
// //       where: { mediaFileId },
// //       orderBy: { created_at: 'desc' }
// //     });

// //     return json({ success: true, comments });
// //   } catch (error) {
// //     console.error('Get comments error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }

// // async function getSavedVideos(sessionId, userId) {
// //   try {
// //     const savedVideos = await prisma.videoEngagement.findMany({
// //       where: {
// //         sessionId,
// //         userId,
// //         saved: true
// //       },
// //       include: {
// //         mediaFile: true
// //       },
// //       orderBy: { updated_at: 'desc' }
// //     });

// //     const formattedVideos = savedVideos.map(engagement => ({
// //       id: engagement.mediaFile.id,
// //       shopify_file_url: engagement.mediaFile.shopify_file_url,
// //       title: engagement.mediaFile.title,
// //       description: engagement.mediaFile.description,
// //       duration: engagement.mediaFile.duration || 0
// //     }));

// //     return json({ success: true, savedVideos: formattedVideos });
// //   } catch (error) {
// //     console.error('Get saved videos error:', error);
// //     return json({ success: false, error: error.message }, { status: 500 });
// //   }
// // }






// // app/routes/api.carousel-videos.jsx

// import { json } from "@remix-run/node";
// import { getAuth } from "@clerk/remix/ssr.server";
// import prisma from "../db.server.js";
// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// export const action = async ({ request }) => {
//   const { userId } = await getAuth(request);
//   if (!userId) {
//     return json({ success: false, error: "Unauthorized" }, { status: 401 });
//   }

//   const session = await prisma.session.findFirst({ where: { clerkUserId: userId } });
//   if (!session) {
//     return json({ success: false, error: "Session not found" }, { status: 404 });
//   }

//   // Create shopify and admin here (if needed; not used in this API, but for consistency)
//   const shopify = shopifyApi({
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     hostName: process.env.SHOPIFY_APP_URL.replace('https://', ''),
//     apiVersion: LATEST_API_VERSION,
//     isEmbeddedApp: false,
//   });
//   const admin = new shopify.clients.Graphql({ shop: session.shop, accessToken: session.accessToken });

//   // Your logic (from the last snippet)
//   const body = await request.json();
//   const { actionType, mediaFileId, comment, currentUser } = body;

//   if (!actionType || !mediaFileId) {
//     return json({ success: false, error: 'Missing required parameters' }, { status: 400 });
//   }

//   const sessionId = session.id; // Use fetched session
//   const clerkUserId = userId; // From Clerk

//   switch (actionType) {
//     case 'like':
//       return await handleLike(sessionId, mediaFileId, clerkUserId);
//     case 'share':
//       return await handleShare(sessionId, mediaFileId, clerkUserId);
//     case 'save':
//       return await handleSave(sessionId, mediaFileId, clerkUserId);
//     case 'comment':
//       return await handleComment(sessionId, mediaFileId, clerkUserId, comment, currentUser);
//     case 'download':
//       return await handleDownload(mediaFileId);
//     case 'get_comments':
//       return await getComments(mediaFileId);
//     case 'get_saved_videos':
//       return await getSavedVideos(sessionId, clerkUserId);
//     default:
//       return json({ success: false, error: 'Invalid action type' }, { status: 400 });
//   }
// };

// // Define handler functions (from your original code; wrapped in try/catch for safety)
// async function handleLike(sessionId, mediaFileId, userId) {
//   try {
//     const engagement = await prisma.videoEngagement.upsert({
//       where: { sessionId_userId_mediaFileId: { sessionId, userId, mediaFileId } },
//       update: { liked: true },
//       create: { sessionId, mediaFileId, userId, liked: true }
//     });
//     return json({ success: true, liked: true });
//   } catch (error) {
//     console.error('Like error:', error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// async function handleShare(sessionId, mediaFileId, userId) {
//   try {
//     const engagement = await prisma.videoEngagement.upsert({
//       where: { sessionId_userId_mediaFileId: { sessionId, userId, mediaFileId } },
//       update: { shared: true },
//       create: { sessionId, mediaFileId, userId, shared: true }
//     });
//     return json({ success: true, shared: true });
//   } catch (error) {
//     console.error('Share error:', error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// async function handleComment(sessionId, mediaFileId, userId, comment, currentUser) {
//   try {
//     const newComment = await prisma.videoComment.create({
//       data: {
//         sessionId,
//         mediaFileId,
//         userId,
//         userEmail: currentUser.email,
//         userName: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
//         comment: comment
//       }
//     });

//     return json({ success: true, comment: newComment });
//   } catch (error) {
//     console.error('Comment error:', error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// async function handleDownload(mediaFileId) {
//   try {
//     await prisma.mediaFile.update({
//       where: { id: mediaFileId },
//       data: {
//         download_count: {
//           increment: 1
//         }
//       }
//     });

//     return json({ success: true });
//   } catch (error) {
//     console.error('Download error:', error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// async function getComments(mediaFileId) {
//   try {
//     const comments = await prisma.videoComment.findMany({
//       where: { mediaFileId },
//       orderBy: { created_at: 'desc' }
//     });

//     return json({ success: true, comments });
//   } catch (error) {
//     console.error('Get comments error:', error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// async function getSavedVideos(sessionId, userId) {
//   try {
//     const savedVideos = await prisma.videoEngagement.findMany({
//       where: {
//         sessionId,
//         userId,
//         saved: true
//       },
//       include: {
//         mediaFile: true
//       },
//       orderBy: { updated_at: 'desc' }
//     });

//     const formattedVideos = savedVideos.map(engagement => ({
//       id: engagement.mediaFile.id,
//       shopify_file_url: engagement.mediaFile.shopify_file_url,
//       title: engagement.mediaFile.title,
//       description: engagement.mediaFile.description,
//       duration: engagement.mediaFile.duration || 0
//     }));

//     return json({ success: true, savedVideos: formattedVideos });
//   } catch (error) {
//     console.error('Get saved videos error:', error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// }