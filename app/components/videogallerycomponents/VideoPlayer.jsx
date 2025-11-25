// // // // // components/videogallerycomponents/VideoPlayer.jsx
// // // // import { useState, useEffect, useRef } from "react";

// // // // export default function VideoPlayer({ 
// // // //   file, 
// // // //   index, 
// // // //   isSelected, 
// // // //   onSelect, 
// // // //   onDelete, 
// // // //   onEdit,
// // // //   onSave,
// // // //   onCancel,
// // // //   isEditing,
// // // //   editTitle,
// // // //   onEditTitleChange,
// // // //   bulkDeleteMode, 
// // // //   onShowOptions,
// // // //   theme, 
// // // //   formatDate,
// // // //   onTagProducts, // NEW: Add this prop for tag products
// // // //   onViewFullVideo,
// // // //   onCopyLink
// // // // }) {
// // // //   const videoRef = useRef(null);
// // // //   const [isPlaying, setIsPlaying] = useState(false);
// // // //   const [videoError, setVideoError] = useState(false);
// // // //   const [isHovered, setIsHovered] = useState(false);
// // // //   const [showEditMenu, setShowEditMenu] = useState(false);

// // // //   // Use proxy URL if available, otherwise fallback to original URL
// // // //   const videoSrc = file.videoUrl || file.shopify_file_url;

// // // //   // Auto-play on hover
// // // //   useEffect(() => {
// // // //     if (videoRef.current) {
// // // //       videoRef.current.loop = true;
      
// // // //       if (isHovered) {
// // // //         videoRef.current.play()
// // // //           .then(() => setIsPlaying(true))
// // // //           .catch(error => {
// // // //             console.log('Auto-play on hover failed:', error);
// // // //           });
// // // //       } else {
// // // //         videoRef.current.pause();
// // // //         setIsPlaying(false);
// // // //       }
// // // //     }
// // // //   }, [isHovered, videoSrc]);

// // // //   const handleVideoClick = (event) => {
// // // //     if (bulkDeleteMode) {
// // // //       onSelect();
// // // //     } else {
// // // //       // KEEP THIS: Video click still opens options menu
// // // //       onShowOptions(file, event);
// // // //     }
// // // //   };

// // // //   const handleVideoEnd = () => {
// // // //     // Video should loop automatically due to loop attribute
// // // //     if (videoRef.current && !videoRef.current.loop) {
// // // //       videoRef.current.currentTime = 0;
// // // //       videoRef.current.play();
// // // //     }
// // // //   };

// // // //   const handleVideoError = (e) => {
// // // //     console.error('Video error:', e);
// // // //     setVideoError(true);
// // // //     setIsPlaying(false);
// // // //   };

// // // //   const handleVideoLoad = () => {
// // // //     setVideoError(false);
// // // //   };

// // // //   const handleEditClick = (e) => {
// // // //     e.stopPropagation();
// // // //     setShowEditMenu(!showEditMenu);
// // // //   };

// // // //   const handleViewFullVideo = (e) => {
// // // //     e.stopPropagation();
// // // //     if (onViewFullVideo) {
// // // //       onViewFullVideo(file);
// // // //     }
// // // //     setShowEditMenu(false);
// // // //   };

// // // //   const handleCopyLink = (e) => {
// // // //     e.stopPropagation();
// // // //     if (onCopyLink) {
// // // //       onCopyLink(file.shopify_file_url);
// // // //     }
// // // //     setShowEditMenu(false);
// // // //   };

// // // //   const handleTagProducts = (e) => {
// // // //     e.stopPropagation();
// // // //     // NEW: Call onTagProducts instead of onShowOptions
// // // //     if (onTagProducts) {
// // // //       onTagProducts(file, e);
// // // //     }
// // // //     setShowEditMenu(false);
// // // //   };

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         background: theme.cardBackground,
// // // //         borderRadius: '12px',
// // // //         border: theme.border,
// // // //         boxShadow: theme.shadow,
// // // //         transition: 'all 0.3s ease',
// // // //         animation: `fadeIn 0.6s ease-out ${0.3 + index * 0.1}s both`,
// // // //         position: 'relative',
// // // //         overflow: 'hidden',
// // // //         width: '10rem', // INCREASED width to 10rem
// // // //         height: '20rem', // INCREASED height to 20rem
// // // //         margin: '0 auto'
// // // //       }}
// // // //       onMouseEnter={() => setIsHovered(true)}
// // // //       onMouseLeave={() => setIsHovered(false)}
// // // //     >
// // // //       {/* Bulk Delete Checkbox */}
// // // //       {bulkDeleteMode && (
// // // //         <div className="checkbox-wrapper">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={isSelected}
// // // //             onChange={onSelect}
// // // //             className="bulk-checkbox"
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       {/* Edit Button - Top Right Corner */}
// // // //       {!bulkDeleteMode && (
// // // //         <button
// // // //           onClick={handleEditClick}
// // // //           style={{
// // // //             position: 'absolute',
// // // //             top: '8px',
// // // //             right: '8px',
// // // //             background: 'rgba(0, 0, 0, 0.6)',
// // // //             border: 'none',
// // // //             borderRadius: '6px',
// // // //             color: 'white',
// // // //             padding: '6px 10px',
// // // //             fontSize: '0.7rem',
// // // //             fontWeight: '500',
// // // //             cursor: 'pointer',
// // // //             zIndex: 10,
// // // //             backdropFilter: 'blur(4px)',
// // // //             transition: 'all 0.3s ease'
// // // //           }}
// // // //           onMouseEnter={(e) => {
// // // //             e.target.style.background = 'rgba(0, 0, 0, 0.8)';
// // // //           }}
// // // //           onMouseLeave={(e) => {
// // // //             e.target.style.background = 'rgba(0, 0, 0, 0.6)';
// // // //           }}
// // // //         >
// // // //           <img src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="Edit" style={{ width: '12px', height: '12px', filter: 'invert(1)' }} />
// // // //         </button>
// // // //       )}

// // // //       {/* Edit Menu Dropdown */}
// // // //       {showEditMenu && !bulkDeleteMode && (
// // // //         <div
// // // //           style={{
// // // //             position: 'absolute',
// // // //             top: '40px',
// // // //             right: '8px',
// // // //             background: 'rgba(0, 0, 0, 0.8)',
// // // //             borderRadius: '8px',
// // // //             padding: '8px',
// // // //             zIndex: 20,
// // // //             backdropFilter: 'blur(8px)',
// // // //             border: '1px solid rgba(255, 255, 255, 0.2)',
// // // //             minWidth: '150px'
// // // //           }}
// // // //         >
// // // //           <button
// // // //             onClick={handleViewFullVideo}
// // // //             style={{
// // // //               width: '100%',
// // // //               background: 'transparent',
// // // //               border: 'none',
// // // //               color: 'white',
// // // //               padding: '8px 12px',
// // // //               borderRadius: '4px',
// // // //               fontSize: '0.75rem',
// // // //               cursor: 'pointer',
// // // //               textAlign: 'left',
// // // //               display: 'flex',
// // // //               alignItems: 'center',
// // // //               gap: '8px',
// // // //               transition: 'background 0.2s ease'
// // // //             }}
// // // //             onMouseEnter={(e) => {
// // // //               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
// // // //             }}
// // // //             onMouseLeave={(e) => {
// // // //               e.target.style.background = 'transparent';
// // // //             }}
// // // //           >
// // // //             <img src="https://cdn-icons-png.flaticon.com/512/2991/2991937.png" alt="Video" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
// // // //             View Full Video
// // // //           </button>
// // // //           <button
// // // //             onClick={handleCopyLink}
// // // //             style={{
// // // //               width: '100%',
// // // //               background: 'transparent',
// // // //               border: 'none',
// // // //               color: 'white',
// // // //               padding: '8px 12px',
// // // //               borderRadius: '4px',
// // // //               fontSize: '0.75rem',
// // // //               cursor: 'pointer',
// // // //               textAlign: 'left',
// // // //               display: 'flex',
// // // //               alignItems: 'center',
// // // //               gap: '8px',
// // // //               transition: 'background 0.2s ease'
// // // //             }}
// // // //             onMouseEnter={(e) => {
// // // //               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
// // // //             }}
// // // //             onMouseLeave={(e) => {
// // // //               e.target.style.background = 'transparent';
// // // //             }}
// // // //           >
// // // //             <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Copy Link" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
// // // //             Copy Link
// // // //           </button>
// // // //           {/* Add Tag Products option to the edit menu as well */}
// // // //           <button
// // // //             onClick={handleTagProducts}
// // // //             style={{
// // // //               width: '100%',
// // // //               background: 'transparent',
// // // //               border: 'none',
// // // //               color: 'white',
// // // //               padding: '8px 12px',
// // // //               borderRadius: '4px',
// // // //               fontSize: '0.75rem',
// // // //               cursor: 'pointer',
// // // //               textAlign: 'left',
// // // //               display: 'flex',
// // // //               alignItems: 'center',
// // // //               gap: '8px',
// // // //               transition: 'background 0.2s ease'
// // // //             }}
// // // //             onMouseEnter={(e) => {
// // // //               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
// // // //             }}
// // // //             onMouseLeave={(e) => {
// // // //               e.target.style.background = 'transparent';
// // // //             }}
// // // //           >
// // // //             <img src="https://cdn-icons-png.flaticon.com/512/3917/3917759.png" alt="Tag Products" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
// // // //             Tag Products
// // // //           </button>
// // // //         </div>
// // // //       )}

// // // //       {/* Video Player - REMOVED BACKGROUND SPACE */}
// // // //       <div 
// // // //         className="video-container"
// // // //         style={{ 
// // // //           position: 'relative',
// // // //           width: '100%',
// // // //           height: '100%'
// // // //         }}
// // // //       >
// // // //         {videoError ? (
// // // //           <div style={{
// // // //             width: '100%',
// // // //             height: '100%',
// // // //             background: '#f3f4f6',
// // // //             display: 'flex',
// // // //             alignItems: 'center',
// // // //             justifyContent: 'center',
// // // //             color: theme.mutedText,
// // // //             flexDirection: 'column',
// // // //             gap: '0.5rem'
// // // //           }}>
// // // //             <div style={{ fontSize: '2rem' }}>🎬</div>
// // // //             <div style={{ fontSize: '0.875rem', textAlign: 'center' }}>
// // // //               Video unavailable
// // // //             </div>
// // // //             <button
// // // //               onClick={() => {
// // // //                 setVideoError(false);
// // // //                 if (videoRef.current) {
// // // //                   videoRef.current.load();
// // // //                 }
// // // //               }}
// // // //               style={{
// // // //                 background: '#3b82f6',
// // // //                 color: 'white',
// // // //                 border: 'none',
// // // //                 padding: '0.25rem 0.5rem',
// // // //                 borderRadius: '4px',
// // // //                 fontSize: '0.75rem',
// // // //                 cursor: 'pointer'
// // // //               }}
// // // //             >
// // // //               Retry
// // // //             </button>
// // // //           </div>
// // // //         ) : (
// // // //           <video
// // // //             ref={videoRef}
// // // //             src={videoSrc}
// // // //             className="video-player"
// // // //             style={{
// // // //               width: '100%',
// // // //               height: '100%',
// // // //               objectFit: 'cover',
// // // //               cursor: 'pointer',
// // // //               display: 'block'
// // // //             }}
// // // //             onClick={handleVideoClick}
// // // //             onEnded={handleVideoEnd}
// // // //             onError={handleVideoError}
// // // //             onLoadedData={handleVideoLoad}
// // // //             loop
// // // //             playsInline
// // // //             preload="auto"
// // // //             muted
// // // //           />
// // // //         )}
// // // //       </div>

// // // //       {/* Tag Products Button - Bottom Middle */}
// // // //       {!bulkDeleteMode && (
// // // //         <button
// // // //           onClick={handleTagProducts}
// // // //           style={{
// // // //             position: 'absolute',
// // // //             bottom: '12px',
// // // //             left: '50%',
// // // //             transform: 'translateX(-50%)',
// // // //             background: 'rgba(0, 0, 0, 0.6)',
// // // //             border: 'none',
// // // //             borderRadius: '8px',
// // // //             color: 'white',
// // // //             padding: '8px 16px',
// // // //             fontSize: '0.75rem',
// // // //             fontWeight: '500',
// // // //             cursor: 'pointer',
// // // //             zIndex: 10,
// // // //             backdropFilter: 'blur(4px)',
// // // //             transition: 'all 0.3s ease',
// // // //             whiteSpace: 'nowrap'
// // // //           }}
// // // //           onMouseEnter={(e) => {
// // // //             e.target.style.background = 'rgba(0, 0, 0, 0.8)';
// // // //             e.target.style.transform = 'translateX(-50%) scale(1.05)';
// // // //           }}
// // // //           onMouseLeave={(e) => {
// // // //             e.target.style.background = 'rgba(0, 0, 0, 0.6)';
// // // //             e.target.style.transform = 'translateX(-50%) scale(1)';
// // // //           }}
// // // //         >
          
// // // //           Tag Products
// // // //         </button>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }



// // // // components/videogallerycomponents/VideoPlayer.jsx
// // // import { useState, useEffect, useRef } from "react";

// // // export default function VideoPlayer({ 
// // //   file, 
// // //   index, 
// // //   isSelected, 
// // //   onSelect, 
// // //   onDelete, 
// // //   onEdit,
// // //   onSave,
// // //   onCancel,
// // //   isEditing,
// // //   editTitle,
// // //   onEditTitleChange,
// // //   bulkDeleteMode, 
// // //   onShowOptions,
// // //   theme, 
// // //   formatDate,
// // //   onTagProducts,
// // //   onViewFullVideo,
// // //   onCopyLink
// // // }) {
// // //   const videoRef = useRef(null);
// // //   const [isPlaying, setIsPlaying] = useState(false);
// // //   const [videoError, setVideoError] = useState(false);
// // //   const [isHovered, setIsHovered] = useState(false);
// // //   const [showEditMenu, setShowEditMenu] = useState(false);
// // //   const [savedProducts, setSavedProducts] = useState([]);
// // //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);

// // //   // Use proxy URL if available, otherwise fallback to original URL
// // //   const videoSrc = file.videoUrl || file.shopify_file_url;

// // //   // Fetch saved products when component mounts or file changes
// // //   useEffect(() => {
// // //     if (file?.id) {
// // //       fetchSavedProducts();
// // //     }
// // //   }, [file?.id]);

// // //   const fetchSavedProducts = async () => {
// // //     try {
// // //       setIsLoadingProducts(true);
// // //       const response = await fetch(`/api/video-products/${file.id}`);
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
// // //       setIsLoadingProducts(false);
// // //     }
// // //   };

// // //   // Auto-play on hover
// // //   useEffect(() => {
// // //     if (videoRef.current) {
// // //       videoRef.current.loop = true;
      
// // //       if (isHovered) {
// // //         videoRef.current.play()
// // //           .then(() => setIsPlaying(true))
// // //           .catch(error => {
// // //             console.log('Auto-play on hover failed:', error);
// // //           });
// // //       } else {
// // //         videoRef.current.pause();
// // //         setIsPlaying(false);
// // //       }
// // //     }
// // //   }, [isHovered, videoSrc]);

// // //   const handleVideoClick = (event) => {
// // //     if (bulkDeleteMode) {
// // //       onSelect();
// // //     } else {
// // //       onShowOptions(file, event);
// // //     }
// // //   };

// // //   const handleVideoEnd = () => {
// // //     if (videoRef.current && !videoRef.current.loop) {
// // //       videoRef.current.currentTime = 0;
// // //       videoRef.current.play();
// // //     }
// // //   };

// // //   const handleVideoError = (e) => {
// // //     console.error('Video error:', e);
// // //     setVideoError(true);
// // //     setIsPlaying(false);
// // //   };

// // //   const handleVideoLoad = () => {
// // //     setVideoError(false);
// // //   };

// // //   const handleEditClick = (e) => {
// // //     e.stopPropagation();
// // //     setShowEditMenu(!showEditMenu);
// // //   };

// // //   const handleViewFullVideo = (e) => {
// // //     e.stopPropagation();
// // //     if (onViewFullVideo) {
// // //       onViewFullVideo(file);
// // //     }
// // //     setShowEditMenu(false);
// // //   };

// // //   const handleCopyLink = (e) => {
// // //     e.stopPropagation();
// // //     if (onCopyLink) {
// // //       onCopyLink(file.shopify_file_url);
// // //     }
// // //     setShowEditMenu(false);
// // //   };

// // //   const handleTagProducts = (e) => {
// // //     e.stopPropagation();
// // //     if (onTagProducts) {
// // //       onTagProducts(file, e);
// // //     }
// // //     setShowEditMenu(false);
// // //   };

// // //   // Render product images for the tag button
// // //   const renderProductImages = () => {
// // //     if (isLoadingProducts) {
// // //       return (
// // //         <div style={{
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center',
// // //           color: 'white',
// // //           fontSize: '0.6rem'
// // //         }}>
// // //           Loading...
// // //         </div>
// // //       );
// // //     }

// // //     if (savedProducts.length === 0) {
// // //       return (
// // //         <div style={{
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center',
// // //           color: 'white',
// // //           fontSize: '0.75rem',
// // //           fontWeight: '500'
// // //         }}>
// // //           Tag Products
// // //         </div>
// // //       );
// // //     }

// // //     // Show up to 3 product images
// // //     const productsToShow = savedProducts.slice(0, 3);
    
// // //     return (
// // //       <div style={{
// // //         display: 'flex',
// // //         alignItems: 'center',
// // //         justifyContent: 'center',
// // //         gap: '4px'
// // //       }}>
// // //         {productsToShow.map((product, index) => (
// // //           <div
// // //             key={product.video_product_id || product.id}
// // //             style={{
// // //               width: '20px',
// // //               height: '20px',
// // //               borderRadius: '4px',
// // //               overflow: 'hidden',
// // //               position: 'relative',
// // //               border: '1px solid rgba(255,255,255,0.3)'
// // //             }}
// // //           >
// // //             {product.image_url ? (
// // //               <img 
// // //                 src={product.image_url} 
// // //                 alt={product.title}
// // //                 style={{
// // //                   width: '100%',
// // //                   height: '100%',
// // //                   objectFit: 'cover'
// // //                 }}
// // //               />
// // //             ) : (
// // //               <div style={{
// // //                 width: '100%',
// // //                 height: '100%',
// // //                 background: '#3b82f6',
// // //                 display: 'flex',
// // //                 alignItems: 'center',
// // //                 justifyContent: 'center',
// // //                 color: 'white',
// // //                 fontSize: '0.5rem',
// // //                 fontWeight: 'bold'
// // //               }}>
// // //                 P
// // //               </div>
// // //             )}
// // //           </div>
// // //         ))}
// // //         {savedProducts.length > 3 && (
// // //           <div style={{
// // //             width: '20px',
// // //             height: '20px',
// // //             background: 'rgba(255,255,255,0.2)',
// // //             borderRadius: '4px',
// // //             display: 'flex',
// // //             alignItems: 'center',
// // //             justifyContent: 'center',
// // //             color: 'white',
// // //             fontSize: '0.5rem',
// // //             fontWeight: 'bold'
// // //           }}>
// // //             +{savedProducts.length - 3}
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div
// // //       style={{
// // //         background: theme.cardBackground,
// // //         borderRadius: '12px',
// // //         border: theme.border,
// // //         boxShadow: theme.shadow,
// // //         transition: 'all 0.3s ease',
// // //         animation: `fadeIn 0.6s ease-out ${0.3 + index * 0.1}s both`,
// // //         position: 'relative',
// // //         overflow: 'hidden',
// // //         width: '10rem',
// // //         height: '20rem',
// // //         margin: '0 auto'
// // //       }}
// // //       onMouseEnter={() => setIsHovered(true)}
// // //       onMouseLeave={() => setIsHovered(false)}
// // //     >
// // //       {/* Bulk Delete Checkbox */}
// // //       {bulkDeleteMode && (
// // //         <div className="checkbox-wrapper">
// // //           <input
// // //             type="checkbox"
// // //             checked={isSelected}
// // //             onChange={onSelect}
// // //             className="bulk-checkbox"
// // //           />
// // //         </div>
// // //       )}

// // //       {/* Edit Button - Top Right Corner */}
// // //       {!bulkDeleteMode && (
// // //         <button
// // //           onClick={handleEditClick}
// // //           style={{
// // //             position: 'absolute',
// // //             top: '8px',
// // //             right: '8px',
// // //             background: 'rgba(0, 0, 0, 0.6)',
// // //             border: 'none',
// // //             borderRadius: '6px',
// // //             color: 'white',
// // //             padding: '6px 10px',
// // //             fontSize: '0.7rem',
// // //             fontWeight: '500',
// // //             cursor: 'pointer',
// // //             zIndex: 10,
// // //             backdropFilter: 'blur(4px)',
// // //             transition: 'all 0.3s ease'
// // //           }}
// // //           onMouseEnter={(e) => {
// // //             e.target.style.background = 'rgba(0, 0, 0, 0.8)';
// // //           }}
// // //           onMouseLeave={(e) => {
// // //             e.target.style.background = 'rgba(0, 0, 0, 0.6)';
// // //           }}
// // //         >
// // //           <img src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="Edit" style={{ width: '12px', height: '12px', filter: 'invert(1)' }} />
// // //         </button>
// // //       )}

// // //       {/* Edit Menu Dropdown */}
// // //       {showEditMenu && !bulkDeleteMode && (
// // //         <div
// // //           style={{
// // //             position: 'absolute',
// // //             top: '40px',
// // //             right: '8px',
// // //             background: 'rgba(0, 0, 0, 0.8)',
// // //             borderRadius: '8px',
// // //             padding: '8px',
// // //             zIndex: 20,
// // //             backdropFilter: 'blur(8px)',
// // //             border: '1px solid rgba(255, 255, 255, 0.2)',
// // //             minWidth: '150px'
// // //           }}
// // //         >
// // //           <button
// // //             onClick={handleViewFullVideo}
// // //             style={{
// // //               width: '100%',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               color: 'white',
// // //               padding: '8px 12px',
// // //               borderRadius: '4px',
// // //               fontSize: '0.75rem',
// // //               cursor: 'pointer',
// // //               textAlign: 'left',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '8px',
// // //               transition: 'background 0.2s ease'
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               e.target.style.background = 'transparent';
// // //             }}
// // //           >
// // //             <img src="https://cdn-icons-png.flaticon.com/512/2991/2991937.png" alt="Video" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
// // //             View Full Video
// // //           </button>
// // //           <button
// // //             onClick={handleCopyLink}
// // //             style={{
// // //               width: '100%',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               color: 'white',
// // //               padding: '8px 12px',
// // //               borderRadius: '4px',
// // //               fontSize: '0.75rem',
// // //               cursor: 'pointer',
// // //               textAlign: 'left',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '8px',
// // //               transition: 'background 0.2s ease'
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               e.target.style.background = 'transparent';
// // //             }}
// // //           >
// // //             <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Copy Link" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
// // //             Copy Link
// // //           </button>
// // //           <button
// // //             onClick={handleTagProducts}
// // //             style={{
// // //               width: '100%',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               color: 'white',
// // //               padding: '8px 12px',
// // //               borderRadius: '4px',
// // //               fontSize: '0.75rem',
// // //               cursor: 'pointer',
// // //               textAlign: 'left',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '8px',
// // //               transition: 'background 0.2s ease'
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               e.target.style.background = 'transparent';
// // //             }}
// // //           >
// // //             <img src="https://cdn-icons-png.flaticon.com/512/3917/3917759.png" alt="Tag Products" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
// // //             Tag Products
// // //           </button>
// // //         </div>
// // //       )}

// // //       {/* Video Player */}
// // //       <div 
// // //         className="video-container"
// // //         style={{ 
// // //           position: 'relative',
// // //           width: '100%',
// // //           height: '100%'
// // //         }}
// // //       >
// // //         {videoError ? (
// // //           <div style={{
// // //             width: '100%',
// // //             height: '100%',
// // //             background: '#f3f4f6',
// // //             display: 'flex',
// // //             alignItems: 'center',
// // //             justifyContent: 'center',
// // //             color: theme.mutedText,
// // //             flexDirection: 'column',
// // //             gap: '0.5rem'
// // //           }}>
// // //             <div style={{ fontSize: '2rem' }}>🎬</div>
// // //             <div style={{ fontSize: '0.875rem', textAlign: 'center' }}>
// // //               Video unavailable
// // //             </div>
// // //             <button
// // //               onClick={() => {
// // //                 setVideoError(false);
// // //                 if (videoRef.current) {
// // //                   videoRef.current.load();
// // //                 }
// // //               }}
// // //               style={{
// // //                 background: '#3b82f6',
// // //                 color: 'white',
// // //                 border: 'none',
// // //                 padding: '0.25rem 0.5rem',
// // //                 borderRadius: '4px',
// // //                 fontSize: '0.75rem',
// // //                 cursor: 'pointer'
// // //               }}
// // //             >
// // //               Retry
// // //             </button>
// // //           </div>
// // //         ) : (
// // //           <video
// // //             ref={videoRef}
// // //             src={videoSrc}
// // //             className="video-player"
// // //             style={{
// // //               width: '100%',
// // //               height: '100%',
// // //               objectFit: 'cover',
// // //               cursor: 'pointer',
// // //               display: 'block'
// // //             }}
// // //             onClick={handleVideoClick}
// // //             onEnded={handleVideoEnd}
// // //             onError={handleVideoError}
// // //             onLoadedData={handleVideoLoad}
// // //             loop
// // //             playsInline
// // //             preload="auto"
// // //             muted
// // //           />
// // //         )}
// // //       </div>

// // //       {/* Tag Products Button - Bottom Middle */}
// // //       {!bulkDeleteMode && (
// // //         <button
// // //           onClick={handleTagProducts}
// // //           style={{
// // //             position: 'absolute',
// // //             bottom: '12px',
// // //             left: '50%',
// // //             transform: 'translateX(-50%)',
// // //             background: 'rgba(0, 0, 0, 0.6)',
// // //             border: 'none',
// // //             borderRadius: '8px',
// // //             color: 'white',
// // //             padding: savedProducts.length > 0 ? '6px 12px' : '8px 16px',
// // //             fontSize: savedProducts.length > 0 ? '0' : '0.75rem',
// // //             fontWeight: '500',
// // //             cursor: 'pointer',
// // //             zIndex: 10,
// // //             backdropFilter: 'blur(4px)',
// // //             transition: 'all 0.3s ease',
// // //             whiteSpace: 'nowrap',
// // //             minWidth: savedProducts.length > 0 ? 'auto' : '100px',
// // //             minHeight: savedProducts.length > 0 ? '32px' : 'auto'
// // //           }}
// // //           onMouseEnter={(e) => {
// // //             e.target.style.background = 'rgba(0, 0, 0, 0.8)';
// // //             e.target.style.transform = 'translateX(-50%) scale(1.05)';
// // //           }}
// // //           onMouseLeave={(e) => {
// // //             e.target.style.background = 'rgba(0, 0, 0, 0.6)';
// // //             e.target.style.transform = 'translateX(-50%) scale(1)';
// // //           }}
// // //         >
// // //           {renderProductImages()}
// // //         </button>
// // //       )}
// // //     </div>
// // //   );
// // // }









// // // components/videogallerycomponents/VideoPlayer.jsx
// // import { useState, useEffect, useRef } from "react";

// // export default function VideoPlayer({ 
// //   file, 
// //   index, 
// //   isSelected, 
// //   onSelect, 
// //   onDelete, 
// //   onEdit,
// //   onSave,
// //   onCancel,
// //   isEditing,
// //   editTitle,
// //   onEditTitleChange,
// //   bulkDeleteMode, 
// //   onShowOptions,
// //   theme, 
// //   formatDate,
// //   onTagProducts,
// //   onViewFullVideo,
// //   onCopyLink,
// //   productsModalOpened // ADDED: get modal opened state from parent
// // }) {
// //   const videoRef = useRef(null);
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [videoError, setVideoError] = useState(false);
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [showEditMenu, setShowEditMenu] = useState(false);
// //   const [savedProducts, setSavedProducts] = useState([]);
// //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);

// //   // Use proxy URL if available, otherwise fallback to original URL
// //   const videoSrc = file.videoUrl || file.shopify_file_url;

// //   // Fetch saved products when component mounts or file changes
// //   useEffect(() => {
// //     if (file?.id) {
// //       fetchSavedProducts();
// //     }
// //   }, [file?.id]);

// //   // ADDED: Refresh products when products modal closes
// //   useEffect(() => {
// //     if (!productsModalOpened && file?.id) {
// //       console.log('Products modal closed, refreshing products...');
// //       fetchSavedProducts();
// //     }
// //   }, [productsModalOpened, file?.id]); // Trigger when modal closes

// //   const fetchSavedProducts = async () => {
// //     try {
// //       setIsLoadingProducts(true);
// //       const response = await fetch(`/api/video-products/${file.id}`);
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
// //       setIsLoadingProducts(false);
// //     }
// //   };

// //   // Auto-play on hover
// //   useEffect(() => {
// //     if (videoRef.current) {
// //       videoRef.current.loop = true;
      
// //       if (isHovered) {
// //         videoRef.current.play()
// //           .then(() => setIsPlaying(true))
// //           .catch(error => {
// //             console.log('Auto-play on hover failed:', error);
// //           });
// //       } else {
// //         videoRef.current.pause();
// //         setIsPlaying(false);
// //       }
// //     }
// //   }, [isHovered, videoSrc]);

// //   const handleVideoClick = (event) => {
// //     if (bulkDeleteMode) {
// //       onSelect();
// //     } else {
// //       onShowOptions(file, event);
// //     }
// //   };

// //   const handleVideoEnd = () => {
// //     if (videoRef.current && !videoRef.current.loop) {
// //       videoRef.current.currentTime = 0;
// //       videoRef.current.play();
// //     }
// //   };

// //   const handleVideoError = (e) => {
// //     console.error('Video error:', e);
// //     setVideoError(true);
// //     setIsPlaying(false);
// //   };

// //   const handleVideoLoad = () => {
// //     setVideoError(false);
// //   };

// //   const handleEditClick = (e) => {
// //     e.stopPropagation();
// //     setShowEditMenu(!showEditMenu);
// //   };

// //   const handleViewFullVideo = (e) => {
// //     e.stopPropagation();
// //     if (onViewFullVideo) {
// //       onViewFullVideo(file);
// //     }
// //     setShowEditMenu(false);
// //   };

// //   const handleCopyLink = (e) => {
// //     e.stopPropagation();
// //     if (onCopyLink) {
// //       onCopyLink(file.shopify_file_url);
// //     }
// //     setShowEditMenu(false);
// //   };

// //   const handleTagProducts = (e) => {
// //     e.stopPropagation();
// //     if (onTagProducts) {
// //       onTagProducts(file, e);
// //     }
// //     setShowEditMenu(false);
// //   };

// //   // Render product images for the tag button
// //   const renderProductImages = () => {
// //     if (isLoadingProducts) {
// //       return (
// //         <div style={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           color: 'white',
// //           fontSize: '0.6rem'
// //         }}>
// //           Loading...
// //         </div>
// //       );
// //     }

// //     if (savedProducts.length === 0) {
// //       return (
// //         <div style={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           color: 'white',
// //           fontSize: '0.75rem',
// //           fontWeight: '500'
// //         }}>
// //           Tag Products
// //         </div>
// //       );
// //     }

// //     // Show up to 3 product images
// //     const productsToShow = savedProducts.slice(0, 3);
    
// //     return (
// //       <div style={{
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         gap: '4px'
// //       }}>
// //         {productsToShow.map((product, index) => (
// //           <div
// //             key={product.video_product_id || product.id}
// //             style={{
// //               width: '20px',
// //               height: '20px',
// //               borderRadius: '4px',
// //               overflow: 'hidden',
// //               position: 'relative',
// //               border: '1px solid rgba(255,255,255,0.3)'
// //             }}
// //           >
// //             {product.image_url ? (
// //               <img 
// //                 src={product.image_url} 
// //                 alt={product.title}
// //                 style={{
// //                   width: '100%',
// //                   height: '100%',
// //                   objectFit: 'cover'
// //                 }}
// //               />
// //             ) : (
// //               <div style={{
// //                 width: '100%',
// //                 height: '100%',
// //                 background: '#3b82f6',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 color: 'white',
// //                 fontSize: '0.5rem',
// //                 fontWeight: 'bold'
// //               }}>
// //                 P
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //         {savedProducts.length > 3 && (
// //           <div style={{
// //             width: '20px',
// //             height: '20px',
// //             background: 'rgba(255,255,255,0.2)',
// //             borderRadius: '4px',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             color: 'white',
// //             fontSize: '0.5rem',
// //             fontWeight: 'bold'
// //           }}>
// //             +{savedProducts.length - 3}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div
// //       style={{
// //         background: theme.cardBackground,
// //         borderRadius: '12px',
// //         border: theme.border,
// //         boxShadow: theme.shadow,
// //         transition: 'all 0.3s ease',
// //         animation: `fadeIn 0.6s ease-out ${0.3 + index * 0.1}s both`,
// //         position: 'relative',
// //         overflow: 'hidden',
// //         width: '10rem',
// //         height: '20rem',
// //         margin: '0 auto'
// //       }}
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //     >
// //       {/* Bulk Delete Checkbox */}
// //       {bulkDeleteMode && (
// //         <div className="checkbox-wrapper">
// //           <input
// //             type="checkbox"
// //             checked={isSelected}
// //             onChange={onSelect}
// //             className="bulk-checkbox"
// //           />
// //         </div>
// //       )}

// //       {/* Edit Button - Top Right Corner */}
// //       {!bulkDeleteMode && (
// //         <button
// //           onClick={handleEditClick}
// //           style={{
// //             position: 'absolute',
// //             top: '8px',
// //             right: '8px',
// //             background: 'rgba(0, 0, 0, 0.6)',
// //             border: 'none',
// //             borderRadius: '6px',
// //             color: 'white',
// //             padding: '6px 10px',
// //             fontSize: '0.7rem',
// //             fontWeight: '500',
// //             cursor: 'pointer',
// //             zIndex: 10,
// //             backdropFilter: 'blur(4px)',
// //             transition: 'all 0.3s ease'
// //           }}
// //           onMouseEnter={(e) => {
// //             e.target.style.background = 'rgba(0, 0, 0, 0.8)';
// //           }}
// //           onMouseLeave={(e) => {
// //             e.target.style.background = 'rgba(0, 0, 0, 0.6)';
// //           }}
// //         >
// //           <img src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="Edit" style={{ width: '12px', height: '12px', filter: 'invert(1)' }} />
// //         </button>
// //       )}

// //       {/* Edit Menu Dropdown */}
// //       {showEditMenu && !bulkDeleteMode && (
// //         <div
// //           style={{
// //             position: 'absolute',
// //             top: '40px',
// //             right: '8px',
// //             background: 'rgba(0, 0, 0, 0.8)',
// //             borderRadius: '8px',
// //             padding: '8px',
// //             zIndex: 20,
// //             backdropFilter: 'blur(8px)',
// //             border: '1px solid rgba(255, 255, 255, 0.2)',
// //             minWidth: '150px'
// //           }}
// //         >
// //           <button
// //             onClick={handleViewFullVideo}
// //             style={{
// //               width: '100%',
// //               background: 'transparent',
// //               border: 'none',
// //               color: 'white',
// //               padding: '8px 12px',
// //               borderRadius: '4px',
// //               fontSize: '0.75rem',
// //               cursor: 'pointer',
// //               textAlign: 'left',
// //               display: 'flex',
// //               alignItems: 'center',
// //               gap: '8px',
// //               transition: 'background 0.2s ease'
// //             }}
// //             onMouseEnter={(e) => {
// //               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
// //             }}
// //             onMouseLeave={(e) => {
// //               e.target.style.background = 'transparent';
// //             }}
// //           >
// //             <img src="https://cdn-icons-png.flaticon.com/512/2991/2991937.png" alt="Video" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
// //             View Full Video
// //           </button>
// //           <button
// //             onClick={handleCopyLink}
// //             style={{
// //               width: '100%',
// //               background: 'transparent',
// //               border: 'none',
// //               color: 'white',
// //               padding: '8px 12px',
// //               borderRadius: '4px',
// //               fontSize: '0.75rem',
// //               cursor: 'pointer',
// //               textAlign: 'left',
// //               display: 'flex',
// //               alignItems: 'center',
// //               gap: '8px',
// //               transition: 'background 0.2s ease'
// //             }}
// //             onMouseEnter={(e) => {
// //               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
// //             }}
// //             onMouseLeave={(e) => {
// //               e.target.style.background = 'transparent';
// //             }}
// //           >
// //             <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Copy Link" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
// //             Copy Link
// //           </button>
// //           <button
// //             onClick={handleTagProducts}
// //             style={{
// //               width: '100%',
// //               background: 'transparent',
// //               border: 'none',
// //               color: 'white',
// //               padding: '8px 12px',
// //               borderRadius: '4px',
// //               fontSize: '0.75rem',
// //               cursor: 'pointer',
// //               textAlign: 'left',
// //               display: 'flex',
// //               alignItems: 'center',
// //               gap: '8px',
// //               transition: 'background 0.2s ease'
// //             }}
// //             onMouseEnter={(e) => {
// //               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
// //             }}
// //             onMouseLeave={(e) => {
// //               e.target.style.background = 'transparent';
// //             }}
// //           >
// //             <img src="https://cdn-icons-png.flaticon.com/512/3917/3917759.png" alt="Tag Products" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
// //             Tag Products
// //           </button>
// //         </div>
// //       )}

// //       {/* Video Player */}
// //       <div 
// //         className="video-container"
// //         style={{ 
// //           position: 'relative',
// //           width: '100%',
// //           height: '100%'
// //         }}
// //       >
// //         {videoError ? (
// //           <div style={{
// //             width: '100%',
// //             height: '100%',
// //             background: '#f3f4f6',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             color: theme.mutedText,
// //             flexDirection: 'column',
// //             gap: '0.5rem'
// //           }}>
// //             <div style={{ fontSize: '2rem' }}>🎬</div>
// //             <div style={{ fontSize: '0.875rem', textAlign: 'center' }}>
// //               Video unavailable
// //             </div>
// //             <button
// //               onClick={() => {
// //                 setVideoError(false);
// //                 if (videoRef.current) {
// //                   videoRef.current.load();
// //                 }
// //               }}
// //               style={{
// //                 background: '#3b82f6',
// //                 color: 'white',
// //                 border: 'none',
// //                 padding: '0.25rem 0.5rem',
// //                 borderRadius: '4px',
// //                 fontSize: '0.75rem',
// //                 cursor: 'pointer'
// //               }}
// //             >
// //               Retry
// //             </button>
// //           </div>
// //         ) : (
// //           <video
// //             ref={videoRef}
// //             src={videoSrc}
// //             className="video-player"
// //             style={{
// //               width: '100%',
// //               height: '100%',
// //               objectFit: 'cover',
// //               cursor: 'pointer',
// //               display: 'block'
// //             }}
// //             onClick={handleVideoClick}
// //             onEnded={handleVideoEnd}
// //             onError={handleVideoError}
// //             onLoadedData={handleVideoLoad}
// //             loop
// //             playsInline
// //             preload="auto"
// //             muted
// //           />
// //         )}
// //       </div>

// //       {/* Tag Products Button - Bottom Middle */}
// //       {!bulkDeleteMode && (
// //         <button
// //           onClick={handleTagProducts}
// //           style={{
// //             position: 'absolute',
// //             bottom: '12px',
// //             left: '50%',
// //             transform: 'translateX(-50%)',
// //             background: 'rgba(0, 0, 0, 0.6)',
// //             border: 'none',
// //             borderRadius: '8px',
// //             color: 'white',
// //             padding: savedProducts.length > 0 ? '6px 12px' : '8px 16px',
// //             fontSize: savedProducts.length > 0 ? '0' : '0.75rem',
// //             fontWeight: '500',
// //             cursor: 'pointer',
// //             zIndex: 10,
// //             backdropFilter: 'blur(4px)',
// //             transition: 'all 0.3s ease',
// //             whiteSpace: 'nowrap',
// //             minWidth: savedProducts.length > 0 ? 'auto' : '100px',
// //             minHeight: savedProducts.length > 0 ? '32px' : 'auto'
// //           }}
// //           onMouseEnter={(e) => {
// //             e.target.style.background = 'rgba(0, 0, 0, 0.8)';
// //             e.target.style.transform = 'translateX(-50%) scale(1.05)';
// //           }}
// //           onMouseLeave={(e) => {
// //             e.target.style.background = 'rgba(0, 0, 0, 0.6)';
// //             e.target.style.transform = 'translateX(-50%) scale(1)';
// //           }}
// //         >
// //           {renderProductImages()}
// //         </button>
// //       )}
// //     </div>
// //   );
// // }








// // components/videogallerycomponents/VideoPlayer.jsx
// import { useState, useEffect, useRef } from "react";
// export default function VideoPlayer({
//   file,
//   index,
//   isSelected,
//   onSelect,
//   onDelete,
//   onEdit,
//   onSave,
//   onCancel,
//   isEditing,
//   editTitle,
//   onEditTitleChange,
//   bulkDeleteMode,
//   onShowOptions,
//   theme,
//   formatDate,
//   onTagProducts,
//   onViewFullVideo,
//   onCopyLink,
//   tagProductsModalOpened // This tells us when TagProductsModal is open/closed
// }) {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [videoError, setVideoError] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showEditMenu, setShowEditMenu] = useState(false);
//   const [savedProducts, setSavedProducts] = useState([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false);

//   // Use proxy URL if available, otherwise fallback to original URL
//   const videoSrc = file.videoUrl || file.shopify_file_url;

//   // Fetch saved products when component mounts or file changes
//   useEffect(() => {
//     if (file?.id) {
//       fetchSavedProducts();
//     }
//   }, [file?.id]);

//   // UPDATED: Refresh API call when TagProductsModal closes
//   useEffect(() => {
//     if (tagProductsModalOpened === false && file?.id) {
//       console.log('🔄 TagProductsModal closed, making API call to refresh products');
//       fetchSavedProducts(); // This makes the API call
//     }
//   }, [tagProductsModalOpened]); // Only depend on tagProductsModalOpened

//   const fetchSavedProducts = async () => {
//     try {
//       setIsLoadingProducts(true);
//       const response = await fetch(`/api/video-products/${file.id}`);
//       const result = await response.json();
     
//       if (result.success) {
//         setSavedProducts(result.products);
//         console.log('✅ API call successful, products updated:', result.products.length);
//       } else {
//         console.error('Failed to fetch saved products:', result.error);
//         setSavedProducts([]);
//       }
//     } catch (error) {
//       console.error('Error fetching saved products:', error);
//       setSavedProducts([]);
//     } finally {
//       setIsLoadingProducts(false);
//     }
//   };

//   // Auto-play on hover
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.loop = true;
     

//       if (isHovered) {
//         videoRef.current.play()
//           .then(() => setIsPlaying(true))
//           .catch(error => {
//             console.log('Auto-play on hover failed:', error);
//           });
//       } else {
//         videoRef.current.pause();
//         setIsPlaying(false);
//       }
//     }
//   }, [isHovered, videoSrc]);

//   const handleVideoClick = (event) => {
//     if (bulkDeleteMode) {
//       onSelect();
//     } else {
//       onShowOptions(file, event);
//     }
//   };

//   const handleVideoEnd = () => {
//     if (videoRef.current && !videoRef.current.loop) {
//       videoRef.current.currentTime = 0;
//       videoRef.current.play();
//     }
//   };

//   const handleVideoError = (e) => {
//     console.error('Video error:', e);
//     setVideoError(true);
//     setIsPlaying(false);
//   };

//   const handleVideoLoad = () => {
//     setVideoError(false);
//   };

//   const handleEditClick = (e) => {
//     e.stopPropagation();
//     setShowEditMenu(!showEditMenu);
//   };

//   const handleViewFullVideo = (e) => {
//     e.stopPropagation();
//     if (onViewFullVideo) {
//       onViewFullVideo(file);
//     }
//     setShowEditMenu(false);
//   };

//   const handleCopyLink = (e) => {
//     e.stopPropagation();
//     if (onCopyLink) {
//       onCopyLink(file.shopify_file_url);
//     }
//     setShowEditMenu(false);
//   };

//   const handleTagProducts = (e) => {
//     e.stopPropagation();
//     if (onTagProducts) {
//       onTagProducts(file, e);
//     }
//     setShowEditMenu(false);
//   };

//   // Render product images for the tag button
//   const renderProductImages = () => {
//     if (isLoadingProducts) {
//       return (
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: 'white',
//           fontSize: '0.6rem'
//         }}>
//           Loading...
//         </div>
//       );
//     }

//     if (savedProducts.length === 0) {
//       return (
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: 'white',
//           fontSize: '0.75rem',
//           fontWeight: '500'
//         }}>
//           Tag Products
//         </div>
//       );
//     }

//     // Show up to 3 product images
//     const productsToShow = savedProducts.slice(0, 3);
   
//     return (
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '4px'
//       }}>
//         {productsToShow.map((product, index) => (
//           <div
//             key={product.video_product_id || product.id}
//             style={{
//               width: '20px',
//               height: '20px',
//               borderRadius: '4px',
//               overflow: 'hidden',
//               position: 'relative',
//               border: '1px solid rgba(255,255,255,0.3)'
//             }}
//           >
//             {product.image_url ? (
//               <img
//                 src={product.image_url}
//                 alt={product.title}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover'
//                 }}
//               />
//             ) : (
//               <div style={{
//                 width: '100%',
//                 height: '100%',
//                 background: '#3b82f6',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: '0.5rem',
//                 fontWeight: 'bold'
//               }}>
//                 P
//               </div>
//             )}
//           </div>
//         ))}
//         {savedProducts.length > 3 && (
//           <div style={{
//             width: '20px',
//             height: '20px',
//             background: 'rgba(255,255,255,0.2)',
//             borderRadius: '4px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: 'white',
//             fontSize: '0.5rem',
//             fontWeight: 'bold'
//           }}>
//             +{savedProducts.length - 3}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div
//       style={{
//         background: theme.cardBackground,
//         borderRadius: '12px',
//         border: theme.border,
//         boxShadow: theme.shadow,
//         transition: 'all 0.3s ease',
//         animation: `fadeIn 0.6s ease-out ${0.3 + index * 0.1}s both`,
//         position: 'relative',
//         overflow: 'hidden',
//         width: '10rem',
//         height: '20rem',
//         margin: '0 auto'
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Bulk Delete Checkbox */}
//       {bulkDeleteMode && (
//         <div className="checkbox-wrapper">
//           <input
//             type="checkbox"
//             checked={isSelected}
//             onChange={onSelect}
//             className="bulk-checkbox"
//           />
//         </div>
//       )}

//       {/* Edit Button - Top Right Corner */}
//       {!bulkDeleteMode && (
//         <button
//           onClick={handleEditClick}
//           style={{
//             position: 'absolute',
//             top: '8px',
//             right: '8px',
//             background: 'rgba(0, 0, 0, 0.6)',
//             border: 'none',
//             borderRadius: '6px',
//             color: 'white',
//             padding: '6px 10px',
//             fontSize: '0.7rem',
//             fontWeight: '500',
//             cursor: 'pointer',
//             zIndex: 10,
//             backdropFilter: 'blur(4px)',
//             transition: 'all 0.3s ease'
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.background = 'rgba(0, 0, 0, 0.8)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.background = 'rgba(0, 0, 0, 0.6)';
//           }}
//         >
//           <img src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="Edit" style={{ width: '12px', height: '12px', filter: 'invert(1)' }} />
//         </button>
//       )}

//       {/* Edit Menu Dropdown */}
//       {showEditMenu && !bulkDeleteMode && (
//         <div
//           style={{
//             position: 'absolute',
//             top: '40px',
//             right: '8px',
//             background: 'rgba(0, 0, 0, 0.8)',
//             borderRadius: '8px',
//             padding: '8px',
//             zIndex: 20,
//             backdropFilter: 'blur(8px)',
//             border: '1px solid rgba(255, 255, 255, 0.2)',
//             minWidth: '150px'
//           }}
//         >
//           <button
//             onClick={handleViewFullVideo}
//             style={{
//               width: '100%',
//               background: 'transparent',
//               border: 'none',
//               color: 'white',
//               padding: '8px 12px',
//               borderRadius: '4px',
//               fontSize: '0.75rem',
//               cursor: 'pointer',
//               textAlign: 'left',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               transition: 'background 0.2s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = 'transparent';
//             }}
//           >
//             <img src="https://cdn-icons-png.flaticon.com/512/2991/2991937.png" alt="Video" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
//             View Full Video
//           </button>
//           <button
//             onClick={handleCopyLink}
//             style={{
//               width: '100%',
//               background: 'transparent',
//               border: 'none',
//               color: 'white',
//               padding: '8px 12px',
//               borderRadius: '4px',
//               fontSize: '0.75rem',
//               cursor: 'pointer',
//               textAlign: 'left',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               transition: 'background 0.2s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = 'transparent';
//             }}
//           >
//             <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Copy Link" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
//             Copy Link
//           </button>
//           <button
//             onClick={handleTagProducts}
//             style={{
//               width: '100%',
//               background: 'transparent',
//               border: 'none',
//               color: 'white',
//               padding: '8px 12px',
//               borderRadius: '4px',
//               fontSize: '0.75rem',
//               cursor: 'pointer',
//               textAlign: 'left',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               transition: 'background 0.2s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = 'transparent';
//             }}
//           >
//             <img src="https://cdn-icons-png.flaticon.com/512/3917/3917759.png" alt="Tag Products" style={{ width: '14px', height: '14px', filter: 'invert(1)' }} />
//             Tag Products
//           </button>
//         </div>
//       )}

//       {/* Video Player */}
//       {/* Video Player - REMOVED BACKGROUND SPACE */}
//       <div
//         className="video-container"
//         style={{
//           position: 'relative',
//           width: '100%',
//           height: '100%'
//         }}
//       >
//         {videoError ? (
//           <div style={{
//             width: '100%',
//             height: '100%',
//             background: '#f3f4f6',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: theme.mutedText,
//             flexDirection: 'column',
//             gap: '0.5rem'
//           }}>
//             <div style={{ fontSize: '2rem' }}>🎬</div>
//             <div style={{ fontSize: '0.875rem', textAlign: 'center' }}>
//               Video unavailable
//             </div>
//             <button
//               onClick={() => {
//                 setVideoError(false);
//                 if (videoRef.current) {
//                   videoRef.current.load();
//                 }
//               }}
//               style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '0.25rem 0.5rem',
//                 borderRadius: '4px',
//                 fontSize: '0.75rem',
//                 cursor: 'pointer'
//               }}
//             >
//               Retry
//             </button>
//           </div>
//         ) : (
//           <video
//             ref={videoRef}
//             src={videoSrc}
//             className="video-player"
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover',
//               cursor: 'pointer',
//               display: 'block'
//             }}
//             onClick={handleVideoClick}
//             onEnded={handleVideoEnd}
//             onError={handleVideoError}
//             onLoadedData={handleVideoLoad}
//             loop
//             playsInline
//             preload="auto"
//             muted
//           />
//         )}
//       </div>

//       {/* Tag Products Button - Bottom Middle */}
//       {!bulkDeleteMode && (
//         <button
//           onClick={handleTagProducts}
//           style={{
//             position: 'absolute',
//             bottom: '12px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             background: 'rgba(0, 0, 0, 0.6)',
//             border: 'none',
//             borderRadius: '8px',
//             color: 'white',
//             padding: savedProducts.length > 0 ? '6px 12px' : '8px 16px',
//             fontSize: savedProducts.length > 0 ? '0' : '0.75rem',
//             fontWeight: '500',
//             cursor: 'pointer',
//             zIndex: 10,
//             backdropFilter: 'blur(4px)',
//             transition: 'all 0.3s ease',
//             whiteSpace: 'nowrap',
//             minWidth: savedProducts.length > 0 ? 'auto' : '100px',
//             minHeight: savedProducts.length > 0 ? '32px' : 'auto'
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.background = 'rgba(0, 0, 0, 0.8)';
//             e.target.style.transform = 'translateX(-50%) scale(1.05)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.background = 'rgba(0, 0, 0, 0.6)';
//             e.target.style.transform = 'translateX(-50%) scale(1)';
//           }}
//         >
//           {renderProductImages()}

//           Tag Products
//         </button>
//       )}
//     </div>
//   );
// }

// components/videogallerycomponents/VideoPlayer.jsx
import { useState, useEffect, useRef } from "react";

export default function VideoPlayer({
  file,
  index,
  isSelected,
  onSelect,
  onDelete,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  editTitle,
  onEditTitleChange,
  bulkDeleteMode,
  onShowOptions,
  theme,
  formatDate,
  onTagProducts,
  onViewFullVideo,
  onCopyLink,
  shouldRefresh // NEW: This tells us if this specific video should refresh its products
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // Use proxy URL if available, otherwise fallback to original URL
  const videoSrc = file.videoUrl || file.shopify_file_url;

  // Fetch saved products when component mounts or file changes
  useEffect(() => {
    if (file?.id) {
      fetchSavedProducts();
    }
  }, [file?.id]);

  // NEW: Refresh API call when shouldRefresh becomes true
  useEffect(() => {
    if (shouldRefresh && file?.id) {
      console.log('🔄 Refreshing products for video:', file.id);
      fetchSavedProducts(); // This makes the API call for THIS video only
    }
  }, [shouldRefresh, file?.id]); // Depend on shouldRefresh and file ID

  const fetchSavedProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const response = await fetch(`/api/video-products/${file.id}`);
      const result = await response.json();
     

      if (result.success) {
        setSavedProducts(result.products);
        console.log('✅ API call successful, products updated for video:', file.id, result.products.length);
      } else {
        console.error("Failed to fetch saved products:", result.error);
        setSavedProducts([]);
      }
    } catch (error) {
      console.error("Error fetching saved products:", error);
      setSavedProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Auto-play on hover
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
     

      if (isHovered) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log("Auto-play on hover failed:", error);
          });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isHovered, videoSrc]);

  const handleVideoClick = (event) => {
    if (bulkDeleteMode) {
      onSelect();
    } else {
      onShowOptions(file, event);
    }
  };

  const handleVideoEnd = () => {
    if (videoRef.current && !videoRef.current.loop) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleVideoError = (e) => {
    console.error("Video error:", e);
    setVideoError(true);
    setIsPlaying(false);
  };

  const handleVideoLoad = () => {
    setVideoError(false);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditMenu(!showEditMenu);
  };

  const handleViewFullVideo = (e) => {
    e.stopPropagation();
    if (onViewFullVideo) {
      onViewFullVideo(file);
    }
    setShowEditMenu(false);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    if (onCopyLink) {
      onCopyLink(file.shopify_file_url);
    }
    setShowEditMenu(false);
  };

  const handleTagProducts = (e) => {
    e.stopPropagation();
    if (onTagProducts) {
      onTagProducts(file, e);
    }
    setShowEditMenu(false);
  };

  // Render product images for the tag button
  const renderProductImages = () => {
    if (isLoadingProducts) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "0.6rem",
          }}
        >
          Loading...
        </div>
      );
    }

    if (savedProducts.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: "500",
          }}
        >
          Tag Products
        </div>
      );
    }

    // Show up to 3 product images
    const productsToShow = savedProducts.slice(0, 3);
   

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        {productsToShow.map((product, index) => (
          <div
            key={product.video_product_id || product.id}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                P
              </div>
            )}
          </div>
        ))}
        {savedProducts.length > 3 && (
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "0.5rem",
              fontWeight: "bold",
            }}
          >
            +{savedProducts.length - 3}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        background: theme.cardBackground,
        borderRadius: "12px",
        border: theme.border,
        boxShadow: theme.shadow,
        transition: "all 0.3s ease",
        animation: `fadeIn 0.6s ease-out ${0.3 + index * 0.1}s both`,
        position: "relative",
        overflow: "hidden",
        width: "10rem",
        height: "20rem",
        margin: "0 auto",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bulk Delete Checkbox */}
      {bulkDeleteMode && (
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="bulk-checkbox"
          />
        </div>
      )}

      {/* Edit Button - Top Right Corner */}
      {!bulkDeleteMode && (
        <button
          onClick={handleEditClick}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "rgba(0, 0, 0, 0.6)",
            border: "none",
            borderRadius: "6px",
            color: "white",
            padding: "6px 10px",
            fontSize: "0.7rem",
            fontWeight: "500",
            cursor: "pointer",
            zIndex: 10,
            backdropFilter: "blur(4px)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(0, 0, 0, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(0, 0, 0, 0.6)";
          }}
        >
          <img
            src="/edit.png"
            alt="Edit"
            style={{ width: "12px", height: "12px" }}
          />
        </button>
      )}

      {/* Edit Menu Dropdown */}
      {showEditMenu && !bulkDeleteMode && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "8px",
            background: "rgba(0, 0, 0, 0.8)",
            borderRadius: "8px",
            padding: "8px",
            zIndex: 20,
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            minWidth: "150px",
          }}
        >
          <button
            onClick={handleViewFullVideo}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            <img
              src="/full-screen.png"
              alt="Video"
              style={{ width: "14px", height: "14px" }}
            />
            View Full Video
          </button>
          <button
            onClick={handleCopyLink}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            <img
              src="/link.png"
              alt="Copy Link"
              style={{ width: "14px", height: "14px" }}
            />
            Copy Link
          </button>
          <button
            onClick={handleTagProducts}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3917/3917759.png"
              alt="Tag Products"
              style={{ width: "14px", height: "14px", filter: "invert(1)" }}
            />
            Tag Products
          </button>
        </div>
      )}

      {/* Video Player */}
      <div
        className="video-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        {videoError ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.mutedText,
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ fontSize: "2rem" }}>🎬</div>
            <div style={{ fontSize: "0.875rem", textAlign: "center" }}>
              Video unavailable
            </div>
            <button
              onClick={() => {
                setVideoError(false);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              style={{
                background: "#3b82f6",
                color: "white",
                border: "none",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            className="video-player"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
              display: "block",
            }}
            onClick={handleVideoClick}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            loop
            playsInline
            preload="auto"
            muted
          />
        )}
      </div>

      {/* Tag Products Button - Bottom Middle */}
      {!bulkDeleteMode && (
        <button
          onClick={handleTagProducts}
          style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.6)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            padding: savedProducts.length > 0 ? "6px 12px" : "8px 16px",
            fontSize: savedProducts.length > 0 ? "0" : "0.75rem",
            fontWeight: "500",
            cursor: "pointer",
            zIndex: 10,
            backdropFilter: "blur(4px)",
            transition: "all 0.3s ease",
            whiteSpace: "nowrap",
            minWidth: savedProducts.length > 0 ? "auto" : "100px",
            minHeight: savedProducts.length > 0 ? "32px" : "auto",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(0, 0, 0, 0.8)";
            e.target.style.transform = "translateX(-50%) scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(0, 0, 0, 0.6)";
            e.target.style.transform = "translateX(-50%) scale(1)";
          }}
        >
          {renderProductImages()}
        </button>
      )}
    </div>
  );
}
