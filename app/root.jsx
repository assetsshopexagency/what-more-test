// // // // // // // app/root.jsx
// // // // // // import {
// // // // // //   Outlet,
// // // // // //   Scripts,
// // // // // //   ScrollRestoration,
// // // // // //   Link,
// // // // // //   useLocation,
// // // // // //   Links,
// // // // // // } from "react-router";
// // // // // // import { useState } from "react";

// // // // // // // Import CSS like this for React Router with Vite
// // // // // // import "./styles/tailwind.css";

// // // // // // export default function App() {
// // // // // //   const location = useLocation();
// // // // // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// // // // // //   const navLinks = [{ href: "/app", label: "Home" }];
// // // // // //   const isActive = (path) => location.pathname === path;

// // // // // //   return (
// // // // // //     <html lang="en">
// // // // // //       <head>
// // // // // //         <meta charSet="utf-8" />
// // // // // //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// // // // // //         <title>Watch-EE</title>
// // // // // //         <Links />
// // // // // //       </head>
// // // // // //       <body>
// // // // // //         {/* Simple version without complex styles first */}
// // // // // //         <div>
// // // // // //           <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
// // // // // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // // // //               <div style={{ display: 'flex', alignItems: 'center' }}>
// // // // // //                 <div style={{ 
// // // // // //                   width: '40px', 
// // // // // //                   height: '40px', 
// // // // // //                   borderRadius: '8px', 
// // // // // //                   backgroundColor: 'black',
// // // // // //                   color: 'white',
// // // // // //                   display: 'flex',
// // // // // //                   alignItems: 'center',
// // // // // //                   justifyContent: 'center',
// // // // // //                   fontWeight: 'bold',
// // // // // //                   fontSize: '18px'
// // // // // //                 }}>
// // // // // //                   EE
// // // // // //                 </div>
// // // // // //                 <span style={{ marginLeft: '12px', fontSize: '20px', fontWeight: 'bold' }}>
// // // // // //                   EE App
// // // // // //                 </span>
// // // // // //               </div>
              
// // // // // //               <Link 
// // // // // //                 to="/app" 
// // // // // //                 style={{ 
// // // // // //                   padding: '8px 16px', 
// // // // // //                   borderRadius: '6px',
// // // // // //                   backgroundColor: location.pathname === '/app' ? '#e0e7ff' : 'transparent',
// // // // // //                   color: location.pathname === '/app' ? '#4f46e5' : '#374151',
// // // // // //                   textDecoration: 'none'
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Home
// // // // // //               </Link>
// // // // // //             </div>
// // // // // //           </nav>

// // // // // //           <main style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
// // // // // //             <Outlet />
// // // // // //           </main>

// // // // // //           <footer style={{ 
// // // // // //             padding: '1rem', 
// // // // // //             textAlign: 'center', 
// // // // // //             fontSize: '12px', 
// // // // // //             color: '#6b7280',
// // // // // //             borderTop: '1px solid #e5e7eb'
// // // // // //           }}>
// // // // // //             © 2025 Watch-EE • Built with Remix + Shopify
// // // // // //           </footer>
// // // // // //         </div>

// // // // // //         <ScrollRestoration />
// // // // // //         <Scripts />
// // // // // //       </body>
// // // // // //     </html>
// // // // // //   );
// // // // // // }



// // // // // // app/root.jsx
// // // // // import {
// // // // //   Outlet,
// // // // //   Scripts,
// // // // //   ScrollRestoration,
// // // // //   Link,
// // // // //   useLocation,
// // // // //   Links,
// // // // // } from "react-router";
// // // // // import { useState } from "react";
// // // // // import "./styles/tailwind.css";

// // // // // export default function App() {
// // // // //   const location = useLocation();
// // // // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // // // //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // // // //   const menuSections = [
// // // // //     {
// // // // //       title: "Whatmore",
// // // // //       items: [
// // // // //         { label: "Home", checked: false },
// // // // //         { 
// // // // //           label: "VIDEO WIDGETS", 
// // // // //           subItems: [
// // // // //             "Video Gallery",
// // // // //             "Product Pages", 
// // // // //             "Homepage",
// // // // //             "Collection Pages",
// // // // //             "Pages"
// // // // //           ]
// // // // //         }
// // // // //       ]
// // // // //     },
// // // // //     {
// // // // //       title: "MARKETING",
// // // // //       items: [
// // // // //         { label: "Smart Retargeting", checked: true },
// // // // //         { label: "Advanced Retargeting", checked: true },
// // // // //         { label: "Spotlight", checked: true },
// // // // //         { label: "Lead Capture & Quiz", checked: false }
// // // // //       ]
// // // // //     },
// // // // //     {
// // // // //       title: "ANALYTICS", 
// // // // //       items: [
// // // // //         { label: "Overview", checked: true },
// // // // //         { label: "Conversions", checked: true },
// // // // //         { label: "Engagement", checked: false },
// // // // //         { label: "A/B Testing", checked: false }
// // // // //       ]
// // // // //     },
// // // // //     {
// // // // //       title: "SETTINGS",
// // // // //       items: [
// // // // //         { label: "Customizations", checked: true },
// // // // //         { label: "Profile", checked: false }
// // // // //       ]
// // // // //     }
// // // // //   ];

// // // // //   return (
// // // // //     <html lang="en">
// // // // //       <head>
// // // // //         <meta charSet="utf-8" />
// // // // //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// // // // //         <title>Watch-EE</title>
// // // // //         <Links />
// // // // //       </head>
// // // // //       <body>
// // // // //         <div style={{ display: 'flex', minHeight: '100vh' }}>
// // // // //           {/* Sidebar */}
// // // // //           <aside style={{
// // // // //             width: '280px',
// // // // //             backgroundColor: '#f8fafc',
// // // // //             borderRight: '1px solid #e2e8f0',
// // // // //             padding: '1.5rem 1rem',
// // // // //             display: 'flex',
// // // // //             flexDirection: 'column'
// // // // //           }}>
// // // // //             {/* Logo */}
// // // // //             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', padding: '0 0.5rem' }}>
// // // // //               <div style={{
// // // // //                 width: '40px',
// // // // //                 height: '40px',
// // // // //                 borderRadius: '8px',
// // // // //                 backgroundColor: 'black',
// // // // //                 color: 'white',
// // // // //                 display: 'flex',
// // // // //                 alignItems: 'center',
// // // // //                 justifyContent: 'center',
// // // // //                 fontWeight: 'bold',
// // // // //                 fontSize: '18px'
// // // // //               }}>
// // // // //                 EE
// // // // //               </div>
// // // // //               <span style={{ marginLeft: '12px', fontSize: '20px', fontWeight: 'bold' }}>
// // // // //                 EE App
// // // // //               </span>
// // // // //             </div>

// // // // //             {/* Navigation Menu */}
// // // // //             <nav style={{ flex: 1 }}>
// // // // //               {menuSections.map((section, sectionIndex) => (
// // // // //                 <div key={section.title} style={{ marginBottom: '2rem' }}>
// // // // //                   {/* Section Title */}
// // // // //                   <h3 style={{
// // // // //                     fontSize: '0.75rem',
// // // // //                     fontWeight: '600',
// // // // //                     textTransform: 'uppercase',
// // // // //                     color: '#64748b',
// // // // //                     letterSpacing: '0.05em',
// // // // //                     marginBottom: '0.75rem',
// // // // //                     padding: '0 0.5rem'
// // // // //                   }}>
// // // // //                     {section.title}
// // // // //                   </h3>

// // // // //                   {/* Section Items */}
// // // // //                   <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
// // // // //                     {section.items.map((item, itemIndex) => (
// // // // //                       <li key={item.label} style={{ marginBottom: '0.25rem' }}>
// // // // //                         {item.subItems ? (
// // // // //                           // Item with sub-items
// // // // //                           <div>
// // // // //                             <div style={{
// // // // //                               display: 'flex',
// // // // //                               alignItems: 'center',
// // // // //                               padding: '0.5rem 0.75rem',
// // // // //                               borderRadius: '6px',
// // // // //                               color: '#374151',
// // // // //                               cursor: 'pointer'
// // // // //                             }}>
// // // // //                               <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
// // // // //                             </div>
// // // // //                             {/* Sub-items */}
// // // // //                             <ul style={{ 
// // // // //                               listStyle: 'none', 
// // // // //                               padding: '0 0 0 1rem', 
// // // // //                               margin: '0.25rem 0' 
// // // // //                             }}>
// // // // //                               {item.subItems.map((subItem) => (
// // // // //                                 <li key={subItem}>
// // // // //                                   <div style={{
// // // // //                                     display: 'flex',
// // // // //                                     alignItems: 'center',
// // // // //                                     padding: '0.375rem 0.75rem',
// // // // //                                     borderRadius: '4px',
// // // // //                                     color: '#64748b',
// // // // //                                     fontSize: '0.875rem'
// // // // //                                   }}>
// // // // //                                     {subItem}
// // // // //                                   </div>
// // // // //                                 </li>
// // // // //                               ))}
// // // // //                             </ul>
// // // // //                           </div>
// // // // //                         ) : (
// // // // //                           // Regular checkbox item
// // // // //                           <div style={{
// // // // //                             display: 'flex',
// // // // //                             alignItems: 'center',
// // // // //                             padding: '0.5rem 0.75rem',
// // // // //                             borderRadius: '6px',
// // // // //                             color: '#374151',
// // // // //                             cursor: 'pointer',
// // // // //                             transition: 'background-color 0.2s'
// // // // //                           }}>
// // // // //                             <div style={{
// // // // //                               width: '16px',
// // // // //                               height: '16px',
// // // // //                               border: '2px solid #d1d5db',
// // // // //                               borderRadius: '3px',
// // // // //                               marginRight: '0.75rem',
// // // // //                               backgroundColor: item.checked ? '#4f46e5' : 'transparent',
// // // // //                               display: 'flex',
// // // // //                               alignItems: 'center',
// // // // //                               justifyContent: 'center'
// // // // //                             }}>
// // // // //                               {item.checked && (
// // // // //                                 <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
// // // // //                                   <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // // // //                                 </svg>
// // // // //                               )}
// // // // //                             </div>
// // // // //                             <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
// // // // //                           </div>
// // // // //                         )}
// // // // //                       </li>
// // // // //                     ))}
// // // // //                   </ul>

// // // // //                   {/* Separator */}
// // // // //                   {sectionIndex < menuSections.length - 1 && (
// // // // //                     <div style={{
// // // // //                       height: '1px',
// // // // //                       backgroundColor: '#e2e8f0',
// // // // //                       margin: '1rem 0'
// // // // //                     }} />
// // // // //                   )}
// // // // //                 </div>
// // // // //               ))}
// // // // //             </nav>
// // // // //           </aside>

// // // // //           {/* Main Content */}
// // // // //           <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
// // // // //             {/* Simple top bar for mobile menu button (optional) */}
// // // // //             <header style={{
// // // // //               padding: '1rem 1.5rem',
// // // // //               borderBottom: '1px solid #e2e8f0',
// // // // //               display: 'flex',
// // // // //               justifyContent: 'flex-end',
// // // // //               alignItems: 'center'
// // // // //             }}>
// // // // //               <button
// // // // //                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // // // //                 style={{
// // // // //                   padding: '0.5rem',
// // // // //                   borderRadius: '6px',
// // // // //                   border: '1px solid #d1d5db',
// // // // //                   backgroundColor: 'transparent',
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //               >
// // // // //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// // // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// // // // //                 </svg>
// // // // //               </button>
// // // // //             </header>

// // // // //             {/* Page Content */}
// // // // //             <main style={{ 
// // // // //               flex: 1, 
// // // // //               padding: '1.5rem', 
// // // // //               backgroundColor: 'white',
// // // // //               overflow: 'auto'
// // // // //             }}>
// // // // //               <Outlet />
// // // // //             </main>

// // // // //             {/* Footer */}
// // // // //             <footer style={{
// // // // //               padding: '1rem 1.5rem',
// // // // //               textAlign: 'center',
// // // // //               fontSize: '12px',
// // // // //               color: '#6b7280',
// // // // //               borderTop: '1px solid #e5e7eb',
// // // // //               backgroundColor: '#f9fafb'
// // // // //             }}>
// // // // //               © 2025 Watch-EE • Built with Remix + Shopify
// // // // //             </footer>
// // // // //           </div>
// // // // //         </div>

// // // // //         <ScrollRestoration />
// // // // //         <Scripts />
// // // // //       </body>
// // // // //     </html>
// // // // //   );
// // // // // }





// // // // // app/root.jsx
// // // // import {
// // // //   Outlet,
// // // //   Scripts,
// // // //   ScrollRestoration,
// // // //   Link,
// // // //   useLocation,
// // // //   Links,
// // // // } from "react-router";
// // // // import { useState } from "react";
// // // // import "./styles/tailwind.css";

// // // // export default function App() {
// // // //   const location = useLocation();
// // // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // // //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // // //   const menuSections = [
// // // //     {
// // // //       title: "Whatmore",
// // // //       items: [
// // // //         { label: "Home", checked: false },
// // // //         { 
// // // //           label: "VIDEO WIDGETS", 
// // // //           subItems: [
// // // //             "Video Gallery",
// // // //             "Product Pages", 
// // // //             "Homepage",
// // // //             "Collection Pages",
// // // //             "Pages"
// // // //           ]
// // // //         }
// // // //       ]
// // // //     },
// // // //     {
// // // //       title: "MARKETING",
// // // //       items: [
// // // //         { label: "Smart Retargeting", checked: true },
// // // //         { label: "Advanced Retargeting", checked: true },
// // // //         { label: "Spotlight", checked: true },
// // // //         { label: "Lead Capture & Quiz", checked: false }
// // // //       ]
// // // //     },
// // // //     {
// // // //       title: "ANALYTICS", 
// // // //       items: [
// // // //         { label: "Overview", checked: true },
// // // //         { label: "Conversions", checked: true },
// // // //         { label: "Engagement", checked: false },
// // // //         { label: "A/B Testing", checked: false }
// // // //       ]
// // // //     },
// // // //     {
// // // //       title: "SETTINGS",
// // // //       items: [
// // // //         { label: "Customizations", checked: true },
// // // //         { label: "Profile", checked: false }
// // // //       ]
// // // //     }
// // // //   ];

// // // //   return (
// // // //     <html lang="en">
// // // //       <head>
// // // //         <meta charSet="utf-8" />
// // // //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// // // //         <title>Watch-EE</title>
// // // //         <Links />
// // // //       </head>
// // // //       <body>
// // // //         <div style={{ display: 'flex', minHeight: '100vh' }}>
// // // //           {/* Sidebar */}
// // // //           {sidebarOpen && (
// // // //             <aside style={{
// // // //               width: '280px',
// // // //               backgroundColor: '#f8fafc',
// // // //               borderRight: '1px solid #e2e8f0',
// // // //               padding: '1.5rem 1rem',
// // // //               display: 'flex',
// // // //               flexDirection: 'column',
// // // //               position: 'relative',
// // // //               transition: 'transform 0.3s ease'
// // // //             }}>
// // // //               {/* Close Button */}
// // // //               <button
// // // //                 onClick={() => setSidebarOpen(false)}
// // // //                 style={{
// // // //                   position: 'absolute',
// // // //                   top: '1rem',
// // // //                   right: '1rem',
// // // //                   width: '32px',
// // // //                   height: '32px',
// // // //                   borderRadius: '6px',
// // // //                   border: '1px solid #d1d5db',
// // // //                   backgroundColor: 'white',
// // // //                   display: 'flex',
// // // //                   alignItems: 'center',
// // // //                   justifyContent: 'center',
// // // //                   cursor: 'pointer',
// // // //                   fontSize: '16px',
// // // //                   color: '#374151',
// // // //                   transition: 'all 0.2s'
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   e.target.style.backgroundColor = '#f3f4f6';
// // // //                   e.target.style.color = '#1f2937';
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.target.style.backgroundColor = 'white';
// // // //                   e.target.style.color = '#374151';
// // // //                 }}
// // // //               >
// // // //                 ×
// // // //               </button>

// // // //               {/* Logo */}
// // // //               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', padding: '0 0.5rem', paddingRight: '2rem' }}>
// // // //                 <div style={{
// // // //                   width: '40px',
// // // //                   height: '40px',
// // // //                   borderRadius: '8px',
// // // //                   backgroundColor: 'black',
// // // //                   color: 'white',
// // // //                   display: 'flex',
// // // //                   alignItems: 'center',
// // // //                   justifyContent: 'center',
// // // //                   fontWeight: 'bold',
// // // //                   fontSize: '18px'
// // // //                 }}>
// // // //                   EE
// // // //                 </div>
// // // //                 <span style={{ marginLeft: '12px', fontSize: '20px', fontWeight: 'bold' }}>
// // // //                   EE App
// // // //                 </span>
// // // //               </div>

// // // //               {/* Navigation Menu */}
// // // //               <nav style={{ flex: 1 }}>
// // // //                 {menuSections.map((section, sectionIndex) => (
// // // //                   <div key={section.title} style={{ marginBottom: '2rem' }}>
// // // //                     {/* Section Title */}
// // // //                     <h3 style={{
// // // //                       fontSize: '0.75rem',
// // // //                       fontWeight: '600',
// // // //                       textTransform: 'uppercase',
// // // //                       color: '#64748b',
// // // //                       letterSpacing: '0.05em',
// // // //                       marginBottom: '0.75rem',
// // // //                       padding: '0 0.5rem'
// // // //                     }}>
// // // //                       {section.title}
// // // //                     </h3>

// // // //                     {/* Section Items */}
// // // //                     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
// // // //                       {section.items.map((item, itemIndex) => (
// // // //                         <li key={item.label} style={{ marginBottom: '0.25rem' }}>
// // // //                           {item.subItems ? (
// // // //                             // Item with sub-items
// // // //                             <div>
// // // //                               <div style={{
// // // //                                 display: 'flex',
// // // //                                 alignItems: 'center',
// // // //                                 padding: '0.5rem 0.75rem',
// // // //                                 borderRadius: '6px',
// // // //                                 color: '#374151',
// // // //                                 cursor: 'pointer'
// // // //                               }}>
// // // //                                 <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
// // // //                               </div>
// // // //                               {/* Sub-items */}
// // // //                               <ul style={{ 
// // // //                                 listStyle: 'none', 
// // // //                                 padding: '0 0 0 1rem', 
// // // //                                 margin: '0.25rem 0' 
// // // //                               }}>
// // // //                                 {item.subItems.map((subItem) => (
// // // //                                   <li key={subItem}>
// // // //                                     <div style={{
// // // //                                       display: 'flex',
// // // //                                       alignItems: 'center',
// // // //                                       padding: '0.375rem 0.75rem',
// // // //                                       borderRadius: '4px',
// // // //                                       color: '#64748b',
// // // //                                       fontSize: '0.875rem'
// // // //                                     }}>
// // // //                                       {subItem}
// // // //                                     </div>
// // // //                                   </li>
// // // //                                 ))}
// // // //                               </ul>
// // // //                             </div>
// // // //                           ) : (
// // // //                             // Regular checkbox item
// // // //                             <div style={{
// // // //                               display: 'flex',
// // // //                               alignItems: 'center',
// // // //                               padding: '0.5rem 0.75rem',
// // // //                               borderRadius: '6px',
// // // //                               color: '#374151',
// // // //                               cursor: 'pointer',
// // // //                               transition: 'background-color 0.2s'
// // // //                             }}>
// // // //                               <div style={{
// // // //                                 width: '16px',
// // // //                                 height: '16px',
// // // //                                 border: '2px solid #d1d5db',
// // // //                                 borderRadius: '3px',
// // // //                                 marginRight: '0.75rem',
// // // //                                 backgroundColor: item.checked ? '#4f46e5' : 'transparent',
// // // //                                 display: 'flex',
// // // //                                 alignItems: 'center',
// // // //                                 justifyContent: 'center'
// // // //                               }}>
// // // //                                 {item.checked && (
// // // //                                   <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
// // // //                                     <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // // //                                   </svg>
// // // //                                 )}
// // // //                               </div>
// // // //                               <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
// // // //                             </div>
// // // //                           )}
// // // //                         </li>
// // // //                       ))}
// // // //                     </ul>

// // // //                     {/* Separator */}
// // // //                     {sectionIndex < menuSections.length - 1 && (
// // // //                       <div style={{
// // // //                         height: '1px',
// // // //                         backgroundColor: '#e2e8f0',
// // // //                         margin: '1rem 0'
// // // //                       }} />
// // // //                     )}
// // // //                   </div>
// // // //                 ))}
// // // //               </nav>
// // // //             </aside>
// // // //           )}

// // // //           {/* Main Content */}
// // // //           <div style={{ 
// // // //             flex: 1, 
// // // //             display: 'flex', 
// // // //             flexDirection: 'column',
// // // //             transition: 'margin-left 0.3s ease'
// // // //           }}>
// // // //             {/* Top bar with menu toggle */}
// // // //             <header style={{
// // // //               padding: '1rem 1.5rem',
// // // //               borderBottom: '1px solid #e2e8f0',
// // // //               display: 'flex',
// // // //               justifyContent: 'space-between',
// // // //               alignItems: 'center',
// // // //               backgroundColor: 'white'
// // // //             }}>
// // // //               {/* Menu Toggle Button - Only show when sidebar is closed */}
// // // //               {!sidebarOpen && (
// // // //                 <button
// // // //                   onClick={() => setSidebarOpen(true)}
// // // //                   style={{
// // // //                     padding: '0.5rem 1rem',
// // // //                     borderRadius: '6px',
// // // //                     border: '1px solid #d1d5db',
// // // //                     backgroundColor: 'white',
// // // //                     cursor: 'pointer',
// // // //                     display: 'flex',
// // // //                     alignItems: 'center',
// // // //                     gap: '0.5rem',
// // // //                     fontSize: '0.875rem',
// // // //                     color: '#374151',
// // // //                     transition: 'all 0.2s'
// // // //                   }}
// // // //                   onMouseEnter={(e) => {
// // // //                     e.target.style.backgroundColor = '#f3f4f6';
// // // //                   }}
// // // //                   onMouseLeave={(e) => {
// // // //                     e.target.style.backgroundColor = 'white';
// // // //                   }}
// // // //                 >
// // // //                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// // // //                   </svg>
// // // //                   Menu
// // // //                 </button>
// // // //               )}

// // // //               {/* Home Link */}
// // // //               <Link
// // // //                 to="/app"
// // // //                 style={{
// // // //                   padding: '8px 16px',
// // // //                   borderRadius: '6px',
// // // //                   backgroundColor: location.pathname === '/app' ? '#e0e7ff' : 'transparent',
// // // //                   color: location.pathname === '/app' ? '#4f46e5' : '#374151',
// // // //                   textDecoration: 'none',
// // // //                   fontSize: '0.875rem',
// // // //                   fontWeight: '500'
// // // //                 }}
// // // //               >
// // // //                 Home
// // // //               </Link>
// // // //             </header>

// // // //             {/* Page Content */}
// // // //             <main style={{ 
// // // //               flex: 1, 
// // // //               padding: '1.5rem', 
// // // //               backgroundColor: 'white',
// // // //               overflow: 'auto'
// // // //             }}>
// // // //               <Outlet />
// // // //             </main>

// // // //             {/* Footer */}
// // // //             <footer style={{
// // // //               padding: '1rem 1.5rem',
// // // //               textAlign: 'center',
// // // //               fontSize: '12px',
// // // //               color: '#6b7280',
// // // //               borderTop: '1px solid #e5e7eb',
// // // //               backgroundColor: '#f9fafb'
// // // //             }}>
// // // //               © 2025 Watch-EE • Built with Remix + Shopify
// // // //             </footer>
// // // //           </div>
// // // //         </div>

// // // //         <ScrollRestoration />
// // // //         <Scripts />
// // // //       </body>
// // // //     </html>
// // // //   );
// // // // }





// // // // app/root.jsx
// // // import {
// // //   Outlet,
// // //   Scripts,
// // //   ScrollRestoration,
// // //   Link,
// // //   useLocation,
// // //   Links,
// // // } from "react-router";
// // // import { useState } from "react";
// // // import "./styles/tailwind.css";

// // // export default function App() {
// // //   const location = useLocation();
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // //   const menuSections = [
// // //     {
// // //       title: "Whatmore",
// // //       items: [
// // //         { label: "Home", checked: false, href: "/app" },
// // //         { 
// // //           label: "VIDEO WIDGETS", 
// // //           subItems: [
// // //             "Video Gallery",
// // //             "Product Pages", 
// // //             "Homepage",
// // //             "Collection Pages",
// // //             "Pages"
// // //           ]
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       title: "MARKETING",
// // //       items: [
// // //         { label: "Smart Retargeting", checked: true },
// // //         { label: "Advanced Retargeting", checked: true },
// // //         { label: "Spotlight", checked: true },
// // //         { label: "Lead Capture & Quiz", checked: false }
// // //       ]
// // //     },
// // //     {
// // //       title: "ANALYTICS", 
// // //       items: [
// // //         { label: "Overview", checked: true },
// // //         { label: "Conversions", checked: true },
// // //         { label: "Engagement", checked: false },
// // //         { label: "A/B Testing", checked: false }
// // //       ]
// // //     },
// // //     {
// // //       title: "SETTINGS",
// // //       items: [
// // //         { label: "Customizations", checked: true },
// // //         { label: "Profile", checked: false }
// // //       ]
// // //     }
// // //   ];

// // //   return (
// // //     <html lang="en">
// // //       <head>
// // //         <meta charSet="utf-8" />
// // //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// // //         <title>Watch-EE</title>
// // //         <Links />
// // //       </head>
// // //       <body>
// // //         <div style={{ display: 'flex', minHeight: '100vh' }}>
// // //           {/* Sidebar */}
// // //           {sidebarOpen && (
// // //             <aside style={{
// // //               width: '280px',
// // //               backgroundColor: '#f8fafc',
// // //               borderRight: '1px solid #e2e8f0',
// // //               padding: '1.5rem 1rem',
// // //               display: 'flex',
// // //               flexDirection: 'column',
// // //               position: 'relative'
// // //             }}>
// // //               {/* Close Button */}
// // //               <button
// // //                 onClick={() => setSidebarOpen(false)}
// // //                 style={{
// // //                   position: 'absolute',
// // //                   top: '1rem',
// // //                   right: '1rem',
// // //                   width: '32px',
// // //                   height: '32px',
// // //                   borderRadius: '6px',
// // //                   border: '1px solid #d1d5db',
// // //                   backgroundColor: 'white',
// // //                   display: 'flex',
// // //                   alignItems: 'center',
// // //                   justifyContent: 'center',
// // //                   cursor: 'pointer',
// // //                   fontSize: '16px',
// // //                   color: '#374151'
// // //                 }}
// // //               >
// // //                 ×
// // //               </button>

// // //               {/* Logo */}
// // //               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', padding: '0 0.5rem', paddingRight: '2rem' }}>
// // //                 <div style={{
// // //                   width: '40px',
// // //                   height: '40px',
// // //                   borderRadius: '8px',
// // //                   backgroundColor: 'black',
// // //                   color: 'white',
// // //                   display: 'flex',
// // //                   alignItems: 'center',
// // //                   justifyContent: 'center',
// // //                   fontWeight: 'bold',
// // //                   fontSize: '18px'
// // //                 }}>
// // //                   EE
// // //                 </div>
// // //                 <span style={{ marginLeft: '12px', fontSize: '20px', fontWeight: 'bold' }}>
// // //                   EE App
// // //                 </span>
// // //               </div>

// // //               {/* Navigation Menu */}
// // //               <nav style={{ flex: 1 }}>
// // //                 {menuSections.map((section, sectionIndex) => (
// // //                   <div key={section.title} style={{ marginBottom: '2rem' }}>
// // //                     <h3 style={{
// // //                       fontSize: '0.75rem',
// // //                       fontWeight: '600',
// // //                       textTransform: 'uppercase',
// // //                       color: '#64748b',
// // //                       letterSpacing: '0.05em',
// // //                       marginBottom: '0.75rem',
// // //                       padding: '0 0.5rem'
// // //                     }}>
// // //                       {section.title}
// // //                     </h3>

// // //                     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
// // //                       {section.items.map((item, itemIndex) => (
// // //                         <li key={item.label} style={{ marginBottom: '0.25rem' }}>
// // //                           {item.subItems ? (
// // //                             <div>
// // //                               <div style={{
// // //                                 display: 'flex',
// // //                                 alignItems: 'center',
// // //                                 padding: '0.5rem 0.75rem',
// // //                                 borderRadius: '6px',
// // //                                 color: '#374151',
// // //                                 cursor: 'pointer'
// // //                               }}>
// // //                                 <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
// // //                               </div>
// // //                               <ul style={{ 
// // //                                 listStyle: 'none', 
// // //                                 padding: '0 0 0 1rem', 
// // //                                 margin: '0.25rem 0' 
// // //                               }}>
// // //                                 {item.subItems.map((subItem) => (
// // //                                   <li key={subItem}>
// // //                                     <div style={{
// // //                                       display: 'flex',
// // //                                       alignItems: 'center',
// // //                                       padding: '0.375rem 0.75rem',
// // //                                       borderRadius: '4px',
// // //                                       color: '#64748b',
// // //                                       fontSize: '0.875rem'
// // //                                     }}>
// // //                                       {subItem}
// // //                                     </div>
// // //                                   </li>
// // //                                 ))}
// // //                               </ul>
// // //                             </div>
// // //                           ) : (
// // //                             <Link
// // //                               to={item.href || '#'}
// // //                               style={{
// // //                                 display: 'flex',
// // //                                 alignItems: 'center',
// // //                                 padding: '0.5rem 0.75rem',
// // //                                 borderRadius: '6px',
// // //                                 color: '#374151',
// // //                                 cursor: 'pointer',
// // //                                 textDecoration: 'none',
// // //                                 backgroundColor: location.pathname === item.href ? '#e0e7ff' : 'transparent'
// // //                               }}
// // //                             >
// // //                               <div style={{
// // //                                 width: '16px',
// // //                                 height: '16px',
// // //                                 border: '2px solid #d1d5db',
// // //                                 borderRadius: '3px',
// // //                                 marginRight: '0.75rem',
// // //                                 backgroundColor: item.checked ? '#4f46e5' : 'transparent',
// // //                                 display: 'flex',
// // //                                 alignItems: 'center',
// // //                                 justifyContent: 'center'
// // //                               }}>
// // //                                 {item.checked && (
// // //                                   <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
// // //                                     <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// // //                                   </svg>
// // //                                 )}
// // //                               </div>
// // //                               <span style={{ 
// // //                                 fontSize: '0.875rem',
// // //                                 color: location.pathname === item.href ? '#4f46e5' : '#374151'
// // //                               }}>
// // //                                 {item.label}
// // //                               </span>
// // //                             </Link>
// // //                           )}
// // //                         </li>
// // //                       ))}
// // //                     </ul>

// // //                     {sectionIndex < menuSections.length - 1 && (
// // //                       <div style={{
// // //                         height: '1px',
// // //                         backgroundColor: '#e2e8f0',
// // //                         margin: '1rem 0'
// // //                       }} />
// // //                     )}
// // //                   </div>
// // //                 ))}
// // //               </nav>
// // //             </aside>
// // //           )}

// // //           {/* Main Content */}
// // //           <div style={{ 
// // //             flex: 1, 
// // //             display: 'flex', 
// // //             flexDirection: 'column'
// // //           }}>
// // //             <header style={{
// // //               padding: '1rem 1.5rem',
// // //               borderBottom: '1px solid #e2e8f0',
// // //               display: 'flex',
// // //               justifyContent: 'space-between',
// // //               alignItems: 'center',
// // //               backgroundColor: 'white'
// // //             }}>
// // //               {!sidebarOpen && (
// // //                 <button
// // //                   onClick={() => setSidebarOpen(true)}
// // //                   style={{
// // //                     padding: '0.5rem 1rem',
// // //                     borderRadius: '6px',
// // //                     border: '1px solid #d1d5db',
// // //                     backgroundColor: 'white',
// // //                     cursor: 'pointer',
// // //                     display: 'flex',
// // //                     alignItems: 'center',
// // //                     gap: '0.5rem',
// // //                     fontSize: '0.875rem',
// // //                     color: '#374151'
// // //                   }}
// // //                 >
// // //                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// // //                   </svg>
// // //                   Menu
// // //                 </button>
// // //               )}

// // //               <Link
// // //                 to="/app"
// // //                 style={{
// // //                   padding: '8px 16px',
// // //                   borderRadius: '6px',
// // //                   backgroundColor: location.pathname === '/app' ? '#e0e7ff' : 'transparent',
// // //                   color: location.pathname === '/app' ? '#4f46e5' : '#374151',
// // //                   textDecoration: 'none',
// // //                   fontSize: '0.875rem',
// // //                   fontWeight: '500'
// // //                 }}
// // //               >
// // //                 Home
// // //               </Link>
// // //             </header>

// // //             <main style={{ 
// // //               flex: 1, 
// // //               padding: '1.5rem', 
// // //               backgroundColor: 'white',
// // //               overflow: 'auto'
// // //             }}>
// // //               <Outlet />
// // //             </main>

// // //             <footer style={{
// // //               padding: '1rem 1.5rem',
// // //               textAlign: 'center',
// // //               fontSize: '12px',
// // //               color: '#6b7280',
// // //               borderTop: '1px solid #e5e7eb',
// // //               backgroundColor: '#f9fafb'
// // //             }}>
// // //               © 2025 Watch-EE • Built with Remix + Shopify
// // //             </footer>
// // //           </div>
// // //         </div>

// // //         <ScrollRestoration />
// // //         <Scripts />
// // //       </body>
// // //     </html>
// // //   );
// // // }






// // // app/root.jsx
// // import {
// //   Outlet,
// //   Scripts,
// //   ScrollRestoration,
// //   Link,
// //   useLocation,
// //   Links,
// // } from "react-router";
// // import { useState } from "react";
// // import "./styles/tailwind.css";

// // export default function App() {
// //   const location = useLocation();
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [activeSubMenu, setActiveSubMenu] = useState(null);

// //   const toggleSubMenu = (label) => {
// //     setActiveSubMenu(activeSubMenu === label ? null : label);
// //   };

// //   const menuSections = [
// //     {
// //       title: "Whatmore",
// //       icon: "🚀",
// //       items: [
// //         { label: "Home", checked: false, href: "/app", icon: "🏠" },
// //         { 
// //           label: "VIDEO WIDGETS", 
// //           icon: "🎬",
// //           subItems: [
// //             { label: "Video Gallery", href: "/app/video-gallery", icon: "🖼️" },
// //             { label: "Product Pages", href: "/app/product-pages", icon: "📦" },
// //             { label: "Homepage", href: "/app/homepage", icon: "🏡" },
// //             { label: "Collection Pages", href: "/app/collection-pages", icon: "📚" },
// //             { label: "Pages", href: "/app/pages", icon: "📄" }
// //           ]
// //         }
// //       ]
// //     },
// //     {
// //       title: "MARKETING",
// //       icon: "📈",
// //       items: [
// //         { label: "Smart Retargeting", checked: true, href: "/app/smart-retargeting", icon: "🎯" },
// //         { label: "Advanced Retargeting", checked: true, href: "/app/advanced-retargeting", icon: "⚡" },
// //         { label: "Spotlight", checked: true, href: "/app/spotlight", icon: "💡" },
// //         { label: "Lead Capture & Quiz", checked: false, href: "/app/lead-capture", icon: "📝" }
// //       ]
// //     },
// //     {
// //       title: "ANALYTICS", 
// //       icon: "📊",
// //       items: [
// //         { label: "Overview", checked: true, href: "/app/analytics", icon: "👁️" },
// //         { label: "Conversions", checked: true, href: "/app/conversions", icon: "🔄" },
// //         { label: "Engagement", checked: false, href: "/app/engagement", icon: "❤️" },
// //         { label: "A/B Testing", checked: false, href: "/app/ab-testing", icon: "🧪" }
// //       ]
// //     },
// //     {
// //       title: "SETTINGS",
// //       icon: "⚙️",
// //       items: [
// //         { label: "Customizations", checked: true, href: "/app/customizations", icon: "🎨" },
// //         { label: "Profile", checked: false, href: "/app/profile", icon: "👤" }
// //       ]
// //     }
// //   ];

// //   return (
// //     <html lang="en">
// //       <head>
// //         <meta charSet="utf-8" />
// //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// //         <title>Watch-EE</title>
// //         <Links />
// //       </head>
// //       <body style={{ 
// //         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //         margin: 0,
// //         minHeight: '100vh'
// //       }}>
// //         <style>{`
// //           @keyframes slideIn {
// //             from { transform: translateX(-100%); opacity: 0; }
// //             to { transform: translateX(0); opacity: 1; }
// //           }
// //           @keyframes fadeIn {
// //             from { opacity: 0; transform: translateY(10px); }
// //             to { opacity: 1; transform: translateY(0); }
// //           }
// //           @keyframes glow {
// //             0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }
// //             50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.8); }
// //           }
// //         `}</style>

// //         <div style={{ 
// //           display: 'flex', 
// //           minHeight: '100vh',
// //           background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
// //         }}>
// //           {/* Enhanced Sidebar */}
// //           {sidebarOpen && (
// //             <aside style={{
// //               width: '300px',
// //               background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
// //               borderRight: '1px solid rgba(255, 255, 255, 0.1)',
// //               padding: '2rem 1.5rem',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               position: 'relative',
// //               animation: 'slideIn 0.3s ease-out',
// //               boxShadow: '10px 0 30px rgba(0, 0, 0, 0.3)'
// //             }}>
// //               {/* Enhanced Close Button */}
// //               <button
// //                 onClick={() => setSidebarOpen(false)}
// //                 style={{
// //                   position: 'absolute',
// //                   top: '1.5rem',
// //                   right: '1.5rem',
// //                   width: '36px',
// //                   height: '36px',
// //                   borderRadius: '10px',
// //                   border: '1px solid rgba(255, 255, 255, 0.2)',
// //                   background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                   cursor: 'pointer',
// //                   fontSize: '18px',
// //                   color: '#94a3b8',
// //                   transition: 'all 0.3s ease',
// //                   backdropFilter: 'blur(10px)'
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   e.target.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)';
// //                   e.target.style.color = '#fecaca';
// //                   e.target.style.transform = 'rotate(90deg)';
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
// //                   e.target.style.color = '#94a3b8';
// //                   e.target.style.transform = 'rotate(0deg)';
// //                 }}
// //               >
// //                 ×
// //               </button>

// //               {/* Enhanced Logo */}
// //               <div style={{ 
// //                 display: 'flex', 
// //                 alignItems: 'center', 
// //                 marginBottom: '3rem', 
// //                 padding: '0 0.5rem',
// //                 animation: 'fadeIn 0.5s ease-out 0.1s both'
// //               }}>
// //                 <div style={{
// //                   width: '50px',
// //                   height: '50px',
// //                   borderRadius: '12px',
// //                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //                   color: 'white',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                   fontWeight: 'bold',
// //                   fontSize: '20px',
// //                   boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
// //                   animation: 'glow 2s ease-in-out infinite'
// //                 }}>
// //                   EE
// //                 </div>
// //                 <div style={{ marginLeft: '12px' }}>
// //                   <div style={{ 
// //                     fontSize: '22px', 
// //                     fontWeight: 'bold',
// //                     background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
// //                     WebkitBackgroundClip: 'text',
// //                     WebkitTextFillColor: 'transparent'
// //                   }}>
// //                     EE App
// //                   </div>
// //                   <div style={{ 
// //                     fontSize: '12px', 
// //                     color: '#64748b',
// //                     marginTop: '2px'
// //                   }}>
// //                     Premium Dashboard
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Enhanced Navigation Menu */}
// //               <nav style={{ flex: 1 }}>
// //                 {menuSections.map((section, sectionIndex) => (
// //                   <div 
// //                     key={section.title} 
// //                     style={{ 
// //                       marginBottom: '2.5rem',
// //                       animation: `fadeIn 0.5s ease-out ${0.2 + sectionIndex * 0.1}s both`
// //                     }}
// //                   >
// //                     {/* Enhanced Section Title */}
// //                     <div style={{
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       gap: '0.75rem',
// //                       marginBottom: '1rem',
// //                       padding: '0 0.5rem'
// //                     }}>
// //                       <span style={{ fontSize: '16px', opacity: 0.7 }}>{section.icon}</span>
// //                       <h3 style={{
// //                         fontSize: '0.7rem',
// //                         fontWeight: '700',
// //                         textTransform: 'uppercase',
// //                         color: '#64748b',
// //                         letterSpacing: '0.1em',
// //                         margin: 0
// //                       }}>
// //                         {section.title}
// //                       </h3>
// //                     </div>

// //                     {/* Enhanced Section Items */}
// //                     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
// //                       {section.items.map((item, itemIndex) => (
// //                         <li key={item.label} style={{ marginBottom: '0.5rem' }}>
// //                           {item.subItems ? (
// //                             <div>
// //                               <div 
// //                                 onClick={() => toggleSubMenu(item.label)}
// //                                 style={{
// //                                   display: 'flex',
// //                                   alignItems: 'center',
// //                                   justifyContent: 'space-between',
// //                                   padding: '0.75rem 1rem',
// //                                   borderRadius: '10px',
// //                                   color: '#e2e8f0',
// //                                   cursor: 'pointer',
// //                                   transition: 'all 0.3s ease',
// //                                   background: activeSubMenu === item.label ? 
// //                                     'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)' : 'transparent',
// //                                   border: activeSubMenu === item.label ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent'
// //                                 }}
// //                                 onMouseEnter={(e) => {
// //                                   if (activeSubMenu !== item.label) {
// //                                     e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
// //                                     e.currentTarget.style.transform = 'translateX(5px)';
// //                                   }
// //                                 }}
// //                                 onMouseLeave={(e) => {
// //                                   if (activeSubMenu !== item.label) {
// //                                     e.currentTarget.style.background = 'transparent';
// //                                     e.currentTarget.style.transform = 'translateX(0)';
// //                                   }
// //                                 }}
// //                               >
// //                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
// //                                   <span style={{ fontSize: '16px' }}>{item.icon}</span>
// //                                   <span style={{ 
// //                                     fontSize: '0.9rem', 
// //                                     fontWeight: '500',
// //                                     color: activeSubMenu === item.label ? '#c7d2fe' : '#e2e8f0'
// //                                   }}>
// //                                     {item.label}
// //                                   </span>
// //                                 </div>
// //                                 <span style={{
// //                                   transform: activeSubMenu === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
// //                                   transition: 'transform 0.3s ease',
// //                                   fontSize: '12px'
// //                                 }}>
// //                                   ▼
// //                                 </span>
// //                               </div>
                              
// //                               {/* Enhanced Sub-items with Link components */}
// //                               {activeSubMenu === item.label && (
// //                                 <ul style={{ 
// //                                   listStyle: 'none', 
// //                                   padding: '0.5rem 0 0.5rem 2rem', 
// //                                   margin: '0.5rem 0',
// //                                   borderLeft: '2px solid rgba(102, 126, 234, 0.3)'
// //                                 }}>
// //                                   {item.subItems.map((subItem, subIndex) => (
// //                                     <li key={subItem.label}>
// //                                       <Link
// //                                         to={subItem.href}
// //                                         style={{
// //                                           display: 'flex',
// //                                           alignItems: 'center',
// //                                           gap: '0.75rem',
// //                                           padding: '0.6rem 1rem',
// //                                           borderRadius: '8px',
// //                                           color: location.pathname === subItem.href ? '#c7d2fe' : '#94a3b8',
// //                                           fontSize: '0.85rem',
// //                                           cursor: 'pointer',
// //                                           transition: 'all 0.3s ease',
// //                                           textDecoration: 'none',
// //                                           animation: `fadeIn 0.3s ease-out ${subIndex * 0.1}s both`,
// //                                           background: location.pathname === subItem.href ? 
// //                                             'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)' : 'transparent',
// //                                           border: location.pathname === subItem.href ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent'
// //                                         }}
// //                                         onMouseEnter={(e) => {
// //                                           if (location.pathname !== subItem.href) {
// //                                             e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
// //                                             e.currentTarget.style.color = '#e2e8f0';
// //                                             e.currentTarget.style.transform = 'translateX(5px)';
// //                                           }
// //                                         }}
// //                                         onMouseLeave={(e) => {
// //                                           if (location.pathname !== subItem.href) {
// //                                             e.currentTarget.style.background = 'transparent';
// //                                             e.currentTarget.style.color = '#94a3b8';
// //                                             e.currentTarget.style.transform = 'translateX(0)';
// //                                           }
// //                                         }}
// //                                       >
// //                                         <span style={{ fontSize: '14px' }}>{subItem.icon}</span>
// //                                         {subItem.label}
// //                                       </Link>
// //                                     </li>
// //                                   ))}
// //                                 </ul>
// //                               )}
// //                             </div>
// //                           ) : (
// //                             <Link
// //                               to={item.href || '#'}
// //                               style={{
// //                                 display: 'flex',
// //                                 alignItems: 'center',
// //                                 gap: '0.75rem',
// //                                 padding: '0.75rem 1rem',
// //                                 borderRadius: '10px',
// //                                 color: location.pathname === item.href ? '#c7d2fe' : '#e2e8f0',
// //                                 cursor: 'pointer',
// //                                 textDecoration: 'none',
// //                                 transition: 'all 0.3s ease',
// //                                 background: location.pathname === item.href ? 
// //                                   'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 100%)' : 'transparent',
// //                                 border: location.pathname === item.href ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid transparent',
// //                                 boxShadow: location.pathname === item.href ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none'
// //                               }}
// //                               onMouseEnter={(e) => {
// //                                 if (location.pathname !== item.href) {
// //                                   e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
// //                                   e.currentTarget.style.transform = 'translateX(5px)';
// //                                 }
// //                               }}
// //                               onMouseLeave={(e) => {
// //                                 if (location.pathname !== item.href) {
// //                                   e.currentTarget.style.background = 'transparent';
// //                                   e.currentTarget.style.transform = 'translateX(0)';
// //                                 }
// //                               }}
// //                             >
// //                               <div style={{
// //                                 width: '20px',
// //                                 height: '20px',
// //                                 borderRadius: '5px',
// //                                 border: '2px solid #475569',
// //                                 marginRight: '0',
// //                                 background: item.checked ? 
// //                                   'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
// //                                 display: 'flex',
// //                                 alignItems: 'center',
// //                                 justifyContent: 'center',
// //                                 transition: 'all 0.3s ease'
// //                               }}>
// //                                 {item.checked && (
// //                                   <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
// //                                     <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //                                   </svg>
// //                                 )}
// //                               </div>
// //                               <span style={{ fontSize: '14px' }}>{item.icon}</span>
// //                               <span style={{ 
// //                                 fontSize: '0.9rem',
// //                                 fontWeight: '500',
// //                                 flex: 1
// //                               }}>
// //                                 {item.label}
// //                               </span>
// //                             </Link>
// //                           )}
// //                         </li>
// //                       ))}
// //                     </ul>

// //                     {/* Enhanced Separator */}
// //                     {sectionIndex < menuSections.length - 1 && (
// //                       <div style={{
// //                         height: '1px',
// //                         background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
// //                         margin: '1.5rem 0'
// //                       }} />
// //                     )}
// //                   </div>
// //                 ))}
// //               </nav>

// //               {/* Sidebar Footer */}
// //               <div style={{
// //                 padding: '1rem 0.5rem',
// //                 borderTop: '1px solid rgba(255, 255, 255, 0.1)',
// //                 marginTop: 'auto'
// //               }}>
// //                 <div style={{
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   gap: '0.75rem',
// //                   padding: '0.75rem',
// //                   background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
// //                   borderRadius: '10px',
// //                   border: '1px solid rgba(102, 126, 234, 0.2)'
// //                 }}>
// //                   <div style={{
// //                     width: '36px',
// //                     height: '36px',
// //                     borderRadius: '8px',
// //                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     justifyContent: 'center',
// //                     fontSize: '14px'
// //                   }}>
// //                     👤
// //                   </div>
// //                   <div>
// //                     <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#e2e8f0' }}>
// //                       DEV STORE
// //                     </div>
// //                     <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
// //                       Premium Plan
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </aside>
// //           )}

// //           {/* Enhanced Main Content */}
// //           <div style={{ 
// //             flex: 1, 
// //             display: 'flex', 
// //             flexDirection: 'column',
// //             minWidth: 0
// //           }}>
// //             {/* Enhanced Header */}
// //             <header style={{
// //               padding: '1.25rem 2rem',
// //               borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
// //               display: 'flex',
// //               justifyContent: 'space-between',
// //               alignItems: 'center',
// //               background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
// //               backdropFilter: 'blur(10px)',
// //               boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
// //             }}>
// //               {/* Menu Toggle */}
// //               {!sidebarOpen && (
// //                 <button
// //                   onClick={() => setSidebarOpen(true)}
// //                   style={{
// //                     padding: '0.75rem 1.5rem',
// //                     borderRadius: '10px',
// //                     border: '1px solid #e2e8f0',
// //                     background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
// //                     cursor: 'pointer',
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     gap: '0.75rem',
// //                     fontSize: '0.9rem',
// //                     fontWeight: '600',
// //                     color: '#475569',
// //                     transition: 'all 0.3s ease',
// //                     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
// //                   }}
// //                   onMouseEnter={(e) => {
// //                     e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
// //                     e.target.style.color = 'white';
// //                     e.target.style.transform = 'translateY(-2px)';
// //                     e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     e.target.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
// //                     e.target.style.color = '#475569';
// //                     e.target.style.transform = 'translateY(0)';
// //                     e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
// //                   }}
// //                 >
// //                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //                   </svg>
// //                   Open Menu
// //                 </button>
// //               )}

// //               {/* Enhanced Home Link */}
// //               <Link
// //                 to="/app"
// //                 style={{
// //                   padding: '0.75rem 1.5rem',
// //                   borderRadius: '10px',
// //                   background: location.pathname === '/app' ? 
// //                     'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
// //                     'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
// //                   color: location.pathname === '/app' ? 'white' : '#475569',
// //                   textDecoration: 'none',
// //                   fontSize: '0.9rem',
// //                   fontWeight: '600',
// //                   transition: 'all 0.3s ease',
// //                   boxShadow: location.pathname === '/app' ? 
// //                     '0 4px 15px rgba(102, 126, 234, 0.4)' : 
// //                     '0 2px 10px rgba(0, 0, 0, 0.05)'
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   if (location.pathname !== '/app') {
// //                     e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
// //                     e.target.style.color = 'white';
// //                     e.target.style.transform = 'translateY(-2px)';
// //                     e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
// //                   }
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   if (location.pathname !== '/app') {
// //                     e.target.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
// //                     e.target.style.color = '#475569';
// //                     e.target.style.transform = 'translateY(0)';
// //                     e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
// //                   }
// //                 }}
// //               >
// //                 🏠 Home Dashboard
// //               </Link>
// //             </header>

// //             {/* Enhanced Main Content Area */}
// //             <main style={{ 
// //               flex: 1, 
// //               padding: '2rem', 
// //               background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
// //               overflow: 'auto',
// //               position: 'relative'
// //             }}>
// //               {/* Animated Background Elements */}
// //               <div style={{
// //                 position: 'absolute',
// //                 top: 0,
// //                 right: 0,
// //                 width: '300px',
// //                 height: '300px',
// //                 background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
// //                 borderRadius: '50%'
// //               }}></div>
// //               <div style={{
// //                 position: 'absolute',
// //                 bottom: 0,
// //                 left: 0,
// //                 width: '200px',
// //                 height: '200px',
// //                 background: 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)',
// //                 borderRadius: '50%'
// //               }}></div>
              
// //               <Outlet />
// //             </main>

// //             {/* Enhanced Footer */}
// //             <footer style={{
// //               padding: '1.5rem 2rem',
// //               textAlign: 'center',
// //               fontSize: '0.8rem',
// //               color: '#64748b',
// //               borderTop: '1px solid rgba(255, 255, 255, 0.5)',
// //               background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
// //               backdropFilter: 'blur(10px)'
// //             }}>
// //               <div style={{ 
// //                 display: 'flex', 
// //                 justifyContent: 'center', 
// //                 alignItems: 'center',
// //                 gap: '0.5rem',
// //                 marginBottom: '0.25rem'
// //               }}>
// //                 <span>✨</span>
// //                 <span>© 2025 <strong style={{ color: '#1e293b' }}>Watch-EE</strong></span>
// //                 <span>•</span>
// //                 <span>Built with 💙 using <strong style={{ color: '#667eea' }}>Remix</strong> + <strong style={{ color: '#96bf48' }}>Shopify</strong></span>
// //                 <span>✨</span>
// //               </div>
// //               <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
// //                 Elevating e-commerce experiences with stunning visuals and powerful analytics
// //               </div>
// //             </footer>
// //           </div>
// //         </div>

// //         <ScrollRestoration />
// //         <Scripts />
// //       </body>
// //     </html>
// //   );
// // }



// // app/root.jsx
// import {
//   Outlet,
//   Scripts,
//   ScrollRestoration,
//   Link,
//   useLocation,
//   Links,
// } from "react-router";
// import { useState, useEffect } from "react";
// import "./styles/tailwind.css";

// export default function App() {
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeSubMenu, setActiveSubMenu] = useState(null);
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   // Initialize theme from localStorage or system preference
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
//       setIsDarkTheme(true);
//     }
//   }, []);

//   // Apply theme to document
//   useEffect(() => {
//     if (isDarkTheme) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [isDarkTheme]);

//   const toggleTheme = () => {
//     setIsDarkTheme(!isDarkTheme);
//   };

//   const toggleSubMenu = (label) => {
//     setActiveSubMenu(activeSubMenu === label ? null : label);
//   };

//   const menuSections = [
//     {
//       title: "Whatmore",
//       icon: "🚀",
//       items: [
//         { label: "Home", checked: false, href: "/app", icon: "🏠" },
//         { 
//           label: "VIDEO WIDGETS", 
//           icon: "🎬",
//           subItems: [
//             { label: "Video Gallery", href: "/app/video-gallery", icon: "🖼️" },
//             { label: "Product Pages", href: "/app/product-pages", icon: "📦" },
//             { label: "Homepage", href: "/app/homepage", icon: "🏡" },
//             { label: "Collection Pages", href: "/app/collection-pages", icon: "📚" },
//             { label: "Pages", href: "/app/pages", icon: "📄" }
//           ]
//         }
//       ]
//     },
//     {
//       title: "MARKETING",
//       icon: "📈",
//       items: [
//         { label: "Smart Retargeting", checked: true, href: "/app/smart-retargeting", icon: "🎯" },
//         { label: "Advanced Retargeting", checked: true, href: "/app/advanced-retargeting", icon: "⚡" },
//         { label: "Spotlight", checked: true, href: "/app/spotlight", icon: "💡" },
//         { label: "Lead Capture & Quiz", checked: false, href: "/app/lead-capture", icon: "📝" }
//       ]
//     },
//     {
//       title: "ANALYTICS", 
//       icon: "📊",
//       items: [
//         { label: "Overview", checked: true, href: "/app/analytics", icon: "👁️" },
//         { label: "Conversions", checked: true, href: "/app/conversions", icon: "🔄" },
//         { label: "Engagement", checked: false, href: "/app/engagement", icon: "❤️" },
//         { label: "A/B Testing", checked: false, href: "/app/ab-testing", icon: "🧪" }
//       ]
//     },
//     {
//       title: "SETTINGS",
//       icon: "⚙️",
//       items: [
//         { label: "Customizations", checked: true, href: "/app/customizations", icon: "🎨" },
//         { label: "Profile", checked: false, href: "/app/profile", icon: "👤" }
//       ]
//     }
//   ];

//   // Theme-based styles
//   const themeStyles = {
//     light: {
//       bodyBackground: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
//       mainBackground: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
//       sidebarBackground: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
//       headerBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
//       footerBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
//       textColor: '#1f2937',
//       mutedText: '#6b7280'
//     },
//     dark: {
//       bodyBackground: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
//       mainBackground: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
//       sidebarBackground: 'linear-gradient(180deg, #0f172a 0%, #1e1e2e 100%)',
//       headerBackground: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.98) 100%)',
//       footerBackground: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.98) 100%)',
//       textColor: '#f8fafc',
//       mutedText: '#94a3b8'
//     }
//   };

//   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

//   return (
//     <html lang="en" className={isDarkTheme ? 'dark' : ''}>
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <title>Watch-EE</title>
//         <Links />
//       </head>
//       <body style={{ 
//         background: currentTheme.bodyBackground,
//         margin: 0,
//         minHeight: '100vh',
//         color: currentTheme.textColor,
//         transition: 'all 0.3s ease'
//       }}>
//         <style>{`
//           @keyframes slideIn {
//             from { transform: translateX(-100%); opacity: 0; }
//             to { transform: translateX(0); opacity: 1; }
//           }
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           @keyframes glow {
//             0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }
//             50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.8); }
//           }
          
//           /* Smooth transitions for theme switching */
//           * {
//             transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
//           }
//         `}</style>

//         <div style={{ 
//           display: 'flex', 
//           minHeight: '100vh',
//           background: currentTheme.bodyBackground
//         }}>
//           {/* Enhanced Sidebar */}
//           {sidebarOpen && (
//             <aside style={{
//               width: '300px',
//               background: currentTheme.sidebarBackground,
//               borderRight: '1px solid rgba(255, 255, 255, 0.1)',
//               padding: '2rem 1.5rem',
//               display: 'flex',
//               flexDirection: 'column',
//               position: 'relative',
//               animation: 'slideIn 0.3s ease-out',
//               boxShadow: '10px 0 30px rgba(0, 0, 0, 0.3)'
//             }}>
//               {/* Enhanced Close Button */}
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 style={{
//                   position: 'absolute',
//                   top: '1.5rem',
//                   right: '1.5rem',
//                   width: '36px',
//                   height: '36px',
//                   borderRadius: '10px',
//                   border: '1px solid rgba(255, 255, 255, 0.2)',
//                   background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   cursor: 'pointer',
//                   fontSize: '18px',
//                   color: '#94a3b8',
//                   transition: 'all 0.3s ease',
//                   backdropFilter: 'blur(10px)'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)';
//                   e.target.style.color = '#fecaca';
//                   e.target.style.transform = 'rotate(90deg)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
//                   e.target.style.color = '#94a3b8';
//                   e.target.style.transform = 'rotate(0deg)';
//                 }}
//               >
//                 ×
//               </button>

//               {/* Enhanced Logo */}
//               <div style={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 marginBottom: '3rem', 
//                 padding: '0 0.5rem',
//                 animation: 'fadeIn 0.5s ease-out 0.1s both'
//               }}>
//                 <div style={{
//                   width: '50px',
//                   height: '50px',
//                   borderRadius: '12px',
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   color: 'white',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontWeight: 'bold',
//                   fontSize: '20px',
//                   boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
//                   animation: 'glow 2s ease-in-out infinite'
//                 }}>
//                   EE
//                 </div>
//                 <div style={{ marginLeft: '12px' }}>
//                   <div style={{ 
//                     fontSize: '22px', 
//                     fontWeight: 'bold',
//                     background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent'
//                   }}>
//                     EE App
//                   </div>
//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: '#64748b',
//                     marginTop: '2px'
//                   }}>
//                     Premium Dashboard
//                   </div>
//                 </div>
//               </div>

//               {/* Enhanced Navigation Menu */}
//               <nav style={{ flex: 1 }}>
//                 {menuSections.map((section, sectionIndex) => (
//                   <div 
//                     key={section.title} 
//                     style={{ 
//                       marginBottom: '2.5rem',
//                       animation: `fadeIn 0.5s ease-out ${0.2 + sectionIndex * 0.1}s both`
//                     }}
//                   >
//                     {/* Enhanced Section Title */}
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '0.75rem',
//                       marginBottom: '1rem',
//                       padding: '0 0.5rem'
//                     }}>
//                       <span style={{ fontSize: '16px', opacity: 0.7 }}>{section.icon}</span>
//                       <h3 style={{
//                         fontSize: '0.7rem',
//                         fontWeight: '700',
//                         textTransform: 'uppercase',
//                         color: '#64748b',
//                         letterSpacing: '0.1em',
//                         margin: 0
//                       }}>
//                         {section.title}
//                       </h3>
//                     </div>

//                     {/* Enhanced Section Items */}
//                     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//                       {section.items.map((item, itemIndex) => (
//                         <li key={item.label} style={{ marginBottom: '0.5rem' }}>
//                           {item.subItems ? (
//                             <div>
//                               <div 
//                                 onClick={() => toggleSubMenu(item.label)}
//                                 style={{
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   justifyContent: 'space-between',
//                                   padding: '0.75rem 1rem',
//                                   borderRadius: '10px',
//                                   color: '#e2e8f0',
//                                   cursor: 'pointer',
//                                   transition: 'all 0.3s ease',
//                                   background: activeSubMenu === item.label ? 
//                                     'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)' : 'transparent',
//                                   border: activeSubMenu === item.label ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent'
//                                 }}
//                                 onMouseEnter={(e) => {
//                                   if (activeSubMenu !== item.label) {
//                                     e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
//                                     e.currentTarget.style.transform = 'translateX(5px)';
//                                   }
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   if (activeSubMenu !== item.label) {
//                                     e.currentTarget.style.background = 'transparent';
//                                     e.currentTarget.style.transform = 'translateX(0)';
//                                   }
//                                 }}
//                               >
//                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
//                                   <span style={{ fontSize: '16px' }}>{item.icon}</span>
//                                   <span style={{ 
//                                     fontSize: '0.9rem', 
//                                     fontWeight: '500',
//                                     color: activeSubMenu === item.label ? '#c7d2fe' : '#e2e8f0'
//                                   }}>
//                                     {item.label}
//                                   </span>
//                                 </div>
//                                 <span style={{
//                                   transform: activeSubMenu === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
//                                   transition: 'transform 0.3s ease',
//                                   fontSize: '12px'
//                                 }}>
//                                   ▼
//                                 </span>
//                               </div>
                              
//                               {/* Enhanced Sub-items with Link components */}
//                               {activeSubMenu === item.label && (
//                                 <ul style={{ 
//                                   listStyle: 'none', 
//                                   padding: '0.5rem 0 0.5rem 2rem', 
//                                   margin: '0.5rem 0',
//                                   borderLeft: '2px solid rgba(102, 126, 234, 0.3)'
//                                 }}>
//                                   {item.subItems.map((subItem, subIndex) => (
//                                     <li key={subItem.label}>
//                                       <Link
//                                         to={subItem.href}
//                                         style={{
//                                           display: 'flex',
//                                           alignItems: 'center',
//                                           gap: '0.75rem',
//                                           padding: '0.6rem 1rem',
//                                           borderRadius: '8px',
//                                           color: location.pathname === subItem.href ? '#c7d2fe' : '#94a3b8',
//                                           fontSize: '0.85rem',
//                                           cursor: 'pointer',
//                                           transition: 'all 0.3s ease',
//                                           textDecoration: 'none',
//                                           animation: `fadeIn 0.3s ease-out ${subIndex * 0.1}s both`,
//                                           background: location.pathname === subItem.href ? 
//                                             'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)' : 'transparent',
//                                           border: location.pathname === subItem.href ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent'
//                                         }}
//                                         onMouseEnter={(e) => {
//                                           if (location.pathname !== subItem.href) {
//                                             e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                                             e.currentTarget.style.color = '#e2e8f0';
//                                             e.currentTarget.style.transform = 'translateX(5px)';
//                                           }
//                                         }}
//                                         onMouseLeave={(e) => {
//                                           if (location.pathname !== subItem.href) {
//                                             e.currentTarget.style.background = 'transparent';
//                                             e.currentTarget.style.color = '#94a3b8';
//                                             e.currentTarget.style.transform = 'translateX(0)';
//                                           }
//                                         }}
//                                       >
//                                         <span style={{ fontSize: '14px' }}>{subItem.icon}</span>
//                                         {subItem.label}
//                                       </Link>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </div>
//                           ) : (
//                             <Link
//                               to={item.href || '#'}
//                               style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '0.75rem',
//                                 padding: '0.75rem 1rem',
//                                 borderRadius: '10px',
//                                 color: location.pathname === item.href ? '#c7d2fe' : '#e2e8f0',
//                                 cursor: 'pointer',
//                                 textDecoration: 'none',
//                                 transition: 'all 0.3s ease',
//                                 background: location.pathname === item.href ? 
//                                   'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 100%)' : 'transparent',
//                                 border: location.pathname === item.href ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid transparent',
//                                 boxShadow: location.pathname === item.href ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none'
//                               }}
//                               onMouseEnter={(e) => {
//                                 if (location.pathname !== item.href) {
//                                   e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
//                                   e.currentTarget.style.transform = 'translateX(5px)';
//                                 }
//                               }}
//                               onMouseLeave={(e) => {
//                                 if (location.pathname !== item.href) {
//                                   e.currentTarget.style.background = 'transparent';
//                                   e.currentTarget.style.transform = 'translateX(0)';
//                                 }
//                               }}
//                             >
//                               <div style={{
//                                 width: '20px',
//                                 height: '20px',
//                                 borderRadius: '5px',
//                                 border: '2px solid #475569',
//                                 marginRight: '0',
//                                 background: item.checked ? 
//                                   'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 transition: 'all 0.3s ease'
//                               }}>
//                                 {item.checked && (
//                                   <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
//                                     <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                                   </svg>
//                                 )}
//                               </div>
//                               <span style={{ fontSize: '14px' }}>{item.icon}</span>
//                               <span style={{ 
//                                 fontSize: '0.9rem',
//                                 fontWeight: '500',
//                                 flex: 1
//                               }}>
//                                 {item.label}
//                               </span>
//                             </Link>
//                           )}
//                         </li>
//                       ))}
//                     </ul>

//                     {/* Enhanced Separator */}
//                     {sectionIndex < menuSections.length - 1 && (
//                       <div style={{
//                         height: '1px',
//                         background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
//                         margin: '1.5rem 0'
//                       }} />
//                     )}
//                   </div>
//                 ))}
//               </nav>

//               {/* Theme Toggle in Sidebar */}
//               <div style={{
//                 padding: '1rem 0.5rem',
//                 borderTop: '1px solid rgba(255, 255, 255, 0.1)',
//                 marginTop: 'auto'
//               }}>
//                 <button
//                   onClick={toggleTheme}
//                   style={{
//                     width: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '0.75rem',
//                     background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
//                     border: '1px solid rgba(102, 126, 234, 0.2)',
//                     padding: '0.75rem 1rem',
//                     borderRadius: '10px',
//                     cursor: 'pointer',
//                     color: '#e2e8f0',
//                     fontSize: '0.9rem',
//                     fontWeight: '600',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)';
//                     e.target.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <span style={{ fontSize: '1.1rem' }}>
//                     {isDarkTheme ? '☀️' : '🌙'}
//                   </span>
//                   {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
//                 </button>

//                 {/* User Profile */}
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.75rem',
//                   padding: '0.75rem',
//                   marginTop: '1rem',
//                   background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
//                   borderRadius: '10px',
//                   border: '1px solid rgba(102, 126, 234, 0.2)'
//                 }}>
//                   <div style={{
//                     width: '36px',
//                     height: '36px',
//                     borderRadius: '8px',
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontSize: '14px'
//                   }}>
//                     👤
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#e2e8f0' }}>
//                       DEV STORE
//                     </div>
//                     <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
//                       Premium Plan
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           )}

//           {/* Enhanced Main Content */}
//           <div style={{ 
//             flex: 1, 
//             display: 'flex', 
//             flexDirection: 'column',
//             minWidth: 0
//           }}>
//             {/* Enhanced Header */}
//             <header style={{
//               padding: '1.25rem 2rem',
//               borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               background: currentTheme.headerBackground,
//               backdropFilter: 'blur(10px)',
//               boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                 {/* Menu Toggle */}
//                 {!sidebarOpen && (
//                   <button
//                     onClick={() => setSidebarOpen(true)}
//                     style={{
//                       padding: '0.75rem 1.5rem',
//                       borderRadius: '10px',
//                       border: `1px solid ${isDarkTheme ? '#374151' : '#e2e8f0'}`,
//                       background: isDarkTheme ? 
//                         'linear-gradient(135deg, #374151 0%, #4b5563 100%)' : 
//                         'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '0.75rem',
//                       fontSize: '0.9rem',
//                       fontWeight: '600',
//                       color: isDarkTheme ? '#e5e7eb' : '#475569',
//                       transition: 'all 0.3s ease',
//                       boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
//                       e.target.style.color = 'white';
//                       e.target.style.transform = 'translateY(-2px)';
//                       e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.background = isDarkTheme ? 
//                         'linear-gradient(135deg, #374151 0%, #4b5563 100%)' : 
//                         'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
//                       e.target.style.color = isDarkTheme ? '#e5e7eb' : '#475569';
//                       e.target.style.transform = 'translateY(0)';
//                       e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
//                     }}
//                   >
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                     Open Menu
//                   </button>
//                 )}

//                 {/* Theme Toggle for Mobile */}
//                 <button
//                   onClick={toggleTheme}
//                   style={{
//                     padding: '0.5rem',
//                     borderRadius: '8px',
//                     border: `1px solid ${isDarkTheme ? '#374151' : '#e2e8f0'}`,
//                     background: isDarkTheme ? 
//                       'linear-gradient(135deg, #374151 0%, #4b5563 100%)' : 
//                       'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
//                     cursor: 'pointer',
//                     fontSize: '1.2rem',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.transform = 'scale(1.1)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.transform = 'scale(1)';
//                   }}
//                 >
//                   {isDarkTheme ? '☀️' : '🌙'}
//                 </button>
//               </div>

//               {/* Enhanced Home Link */}
//               <Link
//                 to="/app"
//                 style={{
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '10px',
//                   background: location.pathname === '/app' ? 
//                     'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
//                     isDarkTheme ? 
//                     'linear-gradient(135deg, #374151 0%, #4b5563 100%)' :
//                     'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
//                   color: location.pathname === '/app' ? 'white' : (isDarkTheme ? '#e5e7eb' : '#475569'),
//                   textDecoration: 'none',
//                   fontSize: '0.9rem',
//                   fontWeight: '600',
//                   transition: 'all 0.3s ease',
//                   boxShadow: location.pathname === '/app' ? 
//                     '0 4px 15px rgba(102, 126, 234, 0.4)' : 
//                     '0 2px 10px rgba(0, 0, 0, 0.05)'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (location.pathname !== '/app') {
//                     e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
//                     e.target.style.color = 'white';
//                     e.target.style.transform = 'translateY(-2px)';
//                     e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (location.pathname !== '/app') {
//                     e.target.style.background = isDarkTheme ? 
//                       'linear-gradient(135deg, #374151 0%, #4b5563 100%)' :
//                       'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
//                     e.target.style.color = isDarkTheme ? '#e5e7eb' : '#475569';
//                     e.target.style.transform = 'translateY(0)';
//                     e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
//                   }
//                 }}
//               >
//                 🏠 Home Dashboard
//               </Link>
//             </header>

//             {/* Enhanced Main Content Area */}
//             <main style={{ 
//               flex: 1, 
//               padding: '2rem', 
//               background: currentTheme.mainBackground,
//               overflow: 'auto',
//               position: 'relative'
//             }}>
//               {/* Animated Background Elements */}
//               <div style={{
//                 position: 'absolute',
//                 top: 0,
//                 right: 0,
//                 width: '300px',
//                 height: '300px',
//                 background: `radial-gradient(circle, rgba(102, 126, 234, ${isDarkTheme ? '0.05' : '0.1'}) 0%, transparent 70%)`,
//                 borderRadius: '50%'
//               }}></div>
//               <div style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 width: '200px',
//                 height: '200px',
//                 background: `radial-gradient(circle, rgba(118, 75, 162, ${isDarkTheme ? '0.05' : '0.1'}) 0%, transparent 70%)`,
//                 borderRadius: '50%'
//               }}></div>
              
//               <Outlet />
//             </main>

//             {/* Enhanced Footer */}
//             <footer style={{
//               padding: '1.5rem 2rem',
//               textAlign: 'center',
//               fontSize: '0.8rem',
//               color: currentTheme.mutedText,
//               borderTop: `1px solid ${isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'}`,
//               background: currentTheme.footerBackground,
//               backdropFilter: 'blur(10px)'
//             }}>
//               <div style={{ 
//                 display: 'flex', 
//                 justifyContent: 'center', 
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 marginBottom: '0.25rem'
//               }}>
//                 <span>✨</span>
//                 <span>© 2025 <strong style={{ color: currentTheme.textColor }}>Watch-EE</strong></span>
//                 <span>•</span>
//                 <span>Built with 💙 using <strong style={{ color: '#667eea' }}>Remix</strong> + <strong style={{ color: '#96bf48' }}>Shopify</strong></span>
//                 <span>✨</span>
//               </div>
//               <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
//                 Elevating e-commerce experiences with stunning visuals and powerful analytics
//               </div>
//             </footer>
//           </div>
//         </div>

//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }




import {
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
  Links,
} from "react-router";
import { useState, useEffect } from "react";
import "./styles/tailwind.css";

export default function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkTheme(true);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleSubMenu = (label) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  const menuSections = [
    {
      title: "Whatmore",
      icon: "🚀",
      items: [
        { label: "Home", checked: false, href: "/app", icon: "🏠" },
        { 
          label: "VIDEO WIDGETS", 
          icon: "🎬",
          subItems: [
            { label: "Video Gallery", href: "/app/video-gallery", icon: "🖼️" },
            { label: "Product Pages", href: "/app/product-pages", icon: "📦" },
            { label: "Homepage", href: "/app/homepage", icon: "🏡" },
            { label: "Collection Pages", href: "/app/collection-pages", icon: "📚" },
            { label: "Pages", href: "/app/pages", icon: "📄" }
          ]
        }
      ]
    },
    {
      title: "MARKETING",
      icon: "📈",
      items: [
        { label: "Smart Retargeting", checked: true, href: "/app/smart-retargeting", icon: "🎯" },
        { label: "Advanced Retargeting", checked: true, href: "/app/advanced-retargeting", icon: "⚡" },
        { label: "Spotlight", checked: true, href: "/app/spotlight", icon: "💡" },
        { label: "Lead Capture & Quiz", checked: false, href: "/app/lead-capture", icon: "📝" }
      ]
    },
    {
      title: "ANALYTICS", 
      icon: "📊",
      items: [
        { label: "Overview", checked: true, href: "/app/analytics", icon: "👁️" },
        { label: "Conversions", checked: true, href: "/app/conversions", icon: "🔄" },
        { label: "Engagement", checked: false, href: "/app/engagement", icon: "❤️" },
        { label: "A/B Testing", checked: false, href: "/app/ab-testing", icon: "🧪" }
      ]
    },
    {
      title: "SETTINGS",
      icon: "⚙️",
      items: [
        { label: "Customizations", checked: true, href: "/app/customizations", icon: "🎨" },
        { label: "Profile", checked: false, href: "/app/profile", icon: "👤" }
      ]
    }
  ];

  // Theme-based styles
  const themeStyles = {
    light: {
      bodyBackground: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      mainBackground: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      sidebarBackground: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      sidebarBorder: '1px solid #e2e8f0',
      headerBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
      footerBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
      textColor: '#1f2937',
      mutedText: '#6b7280',
      sidebarText: '#374151',
      sidebarMutedText: '#6b7280',
      borderColor: '#e2e8f0',
      shadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
    },
    dark: {
      bodyBackground: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      mainBackground: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      sidebarBackground: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      sidebarBorder: '1px solid rgba(255, 255, 255, 0.1)',
      headerBackground: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.98) 100%)',
      footerBackground: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.98) 100%)',
      textColor: '#f8fafc',
      mutedText: '#94a3b8',
      sidebarText: '#e2e8f0',
      sidebarMutedText: '#94a3b8',
      borderColor: '#374151',
      shadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
    }
  };

  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  return (
    <html lang="en" className={isDarkTheme ? 'dark' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Watch-EE</title>
        <Links />
      </head>
      <body style={{ 
        background: currentTheme.bodyBackground,
        margin: 0,
        minHeight: '100vh',
        color: currentTheme.textColor,
        transition: 'all 0.3s ease'
      }}>
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }
            50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.8); }
          }
          
          /* Smooth transitions for theme switching */
          * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
          }
        `}</style>

        <div style={{ 
          display: 'flex', 
          minHeight: '100vh',
          background: currentTheme.bodyBackground
        }}>
          {/* Enhanced Sidebar */}
          {sidebarOpen && (
            <aside style={{
              width: '300px',
              background: currentTheme.sidebarBackground,
              borderRight: currentTheme.sidebarBorder,
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              animation: 'slideIn 0.3s ease-out',
              boxShadow: isDarkTheme ? '10px 0 30px rgba(0, 0, 0, 0.3)' : '10px 0 30px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Enhanced Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  border: `1px solid ${isDarkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                  background: isDarkTheme 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: isDarkTheme ? '#94a3b8' : '#6b7280',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)';
                  e.target.style.color = isDarkTheme ? '#fecaca' : '#dc2626';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isDarkTheme 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)';
                  e.target.style.color = isDarkTheme ? '#94a3b8' : '#6b7280';
                  e.target.style.transform = 'rotate(0deg)';
                }}
              >
                ✕
              </button>

              {/* Enhanced Logo */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '3rem', 
                padding: '0 0.5rem',
                animation: 'fadeIn 0.5s ease-out 0.1s both'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                  animation: 'glow 2s ease-in-out infinite'
                }}>
                  EE
                </div>
                <div style={{ marginLeft: '12px' }}>
                <div
  style={{
    fontSize: '22px',
    fontWeight: 'bold',
    background: 'none',
    WebkitBackgroundClip: 'unset',
    WebkitTextFillColor: 'unset',
    color: isDarkTheme ? '#FFFFFF' : '#000000', // white on dark, black on light
    textShadow: isDarkTheme ? '0 1px 2px rgba(0,0,0,0.6)' : 'none' // subtle lift in dark mode
  }}
>
  EE App ZAIN
</div>




                  <div style={{ 
                    fontSize: '12px', 
                    color: currentTheme.sidebarMutedText,
                    marginTop: '2px'
                  }}>
                    Premium Dashboard
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation Menu */}
              <nav style={{ flex: 1 }}>
                {menuSections.map((section, sectionIndex) => (
                  <div 
                    key={section.title} 
                    style={{ 
                      marginBottom: '2.5rem',
                      animation: `fadeIn 0.5s ease-out ${0.2 + sectionIndex * 0.1}s both`
                    }}
                  >
                    {/* Enhanced Section Title */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                      padding: '0 0.5rem'
                    }}>
                      <span style={{ fontSize: '16px', opacity: 0.7 }}>{section.icon}</span>
                      <h3 style={{
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        color: currentTheme.sidebarMutedText,
                        letterSpacing: '0.1em',
                        margin: 0
                      }}>
                        {section.title}
                      </h3>
                    </div>

                    {/* Enhanced Section Items */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {section.items.map((item, itemIndex) => (
                        <li key={item.label} style={{ marginBottom: '0.5rem' }}>
                          {item.subItems ? (
                            <div>
                              <div 
                                onClick={() => toggleSubMenu(item.label)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '0.75rem 1rem',
                                  borderRadius: '10px',
                                  color: currentTheme.sidebarText,
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  background: activeSubMenu === item.label ? 
                                    'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)' : 'transparent',
                                  border: activeSubMenu === item.label ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent'
                                }}
                                onMouseEnter={(e) => {
                                  if (activeSubMenu !== item.label) {
                                    e.currentTarget.style.background = isDarkTheme
                                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
                                      : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)';
                                    e.currentTarget.style.transform = 'translateX(5px)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (activeSubMenu !== item.label) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                  }
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                                  <span style={{ 
                                    fontSize: '0.9rem', 
                                    fontWeight: '500',
                                    color: activeSubMenu === item.label ? '#667eea' : currentTheme.sidebarText
                                  }}>
                                    {item.label}
                                  </span>
                                </div>
                                <span style={{
                                  transform: activeSubMenu === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.3s ease',
                                  fontSize: '12px',
                                  color: currentTheme.sidebarMutedText
                                }}>
                                  ▼
                                </span>
                              </div>
                              
                              {/* Enhanced Sub-items with Link components */}
                              {activeSubMenu === item.label && (
                                <ul style={{ 
                                  listStyle: 'none', 
                                  padding: '0.5rem 0 0.5rem 2rem', 
                                  margin: '0.5rem 0',
                                  borderLeft: `2px solid ${isDarkTheme ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'}`
                                }}>
                                  {item.subItems.map((subItem, subIndex) => (
                                    <li key={subItem.label}>
                                      <Link
                                        to={subItem.href}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '0.75rem',
                                          padding: '0.6rem 1rem',
                                          borderRadius: '8px',
                                          color: location.pathname === subItem.href ? '#667eea' : currentTheme.sidebarMutedText,
                                          fontSize: '0.85rem',
                                          cursor: 'pointer',
                                          transition: 'all 0.3s ease',
                                          textDecoration: 'none',
                                          animation: `fadeIn 0.3s ease-out ${subIndex * 0.1}s both`,
                                          background: location.pathname === subItem.href ? 
                                            'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)' : 'transparent',
                                          border: location.pathname === subItem.href ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent'
                                        }}
                                        onMouseEnter={(e) => {
                                          if (location.pathname !== subItem.href) {
                                            e.currentTarget.style.background = isDarkTheme
                                              ? 'rgba(255, 255, 255, 0.05)'
                                              : 'rgba(0, 0, 0, 0.05)';
                                            e.currentTarget.style.color = currentTheme.sidebarText;
                                            e.currentTarget.style.transform = 'translateX(5px)';
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (location.pathname !== subItem.href) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = currentTheme.sidebarMutedText;
                                            e.currentTarget.style.transform = 'translateX(0)';
                                          }
                                        }}
                                      >
                                        <span style={{ fontSize: '14px' }}>{subItem.icon}</span>
                                        {subItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ) : (
                            <Link
                              to={item.href || '#'}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '10px',
                                color: location.pathname === item.href ? '#667eea' : currentTheme.sidebarText,
                                cursor: 'pointer',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                background: location.pathname === item.href ? 
                                  'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 100%)' : 'transparent',
                                border: location.pathname === item.href ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid transparent',
                                boxShadow: location.pathname === item.href ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none'
                              }}
                              onMouseEnter={(e) => {
                                if (location.pathname !== item.href) {
                                  e.currentTarget.style.background = isDarkTheme
                                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
                                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)';
                                  e.currentTarget.style.transform = 'translateX(5px)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (location.pathname !== item.href) {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                }
                              }}
                            >
                              <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '5px',
                                border: `2px solid ${isDarkTheme ? '#475569' : '#d1d5db'}`,
                                marginRight: '0',
                                background: item.checked ? 
                                  'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease'
                              }}>
                                {item.checked && (
                                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              <span style={{ fontSize: '14px' }}>{item.icon}</span>
                              <span style={{ 
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                flex: 1
                              }}>
                                {item.label}
                              </span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Enhanced Separator */}
                    {sectionIndex < menuSections.length - 1 && (
                      <div style={{
                        height: '1px',
                        background: isDarkTheme
                          ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
                          : 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)',
                        margin: '1.5rem 0'
                      }} />
                    )}
                  </div>
                ))}
              </nav>

              {/* Theme Toggle in Sidebar */}
              <div style={{
                padding: '1rem 0.5rem',
                borderTop: `1px solid ${isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                marginTop: 'auto'
              }}>
                <button
                  onClick={toggleTheme}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    background: isDarkTheme
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.02) 100%)',
                    border: `1px solid ${isDarkTheme ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)'}`,
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: currentTheme.sidebarText,
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = isDarkTheme
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.02) 100%)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>
                    {isDarkTheme ? '☀️' : '🌙'}
                  </span>
                  {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                </button>

                {/* User Profile */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  marginTop: '1rem',
                  background: isDarkTheme
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.02) 100%)',
                  borderRadius: '10px',
                  border: `1px solid ${isDarkTheme ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)'}`
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: 'white'
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: currentTheme.sidebarText }}>
                      DEV STORE
                    </div>
                    <div style={{ fontSize: '0.7rem', color: currentTheme.sidebarMutedText }}>
                      Premium Plan
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Enhanced Main Content */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            minWidth: 0
          }}>
            {/* Enhanced Header */}
            <header style={{
              padding: '1.25rem 2rem',
              borderBottom: `1px solid ${currentTheme.borderColor}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: currentTheme.headerBackground,
              backdropFilter: 'blur(10px)',
              boxShadow: currentTheme.shadow
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Menu Toggle */}
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      border: `1px solid ${currentTheme.borderColor}`,
                      background: isDarkTheme ? 
                        'linear-gradient(135deg, #374151 0%, #4b5563 100%)' : 
                        'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: currentTheme.textColor,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = isDarkTheme ? 
                        'linear-gradient(135deg, #374151 0%, #4b5563 100%)' : 
                        'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
                      e.target.style.color = currentTheme.textColor;
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Open Menu
                  </button>
                )}

                {/* Theme Toggle for Mobile */}
                <button
                  onClick={toggleTheme}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: `1px solid ${currentTheme.borderColor}`,
                    background: isDarkTheme ? 
                      'linear-gradient(135deg, #374151 0%, #4b5563 100%)' : 
                      'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {isDarkTheme ? '☀️' : '🌙'}
                </button>
              </div>

              {/* Enhanced Home Link */}
              <Link
                to="/app"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  background: location.pathname === '/app' ? 
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
                    isDarkTheme ? 
                    'linear-gradient(135deg, #374151 0%, #4b5563 100%)' :
                    'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                  color: location.pathname === '/app' ? 'white' : currentTheme.textColor,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: location.pathname === '/app' ? 
                    '0 4px 15px rgba(102, 126, 234, 0.4)' : 
                    '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/app') {
                    e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/app') {
                    e.target.style.background = isDarkTheme ? 
                      'linear-gradient(135deg, #374151 0%, #4b5563 100%)' :
                      'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
                    e.target.style.color = currentTheme.textColor;
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                  }
                }}
              >
                🏠 Home Dashboard
              </Link>
            </header>

            {/* Enhanced Main Content Area */}
            <main style={{ 
              flex: 1, 
              padding: '2rem', 
              background: currentTheme.mainBackground,
              overflow: 'auto',
              position: 'relative'
            }}>
              {/* Animated Background Elements */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px',
                height: '300px',
                background: `radial-gradient(circle, rgba(102, 126, 234, ${isDarkTheme ? '0.05' : '0.1'}) 0%, transparent 70%)`,
                borderRadius: '50%'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '200px',
                height: '200px',
                background: `radial-gradient(circle, rgba(118, 75, 162, ${isDarkTheme ? '0.05' : '0.1'}) 0%, transparent 70%)`,
                borderRadius: '50%'
              }}></div>
              
              <Outlet />
            </main>

            {/* Enhanced Footer */}
            <footer style={{
              padding: '1.5rem 2rem',
              textAlign: 'center',
              fontSize: '0.8rem',
              color: currentTheme.mutedText,
              borderTop: `1px solid ${currentTheme.borderColor}`,
              background: currentTheme.footerBackground,
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.25rem'
              }}>
                <span>✨</span>
                <span>© 2025 <strong style={{ color: currentTheme.textColor }}>Watch-EE</strong></span>
                <span>•</span>
                <span>Built with 💙 using <strong style={{ color: '#667eea' }}>Remix</strong> + <strong style={{ color: '#96bf48' }}>Shopify</strong></span>
                <span>✨</span>
              </div>
              <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                Elevating e-commerce experiences with stunning visuals and powerful analytics
              </div>
            </footer>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}