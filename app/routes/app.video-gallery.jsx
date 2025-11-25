// // // // // // app/routes/app.video-gallery.jsx
// // // // // import { useState, useEffect } from "react";
// // // // // import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
// // // // // import VideoGrid from "../components/videogallerycomponents/VideoGrid";
// // // // // import BulkDeleteControls from "../components/videogallerycomponents/BulkDeleteControls";
// // // // // import Modals from "../components/videogallerycomponents/Modals";
// // // // // import VideoPlayerModal from "../components/videogallerycomponents/VideoPlayerModal";
// // // // // import HomepageMedia from "../components/videogallerycomponents/homepage-media.jsx";
// // // // // import { useVideoGallery } from "../components/videogallerycomponents/hooks/useVideoGallery";

// // // // // // Loader function required by React Router
// // // // // export async function loader({ request }) {
// // // // //   return { 
// // // // //     message: "Video Gallery Loaded",
// // // // //     timestamp: new Date().toISOString()
// // // // //   };
// // // // // }

// // // // // export default function VideoGallery() {
// // // // //   const {
// // // // //     // State
// // // // //     isDarkTheme,
// // // // //     showHomepageMedia,
// // // // //     mediaFiles,
// // // // //     loading,
// // // // //     selectedVideos,
// // // // //     bulkDeleteMode,
// // // // //     toast,
// // // // //     editingVideoId,
// // // // //     editTitle,
// // // // //     showDeleteModal,
// // // // //     showBulkDeleteModal,
// // // // //     showProductsModal,
// // // // //     products,
// // // // //     selectedProducts,
// // // // //     loadingProducts,
// // // // //     showVideoPlayer,
    
// // // // //     // Setters
// // // // //     setIsDarkTheme,
// // // // //     setShowHomepageMedia,
// // // // //     setBulkDeleteMode,
// // // // //     setSelectedVideos,
// // // // //     setEditTitle,
// // // // //     setShowDeleteModal,
// // // // //     setShowBulkDeleteModal,
// // // // //     setShowProductsModal,
// // // // //     setSelectedProducts,
    
// // // // //     // Actions
// // // // //     showToast,
// // // // //     loadMediaFiles,
// // // // //     toggleVideoSelection,
// // // // //     selectAllVideos,
// // // // //     startEditing,
// // // // //     saveTitle,
// // // // //     cancelEditing,
// // // // //     showDeleteConfirmation,
// // // // //     deleteVideo,
// // // // //     showBulkDeleteConfirmation,
// // // // //     bulkDeleteVideos,
// // // // //     copyVideoUrl,
// // // // //     downloadVideo,
// // // // //     loadProductsForVideo,
// // // // //     toggleProductSelection,
// // // // //     saveVideoProducts,
// // // // //     showVideoPlayerModal,
// // // // //     hideVideoPlayerModal
// // // // //   } = useVideoGallery();

// // // // //   // SEPARATE STATE FOR VIDEO OPTIONS MODAL
// // // // //   const [showVideoOptions, setShowVideoOptions] = useState({
// // // // //     show: false,
// // // // //     video: null
// // // // //   });

// // // // //   // SEPARATE STATE FOR TAG PRODUCTS MODAL
// // // // //   const [showTagProductsModal, setShowTagProductsModal] = useState({
// // // // //     show: false,
// // // // //     video: null
// // // // //   });

// // // // //   // Add closeProductsModal function
// // // // //   const closeProductsModal = () => {
// // // // //     setShowProductsModal({ show: false, video: null });
// // // // //     setSelectedProducts(new Set());
// // // // //   };

// // // // //   // PAGINATION STATE
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // //   const videosPerPage = 12;

// // // // //   // Handler for video options menu (when video is clicked)
// // // // //   const showVideoOptionsMenu = (video, event) => {
// // // // //     setShowVideoOptions({
// // // // //       show: true,
// // // // //       video: video
// // // // //     });
// // // // //   };

// // // // //   const hideVideoOptionsMenu = () => {
// // // // //     setShowVideoOptions({
// // // // //       show: false,
// // // // //       video: null
// // // // //     });
// // // // //   };

// // // // //   // SEPARATE handler for tag products button
// // // // //   const handleTagProducts = (video, event) => {
// // // // //     console.log('Opening tag products modal for video:', video.id);
// // // // //     setShowTagProductsModal({
// // // // //       show: true,
// // // // //       video: video
// // // // //     });
// // // // //   };

// // // // //   const handleHideTagProducts = () => {
// // // // //     setShowTagProductsModal({
// // // // //       show: false,
// // // // //       video: null
// // // // //     });
// // // // //   };

// // // // //   // Filter media files based on search term
// // // // //   const filteredMediaFiles = mediaFiles.filter(file =>
// // // // //     file.title.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //   );

// // // // //   // Calculate pagination
// // // // //   const totalVideos = filteredMediaFiles.length;
// // // // //   const totalPages = Math.ceil(totalVideos / videosPerPage);
// // // // //   const startIndex = (currentPage - 1) * videosPerPage;
// // // // //   const currentVideos = filteredMediaFiles.slice(startIndex, startIndex + videosPerPage);

// // // // //   // Reset to first page when search term changes
// // // // //   useEffect(() => {
// // // // //     setCurrentPage(1);
// // // // //   }, [searchTerm]);

// // // // //   // Theme styles for local use
// // // // //   const themeStyles = {
// // // // //     light: {
// // // // //       background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// // // // //       cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// // // // //       text: '#1f2937',
// // // // //       mutedText: '#6b7280',
// // // // //       border: '1px solid #e2e8f0',
// // // // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
// // // // //       inputBackground: 'white'
// // // // //     },
// // // // //     dark: {
// // // // //       background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
// // // // //       cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
// // // // //       text: '#f8fafc',
// // // // //       mutedText: '#94a3b8',
// // // // //       border: '1px solid #475569',
// // // // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
// // // // //       inputBackground: '#374151'
// // // // //     }
// // // // //   };

// // // // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // // // //   // Detect theme from document
// // // // //   useEffect(() => {
// // // // //     const checkTheme = () => {
// // // // //       setIsDarkTheme(document.documentElement.classList.contains('dark'));
// // // // //     };

// // // // //     checkTheme();
    
// // // // //     const observer = new MutationObserver(checkTheme);
// // // // //     observer.observe(document.documentElement, {
// // // // //       attributes: true,
// // // // //       attributeFilter: ['class']
// // // // //     });

// // // // //     return () => observer.disconnect();
// // // // //   }, []);

// // // // //   // Load media files on component mount
// // // // //   useEffect(() => {
// // // // //     loadMediaFiles();
// // // // //   }, []);

// // // // //   // Refresh media files when upload modal closes
// // // // //   useEffect(() => {
// // // // //     if (!showHomepageMedia) {
// // // // //       loadMediaFiles();
// // // // //     }
// // // // //   }, [showHomepageMedia]);

// // // // //   return (
// // // // //     <VideoGalleryLayout 
// // // // //       isDarkTheme={isDarkTheme}
// // // // //       toast={toast}
// // // // //     >
// // // // //       {/* Bulk Delete Controls */}
// // // // //       {bulkDeleteMode && (
// // // // //         <BulkDeleteControls
// // // // //           selectedVideos={selectedVideos}
// // // // //           mediaFiles={mediaFiles}
// // // // //           isDarkTheme={isDarkTheme}
// // // // //           onSelectAll={selectAllVideos}
// // // // //           onBulkDelete={showBulkDeleteConfirmation}
// // // // //           onCancel={() => {
// // // // //             setBulkDeleteMode(false);
// // // // //             setSelectedVideos(new Set());
// // // // //           }}
// // // // //         />
// // // // //       )}

// // // // //       {/* Uploaded Media Section */}
// // // // //       <div style={{
// // // // //         background: currentTheme.cardBackground,
// // // // //         borderRadius: '16px',
// // // // //         padding: '2rem',
// // // // //         border: currentTheme.border,
// // // // //         boxShadow: currentTheme.shadow,
// // // // //         marginBottom: '2rem',
// // // // //         animation: 'fadeIn 0.6s ease-out 0.2s both'
// // // // //       }}>
// // // // //         <div style={{
// // // // //           display: 'flex',
// // // // //           justifyContent: 'space-between',
// // // // //           alignItems: 'center',
// // // // //           marginBottom: '1.5rem'
// // // // //         }}>
// // // // //           <h2 style={{
// // // // //             fontSize: '1.5rem',
// // // // //             fontWeight: 'bold',
// // // // //             color: currentTheme.text
// // // // //           }}>
// // // // //             📁 Your Uploaded Media
// // // // //             <span style={{
// // // // //               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // // //               color: 'white',
// // // // //               padding: '0.25rem 0.75rem',
// // // // //               borderRadius: '20px',
// // // // //               fontSize: '0.875rem',
// // // // //               marginLeft: '0.5rem'
// // // // //             }}>
// // // // //               {mediaFiles.length}
// // // // //             </span>
// // // // //           </h2>
// // // // //           <div style={{ display: 'flex', gap: '1rem' }}>
// // // // //             {mediaFiles.length > 0 && (
// // // // //               <button
// // // // //                 onClick={() => setBulkDeleteMode(!bulkDeleteMode)}
// // // // //                 style={{
// // // // //                   background: bulkDeleteMode ? '#6b7280' : '#f59e0b',
// // // // //                   color: 'white',
// // // // //                   border: 'none',
// // // // //                   padding: '0.75rem 1.5rem',
// // // // //                   borderRadius: '8px',
// // // // //                   fontWeight: '600',
// // // // //                   cursor: 'pointer',
// // // // //                   transition: 'all 0.3s ease'
// // // // //                 }}
// // // // //               >
// // // // //                 {bulkDeleteMode ? '✕ Cancel Bulk Delete' : '🗑️ Bulk Delete'}
// // // // //               </button>
// // // // //             )}
// // // // //             <button
// // // // //               onClick={() => setShowHomepageMedia(true)}
// // // // //               style={{
// // // // //                 background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
// // // // //                 color: 'white',
// // // // //                 border: 'none',
// // // // //                 padding: '0.75rem 1.5rem',
// // // // //                 borderRadius: '8px',
// // // // //                 fontWeight: '600',
// // // // //                 cursor: 'pointer',
// // // // //                 transition: 'all 0.3s ease'
// // // // //               }}
// // // // //             >
// // // // //               📤 Upload New Media
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Search Bar */}
// // // // //         {mediaFiles.length > 0 && (
// // // // //           <div style={{
// // // // //             marginBottom: '1.5rem',
// // // // //             maxWidth: '400px'
// // // // //           }}>
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="Search videos by title..."
// // // // //               value={searchTerm}
// // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // //               style={{
// // // // //                 width: '100%',
// // // // //                 padding: '0.75rem 1rem',
// // // // //                 border: `1px solid ${currentTheme.border}`,
// // // // //                 borderRadius: '8px',
// // // // //                 background: currentTheme.inputBackground,
// // // // //                 color: currentTheme.text,
// // // // //                 fontSize: '1rem',
// // // // //                 outline: 'none',
// // // // //                 transition: 'all 0.3s ease'
// // // // //               }}
// // // // //               onFocus={(e) => {
// // // // //                 e.target.style.borderColor = '#3b82f6';
// // // // //                 e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
// // // // //               }}
// // // // //               onBlur={(e) => {
// // // // //                 e.target.style.borderColor = currentTheme.border;
// // // // //                 e.target.style.boxShadow = 'none';
// // // // //               }}
// // // // //             />
// // // // //           </div>
// // // // //         )}

// // // // //         <VideoGrid
// // // // //           mediaFiles={currentVideos}
// // // // //           loading={loading}
// // // // //           selectedVideos={selectedVideos}
// // // // //           bulkDeleteMode={bulkDeleteMode}
// // // // //           editingVideoId={editingVideoId}
// // // // //           editTitle={editTitle}
// // // // //           isDarkTheme={isDarkTheme}
// // // // //           onVideoSelect={toggleVideoSelection}
// // // // //           onEdit={startEditing}
// // // // //           onSave={saveTitle}
// // // // //           onCancel={cancelEditing}
// // // // //           onEditTitleChange={setEditTitle}
// // // // //           onShowOptions={showVideoOptionsMenu} // Video click → options menu
// // // // //           onTagProducts={handleTagProducts} // Tag products button → tag products modal
// // // // //           onDelete={showDeleteConfirmation}
// // // // //           onVideoClick={showVideoPlayerModal}
// // // // //           onUploadClick={() => setShowHomepageMedia(true)}
// // // // //         />

// // // // //         {/* Pagination Controls */}
// // // // //         {totalPages > 1 && (
// // // // //           <div style={{
// // // // //             display: 'flex',
// // // // //             justifyContent: 'center',
// // // // //             alignItems: 'center',
// // // // //             marginTop: '2rem',
// // // // //             gap: '1rem',
// // // // //             flexWrap: 'wrap'
// // // // //           }}>
// // // // //             {/* Previous Button */}
// // // // //             <button
// // // // //               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// // // // //               disabled={currentPage === 1}
// // // // //               style={{
// // // // //                 background: currentPage === 1 ? '#9ca3af' : '#3b82f6',
// // // // //                 color: 'white',
// // // // //                 border: 'none',
// // // // //                 padding: '0.5rem 1rem',
// // // // //                 borderRadius: '6px',
// // // // //                 fontSize: '0.875rem',
// // // // //                 fontWeight: '500',
// // // // //                 cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
// // // // //                 transition: 'all 0.3s ease',
// // // // //                 opacity: currentPage === 1 ? 0.6 : 1
// // // // //               }}
// // // // //             >
// // // // //               ← Previous
// // // // //             </button>

// // // // //             {/* Page Numbers */}
// // // // //             <div style={{
// // // // //               display: 'flex',
// // // // //               gap: '0.5rem',
// // // // //               alignItems: 'center'
// // // // //             }}>
// // // // //               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
// // // // //                 <button
// // // // //                   key={page}
// // // // //                   onClick={() => setCurrentPage(page)}
// // // // //                   style={{
// // // // //                     background: currentPage === page ? '#3b82f6' : 'transparent',
// // // // //                     color: currentPage === page ? 'white' : currentTheme.text,
// // // // //                     border: `1px solid ${currentPage === page ? '#3b82f6' : currentTheme.border}`,
// // // // //                     padding: '0.5rem 0.75rem',
// // // // //                     borderRadius: '6px',
// // // // //                     fontSize: '0.875rem',
// // // // //                     fontWeight: '500',
// // // // //                     cursor: 'pointer',
// // // // //                     transition: 'all 0.3s ease',
// // // // //                     minWidth: '2.5rem'
// // // // //                   }}
// // // // //                   onMouseEnter={(e) => {
// // // // //                     if (currentPage !== page) {
// // // // //                       e.target.style.background = isDarkTheme ? '#374151' : '#f3f4f6';
// // // // //                     }
// // // // //                   }}
// // // // //                   onMouseLeave={(e) => {
// // // // //                     if (currentPage !== page) {
// // // // //                       e.target.style.background = 'transparent';
// // // // //                     }
// // // // //                   }}
// // // // //                 >
// // // // //                   {page}
// // // // //                 </button>
// // // // //               ))}
// // // // //             </div>

// // // // //             {/* Next Button */}
// // // // //             <button
// // // // //               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// // // // //               disabled={currentPage === totalPages}
// // // // //               style={{
// // // // //                 background: currentPage === totalPages ? '#9ca3af' : '#3b82f6',
// // // // //                 color: 'white',
// // // // //                 border: 'none',
// // // // //                 padding: '0.5rem 1rem',
// // // // //                 borderRadius: '6px',
// // // // //                 fontSize: '0.875rem',
// // // // //                 fontWeight: '500',
// // // // //                 cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
// // // // //                 transition: 'all 0.3s ease',
// // // // //                 opacity: currentPage === totalPages ? 0.6 : 1
// // // // //               }}
// // // // //             >
// // // // //               Next →
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Results Info */}
// // // // //         {mediaFiles.length > 0 && (
// // // // //           <div style={{
// // // // //             textAlign: 'center',
// // // // //             marginTop: '1rem',
// // // // //             color: currentTheme.mutedText,
// // // // //             fontSize: '0.875rem'
// // // // //           }}>
// // // // //             Showing {startIndex + 1}-{Math.min(startIndex + videosPerPage, totalVideos)} of {totalVideos} videos
// // // // //             {searchTerm && ` for "${searchTerm}"`}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Modals */}
// // // // //       <Modals
// // // // //         showVideoOptions={showVideoOptions}
// // // // //         showProductsModal={showProductsModal}
// // // // //         showDeleteModal={showDeleteModal}
// // // // //         showBulkDeleteModal={showBulkDeleteModal}
// // // // //         products={products}
// // // // //         selectedProducts={selectedProducts}
// // // // //         selectedVideos={selectedVideos}
// // // // //         loadingProducts={loadingProducts}
// // // // //         onHideVideoOptions={hideVideoOptionsMenu}
// // // // //         onCopyUrl={copyVideoUrl}
// // // // //         onDownload={downloadVideo}
// // // // //         onLoadProducts={loadProductsForVideo}
// // // // //         onDelete={deleteVideo}
// // // // //         onHideDeleteModal={() => setShowDeleteModal({ show: false, videoId: null, videoTitle: '' })}
// // // // //         onBulkDelete={bulkDeleteVideos}
// // // // //         onHideBulkDeleteModal={() => setShowBulkDeleteModal(false)}
// // // // //         onToggleProduct={toggleProductSelection}
// // // // //         onSaveProducts={saveVideoProducts}
// // // // //         onHideProductsModal={closeProductsModal}
// // // // //         isDarkTheme={isDarkTheme}
// // // // //         showVideoPlayerModal={showVideoPlayerModal}
// // // // //         // NEW: Pass the modal state
// // // // //         productsModalOpened={showProductsModal.show}
// // // // //         closeProductsModal={closeProductsModal}
// // // // //         // SEPARATE props for tag products modal
// // // // //         showTagProductsModal={showTagProductsModal}
// // // // //         onHideTagProductsModal={handleHideTagProducts}
// // // // //       />

// // // // //       {/* Video Player Modal */}
// // // // //       {showVideoPlayer?.show && showVideoPlayer.video && (
// // // // //         <VideoPlayerModal
// // // // //           showVideoPlayer={showVideoPlayer}
// // // // //           onHide={hideVideoPlayerModal}
// // // // //           videoData={showVideoPlayer.video}
// // // // //           isDarkTheme={isDarkTheme}
// // // // //         />
// // // // //       )}

// // // // //       {/* Homepage Media Modal */}
// // // // //       {showHomepageMedia && (
// // // // //         <div style={{
// // // // //           position: 'fixed',
// // // // //           top: 0,
// // // // //           left: 0,
// // // // //           right: 0,
// // // // //           bottom: 0,
// // // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // // //           display: 'flex',
// // // // //           alignItems: 'center',
// // // // //           justifyContent: 'center',
// // // // //           zIndex: 1000,
// // // // //           padding: '2rem'
// // // // //         }}>
// // // // //           <div style={{
// // // // //             background: isDarkTheme ? '#1f2937' : 'white',
// // // // //             borderRadius: '16px',
// // // // //             padding: '0',
// // // // //             maxWidth: '900px',
// // // // //             width: '100%',
// // // // //             maxHeight: '90vh',
// // // // //             overflow: 'auto',
// // // // //             position: 'relative'
// // // // //           }}>
// // // // //             <button
// // // // //               onClick={() => setShowHomepageMedia(false)}
// // // // //               style={{
// // // // //                 position: 'absolute',
// // // // //                 top: '1rem',
// // // // //                 right: '1rem',
// // // // //                 background: isDarkTheme ? '#374151' : 'white',
// // // // //                 border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
// // // // //                 fontSize: '1.5rem',
// // // // //                 cursor: 'pointer',
// // // // //                 color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // // // //                 zIndex: 1001,
// // // // //                 width: '40px',
// // // // //                 height: '40px',
// // // // //                 borderRadius: '50%',
// // // // //                 display: 'flex',
// // // // //                 alignItems: 'center',
// // // // //                 justifyContent: 'center',
// // // // //                 transition: 'all 0.3s ease'
// // // // //               }}
// // // // //               onMouseEnter={(e) => {
// // // // //                 e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
// // // // //               }}
// // // // //               onMouseLeave={(e) => {
// // // // //                 e.target.style.background = isDarkTheme ? '#374151' : 'white';
// // // // //               }}
// // // // //             >
// // // // //               ✕
// // // // //             </button>
// // // // //             <HomepageMedia />
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       <style jsx>{`
// // // // //         @keyframes fadeIn {
// // // // //           from {
// // // // //             opacity: 0;
// // // // //             transform: translateY(20px);
// // // // //           }
// // // // //           to {
// // // // //             opacity: 1;
// // // // //             transform: translateY(0);
// // // // //           }
// // // // //         }
// // // // //       `}</style>
// // // // //     </VideoGalleryLayout>
// // // // //   );
// // // // // }




// // // // // app/routes/app.video-gallery.jsx
// // // // import { useState, useEffect } from "react";
// // // // import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
// // // // import VideoGrid from "../components/videogallerycomponents/VideoGrid";
// // // // import BulkDeleteControls from "../components/videogallerycomponents/BulkDeleteControls";
// // // // import Modals from "../components/videogallerycomponents/Modals";
// // // // import VideoPlayerModal from "../components/videogallerycomponents/VideoPlayerModal";
// // // // import HomepageMedia from "../components/videogallerycomponents/homepage-media.jsx";
// // // // import { useVideoGallery } from "../components/videogallerycomponents/hooks/useVideoGallery";

// // // // // Loader function required by React Router
// // // // export async function loader({ request }) {
// // // //   return { 
// // // //     message: "Video Gallery Loaded",
// // // //     timestamp: new Date().toISOString()
// // // //   };
// // // // }

// // // // export default function VideoGallery() {
// // // //   const {
// // // //     // State
// // // //     isDarkTheme,
// // // //     showHomepageMedia,
// // // //     mediaFiles,
// // // //     loading,
// // // //     selectedVideos,
// // // //     bulkDeleteMode,
// // // //     toast,
// // // //     editingVideoId,
// // // //     editTitle,
// // // //     showDeleteModal,
// // // //     showBulkDeleteModal,
// // // //     showProductsModal,
// // // //     products,
// // // //     selectedProducts,
// // // //     loadingProducts,
// // // //     showVideoPlayer,
    
// // // //     // Setters
// // // //     setIsDarkTheme,
// // // //     setShowHomepageMedia,
// // // //     setBulkDeleteMode,
// // // //     setSelectedVideos,
// // // //     setEditTitle,
// // // //     setShowDeleteModal,
// // // //     setShowBulkDeleteModal,
// // // //     setShowProductsModal,
// // // //     setSelectedProducts,
    
// // // //     // Actions
// // // //     showToast,
// // // //     loadMediaFiles,
// // // //     toggleVideoSelection,
// // // //     selectAllVideos,
// // // //     startEditing,
// // // //     saveTitle,
// // // //     cancelEditing,
// // // //     showDeleteConfirmation,
// // // //     deleteVideo,
// // // //     showBulkDeleteConfirmation,
// // // //     bulkDeleteVideos,
// // // //     copyVideoUrl,
// // // //     downloadVideo,
// // // //     loadProductsForVideo,
// // // //     toggleProductSelection,
// // // //     saveVideoProducts,
// // // //     showVideoPlayerModal,
// // // //     hideVideoPlayerModal
// // // //   } = useVideoGallery();

// // // //   // SEPARATE STATE FOR VIDEO OPTIONS MODAL
// // // //   const [showVideoOptions, setShowVideoOptions] = useState({
// // // //     show: false,
// // // //     video: null
// // // //   });

// // // //   // SEPARATE STATE FOR TAG PRODUCTS MODAL
// // // //   const [showTagProductsModal, setShowTagProductsModal] = useState({
// // // //     show: false,
// // // //     video: null
// // // //   });

// // // //   // Add closeProductsModal function
// // // //   const closeProductsModal = () => {
// // // //     setShowProductsModal({ show: false, video: null });
// // // //     setSelectedProducts(new Set());
// // // //   };

// // // //   // PAGINATION STATE
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const videosPerPage = 12;

// // // //   // Handler for video options menu (when video is clicked)
// // // //   const showVideoOptionsMenu = (video, event) => {
// // // //     setShowVideoOptions({
// // // //       show: true,
// // // //       video: video
// // // //     });
// // // //   };

// // // //   const hideVideoOptionsMenu = () => {
// // // //     setShowVideoOptions({
// // // //       show: false,
// // // //       video: null
// // // //     });
// // // //   };

// // // //   // SEPARATE handler for tag products button
// // // //   const handleTagProducts = (video, event) => {
// // // //     console.log('Opening tag products modal for video:', video.id);
// // // //     setShowTagProductsModal({
// // // //       show: true,
// // // //       video: video
// // // //     });
// // // //   };

// // // //   const handleHideTagProducts = () => {
// // // //     setShowTagProductsModal({
// // // //       show: false,
// // // //       video: null
// // // //     });
// // // //   };

// // // //   // Filter media files based on search term
// // // //   const filteredMediaFiles = mediaFiles.filter(file =>
// // // //     file.title.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   // Calculate pagination
// // // //   const totalVideos = filteredMediaFiles.length;
// // // //   const totalPages = Math.ceil(totalVideos / videosPerPage);
// // // //   const startIndex = (currentPage - 1) * videosPerPage;
// // // //   const currentVideos = filteredMediaFiles.slice(startIndex, startIndex + videosPerPage);

// // // //   // Reset to first page when search term changes
// // // //   useEffect(() => {
// // // //     setCurrentPage(1);
// // // //   }, [searchTerm]);

// // // //   // Theme styles for local use
// // // //   const themeStyles = {
// // // //     light: {
// // // //       background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// // // //       cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// // // //       text: '#1f2937',
// // // //       mutedText: '#6b7280',
// // // //       border: '1px solid #e2e8f0',
// // // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
// // // //       inputBackground: 'white'
// // // //     },
// // // //     dark: {
// // // //       background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
// // // //       cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
// // // //       text: '#f8fafc',
// // // //       mutedText: '#94a3b8',
// // // //       border: '1px solid #475569',
// // // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
// // // //       inputBackground: '#374151'
// // // //     }
// // // //   };

// // // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // // //   // Detect theme from document
// // // //   useEffect(() => {
// // // //     const checkTheme = () => {
// // // //       setIsDarkTheme(document.documentElement.classList.contains('dark'));
// // // //     };

// // // //     checkTheme();
    
// // // //     const observer = new MutationObserver(checkTheme);
// // // //     observer.observe(document.documentElement, {
// // // //       attributes: true,
// // // //       attributeFilter: ['class']
// // // //     });

// // // //     return () => observer.disconnect();
// // // //   }, []);

// // // //   // Load media files on component mount
// // // //   useEffect(() => {
// // // //     loadMediaFiles();
// // // //   }, []);

// // // //   // Refresh media files when upload modal closes
// // // //   useEffect(() => {
// // // //     if (!showHomepageMedia) {
// // // //       loadMediaFiles();
// // // //     }
// // // //   }, [showHomepageMedia]);

// // // //   return (
// // // //     <VideoGalleryLayout 
// // // //       isDarkTheme={isDarkTheme}
// // // //       toast={toast}
// // // //     >
// // // //       {/* Bulk Delete Controls */}
// // // //       {bulkDeleteMode && (
// // // //         <BulkDeleteControls
// // // //           selectedVideos={selectedVideos}
// // // //           mediaFiles={mediaFiles}
// // // //           isDarkTheme={isDarkTheme}
// // // //           onSelectAll={selectAllVideos}
// // // //           onBulkDelete={showBulkDeleteConfirmation}
// // // //           onCancel={() => {
// // // //             setBulkDeleteMode(false);
// // // //             setSelectedVideos(new Set());
// // // //           }}
// // // //         />
// // // //       )}

// // // //       {/* Uploaded Media Section */}
// // // //       <div style={{
// // // //         background: currentTheme.cardBackground,
// // // //         borderRadius: '16px',
// // // //         padding: '2rem',
// // // //         border: currentTheme.border,
// // // //         boxShadow: currentTheme.shadow,
// // // //         marginBottom: '2rem',
// // // //         animation: 'fadeIn 0.6s ease-out 0.2s both'
// // // //       }}>
// // // //         <div style={{
// // // //           display: 'flex',
// // // //           justifyContent: 'space-between',
// // // //           alignItems: 'center',
// // // //           marginBottom: '1.5rem'
// // // //         }}>
// // // //           <h2 style={{
// // // //             fontSize: '1.5rem',
// // // //             fontWeight: 'bold',
// // // //             color: currentTheme.text
// // // //           }}>
// // // //             📁 Your Uploaded Media
// // // //             <span style={{
// // // //               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // //               color: 'white',
// // // //               padding: '0.25rem 0.75rem',
// // // //               borderRadius: '20px',
// // // //               fontSize: '0.875rem',
// // // //               marginLeft: '0.5rem'
// // // //             }}>
// // // //               {mediaFiles.length}
// // // //             </span>
// // // //           </h2>
// // // //           <div style={{ display: 'flex', gap: '1rem' }}>
// // // //             {mediaFiles.length > 0 && (
// // // //               <button
// // // //                 onClick={() => setBulkDeleteMode(!bulkDeleteMode)}
// // // //                 style={{
// // // //                   background: bulkDeleteMode ? '#6b7280' : '#f59e0b',
// // // //                   color: 'white',
// // // //                   border: 'none',
// // // //                   padding: '0.75rem 1.5rem',
// // // //                   borderRadius: '8px',
// // // //                   fontWeight: '600',
// // // //                   cursor: 'pointer',
// // // //                   transition: 'all 0.3s ease'
// // // //                 }}
// // // //               >
// // // //                 {bulkDeleteMode ? '✕ Cancel Bulk Delete' : '🗑️ Bulk Delete'}
// // // //               </button>
// // // //             )}
// // // //             <button
// // // //               onClick={() => setShowHomepageMedia(true)}
// // // //               style={{
// // // //                 background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
// // // //                 color: 'white',
// // // //                 border: 'none',
// // // //                 padding: '0.75rem 1.5rem',
// // // //                 borderRadius: '8px',
// // // //                 fontWeight: '600',
// // // //                 cursor: 'pointer',
// // // //                 transition: 'all 0.3s ease'
// // // //               }}
// // // //             >
// // // //               📤 Upload New Media
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Search Bar */}
// // // //         {mediaFiles.length > 0 && (
// // // //           <div style={{
// // // //             marginBottom: '1.5rem',
// // // //             maxWidth: '400px'
// // // //           }}>
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Search videos by title..."
// // // //               value={searchTerm}
// // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // //               style={{
// // // //                 width: '100%',
// // // //                 padding: '0.75rem 1rem',
// // // //                 border: `1px solid ${currentTheme.border}`,
// // // //                 borderRadius: '8px',
// // // //                 background: currentTheme.inputBackground,
// // // //                 color: currentTheme.text,
// // // //                 fontSize: '1rem',
// // // //                 outline: 'none',
// // // //                 transition: 'all 0.3s ease'
// // // //               }}
// // // //               onFocus={(e) => {
// // // //                 e.target.style.borderColor = '#3b82f6';
// // // //                 e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
// // // //               }}
// // // //               onBlur={(e) => {
// // // //                 e.target.style.borderColor = currentTheme.border;
// // // //                 e.target.style.boxShadow = 'none';
// // // //               }}
// // // //             />
// // // //           </div>
// // // //         )}

// // // //         <VideoGrid
// // // //           mediaFiles={currentVideos}
// // // //           loading={loading}
// // // //           selectedVideos={selectedVideos}
// // // //           bulkDeleteMode={bulkDeleteMode}
// // // //           editingVideoId={editingVideoId}
// // // //           editTitle={editTitle}
// // // //           isDarkTheme={isDarkTheme}
// // // //           onVideoSelect={toggleVideoSelection}
// // // //           onEdit={startEditing}
// // // //           onSave={saveTitle}
// // // //           onCancel={cancelEditing}
// // // //           onEditTitleChange={setEditTitle}
// // // //           onShowOptions={showVideoOptionsMenu} // Video click → options menu
// // // //           onTagProducts={handleTagProducts} // Tag products button → tag products modal
// // // //           onDelete={showDeleteConfirmation}
// // // //           onVideoClick={showVideoPlayerModal}
// // // //           onUploadClick={() => setShowHomepageMedia(true)}
// // // //           // ADDED: Pass the TagProductsModal state to VideoPlayer components
// // // //           tagProductsModalOpened={showTagProductsModal.show}
// // // //         />

// // // //         {/* Pagination Controls */}
// // // //         {totalPages > 1 && (
// // // //           <div style={{
// // // //             display: 'flex',
// // // //             justifyContent: 'center',
// // // //             alignItems: 'center',
// // // //             marginTop: '2rem',
// // // //             gap: '1rem',
// // // //             flexWrap: 'wrap'
// // // //           }}>
// // // //             {/* Previous Button */}
// // // //             <button
// // // //               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// // // //               disabled={currentPage === 1}
// // // //               style={{
// // // //                 background: currentPage === 1 ? '#9ca3af' : '#3b82f6',
// // // //                 color: 'white',
// // // //                 border: 'none',
// // // //                 padding: '0.5rem 1rem',
// // // //                 borderRadius: '6px',
// // // //                 fontSize: '0.875rem',
// // // //                 fontWeight: '500',
// // // //                 cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
// // // //                 transition: 'all 0.3s ease',
// // // //                 opacity: currentPage === 1 ? 0.6 : 1
// // // //               }}
// // // //             >
// // // //               ← Previous
// // // //             </button>

// // // //             {/* Page Numbers */}
// // // //             <div style={{
// // // //               display: 'flex',
// // // //               gap: '0.5rem',
// // // //               alignItems: 'center'
// // // //             }}>
// // // //               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
// // // //                 <button
// // // //                   key={page}
// // // //                   onClick={() => setCurrentPage(page)}
// // // //                   style={{
// // // //                     background: currentPage === page ? '#3b82f6' : 'transparent',
// // // //                     color: currentPage === page ? 'white' : currentTheme.text,
// // // //                     border: `1px solid ${currentPage === page ? '#3b82f6' : currentTheme.border}`,
// // // //                     padding: '0.5rem 0.75rem',
// // // //                     borderRadius: '6px',
// // // //                     fontSize: '0.875rem',
// // // //                     fontWeight: '500',
// // // //                     cursor: 'pointer',
// // // //                     transition: 'all 0.3s ease',
// // // //                     minWidth: '2.5rem'
// // // //                   }}
// // // //                   onMouseEnter={(e) => {
// // // //                     if (currentPage !== page) {
// // // //                       e.target.style.background = isDarkTheme ? '#374151' : '#f3f4f6';
// // // //                     }
// // // //                   }}
// // // //                   onMouseLeave={(e) => {
// // // //                     if (currentPage !== page) {
// // // //                       e.target.style.background = 'transparent';
// // // //                     }
// // // //                   }}
// // // //                 >
// // // //                   {page}
// // // //                 </button>
// // // //               ))}
// // // //             </div>

// // // //             {/* Next Button */}
// // // //             <button
// // // //               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// // // //               disabled={currentPage === totalPages}
// // // //               style={{
// // // //                 background: currentPage === totalPages ? '#9ca3af' : '#3b82f6',
// // // //                 color: 'white',
// // // //                 border: 'none',
// // // //                 padding: '0.5rem 1rem',
// // // //                 borderRadius: '6px',
// // // //                 fontSize: '0.875rem',
// // // //                 fontWeight: '500',
// // // //                 cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
// // // //                 transition: 'all 0.3s ease',
// // // //                 opacity: currentPage === totalPages ? 0.6 : 1
// // // //               }}
// // // //             >
// // // //               Next →
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {/* Results Info */}
// // // //         {mediaFiles.length > 0 && (
// // // //           <div style={{
// // // //             textAlign: 'center',
// // // //             marginTop: '1rem',
// // // //             color: currentTheme.mutedText,
// // // //             fontSize: '0.875rem'
// // // //           }}>
// // // //             Showing {startIndex + 1}-{Math.min(startIndex + videosPerPage, totalVideos)} of {totalVideos} videos
// // // //             {searchTerm && ` for "${searchTerm}"`}
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* Modals */}
// // // //       <Modals
// // // //         showVideoOptions={showVideoOptions}
// // // //         showProductsModal={showProductsModal}
// // // //         showDeleteModal={showDeleteModal}
// // // //         showBulkDeleteModal={showBulkDeleteModal}
// // // //         products={products}
// // // //         selectedProducts={selectedProducts}
// // // //         selectedVideos={selectedVideos}
// // // //         loadingProducts={loadingProducts}
// // // //         onHideVideoOptions={hideVideoOptionsMenu}
// // // //         onCopyUrl={copyVideoUrl}
// // // //         onDownload={downloadVideo}
// // // //         onLoadProducts={loadProductsForVideo}
// // // //         onDelete={deleteVideo}
// // // //         onHideDeleteModal={() => setShowDeleteModal({ show: false, videoId: null, videoTitle: '' })}
// // // //         onBulkDelete={bulkDeleteVideos}
// // // //         onHideBulkDeleteModal={() => setShowBulkDeleteModal(false)}
// // // //         onToggleProduct={toggleProductSelection}
// // // //         onSaveProducts={saveVideoProducts}
// // // //         onHideProductsModal={closeProductsModal}
// // // //         isDarkTheme={isDarkTheme}
// // // //         showVideoPlayerModal={showVideoPlayerModal}
// // // //         // NEW: Pass the modal state
// // // //         productsModalOpened={showProductsModal.show}
// // // //         closeProductsModal={closeProductsModal}
// // // //         // SEPARATE props for tag products modal
// // // //         showTagProductsModal={showTagProductsModal}
// // // //         onHideTagProductsModal={handleHideTagProducts}
// // // //       />

// // // //       {/* Video Player Modal */}
// // // //       {showVideoPlayer?.show && showVideoPlayer.video && (
// // // //         <VideoPlayerModal
// // // //           showVideoPlayer={showVideoPlayer}
// // // //           onHide={hideVideoPlayerModal}
// // // //           videoData={showVideoPlayer.video}
// // // //           isDarkTheme={isDarkTheme}
// // // //         />
// // // //       )}

// // // //       {/* Homepage Media Modal */}
// // // //       {showHomepageMedia && (
// // // //         <div style={{
// // // //           position: 'fixed',
// // // //           top: 0,
// // // //           left: 0,
// // // //           right: 0,
// // // //           bottom: 0,
// // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // //           display: 'flex',
// // // //           alignItems: 'center',
// // // //           justifyContent: 'center',
// // // //           zIndex: 1000,
// // // //           padding: '2rem'
// // // //         }}>
// // // //           <div style={{
// // // //             background: isDarkTheme ? '#1f2937' : 'white',
// // // //             borderRadius: '16px',
// // // //             padding: '0',
// // // //             maxWidth: '900px',
// // // //             width: '100%',
// // // //             maxHeight: '90vh',
// // // //             overflow: 'auto',
// // // //             position: 'relative'
// // // //           }}>
// // // //             <button
// // // //               onClick={() => setShowHomepageMedia(false)}
// // // //               style={{
// // // //                 position: 'absolute',
// // // //                 top: '1rem',
// // // //                 right: '1rem',
// // // //                 background: isDarkTheme ? '#374151' : 'white',
// // // //                 border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
// // // //                 fontSize: '1.5rem',
// // // //                 cursor: 'pointer',
// // // //                 color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // // //                 zIndex: 1001,
// // // //                 width: '40px',
// // // //                 height: '40px',
// // // //                 borderRadius: '50%',
// // // //                 display: 'flex',
// // // //                 alignItems: 'center',
// // // //                 justifyContent: 'center',
// // // //                 transition: 'all 0.3s ease'
// // // //               }}
// // // //               onMouseEnter={(e) => {
// // // //                 e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
// // // //               }}
// // // //               onMouseLeave={(e) => {
// // // //                 e.target.style.background = isDarkTheme ? '#374151' : 'white';
// // // //               }}
// // // //             >
// // // //               ✕
// // // //             </button>
// // // //             <HomepageMedia />
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <style jsx>{`
// // // //         @keyframes fadeIn {
// // // //           from {
// // // //             opacity: 0;
// // // //             transform: translateY(20px);
// // // //           }
// // // //           to {
// // // //             opacity: 1;
// // // //             transform: translateY(0);
// // // //           }
// // // //         }
// // // //       `}</style>
// // // //     </VideoGalleryLayout>
// // // //   );
// // // // }



// // // // app/routes/app.video-gallery.jsx
// // // import { useState, useEffect } from "react";
// // // import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
// // // import VideoGrid from "../components/videogallerycomponents/VideoGrid";
// // // import BulkDeleteControls from "../components/videogallerycomponents/BulkDeleteControls";
// // // import Modals from "../components/videogallerycomponents/Modals";
// // // import VideoPlayerModal from "../components/videogallerycomponents/VideoPlayerModal";
// // // import HomepageMedia from "../components/videogallerycomponents/homepage-media.jsx";
// // // import { useVideoGallery } from "../components/videogallerycomponents/hooks/useVideoGallery";

// // // // Loader function required by React Router
// // // export async function loader({ request }) {
// // //   return {
// // //     message: "Video Gallery Loaded",
// // //     timestamp: new Date().toISOString()
// // //   };
// // // }

// // // export default function VideoGallery() {
// // //   const {
// // //     // State
// // //     isDarkTheme,
// // //     showHomepageMedia,
// // //     mediaFiles,
// // //     loading,
// // //     selectedVideos,
// // //     bulkDeleteMode,
// // //     toast,
// // //     editingVideoId,
// // //     editTitle,
// // //     showDeleteModal,
// // //     showBulkDeleteModal,
// // //     showProductsModal,
// // //     products,
// // //     selectedProducts,
// // //     loadingProducts,
// // //     showVideoPlayer,

// // //     // Setters
// // //     setIsDarkTheme,
// // //     setShowHomepageMedia,
// // //     setBulkDeleteMode,
// // //     setSelectedVideos,
// // //     setEditTitle,
// // //     setShowDeleteModal,
// // //     setShowBulkDeleteModal,
// // //     setShowProductsModal,
// // //     setSelectedProducts,

// // //     // Actions
// // //     showToast,
// // //     loadMediaFiles,
// // //     toggleVideoSelection,
// // //     selectAllVideos,
// // //     startEditing,
// // //     saveTitle,
// // //     cancelEditing,
// // //     showDeleteConfirmation,
// // //     deleteVideo,
// // //     showBulkDeleteConfirmation,
// // //     bulkDeleteVideos,
// // //     copyVideoUrl,
// // //     downloadVideo,
// // //     loadProductsForVideo,
// // //     toggleProductSelection,
// // //     saveVideoProducts,
// // //     showVideoPlayerModal,
// // //     hideVideoPlayerModal
// // //   } = useVideoGallery();

// // //   // SEPARATE STATE FOR VIDEO OPTIONS MODAL
// // //   const [showVideoOptions, setShowVideoOptions] = useState({
// // //     show: false,
// // //     video: null
// // //   });

// // //   // SEPARATE STATE FOR TAG PRODUCTS MODAL
// // //   const [showTagProductsModal, setShowTagProductsModal] = useState({
// // //     show: false,
// // //     video: null
// // //   });

// // //   // Add closeProductsModal function
// // //   const closeProductsModal = () => {
// // //     setShowProductsModal({ show: false, video: null });
// // //     setSelectedProducts(new Set());
// // //   };

// // //   // UPDATED: Handle closing TagProducts modal with refresh
// // //   const handleHideTagProducts = () => {
// // //     console.log('🔄 TagProductsModal closing, refreshing products...');
// // //     setShowTagProductsModal({
// // //       show: false,
// // //       video: null
// // //     });
    
// // //     // Force a refresh of media files to update the tag products button
// // //     loadMediaFiles();
// // //   };

// // //   // PAGINATION STATE
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const videosPerPage = 12;

// // //   // Handler for video options menu (when video is clicked)
// // //   const showVideoOptionsMenu = (video, event) => {
// // //     setShowVideoOptions({
// // //       show: true,
// // //       video: video
// // //     });
// // //   };

// // //   const hideVideoOptionsMenu = () => {
// // //     setShowVideoOptions({
// // //       show: false,
// // //       video: null
// // //     });
// // //   };

// // //   // SEPARATE handler for tag products button
// // //   const handleTagProducts = (video, event) => {
// // //     console.log('Opening tag products modal for video:', video.id);
// // //     setShowTagProductsModal({
// // //       show: true,
// // //       video: video
// // //     });
// // //   };

// // //   // Filter media files based on search term
// // //   const filteredMediaFiles = mediaFiles.filter(file =>
// // //     file.title.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   // Calculate pagination
// // //   const totalVideos = filteredMediaFiles.length;
// // //   const totalPages = Math.ceil(totalVideos / videosPerPage);
// // //   const startIndex = (currentPage - 1) * videosPerPage;
// // //   const currentVideos = filteredMediaFiles.slice(startIndex, startIndex + videosPerPage);

// // //   // Reset to first page when search term changes
// // //   useEffect(() => {
// // //     setCurrentPage(1);
// // //   }, [searchTerm]);

// // //   // Theme styles for local use
// // //   const themeStyles = {
// // //     light: {
// // //       background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// // //       cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// // //       text: '#1f2937',
// // //       mutedText: '#6b7280',
// // //       border: '1px solid #e2e8f0',
// // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
// // //       inputBackground: 'white'
// // //     },
// // //     dark: {
// // //       background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
// // //       cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
// // //       text: '#f8fafc',
// // //       mutedText: '#94a3b8',
// // //       border: '1px solid #475569',
// // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
// // //       inputBackground: '#374151'
// // //     }
// // //   };

// // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // //   // Detect theme from document
// // //   useEffect(() => {
// // //     const checkTheme = () => {
// // //       setIsDarkTheme(document.documentElement.classList.contains('dark'));
// // //     };

// // //     checkTheme();

// // //     const observer = new MutationObserver(checkTheme);
// // //     observer.observe(document.documentElement, {
// // //       attributes: true,
// // //       attributeFilter: ['class']
// // //     });

// // //     return () => observer.disconnect();
// // //   }, []);

// // //   // Load media files on component mount
// // //   useEffect(() => {
// // //     loadMediaFiles();
// // //   }, []);

// // //   // Refresh media files when upload modal closes
// // //   useEffect(() => {
// // //     if (!showHomepageMedia) {
// // //       loadMediaFiles();
// // //     }
// // //   }, [showHomepageMedia]);

// // //   return (
// // //     <VideoGalleryLayout
// // //       isDarkTheme={isDarkTheme}
// // //       toast={toast}
// // //     >
// // //       {/* Bulk Delete Controls */}
// // //       {bulkDeleteMode && (
// // //         <BulkDeleteControls
// // //           selectedVideos={selectedVideos}
// // //           mediaFiles={mediaFiles}
// // //           isDarkTheme={isDarkTheme}
// // //           onSelectAll={selectAllVideos}
// // //           onBulkDelete={showBulkDeleteConfirmation}
// // //           onCancel={() => {
// // //             setBulkDeleteMode(false);
// // //             setSelectedVideos(new Set());
// // //           }}
// // //         />
// // //       )}

// // //       {/* Uploaded Media Section */}
// // //       <div style={{
// // //         background: currentTheme.cardBackground,
// // //         borderRadius: '16px',
// // //         padding: '2rem',
// // //         border: currentTheme.border,
// // //         boxShadow: currentTheme.shadow,
// // //         marginBottom: '2rem',
// // //         animation: 'fadeIn 0.6s ease-out 0.2s both'
// // //       }}>
// // //         <div style={{
// // //           display: 'flex',
// // //           justifyContent: 'space-between',
// // //           alignItems: 'center',
// // //           marginBottom: '1.5rem'
// // //         }}>
// // //           <h2 style={{
// // //             fontSize: '1.5rem',
// // //             fontWeight: 'bold',
// // //             color: currentTheme.text
// // //           }}>
// // //             📁 Your Uploaded Media
// // //             <span style={{
// // //               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // //               color: 'white',
// // //               padding: '0.25rem 0.75rem',
// // //               borderRadius: '20px',
// // //               fontSize: '0.875rem',
// // //               marginLeft: '0.5rem'
// // //             }}>
// // //               {mediaFiles.length}
// // //             </span>
// // //           </h2>
// // //           <div style={{ display: 'flex', gap: '1rem' }}>
// // //             {mediaFiles.length > 0 && (
// // //               <button
// // //                 onClick={() => setBulkDeleteMode(!bulkDeleteMode)}
// // //                 style={{
// // //                   background: bulkDeleteMode ? '#6b7280' : '#f59e0b',
// // //                   color: 'white',
// // //                   border: 'none',
// // //                   padding: '0.75rem 1.5rem',
// // //                   borderRadius: '8px',
// // //                   fontWeight: '600',
// // //                   cursor: 'pointer',
// // //                   transition: 'all 0.3s ease'
// // //                 }}
// // //               >
// // //                 {bulkDeleteMode ? '✕ Cancel Bulk Delete' : '🗑️ Bulk Delete'}
// // //               </button>
// // //             )}
// // //             <button
// // //               onClick={() => setShowHomepageMedia(true)}
// // //               style={{
// // //                 background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
// // //                 color: 'white',
// // //                 border: 'none',
// // //                 padding: '0.75rem 1.5rem',
// // //                 borderRadius: '8px',
// // //                 fontWeight: '600',
// // //                 cursor: 'pointer',
// // //                 transition: 'all 0.3s ease'
// // //               }}
// // //             >
// // //               📤 Upload New Media
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Search Bar */}
// // //         {mediaFiles.length > 0 && (
// // //           <div style={{
// // //             marginBottom: '1.5rem',
// // //             maxWidth: '400px'
// // //           }}>
// // //             <input
// // //               type="text"
// // //               placeholder="Search videos by title..."
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               style={{
// // //                 width: '100%',
// // //                 padding: '0.75rem 1rem',
// // //                 border: `1px solid ${currentTheme.border}`,
// // //                 borderRadius: '8px',
// // //                 background: currentTheme.inputBackground,
// // //                 color: currentTheme.text,
// // //                 fontSize: '1rem',
// // //                 outline: 'none',
// // //                 transition: 'all 0.3s ease'
// // //               }}
// // //               onFocus={(e) => {
// // //                 e.target.style.borderColor = '#3b82f6';
// // //                 e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
// // //               }}
// // //               onBlur={(e) => {
// // //                 e.target.style.borderColor = currentTheme.border;
// // //                 e.target.style.boxShadow = 'none';
// // //               }}
// // //             />
// // //           </div>
// // //         )}

// // //         <VideoGrid
// // //           mediaFiles={currentVideos}
// // //           loading={loading}
// // //           selectedVideos={selectedVideos}
// // //           bulkDeleteMode={bulkDeleteMode}
// // //           editingVideoId={editingVideoId}
// // //           editTitle={editTitle}
// // //           isDarkTheme={isDarkTheme}
// // //           onVideoSelect={toggleVideoSelection}
// // //           onEdit={startEditing}
// // //           onSave={saveTitle}
// // //           onCancel={cancelEditing}
// // //           onEditTitleChange={setEditTitle}
// // //           onShowOptions={showVideoOptionsMenu} // Video click → options menu
// // //           onTagProducts={handleTagProducts} // Tag products button → tag products modal
// // //           onDelete={showDeleteConfirmation}
// // //           onVideoClick={showVideoPlayerModal}
// // //           onUploadClick={() => setShowHomepageMedia(true)}
// // //           // ADDED: Pass the TagProductsModal state to VideoPlayer components
// // //           tagProductsModalOpened={showTagProductsModal.show}
// // //         />

// // //         {/* Pagination Controls */}
// // //         {totalPages > 1 && (
// // //           <div style={{
// // //             display: 'flex',
// // //             justifyContent: 'center',
// // //             alignItems: 'center',
// // //             marginTop: '2rem',
// // //             gap: '1rem',
// // //             flexWrap: 'wrap'
// // //           }}>
// // //             {/* Previous Button */}
// // //             <button
// // //               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// // //               disabled={currentPage === 1}
// // //               style={{
// // //                 background: currentPage === 1 ? '#9ca3af' : '#3b82f6',
// // //                 color: 'white',
// // //                 border: 'none',
// // //                 padding: '0.5rem 1rem',
// // //                 borderRadius: '6px',
// // //                 fontSize: '0.875rem',
// // //                 fontWeight: '500',
// // //                 cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
// // //                 transition: 'all 0.3s ease',
// // //                 opacity: currentPage === 1 ? 0.6 : 1
// // //               }}
// // //             >
// // //               ← Previous
// // //             </button>

// // //             {/* Page Numbers */}
// // //             <div style={{
// // //               display: 'flex',
// // //               gap: '0.5rem',
// // //               alignItems: 'center'
// // //             }}>
// // //               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
// // //                 <button
// // //                   key={page}
// // //                   onClick={() => setCurrentPage(page)}
// // //                   style={{
// // //                     background: currentPage === page ? '#3b82f6' : 'transparent',
// // //                     color: currentPage === page ? 'white' : currentTheme.text,
// // //                     border: `1px solid ${currentPage === page ? '#3b82f6' : currentTheme.border}`,
// // //                     padding: '0.5rem 0.75rem',
// // //                     borderRadius: '6px',
// // //                     fontSize: '0.875rem',
// // //                     fontWeight: '500',
// // //                     cursor: 'pointer',
// // //                     transition: 'all 0.3s ease',
// // //                     minWidth: '2.5rem'
// // //                   }}
// // //                   onMouseEnter={(e) => {
// // //                     if (currentPage !== page) {
// // //                       e.target.style.background = isDarkTheme ? '#374151' : '#f3f4f6';
// // //                     }
// // //                   }}
// // //                   onMouseLeave={(e) => {
// // //                     if (currentPage !== page) {
// // //                       e.target.style.background = 'transparent';
// // //                     }
// // //                   }}
// // //                 >
// // //                   {page}
// // //                 </button>
// // //               ))}
// // //             </div>

// // //             {/* Next Button */}
// // //             <button
// // //               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// // //               disabled={currentPage === totalPages}
// // //               style={{
// // //                 background: currentPage === totalPages ? '#9ca3af' : '#3b82f6',
// // //                 color: 'white',
// // //                 border: 'none',
// // //                 padding: '0.5rem 1rem',
// // //                 borderRadius: '6px',
// // //                 fontSize: '0.875rem',
// // //                 fontWeight: '500',
// // //                 cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
// // //                 transition: 'all 0.3s ease',
// // //                 opacity: currentPage === totalPages ? 0.6 : 1
// // //               }}
// // //             >
// // //               Next →
// // //             </button>
// // //           </div>
// // //         )}

// // //         {/* Results Info */}
// // //         {mediaFiles.length > 0 && (
// // //           <div style={{
// // //             textAlign: 'center',
// // //             marginTop: '1rem',
// // //             color: currentTheme.mutedText,
// // //             fontSize: '0.875rem'
// // //           }}>
// // //             Showing {startIndex + 1}-{Math.min(startIndex + videosPerPage, totalVideos)} of {totalVideos} videos
// // //             {searchTerm && ` for "${searchTerm}"`}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Modals */}
// // //       <Modals
// // //         showVideoOptions={showVideoOptions}
// // //         showProductsModal={showProductsModal}
// // //         showDeleteModal={showDeleteModal}
// // //         showBulkDeleteModal={showBulkDeleteModal}
// // //         products={products}
// // //         selectedProducts={selectedProducts}
// // //         selectedVideos={selectedVideos}
// // //         loadingProducts={loadingProducts}
// // //         onHideVideoOptions={hideVideoOptionsMenu}
// // //         onCopyUrl={copyVideoUrl}
// // //         onDownload={downloadVideo}
// // //         onLoadProducts={loadProductsForVideo}
// // //         onDelete={deleteVideo}
// // //         onHideDeleteModal={() => setShowDeleteModal({ show: false, videoId: null, videoTitle: '' })}
// // //         onBulkDelete={bulkDeleteVideos}
// // //         onHideBulkDeleteModal={() => setShowBulkDeleteModal(false)}
// // //         onToggleProduct={toggleProductSelection}
// // //         onSaveProducts={saveVideoProducts}
// // //         onHideProductsModal={closeProductsModal}
// // //         isDarkTheme={isDarkTheme}
// // //         showVideoPlayerModal={showVideoPlayerModal}
// // //         // NEW: Pass the modal state
// // //         productsModalOpened={showProductsModal.show}
// // //         closeProductsModal={closeProductsModal}
// // //         // SEPARATE props for tag products modal
// // //         showTagProductsModal={showTagProductsModal}
// // //         onHideTagProductsModal={handleHideTagProducts} // UPDATED: Use the new function
// // //       />

// // //       {/* Video Player Modal */}
// // //       {showVideoPlayer?.show && showVideoPlayer.video && (
// // //         <VideoPlayerModal
// // //           showVideoPlayer={showVideoPlayer}
// // //           onHide={hideVideoPlayerModal}
// // //           videoData={showVideoPlayer.video}
// // //           isDarkTheme={isDarkTheme}
// // //         />
// // //       )}

// // //       {/* Homepage Media Modal */}
// // //       {showHomepageMedia && (
// // //         <div style={{
// // //           position: 'fixed',
// // //           top: 0,
// // //           left: 0,
// // //           right: 0,
// // //           bottom: 0,
// // //           background: 'rgba(0, 0, 0, 0.5)',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center',
// // //           zIndex: 1000,
// // //           padding: '2rem'
// // //         }}>
// // //           <div style={{
// // //             background: isDarkTheme ? '#1f2937' : 'white',
// // //             borderRadius: '16px',
// // //             padding: '0',
// // //             maxWidth: '900px',
// // //             width: '100%',
// // //             maxHeight: '90vh',
// // //             overflow: 'auto',
// // //             position: 'relative'
// // //           }}>
// // //             <button
// // //               onClick={() => setShowHomepageMedia(false)}
// // //               style={{
// // //                 position: 'absolute',
// // //                 top: '1rem',
// // //                 right: '1rem',
// // //                 background: isDarkTheme ? '#374151' : 'white',
// // //                 border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
// // //                 fontSize: '1.5rem',
// // //                 cursor: 'pointer',
// // //                 color: isDarkTheme ? '#9ca3af' : '#6b7280',
// // //                 zIndex: 1001,
// // //                 width: '40px',
// // //                 height: '40px',
// // //                 borderRadius: '50%',
// // //                 display: 'flex',
// // //                 alignItems: 'center',
// // //                 justifyContent: 'center',
// // //                 transition: 'all 0.3s ease'
// // //               }}
// // //               onMouseEnter={(e) => {
// // //                 e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
// // //               }}
// // //               onMouseLeave={(e) => {
// // //                 e.target.style.background = isDarkTheme ? '#374151' : 'white';
// // //               }}
// // //             >
// // //               ✕
// // //             </button>
// // //             <HomepageMedia />
// // //           </div>
// // //         </div>
// // //       )}

// // //       <style jsx>{`
// // //         @keyframes fadeIn {
// // //           from {
// // //             opacity: 0;
// // //             transform: translateY(20px);
// // //           }
// // //           to {
// // //             opacity: 1;
// // //             transform: translateY(0);
// // //           }
// // //         }
// // //       `}</style>
// // //     </VideoGalleryLayout>
// // //   );
// // // }








// // // app/routes/app.video-gallery.jsx
// // import { useState, useEffect } from "react";
// // import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
// // import VideoGrid from "../components/videogallerycomponents/VideoGrid";
// // import BulkDeleteControls from "../components/videogallerycomponents/BulkDeleteControls";
// // import Modals from "../components/videogallerycomponents/Modals";
// // import VideoPlayerModal from "../components/videogallerycomponents/VideoPlayerModal";
// // import HomepageMedia from "../components/videogallerycomponents/homepage-media.jsx";
// // import { useVideoGallery } from "../components/videogallerycomponents/hooks/useVideoGallery";

// // // Loader function required by React Router
// // export async function loader({ request }) {
// //   return {
// //     message: "Video Gallery Loaded",
// //     timestamp: new Date().toISOString()
// //   };
// // }

// // export default function VideoGallery() {
// //   const {
// //     // State
// //     isDarkTheme,
// //     showHomepageMedia,
// //     mediaFiles,
// //     loading,
// //     selectedVideos,
// //     bulkDeleteMode,
// //     toast,
// //     editingVideoId,
// //     editTitle,
// //     showDeleteModal,
// //     showBulkDeleteModal,
// //     showProductsModal,
// //     products,
// //     selectedProducts,
// //     loadingProducts,
// //     showVideoPlayer,

// //     // Setters
// //     setIsDarkTheme,
// //     setShowHomepageMedia,
// //     setBulkDeleteMode,
// //     setSelectedVideos,
// //     setEditTitle,
// //     setShowDeleteModal,
// //     setShowBulkDeleteModal,
// //     setShowProductsModal,
// //     setSelectedProducts,

// //     // Actions
// //     showToast,
// //     loadMediaFiles,
// //     toggleVideoSelection,
// //     selectAllVideos,
// //     startEditing,
// //     saveTitle,
// //     cancelEditing,
// //     showDeleteConfirmation,
// //     deleteVideo,
// //     showBulkDeleteConfirmation,
// //     bulkDeleteVideos,
// //     copyVideoUrl,
// //     downloadVideo,
// //     loadProductsForVideo,
// //     toggleProductSelection,
// //     saveVideoProducts,
// //     showVideoPlayerModal,
// //     hideVideoPlayerModal
// //   } = useVideoGallery();

// //   // SEPARATE STATE FOR VIDEO OPTIONS MODAL
// //   const [showVideoOptions, setShowVideoOptions] = useState({
// //     show: false,
// //     video: null
// //   });

// //   // SEPARATE STATE FOR TAG PRODUCTS MODAL
// //   const [showTagProductsModal, setShowTagProductsModal] = useState({
// //     show: false,
// //     video: null
// //   });

// //   // NEW STATE: Track which video's products need to be refreshed
// //   const [videoToRefresh, setVideoToRefresh] = useState(null);

// //   // Add closeProductsModal function
// //   const closeProductsModal = () => {
// //     setShowProductsModal({ show: false, video: null });
// //     setSelectedProducts(new Set());
// //   };

// //   // UPDATED: Handle closing TagProducts modal and trigger refresh for specific video
// //   const handleHideTagProducts = () => {
// //     console.log('🔄 TagProductsModal closing, refreshing products for video:', showTagProductsModal.video?.id);
    
// //     // Set the video that needs to be refreshed
// //     if (showTagProductsModal.video) {
// //       setVideoToRefresh(showTagProductsModal.video.id);
// //     }
    
// //     setShowTagProductsModal({
// //       show: false,
// //       video: null
// //     });
// //   };

// //   // PAGINATION STATE
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const videosPerPage = 12;

// //   // Handler for video options menu (when video is clicked)
// //   const showVideoOptionsMenu = (video, event) => {
// //     setShowVideoOptions({
// //       show: true,
// //       video: video
// //     });
// //   };

// //   const hideVideoOptionsMenu = () => {
// //     setShowVideoOptions({
// //       show: false,
// //       video: null
// //     });
// //   };

// //   // SEPARATE handler for tag products button
// //   const handleTagProducts = (video, event) => {
// //     console.log('Opening tag products modal for video:', video.id);
// //     setShowTagProductsModal({
// //       show: true,
// //       video: video
// //     });
// //   };

// //   // Filter media files based on search term
// //   const filteredMediaFiles = mediaFiles.filter(file =>
// //     file.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // Calculate pagination
// //   const totalVideos = filteredMediaFiles.length;
// //   const totalPages = Math.ceil(totalVideos / videosPerPage);
// //   const startIndex = (currentPage - 1) * videosPerPage;
// //   const currentVideos = filteredMediaFiles.slice(startIndex, startIndex + videosPerPage);

// //   // Reset to first page when search term changes
// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [searchTerm]);

// //   // Theme styles for local use
// //   const themeStyles = {
// //     light: {
// //       background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// //       cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// //       text: '#1f2937',
// //       mutedText: '#6b7280',
// //       border: '1px solid #e2e8f0',
// //       shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
// //       inputBackground: 'white'
// //     },
// //     dark: {
// //       background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
// //       cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
// //       text: '#f8fafc',
// //       mutedText: '#94a3b8',
// //       border: '1px solid #475569',
// //       shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
// //       inputBackground: '#374151'
// //     }
// //   };

// //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// //   // Detect theme from document
// //   useEffect(() => {
// //     const checkTheme = () => {
// //       setIsDarkTheme(document.documentElement.classList.contains('dark'));
// //     };

// //     checkTheme();

// //     const observer = new MutationObserver(checkTheme);
// //     observer.observe(document.documentElement, {
// //       attributes: true,
// //       attributeFilter: ['class']
// //     });

// //     return () => observer.disconnect();
// //   }, []);

// //   // Load media files on component mount
// //   useEffect(() => {
// //     loadMediaFiles();
// //   }, []);

// //   // Refresh media files when upload modal closes
// //   useEffect(() => {
// //     if (!showHomepageMedia) {
// //       loadMediaFiles();
// //     }
// //   }, [showHomepageMedia]);

// //   return (
// //     <VideoGalleryLayout
// //       isDarkTheme={isDarkTheme}
// //       toast={toast}
// //     >
// //       {/* Bulk Delete Controls */}
// //       {bulkDeleteMode && (
// //         <BulkDeleteControls
// //           selectedVideos={selectedVideos}
// //           mediaFiles={mediaFiles}
// //           isDarkTheme={isDarkTheme}
// //           onSelectAll={selectAllVideos}
// //           onBulkDelete={showBulkDeleteConfirmation}
// //           onCancel={() => {
// //             setBulkDeleteMode(false);
// //             setSelectedVideos(new Set());
// //           }}
// //         />
// //       )}

// //       {/* Uploaded Media Section */}
// //       <div style={{
// //         background: currentTheme.cardBackground,
// //         borderRadius: '16px',
// //         padding: '2rem',
// //         border: currentTheme.border,
// //         boxShadow: currentTheme.shadow,
// //         marginBottom: '2rem',
// //         animation: 'fadeIn 0.6s ease-out 0.2s both'
// //       }}>
// //         <div style={{
// //           display: 'flex',
// //           justifyContent: 'space-between',
// //           alignItems: 'center',
// //           marginBottom: '1.5rem'
// //         }}>
// //           <h2 style={{
// //             fontSize: '1.5rem',
// //             fontWeight: 'bold',
// //             color: currentTheme.text
// //           }}>
// //             📁 Your Uploaded Media
// //             <span style={{
// //               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //               color: 'white',
// //               padding: '0.25rem 0.75rem',
// //               borderRadius: '20px',
// //               fontSize: '0.875rem',
// //               marginLeft: '0.5rem'
// //             }}>
// //               {mediaFiles.length}
// //             </span>
// //           </h2>
// //           <div style={{ display: 'flex', gap: '1rem' }}>
// //             {mediaFiles.length > 0 && (
// //               <button
// //                 onClick={() => setBulkDeleteMode(!bulkDeleteMode)}
// //                 style={{
// //                   background: bulkDeleteMode ? '#6b7280' : '#f59e0b',
// //                   color: 'white',
// //                   border: 'none',
// //                   padding: '0.75rem 1.5rem',
// //                   borderRadius: '8px',
// //                   fontWeight: '600',
// //                   cursor: 'pointer',
// //                   transition: 'all 0.3s ease'
// //                 }}
// //               >
// //                 {bulkDeleteMode ? '✕ Cancel Bulk Delete' : '🗑️ Bulk Delete'}
// //               </button>
// //             )}
// //             <button
// //               onClick={() => setShowHomepageMedia(true)}
// //               style={{
// //                 background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
// //                 color: 'white',
// //                 border: 'none',
// //                 padding: '0.75rem 1.5rem',
// //                 borderRadius: '8px',
// //                 fontWeight: '600',
// //                 cursor: 'pointer',
// //                 transition: 'all 0.3s ease'
// //               }}
// //             >
// //               📤 Upload New Media
// //             </button>
// //           </div>
// //         </div>

// //         {/* Search Bar */}
// //         {mediaFiles.length > 0 && (
// //           <div style={{
// //             marginBottom: '1.5rem',
// //             maxWidth: '400px'
// //           }}>
// //             <input
// //               type="text"
// //               placeholder="Search videos by title..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               style={{
// //                 width: '100%',
// //                 padding: '0.75rem 1rem',
// //                 border: `1px solid ${currentTheme.border}`,
// //                 borderRadius: '8px',
// //                 background: currentTheme.inputBackground,
// //                 color: currentTheme.text,
// //                 fontSize: '1rem',
// //                 outline: 'none',
// //                 transition: 'all 0.3s ease'
// //               }}
// //               onFocus={(e) => {
// //                 e.target.style.borderColor = '#3b82f6';
// //                 e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
// //               }}
// //               onBlur={(e) => {
// //                 e.target.style.borderColor = currentTheme.border;
// //                 e.target.style.boxShadow = 'none';
// //               }}
// //             />
// //           </div>
// //         )}

// //         <VideoGrid
// //           mediaFiles={currentVideos}
// //           loading={loading}
// //           selectedVideos={selectedVideos}
// //           bulkDeleteMode={bulkDeleteMode}
// //           editingVideoId={editingVideoId}
// //           editTitle={editTitle}
// //           isDarkTheme={isDarkTheme}
// //           onVideoSelect={toggleVideoSelection}
// //           onEdit={startEditing}
// //           onSave={saveTitle}
// //           onCancel={cancelEditing}
// //           onEditTitleChange={setEditTitle}
// //           onShowOptions={showVideoOptionsMenu} // Video click → options menu
// //           onTagProducts={handleTagProducts} // Tag products button → tag products modal
// //           onDelete={showDeleteConfirmation}
// //           onVideoClick={showVideoPlayerModal}
// //           onUploadClick={() => setShowHomepageMedia(true)}
// //           // NEW: Pass the video that needs to be refreshed
// //           videoToRefresh={videoToRefresh}
// //         />

// //         {/* Pagination Controls */}
// //         {totalPages > 1 && (
// //           <div style={{
// //             display: 'flex',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             marginTop: '2rem',
// //             gap: '1rem',
// //             flexWrap: 'wrap'
// //           }}>
// //             {/* Previous Button */}
// //             <button
// //               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// //               disabled={currentPage === 1}
// //               style={{
// //                 background: currentPage === 1 ? '#9ca3af' : '#3b82f6',
// //                 color: 'white',
// //                 border: 'none',
// //                 padding: '0.5rem 1rem',
// //                 borderRadius: '6px',
// //                 fontSize: '0.875rem',
// //                 fontWeight: '500',
// //                 cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
// //                 transition: 'all 0.3s ease',
// //                 opacity: currentPage === 1 ? 0.6 : 1
// //               }}
// //             >
// //               ← Previous
// //             </button>

// //             {/* Page Numbers */}
// //             <div style={{
// //               display: 'flex',
// //               gap: '0.5rem',
// //               alignItems: 'center'
// //             }}>
// //               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
// //                 <button
// //                   key={page}
// //                   onClick={() => setCurrentPage(page)}
// //                   style={{
// //                     background: currentPage === page ? '#3b82f6' : 'transparent',
// //                     color: currentPage === page ? 'white' : currentTheme.text,
// //                     border: `1px solid ${currentPage === page ? '#3b82f6' : currentTheme.border}`,
// //                     padding: '0.5rem 0.75rem',
// //                     borderRadius: '6px',
// //                     fontSize: '0.875rem',
// //                     fontWeight: '500',
// //                     cursor: 'pointer',
// //                     transition: 'all 0.3s ease',
// //                     minWidth: '2.5rem'
// //                   }}
// //                   onMouseEnter={(e) => {
// //                     if (currentPage !== page) {
// //                       e.target.style.background = isDarkTheme ? '#374151' : '#f3f4f6';
// //                     }
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     if (currentPage !== page) {
// //                       e.target.style.background = 'transparent';
// //                     }
// //                   }}
// //                 >
// //                   {page}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Next Button */}
// //             <button
// //               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// //               disabled={currentPage === totalPages}
// //               style={{
// //                 background: currentPage === totalPages ? '#9ca3af' : '#3b82f6',
// //                 color: 'white',
// //                 border: 'none',
// //                 padding: '0.5rem 1rem',
// //                 borderRadius: '6px',
// //                 fontSize: '0.875rem',
// //                 fontWeight: '500',
// //                 cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
// //                 transition: 'all 0.3s ease',
// //                 opacity: currentPage === totalPages ? 0.6 : 1
// //               }}
// //             >
// //               Next →
// //             </button>
// //           </div>
// //         )}

// //         {/* Results Info */}
// //         {mediaFiles.length > 0 && (
// //           <div style={{
// //             textAlign: 'center',
// //             marginTop: '1rem',
// //             color: currentTheme.mutedText,
// //             fontSize: '0.875rem'
// //           }}>
// //             Showing {startIndex + 1}-{Math.min(startIndex + videosPerPage, totalVideos)} of {totalVideos} videos
// //             {searchTerm && ` for "${searchTerm}"`}
// //           </div>
// //         )}
// //       </div>

// //       {/* Modals */}
// //       <Modals
// //         showVideoOptions={showVideoOptions}
// //         showProductsModal={showProductsModal}
// //         showDeleteModal={showDeleteModal}
// //         showBulkDeleteModal={showBulkDeleteModal}
// //         products={products}
// //         selectedProducts={selectedProducts}
// //         selectedVideos={selectedVideos}
// //         loadingProducts={loadingProducts}
// //         onHideVideoOptions={hideVideoOptionsMenu}
// //         onCopyUrl={copyVideoUrl}
// //         onDownload={downloadVideo}
// //         onLoadProducts={loadProductsForVideo}
// //         onDelete={deleteVideo}
// //         onHideDeleteModal={() => setShowDeleteModal({ show: false, videoId: null, videoTitle: '' })}
// //         onBulkDelete={bulkDeleteVideos}
// //         onHideBulkDeleteModal={() => setShowBulkDeleteModal(false)}
// //         onToggleProduct={toggleProductSelection}
// //         onSaveProducts={saveVideoProducts}
// //         onHideProductsModal={closeProductsModal}
// //         isDarkTheme={isDarkTheme}
// //         showVideoPlayerModal={showVideoPlayerModal}
// //         // NEW: Pass the modal state
// //         productsModalOpened={showProductsModal.show}
// //         closeProductsModal={closeProductsModal}
// //         // SEPARATE props for tag products modal
// //         showTagProductsModal={showTagProductsModal}
// //         onHideTagProductsModal={handleHideTagProducts} // UPDATED: Use the new function
// //       />

// //       {/* Video Player Modal */}
// //       {showVideoPlayer?.show && showVideoPlayer.video && (
// //         <VideoPlayerModal
// //           showVideoPlayer={showVideoPlayer}
// //           onHide={hideVideoPlayerModal}
// //           videoData={showVideoPlayer.video}
// //           isDarkTheme={isDarkTheme}
// //         />
// //       )}

// //       {/* Homepage Media Modal */}
// //       {showHomepageMedia && (
// //         <div style={{
// //           position: 'fixed',
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           background: 'rgba(0, 0, 0, 0.5)',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           zIndex: 1000,
// //           padding: '2rem'
// //         }}>
// //           <div style={{
// //             background: isDarkTheme ? '#1f2937' : 'white',
// //             borderRadius: '16px',
// //             padding: '0',
// //             maxWidth: '900px',
// //             width: '100%',
// //             maxHeight: '90vh',
// //             overflow: 'auto',
// //             position: 'relative'
// //           }}>
// //             <button
// //               onClick={() => setShowHomepageMedia(false)}
// //               style={{
// //                 position: 'absolute',
// //                 top: '1rem',
// //                 right: '1rem',
// //                 background: isDarkTheme ? '#374151' : 'white',
// //                 border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
// //                 fontSize: '1.5rem',
// //                 cursor: 'pointer',
// //                 color: isDarkTheme ? '#9ca3af' : '#6b7280',
// //                 zIndex: 1001,
// //                 width: '40px',
// //                 height: '40px',
// //                 borderRadius: '50%',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 transition: 'all 0.3s ease'
// //               }}
// //               onMouseEnter={(e) => {
// //                 e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
// //               }}
// //               onMouseLeave={(e) => {
// //                 e.target.style.background = isDarkTheme ? '#374151' : 'white';
// //               }}
// //             >
// //               ✕
// //             </button>
// //             <HomepageMedia />
// //           </div>
// //         </div>
// //       )}

// //       <style jsx>{`
// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //             transform: translateY(20px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }
// //       `}</style>
// //     </VideoGalleryLayout>
// //   );
// // }

// // app/routes/app.video-gallery.jsx
// import { useState, useEffect } from "react";
// import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
// import VideoGrid from "../components/videogallerycomponents/VideoGrid";
// import BulkDeleteControls from "../components/videogallerycomponents/BulkDeleteControls";
// import Modals from "../components/videogallerycomponents/Modals";
// import VideoPlayerModal from "../components/videogallerycomponents/VideoPlayerModal";
// import HomepageMedia from "../components/videogallerycomponents/homepage-media.jsx";
// import TagProducts from "../components/videogallerycomponents/TagProducts"; // ← Add this import
// import { useVideoGallery } from "../components/videogallerycomponents/hooks/useVideoGallery";

// export async function loader({ request }) {
//   return {
//     message: "Video Gallery Loaded",
//     timestamp: new Date().toISOString()
//   };
// }

// export default function VideoGallery() {
//   const {
//     isDarkTheme,
//     showHomepageMedia,
//     mediaFiles,
//     loading,
//     selectedVideos,
//     bulkDeleteMode,
//     toast,
//     editingVideoId,
//     editTitle,
//     showDeleteModal,
//     showBulkDeleteModal,
//     showProductsModal,
//     products,
//     selectedProducts,
//     loadingProducts,
//     showVideoPlayer,

//     // Setters
//     setIsDarkTheme,
//     setShowHomepageMedia,
//     setBulkDeleteMode,
//     setSelectedVideos,
//     setEditTitle,
//     setShowDeleteModal,
//     setShowBulkDeleteModal,
//     setShowProductsModal,
//     setSelectedProducts,

//     // Actions
//     showToast,
//     loadMediaFiles,
//     toggleVideoSelection,
//     selectAllVideos,
//     startEditing,
//     saveTitle,
//     cancelEditing,
//     showDeleteConfirmation,
//     deleteVideo,
//     showBulkDeleteConfirmation,
//     bulkDeleteVideos,
//     copyVideoUrl,
//     downloadVideo,
//     loadProductsForVideo,
//     toggleProductSelection,
//     saveVideoProducts,
//     showVideoPlayerModal,
//     hideVideoPlayerModal
//   } = useVideoGallery();

//   const [showVideoOptions, setShowVideoOptions] = useState({ show: false, video: null });
//   const [showTagProductsModal, setShowTagProductsModal] = useState({ show: false, video: null });

//   // ← NEW: This triggers refresh in all VideoPlayer cards
//   const [productRefreshTrigger, setProductRefreshTrigger] = useState(0);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const videosPerPage = 12;

//   const closeProductsModal = () => {
//     setShowProductsModal({ show: false, video: null });
//     setSelectedProducts(new Set());
//   };

//   // UPDATED: Handle closing TagProducts modal with refresh
//   const handleHideTagProducts = () => {
//     console.log('🔄 TagProductsModal closing, refreshing products...');
//     setShowTagProductsModal({
//       show: false,
//       video: null
//     });

//     // Force a refresh of media files to update the tag products button
//     loadMediaFiles();
//   const showVideoOptionsMenu = (video) => {
//     setShowVideoOptions({ show: true, video });
//   };

//   const hideVideoOptionsMenu = () => {
//     setShowVideoOptions({ show: false, video: null });
//     // ← Trigger refresh when Video Options Modal closes
//     setProductRefreshTrigger(prev => prev + 1);
//   };

//   const handleTagProducts = (video) => {
//     setShowTagProductsModal({ show: true, video });
//   };

//   const handleHideTagProducts = () => {
//     setShowTagProductsModal({ show: false, video: null });
//     // ← Trigger refresh when Tag Products modal closes
//     setProductRefreshTrigger(prev => prev + 1);
//   };

//   const filteredMediaFiles = mediaFiles.filter(file =>
//     file.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalVideos = filteredMediaFiles.length;
//   const totalPages = Math.ceil(totalVideos / videosPerPage);
//   const startIndex = (currentPage - 1) * videosPerPage;
//   const currentVideos = filteredMediaFiles.slice(startIndex, startIndex + videosPerPage);

//   useEffect(() => setCurrentPage(1), [searchTerm]);

//   useEffect(() => {
//     const checkTheme = () => setIsDarkTheme(document.documentElement.classList.contains('dark'));
//     checkTheme();

//     const observer = new MutationObserver(checkTheme);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => { loadMediaFiles(); }, []);
//   useEffect(() => { if (!showHomepageMedia) loadMediaFiles(); }, [showHomepageMedia]);

//   const themeStyles = {
//     light: { background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)', text: '#1f2937', mutedText: '#6b7280', border: '1px solid #e2e8f0', shadow: '0 4px 20px rgba(0, 0, 0, 0.08)', inputBackground: 'white' },
//     dark: { background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)', text: '#f8fafc', mutedText: '#94a3b8', border: '1px solid #475569', shadow: '0 4px 20px rgba(0, 0, 0, 0.3)', inputBackground: '#374151' }
//   };
//   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

//   return (
//     <VideoGalleryLayout
//       isDarkTheme={isDarkTheme}
//       toast={toast}
//     >
//       {/* Bulk Delete Controls */}
//       {bulkDeleteMode && (
//         <BulkDeleteControls
//           selectedVideos={selectedVideos}
//           mediaFiles={mediaFiles}
//           isDarkTheme={isDarkTheme}
//           onSelectAll={selectAllVideos}
//           onBulkDelete={showBulkDeleteConfirmation}
//           onCancel={() => { setBulkDeleteMode(false); setSelectedVideos(new Set()); }}
//         />
//       )}

//       <div style={{ background: currentTheme.cardBackground || currentTheme.background, borderRadius: '16px', padding: '2rem', border: currentTheme.border, boxShadow: currentTheme.shadow, marginBottom: '2rem' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
//           <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: currentTheme.text }}>
//             Your Uploaded Media
//             <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
//               {mediaFiles.length}
//             </span>
//           </h2>
//           <div style={{ display: 'flex', gap: '1rem' }}>
//             {mediaFiles.length > 0 && (
//               <button onClick={() => setBulkDeleteMode(!bulkDeleteMode)} style={{ background: bulkDeleteMode ? '#6b7280' : '#f59e0b', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
//                 {bulkDeleteMode ? 'Cancel Bulk Delete' : 'Bulk Delete'}
//               </button>
//             )}
//             <button onClick={() => setShowHomepageMedia(true)} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
//               Upload New Media
//             </button>
//           </div>
//         </div>

//         {mediaFiles.length > 0 && (
//           <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
//             <input
//               type="text"
//               placeholder="Search videos by title..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{ width: '100%', padding: '0.75rem 1rem', border: `1px solid ${currentTheme.border}`, borderRadius: '8px', background: currentTheme.inputBackground, color: currentTheme.text, fontSize: '1rem', outline: 'none' }}
//             />
//           </div>
//         )}

//         <VideoGrid
//           mediaFiles={currentVideos}
//           loading={loading}
//           selectedVideos={selectedVideos}
//           bulkDeleteMode={bulkDeleteMode}
//           editingVideoId={editingVideoId}
//           editTitle={editTitle}
//           isDarkTheme={isDarkTheme}
//           onVideoSelect={toggleVideoSelection}
//           onEdit={startEditing}
//           onSave={saveTitle}
//           onCancel={cancelEditing}
//           onEditTitleChange={setEditTitle}
//           onShowOptions={showVideoOptionsMenu}
//           onTagProducts={handleTagProducts}
//           onDelete={showDeleteConfirmation}
//           onVideoClick={showVideoPlayerModal}
//           onUploadClick={() => setShowHomepageMedia(true)}
//           productRefreshTrigger={productRefreshTrigger}  // ← Critical: Pass trigger
//         />

//         {/* Pagination & Info */}
//         {totalPages > 1 && (
//           <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '0.5rem' }}>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <button key={page} onClick={() => setCurrentPage(page)} style={{ padding: '0.5rem 1rem', background: currentPage === page ? '#10b981' : 'transparent', color: currentPage === page ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.border}`, borderRadius: '8px', cursor: 'pointer' }}>
//                 {page}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <Modals
//         showVideoOptions={showVideoOptions}
//         onHideVideoOptions={hideVideoOptionsMenu}
//         showProductsModal={showProductsModal}
//         products={products}
//         selectedProducts={selectedProducts}
//         loadingProducts={loadingProducts}
//         onLoadProducts={loadProductsForVideo}
//         onToggleProduct={toggleProductSelection}
//         onSaveProducts={saveVideoProducts}
//         onHideProductsModal={closeProductsModal}
//         showDeleteModal={showDeleteModal}
//         showBulkDeleteModal={showBulkDeleteModal}
//         onDelete={deleteVideo}
//         onBulkDelete={bulkDeleteVideos}
//         onHideDeleteModal={() => setShowDeleteModal({ show: false, videoId: null, videoTitle: "" })}
//         onHideBulkDeleteModal={() => setShowBulkDeleteModal(false)}
//         isDarkTheme={isDarkTheme}
//         productsModalOpened={showProductsModal.show}
//         closeProductsModal={closeProductsModal}
//       />

//       {/* Tag Products Modal */}
//       {showTagProductsModal.show && (
//         <TagProducts
//           showTagProducts={showTagProductsModal}
//           onHide={handleHideTagProducts}
//           onLoadProducts={loadProductsForVideo}
//           isDarkTheme={isDarkTheme}
//           onSaveProducts={saveVideoProducts}
//           productsModalOpened={showProductsModal.show}
//           closeProductsModal={closeProductsModal}
//         />
//       )}

//       {showVideoPlayer?.show && showVideoPlayer.video && (
//         <VideoPlayerModal showVideoPlayer={showVideoPlayer} onHide={hideVideoPlayerModal} videoData={showVideoPlayer.video} isDarkTheme={isDarkTheme} />
//       )}

//       {showHomepageMedia && (
//         <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
//           <div style={{ background: isDarkTheme ? '#1f2937' : 'white', borderRadius: '16px', padding: 0, maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative' }}>
//             <button onClick={() => setShowHomepageMedia(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: isDarkTheme ? '#374151' : 'white', border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`, width: '40px', height: '40px', borderRadius: '50%', fontSize: '1.5rem', cursor: 'pointer' }}>X</button>
//             <HomepageMedia />
//           </div>
//         </div>
//       )}
//     </VideoGalleryLayout>
//   );
// }




// app/routes/app.video-gallery.jsx
import { useState, useEffect } from "react";
import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
import VideoGrid from "../components/videogallerycomponents/VideoGrid";
import BulkDeleteControls from "../components/videogallerycomponents/BulkDeleteControls";
import Modals from "../components/videogallerycomponents/Modals";
import VideoPlayerModal from "../components/videogallerycomponents/VideoPlayerModal";
import HomepageMedia from "../components/videogallerycomponents/homepage-media.jsx";
import TagProducts from "../components/videogallerycomponents/TagProducts";
import { useVideoGallery } from "../components/videogallerycomponents/hooks/useVideoGallery";

export async function loader({ request }) {
  return {
    message: "Video Gallery Loaded",
    timestamp: new Date().toISOString(),
  };
}

export default function VideoGallery() {
  const {
    isDarkTheme,
    showHomepageMedia,
    mediaFiles,
    loading,
    selectedVideos,
    bulkDeleteMode,
    toast,
    editingVideoId,
    editTitle,
    showDeleteModal,
    showBulkDeleteModal,
    showProductsModal,
    products,
    selectedProducts,
    loadingProducts,
    showVideoPlayer,

    // Setters
    setIsDarkTheme,
    setShowHomepageMedia,
    setBulkDeleteMode,
    setSelectedVideos,
    setEditTitle,
    setShowDeleteModal,
    setShowBulkDeleteModal,
    setShowProductsModal,
    setSelectedProducts,

    // Actions
    showToast,
    loadMediaFiles,
    toggleVideoSelection,
    selectAllVideos,
    startEditing,
    saveTitle,
    cancelEditing,
    showDeleteConfirmation,
    deleteVideo,
    showBulkDeleteConfirmation,
    bulkDeleteVideos,
    copyVideoUrl,
    downloadVideo,
    loadProductsForVideo,
    toggleProductSelection,
    saveVideoProducts,
    showVideoPlayerModal,
    hideVideoPlayerModal,
  } = useVideoGallery();

  // SEPARATE STATE FOR VIDEO OPTIONS MODAL
  const [showVideoOptions, setShowVideoOptions] = useState({
    show: false,
    video: null,
  });

  // SEPARATE STATE FOR TAG PRODUCTS MODAL
  const [showTagProductsModal, setShowTagProductsModal] = useState({
    show: false,
    video: null,
  });
  const [showVideoOptions, setShowVideoOptions] = useState({ show: false, video: null });
  const [showTagProductsModal, setShowTagProductsModal] = useState({ show: false, video: null });

  // State to store products for each video
  const [videoProductsMap, setVideoProductsMap] = useState({});

  const [productRefreshTrigger, setProductRefreshTrigger] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const videosPerPage = 12;

  const closeProductsModal = () => {
    setShowProductsModal({ show: false, video: null });
    setSelectedProducts(new Set());
  };

  // UPDATED: Handle closing TagProducts modal and trigger refresh for specific video
  const handleHideTagProducts = () => {
    console.log(
      "🔄 TagProductsModal closing, refreshing products for video:",
      showTagProductsModal.video?.id,
    );

    // Set the video that needs to be refreshed
    if (showTagProductsModal.video) {
      setVideoToRefresh(showTagProductsModal.video.id);
    }

    setShowTagProductsModal({
      show: false,
      video: null,
    });
  const showVideoOptionsMenu = (video) => {
    setShowVideoOptions({ show: true, video });
  };

  const hideVideoOptionsMenu = () => {
    setShowVideoOptions({ show: false, video: null });
    setProductRefreshTrigger(prev => prev + 1);
  };
// Handler for video options menu (when video is clicked)
const showVideoOptionsMenu = (video, event) => {
  setShowVideoOptions({
    show: true,
    video: video,
  });
};

const hideVideoOptionsMenu = () => {
  setShowVideoOptions({
    show: false,
    video: null,
  });
};

// Handler for tag products button
const handleTagProducts = (video, event) => {
  console.log("Opening tag products modal for video:", video.id);
  setShowTagProductsModal({
    show: true,
    video: video,
  });
};

const handleHideTagProducts = () => {
  setShowTagProductsModal({ show: false, video: null });
  setProductRefreshTrigger(prev => prev + 1);
};

// Function to fetch products for a specific video
const fetchVideoProducts = async (videoId) => {
  try {
    const response = await fetch(`/api/video-products/${videoId}`);
    const result = await response.json();
    
    if (result.success) {
      setVideoProductsMap(prev => ({
        ...prev,
        [videoId]: result.products
      }));
    }
  } catch (error) {
    console.error('Error fetching video products:', error);
  }
};

// Fetch products for all videos when mediaFiles load
useEffect(() => {
  if (mediaFiles.length > 0) {
    mediaFiles.forEach(video => {
      fetchVideoProducts(video.id);
    });
  }
}, [mediaFiles]);

// Enhanced search function that searches both video titles and product names
const filteredMediaFiles = mediaFiles.filter(file => {
  if (!searchTerm.trim()) return true;
  
  const searchLower = searchTerm.toLowerCase();
  
  // Search in video title
  const titleMatch = file.title.toLowerCase().includes(searchLower);
  
  // Search in product names for this video
  const videoProducts = videoProductsMap[file.id] || [];
  const productMatch = videoProducts.some(product => 
    product.title.toLowerCase().includes(searchLower)
  );
  
  return titleMatch || productMatch;
});

  const totalVideos = filteredMediaFiles.length;
  const totalPages = Math.ceil(totalVideos / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredMediaFiles.slice(
    startIndex,
    startIndex + videosPerPage,
  );

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Theme styles for local use
  const themeStyles = {
    light: {
      background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
      cardBackground: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
      text: "#1f2937",
      mutedText: "#6b7280",
      border: "1px solid #e2e8f0",
      shadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      inputBackground: "white",
    },
    dark: {
      background: "linear-gradient(145deg, #1e293b 0%, #334155 100%)",
      cardBackground: "linear-gradient(145deg, #374151 0%, #4b5563 100%)",
      text: "#f8fafc",
      mutedText: "#94a3b8",
      border: "1px solid #475569",
      shadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      inputBackground: "#374151",
    },
  };

  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;
  useEffect(() => setCurrentPage(1), [searchTerm]);

  useEffect(() => {
    const checkTheme = () => setIsDarkTheme(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => { loadMediaFiles(); }, []);
  useEffect(() => { if (!showHomepageMedia) loadMediaFiles(); }, [showHomepageMedia]);

  // Refresh video products when productRefreshTrigger changes
  useEffect(() => {
    if (productRefreshTrigger > 0 && mediaFiles.length > 0) {
      mediaFiles.forEach(video => {
        fetchVideoProducts(video.id);
      });
    }
  }, [productRefreshTrigger]);

  const themeStyles = {
    light: { 
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)', 
      text: '#1f2937', 
      mutedText: '#6b7280', 
      border: '1px solid #e2e8f0', 
      shadow: '0 4px 20px rgba(0, 0, 0, 0.08)', 
      inputBackground: 'white',
      cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)'
    },
    dark: { 
      background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)', 
      text: '#f8fafc', 
      mutedText: '#94a3b8', 
      border: '1px solid #475569', 
      shadow: '0 4px 20px rgba(0, 0, 0, 0.3)', 
      inputBackground: '#374151',
      cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)'
    }
  };
  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  return (
    <VideoGalleryLayout isDarkTheme={isDarkTheme} toast={toast}>
      {/* Bulk Delete Controls */}
      {bulkDeleteMode && (
        <BulkDeleteControls
          selectedVideos={selectedVideos}
          mediaFiles={mediaFiles}
          isDarkTheme={isDarkTheme}
          onSelectAll={selectAllVideos}
          onBulkDelete={showBulkDeleteConfirmation}
          onCancel={() => { setBulkDeleteMode(false); setSelectedVideos(new Set()); }}
        />
      )}

      <div style={{ 
        background: currentTheme.cardBackground, 
        borderRadius: '16px', 
        padding: '2rem', 
        border: currentTheme.border, 
        boxShadow: currentTheme.shadow, 
        marginBottom: '2rem',
        animation: 'fadeIn 0.6s ease-out 0.2s both'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: currentTheme.text }}>
            📁 Your Uploaded Media
            <span style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '20px', 
              fontSize: '0.875rem', 
              marginLeft: '0.5rem' 
            }}>
              {mediaFiles.length}
            </span>
          </h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            {mediaFiles.length > 0 && (
              <button 
                onClick={() => setBulkDeleteMode(!bulkDeleteMode)} 
                style={{ 
                  background: bulkDeleteMode ? '#6b7280' : '#f59e0b', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {bulkDeleteMode ? "✕ Cancel Bulk Delete" : "🗑️ Bulk Delete"}
              </button>
            )}
            <button 
              onClick={() => setShowHomepageMedia(true)} 
              style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                color: 'white', 
                border: 'none', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px', 
                fontWeight: '600', 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📤 Upload New Media
            </button>
          </div>
        </div>

        {mediaFiles.length > 0 && (
          <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search videos by title or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem', 
                border: `1px solid ${currentTheme.border}`, 
                borderRadius: '8px', 
                background: currentTheme.inputBackground, 
                color: currentTheme.text, 
                fontSize: '1rem', 
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = currentTheme.border;
                e.target.style.boxShadow = "none";
              }}
            />
            <div style={{ 
              fontSize: '0.75rem', 
              color: currentTheme.mutedText, 
              marginTop: '0.5rem',
              fontStyle: 'italic'
            }}>
              Search by video title or product name
            </div>
          </div>
        )}

        <VideoGrid
          mediaFiles={currentVideos}
          loading={loading}
          selectedVideos={selectedVideos}
          bulkDeleteMode={bulkDeleteMode}
          editingVideoId={editingVideoId}
          editTitle={editTitle}
          isDarkTheme={isDarkTheme}
          onVideoSelect={toggleVideoSelection}
          onEdit={startEditing}
          onSave={saveTitle}
          onCancel={cancelEditing}
          onEditTitleChange={setEditTitle}
          onShowOptions={showVideoOptionsMenu}
          onTagProducts={handleTagProducts}
          onDelete={showDeleteConfirmation}
          onVideoClick={showVideoPlayerModal}
          onUploadClick={() => setShowHomepageMedia(true)}
          productRefreshTrigger={productRefreshTrigger}
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                background: currentPage === 1 ? "#9ca3af" : "#3b82f6",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                opacity: currentPage === 1 ? 0.6 : 1,
              }}
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      background:
                        currentPage === page ? "#3b82f6" : "transparent",
                      color: currentPage === page ? "white" : currentTheme.text,
                      border: `1px solid ${currentPage === page ? "#3b82f6" : currentTheme.border}`,
                      padding: "0.5rem 0.75rem",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      minWidth: "2.5rem",
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== page) {
                        e.target.style.background = isDarkTheme
                          ? "#374151"
                          : "#f3f4f6";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== page) {
                        e.target.style.background = "transparent";
                      }
                    }}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              style={{
                background: currentPage === totalPages ? "#9ca3af" : "#3b82f6",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                opacity: currentPage === totalPages ? 0.6 : 1,
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Results Info */}
        {mediaFiles.length > 0 && (
          <div style={{
            textAlign: 'center',
            marginTop: '1rem',
            color: currentTheme.mutedText,
            fontSize: '0.875rem'
          }}>
            Showing {startIndex + 1}-{Math.min(startIndex + videosPerPage, totalVideos)} of {totalVideos} videos
            {searchTerm && (
              <span>
                {" for "}
                <span style={{ fontWeight: '600', color: currentTheme.text }}>
                  "{searchTerm}"
                </span>
                {filteredMediaFiles.some(file => {
                  const videoProducts = videoProductsMap[file.id] || [];
                  return videoProducts.some(product => 
                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                }) && (
                  <span style={{ marginLeft: '0.5rem', background: '#10b981', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>
                    Includes product matches
                  </span>
                )}
              </span>
            )}
          </div>
        )}
      </div>

      <Modals
        showVideoOptions={showVideoOptions}
        onHideVideoOptions={hideVideoOptionsMenu}
        showProductsModal={showProductsModal}
        products={products}
        selectedProducts={selectedProducts}
        loadingProducts={loadingProducts}
        onLoadProducts={loadProductsForVideo}
c
        onToggleProduct={toggleProductSelection}
        onSaveProducts={saveVideoProducts}
        onHideProductsModal={closeProductsModal}
        showDeleteModal={showDeleteModal}
        showBulkDeleteModal={showBulkDeleteModal}
        onDelete={deleteVideo}
        onBulkDelete={bulkDeleteVideos}
        onHideDeleteModal={() => setShowDeleteModal({ show: false, videoId: null, videoTitle: "" })}
        onHideBulkDeleteModal={() => setShowBulkDeleteModal(false)}
        isDarkTheme={isDarkTheme}
        productsModalOpened={showProductsModal.show}
        closeProductsModal={closeProductsModal}
      />

      {/* Tag Products Modal */}
      {showTagProductsModal.show && (
        <TagProducts
          showTagProducts={showTagProductsModal}
          onHide={handleHideTagProducts}
          onLoadProducts={loadProductsForVideo}
          isDarkTheme={isDarkTheme}
          onSaveProducts={saveVideoProducts}
          productsModalOpened={showProductsModal.show}
          closeProductsModal={closeProductsModal}
        />
      )}

      {showVideoPlayer?.show && showVideoPlayer.video && (
        <VideoPlayerModal showVideoPlayer={showVideoPlayer} onHide={hideVideoPlayerModal} videoData={showVideoPlayer.video} isDarkTheme={isDarkTheme} />
      )}

      {showHomepageMedia && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: isDarkTheme ? '#1f2937' : 'white', borderRadius: '16px', padding: 0, maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative' }}>
            <button onClick={() => setShowHomepageMedia(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: isDarkTheme ? '#374151' : 'white', border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`, width: '40px', height: '40px', borderRadius: '50%', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            <HomepageMedia />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </VideoGalleryLayout>
  );
}
