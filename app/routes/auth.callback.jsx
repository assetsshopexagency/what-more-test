// // app/routes/auth.callback.jsx
// import { redirect } from "@remix-run/node";
// import { authenticate } from "../shopify.server";

// export const loader = async ({ request }) => {
//   const { session } = await authenticate.admin(request);
//   // Save session or redirect to app root
//   return redirect("/app");
// };



// app/routes/auth/callback.jsx
import { authenticate } from "../shopify.server";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "../db.server";
import { redirect } from "@remix-run/node";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { userId } = await getAuth(request);

  if (userId) {
    await prisma.session.update({
      where: { id: session.id },
      data: { clerkUserId: userId },
    });
  }

  return redirect("/");
};