// // // components/videogallerycomponents/TagProductsModal.jsx
// // import { useState, useEffect } from "react";
// // import ProductsModal from "./ProductsModal";

// // export default function TagProductsModal({
// //   showTagProducts, // This will be the same as showVideoOptions
// //   onHide, // This will be the same as hideVideoOptionsMenu
// //   onLoadProducts,
// //   isDarkTheme,
// //   selectedProducts,
// //   products,
// //   onToggleProduct,
// //   onSaveProducts,
// // }) {
// //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// //   const [showProductsModal, setShowProductsModal] = useState(false);
// //   const [savedProducts, setSavedProducts] = useState([]);
// //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);

// //   // Fetch saved products when modal opens or video changes
// //   useEffect(() => {
// //     if (showTagProducts.show && showTagProducts.video?.id) {
// //       fetchSavedProducts();
// //     }
// //   }, [showTagProducts.show, showTagProducts.video?.id]);

// //   const fetchSavedProducts = async () => {
// //     try {
// //       setIsLoadingSavedProducts(true);
// //       const response = await fetch(`/api/videoproducts?videoId=${showTagProducts.video.id}`);
// //       const result = await response.json();
      
// //       if (result.success) {
// //         setSavedProducts(result.products);
// //       } else {
// //         console.error('Failed to fetch saved products:', result.error);
// //         setSavedProducts([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching saved products:', error);
// //       setSavedProducts([]);
// //     } finally {
// //       setIsLoadingSavedProducts(false);
// //     }
// //   };

// //   const handleBackdropClick = (e) => {
// //     if (e.target === e.currentTarget) {
// //       onHide();
// //     }
// //   };

// //   // FIXED: Load products and then show modal
// //   const handleSubmitProducts = async () => {
// //     try {
// //       setIsLoadingProducts(true);
      
// //       // Call the products API to load products
// //       if (onLoadProducts) {
// //         await onLoadProducts(showTagProducts.video);
// //       }
      
// //       // Then show the modal
// //       setShowProductsModal(true);
// //     } catch (error) {
// //       console.error('Error loading products:', error);
// //     } finally {
// //       setIsLoadingProducts(false);
// //     }
// //   };

// //   const handleSaveProducts = async () => {
// //     if (onSaveProducts) {
// //       await onSaveProducts();
// //     }
// //     setShowProductsModal(false);
// //     // Refresh saved products after saving
// //     setTimeout(() => {
// //       fetchSavedProducts();
// //     }, 500);
// //   };

// //   const handleHideProductsModal = () => {
// //     setShowProductsModal(false);
// //   };

// //   // Early return should be AFTER all hooks
// //   if (!showTagProducts.show) return null;

// //   const themeStyles = {
// //     light: {
// //       background: '#ffffff',
// //       text: '#1f2937',
// //       border: '#e5e7eb',
// //       shadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
// //       hoverBackground: '#f3f4f6',
// //       sectionBackground: '#f8fafc'
// //     },
// //     dark: {
// //       background: '#374151',
// //       text: '#f9fafb',
// //       border: '#4b5563',
// //       shadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
// //       hoverBackground: '#4b5563',
// //       sectionBackground: '#4b5563'
// //     }
// //   };

// //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// //   return (
// //     <>
// //       <div 
// //         style={{
// //           position: 'fixed',
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           zIndex: 10000,
// //           background: 'rgba(0, 0, 0, 0.5)',
// //           display: 'flex',
// //           justifyContent: 'center',
// //           alignItems: 'center'
// //         }}
// //         onClick={handleBackdropClick}
// //       >
// //         <div 
// //           style={{
// //             background: currentTheme.background,
// //             borderRadius: '12px',
// //             border: `1px solid ${currentTheme.border}`,
// //             boxShadow: currentTheme.shadow,
// //             padding: '1.5rem',
// //             maxWidth: '450px',
// //             minWidth: '400px',
// //             maxHeight: '100vh',
// //             zIndex: 10001,
// //             animation: 'scaleIn 0.2s ease-out',
// //             overflow: 'hidden',
// //             position: 'relative'
// //           }}
// //         >
// //           {/* Close Button */}
// //           <button
// //             onClick={onHide}
// //             style={{
// //               position: 'absolute',
// //               top: '1rem',
// //               right: '1rem',
// //               background: isDarkTheme ? '#374151' : 'white',
// //               border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
// //               borderRadius: '50%',
// //               width: '32px',
// //               height: '32px',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               cursor: 'pointer',
// //               color: isDarkTheme ? '#9ca3af' : '#6b7280',
// //               fontSize: '1rem',
// //               fontWeight: 'bold',
// //               zIndex: 10002,
// //               transition: 'all 0.3s ease'
// //             }}
// //             onMouseEnter={(e) => {
// //               e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
// //               e.target.style.color = isDarkTheme ? '#f9fafb' : '#1f2937';
// //             }}
// //             onMouseLeave={(e) => {
// //               e.target.style.background = isDarkTheme ? '#374151' : 'white';
// //               e.target.style.color = isDarkTheme ? '#9ca3af' : '#6b7280';
// //             }}
// //           >
// //             ✕
// //           </button>

// //           {/* Products Section Only - No Video Column */}
// //           <div style={{
// //             display: 'flex',
// //             flexDirection: 'column',
// //             gap: '1rem',
// //             height: '100%',
// //             overflow: 'hidden'
// //           }}>
// //             <div style={{
// //               display: 'flex',
// //               flexDirection: 'column',
// //               height: '100%',
// //               gap: '0.8rem'
// //             }}>
// //               <h3 style={{
// //                 fontSize: '0.875rem',
// //                 fontWeight: '600',
// //                 color: currentTheme.text,
// //                 margin: 0
// //               }}>
// //                 Tag Products to Video
// //               </h3>
              
// //               <button
// //                 onClick={handleSubmitProducts}
// //                 disabled={isLoadingProducts}
// //                 style={{
// //                   width: '100%',
// //                   background: '#10b981',
// //                   color: 'white',
// //                   border: 'none',
// //                   padding: '0.4rem',
// //                   borderRadius: '6px',
// //                   fontSize: '0.7rem',
// //                   fontWeight: '500',
// //                   cursor: isLoadingProducts ? 'not-allowed' : 'pointer',
// //                   transition: 'background-color 0.2s',
// //                   opacity: isLoadingProducts ? 0.6 : 1
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   if (!isLoadingProducts) {
// //                     e.target.style.background = '#059669';
// //                   }
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   if (!isLoadingProducts) {
// //                     e.target.style.background = '#10b981';
// //                   }
// //                 }}
// //               >
// //                 {isLoadingProducts ? 'Loading Products...' : 'Submit Products'}
// //               </button>

// //               {/* Saved Products Section */}
// //               <div style={{
// //                 flex: 1,
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 overflow: 'hidden'
// //               }}>
// //                 <div style={{
// //                   fontSize: '0.7rem',
// //                   fontWeight: '600',
// //                   color: currentTheme.text,
// //                   marginBottom: '0.4rem'
// //                 }}>
// //                   Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
// //                 </div>
                
// //                 {isLoadingSavedProducts ? (
// //                   <div style={{
// //                     textAlign: 'center',
// //                     padding: '0.8rem',
// //                     color: currentTheme.text,
// //                     fontSize: '0.65rem',
// //                     border: `1px solid ${currentTheme.border}`,
// //                     borderRadius: '6px',
// //                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
// //                   }}>
// //                     Loading saved products...
// //                   </div>
// //                 ) : savedProducts.length > 0 ? (
// //                   <div style={{
// //                     flex: 1,
// //                     overflowY: 'auto',
// //                     border: `1px solid ${currentTheme.border}`,
// //                     borderRadius: '6px',
// //                     padding: '0.4rem',
// //                     background: isDarkTheme ? '#1f2937' : '#f8fafc',
// //                     maxHeight: '180px'
// //                   }}>
// //                     {savedProducts.map((product) => (
// //                       <div
// //                         key={product.video_product_id || product.id}
// //                         style={{
// //                           display: 'flex',
// //                           alignItems: 'center',
// //                           gap: '0.4rem',
// //                           padding: '0.4rem',
// //                           marginBottom: '0.2rem',
// //                           background: isDarkTheme ? '#374151' : '#ffffff',
// //                           borderRadius: '4px',
// //                           fontSize: '0.65rem'
// //                         }}
// //                       >
// //                         {product.image_url ? (
// //                           <img 
// //                             src={product.image_url} 
// //                             alt={product.title}
// //                             style={{
// //                               width: '18px',
// //                               height: '18px',
// //                               borderRadius: '3px',
// //                               objectFit: 'cover'
// //                             }}
// //                           />
// //                         ) : (
// //                           <div style={{
// //                             width: '18px',
// //                             height: '18px',
// //                             background: '#3b82f6',
// //                             borderRadius: '3px',
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                             color: 'white',
// //                             fontSize: '0.55rem',
// //                             fontWeight: 'bold'
// //                           }}>
// //                             P
// //                           </div>
// //                         )}
// //                         <div style={{ flex: 1, minWidth: 0 }}>
// //                           <div style={{
// //                             color: currentTheme.text,
// //                             fontWeight: '500',
// //                             whiteSpace: 'nowrap',
// //                             overflow: 'hidden',
// //                             textOverflow: 'ellipsis'
// //                           }}>
// //                             {product.title}
// //                           </div>
// //                           <div style={{
// //                             color: '#10b981',
// //                             fontSize: '0.6rem'
// //                           }}>
// //                             ${product.price}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div style={{
// //                     textAlign: 'center',
// //                     padding: '0.8rem',
// //                     color: isDarkTheme ? '#9ca3af' : '#6b7280',
// //                     fontSize: '0.65rem',
// //                     fontStyle: 'italic',
// //                     border: `1px dashed ${currentTheme.border}`,
// //                     borderRadius: '6px',
// //                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
// //                   }}>
// //                     No products saved for this video
// //                   </div>
// //                 )}
// //               </div>

// //               <label style={{
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 gap: '0.4rem',
// //                 cursor: 'pointer',
// //                 fontSize: '0.7rem',
// //                 color: currentTheme.text,
// //                 marginTop: '0.4rem'
// //               }}>
// //                 <input 
// //                   type="checkbox" 
// //                   style={{
// //                     cursor: 'pointer'
// //                   }}
// //                 />
// //                 Enable video on product page
// //               </label>
// //             </div>
// //           </div>

// //           <style jsx>{`
// //             @keyframes scaleIn {
// //               from {
// //                 opacity: 0;
// //                 transform: scale(0.95) translateY(-10px);
// //               }
// //               to {
// //                 opacity: 1;
// //                 transform: scale(1) translateY(0);
// //               }
// //             }
// //           `}</style>
// //         </div>
// //       </div>

// //       {/* Products Modal */}
// //       {showProductsModal && (
// //         <ProductsModal
// //           showProductsModal={{ show: true, video: showTagProducts.video }}
// //           products={products || []}
// //           selectedProducts={selectedProducts || new Set()}
// //           loadingProducts={isLoadingProducts}
// //           onToggleProduct={onToggleProduct || (() => {})}
// //           onSaveProducts={handleSaveProducts}
// //           onHide={handleHideProductsModal}
// //           isDarkTheme={isDarkTheme}
// //         />
// //       )}
// //     </>
// //   );
// // }



// // components/videogallerycomponents/TagProductsModal.jsx
// import { useState, useEffect } from "react";
// import ProductsModal from "./ProductsModal";

// export default function TagProductsModal({
//   showTagProducts,
//   onHide,
//   onLoadProducts,
//   isDarkTheme,
//   selectedProducts,
//   products,
//   onToggleProduct,
//   onSaveProducts,
// }) {
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
//   const [showProductsModal, setShowProductsModal] = useState(false);
//   const [savedProducts, setSavedProducts] = useState([]);
//   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);

//   // SEPARATE state for tag products data
//   const [tagProductsData, setTagProductsData] = useState({
//     products: [],
//     selectedProducts: new Set(),
//     loading: false
//   });

//   // Fetch saved products when THIS modal opens
//   useEffect(() => {
//     if (showTagProducts.show && showTagProducts.video?.id) {
//       console.log('TagProductsModal: Fetching saved products for video:', showTagProducts.video.id);
//       fetchSavedProducts();
//     }
//   }, [showTagProducts.show, showTagProducts.video?.id]);

//   const fetchSavedProducts = async () => {
//     try {
//       setIsLoadingSavedProducts(true);
//       const response = await fetch(`/api/videoproducts?videoId=${showTagProducts.video.id}`);
//       const result = await response.json();
      
//       if (result.success) {
//         setSavedProducts(result.products);
//       } else {
//         console.error('Failed to fetch saved products:', result.error);
//         setSavedProducts([]);
//       }
//     } catch (error) {
//       console.error('Error fetching saved products:', error);
//       setSavedProducts([]);
//     } finally {
//       setIsLoadingSavedProducts(false);
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onHide();
//     }
//   };

//   // SEPARATE function to load products for THIS modal
//   const handleSubmitProducts = async () => {
//     try {
//       setIsLoadingProducts(true);
      
//       // Load products specifically for this modal
//       const response = await fetch('/api/products');
//       const result = await response.json();
      
//       if (result.success) {
//         setTagProductsData(prev => ({
//           ...prev,
//           products: result.products || []
//         }));
//         setShowProductsModal(true);
//       } else {
//         console.error('Failed to load products for tagging');
//       }
//     } catch (error) {
//       console.error('Error loading products:', error);
//     } finally {
//       setIsLoadingProducts(false);
//     }
//   };

//   const handleSaveProducts = async () => {
//     if (onSaveProducts) {
//       await onSaveProducts();
//     }
//     setShowProductsModal(false);
//     // Refresh saved products after saving
//     setTimeout(() => {
//       fetchSavedProducts();
//     }, 500);
//   };

//   const handleHideProductsModal = () => {
//     setShowProductsModal(false);
//   };

//   // Early return should be AFTER all hooks
//   if (!showTagProducts.show) return null;

//   const themeStyles = {
//     light: {
//       background: '#ffffff',
//       text: '#1f2937',
//       border: '#e5e7eb',
//       shadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
//       hoverBackground: '#f3f4f6',
//       sectionBackground: '#f8fafc'
//     },
//     dark: {
//       background: '#374151',
//       text: '#f9fafb',
//       border: '#4b5563',
//       shadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
//       hoverBackground: '#4b5563',
//       sectionBackground: '#4b5563'
//     }
//   };

//   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

//   return (
//     <>
//       <div 
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           zIndex: 10000,
//           background: 'rgba(0, 0, 0, 0.5)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//         onClick={handleBackdropClick}
//       >
//         <div 
//           style={{
//             background: currentTheme.background,
//             borderRadius: '12px',
//             border: `1px solid ${currentTheme.border}`,
//             boxShadow: currentTheme.shadow,
//             padding: '1.5rem',
//             maxWidth: '450px',
//             minWidth: '400px',
//             maxHeight: '100vh',
//             zIndex: 10001,
//             animation: 'scaleIn 0.2s ease-out',
//             overflow: 'hidden',
//             position: 'relative'
//           }}
//         >
//           {/* Close Button */}
//           <button
//             onClick={onHide}
//             style={{
//               position: 'absolute',
//               top: '1rem',
//               right: '1rem',
//               background: isDarkTheme ? '#374151' : 'white',
//               border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
//               borderRadius: '50%',
//               width: '32px',
//               height: '32px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//               color: isDarkTheme ? '#9ca3af' : '#6b7280',
//               fontSize: '1rem',
//               fontWeight: 'bold',
//               zIndex: 10002,
//               transition: 'all 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
//               e.target.style.color = isDarkTheme ? '#f9fafb' : '#1f2937';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = isDarkTheme ? '#374151' : 'white';
//               e.target.style.color = isDarkTheme ? '#9ca3af' : '#6b7280';
//             }}
//           >
//             ✕
//           </button>

//           {/* Products Section Only - No Video Column */}
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1rem',
//             height: '100%',
//             overflow: 'hidden'
//           }}>
//             <div style={{
//               display: 'flex',
//               flexDirection: 'column',
//               height: '100%',
//               gap: '0.8rem'
//             }}>
//               <h3 style={{
//                 fontSize: '0.875rem',
//                 fontWeight: '600',
//                 color: currentTheme.text,
//                 margin: 0
//               }}>
//                 Tag Products to Video
//               </h3>
              
//               <button
//                 onClick={handleSubmitProducts}
//                 disabled={isLoadingProducts}
//                 style={{
//                   width: '100%',
//                   background: '#10b981',
//                   color: 'white',
//                   border: 'none',
//                   padding: '0.4rem',
//                   borderRadius: '6px',
//                   fontSize: '0.7rem',
//                   fontWeight: '500',
//                   cursor: isLoadingProducts ? 'not-allowed' : 'pointer',
//                   transition: 'background-color 0.2s',
//                   opacity: isLoadingProducts ? 0.6 : 1
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isLoadingProducts) {
//                     e.target.style.background = '#059669';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isLoadingProducts) {
//                     e.target.style.background = '#10b981';
//                   }
//                 }}
//               >
//                 {isLoadingProducts ? 'Loading Products...' : 'Submit Products'}
//               </button>

//               {/* Saved Products Section */}
//               <div style={{
//                 flex: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 overflow: 'hidden'
//               }}>
//                 <div style={{
//                   fontSize: '0.7rem',
//                   fontWeight: '600',
//                   color: currentTheme.text,
//                   marginBottom: '0.4rem'
//                 }}>
//                   Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
//                 </div>
                
//                 {isLoadingSavedProducts ? (
//                   <div style={{
//                     textAlign: 'center',
//                     padding: '0.8rem',
//                     color: currentTheme.text,
//                     fontSize: '0.65rem',
//                     border: `1px solid ${currentTheme.border}`,
//                     borderRadius: '6px',
//                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
//                   }}>
//                     Loading saved products...
//                   </div>
//                 ) : savedProducts.length > 0 ? (
//                   <div style={{
//                     flex: 1,
//                     overflowY: 'auto',
//                     border: `1px solid ${currentTheme.border}`,
//                     borderRadius: '6px',
//                     padding: '0.4rem',
//                     background: isDarkTheme ? '#1f2937' : '#f8fafc',
//                     maxHeight: '180px'
//                   }}>
//                     {savedProducts.map((product) => (
//                       <div
//                         key={product.video_product_id || product.id}
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '0.4rem',
//                           padding: '0.4rem',
//                           marginBottom: '0.2rem',
//                           background: isDarkTheme ? '#374151' : '#ffffff',
//                           borderRadius: '4px',
//                           fontSize: '0.65rem'
//                         }}
//                       >
//                         {product.image_url ? (
//                           <img 
//                             src={product.image_url} 
//                             alt={product.title}
//                             style={{
//                               width: '18px',
//                               height: '18px',
//                               borderRadius: '3px',
//                               objectFit: 'cover'
//                             }}
//                           />
//                         ) : (
//                           <div style={{
//                             width: '18px',
//                             height: '18px',
//                             background: '#3b82f6',
//                             borderRadius: '3px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: 'white',
//                             fontSize: '0.55rem',
//                             fontWeight: 'bold'
//                           }}>
//                             P
//                           </div>
//                         )}
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                           <div style={{
//                             color: currentTheme.text,
//                             fontWeight: '500',
//                             whiteSpace: 'nowrap',
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis'
//                           }}>
//                             {product.title}
//                           </div>
//                           <div style={{
//                             color: '#10b981',
//                             fontSize: '0.6rem'
//                           }}>
//                             ${product.price}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div style={{
//                     textAlign: 'center',
//                     padding: '0.8rem',
//                     color: isDarkTheme ? '#9ca3af' : '#6b7280',
//                     fontSize: '0.65rem',
//                     fontStyle: 'italic',
//                     border: `1px dashed ${currentTheme.border}`,
//                     borderRadius: '6px',
//                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
//                   }}>
//                     No products saved for this video
//                   </div>
//                 )}
//               </div>

//               <label style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.4rem',
//                 cursor: 'pointer',
//                 fontSize: '0.7rem',
//                 color: currentTheme.text,
//                 marginTop: '0.4rem'
//               }}>
//                 <input 
//                   type="checkbox" 
//                   style={{
//                     cursor: 'pointer'
//                   }}
//                 />
//                 Enable video on product page
//               </label>
//             </div>
//           </div>

//           <style jsx>{`
//             @keyframes scaleIn {
//               from {
//                 opacity: 0;
//                 transform: scale(0.95) translateY(-10px);
//               }
//               to {
//                 opacity: 1;
//                 transform: scale(1) translateY(0);
//               }
//             }
//           `}</style>
//         </div>
//       </div>

//       {/* Products Modal */}
//       {showProductsModal && (
//         <ProductsModal
//           showProductsModal={{ show: true, video: showTagProducts.video }}
//           products={tagProductsData.products.length > 0 ? tagProductsData.products : products}
//           selectedProducts={selectedProducts}
//           loadingProducts={isLoadingProducts}
//           onToggleProduct={onToggleProduct}
//           onSaveProducts={handleSaveProducts}
//           onHide={handleHideProductsModal}
//           isDarkTheme={isDarkTheme}
//         />
//       )}
//     </>
//   );
// }




// components/videogallerycomponents/TagProductsModal.jsx
import { useState, useEffect } from "react";
import ProductsModal from "./ProductsModal";

export default function TagProductsModal({
  showTagProducts,
  onHide,
  onLoadProducts,
  isDarkTheme,
  selectedProducts,
  products,
  onToggleProduct,
  onSaveProducts,
}) {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);

  // SEPARATE state for tag products data
  const [tagProductsData, setTagProductsData] = useState({
    products: [],
    selectedProducts: new Set(),
    loading: false
  });

  // Fetch saved products when THIS modal opens
  useEffect(() => {
    if (showTagProducts.show && showTagProducts.video?.id) {
      console.log('TagProductsModal: Fetching saved products for video:', showTagProducts.video.id);
      fetchSavedProducts();
    }
  }, [showTagProducts.show, showTagProducts.video?.id]);

  const fetchSavedProducts = async () => {
    try {
      setIsLoadingSavedProducts(true);
      const response = await fetch(`/api/videoproducts?videoId=${showTagProducts.video.id}`);
      const result = await response.json();
      
      if (result.success) {
        setSavedProducts(result.products);
      } else {
        console.error('Failed to fetch saved products:', result.error);
        setSavedProducts([]);
      }
    } catch (error) {
      console.error('Error fetching saved products:', error);
      setSavedProducts([]);
    } finally {
      setIsLoadingSavedProducts(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  // SEPARATE function to load products for THIS modal
  const handleSubmitProducts = async () => {
    try {
      setIsLoadingProducts(true);
      
      // Load products specifically for this modal
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        setTagProductsData(prev => ({
          ...prev,
          products: result.products || []
        }));
        setShowProductsModal(true);
      } else {
        console.error('Failed to load products for tagging');
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleSaveProducts = async () => {
    if (onSaveProducts) {
      await onSaveProducts();
    }
    setShowProductsModal(false);
    // Refresh saved products after saving
    setTimeout(() => {
      fetchSavedProducts();
    }, 500);
  };

  const handleHideProductsModal = () => {
    setShowProductsModal(false);
  };

  // Early return should be AFTER all hooks
  if (!showTagProducts.show) return null;

  const themeStyles = {
    light: {
      background: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb',
      shadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      hoverBackground: '#f3f4f6',
      sectionBackground: '#f8fafc'
    },
    dark: {
      background: '#374151',
      text: '#f9fafb',
      border: '#4b5563',
      shadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
      hoverBackground: '#4b5563',
      sectionBackground: '#4b5563'
    }
  };

  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onClick={handleBackdropClick}
      >
        <div 
          style={{
            background: currentTheme.background,
            borderRadius: '12px',
            border: `1px solid ${currentTheme.border}`,
            boxShadow: currentTheme.shadow,
            padding: '1.5rem',
            maxWidth: '450px',
            minWidth: '400px',
            maxHeight: '100vh',
            zIndex: 10001,
            animation: 'scaleIn 0.2s ease-out',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onHide}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: isDarkTheme ? '#374151' : 'white',
              border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isDarkTheme ? '#9ca3af' : '#6b7280',
              fontSize: '1rem',
              fontWeight: 'bold',
              zIndex: 10002,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
              e.target.style.color = isDarkTheme ? '#f9fafb' : '#1f2937';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDarkTheme ? '#374151' : 'white';
              e.target.style.color = isDarkTheme ? '#9ca3af' : '#6b7280';
            }}
          >
            ✕
          </button>

          {/* Products Section Only - No Video Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100%',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              gap: '0.8rem'
            }}>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: currentTheme.text,
                margin: 0
              }}>
                Tag Products to Video
              </h3>
              
              <button
                onClick={handleSubmitProducts}
                disabled={isLoadingProducts}
                style={{
                  width: '100%',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: '500',
                  cursor: isLoadingProducts ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                  opacity: isLoadingProducts ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoadingProducts) {
                    e.target.style.background = '#059669';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoadingProducts) {
                    e.target.style.background = '#10b981';
                  }
                }}
              >
                {isLoadingProducts ? 'Loading Products...' : 'Submit Products'}
              </button>

              {/* Saved Products Section */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: currentTheme.text,
                  marginBottom: '0.4rem'
                }}>
                  Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
                </div>
                
                {isLoadingSavedProducts ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '0.8rem',
                    color: currentTheme.text,
                    fontSize: '0.65rem',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    background: isDarkTheme ? '#1f2937' : '#f8fafc'
                  }}>
                    Loading saved products...
                  </div>
                ) : savedProducts.length > 0 ? (
                  <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    padding: '0.4rem',
                    background: isDarkTheme ? '#1f2937' : '#f8fafc',
                    maxHeight: '180px'
                  }}>
                    {savedProducts.map((product) => (
                      <div
                        key={product.video_product_id || product.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.4rem',
                          marginBottom: '0.2rem',
                          background: isDarkTheme ? '#374151' : '#ffffff',
                          borderRadius: '4px',
                          fontSize: '0.65rem'
                        }}
                      >
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.title}
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '3px',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '18px',
                            height: '18px',
                            background: '#3b82f6',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.55rem',
                            fontWeight: 'bold'
                          }}>
                            P
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            color: currentTheme.text,
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {product.title}
                          </div>
                          <div style={{
                            color: '#10b981',
                            fontSize: '0.6rem'
                          }}>
                            ${product.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '0.8rem',
                    color: isDarkTheme ? '#9ca3af' : '#6b7280',
                    fontSize: '0.65rem',
                    fontStyle: 'italic',
                    border: `1px dashed ${currentTheme.border}`,
                    borderRadius: '6px',
                    background: isDarkTheme ? '#1f2937' : '#f8fafc'
                  }}>
                    No products saved for this video
                  </div>
                )}
              </div>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                fontSize: '0.7rem',
                color: currentTheme.text,
                marginTop: '0.4rem'
              }}>
                <input 
                  type="checkbox" 
                  style={{
                    cursor: 'pointer'
                  }}
                />
                Enable video on product page
              </label>
            </div>
          </div>

          <style jsx>{`
            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.95) translateY(-10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}</style>
        </div>
      </div>

      {/* Products Modal */}
      {showProductsModal && (
        <ProductsModal
          showProductsModal={{ show: true, video: showTagProducts.video }}
          products={tagProductsData.products.length > 0 ? tagProductsData.products : products}
          selectedProducts={selectedProducts}
          loadingProducts={isLoadingProducts}
          onToggleProduct={onToggleProduct}
          onSaveProducts={handleSaveProducts}
          onHide={handleHideProductsModal}
          isDarkTheme={isDarkTheme}
        />
      )}
    </>
  );
}