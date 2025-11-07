// // // // // THis code is for Standalone App

// // // // import {
// // // //   Links,
// // // //   Meta,
// // // //   Outlet,
// // // //   Scripts,
// // // //   ScrollRestoration,
// // // // } from "@remix-run/react";

// // // // export default function App() {
// // // //   return (
// // // //     <html>
// // // //       <head>
// // // //         <meta charSet="utf-8" />
// // // //         <meta name="viewport" content="width=device-width,initial-scale=1" />
// // // //         <link rel="preconnect" href="https://cdn.shopify.com/" />
// // // //         <link
// // // //           rel="stylesheet"
// // // //           href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
// // // //         />
// // // //         <Meta />
// // // //         <Links />
// // // //       </head>
// // // //       <body>
// // // //         <Outlet />
// // // //         <ScrollRestoration />
// // // //         <Scripts />
// // // //       </body>
// // // //     </html>
// // // //   );
// // // // }

// // // // // This code is for Embedded App

// // // // import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
// // // // import { AppProvider } from "@shopify/polaris";
// // // // import "@shopify/polaris/build/esm/styles.css";
// // // // import './output.css';

// // // // export default function App() {
// // // //   return (
// // // //     <html>
// // // //       <head>
// // // //         <meta charSet="utf-8" />
// // // //         <meta name="viewport" content="width=device-width,initial-scale=1" />
// // // //         <link rel="preconnect" href="https://cdn.shopify.com/" />
// // // //         <Meta />
// // // //         <Links />
// // // //       </head>
// // // //       <body>
// // // //         <AppProvider
// // // //           i18n={{
// // // //             Polaris: {
// // // //               Avatar: {
// // // //                 label: 'Avatar',
// // // //                 labelWithInitials: 'Avatar with initials {initials}',
// // // //               },
// // // //               ContextualSaveBar: { save: 'Save', discard: 'Discard' },
// // // //               TextField: { characterCount: '{count} characters' },
// // // //               TopBar: {
// // // //                 toggleMenuLabel: 'Toggle menu',
// // // //                 SearchField: { clearButtonLabel: 'Clear', search: 'Search' },
// // // //               },
// // // //               Modal: { iFrameTitle: 'body markup' },
// // // //               Frame: {
// // // //                 skipToContent: 'Skip to content',
// // // //                 navigationLabel: 'Navigation',
// // // //                 Navigation: {
// // // //                   closeMobileNavigationLabel: 'Close navigation',
// // // //                 },
// // // //               },
// // // //             },
// // // //           }}
// // // //         >
// // // //           <Outlet />
// // // //         </AppProvider>
// // // //         <ScrollRestoration />
// // // //         <LiveReload />
// // // //         <Scripts />
// // // //       </body>
// // // //     </html>
// // // //   );
// // // // }

// // // // This code is for Standalone App

// // // // import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
// // // // import './output.css';

// // // // export default function App() {
// // // //   return (
// // // //     <html>
// // // //       <head>
// // // //         <meta charSet="utf-8" />
// // // //         <meta name="viewport" content="width=device-width,initial-scale=1" />
// // // //         <Meta />
// // // //         <Links />
// // // //       </head>
// // // //       <body>
// // // //         <Outlet />
// // // //         <ScrollRestoration />
// // // //         <LiveReload />
// // // //         <Scripts />
// // // //       </body>
// // // //     </html>
// // // //   );
// // // // }

// // // import {
// // //   Links,
// // //   Meta,
// // //   Outlet,
// // //   Scripts,
// // //   ScrollRestoration,
// // //   LiveReload,
// // // } from "@remix-run/react";
// // // import { AppProvider } from "@shopify/polaris";
// // // import enTranslations from "@shopify/polaris/locales/en.json";
// // // import "@shopify/polaris/build/esm/styles.css";
// // // import './output.css';

// // // export const links = () => [
// // //   { rel: "stylesheet", href: "/output.css" },
// // // ];

// // // export function Layout({ children }) {
// // //   return (
// // //     <html lang="en">
// // //       <head>
// // //         <meta charSet="utf-8" />
// // //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// // //         <Meta />
// // //         <Links />
// // //       </head>
// // //       <body>
// // //         <AppProvider i18n={enTranslations}>
// // //           {children}
// // //         </AppProvider>
// // //         <ScrollRestoration />
// // //         <Scripts />
// // //         <LiveReload />
// // //       </body>
// // //     </html>
// // //   );
// // // }

// // // export default function App() {
// // //   return <Outlet />;
// // // }

// // // app/root.jsx
// // import {
// //   Links,
// //   Meta,
// //   Outlet,
// //   Scripts,
// //   ScrollRestoration,
// //   LiveReload,
// //   useLocation,
// // } from "@remix-run/react";
// // import { AppProvider } from "@shopify/polaris";
// // import enTranslations from "@shopify/polaris/locales/en.json";
// // import "@shopify/polaris/build/esm/styles.css";
// // import "./output.css";
// // import { useState } from "react";

// // export const links = () => [
// //   { rel: "stylesheet", href: "/output.css" },
// // ];

// // export function Layout({ children }) {
// //   return (
// //     <html lang="en">
// //       <head>
// //         <meta charSet="utf-8" />
// //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// //         <Meta />
// //         <Links />
// //       </head>
// //       <body>
// //         <AppProvider i18n={enTranslations}>{children}</AppProvider>
// //         <ScrollRestoration />
// //         <Scripts />
// //         <LiveReload />
// //       </body>
// //     </html>
// //   );
// // }

// // export default function App() {
// //   const location = useLocation();
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   const navLinks = [
// //     { href: "/app", label: "Home" },
// //     { href: "/app/upload", label: "Upload Videos" },
// //     { href: "/app/products", label: "Manage Products" },
// //     { href: "/app/collections", label: "Manage Collections" },
// //   ];

// //   const isActive = (path) => location.pathname === path;

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
// //       {/* NAVBAR */}
// //       <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="flex items-center">
// //               <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
// //                 EE
// //               </div>
// //               <span className="ml-3 text-xl font-bold text-gray-800">EE App</span>
// //             </div>

// //             <div className="hidden md:flex items-center space-x-1">
// //               {navLinks.map((link) => (
// //                 <a
// //                   key={link.href}
// //                   href={link.href}
// //                   className={`
// //                     relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
// //                     ${isActive(link.href)
// //                       ? "text-indigo-600 bg-indigo-50 shadow-sm"
// //                       : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
// //                     }
// //                   `}
// //                 >
// //                   {link.label}
// //                   {isActive(link.href) && (
// //                     <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-full"></span>
// //                   )}
// //                 </a>
// //               ))}
// //             </div>

// //             <div className="md:hidden">
// //               <button
// //                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //                 className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
// //               >
// //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={2}
// //                     d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
// //                   />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {mobileMenuOpen && (
// //           <div className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-lg">
// //             <div className="px-2 pt-2 pb-3 space-y-1">
// //               {navLinks.map((link) => (
// //                 <a
// //                   key={link.href}
// //                   href={link.href}
// //                   onClick={() => setMobileMenuOpen(false)}
// //                   className={`
// //                     block px-4 py-3 rounded-lg text-base font-medium transition-all
// //                     ${isActive(link.href)
// //                       ? "text-indigo-600 bg-indigo-50"
// //                       : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
// //                     }
// //                   `}
// //                 >
// //                   {link.label}
// //                 </a>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </nav>

// //       {/* MAIN CONTENT */}
// //       <div className="flex-grow p-6 max-w-7xl mx-auto w-full">
// //         <Outlet />
// //       </div>
// //     </div>
// //   );
// // }

// // app/root.jsx
// import {
//   Links,
//   Meta,
//   Outlet,
//   Scripts,
//   ScrollRestoration,
//   LiveReload,
//   useLocation,
// } from "@remix-run/react";
// import { rootAuthLoader } from "@clerk/remix/ssr.server";
// import { ClerkApp } from "@clerk/remix";
// import { AppProvider } from "@shopify/polaris";
// import enTranslations from "@shopify/polaris/locales/en.json";
// import "@shopify/polaris/build/esm/styles.css";
// import "./output.css";
// import { useState } from "react";

// export const links = () => [
//   { rel: "stylesheet", href: "/output.css" },
// ];

// export const loader = (args) => rootAuthLoader(args);

// export function Layout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <AppProvider i18n={enTranslations}>{children}</AppProvider>
//         <ScrollRestoration />
//         <Scripts />
//         <LiveReload />
//       </body>
//     </html>
//   );
// }

// function App() {
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { href: "/app", label: "Home" },
//     { href: "/app/upload", label: "Upload Videos" },
//     { href: "/app/products", label: "Manage Products" },
//     { href: "/app/collections", label: "Manage Collections" },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
//       {/* NAVBAR */}
//       <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
//                 EE
//               </div>
//               <span className="ml-3 text-xl font-bold text-gray-800">EE App</span>
//             </div>

//             <div className="hidden md:flex items-center space-x-1">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   className={`
//                     relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
//                     ${isActive(link.href)
//                       ? "text-indigo-600 bg-indigo-50 shadow-sm"
//                       : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
//                     }
//                   `}
//                 >
//                   {link.label}
//                   {isActive(link.href) && (
//                     <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-full"></span>
//                   )}
//                 </a>
//               ))}
//             </div>

//             <div className="flex items-center space-x-4">
//               {/* Clerk User Button */}
//               <div className="hidden md:block">
//                 <clerk-user-button />
//               </div>

//               {/* Mobile Menu Button */}
//               <div className="md:hidden flex items-center space-x-2">
//                 <clerk-user-button />
//                 <button
//                   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                   className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-lg">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={`
//                     block px-4 py-3 rounded-lg text-base font-medium transition-all
//                     ${isActive(link.href)
//                       ? "text-indigo-600 bg-indigo-50"
//                       : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
//                     }
//                   `}
//                 >
//                   {link.label}
//                 </a>
//               ))}
//               {/* Mobile Clerk User Section */}
//               <div className="px-4 py-3 border-t border-gray-200">
//                 <clerk-user-button />
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* MAIN CONTENT */}
//       <div className="flex-grow p-6 max-w-7xl mx-auto w-full">
//         <Outlet />
//       </div>

//       {/* Clerk Scripts */}
//       <script
//         type="text/javascript"
//         async
//         defer
//         src="https://cdnjs.cloudflare.com/ajax/libs/clerk/4.29.11/clerk.browser.js"
//         onLoad={() => {
//           if (window.Clerk) {
//             window.Clerk.load({
//               publishableKey: "pk_test_ZmVhc2libGUtZ3JvdXBlci0xMi5jbGVyay5hY2NvdW50cy5kZXYk",
//             });
//           }
//         }}
//       />
//     </div>
//   );
// }

// export default ClerkApp(App, {
//   publishableKey: "pk_test_ZmVhc2libGUtZ3JvdXBlci0xMi5jbGVyay5hY2NvdW50cy5kZXYk",
// });

// app/root.jsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload,
  useLocation,
} from "@remix-run/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp } from "@clerk/remix";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import "./output.css";
import { useState } from "react";
// Import UserButton for proper Clerk user management
import { UserButton } from "@clerk/remix";

export const links = () => [{ rel: "stylesheet", href: "/output.css" }];

export const loader = (args) => rootAuthLoader(args);

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider i18n={enTranslations}>{children}</AppProvider>
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  );
}

function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/app", label: "Home" },
    { href: "/app/upload", label: "Upload Videos" },
    { href: "/app/products", label: "Manage Products" },
    { href: "/app/collections", label: "Manage Collections" },
    { href: "/app/testApi", label: "Test API" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* NAVBAR */}
      <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                EE
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">
                EE App
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      isActive(link.href)
                        ? "text-indigo-600 bg-indigo-50 shadow-sm"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                    }
                  `}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-full"></span>
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Clerk User Button */}
              <div className="hidden md:block">
                <UserButton />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <UserButton />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        mobileMenuOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16M4 18h16"
                      }
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg text-base font-medium transition-all
                    ${
                      isActive(link.href)
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    }
                  `}
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile Clerk User Section */}
              <div className="px-4 py-3 border-t border-gray-200">
                <UserButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </div>

      {/* Remove the Clerk script - @clerk/remix handles this */}
    </div>
  );
}

export default ClerkApp(App, {
  publishableKey: "pk_test_aG9uZXN0LXNjdWxwaW4tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA",
});
