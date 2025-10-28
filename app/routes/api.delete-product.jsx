// import { json } from "@remix-run/node";
// import { authenticate } from "../shopify.server";
// import { prisma } from "../db.server";

// export const action = async ({ request }) => {
//   try {
//     const { admin, session } = await authenticate.admin(request);
//     const { productId } = await request.json();

//     if (!productId) {
//       return json({ success: false, error: "Product ID is required" }, { status: 400 });
//     }

//     // Delete the product — thanks to cascade, it’ll also remove from VideoProduct
//     await prisma.product.delete({
//       where: { id: Number(productId) },
//     });

//     return json({ success: true, message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return json({ success: false, error: error.message }, { status: 500 });
//   }
// };
