// // // // // // // // // components/videogallerycomponents/VideoOptionsModal.jsx
// // // // // // // // import { useState, useEffect, useRef } from "react";
// // // // // // // // import ProductsModal from "./ProductsModal";
// // // // // // // // import VideoPlayerWithHover from "./VideoPlayerWithHover";

// // // // // // // // export default function VideoOptionsModal({
// // // // // // // //   showVideoOptions,
// // // // // // // //   onHide,
// // // // // // // //   onCopyUrl,
// // // // // // // //   onDownload,
// // // // // // // //   onLoadProducts,
// // // // // // // //   onDelete,
// // // // // // // //   isDarkTheme,
// // // // // // // //   selectedProducts,
// // // // // // // //   products,
// // // // // // // //   onToggleProduct,
// // // // // // // //   onSaveProducts,
// // // // // // // //   showVideoPlayerModal,
// // // // // // // //   productsModalOpened, // NEW: Get modal opened state
// // // // // // // //   closeProductsModal // NEW: Get close function
// // // // // // // // }) {
// // // // // // // //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// // // // // // // //   const [showProductsModal, setShowProductsModal] = useState(false);
// // // // // // // //   const [savedProducts, setSavedProducts] = useState([]);
// // // // // // // //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
// // // // // // // //   const productsModalOpenedRef = useRef(false);

// // // // // // // //   // Fetch saved products when modal opens or video changes - FIXED: Add refresh trigger
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (showVideoOptions.show && showVideoOptions.video?.id) {
// // // // // // // //       fetchSavedProducts();
// // // // // // // //       productsModalOpenedRef.current = false;
// // // // // // // //     }
// // // // // // // //   }, [showVideoOptions.show, showVideoOptions.video?.id, showProductsModal]); // NEW: Added showProductsModal as dependency

// // // // // // // //   // FIXED: Use correct API endpoint
// // // // // // // //   const fetchSavedProducts = async () => {
// // // // // // // //     try {
// // // // // // // //       setIsLoadingSavedProducts(true);
// // // // // // // //       const response = await fetch(`/api/video-products/${showVideoOptions.video.id}`);
// // // // // // // //       const result = await response.json();

// // // // // // // //       if (result.success) {
// // // // // // // //         setSavedProducts(result.products);
// // // // // // // //         console.log('✅ Loaded saved products for display:', result.products.length);
// // // // // // // //       } else {
// // // // // // // //         console.error('Failed to fetch saved products:', result.error);
// // // // // // // //         setSavedProducts([]);
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error fetching saved products:', error);
// // // // // // // //       setSavedProducts([]);
// // // // // // // //     } finally {
// // // // // // // //       setIsLoadingSavedProducts(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleBackdropClick = (e) => {
// // // // // // // //     if (e.target === e.currentTarget) {
// // // // // // // //       onHide();
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleOptionClick = (action) => {
// // // // // // // //     action();
// // // // // // // //     onHide();
// // // // // // // //   };

// // // // // // // //   const handleVideoClick = () => {
// // // // // // // //     if (showVideoPlayerModal && showVideoOptions.video) {
// // // // // // // //       showVideoPlayerModal(showVideoOptions.video);
// // // // // // // //       onHide();
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // FIXED: Handle modal state properly
// // // // // // // //   const handleAddProducts = async () => {
// // // // // // // //     if (productsModalOpenedRef.current || isLoadingProducts || productsModalOpened) {
// // // // // // // //       console.log('⚠️ Modal already opening or opened, skipping');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     productsModalOpenedRef.current = true;
// // // // // // // //     setIsLoadingProducts(true);

// // // // // // // //     try {
// // // // // // // //       // This will load products AND set the modal to show
// // // // // // // //       if (onLoadProducts) {
// // // // // // // //         await onLoadProducts(showVideoOptions.video);
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error loading products:', error);
// // // // // // // //       productsModalOpenedRef.current = false;
// // // // // // // //     } finally {
// // // // // // // //       setIsLoadingProducts(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSaveProducts = async () => {
// // // // // // // //     if (onSaveProducts) {
// // // // // // // //       await onSaveProducts();
// // // // // // // //     }
// // // // // // // //     // Don't setShowProductsModal here - let the parent handle it
// // // // // // // //     productsModalOpenedRef.current = false;
// // // // // // // //   };

// // // // // // // //   // FIXED: Handle modal close properly
// // // // // // // //   const handleHideProductsModal = () => {
// // // // // // // //     if (closeProductsModal) {
// // // // // // // //       closeProductsModal();
// // // // // // // //     }
// // // // // // // //     productsModalOpenedRef.current = false;
// // // // // // // //     // Refresh saved products when the products modal closes
// // // // // // // //     setTimeout(() => {
// // // // // // // //       fetchSavedProducts();
// // // // // // // //     }, 300);
// // // // // // // //   };

// // // // // // // //   // Get the selected products
// // // // // // // //   const displayProducts = selectedProducts || new Set();

// // // // // // // //   // Early return should be AFTER all hooks
// // // // // // // //   if (!showVideoOptions.show) return null;

// // // // // // // //   const themeStyles = {
// // // // // // // //     light: {
// // // // // // // //       background: '#ffffff',
// // // // // // // //       text: '#1f2937',
// // // // // // // //       border: '#e5e7eb',
// // // // // // // //       shadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
// // // // // // // //       hoverBackground: '#f3f4f6',
// // // // // // // //       sectionBackground: '#f8fafc'
// // // // // // // //     },
// // // // // // // //     dark: {
// // // // // // // //       background: '#374151',
// // // // // // // //       text: '#f9fafb',
// // // // // // // //       border: '#4b5563',
// // // // // // // //       shadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
// // // // // // // //       hoverBackground: '#4b5563',
// // // // // // // //       sectionBackground: '#4b5563'
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // // // // // // //   // Get the correct video URL
// // // // // // // //   const videoUrl = showVideoOptions.video?.videoUrl || showVideoOptions.video?.shopify_file_url;

// // // // // // // //   // FIXED: Determine button text based on multiple states
// // // // // // // //   const getAddProductsButtonText = () => {
// // // // // // // //     if (isLoadingProducts) return 'Loading Products...';
// // // // // // // //     if (productsModalOpenedRef.current || productsModalOpened) return 'Opening...';
// // // // // // // //     return 'Add Products';
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <>
// // // // // // // //       <div
// // // // // // // //         style={{
// // // // // // // //           position: 'fixed',
// // // // // // // //           top: 0,
// // // // // // // //           left: 0,
// // // // // // // //           right: 0,
// // // // // // // //           bottom: 0,
// // // // // // // //           zIndex: 10000,
// // // // // // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // // // // // //           display: 'flex',
// // // // // // // //           justifyContent: 'center',
// // // // // // // //           alignItems: 'center'
// // // // // // // //         }}
// // // // // // // //         onClick={handleBackdropClick}
// // // // // // // //       >
// // // // // // // //         <div
// // // // // // // //           style={{
// // // // // // // //             background: currentTheme.background,
// // // // // // // //             borderRadius: '12px',
// // // // // // // //             border: `1px solid ${currentTheme.border}`,
// // // // // // // //             boxShadow: currentTheme.shadow,
// // // // // // // //             padding: '2.5rem',
// // // // // // // //             maxWidth: '800px',
// // // // // // // //             minWidth: '700px',
// // // // // // // //             maxHeight: 'calc(100vh - 4rem)',
// // // // // // // //             height: 'auto',
// // // // // // // //             minHeight: '500px',
// // // // // // // //             zIndex: 10001,
// // // // // // // //             animation: 'scaleIn 0.2s ease-out',
// // // // // // // //             display: 'flex',
// // // // // // // //             flexDirection: 'row',
// // // // // // // //             justifyContent: 'space-between',
// // // // // // // //             alignItems: 'flex-start',
// // // // // // // //             gap: '2.5rem',
// // // // // // // //             overflow: 'hidden',
// // // // // // // //             position: 'relative'
// // // // // // // //           }}
// // // // // // // //         >
// // // // // // // //           {/* Close Button */}
// // // // // // // //           <button
// // // // // // // //             onClick={onHide}
// // // // // // // //             style={{
// // // // // // // //               position: 'absolute',
// // // // // // // //               top: '1.5rem',
// // // // // // // //               right: '1.5rem',
// // // // // // // //               background: isDarkTheme ? '#374151' : 'white',
// // // // // // // //               border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
// // // // // // // //               borderRadius: '50%',
// // // // // // // //               width: '40px',
// // // // // // // //               height: '40px',
// // // // // // // //               display: 'flex',
// // // // // // // //               alignItems: 'center',
// // // // // // // //               justifyContent: 'center',
// // // // // // // //               cursor: 'pointer',
// // // // // // // //               color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // // // // // // //               fontSize: '1.3rem',
// // // // // // // //               fontWeight: 'bold',
// // // // // // // //               zIndex: 10002,
// // // // // // // //               transition: 'all 0.3s ease'
// // // // // // // //             }}
// // // // // // // //             onMouseEnter={(e) => {
// // // // // // // //               e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
// // // // // // // //               e.target.style.color = isDarkTheme ? '#f9fafb' : '#1f2937';
// // // // // // // //             }}
// // // // // // // //             onMouseLeave={(e) => {
// // // // // // // //               e.target.style.background = isDarkTheme ? '#374151' : 'white';
// // // // // // // //               e.target.style.color = isDarkTheme ? '#9ca3af' : '#6b7280';
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             ✕
// // // // // // // //           </button>

// // // // // // // //           {/* Left Column - Video Player */}
// // // // // // // //           <div style={{
// // // // // // // //             flex: 1,
// // // // // // // //             minWidth: '220px',
// // // // // // // //             display: 'flex',
// // // // // // // //             flexDirection: 'row',
// // // // // // // //             gap: '2rem',
// // // // // // // //             position: 'relative'
// // // // // // // //           }}>
// // // // // // // //             {/* Vertical Line Separator */}
// // // // // // // //             <div
// // // // // // // //               style={{
// // // // // // // //                 position: 'absolute',
// // // // // // // //                 right: '-1.25rem',
// // // // // // // //                 top: '0',
// // // // // // // //                 bottom: '0',
// // // // // // // //                 width: '1px',
// // // // // // // //                 background: isDarkTheme ? '#4b5563' : '#e5e7eb',
// // // // // // // //                 zIndex: 1
// // // // // // // //               }}
// // // // // // // //             />

// // // // // // // //             {/* Video Player Section */}
// // // // // // // //             <div style={{ flex: 1 }}>
// // // // // // // //               <h3 style={{
// // // // // // // //                 fontSize: '1.1rem',
// // // // // // // //                 fontWeight: '600',
// // // // // // // //                 color: currentTheme.text,
// // // // // // // //                 margin: '0 0 1.2rem 0'
// // // // // // // //               }}>
// // // // // // // //                 Selected Video
// // // // // // // //               </h3>

// // // // // // // //               {/* Video Player with Hover - Shows the clicked video */}
// // // // // // // //               {videoUrl ? (
// // // // // // // //                 <div style={{
// // // // // // // //                   width: '100%',
// // // // // // // //                   height: '250px',
// // // // // // // //                   display: 'flex',
// // // // // // // //                   justifyContent: 'center',
// // // // // // // //                   alignItems: 'center',
// // // // // // // //                   background: isDarkTheme ? '#1f2937' : '#f8fafc',
// // // // // // // //                   borderRadius: '10px',
// // // // // // // //                   overflow: 'hidden'
// // // // // // // //                 }}>
// // // // // // // //                   <VideoPlayerWithHover
// // // // // // // //                     videoUrl={videoUrl}
// // // // // // // //                     thumbnailUrl={showVideoOptions.video?.thumbnail_url}
// // // // // // // //                     title={showVideoOptions.video?.title}
// // // // // // // //                     onVideoClick={handleVideoClick}
// // // // // // // //                     isDarkTheme={isDarkTheme}
// // // // // // // //                     height="250px"
// // // // // // // //                     width="100%"
// // // // // // // //                     objectFit="contain"
// // // // // // // //                   />
// // // // // // // //                 </div>
// // // // // // // //               ) : (
// // // // // // // //                 <div style={{
// // // // // // // //                   height: '200px',
// // // // // // // //                   background: isDarkTheme ? '#374151' : '#f3f4f6',
// // // // // // // //                   borderRadius: '10px',
// // // // // // // //                   display: 'flex',
// // // // // // // //                   alignItems: 'center',
// // // // // // // //                   justifyContent: 'center',
// // // // // // // //                   color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // // // // // // //                   flexDirection: 'column',
// // // // // // // //                   gap: '0.8rem'
// // // // // // // //                 }}>
// // // // // // // //                   <div style={{ fontSize: '1.8rem' }}>🎬</div>
// // // // // // // //                   <div style={{ fontSize: '1rem' }}>Video not available</div>
// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </div>

// // // // // // // //             {/* Video Actions Section */}
// // // // // // // //             <div style={{
// // // // // // // //               marginTop: "50px",
// // // // // // // //               display: 'flex',
// // // // // // // //               flexDirection: 'column',
// // // // // // // //               justifyContent: 'center',
// // // // // // // //               alignItems: 'center',
// // // // // // // //               gap: '15px'
// // // // // // // //             }}>
// // // // // // // //               <button
// // // // // // // //                 onClick={() => handleOptionClick(() => onCopyUrl(showVideoOptions.video.shopify_file_url))}
// // // // // // // //                 title="Copy Video URL"
// // // // // // // //                 style={{
// // // // // // // //                   background: 'transparent',
// // // // // // // //                   border: 'none',
// // // // // // // //                   color: currentTheme.text,
// // // // // // // //                   borderRadius: '10px',
// // // // // // // //                   fontSize: '1.5rem',
// // // // // // // //                   fontWeight: '500',
// // // // // // // //                   cursor: 'pointer',
// // // // // // // //                   transition: 'all 0.2s',
// // // // // // // //                   display: 'flex',
// // // // // // // //                   alignItems: 'center',
// // // // // // // //                   justifyContent: 'center',
// // // // // // // //                   width: '45px',
// // // // // // // //                   height: '45px',
// // // // // // // //                   opacity: 0.8
// // // // // // // //                 }}
// // // // // // // //                 onMouseEnter={(e) => {
// // // // // // // //                   e.target.style.transform = 'scale(1.1)';
// // // // // // // //                   e.target.style.opacity = '1';
// // // // // // // //                 }}
// // // // // // // //                 onMouseLeave={(e) => {
// // // // // // // //                   e.target.style.transform = 'scale(1)';
// // // // // // // //                   e.target.style.opacity = '0.8';
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Copy Link" style={{ width: '22px', height: '22px', filter: isDarkTheme ? 'invert(1)' : 'none' }} />
// // // // // // // //               </button>

// // // // // // // //               <button
// // // // // // // //                 onClick={() => handleOptionClick(() => onDownload(showVideoOptions.video))}
// // // // // // // //                 title="Download Video"
// // // // // // // //                 style={{
// // // // // // // //                   background: 'transparent',
// // // // // // // //                   border: 'none',
// // // // // // // //                   color: currentTheme.text,
// // // // // // // //                   borderRadius: '10px',
// // // // // // // //                   fontSize: '1.5rem',
// // // // // // // //                   fontWeight: '500',
// // // // // // // //                   cursor: 'pointer',
// // // // // // // //                   transition: 'all 0.2s',
// // // // // // // //                   display: 'flex',
// // // // // // // //                   alignItems: 'center',
// // // // // // // //                   justifyContent: 'center',
// // // // // // // //                   width: '45px',
// // // // // // // //                   height: '45px',
// // // // // // // //                   opacity: 0.8
// // // // // // // //                 }}
// // // // // // // //                 onMouseEnter={(e) => {
// // // // // // // //                   e.target.style.transform = 'scale(1.1)';
// // // // // // // //                   e.target.style.opacity = '1';
// // // // // // // //                 }}
// // // // // // // //                 onMouseLeave={(e) => {
// // // // // // // //                   e.target.style.transform = 'scale(1)';
// // // // // // // //                   e.target.style.opacity = '0.8';
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <img src="https://cdn-icons-png.flaticon.com/512/2991/2991937.png" alt="Download" style={{ width: '22px', height: '22px', filter: isDarkTheme ? 'invert(1)' : 'none' }} />
// // // // // // // //               </button>

// // // // // // // //               <button
// // // // // // // //                 onClick={() => handleOptionClick(() => onDelete(showVideoOptions.video.id, showVideoOptions.video.title))}
// // // // // // // //                 title="Delete Video"
// // // // // // // //                 style={{
// // // // // // // //                   background: 'transparent',
// // // // // // // //                   border: 'none',
// // // // // // // //                   color: '#ef4444',
// // // // // // // //                   borderRadius: '10px',
// // // // // // // //                   fontSize: '1.5rem',
// // // // // // // //                   fontWeight: '500',
// // // // // // // //                   cursor: 'pointer',
// // // // // // // //                   transition: 'all 0.2s',
// // // // // // // //                   display: 'flex',
// // // // // // // //                   alignItems: 'center',
// // // // // // // //                   justifyContent: 'center',
// // // // // // // //                   width: '45px',
// // // // // // // //                   height: '45px',
// // // // // // // //                   opacity: 0.8
// // // // // // // //                 }}
// // // // // // // //                 onMouseEnter={(e) => {
// // // // // // // //                   e.target.style.transform = 'scale(1.1)';
// // // // // // // //                   e.target.style.opacity = '1';
// // // // // // // //                 }}
// // // // // // // //                 onMouseLeave={(e) => {
// // // // // // // //                   e.target.style.transform = 'scale(1)';
// // // // // // // //                   e.target.style.opacity = '0.8';
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <img src="" alt="Delete" style={{ width: '22px', height: '22px', filter: 'invert(0.5) sepia(1) saturate(5) hue-rotate(330deg)' }} />
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* Right Column - Products Section */}
// // // // // // // //           <div style={{
// // // // // // // //             flex: 1,
// // // // // // // //             minWidth: '300px',
// // // // // // // //             display: 'flex',
// // // // // // // //             flexDirection: 'column',
// // // // // // // //             gap: '1.8rem',
// // // // // // // //             height: '100%',
// // // // // // // //             overflow: 'hidden'
// // // // // // // //           }}>
// // // // // // // //             {/* Products Section */}
// // // // // // // //             <div style={{
// // // // // // // //               display: 'flex',
// // // // // // // //               flexDirection: 'column',
// // // // // // // //               height: '100%',
// // // // // // // //               gap: '1.2rem'
// // // // // // // //             }}>
// // // // // // // //               <h3 style={{
// // // // // // // //                 fontSize: '1.1rem',
// // // // // // // //                 fontWeight: '600',
// // // // // // // //                 color: currentTheme.text,
// // // // // // // //                 margin: 0
// // // // // // // //               }}>
// // // // // // // //                 Product Management
// // // // // // // //               </h3>

// // // // // // // //               <button
// // // // // // // //                 onClick={handleAddProducts}
// // // // // // // //                 disabled={isLoadingProducts || productsModalOpenedRef.current || productsModalOpened}
// // // // // // // //                 style={{
// // // // // // // //                   width: '100%',
// // // // // // // //                   background: '#10b981',
// // // // // // // //                   color: 'white',
// // // // // // // //                   border: 'none',
// // // // // // // //                   padding: '0.8rem',
// // // // // // // //                   borderRadius: '10px',
// // // // // // // //                   fontSize: '0.9rem',
// // // // // // // //                   fontWeight: '500',
// // // // // // // //                   cursor: (isLoadingProducts || productsModalOpenedRef.current || productsModalOpened) ? 'not-allowed' : 'pointer',
// // // // // // // //                   transition: 'background-color 0.2s',
// // // // // // // //                   opacity: (isLoadingProducts || productsModalOpenedRef.current || productsModalOpened) ? 0.6 : 1,
// // // // // // // //                   height: '48px'
// // // // // // // //                 }}
// // // // // // // //                 onMouseEnter={(e) => {
// // // // // // // //                   if (!isLoadingProducts && !productsModalOpenedRef.current && !productsModalOpened) {
// // // // // // // //                     e.target.style.background = '#059669';
// // // // // // // //                   }
// // // // // // // //                 }}
// // // // // // // //                 onMouseLeave={(e) => {
// // // // // // // //                   if (!isLoadingProducts && !productsModalOpenedRef.current && !productsModalOpened) {
// // // // // // // //                     e.target.style.background = '#10b981';
// // // // // // // //                   }
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 {getAddProductsButtonText()}
// // // // // // // //               </button>

// // // // // // // //               {/* Saved Products Section */}
// // // // // // // //               <div style={{
// // // // // // // //                 flex: 1,
// // // // // // // //                 display: 'flex',
// // // // // // // //                 flexDirection: 'column',
// // // // // // // //                 overflow: 'hidden'
// // // // // // // //               }}>
// // // // // // // //                 <div style={{
// // // // // // // //                   fontSize: '0.9rem',
// // // // // // // //                   fontWeight: '600',
// // // // // // // //                   color: currentTheme.text,
// // // // // // // //                   marginBottom: '0.8rem'
// // // // // // // //                 }}>
// // // // // // // //                   Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
// // // // // // // //                 </div>

// // // // // // // //                 {isLoadingSavedProducts ? (
// // // // // // // //                   <div style={{
// // // // // // // //                     textAlign: 'center',
// // // // // // // //                     padding: '1.2rem',
// // // // // // // //                     color: currentTheme.text,
// // // // // // // //                     fontSize: '0.85rem',
// // // // // // // //                     border: `1px solid ${currentTheme.border}`,
// // // // // // // //                     borderRadius: '10px',
// // // // // // // //                     background: isDarkTheme ? '#1f2937' : '#f8fafc',
// // // // // // // //                     height: '70px',
// // // // // // // //                     display: 'flex',
// // // // // // // //                     alignItems: 'center',
// // // // // // // //                     justifyContent: 'center'
// // // // // // // //                   }}>
// // // // // // // //                     Loading saved products...
// // // // // // // //                   </div>
// // // // // // // //                 ) : savedProducts.length > 0 ? (
// // // // // // // //                   <div style={{
// // // // // // // //                     flex: 1,
// // // // // // // //                     overflowY: 'auto',
// // // // // // // //                     border: `1px solid ${currentTheme.border}`,
// // // // // // // //                     borderRadius: '10px',
// // // // // // // //                     padding: '0.8rem',
// // // // // // // //                     background: isDarkTheme ? '#1f2937' : '#f8fafc',
// // // // // // // //                     maxHeight: '250px'
// // // // // // // //                   }}>
// // // // // // // //                     {savedProducts.map((product) => (
// // // // // // // //                       <div
// // // // // // // //                         key={product.video_product_id || product.id}
// // // // // // // //                         style={{
// // // // // // // //                           display: 'flex',
// // // // // // // //                           alignItems: 'center',
// // // // // // // //                           gap: '0.8rem',
// // // // // // // //                           padding: '0.8rem',
// // // // // // // //                           marginBottom: '0.5rem',
// // // // // // // //                           background: isDarkTheme ? '#374151' : '#ffffff',
// // // // // // // //                           borderRadius: '8px',
// // // // // // // //                           fontSize: '0.8rem'
// // // // // // // //                         }}
// // // // // // // //                       >
// // // // // // // //                         {product.image_url ? (
// // // // // // // //                           <img
// // // // // // // //                             src={product.image_url}
// // // // // // // //                             alt={product.title}
// // // // // // // //                             style={{
// // // // // // // //                               width: '28px',
// // // // // // // //                               height: '28px',
// // // // // // // //                               borderRadius: '6px',
// // // // // // // //                               objectFit: 'cover'
// // // // // // // //                             }}
// // // // // // // //                           />
// // // // // // // //                         ) : (
// // // // // // // //                           <div style={{
// // // // // // // //                             width: '28px',
// // // // // // // //                             height: '28px',
// // // // // // // //                             background: '#3b82f6',
// // // // // // // //                             borderRadius: '6px',
// // // // // // // //                             display: 'flex',
// // // // // // // //                             alignItems: 'center',
// // // // // // // //                             justifyContent: 'center',
// // // // // // // //                             color: 'white',
// // // // // // // //                             fontSize: '0.75rem',
// // // // // // // //                             fontWeight: 'bold'
// // // // // // // //                           }}>
// // // // // // // //                             P
// // // // // // // //                           </div>
// // // // // // // //                         )}
// // // // // // // //                         <div style={{ flex: 1, minWidth: 0 }}>
// // // // // // // //                           <div style={{
// // // // // // // //                             color: currentTheme.text,
// // // // // // // //                             fontWeight: '500',
// // // // // // // //                             whiteSpace: 'nowrap',
// // // // // // // //                             overflow: 'hidden',
// // // // // // // //                             textOverflow: 'ellipsis'
// // // // // // // //                           }}>
// // // // // // // //                             {product.title}
// // // // // // // //                           </div>
// // // // // // // //                           <div style={{
// // // // // // // //                             color: '#10b981',
// // // // // // // //                             fontSize: '0.75rem'
// // // // // // // //                           }}>
// // // // // // // //                             ${product.price}
// // // // // // // //                           </div>
// // // // // // // //                         </div>
// // // // // // // //                       </div>
// // // // // // // //                     ))}
// // // // // // // //                   </div>
// // // // // // // //                 ) : (
// // // // // // // //                   <div style={{
// // // // // // // //                     textAlign: 'center',
// // // // // // // //                     padding: '1.2rem',
// // // // // // // //                     color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // // // // // // //                     fontSize: '0.85rem',
// // // // // // // //                     fontStyle: 'italic',
// // // // // // // //                     border: `1px dashed ${currentTheme.border}`,
// // // // // // // //                     borderRadius: '10px',
// // // // // // // //                     background: isDarkTheme ? '#1f2937' : '#f8fafc',
// // // // // // // //                     height: '70px',
// // // // // // // //                     display: 'flex',
// // // // // // // //                     alignItems: 'center',
// // // // // // // //                     justifyContent: 'center'
// // // // // // // //                   }}>
// // // // // // // //                     No products saved for this video
// // // // // // // //                   </div>
// // // // // // // //                 )}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           <style jsx>{`
// // // // // // // //             @keyframes scaleIn {
// // // // // // // //               from {
// // // // // // // //                 opacity: 0;
// // // // // // // //                 transform: scale(0.95) translateY(-10px);
// // // // // // // //               }
// // // // // // // //               to {
// // // // // // // //                 opacity: 1;
// // // // // // // //                 transform: scale(1) translateY(0);
// // // // // // // //               }
// // // // // // // //             }
// // // // // // // //           `}</style>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* ProductsModal is now controlled by the parent component through showProductsModal state */}
// // // // // // // //     </>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // components/videogallerycomponents/VideoOptionsModal.jsx
// // // // // // // import { useState, useEffect, useRef } from "react";
// // // // // // // import ProductsModal from "./ProductsModal";
// // // // // // // import VideoPlayerWithHover from "./VideoPlayerWithHover";

// // // // // // // export default function VideoOptionsModal({
// // // // // // //   showVideoOptions,
// // // // // // //   onHide,
// // // // // // //   onCopyUrl,
// // // // // // //   onDownload,
// // // // // // //   onLoadProducts,
// // // // // // //   onDelete,
// // // // // // //   isDarkTheme,
// // // // // // //   selectedProducts,
// // // // // // //   products,
// // // // // // //   onToggleProduct,
// // // // // // //   onSaveProducts,
// // // // // // //   showVideoPlayerModal,
// // // // // // //   productsModalOpened,
// // // // // // //   closeProductsModal,
// // // // // // // }) {
// // // // // // //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// // // // // // //   const [savedProducts, setSavedProducts] = useState([]);
// // // // // // //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);

// // // // // // //   // Fetch saved products when modal opens or video changes
// // // // // // //   useEffect(() => {
// // // // // // //     if (showVideoOptions.show && showVideoOptions.video?.id) {
// // // // // // //       fetchSavedProducts();
// // // // // // //     }
// // // // // // //   }, [showVideoOptions.show, showVideoOptions.video?.id]);

// // // // // // //   // FIX: Auto-refresh when productsModalOpened becomes false (modal closes)
// // // // // // //   useEffect(() => {
// // // // // // //     if (
// // // // // // //       !productsModalOpened &&
// // // // // // //       showVideoOptions.show &&
// // // // // // //       showVideoOptions.video?.id
// // // // // // //     ) {
// // // // // // //       fetchSavedProducts();
// // // // // // //     }
// // // // // // //   }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);

// // // // // // //   const fetchSavedProducts = async () => {
// // // // // // //     try {
// // // // // // //       setIsLoadingSavedProducts(true);
// // // // // // //       const response = await fetch(
// // // // // // //         `/api/video-products/${showVideoOptions.video.id}`,
// // // // // // //       );
// // // // // // //       const result = await response.json();

// // // // // // //       if (result.success) {
// // // // // // //         setSavedProducts(result.products);
// // // // // // //         console.log(
// // // // // // //           "✅ Loaded saved products for display:",
// // // // // // //           result.products.length,
// // // // // // //         );
// // // // // // //       } else {
// // // // // // //         console.error("Failed to fetch saved products:", result.error);
// // // // // // //         setSavedProducts([]);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error fetching saved products:", error);
// // // // // // //       setSavedProducts([]);
// // // // // // //     } finally {
// // // // // // //       setIsLoadingSavedProducts(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleBackdropClick = (e) => {
// // // // // // //     if (e.target === e.currentTarget) {
// // // // // // //       onHide();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleOptionClick = (action) => {
// // // // // // //     action();
// // // // // // //     onHide();
// // // // // // //   };

// // // // // // //   const handleVideoClick = () => {
// // // // // // //     if (showVideoPlayerModal && showVideoOptions.video) {
// // // // // // //       showVideoPlayerModal(showVideoOptions.video);
// // // // // // //       onHide();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // FIXED: Handle modal state properly
// // // // // // //   const handleAddProducts = async () => {
// // // // // // //     if (isLoadingProducts || productsModalOpened) {
// // // // // // //       console.log("⚠️ Modal already opening or opened, skipping");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setIsLoadingProducts(true);

// // // // // // //     try {
// // // // // // //       // This will load products AND set the modal to show
// // // // // // //       if (onLoadProducts) {
// // // // // // //         await onLoadProducts(showVideoOptions.video);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error loading products:", error);
// // // // // // //     } finally {
// // // // // // //       setIsLoadingProducts(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSaveProducts = async () => {
// // // // // // //     if (onSaveProducts) {
// // // // // // //       await onSaveProducts();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // NEW: Function to remove a product
// // // // // // //   const handleRemoveProduct = async (productId) => {
// // // // // // //     try {
// // // // // // //       const response = await fetch(
// // // // // // //         `/api/video-products/${showVideoOptions.video.id}/delete`,
// // // // // // //         {
// // // // // // //           method: "DELETE",
// // // // // // //           headers: {
// // // // // // //             "Content-Type": "application/json",
// // // // // // //           },
// // // // // // //           body: JSON.stringify({ productId }),
// // // // // // //         },
// // // // // // //       );

// // // // // // //       const result = await response.json();

// // // // // // //       if (result.success) {
// // // // // // //         // Remove the product from local state immediately
// // // // // // //         setSavedProducts((prev) =>
// // // // // // //           prev.filter(
// // // // // // //             (product) =>
// // // // // // //               product.shopify_product_id !== productId &&
// // // // // // //               product.id !== productId,
// // // // // // //           ),
// // // // // // //         );
// // // // // // //         console.log("✅ Product removed successfully");
// // // // // // //       } else {
// // // // // // //         console.error("Failed to remove product:", result.error);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error removing product:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Early return should be AFTER all hooks
// // // // // // //   if (!showVideoOptions.show) return null;

// // // // // // //   const themeStyles = {
// // // // // // //     light: {
// // // // // // //       background: "#ffffff",
// // // // // // //       text: "#1f2937",
// // // // // // //       border: "#e5e7eb",
// // // // // // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
// // // // // // //       hoverBackground: "#f3f4f6",
// // // // // // //       sectionBackground: "#f8fafc",
// // // // // // //     },
// // // // // // //     dark: {
// // // // // // //       background: "#374151",
// // // // // // //       text: "#f9fafb",
// // // // // // //       border: "#4b5563",
// // // // // // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
// // // // // // //       hoverBackground: "#4b5563",
// // // // // // //       sectionBackground: "#4b5563",
// // // // // // //     },
// // // // // // //   };

// // // // // // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // // // // // //   // Get the correct video URL
// // // // // // //   const videoUrl =
// // // // // // //     showVideoOptions.video?.videoUrl ||
// // // // // // //     showVideoOptions.video?.shopify_file_url;

// // // // // // //   // FIXED: Determine button text based on multiple states
// // // // // // //   const getAddProductsButtonText = () => {
// // // // // // //     if (isLoadingProducts) return "Loading Products...";
// // // // // // //     if (productsModalOpened) return "Opening...";
// // // // // // //     return "Add Products";
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <>
// // // // // // //       <div
// // // // // // //         style={{
// // // // // // //           position: "fixed",
// // // // // // //           top: 0,
// // // // // // //           left: 0,
// // // // // // //           right: 0,
// // // // // // //           bottom: 0,
// // // // // // //           zIndex: 10000,
// // // // // // //           background: "rgba(0, 0, 0, 0.5)",
// // // // // // //           display: "flex",
// // // // // // //           justifyContent: "center",
// // // // // // //           alignItems: "center",
// // // // // // //         }}
// // // // // // //         onClick={handleBackdropClick}
// // // // // // //       >
// // // // // // //         <div
// // // // // // //           style={{
// // // // // // //             background: currentTheme.background,
// // // // // // //             borderRadius: "12px",
// // // // // // //             border: `1px solid ${currentTheme.border}`,
// // // // // // //             boxShadow: currentTheme.shadow,
// // // // // // //             padding: "2.5rem",
// // // // // // //             maxWidth: "800px",
// // // // // // //             minWidth: "700px",
// // // // // // //             maxHeight: "calc(100vh - 4rem)",
// // // // // // //             height: "auto",
// // // // // // //             minHeight: "500px",
// // // // // // //             zIndex: 10001,
// // // // // // //             animation: "scaleIn 0.2s ease-out",
// // // // // // //             display: "flex",
// // // // // // //             flexDirection: "row",
// // // // // // //             justifyContent: "space-between",
// // // // // // //             alignItems: "flex-start",
// // // // // // //             gap: "2.5rem",
// // // // // // //             overflow: "hidden",
// // // // // // //             position: "relative",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {/* Close Button */}
// // // // // // //           <button
// // // // // // //             onClick={onHide}
// // // // // // //             style={{
// // // // // // //               position: "absolute",
// // // // // // //               top: "1.5rem",
// // // // // // //               right: "1.5rem",
// // // // // // //               background: isDarkTheme ? "#374151" : "white",
// // // // // // //               border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // // // // // //               borderRadius: "50%",
// // // // // // //               width: "40px",
// // // // // // //               height: "40px",
// // // // // // //               display: "flex",
// // // // // // //               alignItems: "center",
// // // // // // //               justifyContent: "center",
// // // // // // //               cursor: "pointer",
// // // // // // //               color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // // // // // //               fontSize: "1.3rem",
// // // // // // //               fontWeight: "bold",
// // // // // // //               zIndex: 10002,
// // // // // // //               transition: "all 0.3s ease",
// // // // // // //             }}
// // // // // // //             onMouseEnter={(e) => {
// // // // // // //               e.target.style.background = isDarkTheme ? "#4b5563" : "#f3f4f6";
// // // // // // //               e.target.style.color = isDarkTheme ? "#f9fafb" : "#1f2937";
// // // // // // //             }}
// // // // // // //             onMouseLeave={(e) => {
// // // // // // //               e.target.style.background = isDarkTheme ? "#374151" : "white";
// // // // // // //               e.target.style.color = isDarkTheme ? "#9ca3af" : "#6b7280";
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             ✕
// // // // // // //           </button>

// // // // // // //           {/* Left Column - Video Player */}
// // // // // // //           <div
// // // // // // //             style={{
// // // // // // //               flex: 1,
// // // // // // //               minWidth: "220px",
// // // // // // //               display: "flex",
// // // // // // //               flexDirection: "row",
// // // // // // //               gap: "2rem",
// // // // // // //               position: "relative",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             {/* Vertical Line Separator */}
// // // // // // //             <div
// // // // // // //               style={{
// // // // // // //                 position: "absolute",
// // // // // // //                 right: "-1.25rem",
// // // // // // //                 top: "0",
// // // // // // //                 bottom: "0",
// // // // // // //                 width: "1px",
// // // // // // //                 background: isDarkTheme ? "#4b5563" : "#e5e7eb",
// // // // // // //                 zIndex: 1,
// // // // // // //               }}
// // // // // // //             />

// // // // // // //             {/* Video Player Section */}
// // // // // // //             <div style={{ flex: 1 }}>
// // // // // // //               <h3
// // // // // // //                 style={{
// // // // // // //                   fontSize: "1.1rem",
// // // // // // //                   fontWeight: "600",
// // // // // // //                   color: currentTheme.text,
// // // // // // //                   margin: "0 0 1.2rem 0",
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 Selected Video
// // // // // // //               </h3>

// // // // // // //               {/* Video Player with Hover - Shows the clicked video */}
// // // // // // //               {videoUrl ? (
// // // // // // //                 <div
// // // // // // //                   style={{
// // // // // // //                     width: "100%",
// // // // // // //                     height: "250px",
// // // // // // //                     display: "flex",
// // // // // // //                     justifyContent: "center",
// // // // // // //                     alignItems: "center",
// // // // // // //                     background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // // // // //                     borderRadius: "10px",
// // // // // // //                     overflow: "hidden",
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   <VideoPlayerWithHover
// // // // // // //                     videoUrl={videoUrl}
// // // // // // //                     thumbnailUrl={showVideoOptions.video?.thumbnail_url}
// // // // // // //                     title={showVideoOptions.video?.title}
// // // // // // //                     onVideoClick={handleVideoClick}
// // // // // // //                     isDarkTheme={isDarkTheme}
// // // // // // //                     height="250px"
// // // // // // //                     width="100%"
// // // // // // //                     objectFit="contain"
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //               ) : (
// // // // // // //                 <div
// // // // // // //                   style={{
// // // // // // //                     height: "200px",
// // // // // // //                     background: isDarkTheme ? "#374151" : "#f3f4f6",
// // // // // // //                     borderRadius: "10px",
// // // // // // //                     display: "flex",
// // // // // // //                     alignItems: "center",
// // // // // // //                     justifyContent: "center",
// // // // // // //                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // // // // // //                     flexDirection: "column",
// // // // // // //                     gap: "0.8rem",
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   <div style={{ fontSize: "1.8rem" }}>🎬</div>
// // // // // // //                   <div style={{ fontSize: "1rem" }}>Video not available</div>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>

// // // // // // //             {/* Video Actions Section */}
// // // // // // //             <div
// // // // // // //               style={{
// // // // // // //                 marginTop: "50px",
// // // // // // //                 display: "flex",
// // // // // // //                 flexDirection: "column",
// // // // // // //                 justifyContent: "center",
// // // // // // //                 alignItems: "center",
// // // // // // //                 gap: "15px",
// // // // // // //               }}
// // // // // // //             >
// // // // // // //               <button
// // // // // // //                 onClick={() =>
// // // // // // //                   handleOptionClick(() =>
// // // // // // //                     onCopyUrl(showVideoOptions.video.shopify_file_url),
// // // // // // //                   )
// // // // // // //                 }
// // // // // // //                 title="Copy Video URL"
// // // // // // //                 style={{
// // // // // // //                   background: "transparent",
// // // // // // //                   border: "none",
// // // // // // //                   color: currentTheme.text,
// // // // // // //                   borderRadius: "10px",
// // // // // // //                   fontSize: "1.5rem",
// // // // // // //                   fontWeight: "500",
// // // // // // //                   cursor: "pointer",
// // // // // // //                   transition: "all 0.2s",
// // // // // // //                   display: "flex",
// // // // // // //                   alignItems: "center",
// // // // // // //                   justifyContent: "center",
// // // // // // //                   width: "45px",
// // // // // // //                   height: "45px",
// // // // // // //                   opacity: 0.8,
// // // // // // //                 }}
// // // // // // //                 onMouseEnter={(e) => {
// // // // // // //                   e.target.style.transform = "scale(1.1)";
// // // // // // //                   e.target.style.opacity = "1";
// // // // // // //                 }}
// // // // // // //                 onMouseLeave={(e) => {
// // // // // // //                   e.target.style.transform = "scale(1)";
// // // // // // //                   e.target.style.opacity = "0.8";
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <img
// // // // // // //                   src="/link.png"
// // // // // // //                   alt="Copy Link"
// // // // // // //                   style={{
// // // // // // //                     width: "22px",
// // // // // // //                     height: "22px",
// // // // // // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //               </button>

// // // // // // //               <button
// // // // // // //                 onClick={() =>
// // // // // // //                   handleOptionClick(() => onDownload(showVideoOptions.video))
// // // // // // //                 }
// // // // // // //                 title="Download Video"
// // // // // // //                 style={{
// // // // // // //                   background: "transparent",
// // // // // // //                   border: "none",
// // // // // // //                   color: currentTheme.text,
// // // // // // //                   borderRadius: "10px",
// // // // // // //                   fontSize: "1.5rem",
// // // // // // //                   fontWeight: "500",
// // // // // // //                   cursor: "pointer",
// // // // // // //                   transition: "all 0.2s",
// // // // // // //                   display: "flex",
// // // // // // //                   alignItems: "center",
// // // // // // //                   justifyContent: "center",
// // // // // // //                   width: "45px",
// // // // // // //                   height: "45px",
// // // // // // //                   opacity: 0.8,
// // // // // // //                 }}
// // // // // // //                 onMouseEnter={(e) => {
// // // // // // //                   e.target.style.transform = "scale(1.1)";
// // // // // // //                   e.target.style.opacity = "1";
// // // // // // //                 }}
// // // // // // //                 onMouseLeave={(e) => {
// // // // // // //                   e.target.style.transform = "scale(1)";
// // // // // // //                   e.target.style.opacity = "0.8";
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <img
// // // // // // //                   src="/download.png"
// // // // // // //                   alt="Download"
// // // // // // //                   style={{
// // // // // // //                     width: "22px",
// // // // // // //                     height: "22px",
// // // // // // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //               </button>

// // // // // // //               <button
// // // // // // //                 onClick={() =>
// // // // // // //                   handleOptionClick(() =>
// // // // // // //                     onDelete(
// // // // // // //                       showVideoOptions.video.id,
// // // // // // //                       showVideoOptions.video.title,
// // // // // // //                     ),
// // // // // // //                   )
// // // // // // //                 }
// // // // // // //                 title="Delete Video"
// // // // // // //                 style={{
// // // // // // //                   background: "transparent",
// // // // // // //                   border: "none",
// // // // // // //                   color: "#ef4444",
// // // // // // //                   borderRadius: "10px",
// // // // // // //                   fontSize: "1.5rem",
// // // // // // //                   fontWeight: "500",
// // // // // // //                   cursor: "pointer",
// // // // // // //                   transition: "all 0.2s",
// // // // // // //                   display: "flex",
// // // // // // //                   alignItems: "center",
// // // // // // //                   justifyContent: "center",
// // // // // // //                   width: "45px",
// // // // // // //                   height: "45px",
// // // // // // //                   opacity: 0.8,
// // // // // // //                 }}
// // // // // // //                 onMouseEnter={(e) => {
// // // // // // //                   e.target.style.transform = "scale(1.1)";
// // // // // // //                   e.target.style.opacity = "1";
// // // // // // //                 }}
// // // // // // //                 onMouseLeave={(e) => {
// // // // // // //                   e.target.style.transform = "scale(1)";
// // // // // // //                   e.target.style.opacity = "0.8";
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <img
// // // // // // //                   src="/trash.png"
// // // // // // //                   alt="Delete"
// // // // // // //                   style={{
// // // // // // //                     width: "22px",
// // // // // // //                     height: "22px",
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* Right Column - Products Section */}
// // // // // // //           <div
// // // // // // //             style={{
// // // // // // //               flex: 1,
// // // // // // //               minWidth: "300px",
// // // // // // //               display: "flex",
// // // // // // //               flexDirection: "column",
// // // // // // //               gap: "1.8rem",
// // // // // // //               height: "100%",
// // // // // // //               overflow: "hidden",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             {/* Products Section */}
// // // // // // //             <div
// // // // // // //               style={{
// // // // // // //                 display: "flex",
// // // // // // //                 flexDirection: "column",
// // // // // // //                 height: "100%",
// // // // // // //                 gap: "1.2rem",
// // // // // // //               }}
// // // // // // //             >
// // // // // // //               <h3
// // // // // // //                 style={{
// // // // // // //                   fontSize: "1.1rem",
// // // // // // //                   fontWeight: "600",
// // // // // // //                   color: currentTheme.text,
// // // // // // //                   margin: 0,
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 Product Management
// // // // // // //               </h3>

// // // // // // //               <button
// // // // // // //                 onClick={handleAddProducts}
// // // // // // //                 disabled={isLoadingProducts || productsModalOpened}
// // // // // // //                 style={{
// // // // // // //                   width: "100%",
// // // // // // //                   background: "#10b981",
// // // // // // //                   color: "white",
// // // // // // //                   border: "none",
// // // // // // //                   padding: "0.8rem",
// // // // // // //                   borderRadius: "10px",
// // // // // // //                   fontSize: "0.9rem",
// // // // // // //                   fontWeight: "500",
// // // // // // //                   cursor:
// // // // // // //                     isLoadingProducts || productsModalOpened
// // // // // // //                       ? "not-allowed"
// // // // // // //                       : "pointer",
// // // // // // //                   transition: "background-color 0.2s",
// // // // // // //                   opacity: isLoadingProducts || productsModalOpened ? 0.6 : 1,
// // // // // // //                   height: "48px",
// // // // // // //                 }}
// // // // // // //                 onMouseEnter={(e) => {
// // // // // // //                   if (!isLoadingProducts && !productsModalOpened) {
// // // // // // //                     e.target.style.background = "#059669";
// // // // // // //                   }
// // // // // // //                 }}
// // // // // // //                 onMouseLeave={(e) => {
// // // // // // //                   if (!isLoadingProducts && !productsModalOpened) {
// // // // // // //                     e.target.style.background = "#10b981";
// // // // // // //                   }
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 {getAddProductsButtonText()}
// // // // // // //               </button>

// // // // // // //               {/* Saved Products Section */}
// // // // // // //               <div
// // // // // // //                 style={{
// // // // // // //                   flex: 1,
// // // // // // //                   display: "flex",
// // // // // // //                   flexDirection: "column",
// // // // // // //                   overflow: "hidden",
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <div
// // // // // // //                   style={{
// // // // // // //                     fontSize: "0.9rem",
// // // // // // //                     fontWeight: "600",
// // // // // // //                     color: currentTheme.text,
// // // // // // //                     marginBottom: "0.8rem",
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   Saved Products{" "}
// // // // // // //                   {savedProducts.length > 0 && `(${savedProducts.length})`}
// // // // // // //                 </div>

// // // // // // //                 {isLoadingSavedProducts ? (
// // // // // // //                   <div
// // // // // // //                     style={{
// // // // // // //                       textAlign: "center",
// // // // // // //                       padding: "1.2rem",
// // // // // // //                       color: currentTheme.text,
// // // // // // //                       fontSize: "0.85rem",
// // // // // // //                       border: `1px solid ${currentTheme.border}`,
// // // // // // //                       borderRadius: "10px",
// // // // // // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // // // // //                       height: "70px",
// // // // // // //                       display: "flex",
// // // // // // //                       alignItems: "center",
// // // // // // //                       justifyContent: "center",
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     Loading saved products...
// // // // // // //                   </div>
// // // // // // //                 ) : savedProducts.length > 0 ? (
// // // // // // //                   <div
// // // // // // //                     style={{
// // // // // // //                       flex: 1,
// // // // // // //                       overflowY: "auto",
// // // // // // //                       border: `1px solid ${currentTheme.border}`,
// // // // // // //                       borderRadius: "10px",
// // // // // // //                       padding: "0.8rem",
// // // // // // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // // // // //                       maxHeight: "250px",
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     {savedProducts.map((product) => (
// // // // // // //                       <div
// // // // // // //                         key={product.video_product_id || product.id}
// // // // // // //                         style={{
// // // // // // //                           display: "flex",
// // // // // // //                           alignItems: "center",
// // // // // // //                           gap: "0.8rem",
// // // // // // //                           padding: "0.8rem",
// // // // // // //                           marginBottom: "0.5rem",
// // // // // // //                           background: isDarkTheme ? "#374151" : "#ffffff",
// // // // // // //                           borderRadius: "8px",
// // // // // // //                           fontSize: "0.8rem",
// // // // // // //                           position: "relative",
// // // // // // //                         }}
// // // // // // //                       >
// // // // // // //                         {product.image_url ? (
// // // // // // //                           <img
// // // // // // //                             src={product.image_url}
// // // // // // //                             alt={product.title}
// // // // // // //                             style={{
// // // // // // //                               width: "28px",
// // // // // // //                               height: "28px",
// // // // // // //                               borderRadius: "6px",
// // // // // // //                               objectFit: "cover",
// // // // // // //                             }}
// // // // // // //                           />
// // // // // // //                         ) : (
// // // // // // //                           <div
// // // // // // //                             style={{
// // // // // // //                               width: "28px",
// // // // // // //                               height: "28px",
// // // // // // //                               background: "#3b82f6",
// // // // // // //                               borderRadius: "6px",
// // // // // // //                               display: "flex",
// // // // // // //                               alignItems: "center",
// // // // // // //                               justifyContent: "center",
// // // // // // //                               color: "white",
// // // // // // //                               fontSize: "0.75rem",
// // // // // // //                               fontWeight: "bold",
// // // // // // //                             }}
// // // // // // //                           >
// // // // // // //                             P
// // // // // // //                           </div>
// // // // // // //                         )}
// // // // // // //                         <div style={{ flex: 1, minWidth: 0 }}>
// // // // // // //                           <div
// // // // // // //                             style={{
// // // // // // //                               color: currentTheme.text,
// // // // // // //                               fontWeight: "500",
// // // // // // //                               whiteSpace: "nowrap",
// // // // // // //                               overflow: "hidden",
// // // // // // //                               textOverflow: "ellipsis",
// // // // // // //                             }}
// // // // // // //                           >
// // // // // // //                             {product.title}
// // // // // // //                           </div>
// // // // // // //                           <div
// // // // // // //                             style={{
// // // // // // //                               color: "#10b981",
// // // // // // //                               fontSize: "0.75rem",
// // // // // // //                             }}
// // // // // // //                           >
// // // // // // //                             ${product.price}
// // // // // // //                           </div>
// // // // // // //                         </div>
// // // // // // //                         {/* Remove Product Button */}
// // // // // // //                         <button
// // // // // // //                           onClick={() =>
// // // // // // //                             handleRemoveProduct(
// // // // // // //                               product.shopify_product_id || product.id,
// // // // // // //                             )
// // // // // // //                           }
// // // // // // //                           style={{
// // // // // // //                             background: "transparent",
// // // // // // //                             border: "none",
// // // // // // //                             color: "#ef4444",
// // // // // // //                             cursor: "pointer",
// // // // // // //                             padding: "4px",
// // // // // // //                             borderRadius: "4px",
// // // // // // //                             fontSize: "0.7rem",
// // // // // // //                             display: "flex",
// // // // // // //                             alignItems: "center",
// // // // // // //                             justifyContent: "center",
// // // // // // //                             width: "20px",
// // // // // // //                             height: "20px",
// // // // // // //                           }}
// // // // // // //                           onMouseEnter={(e) => {
// // // // // // //                             e.target.style.background = "#ef4444";
// // // // // // //                             e.target.style.color = "white";
// // // // // // //                           }}
// // // // // // //                           onMouseLeave={(e) => {
// // // // // // //                             e.target.style.background = "transparent";
// // // // // // //                             e.target.style.color = "#ef4444";
// // // // // // //                           }}
// // // // // // //                           title="Remove product"
// // // // // // //                         >
// // // // // // //                           ✕
// // // // // // //                         </button>
// // // // // // //                       </div>
// // // // // // //                     ))}
// // // // // // //                   </div>
// // // // // // //                 ) : (
// // // // // // //                   <div
// // // // // // //                     style={{
// // // // // // //                       textAlign: "center",
// // // // // // //                       padding: "1.2rem",
// // // // // // //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // // // // // //                       fontSize: "0.85rem",
// // // // // // //                       fontStyle: "italic",
// // // // // // //                       border: `1px dashed ${currentTheme.border}`,
// // // // // // //                       borderRadius: "10px",
// // // // // // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // // // // //                       height: "70px",
// // // // // // //                       display: "flex",
// // // // // // //                       alignItems: "center",
// // // // // // //                       justifyContent: "center",
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     No products saved for this video
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           <style jsx>{`
// // // // // // //             @keyframes scaleIn {
// // // // // // //               from {
// // // // // // //                 opacity: 0;
// // // // // // //                 transform: scale(0.95) translateY(-10px);
// // // // // // //               }
// // // // // // //               to {
// // // // // // //                 opacity: 1;
// // // // // // //                 transform: scale(1) translateY(0);
// // // // // // //               }
// // // // // // //             }
// // // // // // //           `}</style>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* ProductsModal is now controlled by the parent component through showProductsModal state */}
// // // // // // //     </>
// // // // // // //   );
// // // // // // // }

// // // // // // // components/videogallerycomponents/VideoOptionsModal.jsx
// // // // // // import { useState, useEffect, useRef } from "react";
// // // // // // import ProductsModal from "./ProductsModal";
// // // // // // import VideoPlayerWithHover from "./VideoPlayerWithHover";

// // // // // // export default function VideoOptionsModal({
// // // // // //   showVideoOptions,
// // // // // //   onHide,
// // // // // //   onCopyUrl,
// // // // // //   onDownload,
// // // // // //   onLoadProducts,
// // // // // //   onDelete,
// // // // // //   isDarkTheme,
// // // // // //   selectedProducts,
// // // // // //   products,
// // // // // //   onToggleProduct,
// // // // // //   onSaveProducts,
// // // // // //   showVideoPlayerModal,
// // // // // //   productsModalOpened,
// // // // // //   closeProductsModal,
// // // // // // }) {
// // // // // //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// // // // // //   const [savedProducts, setSavedProducts] = useState([]);
// // // // // //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
// // // // // //   const [enableStatuses, setEnableStatuses] = useState({}); // Store enable status for each product

// // // // // //   // Fetch saved products when modal opens or video changes
// // // // // //   useEffect(() => {
// // // // // //     if (showVideoOptions.show && showVideoOptions.video?.id) {
// // // // // //       fetchSavedProducts();
// // // // // //       fetchEnableStatuses();
// // // // // //     }
// // // // // //   }, [showVideoOptions.show, showVideoOptions.video?.id]);

// // // // // //   // FIX: Auto-refresh when productsModalOpened becomes false (modal closes)
// // // // // //   useEffect(() => {
// // // // // //     if (
// // // // // //       !productsModalOpened &&
// // // // // //       showVideoOptions.show &&
// // // // // //       showVideoOptions.video?.id
// // // // // //     ) {
// // // // // //       fetchSavedProducts();
// // // // // //       fetchEnableStatuses();
// // // // // //     }
// // // // // //   }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);

// // // // // //   const fetchSavedProducts = async () => {
// // // // // //     try {
// // // // // //       setIsLoadingSavedProducts(true);
// // // // // //       const response = await fetch(
// // // // // //         `/api/video-products/${showVideoOptions.video.id}`,
// // // // // //       );
// // // // // //       const result = await response.json();

// // // // // //       if (result.success) {
// // // // // //         setSavedProducts(result.products);
// // // // // //         console.log(
// // // // // //           "✅ Loaded saved products for display:",
// // // // // //           result.products.length,
// // // // // //         );
// // // // // //       } else {
// // // // // //         console.error("Failed to fetch saved products:", result.error);
// // // // // //         setSavedProducts([]);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching saved products:", error);
// // // // // //       setSavedProducts([]);
// // // // // //     } finally {
// // // // // //       setIsLoadingSavedProducts(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // NEW: Fetch enable statuses for all products in this video
// // // // // //   const fetchEnableStatuses = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch(
// // // // // //         `/api/videooptionsmodal-enableoption?videoId=${showVideoOptions.video.id}`,
// // // // // //       );
// // // // // //       const result = await response.json();

// // // // // //       if (result.success) {
// // // // // //         // Create a map of product_id -> enable status
// // // // // //         const statusMap = {};
// // // // // //         result.data.forEach(item => {
// // // // // //           statusMap[item.product_id] = item.status;
// // // // // //         });
// // // // // //         setEnableStatuses(statusMap);
// // // // // //         console.log("✅ Loaded enable statuses:", statusMap);
// // // // // //       } else {
// // // // // //         console.error("Failed to fetch enable statuses:", result.error);
// // // // // //         setEnableStatuses({});
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching enable statuses:", error);
// // // // // //       setEnableStatuses({});
// // // // // //     }
// // // // // //   };

// // // // // //   // NEW: Toggle enable status for a product
// // // // // //   const toggleEnableStatus = async (productId, currentStatus) => {
// // // // // //     const newStatus = !currentStatus;

// // // // // //     try {
// // // // // //       const response = await fetch('/api/videooptionsmodal-enableoption', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //         body: JSON.stringify({
// // // // // //           videoId: showVideoOptions.video.id,
// // // // // //           productId: productId,
// // // // // //           status: newStatus
// // // // // //         }),
// // // // // //       });

// // // // // //       const result = await response.json();

// // // // // //       if (result.success) {
// // // // // //         // Update local state immediately
// // // // // //         setEnableStatuses(prev => ({
// // // // // //           ...prev,
// // // // // //           [productId]: newStatus
// // // // // //         }));
// // // // // //         console.log(`✅ Enable status updated to: ${newStatus}`);
// // // // // //       } else {
// // // // // //         console.error("Failed to update enable status:", result.error);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error updating enable status:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleBackdropClick = (e) => {
// // // // // //     if (e.target === e.currentTarget) {
// // // // // //       onHide();
// // // // // //     }
// // // // // //   };

// // // // // //   const handleOptionClick = (action) => {
// // // // // //     action();
// // // // // //     onHide();
// // // // // //   };

// // // // // //   const handleVideoClick = () => {
// // // // // //     if (showVideoPlayerModal && showVideoOptions.video) {
// // // // // //       showVideoPlayerModal(showVideoOptions.video);
// // // // // //       onHide();
// // // // // //     }
// // // // // //   };

// // // // // //   // FIXED: Handle modal state properly
// // // // // //   const handleAddProducts = async () => {
// // // // // //     if (isLoadingProducts || productsModalOpened) {
// // // // // //       console.log("⚠️ Modal already opening or opened, skipping");
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsLoadingProducts(true);

// // // // // //     try {
// // // // // //       // This will load products AND set the modal to show
// // // // // //       if (onLoadProducts) {
// // // // // //         await onLoadProducts(showVideoOptions.video);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error loading products:", error);
// // // // // //     } finally {
// // // // // //       setIsLoadingProducts(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSaveProducts = async () => {
// // // // // //     if (onSaveProducts) {
// // // // // //       await onSaveProducts();
// // // // // //     }
// // // // // //   };

// // // // // //   // NEW: Function to remove a product
// // // // // //   const handleRemoveProduct = async (productId) => {
// // // // // //     try {
// // // // // //       const response = await fetch(
// // // // // //         `/api/video-products/${showVideoOptions.video.id}/delete`,
// // // // // //         {
// // // // // //           method: "DELETE",
// // // // // //           headers: {
// // // // // //             "Content-Type": "application/json",
// // // // // //           },
// // // // // //           body: JSON.stringify({ productId }),
// // // // // //         },
// // // // // //       );

// // // // // //       const result = await response.json();

// // // // // //       if (result.success) {
// // // // // //         // Remove the product from local state immediately
// // // // // //         setSavedProducts((prev) =>
// // // // // //           prev.filter(
// // // // // //             (product) =>
// // // // // //               product.shopify_product_id !== productId &&
// // // // // //               product.id !== productId,
// // // // // //           ),
// // // // // //         );
// // // // // //         // Also remove from enable statuses
// // // // // //         setEnableStatuses(prev => {
// // // // // //           const newStatuses = { ...prev };
// // // // // //           delete newStatuses[productId];
// // // // // //           return newStatuses;
// // // // // //         });
// // // // // //         console.log("✅ Product removed successfully");
// // // // // //       } else {
// // // // // //         console.error("Failed to remove product:", result.error);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error removing product:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   // Early return should be AFTER all hooks
// // // // // //   if (!showVideoOptions.show) return null;

// // // // // //   const themeStyles = {
// // // // // //     light: {
// // // // // //       background: "#ffffff",
// // // // // //       text: "#1f2937",
// // // // // //       border: "#e5e7eb",
// // // // // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
// // // // // //       hoverBackground: "#f3f4f6",
// // // // // //       sectionBackground: "#f8fafc",
// // // // // //     },
// // // // // //     dark: {
// // // // // //       background: "#374151",
// // // // // //       text: "#f9fafb",
// // // // // //       border: "#4b5563",
// // // // // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
// // // // // //       hoverBackground: "#4b5563",
// // // // // //       sectionBackground: "#4b5563",
// // // // // //     },
// // // // // //   };

// // // // // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // // // // //   // Get the correct video URL
// // // // // //   const videoUrl =
// // // // // //     showVideoOptions.video?.videoUrl ||
// // // // // //     showVideoOptions.video?.shopify_file_url;

// // // // // //   // FIXED: Determine button text based on multiple states
// // // // // //   const getAddProductsButtonText = () => {
// // // // // //     if (isLoadingProducts) return "Loading Products...";
// // // // // //     if (productsModalOpened) return "Opening...";
// // // // // //     return "Add Products";
// // // // // //   };

// // // // // //   return (
// // // // // //     <>
// // // // // //       <div
// // // // // //         style={{
// // // // // //           position: "fixed",
// // // // // //           top: 0,
// // // // // //           left: 0,
// // // // // //           right: 0,
// // // // // //           bottom: 0,
// // // // // //           zIndex: 10000,
// // // // // //           background: "rgba(0, 0, 0, 0.5)",
// // // // // //           display: "flex",
// // // // // //           justifyContent: "center",
// // // // // //           alignItems: "center",
// // // // // //         }}
// // // // // //         onClick={handleBackdropClick}
// // // // // //       >
// // // // // //         <div
// // // // // //           style={{
// // // // // //             background: currentTheme.background,
// // // // // //             borderRadius: "12px",
// // // // // //             border: `1px solid ${currentTheme.border}`,
// // // // // //             boxShadow: currentTheme.shadow,
// // // // // //             padding: "2.5rem",
// // // // // //             maxWidth: "800px",
// // // // // //             minWidth: "700px",
// // // // // //             maxHeight: "calc(100vh - 4rem)",
// // // // // //             height: "auto",
// // // // // //             minHeight: "500px",
// // // // // //             zIndex: 10001,
// // // // // //             animation: "scaleIn 0.2s ease-out",
// // // // // //             display: "flex",
// // // // // //             flexDirection: "row",
// // // // // //             justifyContent: "space-between",
// // // // // //             alignItems: "flex-start",
// // // // // //             gap: "2.5rem",
// // // // // //             overflow: "hidden",
// // // // // //             position: "relative",
// // // // // //           }}
// // // // // //         >
// // // // // //           {/* Close Button */}
// // // // // //           <button
// // // // // //             onClick={onHide}
// // // // // //             style={{
// // // // // //               position: "absolute",
// // // // // //               top: "1.5rem",
// // // // // //               right: "1.5rem",
// // // // // //               background: isDarkTheme ? "#374151" : "white",
// // // // // //               border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // // // // //               borderRadius: "50%",
// // // // // //               width: "40px",
// // // // // //               height: "40px",
// // // // // //               display: "flex",
// // // // // //               alignItems: "center",
// // // // // //               justifyContent: "center",
// // // // // //               cursor: "pointer",
// // // // // //               color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // // // // //               fontSize: "1.3rem",
// // // // // //               fontWeight: "bold",
// // // // // //               zIndex: 10002,
// // // // // //               transition: "all 0.3s ease",
// // // // // //             }}
// // // // // //             onMouseEnter={(e) => {
// // // // // //               e.target.style.background = isDarkTheme ? "#4b5563" : "#f3f4f6";
// // // // // //               e.target.style.color = isDarkTheme ? "#f9fafb" : "#1f2937";
// // // // // //             }}
// // // // // //             onMouseLeave={(e) => {
// // // // // //               e.target.style.background = isDarkTheme ? "#374151" : "white";
// // // // // //               e.target.style.color = isDarkTheme ? "#9ca3af" : "#6b7280";
// // // // // //             }}
// // // // // //           >
// // // // // //             ✕
// // // // // //           </button>

// // // // // //           {/* Left Column - Video Player */}
// // // // // //           <div
// // // // // //             style={{
// // // // // //               flex: 1,
// // // // // //               minWidth: "220px",
// // // // // //               display: "flex",
// // // // // //               flexDirection: "row",
// // // // // //               gap: "2rem",
// // // // // //               position: "relative",
// // // // // //             }}
// // // // // //           >
// // // // // //             {/* Vertical Line Separator */}
// // // // // //             <div
// // // // // //               style={{
// // // // // //                 position: "absolute",
// // // // // //                 right: "-1.25rem",
// // // // // //                 top: "0",
// // // // // //                 bottom: "0",
// // // // // //                 width: "1px",
// // // // // //                 background: isDarkTheme ? "#4b5563" : "#e5e7eb",
// // // // // //                 zIndex: 1,
// // // // // //               }}
// // // // // //             />

// // // // // //             {/* Video Player Section */}
// // // // // //             <div style={{ flex: 1 }}>
// // // // // //               <h3
// // // // // //                 style={{
// // // // // //                   fontSize: "1.1rem",
// // // // // //                   fontWeight: "600",
// // // // // //                   color: currentTheme.text,
// // // // // //                   margin: "0 0 1.2rem 0",
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Selected Video
// // // // // //               </h3>

// // // // // //               {/* Video Player with Hover - Shows the clicked video */}
// // // // // //               {videoUrl ? (
// // // // // //                 <div
// // // // // //                   style={{
// // // // // //                     width: "100%",
// // // // // //                     height: "250px",
// // // // // //                     display: "flex",
// // // // // //                     justifyContent: "center",
// // // // // //                     alignItems: "center",
// // // // // //                     background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // // // //                     borderRadius: "10px",
// // // // // //                     overflow: "hidden",
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <VideoPlayerWithHover
// // // // // //                     videoUrl={videoUrl}
// // // // // //                     thumbnailUrl={showVideoOptions.video?.thumbnail_url}
// // // // // //                     title={showVideoOptions.video?.title}
// // // // // //                     onVideoClick={handleVideoClick}
// // // // // //                     isDarkTheme={isDarkTheme}
// // // // // //                     height="250px"
// // // // // //                     width="100%"
// // // // // //                     objectFit="contain"
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               ) : (
// // // // // //                 <div
// // // // // //                   style={{
// // // // // //                     height: "200px",
// // // // // //                     background: isDarkTheme ? "#374151" : "#f3f4f6",
// // // // // //                     borderRadius: "10px",
// // // // // //                     display: "flex",
// // // // // //                     alignItems: "center",
// // // // // //                     justifyContent: "center",
// // // // // //                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // // // // //                     flexDirection: "column",
// // // // // //                     gap: "0.8rem",
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <div style={{ fontSize: "1.8rem" }}>🎬</div>
// // // // // //                   <div style={{ fontSize: "1rem" }}>Video not available</div>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>

// // // // // //             {/* Video Actions Section */}
// // // // // //             <div
// // // // // //               style={{
// // // // // //                 marginTop: "50px",
// // // // // //                 display: "flex",
// // // // // //                 flexDirection: "column",
// // // // // //                 justifyContent: "center",
// // // // // //                 alignItems: "center",
// // // // // //                 gap: "15px",
// // // // // //               }}
// // // // // //             >
// // // // // //               <button
// // // // // //                 onClick={() =>
// // // // // //                   handleOptionClick(() =>
// // // // // //                     onCopyUrl(showVideoOptions.video.shopify_file_url),
// // // // // //                   )
// // // // // //                 }
// // // // // //                 title="Copy Video URL"
// // // // // //                 style={{
// // // // // //                   background: "transparent",
// // // // // //                   border: "none",
// // // // // //                   color: currentTheme.text,
// // // // // //                   borderRadius: "10px",
// // // // // //                   fontSize: "1.5rem",
// // // // // //                   fontWeight: "500",
// // // // // //                   cursor: "pointer",
// // // // // //                   transition: "all 0.2s",
// // // // // //                   display: "flex",
// // // // // //                   alignItems: "center",
// // // // // //                   justifyContent: "center",
// // // // // //                   width: "45px",
// // // // // //                   height: "45px",
// // // // // //                   opacity: 0.8,
// // // // // //                 }}
// // // // // //                 onMouseEnter={(e) => {
// // // // // //                   e.target.style.transform = "scale(1.1)";
// // // // // //                   e.target.style.opacity = "1";
// // // // // //                 }}
// // // // // //                 onMouseLeave={(e) => {
// // // // // //                   e.target.style.transform = "scale(1)";
// // // // // //                   e.target.style.opacity = "0.8";
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <img
// // // // // //                   src="/link.png"
// // // // // //                   alt="Copy Link"
// // // // // //                   style={{
// // // // // //                     width: "22px",
// // // // // //                     height: "22px",
// // // // // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // // // // //                   }}
// // // // // //                 />
// // // // // //               </button>

// // // // // //               <button
// // // // // //                 onClick={() =>
// // // // // //                   handleOptionClick(() => onDownload(showVideoOptions.video))
// // // // // //                 }
// // // // // //                 title="Download Video"
// // // // // //                 style={{
// // // // // //                   background: "transparent",
// // // // // //                   border: "none",
// // // // // //                   color: currentTheme.text,
// // // // // //                   borderRadius: "10px",
// // // // // //                   fontSize: "1.5rem",
// // // // // //                   fontWeight: "500",
// // // // // //                   cursor: "pointer",
// // // // // //                   transition: "all 0.2s",
// // // // // //                   display: "flex",
// // // // // //                   alignItems: "center",
// // // // // //                   justifyContent: "center",
// // // // // //                   width: "45px",
// // // // // //                   height: "45px",
// // // // // //                   opacity: 0.8,
// // // // // //                 }}
// // // // // //                 onMouseEnter={(e) => {
// // // // // //                   e.target.style.transform = "scale(1.1)";
// // // // // //                   e.target.style.opacity = "1";
// // // // // //                 }}
// // // // // //                 onMouseLeave={(e) => {
// // // // // //                   e.target.style.transform = "scale(1)";
// // // // // //                   e.target.style.opacity = "0.8";
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <img
// // // // // //                   src="/download.png"
// // // // // //                   alt="Download"
// // // // // //                   style={{
// // // // // //                     width: "22px",
// // // // // //                     height: "22px",
// // // // // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // // // // //                   }}
// // // // // //                 />
// // // // // //               </button>

// // // // // //               <button
// // // // // //                 onClick={() =>
// // // // // //                   handleOptionClick(() =>
// // // // // //                     onDelete(
// // // // // //                       showVideoOptions.video.id,
// // // // // //                       showVideoOptions.video.title,
// // // // // //                     ),
// // // // // //                   )
// // // // // //                 }
// // // // // //                 title="Delete Video"
// // // // // //                 style={{
// // // // // //                   background: "transparent",
// // // // // //                   border: "none",
// // // // // //                   color: "#ef4444",
// // // // // //                   borderRadius: "10px",
// // // // // //                   fontSize: "1.5rem",
// // // // // //                   fontWeight: "500",
// // // // // //                   cursor: "pointer",
// // // // // //                   transition: "all 0.2s",
// // // // // //                   display: "flex",
// // // // // //                   alignItems: "center",
// // // // // //                   justifyContent: "center",
// // // // // //                   width: "45px",
// // // // // //                   height: "45px",
// // // // // //                   opacity: 0.8,
// // // // // //                 }}
// // // // // //                 onMouseEnter={(e) => {
// // // // // //                   e.target.style.transform = "scale(1.1)";
// // // // // //                   e.target.style.opacity = "1";
// // // // // //                 }}
// // // // // //                 onMouseLeave={(e) => {
// // // // // //                   e.target.style.transform = "scale(1)";
// // // // // //                   e.target.style.opacity = "0.8";
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <img
// // // // // //                   src="/trash.png"
// // // // // //                   alt="Delete"
// // // // // //                   style={{
// // // // // //                     width: "22px",
// // // // // //                     height: "22px",
// // // // // //                   }}
// // // // // //                 />
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Right Column - Products Section */}
// // // // // //           <div
// // // // // //             style={{
// // // // // //               flex: 1,
// // // // // //               minWidth: "300px",
// // // // // //               display: "flex",
// // // // // //               flexDirection: "column",
// // // // // //               gap: "1.8rem",
// // // // // //               height: "100%",
// // // // // //               overflow: "hidden",
// // // // // //             }}
// // // // // //           >
// // // // // //             {/* Products Section */}
// // // // // //             <div
// // // // // //               style={{
// // // // // //                 display: "flex",
// // // // // //                 flexDirection: "column",
// // // // // //                 height: "100%",
// // // // // //                 gap: "1.2rem",
// // // // // //               }}
// // // // // //             >
// // // // // //               <h3
// // // // // //                 style={{
// // // // // //                   fontSize: "1.1rem",
// // // // // //                   fontWeight: "600",
// // // // // //                   color: currentTheme.text,
// // // // // //                   margin: 0,
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Product Management
// // // // // //               </h3>

// // // // // //               <button
// // // // // //                 onClick={handleAddProducts}
// // // // // //                 disabled={isLoadingProducts || productsModalOpened}
// // // // // //                 style={{
// // // // // //                   width: "100%",
// // // // // //                   background: "#10b981",
// // // // // //                   color: "white",
// // // // // //                   border: "none",
// // // // // //                   padding: "0.8rem",
// // // // // //                   borderRadius: "10px",
// // // // // //                   fontSize: "0.9rem",
// // // // // //                   fontWeight: "500",
// // // // // //                   cursor:
// // // // // //                     isLoadingProducts || productsModalOpened
// // // // // //                       ? "not-allowed"
// // // // // //                       : "pointer",
// // // // // //                   transition: "background-color 0.2s",
// // // // // //                   opacity: isLoadingProducts || productsModalOpened ? 0.6 : 1,
// // // // // //                   height: "48px",
// // // // // //                 }}
// // // // // //                 onMouseEnter={(e) => {
// // // // // //                   if (!isLoadingProducts && !productsModalOpened) {
// // // // // //                     e.target.style.background = "#059669";
// // // // // //                   }
// // // // // //                 }}
// // // // // //                 onMouseLeave={(e) => {
// // // // // //                   if (!isLoadingProducts && !productsModalOpened) {
// // // // // //                     e.target.style.background = "#10b981";
// // // // // //                   }
// // // // // //                 }}
// // // // // //               >
// // // // // //                 {getAddProductsButtonText()}
// // // // // //               </button>

// // // // // //               {/* Saved Products Section */}
// // // // // //               <div
// // // // // //                 style={{
// // // // // //                   flex: 1,
// // // // // //                   display: "flex",
// // // // // //                   flexDirection: "column",
// // // // // //                   overflow: "hidden",
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <div
// // // // // //                   style={{
// // // // // //                     fontSize: "0.9rem",
// // // // // //                     fontWeight: "600",
// // // // // //                     color: currentTheme.text,
// // // // // //                     marginBottom: "0.8rem",
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   Saved Products{" "}
// // // // // //                   {savedProducts.length > 0 && `(${savedProducts.length})`}
// // // // // //                 </div>

// // // // // //                 {isLoadingSavedProducts ? (
// // // // // //                   <div
// // // // // //                     style={{
// // // // // //                       textAlign: "center",
// // // // // //                       padding: "1.2rem",
// // // // // //                       color: currentTheme.text,
// // // // // //                       fontSize: "0.85rem",
// // // // // //                       border: `1px solid ${currentTheme.border}`,
// // // // // //                       borderRadius: "10px",
// // // // // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // // // //                       height: "70px",
// // // // // //                       display: "flex",
// // // // // //                       alignItems: "center",
// // // // // //                       justifyContent: "center",
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     Loading saved products...
// // // // // //                   </div>
// // // // // //                 ) : savedProducts.length > 0 ? (
// // // // // //                   <div
// // // // // //                     style={{
// // // // // //                       flex: 1,
// // // // // //                       overflowY: "auto",
// // // // // //                       border: `1px solid ${currentTheme.border}`,
// // // // // //                       borderRadius: "10px",
// // // // // //                       padding: "0.8rem",
// // // // // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // // // //                       maxHeight: "250px",
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     {savedProducts.map((product) => (
// // // // // //                       <div
// // // // // //                         key={product.video_product_id || product.id}
// // // // // //                         style={{
// // // // // //                           display: "flex",
// // // // // //                           alignItems: "center",
// // // // // //                           gap: "0.8rem",
// // // // // //                           padding: "0.8rem",
// // // // // //                           marginBottom: "0.5rem",
// // // // // //                           background: isDarkTheme ? "#374151" : "#ffffff",
// // // // // //                           borderRadius: "8px",
// // // // // //                           fontSize: "0.8rem",
// // // // // //                           position: "relative",
// // // // // //                         }}
// // // // // //                       >
// // // // // //                         {product.image_url ? (
// // // // // //                           <img
// // // // // //                             src={product.image_url}
// // // // // //                             alt={product.title}
// // // // // //                             style={{
// // // // // //                               width: "28px",
// // // // // //                               height: "28px",
// // // // // //                               borderRadius: "6px",
// // // // // //                               objectFit: "cover",
// // // // // //                             }}
// // // // // //                           />
// // // // // //                         ) : (
// // // // // //                           <div
// // // // // //                             style={{
// // // // // //                               width: "28px",
// // // // // //                               height: "28px",
// // // // // //                               background: "#3b82f6",
// // // // // //                               borderRadius: "6px",
// // // // // //                               display: "flex",
// // // // // //                               alignItems: "center",
// // // // // //                               justifyContent: "center",
// // // // // //                               color: "white",
// // // // // //                               fontSize: "0.75rem",
// // // // // //                               fontWeight: "bold",
// // // // // //                             }}
// // // // // //                           >
// // // // // //                             P
// // // // // //                           </div>
// // // // // //                         )}
// // // // // //                         <div style={{ flex: 1, minWidth: 0 }}>
// // // // // //                           <div
// // // // // //                             style={{
// // // // // //                               color: currentTheme.text,
// // // // // //                               fontWeight: "500",
// // // // // //                               whiteSpace: "nowrap",
// // // // // //                               overflow: "hidden",
// // // // // //                               textOverflow: "ellipsis",
// // // // // //                             }}
// // // // // //                           >
// // // // // //                             {product.title}
// // // // // //                           </div>
// // // // // //                           <div
// // // // // //                             style={{
// // // // // //                               color: "#10b981",
// // // // // //                               fontSize: "0.75rem",
// // // // // //                             }}
// // // // // //                           >
// // // // // //                             ${product.price}
// // // // // //                           </div>

// // // // // //                           {/* NEW: Enable Video on Product Page Checkbox */}
// // // // // //                           <div
// // // // // //                             style={{
// // // // // //                               display: "flex",
// // // // // //                               alignItems: "center",
// // // // // //                               gap: "0.5rem",
// // // // // //                               marginTop: "0.3rem",
// // // // // //                             }}
// // // // // //                           >
// // // // // //                             <input
// // // // // //                               type="checkbox"
// // // // // //                               checked={enableStatuses[product.id] || false}
// // // // // //                               onChange={() =>
// // // // // //                                 toggleEnableStatus(
// // // // // //                                   product.id,
// // // // // //                                   enableStatuses[product.id] || false
// // // // // //                                 )
// // // // // //                               }
// // // // // //                               style={{
// // // // // //                                 width: "14px",
// // // // // //                                 height: "14px",
// // // // // //                                 cursor: "pointer",
// // // // // //                               }}
// // // // // //                             />
// // // // // //                             <label
// // // // // //                               style={{
// // // // // //                                 fontSize: "0.7rem",
// // // // // //                                 color: currentTheme.text,
// // // // // //                                 cursor: "pointer",
// // // // // //                               }}
// // // // // //                             >
// // // // // //                               Enable Video on Product Page
// // // // // //                             </label>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                         {/* Remove Product Button */}
// // // // // //                         <button
// // // // // //                           onClick={() =>
// // // // // //                             handleRemoveProduct(
// // // // // //                               product.shopify_product_id || product.id,
// // // // // //                             )
// // // // // //                           }
// // // // // //                           style={{
// // // // // //                             background: "transparent",
// // // // // //                             border: "none",
// // // // // //                             color: "#ef4444",
// // // // // //                             cursor: "pointer",
// // // // // //                             padding: "4px",
// // // // // //                             borderRadius: "4px",
// // // // // //                             fontSize: "0.7rem",
// // // // // //                             display: "flex",
// // // // // //                             alignItems: "center",
// // // // // //                             justifyContent: "center",
// // // // // //                             width: "20px",
// // // // // //                             height: "20px",
// // // // // //                           }}
// // // // // //                           onMouseEnter={(e) => {
// // // // // //                             e.target.style.background = "#ef4444";
// // // // // //                             e.target.style.color = "white";
// // // // // //                           }}
// // // // // //                           onMouseLeave={(e) => {
// // // // // //                             e.target.style.background = "transparent";
// // // // // //                             e.target.style.color = "#ef4444";
// // // // // //                           }}
// // // // // //                           title="Remove product"
// // // // // //                         >
// // // // // //                           ✕
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 ) : (
// // // // // //                   <div
// // // // // //                     style={{
// // // // // //                       textAlign: "center",
// // // // // //                       padding: "1.2rem",
// // // // // //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // // // // //                       fontSize: "0.85rem",
// // // // // //                       fontStyle: "italic",
// // // // // //                       border: `1px dashed ${currentTheme.border}`,
// // // // // //                       borderRadius: "10px",
// // // // // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // // // //                       height: "70px",
// // // // // //                       display: "flex",
// // // // // //                       alignItems: "center",
// // // // // //                       justifyContent: "center",
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     No products saved for this video
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <style jsx>{`
// // // // // //             @keyframes scaleIn {
// // // // // //               from {
// // // // // //                 opacity: 0;
// // // // // //                 transform: scale(0.95) translateY(-10px);
// // // // // //               }
// // // // // //               to {
// // // // // //                 opacity: 1;
// // // // // //                 transform: scale(1) translateY(0);
// // // // // //               }
// // // // // //             }
// // // // // //           `}</style>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* ProductsModal is now controlled by the parent component through showProductsModal state */}
// // // // // //     </>
// // // // // //   );
// // // // // // }

// // // // components/videogallerycomponents/VideoOptionsModal.jsx
// // // import { useState, useEffect, useRef } from "react";
// // // import ProductsModal from "./ProductsModal";
// // // import VideoPlayerWithHover from "./VideoPlayerWithHover";

// // // export default function VideoOptionsModal({
// // //   showVideoOptions,
// // //   onHide,
// // //   onCopyUrl,
// // //   onDownload,
// // //   onLoadProducts,
// // //   onDelete,
// // //   isDarkTheme,
// // //   selectedProducts,
// // //   products,
// // //   onToggleProduct,
// // //   onSaveProducts,
// // //   showVideoPlayerModal,
// // //   productsModalOpened,
// // //   closeProductsModal,
// // // }) {
// // //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// // //   const [savedProducts, setSavedProducts] = useState([]);
// // //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
// // //   const [enableStatuses, setEnableStatuses] = useState({}); // Store enable status for each product
// // //   const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);

// // //   // Fetch saved products when modal opens or video changes
// // //   useEffect(() => {
// // //     if (showVideoOptions.show && showVideoOptions.video?.id) {
// // //       fetchSavedProducts();
// // //       fetchEnableStatuses();
// // //     }
// // //   }, [showVideoOptions.show, showVideoOptions.video?.id]);

// // //   // FIX: Auto-refresh when productsModalOpened becomes false (modal closes)
// // //   useEffect(() => {
// // //     if (
// // //       !productsModalOpened &&
// // //       showVideoOptions.show &&
// // //       showVideoOptions.video?.id
// // //     ) {
// // //       fetchSavedProducts();
// // //       fetchEnableStatuses();
// // //     }
// // //   }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);

// // //   const fetchSavedProducts = async () => {
// // //     try {
// // //       setIsLoadingSavedProducts(true);
// // //       const response = await fetch(
// // //         `/api/video-products/${showVideoOptions.video.id}`,
// // //       );
// // //       const result = await response.json();

// // //       if (result.success) {
// // //         setSavedProducts(result.products);
// // //         console.log(
// // //           "✅ Loaded saved products for display:",
// // //           result.products.length,
// // //         );
// // //       } else {
// // //         console.error("Failed to fetch saved products:", result.error);
// // //         setSavedProducts([]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching saved products:", error);
// // //       setSavedProducts([]);
// // //     } finally {
// // //       setIsLoadingSavedProducts(false);
// // //     }
// // //   };

// // //   // NEW: Fetch enable statuses for all products in this video
// // //   const fetchEnableStatuses = async () => {
// // //     try {
// // //       const response = await fetch(
// // //         `/api/videooptionsmodal-enableoption?videoId=${showVideoOptions.video.id}`,
// // //       );
// // //       const result = await response.json();

// // //       if (result.success) {
// // //         // Create a map of product_id -> enable status
// // //         const statusMap = {};
// // //         result.data.forEach(item => {
// // //           statusMap[item.product_id] = item.status;
// // //         });
// // //         setEnableStatuses(statusMap);
// // //         console.log("✅ Loaded enable statuses:", statusMap);
// // //       } else {
// // //         console.error("Failed to fetch enable statuses:", result.error);
// // //         setEnableStatuses({});
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching enable statuses:", error);
// // //       setEnableStatuses({});
// // //     }
// // //   };

// // //   // NEW: Toggle enable status for a product
// // //   const toggleEnableStatus = async (productId, currentStatus) => {
// // //     const newStatus = !currentStatus;

// // //     try {
// // //       const response = await fetch('/api/videooptionsmodal-enableoption', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           videoId: showVideoOptions.video.id,
// // //           productId: productId,
// // //           status: newStatus
// // //         }),
// // //       });

// // //       const result = await response.json();

// // //       if (result.success) {
// // //         // Update local state immediately
// // //         setEnableStatuses(prev => ({
// // //           ...prev,
// // //           [productId]: newStatus
// // //         }));
// // //         console.log(`✅ Enable status updated to: ${newStatus}`);
// // //       } else {
// // //         console.error("Failed to update enable status:", result.error);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error updating enable status:", error);
// // //     }
// // //   };

// // //   const handleBackdropClick = (e) => {
// // //     if (e.target === e.currentTarget) {
// // //       onHide();
// // //     }
// // //   };

// // //   const handleOptionClick = (action) => {
// // //     action();
// // //     onHide();
// // //   };

// // //   const handleVideoClick = () => {
// // //     setShowFullScreenVideo(true);
// // //   };

// // //   const handleCloseFullScreenVideo = () => {
// // //     setShowFullScreenVideo(false);
// // //   };

// // //   // FIXED: Handle modal state properly
// // //   const handleAddProducts = async () => {
// // //     if (isLoadingProducts || productsModalOpened) {
// // //       console.log("⚠️ Modal already opening or opened, skipping");
// // //       return;
// // //     }

// // //     setIsLoadingProducts(true);

// // //     try {
// // //       // This will load products AND set the modal to show
// // //       if (onLoadProducts) {
// // //         await onLoadProducts(showVideoOptions.video);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error loading products:", error);
// // //     } finally {
// // //       setIsLoadingProducts(false);
// // //     }
// // //   };

// // //   const handleSaveProducts = async () => {
// // //     if (onSaveProducts) {
// // //       await onSaveProducts();
// // //     }
// // //   };

// // //   // NEW: Function to remove a product
// // //   const handleRemoveProduct = async (productId) => {
// // //     try {
// // //       const response = await fetch(
// // //         `/api/video-products/${showVideoOptions.video.id}/delete`,
// // //         {
// // //           method: "DELETE",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify({ productId }),
// // //         },
// // //       );

// // //       const result = await response.json();

// // //       if (result.success) {
// // //         // Remove the product from local state immediately
// // //         setSavedProducts((prev) =>
// // //           prev.filter(
// // //             (product) =>
// // //               product.shopify_product_id !== productId &&
// // //               product.id !== productId,
// // //           ),
// // //         );
// // //         // Also remove from enable statuses
// // //         setEnableStatuses(prev => {
// // //           const newStatuses = { ...prev };
// // //           delete newStatuses[productId];
// // //           return newStatuses;
// // //         });
// // //         console.log("✅ Product removed successfully");
// // //       } else {
// // //         console.error("Failed to remove product:", result.error);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error removing product:", error);
// // //     }
// // //   };

// // //   // Early return should be AFTER all hooks
// // //   if (!showVideoOptions.show) return null;

// // //   const themeStyles = {
// // //     light: {
// // //       background: "#ffffff",
// // //       text: "#1f2937",
// // //       border: "#e5e7eb",
// // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
// // //       hoverBackground: "#f3f4f6",
// // //       sectionBackground: "#f8fafc",
// // //     },
// // //     dark: {
// // //       background: "#374151",
// // //       text: "#f9fafb",
// // //       border: "#4b5563",
// // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
// // //       hoverBackground: "#4b5563",
// // //       sectionBackground: "#4b5563",
// // //     },
// // //   };

// // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // //   // Get the correct video URL
// // //   const videoUrl =
// // //     showVideoOptions.video?.videoUrl ||
// // //     showVideoOptions.video?.shopify_file_url;

// // //   // FIXED: Determine button text based on multiple states
// // //   const getAddProductsButtonText = () => {
// // //     if (isLoadingProducts) return "Loading Products...";
// // //     if (productsModalOpened) return "Opening...";
// // //     return "Add Products";
// // //   };

// // //   return (
// // //     <>
// // //       {/* Full Screen Video Preview */}
// // //       {showFullScreenVideo && videoUrl && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             top: 0,
// // //             left: 0,
// // //             right: 0,
// // //             bottom: 0,
// // //             zIndex: 10003,
// // //             background: "rgba(0, 0, 0, 0.9)",
// // //             display: "flex",
// // //             justifyContent: "center",
// // //             alignItems: "center",
// // //           }}
// // //           onClick={handleCloseFullScreenVideo}
// // //         >
// // //           <video
// // //             src={videoUrl}
// // //             controls
// // //             autoPlay
// // //             style={{
// // //               maxWidth: "90%",
// // //               maxHeight: "90%",
// // //               borderRadius: "8px",
// // //             }}
// // //             onClick={(e) => e.stopPropagation()}
// // //           />
// // //         </div>
// // //       )}

// // //       <div
// // //         style={{
// // //           position: "fixed",
// // //           top: 0,
// // //           left: 0,
// // //           right: 0,
// // //           bottom: 0,
// // //           zIndex: 10000,
// // //           background: "rgba(0, 0, 0, 0.5)",
// // //           display: "flex",
// // //           justifyContent: "center",
// // //           alignItems: "center",
// // //         }}
// // //         onClick={handleBackdropClick}
// // //       >
// // //         <div
// // //           style={{
// // //             background: currentTheme.background,
// // //             borderRadius: "12px",
// // //             border: `1px solid ${currentTheme.border}`,
// // //             boxShadow: currentTheme.shadow,
// // //             padding: "2.5rem",
// // //             maxWidth: "800px",
// // //             minWidth: "700px",
// // //             maxHeight: "calc(100vh - 4rem)",
// // //             height: "auto",
// // //             minHeight: "500px",
// // //             zIndex: 10001,
// // //             animation: "scaleIn 0.2s ease-out",
// // //             display: "flex",
// // //             flexDirection: "row",
// // //             justifyContent: "space-between",
// // //             alignItems: "flex-start",
// // //             gap: "2.5rem",
// // //             overflow: "hidden",
// // //             position: "relative",
// // //           }}
// // //         >
// // //           {/* Close Button */}
// // //           <button
// // //             onClick={onHide}
// // //             style={{
// // //               position: "absolute",
// // //               top: "1.5rem",
// // //               right: "1.5rem",
// // //               background: isDarkTheme ? "#374151" : "white",
// // //               border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // //               borderRadius: "50%",
// // //               width: "40px",
// // //               height: "40px",
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "center",
// // //               cursor: "pointer",
// // //               color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //               fontSize: "1.3rem",
// // //               fontWeight: "bold",
// // //               zIndex: 10002,
// // //               transition: "all 0.3s ease",
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               e.target.style.background = isDarkTheme ? "#4b5563" : "#f3f4f6";
// // //               e.target.style.color = isDarkTheme ? "#f9fafb" : "#1f2937";
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               e.target.style.background = isDarkTheme ? "#374151" : "white";
// // //               e.target.style.color = isDarkTheme ? "#9ca3af" : "#6b7280";
// // //             }}
// // //           >
// // //             ✕
// // //           </button>

// // //           {/* Left Column - Video Player */}
// // //           <div
// // //             style={{
// // //               flex: 1,
// // //               minWidth: "220px",
// // //               display: "flex",
// // //               flexDirection: "row",
// // //               gap: "2rem",
// // //               position: "relative",
// // //             }}
// // //           >
// // //             {/* Vertical Line Separator */}
// // //             <div
// // //               style={{
// // //                 position: "absolute",
// // //                 right: "-1.25rem",
// // //                 top: "0",
// // //                 bottom: "0",
// // //                 width: "1px",
// // //                 background: isDarkTheme ? "#4b5563" : "#e5e7eb",
// // //                 zIndex: 1,
// // //               }}
// // //             />

// // //             {/* Video Player Section */}
// // //             <div style={{ flex: 1 }}>
// // //               <h3
// // //                 style={{
// // //                   fontSize: "1.1rem",
// // //                   fontWeight: "600",
// // //                   color: currentTheme.text,
// // //                   margin: "0 0 1.2rem 0",
// // //                 }}
// // //               >
// // //                 Selected Video
// // //               </h3>

// // //               {/* Video Player with Hover - Shows the clicked video */}
// // //               {videoUrl ? (
// // //                 <div
// // //                   style={{
// // //                     width: "100%",
// // //                     height: "250px",
// // //                     display: "flex",
// // //                     justifyContent: "center",
// // //                     alignItems: "center",
// // //                     background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // //                     borderRadius: "10px",
// // //                     overflow: "hidden",
// // //                     cursor: "pointer",
// // //                   }}
// // //                   onClick={handleVideoClick}
// // //                 >
// // //                   <VideoPlayerWithHover
// // //                     videoUrl={videoUrl}
// // //                     thumbnailUrl={showVideoOptions.video?.thumbnail_url}
// // //                     title={showVideoOptions.video?.title}
// // //                     onVideoClick={handleVideoClick}
// // //                     isDarkTheme={isDarkTheme}
// // //                     height="250px"
// // //                     width="100%"
// // //                     objectFit="contain"
// // //                   />
// // //                 </div>
// // //               ) : (
// // //                 <div
// // //                   style={{
// // //                     height: "200px",
// // //                     background: isDarkTheme ? "#374151" : "#f3f4f6",
// // //                     borderRadius: "10px",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     justifyContent: "center",
// // //                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                     flexDirection: "column",
// // //                     gap: "0.8rem",
// // //                   }}
// // //                 >
// // //                   <div style={{ fontSize: "1.8rem" }}>🎬</div>
// // //                   <div style={{ fontSize: "1rem" }}>Video not available</div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Video Actions Section */}
// // //             <div
// // //               style={{
// // //                 marginTop: "50px",
// // //                 display: "flex",
// // //                 flexDirection: "column",
// // //                 justifyContent: "center",
// // //                 alignItems: "center",
// // //                 gap: "15px",
// // //               }}
// // //             >
// // //               <button
// // //                 onClick={() =>
// // //                   handleOptionClick(() =>
// // //                     onCopyUrl(showVideoOptions.video.shopify_file_url),
// // //                   )
// // //                 }
// // //                 title="Copy Video URL"
// // //                 style={{
// // //                   background: "transparent",
// // //                   border: "none",
// // //                   color: currentTheme.text,
// // //                   borderRadius: "10px",
// // //                   fontSize: "1.5rem",
// // //                   fontWeight: "500",
// // //                   cursor: "pointer",
// // //                   transition: "all 0.2s",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   width: "45px",
// // //                   height: "45px",
// // //                   opacity: 0.8,
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.transform = "scale(1.1)";
// // //                   e.target.style.opacity = "1";
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.transform = "scale(1)";
// // //                   e.target.style.opacity = "0.8";
// // //                 }}
// // //               >
// // //                 <img
// // //                   src="/link.png"
// // //                   alt="Copy Link"
// // //                   style={{
// // //                     width: "22px",
// // //                     height: "22px",
// // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // //                   }}
// // //                 />
// // //               </button>

// // //               <button
// // //                 onClick={() =>
// // //                   handleOptionClick(() => onDownload(showVideoOptions.video))
// // //                 }
// // //                 title="Download Video"
// // //                 style={{
// // //                   background: "transparent",
// // //                   border: "none",
// // //                   color: currentTheme.text,
// // //                   borderRadius: "10px",
// // //                   fontSize: "1.5rem",
// // //                   fontWeight: "500",
// // //                   cursor: "pointer",
// // //                   transition: "all 0.2s",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   width: "45px",
// // //                   height: "45px",
// // //                   opacity: 0.8,
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.transform = "scale(1.1)";
// // //                   e.target.style.opacity = "1";
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.transform = "scale(1)";
// // //                   e.target.style.opacity = "0.8";
// // //                 }}
// // //               >
// // //                 <img
// // //                   src="/download.png"
// // //                   alt="Download"
// // //                   style={{
// // //                     width: "22px",
// // //                     height: "22px",
// // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // //                   }}
// // //                 />
// // //               </button>

// // //               <button
// // //                 onClick={() =>
// // //                   handleOptionClick(() =>
// // //                     onDelete(
// // //                       showVideoOptions.video.id,
// // //                       showVideoOptions.video.title,
// // //                     ),
// // //                   )
// // //                 }
// // //                 title="Delete Video"
// // //                 style={{
// // //                   background: "transparent",
// // //                   border: "none",
// // //                   color: "#ef4444",
// // //                   borderRadius: "10px",
// // //                   fontSize: "1.5rem",
// // //                   fontWeight: "500",
// // //                   cursor: "pointer",
// // //                   transition: "all 0.2s",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   width: "45px",
// // //                   height: "45px",
// // //                   opacity: 0.8,
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.transform = "scale(1.1)";
// // //                   e.target.style.opacity = "1";
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.transform = "scale(1)";
// // //                   e.target.style.opacity = "0.8";
// // //                 }}
// // //               >
// // //                 <img
// // //                   src="/trash.png"
// // //                   alt="Delete"
// // //                   style={{
// // //                     width: "22px",
// // //                     height: "22px",
// // //                   }}
// // //                 />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Right Column - Products Section */}
// // //           <div
// // //             style={{
// // //               flex: 1,
// // //               minWidth: "300px",
// // //               display: "flex",
// // //               flexDirection: "column",
// // //               gap: "1.8rem",
// // //               height: "100%",
// // //               overflow: "hidden",
// // //             }}
// // //           >
// // //             {/* Products Section */}
// // //             <div
// // //               style={{
// // //                 display: "flex",
// // //                 flexDirection: "column",
// // //                 height: "100%",
// // //                 gap: "1.2rem",
// // //               }}
// // //             >
// // //               <h3
// // //                 style={{
// // //                   fontSize: "1.1rem",
// // //                   fontWeight: "600",
// // //                   color: currentTheme.text,
// // //                   margin: 0,
// // //                 }}
// // //               >
// // //                 Product Management
// // //               </h3>

// // //               <button
// // //                 onClick={handleAddProducts}
// // //                 disabled={isLoadingProducts || productsModalOpened}
// // //                 style={{
// // //                   width: "100%",
// // //                   background: "#10b981",
// // //                   color: "white",
// // //                   border: "none",
// // //                   padding: "0.8rem",
// // //                   borderRadius: "10px",
// // //                   fontSize: "0.9rem",
// // //                   fontWeight: "500",
// // //                   cursor:
// // //                     isLoadingProducts || productsModalOpened
// // //                       ? "not-allowed"
// // //                       : "pointer",
// // //                   transition: "background-color 0.2s",
// // //                   opacity: isLoadingProducts || productsModalOpened ? 0.6 : 1,
// // //                   height: "48px",
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   if (!isLoadingProducts && !productsModalOpened) {
// // //                     e.target.style.background = "#059669";
// // //                   }
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   if (!isLoadingProducts && !productsModalOpened) {
// // //                     e.target.style.background = "#10b981";
// // //                   }
// // //                 }}
// // //               >
// // //                 {getAddProductsButtonText()}
// // //               </button>

// // //               {/* Saved Products Section */}
// // //               <div
// // //                 style={{
// // //                   flex: 1,
// // //                   display: "flex",
// // //                   flexDirection: "column",
// // //                   overflow: "hidden",
// // //                 }}
// // //               >
// // //                 <div
// // //                   style={{
// // //                     fontSize: "0.9rem",
// // //                     fontWeight: "600",
// // //                     color: currentTheme.text,
// // //                     marginBottom: "0.8rem",
// // //                   }}
// // //                 >
// // //                   Saved Products{" "}
// // //                   {savedProducts.length > 0 && `(${savedProducts.length})`}
// // //                 </div>

// // //                 {isLoadingSavedProducts ? (
// // //                   <div
// // //                     style={{
// // //                       textAlign: "center",
// // //                       padding: "1.2rem",
// // //                       color: currentTheme.text,
// // //                       fontSize: "0.85rem",
// // //                       border: `1px solid ${currentTheme.border}`,
// // //                       borderRadius: "10px",
// // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // //                       height: "70px",
// // //                       display: "flex",
// // //                       alignItems: "center",
// // //                       justifyContent: "center",
// // //                     }}
// // //                   >
// // //                     Loading saved products...
// // //                   </div>
// // //                 ) : savedProducts.length > 0 ? (
// // //                   <div
// // //                     style={{
// // //                       flex: 1,
// // //                       overflowY: "auto",
// // //                       border: `1px solid ${currentTheme.border}`,
// // //                       borderRadius: "10px",
// // //                       padding: "0.8rem",
// // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // //                       maxHeight: "250px",
// // //                     }}
// // //                   >
// // //                     {savedProducts.map((product) => (
// // //                       <div
// // //                         key={product.video_product_id || product.id}
// // //                         style={{
// // //                           display: "flex",
// // //                           alignItems: "center",
// // //                           gap: "0.8rem",
// // //                           padding: "0.8rem",
// // //                           marginBottom: "0.5rem",
// // //                           background: isDarkTheme ? "#374151" : "#ffffff",
// // //                           borderRadius: "8px",
// // //                           fontSize: "0.8rem",
// // //                           position: "relative",
// // //                         }}
// // //                       >
// // //                         {product.image_url ? (
// // //                           <img
// // //                             src={product.image_url}
// // //                             alt={product.title}
// // //                             style={{
// // //                               width: "28px",
// // //                               height: "28px",
// // //                               borderRadius: "6px",
// // //                               objectFit: "cover",
// // //                             }}
// // //                           />
// // //                         ) : (
// // //                           <div
// // //                             style={{
// // //                               width: "28px",
// // //                               height: "28px",
// // //                               background: "#3b82f6",
// // //                               borderRadius: "6px",
// // //                               display: "flex",
// // //                               alignItems: "center",
// // //                               justifyContent: "center",
// // //                               color: "white",
// // //                               fontSize: "0.75rem",
// // //                               fontWeight: "bold",
// // //                             }}
// // //                           >
// // //                             P
// // //                           </div>
// // //                         )}
// // //                         <div style={{ flex: 1, minWidth: 0 }}>
// // //                           <div
// // //                             style={{
// // //                               color: currentTheme.text,
// // //                               fontWeight: "500",
// // //                               whiteSpace: "nowrap",
// // //                               overflow: "hidden",
// // //                               textOverflow: "ellipsis",
// // //                             }}
// // //                           >
// // //                             {product.title}
// // //                           </div>
// // //                           <div
// // //                             style={{
// // //                               color: "#10b981",
// // //                               fontSize: "0.75rem",
// // //                             }}
// // //                           >
// // //                             ${product.price}
// // //                           </div>

// // //                           {/* NEW: Enable Video on Product Page Checkbox */}
// // //                           <div
// // //                             style={{
// // //                               display: "flex",
// // //                               alignItems: "center",
// // //                               gap: "0.5rem",
// // //                               marginTop: "0.3rem",
// // //                             }}
// // //                           >
// // //                             <input
// // //                               type="checkbox"
// // //                               checked={enableStatuses[product.id] || false}
// // //                               onChange={() =>
// // //                                 toggleEnableStatus(
// // //                                   product.id,
// // //                                   enableStatuses[product.id] || false
// // //                                 )
// // //                               }
// // //                               style={{
// // //                                 width: "14px",
// // //                                 height: "14px",
// // //                                 cursor: "pointer",
// // //                               }}
// // //                             />
// // //                             <label
// // //                               style={{
// // //                                 fontSize: "0.7rem",
// // //                                 color: currentTheme.text,
// // //                                 cursor: "pointer",
// // //                               }}
// // //                             >
// // //                               Enable Video on Product Page
// // //                             </label>
// // //                           </div>
// // //                         </div>
// // //                         {/* Remove Product Button */}
// // //                         <button
// // //                           onClick={() =>
// // //                             handleRemoveProduct(
// // //                               product.shopify_product_id || product.id,
// // //                             )
// // //                           }
// // //                           style={{
// // //                             background: "transparent",
// // //                             border: "none",
// // //                             color: "#ef4444",
// // //                             cursor: "pointer",
// // //                             padding: "4px",
// // //                             borderRadius: "4px",
// // //                             fontSize: "0.7rem",
// // //                             display: "flex",
// // //                             alignItems: "center",
// // //                             justifyContent: "center",
// // //                             width: "20px",
// // //                             height: "20px",
// // //                           }}
// // //                           onMouseEnter={(e) => {
// // //                             e.target.style.background = "#ef4444";
// // //                             e.target.style.color = "white";
// // //                           }}
// // //                           onMouseLeave={(e) => {
// // //                             e.target.style.background = "transparent";
// // //                             e.target.style.color = "#ef4444";
// // //                           }}
// // //                           title="Remove product"
// // //                         >
// // //                           ✕
// // //                         </button>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div
// // //                     style={{
// // //                       textAlign: "center",
// // //                       padding: "1.2rem",
// // //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                       fontSize: "0.85rem",
// // //                       fontStyle: "italic",
// // //                       border: `1px dashed ${currentTheme.border}`,
// // //                       borderRadius: "10px",
// // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // //                       height: "70px",
// // //                       display: "flex",
// // //                       alignItems: "center",
// // //                       justifyContent: "center",
// // //                     }}
// // //                   >
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

// // //       {/* ProductsModal is now controlled by the parent component through showProductsModal state */}
// // //     </>
// // //   );
// // // }

// // // // // components/videogallerycomponents/VideoOptionsModal.jsx
// // // // import { useState, useEffect, useRef } from "react";
// // // // import ProductsModal from "./ProductsModal";
// // // // import VideoPlayerWithHover from "./VideoPlayerWithHover";

// // // // export default function VideoOptionsModal({
// // // //   showVideoOptions,
// // // //   onHide,
// // // //   onCopyUrl,
// // // //   onDownload,
// // // //   onLoadProducts,
// // // //   onDelete,
// // // //   isDarkTheme,
// // // //   selectedProducts,
// // // //   products,
// // // //   onToggleProduct,
// // // //   onSaveProducts,
// // // //   showVideoPlayerModal,
// // // //   productsModalOpened,
// // // //   closeProductsModal,
// // // // }) {
// // // //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// // // //   const [savedProducts, setSavedProducts] = useState([]);
// // // //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
// // // //   const [enableStatuses, setEnableStatuses] = useState({});
// // // //   const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
// // // //   const [showProductsModal, setShowProductsModal] = useState(false);

// // // //   // Fetch saved products when modal opens or video changes
// // // //   useEffect(() => {
// // // //     if (showVideoOptions.show && showVideoOptions.video?.id) {
// // // //       fetchSavedProducts();
// // // //       fetchEnableStatuses();
// // // //     }
// // // //   }, [showVideoOptions.show, showVideoOptions.video?.id]);

// // // //   // Auto-refresh when productsModalOpened becomes false (modal closes)
// // // //   useEffect(() => {
// // // //     if (!productsModalOpened && showVideoOptions.show && showVideoOptions.video?.id) {
// // // //       fetchSavedProducts();
// // // //       fetchEnableStatuses();
// // // //     }
// // // //   }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);

// // // //   const fetchSavedProducts = async () => {
// // // //     try {
// // // //       setIsLoadingSavedProducts(true);
// // // //       const response = await fetch(
// // // //         `/api/video-products/${showVideoOptions.video.id}`,
// // // //       );
// // // //       const result = await response.json();

// // // //       if (result.success) {
// // // //         setSavedProducts(result.products);
// // // //         console.log("✅ Loaded saved products for display:", result.products.length);
// // // //       } else {
// // // //         console.error("Failed to fetch saved products:", result.error);
// // // //         setSavedProducts([]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching saved products:", error);
// // // //       setSavedProducts([]);
// // // //     } finally {
// // // //       setIsLoadingSavedProducts(false);
// // // //     }
// // // //   };

// // // //   const fetchEnableStatuses = async () => {
// // // //     try {
// // // //       const response = await fetch(
// // // //         `/api/videooptionsmodal-enableoption?videoId=${showVideoOptions.video.id}`,
// // // //       );
// // // //       const result = await response.json();

// // // //       if (result.success) {
// // // //         const statusMap = {};
// // // //         result.data.forEach(item => {
// // // //           statusMap[item.product_id] = item.status;
// // // //         });
// // // //         setEnableStatuses(statusMap);
// // // //         console.log("✅ Loaded enable statuses:", statusMap);
// // // //       } else {
// // // //         console.error("Failed to fetch enable statuses:", result.error);
// // // //         setEnableStatuses({});
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching enable statuses:", error);
// // // //       setEnableStatuses({});
// // // //     }
// // // //   };

// // // //   const toggleEnableStatus = async (productId, currentStatus) => {
// // // //     const newStatus = !currentStatus;

// // // //     try {
// // // //       const response = await fetch('/api/videooptionsmodal-enableoption', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           videoId: showVideoOptions.video.id,
// // // //           productId: productId,
// // // //           status: newStatus
// // // //         }),
// // // //       });

// // // //       const result = await response.json();

// // // //       if (result.success) {
// // // //         setEnableStatuses(prev => ({
// // // //           ...prev,
// // // //           [productId]: newStatus
// // // //         }));
// // // //         console.log(`✅ Enable status updated to: ${newStatus}`);
// // // //       } else {
// // // //         console.error("Failed to update enable status:", result.error);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error updating enable status:", error);
// // // //     }
// // // //   };

// // // //   const handleBackdropClick = (e) => {
// // // //     if (e.target === e.currentTarget) {
// // // //       onHide();
// // // //     }
// // // //   };

// // // //   const handleOptionClick = (action) => {
// // // //     action();
// // // //     onHide();
// // // //   };

// // // //   const handleVideoClick = () => {
// // // //     setShowFullScreenVideo(true);
// // // //   };

// // // //   const handleCloseFullScreenVideo = () => {
// // // //     setShowFullScreenVideo(false);
// // // //   };

// // // //   // NEW: Handle opening products modal
// // // //   const handleAddProducts = async () => {
// // // //     if (isLoadingProducts || productsModalOpened) {
// // // //       console.log("⚠️ Modal already opening or opened, skipping");
// // // //       return;
// // // //     }

// // // //     setIsLoadingProducts(true);
// // // //     try {
// // // //       // Pass the saved products to the ProductsModal
// // // //       if (onLoadProducts) {
// // // //         await onLoadProducts(showVideoOptions.video, savedProducts);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error loading products:", error);
// // // //     } finally {
// // // //       setIsLoadingProducts(false);
// // // //     }
// // // //   };

// // // //   // NEW: Handle removing a product
// // // //   const handleRemoveProduct = async (productId) => {
// // // //     try {
// // // //       const response = await fetch(
// // // //         `/api/video-products/${showVideoOptions.video.id}`,
// // // //         {
// // // //           method: "DELETE",
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //           },
// // // //           body: JSON.stringify({ productId }),
// // // //         },
// // // //       );

// // // //       const result = await response.json();

// // // //       if (result.success) {
// // // //         // Remove the product from local state immediately
// // // //         setSavedProducts((prev) =>
// // // //           prev.filter(
// // // //             (product) =>
// // // //               product.shopify_product_id !== productId &&
// // // //               product.id !== productId,
// // // //           ),
// // // //         );
// // // //         // Also remove from enable statuses
// // // //         setEnableStatuses(prev => {
// // // //           const newStatuses = { ...prev };
// // // //           delete newStatuses[productId];
// // // //           return newStatuses;
// // // //         });
// // // //         console.log("✅ Product removed successfully");
// // // //       } else {
// // // //         console.error("Failed to remove product:", result.error);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error removing product:", error);
// // // //     }
// // // //   };

// // // //   // Early return should be AFTER all hooks
// // // //   if (!showVideoOptions.show) return null;

// // // //   const themeStyles = {
// // // //     light: {
// // // //       background: "#ffffff",
// // // //       text: "#1f2937",
// // // //       border: "#e5e7eb",
// // // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
// // // //       hoverBackground: "#f3f4f6",
// // // //       sectionBackground: "#f8fafc",
// // // //     },
// // // //     dark: {
// // // //       background: "#374151",
// // // //       text: "#f9fafb",
// // // //       border: "#4b5563",
// // // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
// // // //       hoverBackground: "#4b5563",
// // // //       sectionBackground: "#4b5563",
// // // //     },
// // // //   };

// // // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // // //   // Get the correct video URL
// // // //   const videoUrl =
// // // //     showVideoOptions.video?.videoUrl ||
// // // //     showVideoOptions.video?.shopify_file_url;

// // // //   // FIXED: Determine button text based on multiple states
// // // //   const getAddProductsButtonText = () => {
// // // //     if (isLoadingProducts) return "Loading Products...";
// // // //     if (productsModalOpened) return "Opening...";
// // // //     return "Add Products";
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* Full Screen Video Preview */}
// // // //       {showFullScreenVideo && videoUrl && (
// // // //         <div
// // // //           style={{
// // // //             position: "fixed",
// // // //             top: 0,
// // // //             left: 0,
// // // //             right: 0,
// // // //             bottom: 0,
// // // //             zIndex: 10003,
// // // //             background: "rgba(0, 0, 0, 0.9)",
// // // //             display: "flex",
// // // //             justifyContent: "center",
// // // //             alignItems: "center",
// // // //           }}
// // // //           onClick={handleCloseFullScreenVideo}
// // // //         >
// // // //           {/* Close Button */}
// // // //           <button
// // // //             onClick={handleCloseFullScreenVideo}
// // // //             style={{
// // // //               position: "absolute",
// // // //               top: "2rem",
// // // //               right: "2rem",
// // // //               background: "rgba(0, 0, 0, 0.7)",
// // // //               border: "1px solid #fff",
// // // //               borderRadius: "50%",
// // // //               width: "50px",
// // // //               height: "50px",
// // // //               display: "flex",
// // // //               alignItems: "center",
// // // //               justifyContent: "center",
// // // //               cursor: "pointer",
// // // //               color: "white",
// // // //               fontSize: "1.5rem",
// // // //               fontWeight: "bold",
// // // //               zIndex: 10004,
// // // //             }}
// // // //           >
// // // //             ✕
// // // //           </button>
// // // //           <video
// // // //             src={videoUrl}
// // // //             controls
// // // //             autoPlay
// // // //             style={{
// // // //               maxWidth: "90%",
// // // //               maxHeight: "90%",
// // // //               borderRadius: "8px",
// // // //             }}
// // // //             onClick={(e) => e.stopPropagation()}
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       <div
// // // //         style={{
// // // //           position: "fixed",
// // // //           top: 0,
// // // //           left: 0,
// // // //           right: 0,
// // // //           bottom: 0,
// // // //           zIndex: 10000,
// // // //           background: "rgba(0, 0, 0, 0.5)",
// // // //           display: "flex",
// // // //           justifyContent: "center",
// // // //           alignItems: "center",
// // // //         }}
// // // //         onClick={handleBackdropClick}
// // // //       >
// // // //         <div
// // // //           style={{
// // // //             background: currentTheme.background,
// // // //             borderRadius: "12px",
// // // //             border: `1px solid ${currentTheme.border}`,
// // // //             boxShadow: currentTheme.shadow,
// // // //             padding: "2.5rem",
// // // //             maxWidth: "800px",
// // // //             minWidth: "700px",
// // // //             maxHeight: "calc(100vh - 4rem)",
// // // //             height: "auto",
// // // //             minHeight: "500px",
// // // //             zIndex: 10001,
// // // //             animation: "scaleIn 0.2s ease-out",
// // // //             display: "flex",
// // // //             flexDirection: "row",
// // // //             justifyContent: "space-between",
// // // //             alignItems: "flex-start",
// // // //             gap: "2.5rem",
// // // //             overflow: "hidden",
// // // //             position: "relative",
// // // //           }}
// // // //         >
// // // //           {/* Close Button */}
// // // //           <button
// // // //             onClick={onHide}
// // // //             style={{
// // // //               position: "absolute",
// // // //               top: "1.5rem",
// // // //               right: "1.5rem",
// // // //               background: isDarkTheme ? "#374151" : "white",
// // // //               border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // // //               borderRadius: "50%",
// // // //               width: "40px",
// // // //               height: "40px",
// // // //               display: "flex",
// // // //               alignItems: "center",
// // // //               justifyContent: "center",
// // // //               cursor: "pointer",
// // // //               color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // // //               fontSize: "1.3rem",
// // // //               fontWeight: "bold",
// // // //               zIndex: 10002,
// // // //               transition: "all 0.3s ease",
// // // //             }}
// // // //             onMouseEnter={(e) => {
// // // //               e.target.style.background = isDarkTheme ? "#4b5563" : "#f3f4f6";
// // // //               e.target.style.color = isDarkTheme ? "#f9fafb" : "#1f2937";
// // // //             }}
// // // //             onMouseLeave={(e) => {
// // // //               e.target.style.background = isDarkTheme ? "#374151" : "white";
// // // //               e.target.style.color = isDarkTheme ? "#9ca3af" : "#6b7280";
// // // //             }}
// // // //           >
// // // //             ✕
// // // //           </button>

// // // //           {/* Left Column - Video Player */}
// // // //           <div
// // // //             style={{
// // // //               flex: 1,
// // // //               minWidth: "220px",
// // // //               display: "flex",
// // // //               flexDirection: "row",
// // // //               gap: "2rem",
// // // //               position: "relative",
// // // //             }}
// // // //           >
// // // //             {/* Vertical Line Separator */}
// // // //             <div
// // // //               style={{
// // // //                 position: "absolute",
// // // //                 right: "-1.25rem",
// // // //                 top: "0",
// // // //                 bottom: "0",
// // // //                 width: "1px",
// // // //                 background: isDarkTheme ? "#4b5563" : "#e5e7eb",
// // // //                 zIndex: 1,
// // // //               }}
// // // //             />

// // // //             {/* Video Player Section */}
// // // //             <div style={{ flex: 1 }}>
// // // //               <h3
// // // //                 style={{
// // // //                   fontSize: "1.1rem",
// // // //                   fontWeight: "600",
// // // //                   color: currentTheme.text,
// // // //                   margin: "0 0 1.2rem 0",
// // // //                 }}
// // // //               >
// // // //                 Selected Video
// // // //               </h3>

// // // //               {/* Video Player with Hover - Shows the clicked video */}
// // // //               {videoUrl ? (
// // // //                 <div
// // // //                   style={{
// // // //                     width: "100%",
// // // //                     height: "250px",
// // // //                     display: "flex",
// // // //                     justifyContent: "center",
// // // //                     alignItems: "center",
// // // //                     background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // //                     borderRadius: "10px",
// // // //                     overflow: "hidden",
// // // //                     cursor: "pointer",
// // // //                   }}
// // // //                   onClick={handleVideoClick}
// // // //                 >
// // // //                   <VideoPlayerWithHover
// // // //                     videoUrl={videoUrl}
// // // //                     thumbnailUrl={showVideoOptions.video?.thumbnail_url}
// // // //                     title={showVideoOptions.video?.title}
// // // //                     onVideoClick={handleVideoClick}
// // // //                     isDarkTheme={isDarkTheme}
// // // //                     height="250px"
// // // //                     width="100%"
// // // //                     objectFit="contain"
// // // //                   />
// // // //                 </div>
// // // //               ) : (
// // // //                 <div
// // // //                   style={{
// // // //                     height: "200px",
// // // //                     background: isDarkTheme ? "#374151" : "#f3f4f6",
// // // //                     borderRadius: "10px",
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     justifyContent: "center",
// // // //                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // // //                     flexDirection: "column",
// // // //                     gap: "0.8rem",
// // // //                   }}
// // // //                 >
// // // //                   <div style={{ fontSize: "1.8rem" }}>🎬</div>
// // // //                   <div style={{ fontSize: "1rem" }}>Video not available</div>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Video Actions Section */}
// // // //             <div
// // // //               style={{
// // // //                 marginTop: "50px",
// // // //                 display: "flex",
// // // //                 flexDirection: "column",
// // // //                 justifyContent: "center",
// // // //                 alignItems: "center",
// // // //                 gap: "15px",
// // // //               }}
// // // //             >
// // // //               <button
// // // //                 onClick={() =>
// // // //                   handleOptionClick(() =>
// // // //                     onCopyUrl(showVideoOptions.video.shopify_file_url),
// // // //                   )
// // // //                 }
// // // //                 title="Copy Video URL"
// // // //                 style={{
// // // //                   background: "transparent",
// // // //                   border: "none",
// // // //                   color: currentTheme.text,
// // // //                   borderRadius: "10px",
// // // //                   fontSize: "1.5rem",
// // // //                   fontWeight: "500",
// // // //                   cursor: "pointer",
// // // //                   transition: "all 0.2s",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   justifyContent: "center",
// // // //                   width: "45px",
// // // //                   height: "45px",
// // // //                   opacity: 0.8,
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   e.target.style.transform = "scale(1.1)";
// // // //                   e.target.style.opacity = "1";
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.target.style.transform = "scale(1)";
// // // //                   e.target.style.opacity = "0.8";
// // // //                 }}
// // // //               >
// // // //                 <img
// // // //                   src="/link.png"
// // // //                   alt="Copy Link"
// // // //                   style={{
// // // //                     width: "22px",
// // // //                     height: "22px",
// // // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // // //                   }}
// // // //                 />
// // // //               </button>

// // // //               <button
// // // //                 onClick={() =>
// // // //                   handleOptionClick(() => onDownload(showVideoOptions.video))
// // // //                 }
// // // //                 title="Download Video"
// // // //                 style={{
// // // //                   background: "transparent",
// // // //                   border: "none",
// // // //                   color: currentTheme.text,
// // // //                   borderRadius: "10px",
// // // //                   fontSize: "1.5rem",
// // // //                   fontWeight: "500",
// // // //                   cursor: "pointer",
// // // //                   transition: "all 0.2s",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   justifyContent: "center",
// // // //                   width: "45px",
// // // //                   height: "45px",
// // // //                   opacity: 0.8,
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   e.target.style.transform = "scale(1.1)";
// // // //                   e.target.style.opacity = "1";
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.target.style.transform = "scale(1)";
// // // //                   e.target.style.opacity = "0.8";
// // // //                 }}
// // // //               >
// // // //                 <img
// // // //                   src="/download.png"
// // // //                   alt="Download"
// // // //                   style={{
// // // //                     width: "22px",
// // // //                     height: "22px",
// // // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // // //                   }}
// // // //                 />
// // // //               </button>

// // // //               <button
// // // //                 onClick={() =>
// // // //                   handleOptionClick(() =>
// // // //                     onDelete(
// // // //                       showVideoOptions.video.id,
// // // //                       showVideoOptions.video.title,
// // // //                     ),
// // // //                   )
// // // //                 }
// // // //                 title="Delete Video"
// // // //                 style={{
// // // //                   background: "transparent",
// // // //                   border: "none",
// // // //                   color: "#ef4444",
// // // //                   borderRadius: "10px",
// // // //                   fontSize: "1.5rem",
// // // //                   fontWeight: "500",
// // // //                   cursor: "pointer",
// // // //                   transition: "all 0.2s",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   justifyContent: "center",
// // // //                   width: "45px",
// // // //                   height: "45px",
// // // //                   opacity: 0.8,
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   e.target.style.transform = "scale(1.1)";
// // // //                   e.target.style.opacity = "1";
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.target.style.transform = "scale(1)";
// // // //                   e.target.style.opacity = "0.8";
// // // //                 }}
// // // //               >
// // // //                 <img
// // // //                   src="/trash.png"
// // // //                   alt="Delete"
// // // //                   style={{
// // // //                     width: "22px",
// // // //                     height: "22px",
// // // //                   }}
// // // //                 />
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Right Column - Products Section */}
// // // //           <div
// // // //             style={{
// // // //               flex: 1,
// // // //               minWidth: "300px",
// // // //               display: "flex",
// // // //               flexDirection: "column",
// // // //               gap: "1.8rem",
// // // //               height: "100%",
// // // //               overflow: "hidden",
// // // //             }}
// // // //           >
// // // //             {/* Products Section */}
// // // //             <div
// // // //               style={{
// // // //                 display: "flex",
// // // //                 flexDirection: "column",
// // // //                 height: "100%",
// // // //                 gap: "1.2rem",
// // // //               }}
// // // //             >
// // // //               <h3
// // // //                 style={{
// // // //                   fontSize: "1.1rem",
// // // //                   fontWeight: "600",
// // // //                   color: currentTheme.text,
// // // //                   margin: 0,
// // // //                 }}
// // // //               >
// // // //                 Product Management
// // // //               </h3>

// // // //               <button
// // // //                 onClick={handleAddProducts}
// // // //                 disabled={isLoadingProducts || productsModalOpened}
// // // //                 style={{
// // // //                   width: "100%",
// // // //                   background: "#10b981",
// // // //                   color: "white",
// // // //                   border: "none",
// // // //                   padding: "0.8rem",
// // // //                   borderRadius: "10px",
// // // //                   fontSize: "0.9rem",
// // // //                   fontWeight: "500",
// // // //                   cursor:
// // // //                     isLoadingProducts || productsModalOpened
// // // //                       ? "not-allowed"
// // // //                       : "pointer",
// // // //                   transition: "background-color 0.2s",
// // // //                   opacity: isLoadingProducts || productsModalOpened ? 0.6 : 1,
// // // //                   height: "48px",
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   if (!isLoadingProducts && !productsModalOpened) {
// // // //                     e.target.style.background = "#059669";
// // // //                   }
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   if (!isLoadingProducts && !productsModalOpened) {
// // // //                     e.target.style.background = "#10b981";
// // // //                   }
// // // //                 }}
// // // //               >
// // // //                 {getAddProductsButtonText()}
// // // //               </button>

// // // //               {/* Saved Products Section */}
// // // //               <div
// // // //                 style={{
// // // //                   flex: 1,
// // // //                   display: "flex",
// // // //                   flexDirection: "column",
// // // //                   overflow: "hidden",
// // // //                 }}
// // // //               >
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "0.9rem",
// // // //                     fontWeight: "600",
// // // //                     color: currentTheme.text,
// // // //                     marginBottom: "0.8rem",
// // // //                   }}
// // // //                 >
// // // //                   Saved Products{" "}
// // // //                   {savedProducts.length > 0 && `(${savedProducts.length})`}
// // // //                 </div>

// // // //                 {isLoadingSavedProducts ? (
// // // //                   <div
// // // //                     style={{
// // // //                       textAlign: "center",
// // // //                       padding: "1.2rem",
// // // //                       color: currentTheme.text,
// // // //                       fontSize: "0.85rem",
// // // //                       border: `1px solid ${currentTheme.border}`,
// // // //                       borderRadius: "10px",
// // // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // //                       height: "70px",
// // // //                       display: "flex",
// // // //                       alignItems: "center",
// // // //                       justifyContent: "center",
// // // //                     }}
// // // //                   >
// // // //                     Loading saved products...
// // // //                   </div>
// // // //                 ) : savedProducts.length > 0 ? (
// // // //                   <div
// // // //                     style={{
// // // //                       flex: 1,
// // // //                       overflowY: "auto",
// // // //                       border: `1px solid ${currentTheme.border}`,
// // // //                       borderRadius: "10px",
// // // //                       padding: "0.8rem",
// // // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // //                       maxHeight: "250px",
// // // //                     }}
// // // //                   >
// // // //                     {savedProducts.map((product) => (
// // // //                       <div
// // // //                         key={product.video_product_id || product.id}
// // // //                         style={{
// // // //                           display: "flex",
// // // //                           alignItems: "center",
// // // //                           gap: "0.8rem",
// // // //                           padding: "0.8rem",
// // // //                           marginBottom: "0.5rem",
// // // //                           background: isDarkTheme ? "#374151" : "#ffffff",
// // // //                           borderRadius: "8px",
// // // //                           fontSize: "0.8rem",
// // // //                           position: "relative",
// // // //                         }}
// // // //                       >
// // // //                         {product.image_url ? (
// // // //                           <img
// // // //                             src={product.image_url}
// // // //                             alt={product.title}
// // // //                             style={{
// // // //                               width: "28px",
// // // //                               height: "28px",
// // // //                               borderRadius: "6px",
// // // //                               objectFit: "cover",
// // // //                             }}
// // // //                           />
// // // //                         ) : (
// // // //                           <div
// // // //                             style={{
// // // //                               width: "28px",
// // // //                               height: "28px",
// // // //                               background: "#3b82f6",
// // // //                               borderRadius: "6px",
// // // //                               display: "flex",
// // // //                               alignItems: "center",
// // // //                               justifyContent: "center",
// // // //                               color: "white",
// // // //                               fontSize: "0.75rem",
// // // //                               fontWeight: "bold",
// // // //                             }}
// // // //                           >
// // // //                             P
// // // //                           </div>
// // // //                         )}
// // // //                         <div style={{ flex: 1, minWidth: 0 }}>
// // // //                           <div
// // // //                             style={{
// // // //                               color: currentTheme.text,
// // // //                               fontWeight: "500",
// // // //                               whiteSpace: "nowrap",
// // // //                               overflow: "hidden",
// // // //                               textOverflow: "ellipsis",
// // // //                             }}
// // // //                           >
// // // //                             {product.title}
// // // //                           </div>
// // // //                           <div
// // // //                             style={{
// // // //                               color: "#10b981",
// // // //                               fontSize: "0.75rem",
// // // //                             }}
// // // //                           >
// // // //                             ${product.price}
// // // //                           </div>

// // // //                           {/* Enable Video on Product Page Checkbox */}
// // // //                           <div
// // // //                             style={{
// // // //                               display: "flex",
// // // //                               alignItems: "center",
// // // //                               gap: "0.5rem",
// // // //                               marginTop: "0.3rem",
// // // //                             }}
// // // //                           >
// // // //                             <input
// // // //                               type="checkbox"
// // // //                               checked={enableStatuses[product.id] || false}
// // // //                               onChange={() =>
// // // //                                 toggleEnableStatus(
// // // //                                   product.id,
// // // //                                   enableStatuses[product.id] || false
// // // //                                 )
// // // //                               }
// // // //                               style={{
// // // //                                 width: "14px",
// // // //                                 height: "14px",
// // // //                                 cursor: "pointer",
// // // //                               }}
// // // //                             />
// // // //                             <label
// // // //                               style={{
// // // //                                 fontSize: "0.7rem",
// // // //                                 color: currentTheme.text,
// // // //                                 cursor: "pointer",
// // // //                               }}
// // // //                             >
// // // //                               Enable Video on Product Page
// // // //                             </label>
// // // //                           </div>
// // // //                         </div>
// // // //                         {/* Remove Product Button */}
// // // //                         <button
// // // //                           onClick={() =>
// // // //                             handleRemoveProduct(
// // // //                               product.shopify_product_id || product.id,
// // // //                             )
// // // //                           }
// // // //                           style={{
// // // //                             background: "transparent",
// // // //                             border: "none",
// // // //                             color: "#ef4444",
// // // //                             cursor: "pointer",
// // // //                             padding: "4px",
// // // //                             borderRadius: "4px",
// // // //                             fontSize: "0.7rem",
// // // //                             display: "flex",
// // // //                             alignItems: "center",
// // // //                             justifyContent: "center",
// // // //                             width: "20px",
// // // //                             height: "20px",
// // // //                           }}
// // // //                           onMouseEnter={(e) => {
// // // //                             e.target.style.background = "#ef4444";
// // // //                             e.target.style.color = "white";
// // // //                           }}
// // // //                           onMouseLeave={(e) => {
// // // //                             e.target.style.background = "transparent";
// // // //                             e.target.style.color = "#ef4444";
// // // //                           }}
// // // //                           title="Remove product"
// // // //                         >
// // // //                           ✕
// // // //                         </button>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div
// // // //                     style={{
// // // //                       textAlign: "center",
// // // //                       padding: "1.2rem",
// // // //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // // //                       fontSize: "0.85rem",
// // // //                       fontStyle: "italic",
// // // //                       border: `1px dashed ${currentTheme.border}`,
// // // //                       borderRadius: "10px",
// // // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // // //                       height: "70px",
// // // //                       display: "flex",
// // // //                       alignItems: "center",
// // // //                       justifyContent: "center",
// // // //                     }}
// // // //                   >
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
// // // //     </>
// // // //   );
// // // // }

// // // // components/videogallerycomponents/VideoOptionsModal.jsx
// // // import { useState, useEffect, useRef } from "react";
// // // import ProductsModal from "./ProductsModal";
// // // import VideoPlayerWithHover from "./VideoPlayerWithHover";
// // // export default function VideoOptionsModal({
// // //   showVideoOptions,
// // //   onHide,
// // //   onCopyUrl,
// // //   onDownload,
// // //   onLoadProducts,
// // //   onDelete,
// // //   isDarkTheme,
// // //   selectedProducts,
// // //   products,
// // //   onToggleProduct,
// // //   onSaveProducts,
// // //   showVideoPlayerModal,
// // //   productsModalOpened,
// // //   closeProductsModal,
// // // }) {
// // //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// // //   const [savedProducts, setSavedProducts] = useState([]);
// // //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
// // //   const [enableStatuses, setEnableStatuses] = useState({});
// // //   const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
// // //   const [showProductsModal, setShowProductsModal] = useState(false);
// // //   // Fetch saved products when modal opens or video changes
// // //   useEffect(() => {
// // //     if (showVideoOptions.show && showVideoOptions.video?.id) {
// // //       fetchSavedProducts();
// // //       fetchEnableStatuses();
// // //     }
// // //   }, [showVideoOptions.show, showVideoOptions.video?.id]);
// // //   // Auto-refresh when productsModalOpened becomes false (modal closes)
// // //   useEffect(() => {
// // //     if (!productsModalOpened && showVideoOptions.show && showVideoOptions.video?.id) {
// // //       fetchSavedProducts();
// // //       fetchEnableStatuses();
// // //     }
// // //   }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);
// // //   const fetchSavedProducts = async () => {
// // //     try {
// // //       setIsLoadingSavedProducts(true);
// // //       const response = await fetch(
// // //         `/api/video-products/${showVideoOptions.video.id}`,
// // //       );
// // //       const result = await response.json();
// // //       if (result.success) {
// // //         setSavedProducts(result.products);
// // //         console.log("✅ Loaded saved products for display:", result.products.length);
// // //       } else {
// // //         console.error("Failed to fetch saved products:", result.error);
// // //         setSavedProducts([]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching saved products:", error);
// // //       setSavedProducts([]);
// // //     } finally {
// // //       setIsLoadingSavedProducts(false);
// // //     }
// // //   };
// // //   const fetchEnableStatuses = async () => {
// // //     try {
// // //       const response = await fetch(
// // //         `/api/videooptionsmodal-enableoption?videoId=${showVideoOptions.video.id}`,
// // //       );
// // //       const result = await response.json();
// // //       if (result.success) {
// // //         const statusMap = {};
// // //         result.data.forEach(item => {
// // //           statusMap[item.product_id] = item.status;
// // //         });
// // //         setEnableStatuses(statusMap);
// // //         console.log("✅ Loaded enable statuses:", statusMap);
// // //       } else {
// // //         console.error("Failed to fetch enable statuses:", result.error);
// // //         setEnableStatuses({});
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching enable statuses:", error);
// // //       setEnableStatuses({});
// // //     }
// // //   };
// // //   const toggleEnableStatus = async (productId, currentStatus) => {
// // //     const newStatus = !currentStatus;

// // //     try {
// // //       const response = await fetch('/api/videooptionsmodal-enableoption', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           videoId: showVideoOptions.video.id,
// // //           productId: productId,
// // //           status: newStatus
// // //         }),
// // //       });
// // //       const result = await response.json();
// // //       if (result.success) {
// // //         setEnableStatuses(prev => ({
// // //           ...prev,
// // //           [productId]: newStatus
// // //         }));
// // //         console.log(`✅ Enable status updated to: ${newStatus}`);
// // //       } else {
// // //         console.error("Failed to update enable status:", result.error);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error updating enable status:", error);
// // //     }
// // //   };
// // //   const handleBackdropClick = (e) => {
// // //     if (e.target === e.currentTarget) {
// // //       onHide();
// // //     }
// // //   };
// // //   const handleOptionClick = (action) => {
// // //     action();
// // //     onHide();
// // //   };
// // //   const handleVideoClick = () => {
// // //     setShowFullScreenVideo(true);
// // //   };
// // //   const handleCloseFullScreenVideo = () => {
// // //     setShowFullScreenVideo(false);
// // //   };
// // //   // NEW: Handle opening products modal
// // //   const handleAddProducts = async () => {
// // //     if (isLoadingProducts || productsModalOpened) {
// // //       console.log("⚠️ Modal already opening or opened, skipping");
// // //       return;
// // //     }
// // //     setIsLoadingProducts(true);
// // //     try {
// // //       // Pass the saved products to the ProductsModal
// // //       if (onLoadProducts) {
// // //         await onLoadProducts(showVideoOptions.video, savedProducts);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error loading products:", error);
// // //     } finally {
// // //       setIsLoadingProducts(false);
// // //     }
// // //   };
// // //   // FIXED: Handle removing a product - use the correct API endpoint
// // //   const handleRemoveProduct = async (productId) => {
// // //     try {
// // //       console.log('🗑️ Removing product:', productId, 'from video:', showVideoOptions.video.id);

// // //       const response = await fetch(
// // //         `/api/video-products/${showVideoOptions.video.id}/delete`,
// // //         {
// // //           method: "DELETE",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify({ productId }),
// // //         },
// // //       );

// // //       const result = await response.json();
// // //       console.log('🗑️ Remove product response:', result);

// // //       if (result.success) {
// // //         // Remove the product from local state immediately
// // //         setSavedProducts((prev) =>
// // //           prev.filter(
// // //             (product) =>
// // //               product.shopify_product_id !== productId &&
// // //               product.id !== productId
// // //           ),
// // //         );
// // //         // Also remove from enable statuses
// // //         setEnableStatuses(prev => {
// // //           const newStatuses = { ...prev };
// // //           delete newStatuses[productId];
// // //           return newStatuses;
// // //         });
// // //         console.log("✅ Product removed successfully");
// // //       } else {
// // //         console.error("Failed to remove product:", result.error);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error removing product:", error);
// // //     }
// // //   };
// // //   // Early return should be AFTER all hooks
// // //   if (!showVideoOptions.show) return null;
// // //   const themeStyles = {
// // //     light: {
// // //       background: "#ffffff",
// // //       text: "#1f2937",
// // //       border: "#e5e7eb",
// // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
// // //       hoverBackground: "#f3f4f6",
// // //       sectionBackground: "#f8fafc",
// // //     },
// // //     dark: {
// // //       background: "#374151",
// // //       text: "#f9fafb",
// // //       border: "#4b5563",
// // //       shadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
// // //       hoverBackground: "#4b5563",
// // //       sectionBackground: "#4b5563",
// // //     },
// // //   };
// // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;
// // //   // Get the correct video URL
// // //   const videoUrl =
// // //     showVideoOptions.video?.videoUrl ||
// // //     showVideoOptions.video?.shopify_file_url;
// // //   // FIXED: Determine button text based on multiple states
// // //   const getAddProductsButtonText = () => {
// // //     if (isLoadingProducts) return "Loading Products...";
// // //     if (productsModalOpened) return "Opening...";
// // //     return "Add Products";
// // //   };
// // //   return (
// // //     <>
// // //       {/* Full Screen Video Preview */}
// // //       {showFullScreenVideo && videoUrl && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             top: 0,
// // //             left: 0,
// // //             right: 0,
// // //             bottom: 0,
// // //             zIndex: 10003,
// // //             background: "rgba(0, 0, 0, 0.9)",
// // //             display: "flex",
// // //             justifyContent: "center",
// // //             alignItems: "center",
// // //           }}
// // //           onClick={handleCloseFullScreenVideo}
// // //         >
// // //           {/* Close Button */}
// // //           <button
// // //             onClick={handleCloseFullScreenVideo}
// // //             style={{
// // //               position: "absolute",
// // //               top: "2rem",
// // //               right: "2rem",
// // //               background: "rgba(0, 0, 0, 0.7)",
// // //               border: "1px solid #fff",
// // //               borderRadius: "50%",
// // //               width: "50px",
// // //               height: "50px",
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "center",
// // //               cursor: "pointer",
// // //               color: "white",
// // //               fontSize: "1.5rem",
// // //               fontWeight: "bold",
// // //               zIndex: 10004,
// // //             }}
// // //           >
// // //             ✕
// // //           </button>
// // //           <video
// // //             src={videoUrl}
// // //             controls
// // //             autoPlay
// // //             style={{
// // //               maxWidth: "90%",
// // //               maxHeight: "90%",
// // //               borderRadius: "8px",
// // //             }}
// // //             onClick={(e) => e.stopPropagation()}
// // //           />
// // //         </div>
// // //       )}
// // //       <div
// // //         style={{
// // //           position: "fixed",
// // //           top: 0,
// // //           left: 0,
// // //           right: 0,
// // //           bottom: 0,
// // //           zIndex: 10000,
// // //           background: "rgba(0, 0, 0, 0.5)",
// // //           display: "flex",
// // //           justifyContent: "center",
// // //           alignItems: "center",
// // //         }}
// // //         onClick={handleBackdropClick}
// // //       >
// // //         <div
// // //           style={{
// // //             background: currentTheme.background,
// // //             borderRadius: "12px",
// // //             border: `1px solid ${currentTheme.border}`,
// // //             boxShadow: currentTheme.shadow,
// // //             padding: "2.5rem",
// // //             maxWidth: "900px",
// // //             minWidth: "800px",
// // //             maxHeight: "calc(100vh - 4rem)",
// // //             height: "auto",
// // //             minHeight: "600px",
// // //             zIndex: 10001,
// // //             animation: "scaleIn 0.2s ease-out",
// // //             display: "flex",
// // //             flexDirection: "row",
// // //             justifyContent: "space-between",
// // //             alignItems: "flex-start",
// // //             gap: "2.5rem",
// // //             overflow: "hidden",
// // //             position: "relative",
// // //           }}
// // //         >
// // //           {/* Close Button */}
// // //           <button
// // //             onClick={onHide}
// // //             style={{
// // //               position: "absolute",
// // //               top: "1.5rem",
// // //               right: "1.5rem",
// // //               background: isDarkTheme ? "#374151" : "white",
// // //               border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // //               borderRadius: "50%",
// // //               width: "40px",
// // //               height: "40px",
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "center",
// // //               cursor: "pointer",
// // //               color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //               fontSize: "1.3rem",
// // //               fontWeight: "bold",
// // //               zIndex: 10002,
// // //               transition: "all 0.3s ease",
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               e.target.style.background = isDarkTheme ? "#4b5563" : "#f3f4f6";
// // //               e.target.style.color = isDarkTheme ? "#f9fafb" : "#1f2937";
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               e.target.style.background = isDarkTheme ? "#374151" : "white";
// // //               e.target.style.color = isDarkTheme ? "#9ca3af" : "#6b7280";
// // //             }}
// // //           >
// // //             ✕
// // //           </button>
// // //           {/* Left Column - Video Player & Analytics */}
// // //           <div
// // //             style={{
// // //               flex: 1,
// // //               minWidth: "350px",
// // //               display: "flex",
// // //               flexDirection: "column",
// // //               gap: "2rem",
// // //               position: "relative",
// // //             }}
// // //           >
// // //             {/* Vertical Line Separator */}
// // //             <div
// // //               style={{
// // //                 position: "absolute",
// // //                 right: "-1.25rem",
// // //                 top: "0",
// // //                 bottom: "0",
// // //                 width: "1px",
// // //                 background: isDarkTheme ? "#4b5563" : "#e5e7eb",
// // //                 zIndex: 1,
// // //               }}
// // //             />
// // //             {/* Video Player Section */}
// // //             <div style={{ flex: 0 }}>
// // //               <h3
// // //                 style={{
// // //                   fontSize: "1.1rem",
// // //                   fontWeight: "600",
// // //                   color: currentTheme.text,
// // //                   margin: "0 0 1.2rem 0",
// // //                 }}
// // //               >
// // //                 Selected Video
// // //               </h3>
// // //               {/* Video Player with Hover - Shows the clicked video */}
// // //               {videoUrl ? (
// // //                 <div
// // //                   style={{
// // //                     width: "100%",
// // //                     height: "250px",
// // //                     display: "flex",
// // //                     justifyContent: "center",
// // //                     alignItems: "center",
// // //                     background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // //                     borderRadius: "10px",
// // //                     overflow: "hidden",
// // //                     cursor: "pointer",
// // //                   }}
// // //                   onClick={handleVideoClick}
// // //                 >
// // //                   <VideoPlayerWithHover
// // //                     videoUrl={videoUrl}
// // //                     thumbnailUrl={showVideoOptions.video?.thumbnail_url}
// // //                     title={showVideoOptions.video?.title}
// // //                     onVideoClick={handleVideoClick}
// // //                     isDarkTheme={isDarkTheme}
// // //                     height="250px"
// // //                     width="100%"
// // //                     objectFit="contain"
// // //                   />
// // //                 </div>
// // //               ) : (
// // //                 <div
// // //                   style={{
// // //                     height: "200px",
// // //                     background: isDarkTheme ? "#374151" : "#f3f4f6",
// // //                     borderRadius: "10px",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     justifyContent: "center",
// // //                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                     flexDirection: "column",
// // //                     gap: "0.8rem",
// // //                   }}
// // //                 >
// // //                   <div style={{ fontSize: "1.8rem" }}>🎬</div>
// // //                   <div style={{ fontSize: "1rem" }}>Video not available</div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Analytics Section - Added under the video */}
// // //             <div
// // //               style={{
// // //                 background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // //                 borderRadius: "10px",
// // //                 padding: "1rem", // Reduced height by 2rem (from 1.5rem to 1rem)
// // //                 border: `1px solid ${isDarkTheme ? "#374151" : "#e5e7eb"}`,
// // //               }}
// // //             >
// // //               <h4
// // //                 style={{
// // //                   fontSize: "1rem",
// // //                   fontWeight: "600",
// // //                   color: currentTheme.text,
// // //                   margin: "0 0 1rem 0",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: "0.5rem",
// // //                 }}
// // //               >
// // //                 {/* Changed to flat analytics icon */}
// // //                 <span style={{
// // //                   fontSize: "1.2rem",
// // //                   filter: isDarkTheme ? "invert(1)" : "none"
// // //                 }}>
// // //                   ▦
// // //                 </span>
// // //                 Video Analytics
// // //               </h4>

// // //               {/* Added Date */}
// // //               <div
// // //                 style={{
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: "0.5rem",
// // //                   marginBottom: "1rem",
// // //                   color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                   fontSize: "0.875rem",
// // //                 }}
// // //               >
// // //                 <span style={{ fontWeight: "500" }}>Added in Homepage</span>
// // //                 <span>•</span>
// // //                 <span>Added on - {new Date(showVideoOptions.video?.created_at || Date.now()).toLocaleDateString('en-US', {
// // //                   year: 'numeric',
// // //                   month: '2-digit',
// // //                   day: '2-digit'
// // //                 })}</span>
// // //               </div>

// // //               {/* Analytics Grid */}
// // //               <div
// // //                 style={{
// // //                   display: "grid",
// // //                   gridTemplateColumns: "1fr 1fr",
// // //                   gap: "1rem",
// // //                   marginBottom: "1.5rem",
// // //                 }}
// // //               >
// // //                 {/* Video Clicks */}
// // //                 <div
// // //                   style={{
// // //                     background: isDarkTheme ? "#374151" : "white",
// // //                     borderRadius: "8px",
// // //                     padding: "1rem",
// // //                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // //                     textAlign: "center",
// // //                   }}
// // //                 >
// // //                   <div
// // //                     style={{
// // //                       fontSize: "1.5rem",
// // //                       fontWeight: "bold",
// // //                       color: currentTheme.text,
// // //                       marginBottom: "0.25rem",
// // //                     }}
// // //                   >
// // //                     5
// // //                   </div>
// // //                   <div
// // //                     style={{
// // //                       fontSize: "0.75rem",
// // //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                       fontWeight: "500",
// // //                     }}
// // //                   >
// // //                     Video Clicks
// // //                   </div>
// // //                 </div>

// // //                 {/* Watch Time */}
// // //                 <div
// // //                   style={{
// // //                     background: isDarkTheme ? "#374151" : "white",
// // //                     borderRadius: "8px",
// // //                     padding: "1rem",
// // //                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // //                     textAlign: "center",
// // //                   }}
// // //                 >
// // //                   <div
// // //                     style={{
// // //                       fontSize: "1.5rem",
// // //                       fontWeight: "bold",
// // //                       color: currentTheme.text,
// // //                       marginBottom: "0.25rem",
// // //                     }}
// // //                   >
// // //                     0 sec
// // //                   </div>
// // //                   <div
// // //                     style={{
// // //                       fontSize: "0.75rem",
// // //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                       fontWeight: "500",
// // //                     }}
// // //                   >
// // //                     Watch Time
// // //                   </div>
// // //                 </div>

// // //                 {/* Engaged Sessions */}
// // //                 <div
// // //                   style={{
// // //                     background: isDarkTheme ? "#374151" : "white",
// // //                     borderRadius: "8px",
// // //                     padding: "1rem",
// // //                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // //                     textAlign: "center",
// // //                   }}
// // //                 >
// // //                   <div
// // //                     style={{
// // //                       fontSize: "1.5rem",
// // //                       fontWeight: "bold",
// // //                       color: currentTheme.text,
// // //                       marginBottom: "0.25rem",
// // //                     }}
// // //                   >
// // //                     0
// // //                   </div>
// // //                   <div
// // //                     style={{
// // //                       fontSize: "0.75rem",
// // //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                       fontWeight: "500",
// // //                     }}
// // //                   >
// // //                     Engaged Sessions
// // //                   </div>
// // //                 </div>

// // //                 {/* Products Tagged */}
// // //                 <div
// // //                   style={{
// // //                     background: isDarkTheme ? "#374151" : "white",
// // //                     borderRadius: "8px",
// // //                     padding: "1rem",
// // //                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // //                     textAlign: "center",
// // //                   }}
// // //                 >
// // //                   <div
// // //                     style={{
// // //                       fontSize: "1.5rem",
// // //                       fontWeight: "bold",
// // //                       color: currentTheme.text,
// // //                       marginBottom: "0.25rem",
// // //                     }}
// // //                   >
// // //                     {savedProducts.length}
// // //                   </div>
// // //                   <div
// // //                     style={{
// // //                       fontSize: "0.75rem",
// // //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                       fontWeight: "500",
// // //                     }}
// // //                   >
// // //                     Products Tagged
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Stories Settings */}
// // //               <div
// // //                 style={{
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "space-between",
// // //                   padding: "0.75rem",
// // //                   background: isDarkTheme ? "#374151" : "white",
// // //                   borderRadius: "6px",
// // //                   border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// // //                 }}
// // //               >
// // //                 <div
// // //                   style={{
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     gap: "0.75rem",
// // //                   }}
// // //                 >
// // //                   <input
// // //                     type="checkbox"
// // //                     style={{
// // //                       width: "16px",
// // //                       height: "16px",
// // //                       cursor: "pointer",
// // //                     }}
// // //                   />
// // //                   <span
// // //                     style={{
// // //                       color: currentTheme.text,
// // //                       fontSize: "0.875rem",
// // //                       fontWeight: "500",
// // //                     }}
// // //                   >
// // //                     Stories Settings
// // //                   </span>
// // //                 </div>
// // //                 <button
// // //                   style={{
// // //                     background: "transparent",
// // //                     border: "none",
// // //                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                     cursor: "pointer",
// // //                     fontSize: "1.25rem",
// // //                   }}
// // //                 >
// // //                   ⚙️
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* Video Actions Section - Moved back to original position */}
// // //             <div
// // //               style={{
// // //                 display: "flex",
// // //                 justifyContent: "space-between",
// // //                 alignItems: "center",
// // //                 gap: "15px",
// // //                 marginTop: "0rem", // Reset to original position
// // //               }}
// // //             >
// // //               <button
// // //                 onClick={() =>
// // //                   handleOptionClick(() =>
// // //                     onCopyUrl(showVideoOptions.video.shopify_file_url),
// // //                   )
// // //                 }
// // //                 title="Copy Video URL"
// // //                 style={{
// // //                   background: "transparent",
// // //                   border: "none",
// // //                   color: currentTheme.text,
// // //                   borderRadius: "10px",
// // //                   fontSize: "1.5rem",
// // //                   fontWeight: "500",
// // //                   cursor: "pointer",
// // //                   transition: "all 0.2s",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   width: "45px",
// // //                   height: "45px",
// // //                   opacity: 0.8,
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.transform = "scale(1.1)";
// // //                   e.target.style.opacity = "1";
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.transform = "scale(1)";
// // //                   e.target.style.opacity = "0.8";
// // //                 }}
// // //               >
// // //                 <img
// // //                   src="/link.png"
// // //                   alt="Copy Link"
// // //                   style={{
// // //                     width: "22px",
// // //                     height: "22px",
// // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // //                   }}
// // //                 />
// // //               </button>
// // //               <button
// // //                 onClick={() =>
// // //                   handleOptionClick(() => onDownload(showVideoOptions.video))
// // //                 }
// // //                 title="Download Video"
// // //                 style={{
// // //                   background: "transparent",
// // //                   border: "none",
// // //                   color: currentTheme.text,
// // //                   borderRadius: "10px",
// // //                   fontSize: "1.5rem",
// // //                   fontWeight: "500",
// // //                   cursor: "pointer",
// // //                   transition: "all 0.2s",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   width: "45px",
// // //                   height: "45px",
// // //                   opacity: 0.8,
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.transform = "scale(1.1)";
// // //                   e.target.style.opacity = "1";
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.transform = "scale(1)";
// // //                   e.target.style.opacity = "0.8";
// // //                 }}
// // //               >
// // //                 <img
// // //                   src="/download.png"
// // //                   alt="Download"
// // //                   style={{
// // //                     width: "22px",
// // //                     height: "22px",
// // //                     filter: isDarkTheme ? "none" : "invert(1)",
// // //                   }}
// // //                 />
// // //               </button>
// // //               <button
// // //                 onClick={() =>
// // //                   handleOptionClick(() =>
// // //                     onDelete(
// // //                       showVideoOptions.video.id,
// // //                       showVideoOptions.video.title,
// // //                     ),
// // //                   )
// // //                 }
// // //                 title="Delete Video"
// // //                 style={{
// // //                   background: "transparent",
// // //                   border: "none",
// // //                   color: "#ef4444",
// // //                   borderRadius: "10px",
// // //                   fontSize: "1.5rem",
// // //                   fontWeight: "500",
// // //                   cursor: "pointer",
// // //                   transition: "all 0.2s",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   width: "45px",
// // //                   height: "45px",
// // //                   opacity: 0.8,
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.target.style.transform = "scale(1.1)";
// // //                   e.target.style.opacity = "1";
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.target.style.transform = "scale(1)";
// // //                   e.target.style.opacity = "0.8";
// // //                 }}
// // //               >
// // //                 <img
// // //                   src="/trash.png"
// // //                   alt="Delete"
// // //                   style={{
// // //                     width: "22px",
// // //                     height: "22px",
// // //                   }}
// // //                 />
// // //               </button>
// // //             </div>
// // //           </div>
// // //           {/* Right Column - Products Section */}
// // //           <div
// // //             style={{
// // //               flex: 1,
// // //               minWidth: "300px",
// // //               display: "flex",
// // //               flexDirection: "column",
// // //               gap: "1.8rem",
// // //               height: "100%",
// // //               overflow: "hidden",
// // //             }}
// // //           >
// // //             {/* Products Section */}
// // //             <div
// // //               style={{
// // //                 display: "flex",
// // //                 flexDirection: "column",
// // //                 height: "100%",
// // //                 gap: "1.2rem",
// // //               }}
// // //             >
// // //               <h3
// // //                 style={{
// // //                   fontSize: "1.1rem",
// // //                   fontWeight: "600",
// // //                   color: currentTheme.text,
// // //                   margin: 0,
// // //                 }}
// // //               >
// // //                 Product Management
// // //               </h3>
// // //               <button
// // //                 onClick={handleAddProducts}
// // //                 disabled={isLoadingProducts || productsModalOpened}
// // //                 style={{
// // //                   width: "100%",
// // //                   background: "#10b981",
// // //                   color: "white",
// // //                   border: "none",
// // //                   padding: "0.8rem",
// // //                   borderRadius: "10px",
// // //                   fontSize: "0.9rem",
// // //                   fontWeight: "500",
// // //                   cursor:
// // //                     isLoadingProducts || productsModalOpened
// // //                       ? "not-allowed"
// // //                       : "pointer",
// // //                   transition: "background-color 0.2s",
// // //                   opacity: isLoadingProducts || productsModalOpened ? 0.6 : 1,
// // //                   height: "48px",
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   if (!isLoadingProducts && !productsModalOpened) {
// // //                     e.target.style.background = "#059669";
// // //                   }
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   if (!isLoadingProducts && !productsModalOpened) {
// // //                     e.target.style.background = "#10b981";
// // //                   }
// // //                 }}
// // //               >
// // //                 {getAddProductsButtonText()}
// // //               </button>
// // //               {/* Saved Products Section */}
// // //               <div
// // //                 style={{
// // //                   flex: 1,
// // //                   display: "flex",
// // //                   flexDirection: "column",
// // //                   overflow: "hidden",
// // //                 }}
// // //               >
// // //                 <div
// // //                   style={{
// // //                     fontSize: "0.9rem",
// // //                     fontWeight: "600",
// // //                     color: currentTheme.text,
// // //                     marginBottom: "0.8rem",
// // //                   }}
// // //                 >
// // //                   Saved Products{" "}
// // //                   {savedProducts.length > 0 && `(${savedProducts.length})`}
// // //                 </div>
// // //                 {isLoadingSavedProducts ? (
// // //                   <div
// // //                     style={{
// // //                       textAlign: "center",
// // //                       padding: "1.2rem",
// // //                       color: currentTheme.text,
// // //                       fontSize: "0.85rem",
// // //                       border: `1px solid ${currentTheme.border}`,
// // //                       borderRadius: "10px",
// // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // //                       height: "70px",
// // //                       display: "flex",
// // //                       alignItems: "center",
// // //                       justifyContent: "center",
// // //                     }}
// // //                   >
// // //                     Loading saved products...
// // //                   </div>
// // //                 ) : savedProducts.length > 0 ? (
// // //                   <div
// // //                     style={{
// // //                       flex: 1,
// // //                       overflowY: "auto",
// // //                       border: `1px solid ${currentTheme.border}`,
// // //                       borderRadius: "10px",
// // //                       padding: "0.8rem",
// // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // //                       maxHeight: "250px",
// // //                     }}
// // //                   >
// // //                     {savedProducts.map((product) => (
// // //                       <div
// // //                         key={product.video_product_id || product.id}
// // //                         style={{
// // //                           display: "flex",
// // //                           alignItems: "center",
// // //                           gap: "0.8rem",
// // //                           padding: "0.8rem",
// // //                           marginBottom: "0.5rem",
// // //                           background: isDarkTheme ? "#374151" : "#ffffff",
// // //                           borderRadius: "8px",
// // //                           fontSize: "0.8rem",
// // //                           position: "relative",
// // //                         }}
// // //                       >
// // //                         {product.image_url ? (
// // //                           <img
// // //                             src={product.image_url}
// // //                             alt={product.title}
// // //                             style={{
// // //                               width: "28px",
// // //                               height: "28px",
// // //                               borderRadius: "6px",
// // //                               objectFit: "cover",
// // //                             }}
// // //                           />
// // //                         ) : (
// // //                           <div
// // //                             style={{
// // //                               width: "28px",
// // //                               height: "28px",
// // //                               background: "#3b82f6",
// // //                               borderRadius: "6px",
// // //                               display: "flex",
// // //                               alignItems: "center",
// // //                               justifyContent: "center",
// // //                               color: "white",
// // //                               fontSize: "0.75rem",
// // //                               fontWeight: "bold",
// // //                             }}
// // //                           >
// // //                             P
// // //                           </div>
// // //                         )}
// // //                         <div style={{ flex: 1, minWidth: 0 }}>
// // //                           <div
// // //                             style={{
// // //                               color: currentTheme.text,
// // //                               fontWeight: "500",
// // //                               whiteSpace: "nowrap",
// // //                               overflow: "hidden",
// // //                               textOverflow: "ellipsis",
// // //                             }}
// // //                           >
// // //                             {product.title}
// // //                           </div>
// // //                           <div
// // //                             style={{
// // //                               color: "#10b981",
// // //                               fontSize: "0.75rem",
// // //                             }}
// // //                           >
// // //                             ${product.price}
// // //                           </div>

// // //                           {/* Enable Video on Product Page Checkbox */}
// // //                           <div
// // //                             style={{
// // //                               display: "flex",
// // //                               alignItems: "center",
// // //                               gap: "0.5rem",
// // //                               marginTop: "0.3rem",
// // //                             }}
// // //                           >
// // //                             <input
// // //                               type="checkbox"
// // //                               checked={enableStatuses[product.id] || false}
// // //                               onChange={() =>
// // //                                 toggleEnableStatus(
// // //                                   product.id,
// // //                                   enableStatuses[product.id] || false
// // //                                 )
// // //                               }
// // //                               style={{
// // //                                 width: "14px",
// // //                                 height: "14px",
// // //                                 cursor: "pointer",
// // //                               }}
// // //                             />
// // //                             <label
// // //                               style={{
// // //                                 fontSize: "0.7rem",
// // //                                 color: currentTheme.text,
// // //                                 cursor: "pointer",
// // //                               }}
// // //                             >
// // //                               Enable Video on Product Page
// // //                             </label>
// // //                           </div>
// // //                         </div>
// // //                         {/* Remove Product Button - FIXED: Now uses correct API endpoint */}
// // //                         <button
// // //                           onClick={(e) => {
// // //                             e.stopPropagation(); // Prevent event bubbling
// // //                             handleRemoveProduct(
// // //                               product.shopify_product_id || product.id,
// // //                             );
// // //                           }}
// // //                           style={{
// // //                             background: "transparent",
// // //                             border: "none",
// // //                             color: "#ef4444",
// // //                             cursor: "pointer",
// // //                             padding: "4px",
// // //                             borderRadius: "4px",
// // //                             fontSize: "0.7rem",
// // //                             display: "flex",
// // //                             alignItems: "center",
// // //                             justifyContent: "center",
// // //                             width: "20px",
// // //                             height: "20px",
// // //                           }}
// // //                           onMouseEnter={(e) => {
// // //                             e.target.style.background = "#ef4444";
// // //                             e.target.style.color = "white";
// // //                           }}
// // //                           onMouseLeave={(e) => {
// // //                             e.target.style.background = "transparent";
// // //                             e.target.style.color = "#ef4444";
// // //                           }}
// // //                           title="Remove product"
// // //                         >
// // //                           ✕
// // //                         </button>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div
// // //                     style={{
// // //                       textAlign: "center",
// // //                       padding: "1.2rem",
// // //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// // //                       fontSize: "0.85rem",
// // //                       fontStyle: "italic",
// // //                       border: `1px dashed ${currentTheme.border}`,
// // //                       borderRadius: "10px",
// // //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// // //                       height: "70px",
// // //                       display: "flex",
// // //                       alignItems: "center",
// // //                       justifyContent: "center",
// // //                     }}
// // //                   >
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
// // //     </>
// // //   );
// // // }

// // // components/videogallerycomponents/VideoOptionsModal.jsx
// // import { useState, useEffect, useRef } from "react";
// // import ProductsModal from "./ProductsModal";
// // import VideoPlayerWithHover from "./VideoPlayerWithHover";
// // export default function VideoOptionsModal({
// //   showVideoOptions,
// //   onHide,
// //   onCopyUrl,
// //   onDownload,
// //   onLoadProducts,
// //   onDelete,
// //   isDarkTheme,
// //   selectedProducts,
// //   products,
// //   onToggleProduct,
// //   onSaveProducts,
// //   showVideoPlayerModal,
// //   productsModalOpened,
// //   closeProductsModal,
// // }) {
// //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
// //   const [savedProducts, setSavedProducts] = useState([]);
// //   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
// //   const [enableStatuses, setEnableStatuses] = useState({});
// //   const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
// //   const [showProductsModal, setShowProductsModal] = useState(false);
// //   // Fetch saved products when modal opens or video changes
// //   useEffect(() => {
// //     if (showVideoOptions.show && showVideoOptions.video?.id) {
// //       fetchSavedProducts();
// //       fetchEnableStatuses();
// //     }
// //   }, [showVideoOptions.show, showVideoOptions.video?.id]);
// //   // Auto-refresh when productsModalOpened becomes false (modal closes)
// //   useEffect(() => {
// //     if (!productsModalOpened && showVideoOptions.show && showVideoOptions.video?.id) {
// //       fetchSavedProducts();
// //       fetchEnableStatuses();
// //     }
// //   }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);
// //   const fetchSavedProducts = async () => {
// //     try {
// //       setIsLoadingSavedProducts(true);
// //       const response = await fetch(
// //         `/api/video-products/${showVideoOptions.video.id}`,
// //       );
// //       const result = await response.json();
// //       if (result.success) {
// //         setSavedProducts(result.products);
// //         console.log("✅ Loaded saved products for display:", result.products.length);
// //       } else {
// //         console.error("Failed to fetch saved products:", result.error);
// //         setSavedProducts([]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching saved products:", error);
// //       setSavedProducts([]);
// //     } finally {
// //       setIsLoadingSavedProducts(false);
// //     }
// //   };
// //   const fetchEnableStatuses = async () => {
// //     try {
// //       const response = await fetch(
// //         `/api/videooptionsmodal-enableoption?videoId=${showVideoOptions.video.id}`,
// //       );
// //       const result = await response.json();
// //       if (result.success) {
// //         const statusMap = {};
// //         result.data.forEach(item => {
// //           statusMap[item.product_id] = item.status;
// //         });
// //         setEnableStatuses(statusMap);
// //         console.log("✅ Loaded enable statuses:", statusMap);
// //       } else {
// //         console.error("Failed to fetch enable statuses:", result.error);
// //         setEnableStatuses({});
// //       }
// //     } catch (error) {
// //       console.error("Error fetching enable statuses:", error);
// //       setEnableStatuses({});
// //     }
// //   };
// //   const toggleEnableStatus = async (productId, currentStatus) => {
// //     const newStatus = !currentStatus;

// //     try {
// //       const response = await fetch('/api/videooptionsmodal-enableoption', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           videoId: showVideoOptions.video.id,
// //           productId: productId,
// //           status: newStatus
// //         }),
// //       });
// //       const result = await response.json();
// //       if (result.success) {
// //         setEnableStatuses(prev => ({
// //           ...prev,
// //           [productId]: newStatus
// //         }));
// //         console.log(`✅ Enable status updated to: ${newStatus}`);
// //       } else {
// //         console.error("Failed to update enable status:", result.error);
// //       }
// //     } catch (error) {
// //       console.error("Error updating enable status:", error);
// //     }
// //   };
// //   const handleBackdropClick = (e) => {
// //     if (e.target === e.currentTarget) {
// //       onHide();
// //     }
// //   };
// //   const handleOptionClick = (action) => {
// //     action();
// //     onHide();
// //   };
// //   const handleVideoClick = () => {
// //     setShowFullScreenVideo(true);
// //   };
// //   const handleCloseFullScreenVideo = () => {
// //     setShowFullScreenVideo(false);
// //   };
// //   // NEW: Handle opening products modal
// //   const handleAddProducts = async () => {
// //     if (isLoadingProducts || productsModalOpened) {
// //       console.log("⚠️ Modal already opening or opened, skipping");
// //       return;
// //     }
// //     setIsLoadingProducts(true);
// //     try {
// //       // Pass the saved products to the ProductsModal
// //       if (onLoadProducts) {
// //         await onLoadProducts(showVideoOptions.video, savedProducts);
// //       }
// //     } catch (error) {
// //       console.error("Error loading products:", error);
// //     } finally {
// //       setIsLoadingProducts(false);
// //     }
// //   };
// //   // FIXED: Handle removing a product - use the correct API endpoint
// //   const handleRemoveProduct = async (productId) => {
// //     try {
// //       console.log('🗑️ Removing product:', productId, 'from video:', showVideoOptions.video.id);

// //       const response = await fetch(
// //         `/api/video-products/${showVideoOptions.video.id}/delete`,
// //         {
// //           method: "DELETE",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ productId }),
// //         },
// //       );

// //       const result = await response.json();
// //       console.log('🗑️ Remove product response:', result);

// //       if (result.success) {
// //         // Remove the product from local state immediately
// //         setSavedProducts((prev) =>
// //           prev.filter(
// //             (product) =>
// //               product.shopify_product_id !== productId &&
// //               product.id !== productId
// //           ),
// //         );
// //         // Also remove from enable statuses
// //         setEnableStatuses(prev => {
// //           const newStatuses = { ...prev };
// //           delete newStatuses[productId];
// //           return newStatuses;
// //         });
// //         console.log("✅ Product removed successfully");
// //       } else {
// //         console.error("Failed to remove product:", result.error);
// //       }
// //     } catch (error) {
// //       console.error("Error removing product:", error);
// //     }
// //   };
// //   // Early return should be AFTER all hooks
// //   if (!showVideoOptions.show) return null;
// //   const themeStyles = {
// //     light: {
// //       background: "#ffffff",
// //       text: "#1f2937",
// //       border: "#e5e7eb",
// //       shadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
// //       hoverBackground: "#f3f4f6",
// //       sectionBackground: "#f8fafc",
// //     },
// //     dark: {
// //       background: "#374151",
// //       text: "#f9fafb",
// //       border: "#4b5563",
// //       shadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
// //       hoverBackground: "#4b5563",
// //       sectionBackground: "#4b5563",
// //     },
// //   };
// //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;
// //   // Get the correct video URL
// //   const videoUrl =
// //     showVideoOptions.video?.videoUrl ||
// //     showVideoOptions.video?.shopify_file_url;
// //   // FIXED: Determine button text based on multiple states
// //   const getAddProductsButtonText = () => {
// //     if (isLoadingProducts) return "Loading Products...";
// //     if (productsModalOpened) return "Opening...";
// //     return "Add Products";
// //   };
// //   return (
// //     <>
// //       {/* Full Screen Video Preview */}
// //       {showFullScreenVideo && videoUrl && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             zIndex: 10003,
// //             background: "rgba(0, 0, 0, 0.9)",
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //           }}
// //           onClick={handleCloseFullScreenVideo}
// //         >
// //           {/* Close Button */}
// //           <button
// //             onClick={handleCloseFullScreenVideo}
// //             style={{
// //               position: "absolute",
// //               top: "2rem",
// //               right: "2rem",
// //               background: "rgba(0, 0, 0, 0.7)",
// //               border: "1px solid #fff",
// //               borderRadius: "50%",
// //               width: "50px",
// //               height: "50px",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               cursor: "pointer",
// //               color: "white",
// //               fontSize: "1.5rem",
// //               fontWeight: "bold",
// //               zIndex: 10004,
// //             }}
// //           >
// //             ✕
// //           </button>
// //           <video
// //             src={videoUrl}
// //             controls
// //             autoPlay
// //             style={{
// //               maxWidth: "90%",
// //               maxHeight: "90%",
// //               borderRadius: "8px",
// //             }}
// //             onClick={(e) => e.stopPropagation()}
// //           />
// //         </div>
// //       )}
// //       <div
// //         style={{
// //           position: "fixed",
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           zIndex: 10000,
// //           background: "rgba(0, 0, 0, 0.5)",
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //         }}
// //         onClick={handleBackdropClick}
// //       >
// //         <div
// //           style={{
// //             background: currentTheme.background,
// //             borderRadius: "12px",
// //             border: `1px solid ${currentTheme.border}`,
// //             boxShadow: currentTheme.shadow,
// //             padding: "2.5rem",
// //             maxWidth: "900px",
// //             minWidth: "800px",
// //             maxHeight: "calc(100vh - 4rem)",
// //             height: "auto",
// //             minHeight: "600px",
// //             zIndex: 10001,
// //             animation: "scaleIn 0.2s ease-out",
// //             display: "flex",
// //             flexDirection: "row",
// //             justifyContent: "space-between",
// //             alignItems: "flex-start",
// //             gap: "2.5rem",
// //             overflow: "hidden",
// //             position: "relative",
// //           }}
// //         >
// //           {/* Close Button */}
// //           <button
// //             onClick={onHide}
// //             style={{
// //               position: "absolute",
// //               top: "1.5rem",
// //               right: "1.5rem",
// //               background: isDarkTheme ? "#374151" : "white",
// //               border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// //               borderRadius: "50%",
// //               width: "40px",
// //               height: "40px",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               cursor: "pointer",
// //               color: isDarkTheme ? "#9ca3af" : "#6b7280",
// //               fontSize: "1.3rem",
// //               fontWeight: "bold",
// //               zIndex: 10002,
// //               transition: "all 0.3s ease",
// //             }}
// //             onMouseEnter={(e) => {
// //               e.target.style.background = isDarkTheme ? "#4b5563" : "#f3f4f6";
// //               e.target.style.color = isDarkTheme ? "#f9fafb" : "#1f2937";
// //             }}
// //             onMouseLeave={(e) => {
// //               e.target.style.background = isDarkTheme ? "#374151" : "white";
// //               e.target.style.color = isDarkTheme ? "#9ca3af" : "#6b7280";
// //             }}
// //           >
// //             ✕
// //           </button>
// //           {/* Left Column - Video Player & Analytics */}
// //           <div
// //             style={{
// //               flex: 1,
// //               minWidth: "350px",
// //               display: "flex",
// //               flexDirection: "column",
// //               gap: "2rem",
// //               position: "relative",
// //             }}
// //           >
// //             {/* Vertical Line Separator */}
// //             <div
// //               style={{
// //                 position: "absolute",
// //                 right: "-1.25rem",
// //                 top: "0",
// //                 bottom: "0",
// //                 width: "1px",
// //                 background: isDarkTheme ? "#4b5563" : "#e5e7eb",
// //                 zIndex: 1,
// //               }}
// //             />
// //             {/* Video Player Section - REMOVED BACKGROUND BOX */}
// //             <div style={{ flex: 0 }}>
// //               <h3
// //                 style={{
// //                   fontSize: "1.1rem",
// //                   fontWeight: "600",
// //                   color: currentTheme.text,
// //                   margin: "0 0 1.2rem 0",
// //                 }}
// //               >
// //                 Selected Video
// //               </h3>
// //               {/* Video Player with Hover - REMOVED BACKGROUND BOX */}
// //               {videoUrl ? (
// //                 <div
// //                   style={{
// //                     width: "100%",
// //                     height: "250px",
// //                     display: "flex",
// //                     justifyContent: "center",
// //                     alignItems: "center",
// //                     background: "transparent", // Removed background box
// //                     borderRadius: "10px",
// //                     overflow: "hidden",
// //                     cursor: "pointer",
// //                   }}
// //                   onClick={handleVideoClick}
// //                 >
// //                   <VideoPlayerWithHover
// //                     videoUrl={videoUrl}
// //                     thumbnailUrl={showVideoOptions.video?.thumbnail_url}
// //                     title={showVideoOptions.video?.title}
// //                     onVideoClick={handleVideoClick}
// //                     isDarkTheme={isDarkTheme}
// //                     height="250px"
// //                     width="100%"
// //                     objectFit="contain"
// //                   />
// //                 </div>
// //               ) : (
// //                 <div
// //                   style={{
// //                     height: "200px",
// //                     background: "transparent", // Removed background box
// //                     borderRadius: "10px",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
// //                     flexDirection: "column",
// //                     gap: "0.8rem",
// //                   }}
// //                 >
// //                   <div style={{ fontSize: "1.8rem" }}>🎬</div>
// //                   <div style={{ fontSize: "1rem" }}>Video not available</div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Analytics Section - DECREASED HEIGHT BY 3REM */}
// //             <div
// //               style={{
// //                 background: isDarkTheme ? "#1f2937" : "#f8fafc",
// //                 borderRadius: "10px",
// //                 padding: "0.5rem", // Decreased from 1rem to 0.5rem (3rem total reduction)
// //                 border: `1px solid ${isDarkTheme ? "#374151" : "#e5e7eb"}`,
// //               }}
// //             >
// //               <h4
// //                 style={{
// //                   fontSize: "0.9rem", // Smaller font
// //                   fontWeight: "600",
// //                   color: currentTheme.text,
// //                   margin: "0 0 0.75rem 0", // Reduced margin
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "0.5rem",
// //                 }}
// //               >
// //                 <span style={{
// //                   fontSize: "1rem", // Smaller icon
// //                   filter: isDarkTheme ? "invert(1)" : "none"
// //                 }}>
// //                   ▦
// //                 </span>
// //                 Video Analytics
// //               </h4>

// //               {/* Added Date */}
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "0.5rem",
// //                   marginBottom: "0.75rem", // Reduced margin
// //                   color: isDarkTheme ? "#9ca3af" : "#6b7280",
// //                   fontSize: "0.75rem", // Smaller font
// //                 }}
// //               >
// //                 <span style={{ fontWeight: "500" }}>Added in Homepage</span>
// //                 <span>•</span>
// //                 <span>Added on - {new Date(showVideoOptions.video?.created_at || Date.now()).toLocaleDateString('en-US', {
// //                   year: 'numeric',
// //                   month: '2-digit',
// //                   day: '2-digit'
// //                 })}</span>
// //               </div>

// //               {/* Analytics Grid - Reduced spacing */}
// //               <div
// //                 style={{
// //                   display: "grid",
// //                   gridTemplateColumns: "1fr 1fr",
// //                   gap: "0.75rem", // Reduced gap
// //                   marginBottom: "1rem", // Reduced margin
// //                 }}
// //               >
// //                 {/* Video Clicks */}
// //                 <div
// //                   style={{
// //                     background: isDarkTheme ? "#374151" : "white",
// //                     borderRadius: "6px", // Smaller border radius
// //                     padding: "0.75rem", // Reduced padding
// //                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// //                     textAlign: "center",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       fontSize: "1.25rem", // Smaller font
// //                       fontWeight: "bold",
// //                       color: currentTheme.text,
// //                       marginBottom: "0.2rem", // Reduced margin
// //                     }}
// //                   >
// //                     5
// //                   </div>
// //                   <div
// //                     style={{
// //                       fontSize: "0.7rem", // Smaller font
// //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// //                       fontWeight: "500",
// //                     }}
// //                   >
// //                     Video Clicks
// //                   </div>
// //                 </div>

// //                 {/* Watch Time */}
// //                 <div
// //                   style={{
// //                     background: isDarkTheme ? "#374151" : "white",
// //                     borderRadius: "6px",
// //                     padding: "0.75rem",
// //                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// //                     textAlign: "center",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       fontSize: "1.25rem",
// //                       fontWeight: "bold",
// //                       color: currentTheme.text,
// //                       marginBottom: "0.2rem",
// //                     }}
// //                   >
// //                     0 sec
// //                   </div>
// //                   <div
// //                     style={{
// //                       fontSize: "0.7rem",
// //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// //                       fontWeight: "500",
// //                     }}
// //                   >
// //                     Watch Time
// //                   </div>
// //                 </div>

// //                 {/* Engaged Sessions */}
// //                 <div
// //                   style={{
// //                     background: isDarkTheme ? "#374151" : "white",
// //                     borderRadius: "6px",
// //                     padding: "0.75rem",
// //                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// //                     textAlign: "center",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       fontSize: "1.25rem",
// //                       fontWeight: "bold",
// //                       color: currentTheme.text,
// //                       marginBottom: "0.2rem",
// //                     }}
// //                   >
// //                     0
// //                   </div>
// //                   <div
// //                     style={{
// //                       fontSize: "0.7rem",
// //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// //                       fontWeight: "500",
// //                     }}
// //                   >
// //                     Engaged Sessions
// //                   </div>
// //                 </div>

// //                 {/* Products Tagged */}
// //                 <div
// //                   style={{
// //                     background: isDarkTheme ? "#374151" : "white",
// //                     borderRadius: "6px",
// //                     padding: "0.75rem",
// //                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// //                     textAlign: "center",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       fontSize: "1.25rem",
// //                       fontWeight: "bold",
// //                       color: currentTheme.text,
// //                       marginBottom: "0.2rem",
// //                     }}
// //                   >
// //                     {savedProducts.length}
// //                   </div>
// //                   <div
// //                     style={{
// //                       fontSize: "0.7rem",
// //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// //                       fontWeight: "500",
// //                     }}
// //                   >
// //                     Products Tagged
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Stories Settings - Reduced size */}
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "space-between",
// //                   padding: "0.5rem", // Reduced padding
// //                   background: isDarkTheme ? "#374151" : "white",
// //                   borderRadius: "4px", // Smaller border radius
// //                   border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "0.5rem", // Reduced gap
// //                   }}
// //                 >
// //                   <input
// //                     type="checkbox"
// //                     style={{
// //                       width: "14px", // Smaller checkbox
// //                       height: "14px",
// //                       cursor: "pointer",
// //                     }}
// //                   />
// //                   <span
// //                     style={{
// //                       color: currentTheme.text,
// //                       fontSize: "0.75rem", // Smaller font
// //                       fontWeight: "500",
// //                     }}
// //                   >
// //                     Stories Settings
// //                   </span>
// //                 </div>
// //                 <button
// //                   style={{
// //                     background: "transparent",
// //                     border: "none",
// //                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
// //                     cursor: "pointer",
// //                     fontSize: "1rem", // Smaller icon
// //                   }}
// //                 >
// //                   ⚙️
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Video Actions Section */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 gap: "15px",
// //                 marginTop: "0rem",
// //               }}
// //             >
// //               <button
// //                 onClick={() =>
// //                   handleOptionClick(() =>
// //                     onCopyUrl(showVideoOptions.video.shopify_file_url),
// //                   )
// //                 }
// //                 title="Copy Video URL"
// //                 style={{
// //                   background: "transparent",
// //                   border: "none",
// //                   color: currentTheme.text,
// //                   borderRadius: "10px",
// //                   fontSize: "1.5rem",
// //                   fontWeight: "500",
// //                   cursor: "pointer",
// //                   transition: "all 0.2s",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   width: "45px",
// //                   height: "45px",
// //                   opacity: 0.8,
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   e.target.style.transform = "scale(1.1)";
// //                   e.target.style.opacity = "1";
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   e.target.style.transform = "scale(1)";
// //                   e.target.style.opacity = "0.8";
// //                 }}
// //               >
// //                 <img
// //                   src="/link.png"
// //                   alt="Copy Link"
// //                   style={{
// //                     width: "22px",
// //                     height: "22px",
// //                     filter: isDarkTheme ? "none" : "invert(1)",
// //                   }}
// //                 />
// //               </button>
// //               <button
// //                 onClick={() =>
// //                   handleOptionClick(() => onDownload(showVideoOptions.video))
// //                 }
// //                 title="Download Video"
// //                 style={{
// //                   background: "transparent",
// //                   border: "none",
// //                   color: currentTheme.text,
// //                   borderRadius: "10px",
// //                   fontSize: "1.5rem",
// //                   fontWeight: "500",
// //                   cursor: "pointer",
// //                   transition: "all 0.2s",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   width: "45px",
// //                   height: "45px",
// //                   opacity: 0.8,
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   e.target.style.transform = "scale(1.1)";
// //                   e.target.style.opacity = "1";
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   e.target.style.transform = "scale(1)";
// //                   e.target.style.opacity = "0.8";
// //                 }}
// //               >
// //                 <img
// //                   src="/download.png"
// //                   alt="Download"
// //                   style={{
// //                     width: "22px",
// //                     height: "22px",
// //                     filter: isDarkTheme ? "none" : "invert(1)",
// //                   }}
// //                 />
// //               </button>
// //               <button
// //                 onClick={() =>
// //                   handleOptionClick(() =>
// //                     onDelete(
// //                       showVideoOptions.video.id,
// //                       showVideoOptions.video.title,
// //                     ),
// //                   )
// //                 }
// //                 title="Delete Video"
// //                 style={{
// //                   background: "transparent",
// //                   border: "none",
// //                   color: "#ef4444",
// //                   borderRadius: "10px",
// //                   fontSize: "1.5rem",
// //                   fontWeight: "500",
// //                   cursor: "pointer",
// //                   transition: "all 0.2s",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   width: "45px",
// //                   height: "45px",
// //                   opacity: 0.8,
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   e.target.style.transform = "scale(1.1)";
// //                   e.target.style.opacity = "1";
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   e.target.style.transform = "scale(1)";
// //                   e.target.style.opacity = "0.8";
// //                 }}
// //               >
// //                 <img
// //                   src="/trash.png"
// //                   alt="Delete"
// //                   style={{
// //                     width: "22px",
// //                     height: "22px",
// //                   }}
// //                 />
// //               </button>
// //             </div>
// //           </div>
// //           {/* Right Column - Products Section */}
// //           <div
// //             style={{
// //               flex: 1,
// //               minWidth: "300px",
// //               display: "flex",
// //               flexDirection: "column",
// //               gap: "1.8rem",
// //               height: "100%",
// //               overflow: "hidden",
// //             }}
// //           >
// //             {/* Products Section */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 height: "100%",
// //                 gap: "1.2rem",
// //               }}
// //             >
// //               <h3
// //                 style={{
// //                   fontSize: "1.1rem",
// //                   fontWeight: "600",
// //                   color: currentTheme.text,
// //                   margin: 0,
// //                 }}
// //               >
// //                 Product Management
// //               </h3>
// //               <button
// //                 onClick={handleAddProducts}
// //                 disabled={isLoadingProducts || productsModalOpened}
// //                 style={{
// //                   width: "100%",
// //                   background: "#10b981",
// //                   color: "white",
// //                   border: "none",
// //                   padding: "0.8rem",
// //                   borderRadius: "10px",
// //                   fontSize: "0.9rem",
// //                   fontWeight: "500",
// //                   cursor:
// //                     isLoadingProducts || productsModalOpened
// //                       ? "not-allowed"
// //                       : "pointer",
// //                   transition: "background-color 0.2s",
// //                   opacity: isLoadingProducts || productsModalOpened ? 0.6 : 1,
// //                   height: "48px",
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   if (!isLoadingProducts && !productsModalOpened) {
// //                     e.target.style.background = "#059669";
// //                   }
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   if (!isLoadingProducts && !productsModalOpened) {
// //                     e.target.style.background = "#10b981";
// //                   }
// //                 }}
// //               >
// //                 {getAddProductsButtonText()}
// //               </button>
// //               {/* Saved Products Section */}
// //               <div
// //                 style={{
// //                   flex: 1,
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   overflow: "hidden",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     fontSize: "0.9rem",
// //                     fontWeight: "600",
// //                     color: currentTheme.text,
// //                     marginBottom: "0.8rem",
// //                   }}
// //                 >
// //                   Saved Products{" "}
// //                   {savedProducts.length > 0 && `(${savedProducts.length})`}
// //                 </div>
// //                 {isLoadingSavedProducts ? (
// //                   <div
// //                     style={{
// //                       textAlign: "center",
// //                       padding: "1.2rem",
// //                       color: currentTheme.text,
// //                       fontSize: "0.85rem",
// //                       border: `1px solid ${currentTheme.border}`,
// //                       borderRadius: "10px",
// //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// //                       height: "70px",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                     }}
// //                   >
// //                     Loading saved products...
// //                   </div>
// //                 ) : savedProducts.length > 0 ? (
// //                   <div
// //                     style={{
// //                       flex: 1,
// //                       overflowY: "auto",
// //                       border: `1px solid ${currentTheme.border}`,
// //                       borderRadius: "10px",
// //                       padding: "0.8rem",
// //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// //                       maxHeight: "250px",
// //                     }}
// //                   >
// //                     {savedProducts.map((product) => (
// //                       <div
// //                         key={product.video_product_id || product.id}
// //                         style={{
// //                           display: "flex",
// //                           alignItems: "center",
// //                           gap: "0.8rem",
// //                           padding: "0.8rem",
// //                           marginBottom: "0.5rem",
// //                           background: isDarkTheme ? "#374151" : "#ffffff",
// //                           borderRadius: "8px",
// //                           fontSize: "0.8rem",
// //                           position: "relative",
// //                         }}
// //                       >
// //                         {product.image_url ? (
// //                           <img
// //                             src={product.image_url}
// //                             alt={product.title}
// //                             style={{
// //                               width: "28px",
// //                               height: "28px",
// //                               borderRadius: "6px",
// //                               objectFit: "cover",
// //                             }}
// //                           />
// //                         ) : (
// //                           <div
// //                             style={{
// //                               width: "28px",
// //                               height: "28px",
// //                               background: "#3b82f6",
// //                               borderRadius: "6px",
// //                               display: "flex",
// //                               alignItems: "center",
// //                               justifyContent: "center",
// //                               color: "white",
// //                               fontSize: "0.75rem",
// //                               fontWeight: "bold",
// //                             }}
// //                           >
// //                             P
// //                           </div>
// //                         )}
// //                         <div style={{ flex: 1, minWidth: 0 }}>
// //                           <div
// //                             style={{
// //                               color: currentTheme.text,
// //                               fontWeight: "500",
// //                               whiteSpace: "nowrap",
// //                               overflow: "hidden",
// //                               textOverflow: "ellipsis",
// //                             }}
// //                           >
// //                             {product.title}
// //                           </div>
// //                           <div
// //                             style={{
// //                               color: "#10b981",
// //                               fontSize: "0.75rem",
// //                             }}
// //                           >
// //                             ${product.price}
// //                           </div>

// //                           {/* Enable Video on Product Page Checkbox */}
// //                           <div
// //                             style={{
// //                               display: "flex",
// //                               alignItems: "center",
// //                               gap: "0.5rem",
// //                               marginTop: "0.3rem",
// //                             }}
// //                           >
// //                             <input
// //                               type="checkbox"
// //                               checked={enableStatuses[product.id] || false}
// //                               onChange={() =>
// //                                 toggleEnableStatus(
// //                                   product.id,
// //                                   enableStatuses[product.id] || false
// //                                 )
// //                               }
// //                               style={{
// //                                 width: "14px",
// //                                 height: "14px",
// //                                 cursor: "pointer",
// //                               }}
// //                             />
// //                             <label
// //                               style={{
// //                                 fontSize: "0.7rem",
// //                                 color: currentTheme.text,
// //                                 cursor: "pointer",
// //                               }}
// //                             >
// //                               Enable Video on Product Page
// //                             </label>
// //                           </div>
// //                         </div>
// //                         {/* Remove Product Button - FIXED: Now uses correct API endpoint */}
// //                         <button
// //                           onClick={(e) => {
// //                             e.stopPropagation(); // Prevent event bubbling
// //                             handleRemoveProduct(
// //                               product.shopify_product_id || product.id,
// //                             );
// //                           }}
// //                           style={{
// //                             background: "transparent",
// //                             border: "none",
// //                             color: "#ef4444",
// //                             cursor: "pointer",
// //                             padding: "4px",
// //                             borderRadius: "4px",
// //                             fontSize: "0.7rem",
// //                             display: "flex",
// //                             alignItems: "center",
// //                             justifyContent: "center",
// //                             width: "20px",
// //                             height: "20px",
// //                           }}
// //                           onMouseEnter={(e) => {
// //                             e.target.style.background = "#ef4444";
// //                             e.target.style.color = "white";
// //                           }}
// //                           onMouseLeave={(e) => {
// //                             e.target.style.background = "transparent";
// //                             e.target.style.color = "#ef4444";
// //                           }}
// //                           title="Remove product"
// //                         >
// //                           ✕
// //                         </button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div
// //                     style={{
// //                       textAlign: "center",
// //                       padding: "1.2rem",
// //                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
// //                       fontSize: "0.85rem",
// //                       fontStyle: "italic",
// //                       border: `1px dashed ${currentTheme.border}`,
// //                       borderRadius: "10px",
// //                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
// //                       height: "70px",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                     }}
// //                   >
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
// //     </>
// //   );
// // }

// // components/videogallerycomponents/VideoOptionsModal.jsx

// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";

// import {
//   restrictToVerticalAxis,
//   restrictToParentElement,
// } from "@dnd-kit/modifiers";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { useState, useEffect, useRef } from "react";
// import ProductsModal from "./ProductsModal";
// import VideoPlayerWithHover from "./VideoPlayerWithHover";

// export default function VideoOptionsModal({
//   showVideoOptions,
//   onHide,
//   onCopyUrl,
//   onDownload,
//   onLoadProducts,
//   onDelete,
//   isDarkTheme,
//   selectedProducts,
//   products,
//   onToggleProduct,
//   onSaveProducts,
//   showVideoPlayerModal,
//   productsModalOpened,
//   closeProductsModal,
//   onProductsReordered,
// }) {
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
//   const [savedProducts, setSavedProducts] = useState([]);
//   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
//   const [items, setItems] = useState([]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor),
//   );

//   // Fix 1: Complete SortableProductCard Component
//   const SortableProductCard = ({ product, onRemove }) => {
//     const {
//       attributes,
//       listeners,
//       setNodeRef,
//       transform,
//       transition,
//       isDragging,
//     } = useSortable({ id: product.video_product_id || product.id });

//     const style = {
//       transform: CSS.Transform.toString(transform),
//       transition,
//     };

//     return (
//       <div
//         ref={setNodeRef}
//         style={{
//           ...style,
//           display: "flex",
//           alignItems: "center",
//           gap: "0.8rem",
//           padding: "0.8rem",
//           marginBottom: "0.5rem",
//           background: isDarkTheme ? "#374151" : "#ffffff",
//           borderRadius: "8px",
//           fontSize: "0.8rem",
//           position: "relative",
//           opacity: isDragging ? 0.5 : 1,
//           cursor: isDragging ? "grabbing" : "grab",
//         }}
//         {...attributes}
//         {...listeners}
//       >
//         {product.image_url ? (
//           <img
//             src={product.image_url}
//             alt={product.title}
//             style={{
//               width: "28px",
//               height: "28px",
//               borderRadius: "6px",
//               objectFit: "cover",
//             }}
//           />
//         ) : (
//           <div
//             style={{
//               width: "28px",
//               height: "28px",
//               background: "#3b82f6",
//               borderRadius: "6px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "white",
//               fontSize: "0.75rem",
//               fontWeight: "bold",
//             }}
//           >
//             P
//           </div>
//         )}
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div
//             style={{
//               color: currentTheme.text,
//               fontWeight: "500",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {product.title}
//           </div>
//           <div
//             style={{
//               color: "#10b981",
//               fontSize: "0.75rem",
//             }}
//           >
//             ${product.price}
//           </div>
//         </div>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onRemove(product.shopify_product_id || product.id);
//           }}
//           style={{
//             background: "transparent",
//             border: "none",
//             color: "#ef4444",
//             cursor: "pointer",
//             padding: "4px",
//             borderRadius: "4px",
//             fontSize: "0.7rem",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: "20px",
//             height: "20px",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.background = "#ef4444";
//             e.target.style.color = "white";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.background = "transparent";
//             e.target.style.color = "#ef4444";
//           }}
//           title="Remove product"
//         >
//           ✕
//         </button>
//       </div>
//     );
//   };

//   // MODIFIED: Call parent callback when modal closes
//   const handleHideProductsModal = () => {
//     if (closeProductsModal) {
//       closeProductsModal();
//     }
//     productsModalOpenedRef.current = false;
//   const [enableStatuses, setEnableStatuses] = useState({}); // Store enable status for each product
//   const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);

//     // Refresh saved products AND notify parent to refresh all videos
//     setTimeout(() => {
//       fetchSavedProducts();
//       if (onProductsReordered) {
//         onProductsReordered(); // Trigger refresh in parent
//       }
//     }, 300);
//   };

//   // Fix 2: Update handleRemoveProduct to update both states
//   const handleRemoveProduct = async (productId) => {
//     try {
//       const response = await fetch(
//         `/api/video-products/${showVideoOptions.video.id}/delete`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ productId }),
//         },
//       );

//       const result = await response.json();

//       if (result.success) {
//         // Remove from both states
//         setSavedProducts((prev) =>
//           prev.filter(
//             (product) =>
//               product.shopify_product_id !== productId &&
//               product.id !== productId,
//           ),
//         );
//         setItems(
//           (
//             prev, // ADD THIS
//           ) =>
//             prev.filter(
//               (product) =>
//                 product.shopify_product_id !== productId &&
//                 product.id !== productId,
//             ),
//         );
//         console.log("✅ Product removed successfully");
//       } else {
//         console.error("Failed to remove product:", result.error);
//       }
//     } catch (error) {
//       console.error("Error removing product:", error);
//     }
//   };

//   // function handleDragEnd(event) {
//   //   const { active, over } = event;

//   //   if (over && active.id !== over.id) {
//   //     setItems((items) => {
//   //       const oldIndex = items.findIndex(
//   //         (item) => (item.video_product_id || item.id) === active.id,
//   //       );
//   //       const newIndex = items.findIndex(
//   //         (item) => (item.video_product_id || item.id) === over.id,
//   //       );

//   //       const newItems = arrayMove(items, oldIndex, newIndex);
//   //       return newItems;
//   //     });
//   //   }
//   // }

//   function handleDragEnd(event) {
//     const { active, over } = event;

//     if (over && active.id !== over.id) {
//       setItems((items) => {
//         const oldIndex = items.findIndex(
//           (item) => (item.video_product_id || item.id) === active.id,
//         );
//         const newIndex = items.findIndex(
//           (item) => (item.video_product_id || item.id) === over.id,
//         );

//         const newItems = arrayMove(items, oldIndex, newIndex);

//         // 🔥 ADD THIS LINE: Save the new order to backend
//         saveProductOrder(newItems);

//         return newItems;
//       });
//     }
//   }
//   // Fetch saved products when modal opens or video changes
// useEffect(() => {
//   if (showVideoOptions.show && showVideoOptions.video?.id) {
//     fetchSavedProducts();
//     fetchEnableStatuses();
//   } else {
//     setItems([]);
//   }
// }, [showVideoOptions.show, showVideoOptions.video?.id]);

//   // FIX: Auto-refresh when productsModalOpened becomes false (modal closes)
//   useEffect(() => {
//     if (
//       !productsModalOpened &&
//       showVideoOptions.show &&
//       showVideoOptions.video?.id
//     ) {
//       fetchSavedProducts();
//       fetchEnableStatuses();
//     }
//   }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);

//   const fetchSavedProducts = async () => {
//     try {
//       setIsLoadingSavedProducts(true);
//       const response = await fetch(
//         `/api/video-products/${showVideoOptions.video.id}`,
//       );
//       const result = await response.json();

//       if (result.success) {
//         setSavedProducts(result.products);
//         setItems(result.products);
//         console.log(
//           "✅ Loaded saved products for display:",
//           result.products.length,
//         );
//       } else {
//         console.error("Failed to fetch saved products:", result.error);
//         setSavedProducts([]);
//         setItems([]);
//       }
//     } catch (error) {
//       console.error("Error fetching saved products:", error);
//       setSavedProducts([]);
//       setItems([]);
//     } finally {
//       setIsLoadingSavedProducts(false);
//     }
//   };

//   const saveProductOrder = async (orderedProducts) => {
//     try {
//       const productOrder = orderedProducts.map((product, index) => ({
//         productId: product.shopify_product_id || product.id,
//         position: index + 1, // 1-based indexing
//       }));

//       const response = await fetch(
//         `/api/video-products/${showVideoOptions.video.id}/reorder`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ productOrder }),
//         },
//       );
//   // NEW: Fetch enable statuses for all products in this video
//   const fetchEnableStatuses = async () => {
//     try {
//       const response = await fetch(
//         `/api/videooptionsmodal-enableoption?videoId=${showVideoOptions.video.id}`,
//       );
//       const result = await response.json();

//       if (result.success) {
//         // Create a map of product_id -> enable status
//         const statusMap = {};
//         result.data.forEach(item => {
//           statusMap[item.product_id] = item.status;
//         });
//         setEnableStatuses(statusMap);
//         console.log("✅ Loaded enable statuses:", statusMap);
//       } else {
//         console.error("Failed to fetch enable statuses:", result.error);
//         setEnableStatuses({});
//       }
//     } catch (error) {
//       console.error("Error fetching enable statuses:", error);
//       setEnableStatuses({});
//     }
//   };

//   // NEW: Toggle enable status for a product
//   const toggleEnableStatus = async (productId, currentStatus) => {
//     const newStatus = !currentStatus;

//     try {
//       const response = await fetch('/api/videooptionsmodal-enableoption', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           videoId: showVideoOptions.video.id,
//           productId: productId,
//           status: newStatus
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         console.log("✅ Product order saved successfully");
//       } else {
//         console.error("Failed to save product order:", result.error);
//       }
//     } catch (error) {
//       console.error("Error saving product order:", error);
//     }
//   };
//         // Update local state immediately
//         setEnableStatuses(prev => ({
//           ...prev,
//           [productId]: newStatus
//         }));
//         console.log(`✅ Enable status updated to: ${newStatus}`);
//       } else {
//         console.error("Failed to update enable status:", result.error);
//       }
//     } catch (error) {
//       console.error("Error updating enable status:", error);
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onHide();
//     }
//   };

//   const handleOptionClick = (action) => {
//     action();
//     onHide();
//   };

//   const handleVideoClick = () => {
//     setShowFullScreenVideo(true);
//   };

//   const handleCloseFullScreenVideo = () => {
//     setShowFullScreenVideo(false);
//   };

//   // FIXED: Handle modal state properly
//   const handleAddProducts = async () => {
//     if (isLoadingProducts || productsModalOpened) {
//       console.log("⚠️ Modal already opening or opened, skipping");
//       return;
//     }

//     setIsLoadingProducts(true);

//     try {
//       // This will load products AND set the modal to show
//       if (onLoadProducts) {
//         await onLoadProducts(showVideoOptions.video);
//       }
//     } catch (error) {
//       console.error("Error loading products:", error);
//     } finally {
//       setIsLoadingProducts(false);
//     }
//   };

//   const handleSaveProducts = async () => {
//     if (onSaveProducts) {
//       await onSaveProducts();
//     }
//   };

//   // NEW: Function to remove a product
//   const handleRemoveProduct = async (productId) => {
//     try {
//       const response = await fetch(
//         `/api/video-products/${showVideoOptions.video.id}/delete`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ productId }),
//         },
//       );

//       const result = await response.json();

//       if (result.success) {
//         // Remove the product from local state immediately
//         setSavedProducts((prev) =>
//           prev.filter(
//             (product) =>
//               product.shopify_product_id !== productId &&
//               product.id !== productId,
//           ),
//         );
//         // Also remove from enable statuses
//         setEnableStatuses(prev => {
//           const newStatuses = { ...prev };
//           delete newStatuses[productId];
//           return newStatuses;
//         });
//         console.log("✅ Product removed successfully");
//       } else {
//         console.error("Failed to remove product:", result.error);
//       }
//     } catch (error) {
//       console.error("Error removing product:", error);
//     }
//   };

//   // Early return should be AFTER all hooks
//   if (!showVideoOptions.show) return null;

//   const themeStyles = {
//     light: {
//       background: "#ffffff",
//       text: "#1f2937",
//       border: "#e5e7eb",
//       shadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
//       hoverBackground: "#f3f4f6",
//       sectionBackground: "#f8fafc",
//     },
//     dark: {
//       background: "#374151",
//       text: "#f9fafb",
//       border: "#4b5563",
//       shadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
//       hoverBackground: "#4b5563",
//       sectionBackground: "#4b5563",
//     },
//   };

//   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

//   // Get the correct video URL
//   const videoUrl =
//     showVideoOptions.video?.videoUrl ||
//     showVideoOptions.video?.shopify_file_url;

//   // FIXED: Determine button text based on multiple states
//   const getAddProductsButtonText = () => {
//     if (isLoadingProducts) return "Loading Products...";
//     if (productsModalOpened) return "Opening...";
//     return "Add Products";
//   };

//   return (
//     <>
//       {/* Full Screen Video Preview */}
//       {showFullScreenVideo && videoUrl && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 10003,
//             background: "rgba(0, 0, 0, 0.9)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           onClick={handleCloseFullScreenVideo}
//         >
//           <video
//             src={videoUrl}
//             controls
//             autoPlay
//             style={{
//               maxWidth: "90%",
//               maxHeight: "90%",
//               borderRadius: "8px",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           />
//         </div>
//       )}

//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           zIndex: 10000,
//           background: "rgba(0, 0, 0, 0.5)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "1rem", // Added padding for better mobile view
//         }}
//         onClick={handleBackdropClick}
//       >
//         <div
//           style={{
//             background: currentTheme.background,
//             borderRadius: "12px",
//             border: `1px solid ${currentTheme.border}`,
//             boxShadow: currentTheme.shadow,
//             padding: "2.5rem",
//             maxWidth: "900px", // Increased width to accommodate analytics
//             minWidth: "800px", // Increased minimum width
//             maxHeight: "90vh", // Made modal scrollable
//             height: "auto",
//             minHeight: "500px",
//             zIndex: 10001,
//             animation: "scaleIn 0.2s ease-out",
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             gap: "2.5rem",
//             overflow: "auto", // Made modal scrollable
//             position: "relative",
//           }}
//         >
//           {/* Close Button */}
//           <button
//             onClick={onHide}
//             style={{
//               position: "absolute",
//               top: "1.5rem",
//               right: "1.5rem",
//               background: isDarkTheme ? "#374151" : "white",
//               border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
//               borderRadius: "50%",
//               width: "40px",
//               height: "40px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               color: isDarkTheme ? "#9ca3af" : "#6b7280",
//               fontSize: "1.3rem",
//               fontWeight: "bold",
//               zIndex: 10002,
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = isDarkTheme ? "#4b5563" : "#f3f4f6";
//               e.target.style.color = isDarkTheme ? "#f9fafb" : "#1f2937";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = isDarkTheme ? "#374151" : "white";
//               e.target.style.color = isDarkTheme ? "#9ca3af" : "#6b7280";
//             }}
//           >
//             ✕
//           </button>

//           {/* Left Column - Video Player & Analytics */}
//           <div
//             style={{
//               flex: 1,
//               minWidth: "350px",
//               display: "flex",
//               flexDirection: "column",
//               gap: "2rem",
//               position: "relative",
//             }}
//           >
//             {/* Vertical Line Separator */}
//             <div
//               style={{
//                 position: "absolute",
//                 right: "-1.25rem",
//                 top: "0",
//                 bottom: "0",
//                 width: "1px",
//                 background: isDarkTheme ? "#4b5563" : "#e5e7eb",
//                 zIndex: 1,
//               }}
//             />

//             {/* Video Player Section */}
//             <div style={{ flex: 0 }}>
//               <h3
//                 style={{
//                   fontSize: "1.1rem",
//                   fontWeight: "600",
//                   color: currentTheme.text,
//                   margin: "0 0 1.2rem 0",
//                 }}
//               >
//                 Selected Video
//               </h3>

//               {/* Video Player with Hover - Shows the clicked video */}
//               {videoUrl ? (
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "250px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     background: "transparent", // Removed background box
//                     borderRadius: "10px",
//                     overflow: "hidden",
//                     cursor: "pointer",
//                   }}
//                   onClick={handleVideoClick}
//                 >
//                   <VideoPlayerWithHover
//                     videoUrl={videoUrl}
//                     thumbnailUrl={showVideoOptions.video?.thumbnail_url}
//                     title={showVideoOptions.video?.title}
//                     onVideoClick={handleVideoClick}
//                     isDarkTheme={isDarkTheme}
//                     height="250px"
//                     width="100%"
//                     objectFit="contain"
//                   />
//                 </div>
//               ) : (
//                 <div
//                   style={{
//                     height: "200px",
//                     background: "transparent", // Removed background box
//                     borderRadius: "10px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
//                     flexDirection: "column",
//                     gap: "0.8rem",
//                   }}
//                 >
//                   <div style={{ fontSize: "1.8rem" }}>🎬</div>
//                   <div style={{ fontSize: "1rem" }}>Video not available</div>
//                 </div>
//               )}
//             </div>

//             {/* Analytics Section - Added under the video */}
//             <div
//               style={{
//                 background: isDarkTheme ? "#1f2937" : "#f8fafc",
//                 borderRadius: "10px",
//                 padding: "0.5rem", // Reduced height
//                 border: `1px solid ${isDarkTheme ? "#374151" : "#e5e7eb"}`,
//               }}
//             >
//               <h4
//                 style={{
//                   fontSize: "0.9rem", // Smaller font
//                   fontWeight: "600",
//                   color: currentTheme.text,
//                   margin: "0 0 0.75rem 0", // Reduced margin
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "0.5rem",
//                 }}
//               >
//                 <span style={{
//                   fontSize: "1rem", // Smaller icon
//                   filter: isDarkTheme ? "invert(1)" : "none"
//                 }}>
//                   ▦
//                 </span>
//                 Video Analytics
//               </h4>

//               {/* Added Date */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "0.5rem",
//                   marginBottom: "0.75rem", // Reduced margin
//                   color: isDarkTheme ? "#9ca3af" : "#6b7280",
//                   fontSize: "0.75rem", // Smaller font
//                 }}
//               >
//                 <span style={{ fontWeight: "500" }}>Added in Homepage</span>
//                 <span>•</span>
//                 <span>Added on - {new Date(showVideoOptions.video?.created_at || Date.now()).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: '2-digit',
//                   day: '2-digit'
//                 })}</span>
//               </div>

//               {/* Analytics Grid - Reduced spacing */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "0.75rem", // Reduced gap
//                   marginBottom: "1rem", // Reduced margin
//                 }}
//               >
//                 {/* Video Clicks */}
//                 <div
//                   style={{
//                     background: isDarkTheme ? "#374151" : "white",
//                     borderRadius: "6px", // Smaller border radius
//                     padding: "0.75rem", // Reduced padding
//                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
//                     textAlign: "center",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "1.25rem", // Smaller font
//                       fontWeight: "bold",
//                       color: currentTheme.text,
//                       marginBottom: "0.2rem", // Reduced margin
//                     }}
//                   >
//                     5
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "0.7rem", // Smaller font
//                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
//                       fontWeight: "500",
//                     }}
//                   >
//                     Video Clicks
//                   </div>
//                 </div>

//                 {/* Watch Time */}
//                 <div
//                   style={{
//                     background: isDarkTheme ? "#374151" : "white",
//                     borderRadius: "6px",
//                     padding: "0.75rem",
//                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
//                     textAlign: "center",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "1.25rem",
//                       fontWeight: "bold",
//                       color: currentTheme.text,
//                       marginBottom: "0.2rem",
//                     }}
//                   >
//                     0 sec
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "0.7rem",
//                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
//                       fontWeight: "500",
//                     }}
//                   >
//                     Watch Time
//                   </div>
//                 </div>

//                 {/* Engaged Sessions */}
//                 <div
//                   style={{
//                     background: isDarkTheme ? "#374151" : "white",
//                     borderRadius: "6px",
//                     padding: "0.75rem",
//                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
//                     textAlign: "center",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "1.25rem",
//                       fontWeight: "bold",
//                       color: currentTheme.text,
//                       marginBottom: "0.2rem",
//                     }}
//                   >
//                     0
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "0.7rem",
//                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
//                       fontWeight: "500",
//                     }}
//                   >
//                     Engaged Sessions
//                   </div>
//                 </div>

//                 {/* Products Tagged */}
//                 <div
//                   style={{
//                     background: isDarkTheme ? "#374151" : "white",
//                     borderRadius: "6px",
//                     padding: "0.75rem",
//                     border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
//                     textAlign: "center",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "1.25rem",
//                       fontWeight: "bold",
//                       color: currentTheme.text,
//                       marginBottom: "0.2rem",
//                     }}
//                   >
//                     {savedProducts.length}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "0.7rem",
//                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
//                       fontWeight: "500",
//                     }}
//                   >
//                     Products Tagged
//                   </div>
//                 </div>
//               </div>

//               {/* Stories Settings - Reduced size */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   padding: "0.5rem", // Reduced padding
//                   background: isDarkTheme ? "#374151" : "white",
//                   borderRadius: "4px", // Smaller border radius
//                   border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem", // Reduced gap
//                   }}
//                 >
//                   <input
//                     type="checkbox"
//                     style={{
//                       width: "14px", // Smaller checkbox
//                       height: "14px",
//                       cursor: "pointer",
//                     }}
//                   />
//                   <span
//                     style={{
//                       color: currentTheme.text,
//                       fontSize: "0.75rem", // Smaller font
//                       fontWeight: "500",
//                     }}
//                   >
//                     Stories Settings
//                   </span>
//                 </div>
//                 <button
//                   style={{
//                     background: "transparent",
//                     border: "none",
//                     color: isDarkTheme ? "#9ca3af" : "#6b7280",
//                     cursor: "pointer",
//                     fontSize: "1rem", // Smaller icon
//                   }}
//                 >
//                   ⚙️
//                 </button>
//               </div>
//             </div>

//             {/* Video Actions Section - Horizontal layout below analytics */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: "15px",
//                 marginTop: "0rem",
//               }}
//             >
//               <button
//                 onClick={() =>
//                   handleOptionClick(() =>
//                     onCopyUrl(showVideoOptions.video.shopify_file_url),
//                   )
//                 }
//                 title="Copy Video URL"
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   color: currentTheme.text,
//                   borderRadius: "10px",
//                   fontSize: "1.5rem",
//                   fontWeight: "500",
//                   cursor: "pointer",
//                   transition: "all 0.2s",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "45px",
//                   height: "45px",
//                   opacity: 0.8,
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = "scale(1.1)";
//                   e.target.style.opacity = "1";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = "scale(1)";
//                   e.target.style.opacity = "0.8";
//                 }}
//               >
//                 <img
//                   src="/link.png"
//                   alt="Copy Link"
//                   style={{
//                     width: "22px",
//                     height: "22px",
//                     filter: isDarkTheme ? "none" : "invert(1)",
//                   }}
//                 />
//               </button>
//               <button
//                 onClick={() =>
//                   handleOptionClick(() => onDownload(showVideoOptions.video))
//                 }
//                 title="Download Video"
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   color: currentTheme.text,
//                   borderRadius: "10px",
//                   fontSize: "1.5rem",
//                   fontWeight: "500",
//                   cursor: "pointer",
//                   transition: "all 0.2s",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "45px",
//                   height: "45px",
//                   opacity: 0.8,
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = "scale(1.1)";
//                   e.target.style.opacity = "1";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = "scale(1)";
//                   e.target.style.opacity = "0.8";
//                 }}
//               >
//                 <img
//                   src="/download.png"
//                   alt="Download"
//                   style={{
//                     width: "22px",
//                     height: "22px",
//                     filter: isDarkTheme ? "none" : "invert(1)",
//                   }}
//                 />
//               </button>
//               <button
//                 onClick={() =>
//                   handleOptionClick(() =>
//                     onDelete(
//                       showVideoOptions.video.id,
//                       showVideoOptions.video.title,
//                     ),
//                   )
//                 }
//                 title="Delete Video"
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   color: "#ef4444",
//                   borderRadius: "10px",
//                   fontSize: "1.5rem",
//                   fontWeight: "500",
//                   cursor: "pointer",
//                   transition: "all 0.2s",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "45px",
//                   height: "45px",
//                   opacity: 0.8,
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = "scale(1.1)";
//                   e.target.style.opacity = "1";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = "scale(1)";
//                   e.target.style.opacity = "0.8";
//                 }}
//               >
//                 <img
//                   src="/trash.png"
//                   alt="Delete"
//                   style={{
//                     width: "22px",
//                     height: "22px",
//                   }}
//                 />
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Products Section */}
//           <div
//             style={{
//               flex: 1,
//               minWidth: "300px",
//               display: "flex",
//               flexDirection: "column",
//               gap: "1.8rem",
//               height: "100%",
//               overflow: "hidden",
//             }}
//           >
//             {/* Products Section */}
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "100%",
//                 gap: "1.2rem",
//               }}
//             >
//               <h3
//                 style={{
//                   fontSize: "1.1rem",
//                   fontWeight: "600",
//                   color: currentTheme.text,
//                   margin: 0,
//                 }}
//               >
//                 Product Management
//               </h3>

//               <button
//                 onClick={handleAddProducts}
//                 disabled={isLoadingProducts || productsModalOpened}
//                 style={{
//                   width: "100%",
//                   background: "#10b981",
//                   color: "white",
//                   border: "none",
//                   padding: "0.8rem",
//                   borderRadius: "10px",
//                   fontSize: "0.9rem",
//                   fontWeight: "500",
//                   cursor:
//                     isLoadingProducts || productsModalOpened
//                       ? "not-allowed"
//                       : "pointer",
//                   transition: "background-color 0.2s",
//                   opacity: isLoadingProducts || productsModalOpened ? 0.6 : 1,
//                   height: "48px",
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isLoadingProducts && !productsModalOpened) {
//                     e.target.style.background = "#059669";
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isLoadingProducts && !productsModalOpened) {
//                     e.target.style.background = "#10b981";
//                   }
//                 }}
//               >
//                 {getAddProductsButtonText()}
//               </button>

//               {/* Saved Products Section */}
//               <div
//                 style={{
//                   flex: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   overflow: "hidden",
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: "0.9rem",
//                     fontWeight: "600",
//                     color: currentTheme.text,
//                     marginBottom: "0.8rem",
//                   }}
//                 >
//                   Saved Products{" "}
//                   {/* {savedProducts.length > 0 && `(${savedProducts.length})`} */}
//                   {items.length > 0 && `(${items.length})`}
//                 </div>

//                 {isLoadingSavedProducts ? (
//                   <div
//                     style={{
//                       textAlign: "center",
//                       padding: "1.2rem",
//                       color: currentTheme.text,
//                       fontSize: "0.85rem",
//                       border: `1px solid ${currentTheme.border}`,
//                       borderRadius: "10px",
//                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
//                       height: "70px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     Loading saved products...
//                   </div>
//                 ) : items.length > 0 ? (
//                   <div
//                     style={{
//                       flex: 1,
//                       overflowY: "auto",
//                       border: `1px solid ${currentTheme.border}`,
//                       borderRadius: "10px",
//                       padding: "0.8rem",
//                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
//                       maxHeight: "250px",
//                     }}
//                   >
//                     <DndContext
//                       sensors={sensors}
//                       collisionDetection={closestCenter}
//                       onDragEnd={handleDragEnd}
//                       modifiers={[
//                         restrictToVerticalAxis,
//                         restrictToParentElement,
//                       ]}
//                     >
//                       <SortableContext
//                         items={items.map(
//                           (item) => item.video_product_id || item.id,
//                         )}
//                         strategy={verticalListSortingStrategy}
//                       >
//                         {items.map((product) => (
//                           <SortableProductCard
//                             key={product.video_product_id || product.id}
//                             product={product}
//                             onRemove={handleRemoveProduct}
//                           />
//                         ))}
//                       </SortableContext>
//                     </DndContext>
//                         ) : (
//                           <div
//                             style={{
//                               width: "28px",
//                               height: "28px",
//                               background: "#3b82f6",
//                               borderRadius: "6px",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               color: "white",
//                               fontSize: "0.75rem",
//                               fontWeight: "bold",
//                             }}
//                           >
//                             P
//                           </div>
//                         )}
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                           <div
//                             style={{
//                               color: currentTheme.text,
//                               fontWeight: "500",
//                               whiteSpace: "nowrap",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                             }}
//                           >
//                             {product.title}
//                           </div>
//                           <div
//                             style={{
//                               color: "#10b981",
//                               fontSize: "0.75rem",
//                             }}
//                           >
//                             ${product.price}
//                           </div>

//                           {/* NEW: Enable Video on Product Page Checkbox */}
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.5rem",
//                               marginTop: "0.3rem",
//                             }}
//                           >
//                             <input
//                               type="checkbox"
//                               checked={enableStatuses[product.id] || false}
//                               onChange={() =>
//                                 toggleEnableStatus(
//                                   product.id,
//                                   enableStatuses[product.id] || false
//                                 )
//                               }
//                               style={{
//                                 width: "14px",
//                                 height: "14px",
//                                 cursor: "pointer",
//                               }}
//                             />
//                             <label
//                               style={{
//                                 fontSize: "0.7rem",
//                                 color: currentTheme.text,
//                                 cursor: "pointer",
//                               }}
//                             >
//                               Enable Video on Product Page
//                             </label>
//                           </div>
//                         </div>
//                         {/* Remove Product Button */}
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation(); // Prevent event bubbling
//                             handleRemoveProduct(
//                               product.shopify_product_id || product.id,
//                             );
//                           }}
//                           style={{
//                             background: "transparent",
//                             border: "none",
//                             color: "#ef4444",
//                             cursor: "pointer",
//                             padding: "4px",
//                             borderRadius: "4px",
//                             fontSize: "0.7rem",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             width: "20px",
//                             height: "20px",
//                           }}
//                           onMouseEnter={(e) => {
//                             e.target.style.background = "#ef4444";
//                             e.target.style.color = "white";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.background = "transparent";
//                             e.target.style.color = "#ef4444";
//                           }}
//                           title="Remove product"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div
//                     style={{
//                       textAlign: "center",
//                       padding: "1.2rem",
//                       color: isDarkTheme ? "#9ca3af" : "#6b7280",
//                       fontSize: "0.85rem",
//                       fontStyle: "italic",
//                       border: `1px dashed ${currentTheme.border}`,
//                       borderRadius: "10px",
//                       background: isDarkTheme ? "#1f2937" : "#f8fafc",
//                       height: "70px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
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

//       {/* ProductsModal is now controlled by the parent component through showProductsModal state */}
//     </>
//   );
// }

// components/videogallerycomponents/VideoOptionsModal.jsx

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect, useRef } from "react";
import ProductsModal from "./ProductsModal";
import VideoPlayerWithHover from "./VideoPlayerWithHover";

export default function VideoOptionsModal({
  showVideoOptions,
  onHide,
  onCopyUrl,
  onDownload,
  onLoadProducts,
  onDelete,
  isDarkTheme,
  selectedProducts,
  products,
  onToggleProduct,
  onSaveProducts,
  showVideoPlayerModal,
  productsModalOpened,
  closeProductsModal,
  onProductsReordered,
}) {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
  const [items, setItems] = useState([]);
  const [enableStatuses, setEnableStatuses] = useState({}); // Store enable status for each product
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
  const productsModalOpenedRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  // Fix 1: Complete SortableProductCard Component
  const SortableProductCard = ({ product, onRemove }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: product.video_product_id || product.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const themeStyles = {
      light: {
        background: "#ffffff",
        text: "#1f2937",
        border: "#e5e7eb",
        shadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        hoverBackground: "#f3f4f6",
        sectionBackground: "#f8fafc",
      },
      dark: {
        background: "#374151",
        text: "#f9fafb",
        border: "#4b5563",
        shadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
        hoverBackground: "#4b5563",
        sectionBackground: "#4b5563",
      },
    };

    const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          padding: "0.8rem",
          marginBottom: "0.5rem",
          background: isDarkTheme ? "#374151" : "#ffffff",
          borderRadius: "8px",
          fontSize: "0.8rem",
          position: "relative",
          opacity: isDragging ? 0.5 : 1,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        {...attributes}
        {...listeners}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "#3b82f6",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            P
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: currentTheme.text,
              fontWeight: "500",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.title}
          </div>
          <div
            style={{
              color: "#10b981",
              fontSize: "0.75rem",
            }}
          >
            ${product.price}
          </div>

          {/* NEW: Enable Video on Product Page Checkbox */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.3rem",
            }}
          >
            <input
              type="checkbox"
              checked={enableStatuses[product.id] || false}
              onChange={() =>
                toggleEnableStatus(
                  product.id,
                  enableStatuses[product.id] || false,
                )
              }
              style={{
                width: "14px",
                height: "14px",
                cursor: "pointer",
              }}
            />
            <label
              style={{
                fontSize: "0.7rem",
                color: currentTheme.text,
                cursor: "pointer",
              }}
            >
              Enable Video on Product Page
            </label>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(product.shopify_product_id || product.id);
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "#ef4444",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px",
            fontSize: "0.7rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20px",
            height: "20px",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#ef4444";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#ef4444";
          }}
          title="Remove product"
        >
          ✕
        </button>
      </div>
    );
  };

  // MODIFIED: Call parent callback when modal closes
  const handleHideProductsModal = () => {
    if (closeProductsModal) {
      closeProductsModal();
    }
    productsModalOpenedRef.current = false;

    // Refresh saved products AND notify parent to refresh all videos
    setTimeout(() => {
      fetchSavedProducts();
      if (onProductsReordered) {
        onProductsReordered(); // Trigger refresh in parent
      }
    }, 300);
  };

  // Fix 2: Update handleRemoveProduct to update both states
  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(
        `/api/video-products/${showVideoOptions.video.id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        },
      );

      const result = await response.json();

      if (result.success) {
        // Remove from both states
        setSavedProducts((prev) =>
          prev.filter(
            (product) =>
              product.shopify_product_id !== productId &&
              product.id !== productId,
          ),
        );
        setItems((prev) =>
          prev.filter(
            (product) =>
              product.shopify_product_id !== productId &&
              product.id !== productId,
          ),
        );
        // Also remove from enable statuses
        setEnableStatuses((prev) => {
          const newStatuses = { ...prev };
          delete newStatuses[productId];
          return newStatuses;
        });
        console.log("✅ Product removed successfully");
      } else {
        console.error("Failed to remove product:", result.error);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => (item.video_product_id || item.id) === active.id,
        );
        const newIndex = items.findIndex(
          (item) => (item.video_product_id || item.id) === over.id,
        );

        const newItems = arrayMove(items, oldIndex, newIndex);

        // 🔥 ADD THIS LINE: Save the new order to backend
        saveProductOrder(newItems);

        return newItems;
      });
    }
  }

  // Fetch saved products when modal opens or video changes
  useEffect(() => {
    if (showVideoOptions.show && showVideoOptions.video?.id) {
      fetchSavedProducts();
      fetchEnableStatuses();
    } else {
      setItems([]);
    }
  }, [showVideoOptions.show, showVideoOptions.video?.id]);

  // FIX: Auto-refresh when productsModalOpened becomes false (modal closes)
  useEffect(() => {
    if (
      !productsModalOpened &&
      showVideoOptions.show &&
      showVideoOptions.video?.id
    ) {
      fetchSavedProducts();
      fetchEnableStatuses();
    }
  }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);

  const fetchSavedProducts = async () => {
    try {
      setIsLoadingSavedProducts(true);
      const response = await fetch(
        `/api/video-products/${showVideoOptions.video.id}`,
      );
      const result = await response.json();

      if (result.success) {
        setSavedProducts(result.products);
        setItems(result.products);
        console.log(
          "✅ Loaded saved products for display:",
          result.products.length,
        );
      } else {
        console.error("Failed to fetch saved products:", result.error);
        setSavedProducts([]);
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching saved products:", error);
      setSavedProducts([]);
      setItems([]);
    } finally {
      setIsLoadingSavedProducts(false);
    }
  };

  const saveProductOrder = async (orderedProducts) => {
    try {
      const productOrder = orderedProducts.map((product, index) => ({
        productId: product.shopify_product_id || product.id,
        position: index + 1, // 1-based indexing
      }));

      const response = await fetch(
        `/api/video-products/${showVideoOptions.video.id}/reorder`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productOrder }),
        },
      );

      const result = await response.json();

      if (result.success) {
        console.log("✅ Product order saved successfully");
      } else {
        console.error("Failed to save product order:", result.error);
      }
    } catch (error) {
      console.error("Error saving product order:", error);
    }
  };

  // NEW: Fetch enable statuses for all products in this video
  const fetchEnableStatuses = async () => {
    try {
      const response = await fetch(
        `/api/videooptionsmodal-enableoption?videoId=${showVideoOptions.video.id}`,
      );
      const result = await response.json();

      if (result.success) {
        // Create a map of product_id -> enable status
        const statusMap = {};
        result.data.forEach((item) => {
          statusMap[item.product_id] = item.status;
        });
        setEnableStatuses(statusMap);
        console.log("✅ Loaded enable statuses:", statusMap);
      } else {
        console.error("Failed to fetch enable statuses:", result.error);
        setEnableStatuses({});
      }
    } catch (error) {
      console.error("Error fetching enable statuses:", error);
      setEnableStatuses({});
    }
  };

  // NEW: Toggle enable status for a product
  const toggleEnableStatus = async (productId, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      const response = await fetch("/api/videooptionsmodal-enableoption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: showVideoOptions.video.id,
          productId: productId,
          status: newStatus,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state immediately
        setEnableStatuses((prev) => ({
          ...prev,
          [productId]: newStatus,
        }));
        console.log(`✅ Enable status updated to: ${newStatus}`);
      } else {
        console.error("Failed to update enable status:", result.error);
      }
    } catch (error) {
      console.error("Error updating enable status:", error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  const handleOptionClick = (action) => {
    action();
    onHide();
  };

  const handleVideoClick = () => {
    setShowFullScreenVideo(true);
  };

  const handleCloseFullScreenVideo = () => {
    setShowFullScreenVideo(false);
  };

  // FIXED: Handle modal state properly
  const handleAddProducts = async () => {
    if (isLoadingProducts || productsModalOpened) {
      console.log("⚠️ Modal already opening or opened, skipping");
      return;
    }

    setIsLoadingProducts(true);

    try {
      // This will load products AND set the modal to show
      if (onLoadProducts) {
        await onLoadProducts(showVideoOptions.video);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleSaveProducts = async () => {
    if (onSaveProducts) {
      await onSaveProducts();
    }
  };

  // Early return should be AFTER all hooks
  if (!showVideoOptions.show) return null;

  const themeStyles = {
    light: {
      background: "#ffffff",
      text: "#1f2937",
      border: "#e5e7eb",
      shadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      hoverBackground: "#f3f4f6",
      sectionBackground: "#f8fafc",
    },
    dark: {
      background: "#374151",
      text: "#f9fafb",
      border: "#4b5563",
      shadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
      hoverBackground: "#4b5563",
      sectionBackground: "#4b5563",
    },
  };

  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  // Get the correct video URL
  const videoUrl =
    showVideoOptions.video?.videoUrl ||
    showVideoOptions.video?.shopify_file_url;

  // FIXED: Determine button text based on multiple states
  const getAddProductsButtonText = () => {
    if (isLoadingProducts) return "Loading Products...";
    if (productsModalOpened) return "Opening...";
    return "Add Products";
  };

  return (
    <>
      {/* Full Screen Video Preview */}
      {showFullScreenVideo && videoUrl && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10003,
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleCloseFullScreenVideo}
        >
          <video
            src={videoUrl}
            controls
            autoPlay
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem", // Added padding for better mobile view
        }}
        onClick={handleBackdropClick}
      >
        <div
          style={{
            background: currentTheme.background,
            borderRadius: "12px",
            border: `1px solid ${currentTheme.border}`,
            boxShadow: currentTheme.shadow,
            padding: "2.5rem",
            maxWidth: "900px", // Increased width to accommodate analytics
            minWidth: "800px", // Increased minimum width
            maxHeight: "90vh", // Made modal scrollable
            height: "auto",
            minHeight: "500px",
            zIndex: 10001,
            animation: "scaleIn 0.2s ease-out",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2.5rem",
            overflow: "auto", // Made modal scrollable
            position: "relative",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onHide}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: isDarkTheme ? "#374151" : "white",
              border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: isDarkTheme ? "#9ca3af" : "#6b7280",
              fontSize: "1.3rem",
              fontWeight: "bold",
              zIndex: 10002,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkTheme ? "#4b5563" : "#f3f4f6";
              e.target.style.color = isDarkTheme ? "#f9fafb" : "#1f2937";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDarkTheme ? "#374151" : "white";
              e.target.style.color = isDarkTheme ? "#9ca3af" : "#6b7280";
            }}
          >
            ✕
          </button>

          {/* Left Column - Video Player & Analytics */}
          <div
            style={{
              flex: 1,
              minWidth: "350px",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              position: "relative",
            }}
          >
            {/* Vertical Line Separator */}
            <div
              style={{
                position: "absolute",
                right: "-1.25rem",
                top: "0",
                bottom: "0",
                width: "1px",
                background: isDarkTheme ? "#4b5563" : "#e5e7eb",
                zIndex: 1,
              }}
            />

            {/* Video Player Section */}
            <div style={{ flex: 0 }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: currentTheme.text,
                  margin: "0 0 1.2rem 0",
                }}
              >
                Selected Video
              </h3>

              {/* Video Player with Hover - Shows the clicked video */}
              {videoUrl ? (
                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "transparent", // Removed background box
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={handleVideoClick}
                >
                  <VideoPlayerWithHover
                    videoUrl={videoUrl}
                    thumbnailUrl={showVideoOptions.video?.thumbnail_url}
                    title={showVideoOptions.video?.title}
                    onVideoClick={handleVideoClick}
                    isDarkTheme={isDarkTheme}
                    height="250px"
                    width="100%"
                    objectFit="contain"
                  />
                </div>
              ) : (
                <div
                  style={{
                    height: "200px",
                    background: "transparent", // Removed background box
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isDarkTheme ? "#9ca3af" : "#6b7280",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  <div style={{ fontSize: "1.8rem" }}>🎬</div>
                  <div style={{ fontSize: "1rem" }}>Video not available</div>
                </div>
              )}
            </div>

            {/* Analytics Section - Added under the video */}
            <div
              style={{
                background: isDarkTheme ? "#1f2937" : "#f8fafc",
                borderRadius: "10px",
                padding: "0.5rem", // Reduced height
                border: `1px solid ${isDarkTheme ? "#374151" : "#e5e7eb"}`,
              }}
            >
              <h4
                style={{
                  fontSize: "0.9rem", // Smaller font
                  fontWeight: "600",
                  color: currentTheme.text,
                  margin: "0 0 0.75rem 0", // Reduced margin
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1rem", // Smaller icon
                    filter: isDarkTheme ? "invert(1)" : "none",
                  }}
                >
                  ▦
                </span>
                Video Analytics
              </h4>

              {/* Added Date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem", // Reduced margin
                  color: isDarkTheme ? "#9ca3af" : "#6b7280",
                  fontSize: "0.75rem", // Smaller font
                }}
              >
                <span style={{ fontWeight: "500" }}>Added in Homepage</span>
                <span>•</span>
                <span>
                  Added on -{" "}
                  {new Date(
                    showVideoOptions.video?.created_at || Date.now(),
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>

              {/* Analytics Grid - Reduced spacing */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem", // Reduced gap
                  marginBottom: "1rem", // Reduced margin
                }}
              >
                {/* Video Clicks */}
                <div
                  style={{
                    background: isDarkTheme ? "#374151" : "white",
                    borderRadius: "6px", // Smaller border radius
                    padding: "0.75rem", // Reduced padding
                    border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.25rem", // Smaller font
                      fontWeight: "bold",
                      color: currentTheme.text,
                      marginBottom: "0.2rem", // Reduced margin
                    }}
                  >
                    5
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem", // Smaller font
                      color: isDarkTheme ? "#9ca3af" : "#6b7280",
                      fontWeight: "500",
                    }}
                  >
                    Video Clicks
                  </div>
                </div>

                {/* Watch Time */}
                <div
                  style={{
                    background: isDarkTheme ? "#374151" : "white",
                    borderRadius: "6px",
                    padding: "0.75rem",
                    border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: currentTheme.text,
                      marginBottom: "0.2rem",
                    }}
                  >
                    0 sec
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: isDarkTheme ? "#9ca3af" : "#6b7280",
                      fontWeight: "500",
                    }}
                  >
                    Watch Time
                  </div>
                </div>

                {/* Engaged Sessions */}
                <div
                  style={{
                    background: isDarkTheme ? "#374151" : "white",
                    borderRadius: "6px",
                    padding: "0.75rem",
                    border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: currentTheme.text,
                      marginBottom: "0.2rem",
                    }}
                  >
                    0
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: isDarkTheme ? "#9ca3af" : "#6b7280",
                      fontWeight: "500",
                    }}
                  >
                    Engaged Sessions
                  </div>
                </div>

                {/* Products Tagged */}
                <div
                  style={{
                    background: isDarkTheme ? "#374151" : "white",
                    borderRadius: "6px",
                    padding: "0.75rem",
                    border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: currentTheme.text,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {savedProducts.length}
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: isDarkTheme ? "#9ca3af" : "#6b7280",
                      fontWeight: "500",
                    }}
                  >
                    Products Tagged
                  </div>
                </div>
              </div>

              {/* Stories Settings - Reduced size */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem", // Reduced padding
                  background: isDarkTheme ? "#374151" : "white",
                  borderRadius: "4px", // Smaller border radius
                  border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem", // Reduced gap
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: "14px", // Smaller checkbox
                      height: "14px",
                      cursor: "pointer",
                    }}
                  />
                  <span
                    style={{
                      color: currentTheme.text,
                      fontSize: "0.75rem", // Smaller font
                      fontWeight: "500",
                    }}
                  >
                    Stories Settings
                  </span>
                </div>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: isDarkTheme ? "#9ca3af" : "#6b7280",
                    cursor: "pointer",
                    fontSize: "1rem", // Smaller icon
                  }}
                >
                  ⚙️
                </button>
              </div>
            </div>

            {/* Video Actions Section - Horizontal layout below analytics */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                marginTop: "0rem",
              }}
            >
              <button
                onClick={() =>
                  handleOptionClick(() =>
                    onCopyUrl(showVideoOptions.video.shopify_file_url),
                  )
                }
                title="Copy Video URL"
                style={{
                  background: "transparent",
                  border: "none",
                  color: currentTheme.text,
                  borderRadius: "10px",
                  fontSize: "1.5rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45px",
                  height: "45px",
                  opacity: 0.8,
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.opacity = "0.8";
                }}
              >
                <img
                  src="/link.png"
                  alt="Copy Link"
                  style={{
                    width: "22px",
                    height: "22px",
                    filter: isDarkTheme ? "none" : "invert(1)",
                  }}
                />
              </button>
              <button
                onClick={() =>
                  handleOptionClick(() => onDownload(showVideoOptions.video))
                }
                title="Download Video"
                style={{
                  background: "transparent",
                  border: "none",
                  color: currentTheme.text,
                  borderRadius: "10px",
                  fontSize: "1.5rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45px",
                  height: "45px",
                  opacity: 0.8,
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.opacity = "0.8";
                }}
              >
                <img
                  src="/download.png"
                  alt="Download"
                  style={{
                    width: "22px",
                    height: "22px",
                    filter: isDarkTheme ? "none" : "invert(1)",
                  }}
                />
              </button>
              <button
                onClick={() =>
                  handleOptionClick(() =>
                    onDelete(
                      showVideoOptions.video.id,
                      showVideoOptions.video.title,
                    ),
                  )
                }
                title="Delete Video"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ef4444",
                  borderRadius: "10px",
                  fontSize: "1.5rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45px",
                  height: "45px",
                  opacity: 0.8,
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.opacity = "0.8";
                }}
              >
                <img
                  src="/trash.png"
                  alt="Delete"
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                />
              </button>
            </div>
          </div>

          {/* Right Column - Products Section */}
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* Products Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                gap: "1.2rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: currentTheme.text,
                  margin: 0,
                }}
              >
                Product Management
              </h3>

              <button
                onClick={handleAddProducts}
                disabled={isLoadingProducts || productsModalOpened}
                style={{
                  width: "100%",
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  padding: "0.8rem",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor:
                    isLoadingProducts || productsModalOpened
                      ? "not-allowed"
                      : "pointer",
                  transition: "background-color 0.2s",
                  opacity: isLoadingProducts || productsModalOpened ? 0.6 : 1,
                  height: "48px",
                }}
                onMouseEnter={(e) => {
                  if (!isLoadingProducts && !productsModalOpened) {
                    e.target.style.background = "#059669";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoadingProducts && !productsModalOpened) {
                    e.target.style.background = "#10b981";
                  }
                }}
              >
                {getAddProductsButtonText()}
              </button>

              {/* Saved Products Section */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: currentTheme.text,
                    marginBottom: "0.8rem",
                  }}
                >
                  Saved Products {items.length > 0 && `(${items.length})`}
                </div>

                {isLoadingSavedProducts ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "1.2rem",
                      color: currentTheme.text,
                      fontSize: "0.85rem",
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: "10px",
                      background: isDarkTheme ? "#1f2937" : "#f8fafc",
                      height: "70px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Loading saved products...
                  </div>
                ) : items.length > 0 ? (
                  <div
                    style={{
                      flex: 1,
                      overflowY: "auto",
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: "10px",
                      padding: "0.8rem",
                      background: isDarkTheme ? "#1f2937" : "#f8fafc",
                      maxHeight: "250px",
                    }}
                  >
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      modifiers={[
                        restrictToVerticalAxis,
                        restrictToParentElement,
                      ]}
                    >
                      <SortableContext
                        items={items.map(
                          (item) => item.video_product_id || item.id,
                        )}
                        strategy={verticalListSortingStrategy}
                      >
                        {items.map((product) => (
                          <SortableProductCard
                            key={product.video_product_id || product.id}
                            product={product}
                            onRemove={handleRemoveProduct}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "1.2rem",
                      color: isDarkTheme ? "#9ca3af" : "#6b7280",
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                      border: `1px dashed ${currentTheme.border}`,
                      borderRadius: "10px",
                      background: isDarkTheme ? "#1f2937" : "#f8fafc",
                      height: "70px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
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

      {/* ProductsModal is now controlled by the parent component through showProductsModal state */}
    </>
  );
}
