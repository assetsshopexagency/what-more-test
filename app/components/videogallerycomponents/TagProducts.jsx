// // // // // components/videogallerycomponents/TagProductsModal.jsx
// // // // import { useState, useEffect } from "react";
// // // // import ProductsModal from "./ProductsModal";

// // // // export default function TagProductsModal({
// // // //   showTagProducts,
// // // //   onHide,
// // // //   onLoadProducts,
// // // //   isDarkTheme,
// // // //   selectedProducts, // Use the main selectedProducts from props
// // // //   products, // Use the main products from props
// // // //   onToggleProduct, // Use the main toggle function from props
// // // //   onSaveProducts, // Use the main save function from props
// // // //   productsModalOpened, // Get modal opened state from parent
// // // //   closeProductsModal // Get close function from parent
// // // // }) {
// // // //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// // // //   const [showProductsModal, setShowProductsModal] = useState(false);
// // // //   const [savedProducts, setSavedProducts] = useState([]);
// // // //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);

// // // //   // Fetch saved products when THIS modal opens
// // // //   useEffect(() => {
// // // //     if (showTagProducts.show && showTagProducts.video?.id) {
// // // //       console.log('TagProductsModal: Fetching saved products for video:', showTagProducts.video.id);
// // // //       fetchSavedProducts();
// // // //     }
// // // //   }, [showTagProducts.show, showTagProducts.video?.id]);

// // // //   const fetchSavedProducts = async () => {
// // // //     try {
// // // //       setIsLoadingSavedProducts(true);
// // // //       const response = await fetch(`/api/video-products/${showTagProducts.video.id}`);
// // // //       const result = await response.json();
      
// // // //       if (result.success) {
// // // //         setSavedProducts(result.products);
// // // //       } else {
// // // //         console.error('Failed to fetch saved products:', result.error);
// // // //         setSavedProducts([]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching saved products:', error);
// // // //       setSavedProducts([]);
// // // //     } finally {
// // // //       setIsLoadingSavedProducts(false);
// // // //     }
// // // //   };

// // // //   const handleBackdropClick = (e) => {
// // // //     if (e.target === e.currentTarget) {
// // // //       onHide();
// // // //     }
// // // //   };

// // // //   // FIXED: Use the main onLoadProducts function to ensure consistency
// // // //   const handleSubmitProducts = async () => {
// // // //     try {
// // // //       setIsLoadingProducts(true);
      
// // // //       // Use the main onLoadProducts function to ensure consistency
// // // //       if (onLoadProducts) {
// // // //         await onLoadProducts(showTagProducts.video);
// // // //       }
      
// // // //       // ProductsModal will be shown by the parent through showProductsModal state
// // // //       // We don't need to setShowProductsModal here anymore
// // // //     } catch (error) {
// // // //       console.error('Error loading products:', error);
// // // //     } finally {
// // // //       setIsLoadingProducts(false);
// // // //     }
// // // //   };

// // // //   const handleSaveProducts = async () => {
// // // //     if (onSaveProducts) {
// // // //       await onSaveProducts();
// // // //     }
// // // //     // Don't setShowProductsModal here - let the parent handle it
// // // //     if (closeProductsModal) {
// // // //       closeProductsModal();
// // // //     }
// // // //     // Refresh saved products after saving
// // // //     setTimeout(() => {
// // // //       fetchSavedProducts();
// // // //     }, 500);
// // // //   };

// // // //   const handleHideProductsModal = () => {
// // // //     if (closeProductsModal) {
// // // //       closeProductsModal();
// // // //     }
// // // //   };

// // // //   // Early return should be AFTER all hooks
// // // //   if (!showTagProducts.show) return null;

// // // //   const themeStyles = {
// // // //     light: {
// // // //       background: '#ffffff',
// // // //       text: '#1f2937',
// // // //       border: '#e5e7eb',
// // // //       shadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
// // // //       hoverBackground: '#f3f4f6',
// // // //       sectionBackground: '#f8fafc'
// // // //     },
// // // //     dark: {
// // // //       background: '#374151',
// // // //       text: '#f9fafb',
// // // //       border: '#4b5563',
// // // //       shadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
// // // //       hoverBackground: '#4b5563',
// // // //       sectionBackground: '#4b5563'
// // // //     }
// // // //   };

// // // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // // //   return (
// // // //     <>
// // // //       <div 
// // // //         style={{
// // // //           position: 'fixed',
// // // //           top: 0,
// // // //           left: 0,
// // // //           right: 0,
// // // //           bottom: 0,
// // // //           zIndex: 10000,
// // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // //           display: 'flex',
// // // //           justifyContent: 'center',
// // // //           alignItems: 'center'
// // // //         }}
// // // //         onClick={handleBackdropClick}
// // // //       >
// // // //         <div 
// // // //           style={{
// // // //             background: currentTheme.background,
// // // //             borderRadius: '12px',
// // // //             border: `1px solid ${currentTheme.border}`,
// // // //             boxShadow: currentTheme.shadow,
// // // //             padding: '1.5rem',
// // // //             maxWidth: '450px',
// // // //             minWidth: '400px',
// // // //             maxHeight: '100vh',
// // // //             zIndex: 10001,
// // // //             animation: 'scaleIn 0.2s ease-out',
// // // //             overflow: 'hidden',
// // // //             position: 'relative'
// // // //           }}
// // // //         >
// // // //           {/* Close Button */}
// // // //           <button
// // // //             onClick={onHide}
// // // //             style={{
// // // //               position: 'absolute',
// // // //               top: '1rem',
// // // //               right: '1rem',
// // // //               background: isDarkTheme ? '#374151' : 'white',
// // // //               border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
// // // //               borderRadius: '50%',
// // // //               width: '32px',
// // // //               height: '32px',
// // // //               display: 'flex',
// // // //               alignItems: 'center',
// // // //               justifyContent: 'center',
// // // //               cursor: 'pointer',
// // // //               color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // // //               fontSize: '1rem',
// // // //               fontWeight: 'bold',
// // // //               zIndex: 10002,
// // // //               transition: 'all 0.3s ease'
// // // //             }}
// // // //             onMouseEnter={(e) => {
// // // //               e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
// // // //               e.target.style.color = isDarkTheme ? '#f9fafb' : '#1f2937';
// // // //             }}
// // // //             onMouseLeave={(e) => {
// // // //               e.target.style.background = isDarkTheme ? '#374151' : 'white';
// // // //               e.target.style.color = isDarkTheme ? '#9ca3af' : '#6b7280';
// // // //             }}
// // // //           >
// // // //             ✕
// // // //           </button>

// // // //           {/* Products Section Only - No Video Column */}
// // // //           <div style={{
// // // //             display: 'flex',
// // // //             flexDirection: 'column',
// // // //             gap: '1rem',
// // // //             height: '100%',
// // // //             overflow: 'hidden'
// // // //           }}>
// // // //             <div style={{
// // // //               display: 'flex',
// // // //               flexDirection: 'column',
// // // //               height: '100%',
// // // //               gap: '0.8rem'
// // // //             }}>
// // // //               <h3 style={{
// // // //                 fontSize: '0.875rem',
// // // //                 fontWeight: '600',
// // // //                 color: currentTheme.text,
// // // //                 margin: 0
// // // //               }}>
// // // //                 Tag Products to Video
// // // //               </h3>
              
// // // //               <button
// // // //                 onClick={handleSubmitProducts}
// // // //                 disabled={isLoadingProducts || productsModalOpened}
// // // //                 style={{
// // // //                   width: '100%',
// // // //                   background: '#10b981',
// // // //                   color: 'white',
// // // //                   border: 'none',
// // // //                   padding: '0.4rem',
// // // //                   borderRadius: '6px',
// // // //                   fontSize: '0.7rem',
// // // //                   fontWeight: '500',
// // // //                   cursor: (isLoadingProducts || productsModalOpened) ? 'not-allowed' : 'pointer',
// // // //                   transition: 'background-color 0.2s',
// // // //                   opacity: (isLoadingProducts || productsModalOpened) ? 0.6 : 1
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   if (!isLoadingProducts && !productsModalOpened) {
// // // //                     e.target.style.background = '#059669';
// // // //                   }
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   if (!isLoadingProducts && !productsModalOpened) {
// // // //                     e.target.style.background = '#10b981';
// // // //                   }
// // // //                 }}
// // // //               >
// // // //                 {isLoadingProducts ? 'Loading Products...' : productsModalOpened ? 'Opening...' : 'Add Products'}
// // // //               </button>

// // // //               {/* Saved Products Section */}
// // // //               <div style={{
// // // //                 flex: 1,
// // // //                 display: 'flex',
// // // //                 flexDirection: 'column',
// // // //                 overflow: 'hidden'
// // // //               }}>
// // // //                 <div style={{
// // // //                   fontSize: '0.7rem',
// // // //                   fontWeight: '600',
// // // //                   color: currentTheme.text,
// // // //                   marginBottom: '0.4rem'
// // // //                 }}>
// // // //                   Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
// // // //                 </div>
                
// // // //                 {isLoadingSavedProducts ? (
// // // //                   <div style={{
// // // //                     textAlign: 'center',
// // // //                     padding: '0.8rem',
// // // //                     color: currentTheme.text,
// // // //                     fontSize: '0.65rem',
// // // //                     border: `1px solid ${currentTheme.border}`,
// // // //                     borderRadius: '6px',
// // // //                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
// // // //                   }}>
// // // //                     Loading saved products...
// // // //                   </div>
// // // //                 ) : savedProducts.length > 0 ? (
// // // //                   <div style={{
// // // //                     flex: 1,
// // // //                     overflowY: 'auto',
// // // //                     border: `1px solid ${currentTheme.border}`,
// // // //                     borderRadius: '6px',
// // // //                     padding: '0.4rem',
// // // //                     background: isDarkTheme ? '#1f2937' : '#f8fafc',
// // // //                     maxHeight: '180px'
// // // //                   }}>
// // // //                     {savedProducts.map((product) => (
// // // //                       <div
// // // //                         key={product.video_product_id || product.id}
// // // //                         style={{
// // // //                           display: 'flex',
// // // //                           alignItems: 'center',
// // // //                           gap: '0.4rem',
// // // //                           padding: '0.4rem',
// // // //                           marginBottom: '0.2rem',
// // // //                           background: isDarkTheme ? '#374151' : '#ffffff',
// // // //                           borderRadius: '4px',
// // // //                           fontSize: '0.65rem'
// // // //                         }}
// // // //                       >
// // // //                         {product.image_url ? (
// // // //                           <img 
// // // //                             src={product.image_url} 
// // // //                             alt={product.title}
// // // //                             style={{
// // // //                               width: '18px',
// // // //                               height: '18px',
// // // //                               borderRadius: '3px',
// // // //                               objectFit: 'cover'
// // // //                             }}
// // // //                           />
// // // //                         ) : (
// // // //                           <div style={{
// // // //                             width: '18px',
// // // //                             height: '18px',
// // // //                             background: '#3b82f6',
// // // //                             borderRadius: '3px',
// // // //                             display: 'flex',
// // // //                             alignItems: 'center',
// // // //                             justifyContent: 'center',
// // // //                             color: 'white',
// // // //                             fontSize: '0.55rem',
// // // //                             fontWeight: 'bold'
// // // //                           }}>
// // // //                             P
// // // //                           </div>
// // // //                         )}
// // // //                         <div style={{ flex: 1, minWidth: 0 }}>
// // // //                           <div style={{
// // // //                             color: currentTheme.text,
// // // //                             fontWeight: '500',
// // // //                             whiteSpace: 'nowrap',
// // // //                             overflow: 'hidden',
// // // //                             textOverflow: 'ellipsis'
// // // //                           }}>
// // // //                             {product.title}
// // // //                           </div>
// // // //                           <div style={{
// // // //                             color: '#10b981',
// // // //                             fontSize: '0.6rem'
// // // //                           }}>
// // // //                             ${product.price}
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div style={{
// // // //                     textAlign: 'center',
// // // //                     padding: '0.8rem',
// // // //                     color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // // //                     fontSize: '0.65rem',
// // // //                     fontStyle: 'italic',
// // // //                     border: `1px dashed ${currentTheme.border}`,
// // // //                     borderRadius: '6px',
// // // //                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
// // // //                   }}>
// // // //                     No products saved for this video
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <style jsx>{`
// // // //             @keyframes scaleIn {
// // // //               from {
// // // //                 opacity: 0;
// // // //                 transform: scale(0.95) translateY(-10px);
// // // //               }
// // // //               to {
// // // //                 opacity: 1;
// // // //                 transform: scale(1) translateY(0);
// // // //               }
// // // //             }
// // // //           `}</style>
// // // //         </div>
// // // //       </div>

// // // //       {/* Products Modal is now controlled by the parent component */}
// // // //     </>
// // // //   );
// // // // }





// // // // components/videogallerycomponents/TagProductsModal.jsx
// // // import { useState, useEffect } from "react";
// // // import ProductsModal from "./ProductsModal";

// // // export default function TagProductsModal({
// // //   showTagProducts,
// // //   onHide,
// // //   onLoadProducts,
// // //   isDarkTheme,
// // //   selectedProducts, // Use the main selectedProducts from props
// // //   products, // Use the main products from props
// // //   onToggleProduct, // Use the main toggle function from props
// // //   onSaveProducts, // Use the main save function from props
// // //   productsModalOpened, // Get modal opened state from parent
// // //   closeProductsModal // Get close function from parent
// // // }) {
// // //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// // //   const [showProductsModal, setShowProductsModal] = useState(false);
// // //   const [savedProducts, setSavedProducts] = useState([]);
// // //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);

// // //   // Fetch saved products when THIS modal opens
// // //   useEffect(() => {
// // //     if (showTagProducts.show && showTagProducts.video?.id) {
// // //       console.log('TagProductsModal: Fetching saved products for video:', showTagProducts.video.id);
// // //       fetchSavedProducts();
// // //     }
// // //   }, [showTagProducts.show, showTagProducts.video?.id]);

// // //   const fetchSavedProducts = async () => {
// // //     try {
// // //       setIsLoadingSavedProducts(true);
// // //       const response = await fetch(`/api/video-products/${showTagProducts.video.id}`);
// // //       const result = await response.json();
      
// // //       if (result.success) {
// // //         setSavedProducts(result.products);
// // //       } else {
// // //         console.error('Failed to fetch saved products:', result.error);
// // //         setSavedProducts([]);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching saved products:', error);
// // //       setSavedProducts([]);
// // //     } finally {
// // //       setIsLoadingSavedProducts(false);
// // //     }
// // //   };

// // //   const handleBackdropClick = (e) => {
// // //     if (e.target === e.currentTarget) {
// // //       onHide();
// // //     }
// // //   };

// // //   // FIXED: Use the main onLoadProducts function to ensure consistency
// // //   const handleSubmitProducts = async () => {
// // //     try {
// // //       setIsLoadingProducts(true);
      
// // //       // Use the main onLoadProducts function to ensure consistency
// // //       if (onLoadProducts) {
// // //         await onLoadProducts(showTagProducts.video);
// // //       }
      
// // //       // ProductsModal will be shown by the parent through showProductsModal state
// // //       // We don't need to setShowProductsModal here anymore
// // //     } catch (error) {
// // //       console.error('Error loading products:', error);
// // //     } finally {
// // //       setIsLoadingProducts(false);
// // //     }
// // //   };

// // //   const handleSaveProducts = async () => {
// // //     if (onSaveProducts) {
// // //       await onSaveProducts();
// // //     }
// // //     // Don't setShowProductsModal here - let the parent handle it
// // //     if (closeProductsModal) {
// // //       closeProductsModal();
// // //     }
// // //     // Refresh saved products after saving
// // //     setTimeout(() => {
// // //       fetchSavedProducts();
// // //     }, 500);
// // //   };

// // //   const handleHideProductsModal = () => {
// // //     if (closeProductsModal) {
// // //       closeProductsModal();
// // //     }
// // //   };

// // //   // Early return should be AFTER all hooks
// // //   if (!showTagProducts.show) return null;

// // //   const themeStyles = {
// // //     light: {
// // //       background: '#ffffff',
// // //       text: '#1f2937',
// // //       border: '#e5e7eb',
// // //       shadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
// // //       hoverBackground: '#f3f4f6',
// // //       sectionBackground: '#f8fafc'
// // //     },
// // //     dark: {
// // //       background: '#374151',
// // //       text: '#f9fafb',
// // //       border: '#4b5563',
// // //       shadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
// // //       hoverBackground: '#4b5563',
// // //       sectionBackground: '#4b5563'
// // //     }
// // //   };

// // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // //   return (
// // //     <>
// // //       <div 
// // //         style={{
// // //           position: 'fixed',
// // //           top: 0,
// // //           left: 0,
// // //           right: 0,
// // //           bottom: 0,
// // //           zIndex: 10000,
// // //           background: 'rgba(0, 0, 0, 0.5)',
// // //           display: 'flex',
// // //           justifyContent: 'center',
// // //           alignItems: 'center'
// // //         }}
// // //         onClick={handleBackdropClick}
// // //       >
// // //         <div 
// // //           style={{
// // //             background: currentTheme.background,
// // //             borderRadius: '12px',
// // //             border: `1px solid ${currentTheme.border}`,
// // //             boxShadow: currentTheme.shadow,
// // //             padding: '2.5rem', // Increased from 1.5rem
// // //             maxWidth: '650px', // Increased from 450px (+200px = ~10rem)
// // //             minWidth: '600px', // Increased from 400px (+200px = ~10rem)
// // //             maxHeight: '100vh',
// // //             zIndex: 10001,
// // //             animation: 'scaleIn 0.2s ease-out',
// // //             overflow: 'hidden',
// // //             position: 'relative',
// // //             height: 'auto', // Allow natural height
// // //             minHeight: '350px' // Increased height
// // //           }}
// // //         >
// // //           {/* Close Button */}
// // //           <button
// // //             onClick={onHide}
// // //             style={{
// // //               position: 'absolute',
// // //               top: '1.5rem', // Increased from 1rem
// // //               right: '1.5rem', // Increased from 1rem
// // //               background: isDarkTheme ? '#374151' : 'white',
// // //               border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
// // //               borderRadius: '50%',
// // //               width: '40px', // Increased from 32px
// // //               height: '40px', // Increased from 32px
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               cursor: 'pointer',
// // //               color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // //               fontSize: '1.2rem', // Increased from 1rem
// // //               fontWeight: 'bold',
// // //               zIndex: 10002,
// // //               transition: 'all 0.3s ease'
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
// // //               e.target.style.color = isDarkTheme ? '#f9fafb' : '#1f2937';
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               e.target.style.background = isDarkTheme ? '#374151' : 'white';
// // //               e.target.style.color = isDarkTheme ? '#9ca3af' : '#6b7280';
// // //             }}
// // //           >
// // //             ✕
// // //           </button>

// // //           {/* Products Section Only - No Video Column */}
// // //           <div style={{
// // //             display: 'flex',
// // //             flexDirection: 'column',
// // //             gap: '1.5rem', // Increased from 1rem
// // //             height: '100%',
// // //             overflow: 'hidden'
// // //           }}>
// // //             <div style={{
// // //               display: 'flex',
// // //               flexDirection: 'column',
// // //               height: '100%',
// // //               gap: '1.2rem' // Increased from 0.8rem
// // //             }}>
// // //               <h3 style={{
// // //                 fontSize: '1.2rem', // Increased from 0.875rem
// // //                 fontWeight: '600',
// // //                 color: currentTheme.text,
// // //                 margin: 0
// // //               }}>
// // //                 Tag Products to Video
// // //               </h3>
              
// // //               <button
// // //                 onClick={handleSubmitProducts}
// // //                 disabled={isLoadingProducts || productsModalOpened}
// // //                 style={{
// // //                   width: '100%',
// // //                   background: '#10b981',
// // //                   color: 'white',
// // //                   border: 'none',
// // //                   padding: '0.8rem', // Increased from 0.4rem
// // //                   borderRadius: '8px', // Increased from 6px
// // //                   fontSize: '1rem', // Increased from 0.7rem
// // //                   fontWeight: '500',
// // //                   cursor: (isLoadingProducts || productsModalOpened) ? 'not-allowed' : 'pointer',
// // //                   transition: 'background-color 0.2s',
// // //                   opacity: (isLoadingProducts || productsModalOpened) ? 0.6 : 1
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   if (!isLoadingProducts && !productsModalOpened) {
// // //                     e.target.style.background = '#059669';
// // //                   }
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   if (!isLoadingProducts && !productsModalOpened) {
// // //                     e.target.style.background = '#10b981';
// // //                   }
// // //                 }}
// // //               >
// // //                 {isLoadingProducts ? 'Loading Products...' : productsModalOpened ? 'Opening...' : 'Add Products'}
// // //               </button>

// // //               {/* Saved Products Section */}
// // //               <div style={{
// // //                 flex: 1,
// // //                 display: 'flex',
// // //                 flexDirection: 'column',
// // //                 overflow: 'hidden'
// // //               }}>
// // //                 <div style={{
// // //                   fontSize: '1rem', // Increased from 0.7rem
// // //                   fontWeight: '600',
// // //                   color: currentTheme.text,
// // //                   marginBottom: '0.8rem' // Increased from 0.4rem
// // //                 }}>
// // //                   Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
// // //                 </div>
                
// // //                 {isLoadingSavedProducts ? (
// // //                   <div style={{
// // //                     textAlign: 'center',
// // //                     padding: '1.2rem', // Increased from 0.8rem
// // //                     color: currentTheme.text,
// // //                     fontSize: '0.9rem', // Increased from 0.65rem
// // //                     border: `1px solid ${currentTheme.border}`,
// // //                     borderRadius: '8px', // Increased from 6px
// // //                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
// // //                   }}>
// // //                     Loading saved products...
// // //                   </div>
// // //                 ) : savedProducts.length > 0 ? (
// // //                   <div style={{
// // //                     flex: 1,
// // //                     overflowY: 'auto',
// // //                     border: `1px solid ${currentTheme.border}`,
// // //                     borderRadius: '8px', // Increased from 6px
// // //                     padding: '0.8rem', // Increased from 0.4rem
// // //                     background: isDarkTheme ? '#1f2937' : '#f8fafc',
// // //                     maxHeight: '280px' // Increased from 180px
// // //                   }}>
// // //                     {savedProducts.map((product) => (
// // //                       <div
// // //                         key={product.video_product_id || product.id}
// // //                         style={{
// // //                           display: 'flex',
// // //                           alignItems: 'center',
// // //                           gap: '0.8rem', // Increased from 0.4rem
// // //                           padding: '0.8rem', // Increased from 0.4rem
// // //                           marginBottom: '0.4rem', // Increased from 0.2rem
// // //                           background: isDarkTheme ? '#374151' : '#ffffff',
// // //                           borderRadius: '6px', // Increased from 4px
// // //                           fontSize: '0.9rem' // Increased from 0.65rem
// // //                         }}
// // //                       >
// // //                         {product.image_url ? (
// // //                           <img 
// // //                             src={product.image_url} 
// // //                             alt={product.title}
// // //                             style={{
// // //                               width: '28px', // Increased from 18px
// // //                               height: '28px', // Increased from 18px
// // //                               borderRadius: '4px', // Increased from 3px
// // //                               objectFit: 'cover'
// // //                             }}
// // //                           />
// // //                         ) : (
// // //                           <div style={{
// // //                             width: '28px', // Increased from 18px
// // //                             height: '28px', // Increased from 18px
// // //                             background: '#3b82f6',
// // //                             borderRadius: '4px', // Increased from 3px
// // //                             display: 'flex',
// // //                             alignItems: 'center',
// // //                             justifyContent: 'center',
// // //                             color: 'white',
// // //                             fontSize: '0.8rem', // Increased from 0.55rem
// // //                             fontWeight: 'bold'
// // //                           }}>
// // //                             P
// // //                           </div>
// // //                         )}
// // //                         <div style={{ flex: 1, minWidth: 0 }}>
// // //                           <div style={{
// // //                             color: currentTheme.text,
// // //                             fontWeight: '500',
// // //                             whiteSpace: 'nowrap',
// // //                             overflow: 'hidden',
// // //                             textOverflow: 'ellipsis'
// // //                           }}>
// // //                             {product.title}
// // //                           </div>
// // //                           <div style={{
// // //                             color: '#10b981',
// // //                             fontSize: '0.8rem' // Increased from 0.6rem
// // //                           }}>
// // //                             ${product.price}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div style={{
// // //                     textAlign: 'center',
// // //                     padding: '1.2rem', // Increased from 0.8rem
// // //                     color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // //                     fontSize: '0.9rem', // Increased from 0.65rem
// // //                     fontStyle: 'italic',
// // //                     border: `1px dashed ${currentTheme.border}`,
// // //                     borderRadius: '8px', // Increased from 6px
// // //                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
// // //                   }}>
// // //                     No products saved for this video
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <style jsx>{`
// // //             @keyframes scaleIn {
// // //               from {
// // //                 opacity: 0;
// // //                 transform: scale(0.95) translateY(-10px);
// // //               }
// // //               to {
// // //                 opacity: 1;
// // //                 transform: scale(1) translateY(0);
// // //               }
// // //             }
// // //           `}</style>
// // //         </div>
// // //       </div>

// // //       {/* Products Modal is now controlled by the parent component */}
// // //     </>
// // //   );
// // // }




// // // components/videogallerycomponents/TagProductsModal.jsx
// // import { useState, useEffect } from "react";
// // import ProductsModal from "./ProductsModal";

// // export default function TagProductsModal({
// //   showTagProducts,
// //   onHide,
// //   onLoadProducts,
// //   isDarkTheme,
// //   selectedProducts, // Use the main selectedProducts from props
// //   products, // Use the main products from props
// //   onToggleProduct, // Use the main toggle function from props
// //   onSaveProducts, // Use the main save function from props
// //   productsModalOpened, // Get modal opened state from parent
// //   closeProductsModal // Get close function from parent
// // }) {
// //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// //   const [showProductsModal, setShowProductsModal] = useState(false);
// //   const [savedProducts, setSavedProducts] = useState([]);
// //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);

// //   // Fetch saved products when THIS modal opens
// //   useEffect(() => {
// //     if (showTagProducts.show && showTagProducts.video?.id) {
// //       console.log('TagProductsModal: Fetching saved products for video:', showTagProducts.video.id);
// //       fetchSavedProducts();
// //     }
// //   }, [showTagProducts.show, showTagProducts.video?.id]);

// //   const fetchSavedProducts = async () => {
// //     try {
// //       setIsLoadingSavedProducts(true);
// //       const response = await fetch(`/api/video-products/${showTagProducts.video.id}`);
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

// //   // CHANGED: Added remove product function like in VideoOptionsModal
// //   const handleRemoveProduct = async (productId) => {
// //     try {
// //       const response = await fetch(`/api/video-products/${showTagProducts.video.id}/delete`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ productId }),
// //       });

// //       const result = await response.json();

// //       if (result.success) {
// //         // Remove the product from local state immediately
// //         setSavedProducts(prev => prev.filter(product => 
// //           product.shopify_product_id !== productId && product.id !== productId
// //         ));
// //         console.log('✅ Product removed successfully');
// //       } else {
// //         console.error('Failed to remove product:', result.error);
// //       }
// //     } catch (error) {
// //       console.error('Error removing product:', error);
// //     }
// //   };

// //   const handleBackdropClick = (e) => {
// //     if (e.target === e.currentTarget) {
// //       onHide();
// //     }
// //   };

// //   // FIXED: Use the main onLoadProducts function to ensure consistency
// //   const handleSubmitProducts = async () => {
// //     try {
// //       setIsLoadingProducts(true);
      
// //       // Use the main onLoadProducts function to ensure consistency
// //       if (onLoadProducts) {
// //         await onLoadProducts(showTagProducts.video);
// //       }
      
// //       // ProductsModal will be shown by the parent through showProductsModal state
// //       // We don't need to setShowProductsModal here anymore
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
// //     // Don't setShowProductsModal here - let the parent handle it
// //     if (closeProductsModal) {
// //       closeProductsModal();
// //     }
// //     // Refresh saved products after saving
// //     setTimeout(() => {
// //       fetchSavedProducts();
// //     }, 500);
// //   };

// //   const handleHideProductsModal = () => {
// //     if (closeProductsModal) {
// //       closeProductsModal();
// //     }
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
// //             padding: '2.5rem', // Increased from 1.5rem
// //             maxWidth: '650px', // Increased from 450px (+200px = ~10rem)
// //             minWidth: '600px', // Increased from 400px (+200px = ~10rem)
// //             maxHeight: '100vh',
// //             zIndex: 10001,
// //             animation: 'scaleIn 0.2s ease-out',
// //             overflow: 'hidden',
// //             position: 'relative',
// //             height: 'auto', // Allow natural height
// //             minHeight: '350px' // Increased height
// //           }}
// //         >
// //           {/* Close Button */}
// //           <button
// //             onClick={onHide}
// //             style={{
// //               position: 'absolute',
// //               top: '1.5rem', // Increased from 1rem
// //               right: '1.5rem', // Increased from 1rem
// //               background: isDarkTheme ? '#374151' : 'white',
// //               border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
// //               borderRadius: '50%',
// //               width: '40px', // Increased from 32px
// //               height: '40px', // Increased from 32px
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               cursor: 'pointer',
// //               color: isDarkTheme ? '#9ca3af' : '#6b7280',
// //               fontSize: '1.2rem', // Increased from 1rem
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
// //             gap: '1.5rem', // Increased from 1rem
// //             height: '100%',
// //             overflow: 'hidden'
// //           }}>
// //             <div style={{
// //               display: 'flex',
// //               flexDirection: 'column',
// //               height: '100%',
// //               gap: '1.2rem' // Increased from 0.8rem
// //             }}>
// //               <h3 style={{
// //                 fontSize: '1.2rem', // Increased from 0.875rem
// //                 fontWeight: '600',
// //                 color: currentTheme.text,
// //                 margin: 0
// //               }}>
// //                 Tag Products to Video
// //               </h3>
              
// //               <button
// //                 onClick={handleSubmitProducts}
// //                 disabled={isLoadingProducts || productsModalOpened}
// //                 style={{
// //                   width: '100%',
// //                   background: '#10b981',
// //                   color: 'white',
// //                   border: 'none',
// //                   padding: '0.8rem', // Increased from 0.4rem
// //                   borderRadius: '8px', // Increased from 6px
// //                   fontSize: '1rem', // Increased from 0.7rem
// //                   fontWeight: '500',
// //                   cursor: (isLoadingProducts || productsModalOpened) ? 'not-allowed' : 'pointer',
// //                   transition: 'background-color 0.2s',
// //                   opacity: (isLoadingProducts || productsModalOpened) ? 0.6 : 1
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   if (!isLoadingProducts && !productsModalOpened) {
// //                     e.target.style.background = '#059669';
// //                   }
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   if (!isLoadingProducts && !productsModalOpened) {
// //                     e.target.style.background = '#10b981';
// //                   }
// //                 }}
// //               >
// //                 {isLoadingProducts ? 'Loading Products...' : productsModalOpened ? 'Opening...' : 'Add Products'}
// //               </button>

// //               {/* Saved Products Section */}
// //               <div style={{
// //                 flex: 1,
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 overflow: 'hidden'
// //               }}>
// //                 <div style={{
// //                   fontSize: '1rem', // Increased from 0.7rem
// //                   fontWeight: '600',
// //                   color: currentTheme.text,
// //                   marginBottom: '0.8rem' // Increased from 0.4rem
// //                 }}>
// //                   Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
// //                 </div>
                
// //                 {isLoadingSavedProducts ? (
// //                   <div style={{
// //                     textAlign: 'center',
// //                     padding: '1.2rem', // Increased from 0.8rem
// //                     color: currentTheme.text,
// //                     fontSize: '0.9rem', // Increased from 0.65rem
// //                     border: `1px solid ${currentTheme.border}`,
// //                     borderRadius: '8px', // Increased from 6px
// //                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
// //                   }}>
// //                     Loading saved products...
// //                   </div>
// //                 ) : savedProducts.length > 0 ? (
// //                   <div style={{
// //                     flex: 1,
// //                     overflowY: 'auto',
// //                     border: `1px solid ${currentTheme.border}`,
// //                     borderRadius: '8px', // Increased from 6px
// //                     padding: '0.8rem', // Increased from 0.4rem
// //                     background: isDarkTheme ? '#1f2937' : '#f8fafc',
// //                     maxHeight: '280px' // Increased from 180px
// //                   }}>
// //                     {savedProducts.map((product) => (
// //                       <div
// //                         key={product.video_product_id || product.id}
// //                         style={{
// //                           display: 'flex',
// //                           alignItems: 'center',
// //                           gap: '0.8rem', // Increased from 0.4rem
// //                           padding: '0.8rem', // Increased from 0.4rem
// //                           marginBottom: '0.4rem', // Increased from 0.2rem
// //                           background: isDarkTheme ? '#374151' : '#ffffff',
// //                           borderRadius: '6px', // Increased from 4px
// //                           fontSize: '0.9rem', // Increased from 0.65rem
// //                           position: 'relative' // CHANGED: Added position relative for the remove button
// //                         }}
// //                       >
// //                         {product.image_url ? (
// //                           <img 
// //                             src={product.image_url} 
// //                             alt={product.title}
// //                             style={{
// //                               width: '28px', // Increased from 18px
// //                               height: '28px', // Increased from 18px
// //                               borderRadius: '4px', // Increased from 3px
// //                               objectFit: 'cover'
// //                             }}
// //                           />
// //                         ) : (
// //                           <div style={{
// //                             width: '28px', // Increased from 18px
// //                             height: '28px', // Increased from 18px
// //                             background: '#3b82f6',
// //                             borderRadius: '4px', // Increased from 3px
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                             color: 'white',
// //                             fontSize: '0.8rem', // Increased from 0.55rem
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
// //                             fontSize: '0.8rem' // Increased from 0.6rem
// //                           }}>
// //                             ${product.price}
// //                           </div>
// //                         </div>
// //                         {/* CHANGED: Added remove product button exactly like in VideoOptionsModal */}
// //                         <button
// //                           onClick={() => handleRemoveProduct(product.shopify_product_id || product.id)}
// //                           style={{
// //                             background: 'transparent',
// //                             border: 'none',
// //                             color: '#ef4444',
// //                             cursor: 'pointer',
// //                             padding: '4px',
// //                             borderRadius: '4px',
// //                             fontSize: '0.7rem',
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                             width: '20px',
// //                             height: '20px'
// //                           }}
// //                           onMouseEnter={(e) => {
// //                             e.target.style.background = '#ef4444';
// //                             e.target.style.color = 'white';
// //                           }}
// //                           onMouseLeave={(e) => {
// //                             e.target.style.background = 'transparent';
// //                             e.target.style.color = '#ef4444';
// //                           }}
// //                           title="Remove product"
// //                         >
// //                           ✕
// //                         </button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div style={{
// //                     textAlign: 'center',
// //                     padding: '1.2rem', // Increased from 0.8rem
// //                     color: isDarkTheme ? '#9ca3af' : '#6b7280',
// //                     fontSize: '0.9rem', // Increased from 0.65rem
// //                     fontStyle: 'italic',
// //                     border: `1px dashed ${currentTheme.border}`,
// //                     borderRadius: '8px', // Increased from 6px
// //                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
// //                   }}>
// //                     No products saved for this video
// //                   </div>
// //                 )}
// //               </div>
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

// //       {/* Products Modal is now controlled by the parent component */}
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
//   selectedProducts, // Use the main selectedProducts from props
//   products, // Use the main products from props
//   onToggleProduct, // Use the main toggle function from props
//   onSaveProducts, // Use the main save function from props
//   productsModalOpened, // Get modal opened state from parent
//   closeProductsModal // Get close function from parent
// }) {
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
//   const [savedProducts, setSavedProducts] = useState([]);
//   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);

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
//       const response = await fetch(`/api/video-products/${showTagProducts.video.id}`);
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

//   // Remove product from video
//   const handleRemoveProduct = async (productId) => {
//     try {
//       const response = await fetch(`/api/video-products/${showTagProducts.video.id}/delete`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ productId }),
//       });
//       const result = await response.json();
//       if (result.success) {
//         // Remove the product from local state immediately
//         setSavedProducts(prev => prev.filter(product =>
//           product.shopify_product_id !== productId && product.id !== productId
//         ));
//         console.log('✅ Product removed successfully');
//       } else {
//         console.error('Failed to remove product:', result.error);
//       }
//     } catch (error) {
//       console.error('Error removing product:', error);
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       handleCloseModal();
//     }
//   };

//   // UPDATED: This is the MOST IMPORTANT function — closes everything correctly and triggers refresh
//   const handleCloseModal = () => {
//     console.log('🔄 Closing TagProductsModal and triggering refresh...');
//     onHide(); // Close this modal
//     // The parent's onHide function (handleHideTagProducts) will call loadMediaFiles() to refresh everything
//   };

//   const handleSubmitProducts = async () => {
//     try {
//       setIsLoadingProducts(true);
     
//       // Use the main onLoadProducts function to ensure consistency
//       if (onLoadProducts) {
//         await onLoadProducts(showTagProducts.video);
//       }
     
//       // ProductsModal will be shown by the parent through showProductsModal state
//       // We don't need to setShowProductsModal here anymore
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
//     // Don't setShowProductsModal here - let the parent handle it
//     if (closeProductsModal) {
//       closeProductsModal();
//     }
//     // Refresh saved products after saving
//     setTimeout(() => {
//       fetchSavedProducts();
//     }, 500);
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
//             padding: '2.5rem',
//             maxWidth: '650px',
//             minWidth: '600px',
//             maxHeight: '100vh',
//             zIndex: 10001,
//             animation: 'scaleIn 0.2s ease-out',
//             overflow: 'hidden',
//             position: 'relative',
//             height: 'auto',
//             minHeight: '350px'
//           }}
//         >
//           {/* CLOSE BUTTON - This is the magic one */}
//           <button
//             onClick={handleCloseModal}  // ← This calls both onHide + triggers refresh in parent
//             style={{
//               position: 'absolute',
//               top: '1.5rem',
//               right: '1.5rem',
//               background: isDarkTheme ? '#374151' : 'white',
//               border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
//               borderRadius: '50%',
//               width: '40px',
//               height: '40px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//               color: isDarkTheme ? '#9ca3af' : '#6b7280',
//               fontSize: '1.2rem',
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

//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1.5rem',
//             height: '100%',
//             overflow: 'hidden'
//           }}>
//             <div style={{
//               display: 'flex',
//               flexDirection: 'column',
//               height: '100%',
//               gap: '1.2rem'
//             }}>
//               <h3 style={{
//                 fontSize: '1.2rem',
//                 fontWeight: '600',
//                 color: currentTheme.text,
//                 margin: 0
//               }}>
//                 Tag Products to Video
//               </h3>
             
//               <button
//                 onClick={handleSubmitProducts}
//                 disabled={isLoadingProducts || productsModalOpened}
//                 style={{
//                   width: '100%',
//                   background: '#10b981',
//                   color: 'white',
//                   border: 'none',
//                   padding: '0.8rem',
//                   borderRadius: '8px',
//                   fontSize: '1rem',
//                   fontWeight: '500',
//                   cursor: (isLoadingProducts || productsModalOpened) ? 'not-allowed' : 'pointer',
//                   transition: 'background-color 0.2s',
//                   opacity: (isLoadingProducts || productsModalOpened) ? 0.6 : 1
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isLoadingProducts && !productsModalOpened) {
//                     e.target.style.background = '#059669';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isLoadingProducts && !productsModalOpened) {
//                     e.target.style.background = '#10b981';
//                   }
//                 }}
//               >
//                 {isLoadingProducts ? 'Loading Products...' : productsModalOpened ? 'Opening...' : 'Add Products'}
//               </button>

//               {/* Saved Products Section */}
//               <div style={{
//                 flex: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 overflow: 'hidden'
//               }}>
//                 <div style={{
//                   fontSize: '1rem',
//                   fontWeight: '600',
//                   color: currentTheme.text,
//                   marginBottom: '0.8rem'
//                 }}>
//                   Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
//                 </div>
               
//                 {isLoadingSavedProducts ? (
//                   <div style={{
//                     textAlign: 'center',
//                     padding: '1.2rem',
//                     color: currentTheme.text,
//                     fontSize: '0.9rem',
//                     border: `1px solid ${currentTheme.border}`,
//                     borderRadius: '8px',
//                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
//                   }}>
//                     Loading saved products...
//                   </div>
//                 ) : savedProducts.length > 0 ? (
//                   <div style={{
//                     flex: 1,
//                     overflowY: 'auto',
//                     border: `1px solid ${currentTheme.border}`,
//                     borderRadius: '8px',
//                     padding: '0.8rem',
//                     background: isDarkTheme ? '#1f2937' : '#f8fafc',
//                     maxHeight: '280px'
//                   }}>
//                     {savedProducts.map((product) => (
//                       <div
//                         key={product.video_product_id || product.id}
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '0.8rem',
//                           padding: '0.8rem',
//                           marginBottom: '0.4rem',
//                           background: isDarkTheme ? '#374151' : '#ffffff',
//                           borderRadius: '6px',
//                           fontSize: '0.9rem',
//                           position: 'relative'
//                         }}
//                       >
//                         {product.image_url ? (
//                           <img
//                             src={product.image_url}
//                             alt={product.title}
//                             style={{
//                               width: '28px',
//                               height: '28px',
//                               borderRadius: '4px',
//                               objectFit: 'cover'
//                             }}
//                           />
//                         ) : (
//                           <div style={{
//                             width: '28px',
//                             height: '28px',
//                             background: '#3b82f6',
//                             borderRadius: '4px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: 'white',
//                             fontSize: '0.8rem',
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
//                             fontSize: '0.8rem'
//                           }}>
//                             ${product.price}
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => handleRemoveProduct(product.shopify_product_id || product.id)}
//                           style={{
//                             background: 'transparent',
//                             border: 'none',
//                             color: '#ef4444',
//                             cursor: 'pointer',
//                             padding: '4px',
//                             borderRadius: '4px',
//                             fontSize: '0.7rem',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             width: '20px',
//                             height: '20px'
//                           }}
//                           onMouseEnter={(e) => {
//                             e.target.style.background = '#ef4444';
//                             e.target.style.color = 'white';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.background = 'transparent';
//                             e.target.style.color = '#ef4444';
//                           }}
//                           title="Remove product"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div style={{
//                     textAlign: 'center',
//                     padding: '1.2rem',
//                     color: isDarkTheme ? '#9ca3af' : '#6b7280',
//                     fontSize: '0.9rem',
//                     fontStyle: 'italic',
//                     border: `1px dashed ${currentTheme.border}`,
//                     borderRadius: '8px',
//                     background: isDarkTheme ? '#1f2937' : '#f8fafc'
//                   }}>
//                     No products saved for this video
//                   </div>
//                 )}
//               </div>
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
  selectedProducts, // Use the main selectedProducts from props
  products, // Use the main products from props
  onToggleProduct, // Use the main toggle function from props
  onSaveProducts, // Use the main save function from props
  productsModalOpened, // Get modal opened state from parent
  closeProductsModal // Get close function from parent
}) {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);

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
      const response = await fetch(`/api/video-products/${showTagProducts.video.id}`);
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

  // Remove product from video
  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`/api/video-products/${showTagProducts.video.id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      const result = await response.json();
      if (result.success) {
        // Remove the product from local state immediately
        setSavedProducts(prev => prev.filter(product =>
          product.shopify_product_id !== productId && product.id !== productId
        ));
        console.log('✅ Product removed successfully');
      } else {
        console.error('Failed to remove product:', result.error);
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // UPDATED: This function closes the modal WITHOUT refreshing entire page
  const handleCloseModal = () => {
    console.log('🔄 Closing TagProductsModal WITHOUT refreshing entire page...');
    onHide(); // Close this modal
    // The parent's onHide function will NOT call loadMediaFiles() anymore
    // Only the specific VideoPlayer component will refresh its own products
  };

  const handleSubmitProducts = async () => {
    try {
      setIsLoadingProducts(true);
     
      // Use the main onLoadProducts function to ensure consistency
      if (onLoadProducts) {
        await onLoadProducts(showTagProducts.video);
      }
     
      // ProductsModal will be shown by the parent through showProductsModal state
      // We don't need to setShowProductsModal here anymore
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
    // Don't setShowProductsModal here - let the parent handle it
    if (closeProductsModal) {
      closeProductsModal();
    }
    // Refresh saved products after saving
    setTimeout(() => {
      fetchSavedProducts();
    }, 500);
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
            padding: '2.5rem',
            maxWidth: '650px',
            minWidth: '600px',
            maxHeight: '100vh',
            zIndex: 10001,
            animation: 'scaleIn 0.2s ease-out',
            overflow: 'hidden',
            position: 'relative',
            height: 'auto',
            minHeight: '350px'
          }}
        >
          {/* CLOSE BUTTON - This calls handleCloseModal which doesn't refresh page */}
          <button
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: isDarkTheme ? '#374151' : 'white',
              border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isDarkTheme ? '#9ca3af' : '#6b7280',
              fontSize: '1.2rem',
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

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            height: '100%',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              gap: '1.2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: currentTheme.text,
                margin: 0
              }}>
                Tag Products to Video
              </h3>
             
              <button
                onClick={handleSubmitProducts}
                disabled={isLoadingProducts || productsModalOpened}
                style={{
                  width: '100%',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: (isLoadingProducts || productsModalOpened) ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                  opacity: (isLoadingProducts || productsModalOpened) ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoadingProducts && !productsModalOpened) {
                    e.target.style.background = '#059669';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoadingProducts && !productsModalOpened) {
                    e.target.style.background = '#10b981';
                  }
                }}
              >
                {isLoadingProducts ? 'Loading Products...' : productsModalOpened ? 'Opening...' : 'Add Products'}
              </button>

              {/* Saved Products Section */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: currentTheme.text,
                  marginBottom: '0.8rem'
                }}>
                  Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
                </div>
               
                {isLoadingSavedProducts ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '1.2rem',
                    color: currentTheme.text,
                    fontSize: '0.9rem',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '8px',
                    background: isDarkTheme ? '#1f2937' : '#f8fafc'
                  }}>
                    Loading saved products...
                  </div>
                ) : savedProducts.length > 0 ? (
                  <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '8px',
                    padding: '0.8rem',
                    background: isDarkTheme ? '#1f2937' : '#f8fafc',
                    maxHeight: '280px'
                  }}>
                    {savedProducts.map((product) => (
                      <div
                        key={product.video_product_id || product.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.8rem',
                          padding: '0.8rem',
                          marginBottom: '0.4rem',
                          background: isDarkTheme ? '#374151' : '#ffffff',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          position: 'relative'
                        }}
                      >
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.title}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '4px',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '28px',
                            height: '28px',
                            background: '#3b82f6',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.8rem',
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
                            fontSize: '0.8rem'
                          }}>
                            ${product.price}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveProduct(product.shopify_product_id || product.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20px',
                            height: '20px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#ef4444';
                            e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#ef4444';
                          }}
                          title="Remove product"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '1.2rem',
                    color: isDarkTheme ? '#9ca3af' : '#6b7280',
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                    border: `1px dashed ${currentTheme.border}`,
                    borderRadius: '8px',
                    background: isDarkTheme ? '#1f2937' : '#f8fafc'
                  }}>
                    No products saved for this video
                  </div>
                )}
              </div>
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
    </>
  );
}