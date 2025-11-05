

// // // // File: app.jsx
// // // import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
// // // import { boundary } from "@shopify/shopify-app-remix/server";
// // // import { AppProvider } from "@shopify/shopify-app-remix/react";
// // // import { NavMenu } from "@shopify/app-bridge-react";
// // // import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
// // // import { authenticate } from "../shopify.server";

// // // export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

// // // export const loader = async ({ request }) => {
// // //   await authenticate.admin(request);

// // //   return { apiKey: process.env.SHOPIFY_API_KEY || "" };
// // // };

// // // export default function App() {
// // //   const { apiKey } = useLoaderData();

// // //   return (
// // //     <AppProvider isEmbeddedApp apiKey={apiKey}>
// // //       <NavMenu>
// // //         <Link to="/app" rel="home">
// // //           Home
// // //         </Link>
// // //         <Link to="/app/upload">Upload Videos</Link>
// // //         <Link to="/app/products">Manage Products</Link>
// // //         <Link to="/app/collections">Manage Collections</Link>
// // //       </NavMenu>
// // //       <Outlet />
// // //     </AppProvider>
// // //   );
// // // }

// // // // Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
// // // export function ErrorBoundary() {
// // //   return boundary.error(useRouteError());
// // // }

// // // export const headers = (headersArgs) => {
// // //   return boundary.headers(headersArgs);
// // // };





// // // // File: app.jsx
// // // import { Link, Outlet } from "@remix-run/react";
// // // import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
// // // import { authenticate } from "../shopify.server";

// // // export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

// // // export const loader = async ({ request }) => {
// // //   await authenticate.admin(request);

// // //   return null;
// // // };

// // // export default function App() {
// // //   return (
// // //     <html>
// // //       <head>
// // //         {/* Add any head elements if needed */}
// // //       </head>
// // //       <body>
// // //         <nav>
// // //           <Link to="/app">Home</Link>
// // //           <Link to="/app/upload">Upload Videos</Link>
// // //           <Link to="/app/products">Manage Products</Link>
// // //           <Link to="/app/collections">Manage Collections</Link>
// // //         </nav>
// // //         <Outlet />
// // //       </body>
// // //     </html>
// // //   );
// // // }









// // import { Links, Meta, Outlet, Scripts, ScrollRestoration, LiveReload } from "@remix-run/react";
// // import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
// // import tailwindStyles from "./tailwind.css?url";
// // import { authenticate } from "../shopify.server";

// // export const links = () => [
// //   { rel: "stylesheet", href: polarisStyles },
// //   { rel: "stylesheet", href: tailwindStyles },
// // ];

// // export const loader = async ({ request }) => {
// //   await authenticate.admin(request);
// //   return null;
// // };

// // export default function App() {
// //   return (
// //     <html lang="en" className="bg-gray-100">
// //       <head>
// //         <Meta />
// //         <Links />
// //       </head>
// //       <body className="min-h-screen flex">
// //         <nav className="bg-white shadow-md p-4 flex gap-4 w-full">
// //           <a className="text-blue-600 hover:underline" href="/app">Home</a>
// //           <a className="text-blue-600 hover:underline" href="/app/upload">Upload Videos</a>
// //           <a className="text-blue-600 hover:underline" href="/app/products">Manage Products</a>
// //           <a className="text-blue-600 hover:underline" href="/app/collections">Manage Collections</a>
// //         </nav>

// //         <div className="p-6 w-full">
// //           <Outlet />
// //         </div>

// //         <ScrollRestoration />
// //         <Scripts />
// //         <LiveReload />
// //       </body>
// //     </html>
// //   );
// // }



// // app/routes/app.jsx

// import { Links, Meta, Outlet, Scripts, ScrollRestoration, LiveReload } from "@remix-run/react";
// import tailwindStyles from "./tailwind.css?url";
// import { authenticate } from "../shopify.server";

// export const links = () => [
//   { rel: "stylesheet", href: tailwindStyles },
// ];

// export const loader = async ({ request }) => {
//   await authenticate.admin(request);
//   return null;
// };

// export default function App() {
//   return (
//     <html lang="en" className="bg-gray-100">
//       <head>
//         <Meta />
//         <Links />
//       </head>
//       <body className="min-h-screen flex flex-col">
//         <nav className="bg-white shadow-md p-4 flex gap-4">
//           <a className="text-blue-600 hover:underline" href="/app">Home</a>
//           <a className="text-blue-600 hover:underline" href="/app/upload">Upload Videos</a>
//           <a className="text-blue-600 hover:underline" href="/app/products">Manage Products</a>
//           <a className="text-blue-600 hover:underline" href="/app/collections">Manage Collections</a>
//         </nav>

//         <div className="p-6 w-full flex-grow">
//           <Outlet />
//         </div>

//         <ScrollRestoration />
//         <Scripts />
//         <LiveReload />
//       </body>
//     </html>
//   );
// }


// app/routes/app.jsx
import { json, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";

export async function loader(args) {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  return json({});
}

export default function AppHome() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to EE App!</h1>
      <p className="text-gray-600 mb-4">
        This is your dashboard home. Use the navigation to manage products, collections, and more.
      </p>
      <a 
        href="/app/testApi"
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Go to Test API
      </a>
    </div>
  );
}