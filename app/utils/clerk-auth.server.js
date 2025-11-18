// app/utils/clerk-auth.server.js
import { getAuth } from "@clerk/remix/ssr.server";
import prisma from "../db.server";

export async function getAuthenticatedUser(request) {
  try {
    const loaderArgs = { 
      request, 
      context: {}, 
      params: {} 
    };
    
    const { userId } = await getAuth(loaderArgs);
    
    if (!userId) {
      throw new Error("No user authenticated - Please log in with Clerk");
    }

    console.log("Clerk User ID:", userId);

    // Find the Shopify session for this Clerk user
    const session = await prisma.session.findFirst({ 
      where: { clerkUserId: userId } 
    });

    console.log("Found session:", session);

    if (!session) {
      throw new Error("No Shopify session found for this Clerk user. Please install the app in a Shopify store first.");
    }

    if (!session.accessToken || !session.shop) {
      throw new Error("Shopify session is missing access token or shop domain");
    }

    return {
      userId,
      shop: session.shop,
      accessToken: session.accessToken,
      sessionId: session.id
    };
  } catch (error) {
    console.error("Authentication error in getAuthenticatedUser:", error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
}