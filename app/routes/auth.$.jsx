// // import { authenticate } from "../shopify.server";

// // export const loader = async ({ request }) => {
// //   await authenticate.admin(request);

// //   return null;
// // };



// // app/routes/auth.$.jsx
// import { redirect } from "@remix-run/node";
// import { authenticate } from "../shopify.server";

// export const loader = async ({ request }) => {
//   return authenticate.admin(request);
// };




// app/routes/auth.$.jsx
import { json, redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";

import prisma from "../db.server";

export const loader = async ({ request }) => {
  const { session: shopifySession, redirect: shopifyRedirect } = await authenticate.admin(request);

  if (shopifyRedirect) {
    return shopifyRedirect;
  }

  const { userId } = await getAuth(request);
  if (!userId) {
    // Redirect to Clerk sign-in if no Clerk session
    return redirect("/sign-in");
  }

  // Link Clerk user to Shopify session if not already
  const existingSession = await prisma.session.findUnique({ where: { id: shopifySession.id } });
  if (existingSession && !existingSession.clerkUserId) {
    await prisma.session.update({
      where: { id: shopifySession.id },
      data: { clerkUserId: userId },
    });
  }

  // Redirect to app after auth
  return redirect("/app");
};