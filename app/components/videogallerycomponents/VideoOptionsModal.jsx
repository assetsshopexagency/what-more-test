// // components/videogallerycomponents/VideoOptionsModal.jsx
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
//   productsModalOpened, // NEW: Get modal opened state
//   closeProductsModal, // NEW: Get close function
// }) {
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
//   const [showProductsModal, setShowProductsModal] = useState(false);
//   const [savedProducts, setSavedProducts] = useState([]);
//   const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
//   const productsModalOpenedRef = useRef(false);

//   // Fetch saved products when modal opens or video changes - FIXED: Add refresh trigger
//   useEffect(() => {
//     if (showVideoOptions.show && showVideoOptions.video?.id) {
//       fetchSavedProducts();
//       productsModalOpenedRef.current = false;
//     }
//   }, [showVideoOptions.show, showVideoOptions.video?.id, showProductsModal]); // NEW: Added showProductsModal as dependency

//   // FIXED: Use correct API endpoint
//   const fetchSavedProducts = async () => {
//     try {
//       setIsLoadingSavedProducts(true);
//       const response = await fetch(
//         `/api/video-products/${showVideoOptions.video.id}`,
//       );
//       const result = await response.json();

//       if (result.success) {
//         setSavedProducts(result.products);
//         console.log(
//           "✅ Loaded saved products for display:",
//           result.products.length,
//         );
//       } else {
//         console.error("Failed to fetch saved products:", result.error);
//         setSavedProducts([]);
//       }
//     } catch (error) {
//       console.error("Error fetching saved products:", error);
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

//   const handleOptionClick = (action) => {
//     action();
//     onHide();
//   };

//   const handleVideoClick = () => {
//     if (showVideoPlayerModal && showVideoOptions.video) {
//       showVideoPlayerModal(showVideoOptions.video);
//       onHide();
//     }
//   };

//   // FIXED: Handle modal state properly
//   const handleAddProducts = async () => {
//     if (
//       productsModalOpenedRef.current ||
//       isLoadingProducts ||
//       productsModalOpened
//     ) {
//       console.log("⚠️ Modal already opening or opened, skipping");
//       return;
//     }

//     productsModalOpenedRef.current = true;
//     setIsLoadingProducts(true);

//     try {
//       // This will load products AND set the modal to show
//       if (onLoadProducts) {
//         await onLoadProducts(showVideoOptions.video);
//       }
//     } catch (error) {
//       console.error("Error loading products:", error);
//       productsModalOpenedRef.current = false;
//     } finally {
//       setIsLoadingProducts(false);
//     }
//   };

//   const handleSaveProducts = async () => {
//     if (onSaveProducts) {
//       await onSaveProducts();
//     }
//     // Don't setShowProductsModal here - let the parent handle it
//     productsModalOpenedRef.current = false;
//   };

//   // FIXED: Handle modal close properly
//   const handleHideProductsModal = () => {
//     if (closeProductsModal) {
//       closeProductsModal();
//     }
//     productsModalOpenedRef.current = false;
//     // Refresh saved products when the products modal closes
//     setTimeout(() => {
//       fetchSavedProducts();
//     }, 300);
//   };

//   // Get the selected products
//   const displayProducts = selectedProducts || new Set();

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
//     if (productsModalOpenedRef.current || productsModalOpened)
//       return "Opening...";
//     return "Add Products";
//   };

//   return (
//     <>
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
//             maxWidth: "800px",
//             minWidth: "700px",
//             maxHeight: "calc(100vh - 4rem)",
//             height: "auto",
//             minHeight: "500px",
//             zIndex: 10001,
//             animation: "scaleIn 0.2s ease-out",
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             gap: "2.5rem",
//             overflow: "hidden",
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

//           {/* Left Column - Video Player */}
//           <div
//             style={{
//               flex: 1,
//               minWidth: "220px",
//               display: "flex",
//               flexDirection: "row",
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
//             <div style={{ flex: 1 }}>
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
//                     background: isDarkTheme ? "#1f2937" : "#f8fafc",
//                     borderRadius: "10px",
//                     overflow: "hidden",
//                   }}
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
//                     background: isDarkTheme ? "#374151" : "#f3f4f6",
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

//             {/* Video Actions Section */}
//             <div
//               style={{
//                 marginTop: "50px",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: "15px",
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
//                   src="/chain.png"
//                   alt="Copy Link"
//                   style={{
//                     width: "25px",
//                     height: "25px",
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
//                   src="/downloading.png"
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
//                   src="/delete.png"
//                   alt="Delete"
//                   style={{
//                     width: "18px",
//                     height: "18px",
//                     filter: isDarkTheme ? "none" : "invert(1)",
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
//                 disabled={
//                   isLoadingProducts ||
//                   productsModalOpenedRef.current ||
//                   productsModalOpened
//                 }
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
//                     isLoadingProducts ||
//                     productsModalOpenedRef.current ||
//                     productsModalOpened
//                       ? "not-allowed"
//                       : "pointer",
//                   transition: "background-color 0.2s",
//                   opacity:
//                     isLoadingProducts ||
//                     productsModalOpenedRef.current ||
//                     productsModalOpened
//                       ? 0.6
//                       : 1,
//                   height: "48px",
//                 }}
//                 onMouseEnter={(e) => {
//                   if (
//                     !isLoadingProducts &&
//                     !productsModalOpenedRef.current &&
//                     !productsModalOpened
//                   ) {
//                     e.target.style.background = "#059669";
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (
//                     !isLoadingProducts &&
//                     !productsModalOpenedRef.current &&
//                     !productsModalOpened
//                   ) {
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
//                   {savedProducts.length > 0 && `(${savedProducts.length})`}
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
//                 ) : savedProducts.length > 0 ? (
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
//                     {savedProducts.map((product) => (
//                       <div
//                         key={product.video_product_id || product.id}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "0.8rem",
//                           padding: "0.8rem",
//                           marginBottom: "0.5rem",
//                           background: isDarkTheme ? "#374151" : "#ffffff",
//                           borderRadius: "8px",
//                           fontSize: "0.8rem",
//                         }}
//                       >
//                         {product.image_url ? (
//                           <img
//                             src={product.image_url}
//                             alt={product.title}
//                             style={{
//                               width: "28px",
//                               height: "28px",
//                               borderRadius: "6px",
//                               objectFit: "cover",
//                             }}
//                           />
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
//                         </div>
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
  productsModalOpened, // NEW: Get modal opened state
  closeProductsModal, // NEW: Get close function
}) {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
  const productsModalOpenedRef = useRef(false);

  // Fetch saved products when modal opens or video changes - FIXED: Add refresh trigger
  useEffect(() => {
    if (
      showVideoOptions.show &&
      !productsModalOpened &&
      showVideoOptions.video?.id
    ) {
      // Only fetch if the modal was previously opened and is now closed
      if (productsModalOpenedRef.current === true) {
        fetchSavedProducts();
        productsModalOpenedRef.current = false;
      }
    }
  }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);

  // FIXED: Use correct API endpoint
  const fetchSavedProducts = async () => {
    try {
      setIsLoadingSavedProducts(true);
      const response = await fetch(
        `/api/video-products/${showVideoOptions.video.id}`,
      );
      const result = await response.json();

      if (result.success) {
        setSavedProducts(result.products);
        console.log(
          "✅ Loaded saved products for display:",
          result.products.length,
        );
      } else {
        console.error("Failed to fetch saved products:", result.error);
        setSavedProducts([]);
      }
    } catch (error) {
      console.error("Error fetching saved products:", error);
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

  const handleOptionClick = (action) => {
    action();
    onHide();
  };

  const handleVideoClick = () => {
    if (showVideoPlayerModal && showVideoOptions.video) {
      showVideoPlayerModal(showVideoOptions.video);
      onHide();
    }
  };

  const handleAddProducts = async () => {
    if (
      productsModalOpenedRef.current ||
      isLoadingProducts ||
      productsModalOpened
    ) {
      console.log("⚠️ Modal already opening or opened, skipping");
      return;
    }

    productsModalOpenedRef.current = true;
    setIsLoadingProducts(true);

    try {
      // This will load products AND set the modal to show
      if (onLoadProducts) {
        await onLoadProducts(showVideoOptions.video);
      }
      // Mark that we've opened the modal so the useEffect can detect the close later
      productsModalOpenedRef.current = true;
    } catch (error) {
      console.error("Error loading products:", error);
      productsModalOpenedRef.current = false;
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleSaveProducts = async () => {
    if (onSaveProducts) {
      await onSaveProducts();
    }
    // Don't setShowProductsModal here - let the parent handle it
    productsModalOpenedRef.current = false;
  };
  const handleHideProductsModal = () => {
    if (closeProductsModal) {
      closeProductsModal();
    }
    // Don't reset the ref here - let the useEffect handle it after detecting the modal close
  };
  // Get the selected products
  const displayProducts = selectedProducts || new Set();

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
    if (productsModalOpenedRef.current || productsModalOpened)
      return "Opening...";
    return "Add Products";
  };
  return (
    <>
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
            maxWidth: "800px",
            minWidth: "700px",
            maxHeight: "calc(100vh - 4rem)",
            height: "auto",
            minHeight: "500px",
            zIndex: 10001,
            animation: "scaleIn 0.2s ease-out",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2.5rem",
            overflow: "hidden",
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

          {/* Left Column - Video Player */}
          <div
            style={{
              flex: 1,
              minWidth: "220px",
              display: "flex",
              flexDirection: "row",
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
            <div style={{ flex: 1 }}>
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
                    background: isDarkTheme ? "#1f2937" : "#f8fafc",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
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
                    background: isDarkTheme ? "#374151" : "#f3f4f6",
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

            {/* Video Actions Section */}
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
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
                  src="/chain.png"
                  alt="Copy Link"
                  style={{
                    width: "25px",
                    height: "25px",
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
                  src="/downloading.png"
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
                  src="/delete.png"
                  alt="Delete"
                  style={{
                    width: "18px",
                    height: "18px",
                    filter: isDarkTheme ? "none" : "invert(1)",
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
                disabled={
                  isLoadingProducts ||
                  productsModalOpenedRef.current ||
                  productsModalOpened
                }
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
                    isLoadingProducts ||
                    productsModalOpenedRef.current ||
                    productsModalOpened
                      ? "not-allowed"
                      : "pointer",
                  transition: "background-color 0.2s",
                  opacity:
                    isLoadingProducts ||
                    productsModalOpenedRef.current ||
                    productsModalOpened
                      ? 0.6
                      : 1,
                  height: "48px",
                }}
                onMouseEnter={(e) => {
                  if (
                    !isLoadingProducts &&
                    !productsModalOpenedRef.current &&
                    !productsModalOpened
                  ) {
                    e.target.style.background = "#059669";
                  }
                }}
                onMouseLeave={(e) => {
                  if (
                    !isLoadingProducts &&
                    !productsModalOpenedRef.current &&
                    !productsModalOpened
                  ) {
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
                  Saved Products{" "}
                  {savedProducts.length > 0 && `(${savedProducts.length})`}
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
                ) : savedProducts.length > 0 ? (
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
                    {savedProducts.map((product) => (
                      <div
                        key={product.video_product_id || product.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.8rem",
                          padding: "0.8rem",
                          marginBottom: "0.5rem",
                          background: isDarkTheme ? "#374151" : "#ffffff",
                          borderRadius: "8px",
                          fontSize: "0.8rem",
                        }}
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
                        </div>
                      </div>
                    ))}
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
