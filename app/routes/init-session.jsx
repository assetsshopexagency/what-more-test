// // app/routes/init-session.jsx
// import prisma from '../db.server.js';

// export const action = async () => {
//   try {
//     // Create a session record manually for your standalone app
//     const session = await prisma.session.upsert({
//       where: {
//         id: "standalone-session-1"
//       },
//       update: {
//         // Update existing session if needed
//         updatedAt: new Date(),
//       },
//       create: {
//         id: "standalone-session-1",
//         shop: process.env.SHOPIFY_STORE,
//         state: "standalone",
//         isOnline: true,
//         scope: process.env.SCOPES,
//         accessToken: process.env.SHOPIFY_ADMIN_API_TOKEN,
//         expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     });

//     return new Response(
//       JSON.stringify({ 
//         success: true, 
//         message: "Session initialized",
//         sessionId: session.id 
//       }),
//       { 
//         status: 200, 
//         headers: { "Content-Type": "application/json" } 
//       }
//     );
//   } catch (error) {
//     console.error("❌ Session initialization error:", error);
//     return new Response(
//       JSON.stringify({ 
//         success: false, 
//         error: error.message 
//       }),
//       { 
//         status: 500, 
//         headers: { "Content-Type": "application/json" } 
//       }
//     );
//   }
// };

// // Auto-initialize session on GET request too
// export const loader = async () => {
//   try {
//     // Check if session already exists
//     const existingSession = await prisma.session.findUnique({
//       where: { id: "standalone-session-1" }
//     });

//     if (existingSession) {
//       return new Response(
//         JSON.stringify({ 
//           success: true, 
//           message: "Session already exists",
//           sessionId: existingSession.id,
//           shop: existingSession.shop
//         }),
//         { 
//           status: 200, 
//           headers: { "Content-Type": "application/json" } 
//         }
//       );
//     }

//     // If no session exists, create one
//     const session = await prisma.session.create({
//       data: {
//         id: "standalone-session-1",
//         shop: process.env.SHOPIFY_STORE,
//         state: "standalone",
//         isOnline: true,
//         scope: process.env.SCOPES,
//         accessToken: process.env.SHOPIFY_ADMIN_API_TOKEN,
//         expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     });

//     return new Response(
//       JSON.stringify({ 
//         success: true, 
//         message: "Session auto-initialized on GET",
//         sessionId: session.id,
//         shop: session.shop
//       }),
//       { 
//         status: 200, 
//         headers: { "Content-Type": "application/json" } 
//       }
//     );
//   } catch (error) {
//     console.error("❌ Session initialization error:", error);
//     return new Response(
//       JSON.stringify({ 
//         success: false, 
//         error: error.message 
//       }),
//       { 
//         status: 500, 
//         headers: { "Content-Type": "application/json" } 
//       }
//     );
//   }
// };



// app/routes/init-session.jsx
import prisma from '../db.server.js';
import { validateShopifyToken, getShopInfo } from '../shopify.server.js';

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const shop = formData.get('shop') || process.env.SHOPIFY_STORE;
    const accessToken = formData.get('accessToken') || process.env.SHOPIFY_ADMIN_API_TOKEN;

    if (!shop || !accessToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing shop or access token" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    // Validate the token before creating session
    const isValid = await validateShopifyToken(shop, accessToken);
    if (!isValid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid Shopify access token" 
        }),
        { 
          status: 401, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    // Get shop info to verify connection
    const shopInfo = await getShopInfo(shop, accessToken);
    if (!shopInfo) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Cannot connect to Shopify store" 
        }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    // Create or update session
    const session = await prisma.session.upsert({
      where: { shop },
      update: {
        accessToken,
        updatedAt: new Date(),
      },
      create: {
        id: `standalone-${shop}-${Date.now()}`,
        shop,
        state: "active",
        isOnline: false,
        accessToken,
        scope: process.env.SCOPES || "read_products,write_products",
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        firstName: shopInfo.shop_owner?.split(' ')[0] || null,
        lastName: shopInfo.shop_owner?.split(' ')[1] || null,
        email: shopInfo.email || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Session initialized successfully",
        sessionId: session.id,
        shop: session.shop,
        shopInfo: {
          name: shopInfo.name,
          domain: shopInfo.domain,
          email: shopInfo.email,
        }
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("❌ Session initialization error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
};

export const loader = async () => {
  // Check if session already exists
  const existingSession = await prisma.session.findFirst({
    where: { shop: process.env.SHOPIFY_STORE }
  });

  if (existingSession) {
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Session already exists",
        sessionId: existingSession.id,
        shop: existingSession.shop
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  return new Response(
    JSON.stringify({ 
      message: "POST to this endpoint to initialize session",
      requiredFields: {
        shop: "Your Shopify store URL (e.g., your-store.myshopify.com)",
        accessToken: "Your Admin API access token (starts with shpat_)"
      }
    }),
    { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    }
  );
};