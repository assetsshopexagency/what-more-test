// // app/routes/app.video-gallery.jsx
// import { useState, useEffect } from "react";
// import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
// import VideoGrid from "../components/videogallerycomponents/VideoGrid";
// import Modals from "../components/videogallerycomponents/Modals";
// import VideoPlayerModal from "../components/videogallerycomponents/VideoPlayerModal";
// import HomepageMedia from "../components/videogallerycomponents/homepage-media.jsx";
// import TagProducts from "../components/videogallerycomponents/TagProducts";
// import ArrangeMediaModal from "../components/videogallerycomponents/ArrangeMediaModal";
// import { useVideoGallery } from "../components/videogallerycomponents/hooks/useVideoGallery";
// export async function loader({ request }) {
//   return {
//     message: "Video Gallery Loaded",
//     timestamp: new Date().toISOString(),
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
//     hideVideoPlayerModal,
//   } = useVideoGallery();
//   const [showVideoOptions, setShowVideoOptions] = useState({
//     show: false,
//     video: null,
//   });
//   const [showTagProductsModal, setShowTagProductsModal] = useState({
//     show: false,
//     video: null,
//   });
//   const [videoProductsMap, setVideoProductsMap] = useState({});
//   const [productRefreshTrigger, setProductRefreshTrigger] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const videosPerPage = 12;
//   const [hasMediaChanged, setHasMediaChanged] = useState(false);
//   const hasSelectedVideos = selectedVideos.size > 0;
//   // New state for bulk delete mode
//   const [isBulkDeleteActive, setIsBulkDeleteActive] = useState(false);
//   // New state for filter
//   const [filterType, setFilterType] = useState(null); // 'tagged' or 'untagged'
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   // New state for arrange media modal
//   const [showArrangeModal, setShowArrangeModal] = useState(false);
//   const showVideoOptionsMenu = (video) => {
//     setShowVideoOptions({
//       show: true,
//       video: video,
//     });
//   };
//   const hideVideoOptionsMenu = () => {
//     setShowVideoOptions({
//       show: false,
//       video: null,
//     });
//   };
//   const handleTagProducts = (video) => {
//     setShowTagProductsModal({
//       show: true,
//       video: video,
//     });
//   };
//   const handleHideTagProducts = () => {
//     setShowTagProductsModal({ show: false, video: null });
//     setProductRefreshTrigger((prev) => prev + 1);
//   };
//   const clearSearch = () => {
//     setSearchTerm("");
//   };
//   const fetchVideoProducts = async (videoId) => {
//     try {
//       const response = await fetch(`/api/video-products/${videoId}`);
//       const result = await response.json();
//       if (result.success) {
//         setVideoProductsMap((prev) => ({
//           ...prev,
//           [videoId]: result.products,
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching video products:", error);
//     }
//   };
//   const closeProductsModal = () => {
//     setShowProductsModal({ show: false, video: null });
//     setSelectedProducts(new Set());
//   };
//   const handleBulkDeleteClick = () => {
//     setIsBulkDeleteActive(true);
//     setSelectedVideos(new Set()); // Clear any previously selected videos
//   };
//   const handleCancelBulkDelete = () => {
//     setIsBulkDeleteActive(false);
//     setSelectedVideos(new Set()); // Clear selected videos
//   };
//   const handleConfirmBulkDelete = () => {
//     if (selectedVideos.size === 0) {
//       showToast("Please select at least one video to delete", "warning");
//       return;
//     }
//     showBulkDeleteConfirmation();
//   };
//   const handleFilterChange = (type) => {
//     setFilterType(type);
//     setIsFilterOpen(false);
//     setCurrentPage(1); // Reset to first page when filter changes
//   };
//   const handleArrangementSaved = () => {
//     showToast("Video arrangement saved successfully", "success");
//     loadMediaFiles(); // Refresh the media files to get new positions
//   };
//   // Close filter dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isFilterOpen && !event.target.closest('.filter-dropdown')) {
//         setIsFilterOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isFilterOpen]);
//   const filteredMediaFiles = mediaFiles
//     .filter((file) => {
//       // First filter by search term
//       if (searchTerm.trim()) {
//         const searchLower = searchTerm.toLowerCase();
//         const titleMatch = file.title.toLowerCase().includes(searchLower);
//         const videoProducts = videoProductsMap[file.id] || [];
//         const productMatch = videoProducts.some((product) =>
//           product.title.toLowerCase().includes(searchLower),
//         );
//         if (!titleMatch && !productMatch) return false;
//       }
//       // Then filter by tagged/untagged
//       if (filterType === 'tagged') {
//         const videoProducts = videoProductsMap[file.id] || [];
//         return videoProducts.length > 0;
//       } else if (filterType === 'untagged') {
//         const videoProducts = videoProductsMap[file.id] || [];
//         return videoProducts.length === 0;
//       }
//       return true;
//     })
//     .sort((a, b) => a.position - b.position); // Sort by position
//   const totalVideos = filteredMediaFiles.length;
//   const totalPages = Math.ceil(totalVideos / videosPerPage);
//   const startIndex = (currentPage - 1) * videosPerPage;
//   const currentVideos = filteredMediaFiles.slice(
//     startIndex,
//     startIndex + videosPerPage,
//   );
//   useEffect(() => {
//     const checkTheme = () =>
//       setIsDarkTheme(document.documentElement.classList.contains("dark"));
//     checkTheme();
//     const observer = new MutationObserver(checkTheme);
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });
//     return () => observer.disconnect();
//   }, []);
//   useEffect(() => {
//     loadMediaFiles();
//   }, []);
//   useEffect(() => {
//     if (!showHomepageMedia && hasMediaChanged) {
//       loadMediaFiles();
//       setHasMediaChanged(false);
//     }
//   }, [showHomepageMedia, hasMediaChanged]);
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filterType]);
//   useEffect(() => {
//     if (mediaFiles.length > 0) {
//       mediaFiles.forEach((video) => {
//         fetchVideoProducts(video.id);
//       });
//     }
//   }, [mediaFiles]);
//   useEffect(() => {
//     if (productRefreshTrigger > 0 && mediaFiles.length > 0) {
//       mediaFiles.forEach((video) => {
//         fetchVideoProducts(video.id);
//       });
//     }
//   }, [productRefreshTrigger]);
//   const refreshProducts = () => setProductRefreshTrigger((prev) => prev + 1);
//   return (
//     <VideoGalleryLayout isDarkTheme={isDarkTheme} toast={toast}>
//       <div className={`rounded-2xl p-8 border shadow-lg mb-8 animate-fadeIn ${isDarkTheme
//         ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
//         : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
//         }`}>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-900"
//             }`}>
//             Your Uploaded Media
//             <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1 rounded-full text-sm ml-2">
//               {mediaFiles.length}
//             </span>
//           </h2>
//           <div className="flex gap-4">
//             <button
//               onClick={() => setShowHomepageMedia(true)}
//               className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isBulkDeleteActive
//                 ? "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60"
//                 : "bg-gradient-to-r from-green-500 to-green-600 text-white cursor-pointer hover:from-green-600 hover:to-green-700"
//                 }`}
//               disabled={isBulkDeleteActive || hasSelectedVideos}
//             >
//               Upload New Media
//             </button>
//             {!isBulkDeleteActive && (
//               <button
//                 onClick={handleBulkDeleteClick}
//                 className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:from-red-600 hover:to-red-700"
//               >
//                 Remove Bulk
//               </button>
//             )}
//             {/* Add Arrange Media button */}
//             {!isBulkDeleteActive && (
//               <button
//                 onClick={() => setShowArrangeModal(true)}
//                 className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:from-purple-600 hover:to-purple-700"
//               >
//                 Arrange Media
//               </button>
//             )}
//           </div>
//         </div>
//         {isBulkDeleteActive && (
//           <div className="mb-6 p-4 rounded-lg border-2 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-bold text-red-700 dark:text-red-300">
//                   {selectedVideos.size === 0
//                     ? "Select videos to delete"
//                     : selectedVideos.size === 1
//                       ? "1 video selected for deletion"
//                       : `${selectedVideos.size} videos selected for deletion`}
//                 </h3>
//                 <p className="text-sm text-red-600 dark:text-red-400 mt-1">
//                   Click on videos to select/deselect them
//                 </p>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={selectAllVideos}
//                   className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
//                 >
//                   {selectedVideos.size === mediaFiles.length ? 'Deselect All' : 'Select All'}
//                 </button>
//                 <button
//                   onClick={handleCancelBulkDelete}
//                   className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirmBulkDelete}
//                   disabled={selectedVideos.size === 0}
//                   className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${selectedVideos.size === 0
//                     ? "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60"
//                     : "bg-red-600 text-white hover:bg-red-700"
//                     }`}
//                 >
//                   Confirm Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {mediaFiles.length > 0 && (
//           <div className="mb-6 flex items-center gap-4">
//             {/* Search Bar */}
//             <div className="relative w-full max-w-md">
//               <input
//                 type="text"
//                 placeholder="Search videos by title or product name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className={`w-full px-4 py-3 pr-12 border-2 rounded-xl text-base font-medium outline-none transition-all duration-300 shadow-sm ${isDarkTheme
//                   ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400'
//                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                   }`}
//               />
//               {searchTerm && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>
//             {/* Filter Dropdown */}
//             <div className="relative filter-dropdown">
//               <button
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 className={`px-4 py-3 border-2 rounded-xl text-base font-medium flex items-center gap-2 transition-all duration-300 ${isDarkTheme
//                   ? 'bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700'
//                   : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
//                   }`}
//               >
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
//                 </svg>
//                 Filter
//                 {filterType && (
//                   <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
//                     {filterType === 'tagged' ? 'Tagged' : 'Untagged'}
//                   </span>
//                 )}
//               </button>
//               {isFilterOpen && (
//                 <div className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-lg z-10 ${isDarkTheme
//                   ? 'bg-gray-800 border-gray-600'
//                   : 'bg-white border-gray-200'
//                   }`}>
//                   <button
//                     onClick={() => handleFilterChange('tagged')}
//                     className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${filterType === 'tagged'
//                       ? isDarkTheme ? 'bg-blue-900 text-blue-100' : 'bg-blue-50 text-blue-700'
//                       : isDarkTheme ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'
//                       }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
//                       </svg>
//                       Tagged
//                     </div>
//                     <div className="text-xs mt-1 opacity-75">Videos with products tagged</div>
//                   </button>
//                   <button
//                     onClick={() => handleFilterChange('untagged')}
//                     className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${filterType === 'untagged'
//                       ? isDarkTheme ? 'bg-blue-900 text-blue-100' : 'bg-blue-50 text-blue-700'
//                       : isDarkTheme ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'
//                       }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
//                       </svg>
//                       Untagged
//                     </div>
//                     <div className="text-xs mt-1 opacity-75">Videos without products tagged</div>
//                   </button>
//                   {filterType && (
//                     <div className="border-t border-gray-200 dark:border-gray-700">
//                       <button
//                         onClick={() => handleFilterChange(null)}
//                         className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                       >
//                         Clear Filter
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//         <VideoGrid
//           mediaFiles={currentVideos}
//           loading={loading}
//           selectedVideos={selectedVideos}
//           bulkDeleteMode={isBulkDeleteActive} // This controls checkbox visibility
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
//           productRefreshTrigger={productRefreshTrigger}
//         />
//         {/* PAGINATION CONTROLS */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center mt-8 gap-4 flex-wrap">
//             {/* Previous Button */}
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${currentPage === 1
//                 ? 'bg-gray-400 text-white cursor-not-allowed opacity-60'
//                 : 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
//                 }`}
//             >
//               ← Previous
//             </button>
//             {/* Page Numbers */}
//             <div className="flex gap-2 items-center">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (page) => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`min-w-10 px-3 py-2 rounded text-sm font-medium cursor-pointer transition-all duration-300 ${currentPage === page
//                       ? 'bg-blue-500 text-white border-blue-500'
//                       : `border ${isDarkTheme ? 'bg-transparent text-gray-100 border-gray-600 hover:bg-gray-700' : 'bg-transparent text-gray-900 border-gray-300 hover:bg-gray-100'
//                       }`}`}
//                   >
//                     {page}
//                   </button>
//                 ),
//               )}
//             </div>
//             {/* Next Button */}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${currentPage === totalPages
//                 ? 'bg-gray-400 text-white cursor-not-allowed opacity-60'
//                 : 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
//                 }`}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//         {/* Results Info */}
//         {mediaFiles.length > 0 && (
//           <div className={`text-center mt-4 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
//             Showing {startIndex + 1}-
//             {Math.min(startIndex + videosPerPage, totalVideos)} of {totalVideos}{" "}
//             videos
//             {searchTerm && (
//               <span>
//                 {" for "}
//                 <span className={`font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
//                   "{searchTerm}"
//                 </span>
//               </span>
//             )}
//             {filterType === 'tagged' && (
//               <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
//                 Tagged Only
//               </span>
//             )}
//             {filterType === 'untagged' && (
//               <span className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
//                 Untagged Only
//               </span>
//             )}
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
//         onHideDeleteModal={() =>
//           setShowDeleteModal({ show: false, videoId: null, videoTitle: "" })
//         }
//         onHideBulkDeleteModal={() => {
//           setShowBulkDeleteModal(false);
//           setIsBulkDeleteActive(false);
//           setSelectedVideos(new Set());
//         }}
//         isDarkTheme={isDarkTheme}
//         productsModalOpened={showProductsModal.show}
//         closeProductsModal={closeProductsModal}
//         onRefreshProducts={refreshProducts}
//       />
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
//         <VideoPlayerModal
//           showVideoPlayer={showVideoPlayer}
//           onHide={hideVideoPlayerModal}
//           videoData={showVideoPlayer.video}
//           isDarkTheme={isDarkTheme}
//         />
//       )}
//       {showHomepageMedia && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className={`rounded-2xl p-0 max-w-4xl w-full max-h-[90vh] overflow-auto relative ${isDarkTheme ? "bg-gray-800" : "bg-white"
//             }`}>
//             <button
//               onClick={() => setShowHomepageMedia(false)}
//               className="absolute top-4 right-4 border w-10 h-10 rounded-full text-xl cursor-pointer"
//             >
//               ✕
//             </button>
//             <HomepageMedia setHasMediaChanged={setHasMediaChanged} />
//           </div>
//         </div>
//       )}
//       {/* Arrange Media Modal */}
//       {showArrangeModal && (
//         <ArrangeMediaModal
//           showArrangeModal={showArrangeModal}
//           onHide={() => setShowArrangeModal(false)}
//           mediaFiles={mediaFiles}
//           isDarkTheme={isDarkTheme}
//           onArrangementSaved={handleArrangementSaved}
//         />
//       )}
//       {showArrangeModal && (
//         <ArrangeMediaModal
//           showArrangeModal={showArrangeModal}
//           onHide={() => setShowArrangeModal(false)}
//           mediaFiles={mediaFiles}
//           isDarkTheme={isDarkTheme}
//           onArrangementSaved={handleArrangementSaved} // This comes from useVideoGallery
//         />
//       )}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out 0.2s both;
//         }
//       `}</style>
//     </VideoGalleryLayout>
//   );
// }







import { useState, useEffect } from "react";
import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
import VideoGrid from "../components/videogallerycomponents/VideoGrid";
import Modals from "../components/videogallerycomponents/Modals";
import VideoPlayerModal from "../components/videogallerycomponents/VideoPlayerModal";
import HomepageMedia from "../components/videogallerycomponents/homepage-media.jsx";
import TagProducts from "../components/videogallerycomponents/TagProducts";
import ArrangeMediaModal from "../components/videogallerycomponents/ArrangeMediaModal";
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
  const [showVideoOptions, setShowVideoOptions] = useState({
    show: false,
    video: null,
  });
  const [showTagProductsModal, setShowTagProductsModal] = useState({
    show: false,
    video: null,
  });
  const [videoProductsMap, setVideoProductsMap] = useState({});
  const [productRefreshTrigger, setProductRefreshTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const videosPerPage = 12;
  const [hasMediaChanged, setHasMediaChanged] = useState(false);
  const hasSelectedVideos = selectedVideos.size > 0;
  // New state for bulk delete mode
  const [isBulkDeleteActive, setIsBulkDeleteActive] = useState(false);
  // New state for filter
  const [filterType, setFilterType] = useState(null); // 'tagged' or 'untagged'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // New state for arrange media modal
  const [showArrangeModal, setShowArrangeModal] = useState(false);
  const showVideoOptionsMenu = (video) => {
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
  const handleTagProducts = (video) => {
    setShowTagProductsModal({
      show: true,
      video: video,
    });
  };
  const handleHideTagProducts = () => {
    setShowTagProductsModal({ show: false, video: null });
    setProductRefreshTrigger((prev) => prev + 1);
  };
  const clearSearch = () => {
    setSearchTerm("");
  };
  const fetchVideoProducts = async (videoId) => {
    try {
      const response = await fetch(`/api/video-products/${videoId}`);
      const result = await response.json();
      if (result.success) {
        setVideoProductsMap((prev) => ({
          ...prev,
          [videoId]: result.products,
        }));
      }
    } catch (error) {
      console.error("Error fetching video products:", error);
    }
  };
  const closeProductsModal = () => {
    setShowProductsModal({ show: false, video: null });
    setSelectedProducts(new Set());
  };
  const handleBulkDeleteClick = () => {
    setIsBulkDeleteActive(true);
    setSelectedVideos(new Set()); // Clear any previously selected videos
  };
  const handleCancelBulkDelete = () => {
    setIsBulkDeleteActive(false);
    setSelectedVideos(new Set()); // Clear selected videos
  };
  const handleConfirmBulkDelete = () => {
    if (selectedVideos.size === 0) {
      showToast("Please select at least one video to delete", "warning");
      return;
    }
    showBulkDeleteConfirmation();
  };
  const handleFilterChange = (type) => {
    setFilterType(type);
    setIsFilterOpen(false);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  const handleArrangementSaved = () => {
    showToast("Video arrangement saved successfully", "success");
    loadMediaFiles(); // Refresh the media files to get new positions
  };
  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterOpen && !event.target.closest('.filter-dropdown')) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);
  const filteredMediaFiles = mediaFiles
    .filter((file) => {
      // First filter by search term
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = file.title.toLowerCase().includes(searchLower);
        const videoProducts = videoProductsMap[file.id] || [];
        const productMatch = videoProducts.some((product) =>
          product.title.toLowerCase().includes(searchLower),
        );
        if (!titleMatch && !productMatch) return false;
      }
      // Then filter by tagged/untagged
      if (filterType === 'tagged') {
        const videoProducts = videoProductsMap[file.id] || [];
        return videoProducts.length > 0;
      } else if (filterType === 'untagged') {
        const videoProducts = videoProductsMap[file.id] || [];
        return videoProducts.length === 0;
      }
      return true;
    })
    .sort((a, b) => a.position - b.position); // Sort by position
  const totalVideos = filteredMediaFiles.length;
  const totalPages = Math.ceil(totalVideos / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredMediaFiles.slice(
    startIndex,
    startIndex + videosPerPage,
  );
  useEffect(() => {
    const checkTheme = () =>
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    loadMediaFiles();
  }, []);
  useEffect(() => {
    if (!showHomepageMedia && hasMediaChanged) {
      loadMediaFiles();
      setHasMediaChanged(false);
    }
  }, [showHomepageMedia, hasMediaChanged]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);
  useEffect(() => {
    if (mediaFiles.length > 0) {
      mediaFiles.forEach((video) => {
        fetchVideoProducts(video.id);
      });
    }
  }, [mediaFiles]);
  useEffect(() => {
    if (productRefreshTrigger > 0 && mediaFiles.length > 0) {
      mediaFiles.forEach((video) => {
        fetchVideoProducts(video.id);
      });
    }
  }, [productRefreshTrigger]);
  const refreshProducts = () => setProductRefreshTrigger((prev) => prev + 1);
  return (
    <VideoGalleryLayout isDarkTheme={isDarkTheme} toast={toast}>
      <div className={`rounded-2xl p-8 border shadow-lg mb-8 animate-fadeIn ${isDarkTheme
        ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
        : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
        }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-900"
            }`}>
            Your Uploaded Media
            <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1 rounded-full text-sm ml-2">
              {mediaFiles.length}
            </span>
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setShowHomepageMedia(true)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isBulkDeleteActive
                ? "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white cursor-pointer hover:from-green-600 hover:to-green-700"
                }`}
              disabled={isBulkDeleteActive || hasSelectedVideos}
            >
              Upload New Media
            </button>
            {!isBulkDeleteActive && (
              <button
                onClick={handleBulkDeleteClick}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:from-red-600 hover:to-red-700"
              >
                Remove Bulk
              </button>
            )}
            {/* Add Arrange Media button */}
            {!isBulkDeleteActive && (
              <button
                onClick={() => setShowArrangeModal(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:from-purple-600 hover:to-purple-700"
              >
                Arrange Media
              </button>
            )}
          </div>
        </div>
        {isBulkDeleteActive && (
          <div className="mb-6 p-4 rounded-lg border-2 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-red-700 dark:text-red-300">
                  {selectedVideos.size === 0
                    ? "Select videos to delete"
                    : selectedVideos.size === 1
                      ? "1 video selected for deletion"
                      : `${selectedVideos.size} videos selected for deletion`}
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Click on videos to select/deselect them
                </p>
              </div>
              <div className="flex gap-3">
                {/* Separate Select All and Deselect All buttons */}
                <button
                  onClick={() => setSelectedVideos(new Set(mediaFiles.map(file => file.id)))}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedVideos(new Set())}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Deselect All
                </button>
                <button
                  onClick={handleCancelBulkDelete}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBulkDelete}
                  disabled={selectedVideos.size === 0}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${selectedVideos.size === 0
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60"
                    : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {mediaFiles.length > 0 && (
          <div className="mb-6 flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search videos by title or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-xl text-base font-medium outline-none transition-all duration-300 shadow-sm ${isDarkTheme
                  ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  ✕
                </button>
              )}
            </div>
            {/* Filter Dropdown */}
            <div className="relative filter-dropdown">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`px-4 py-3 border-2 rounded-xl text-base font-medium flex items-center gap-2 transition-all duration-300 ${isDarkTheme
                  ? 'bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700'
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                </svg>
                Filter
                {filterType && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    {filterType === 'tagged' ? 'Tagged' : 'Untagged'}
                  </span>
                )}
              </button>
              {isFilterOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-lg z-10 ${isDarkTheme
                  ? 'bg-gray-800 border-gray-600'
                  : 'bg-white border-gray-200'
                  }`}>
                  <button
                    onClick={() => handleFilterChange('tagged')}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${filterType === 'tagged'
                      ? isDarkTheme ? 'bg-blue-900 text-blue-100' : 'bg-blue-50 text-blue-700'
                      : isDarkTheme ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
                      </svg>
                      Tagged
                    </div>
                    <div className="text-xs mt-1 opacity-75">Videos with products tagged</div>
                  </button>
                  <button
                    onClick={() => handleFilterChange('untagged')}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${filterType === 'untagged'
                      ? isDarkTheme ? 'bg-blue-900 text-blue-100' : 'bg-blue-50 text-blue-700'
                      : isDarkTheme ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                      Untagged
                    </div>
                    <div className="text-xs mt-1 opacity-75">Videos without products tagged</div>
                  </button>
                  {filterType && (
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleFilterChange(null)}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Clear Filter
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        <VideoGrid
          mediaFiles={currentVideos}
          loading={loading}
          selectedVideos={selectedVideos}
          bulkDeleteMode={isBulkDeleteActive} // This controls checkbox visibility
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
        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-4 flex-wrap">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${currentPage === 1
                ? 'bg-gray-400 text-white cursor-not-allowed opacity-60'
                : 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
                }`}
            >
              ← Previous
            </button>
            {/* Page Numbers */}
            <div className="flex gap-2 items-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-10 px-3 py-2 rounded text-sm font-medium cursor-pointer transition-all duration-300 ${currentPage === page
                      ? 'bg-blue-500 text-white border-blue-500'
                      : `border ${isDarkTheme ? 'bg-transparent text-gray-100 border-gray-600 hover:bg-gray-700' : 'bg-transparent text-gray-900 border-gray-300 hover:bg-gray-100'
                      }`}`}
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
              className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${currentPage === totalPages
                ? 'bg-gray-400 text-white cursor-not-allowed opacity-60'
                : 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
                }`}
            >
              Next →
            </button>
          </div>
        )}
        {/* Results Info */}
        {mediaFiles.length > 0 && (
          <div className={`text-center mt-4 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {startIndex + 1}-
            {Math.min(startIndex + videosPerPage, totalVideos)} of {totalVideos}{" "}
            videos
            {searchTerm && (
              <span>
                {" for "}
                <span className={`font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
                  "{searchTerm}"
                </span>
              </span>
            )}
            {filterType === 'tagged' && (
              <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                Tagged Only
              </span>
            )}
            {filterType === 'untagged' && (
              <span className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                Untagged Only
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
        onToggleProduct={toggleProductSelection}
        onSaveProducts={saveVideoProducts}
        onHideProductsModal={closeProductsModal}
        showDeleteModal={showDeleteModal}
        showBulkDeleteModal={showBulkDeleteModal}
        onDelete={deleteVideo}
        onBulkDelete={bulkDeleteVideos}
        onHideDeleteModal={() =>
          setShowDeleteModal({ show: false, videoId: null, videoTitle: "" })
        }
        onHideBulkDeleteModal={() => {
          setShowBulkDeleteModal(false);
          setIsBulkDeleteActive(false);
          setSelectedVideos(new Set());
        }}
        isDarkTheme={isDarkTheme}
        productsModalOpened={showProductsModal.show}
        closeProductsModal={closeProductsModal}
        onRefreshProducts={refreshProducts}
      />
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
        <VideoPlayerModal
          showVideoPlayer={showVideoPlayer}
          onHide={hideVideoPlayerModal}
          videoData={showVideoPlayer.video}
          isDarkTheme={isDarkTheme}
        />
      )}
      {showHomepageMedia && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`rounded-2xl p-0 max-w-4xl w-full max-h-[90vh] overflow-auto relative ${isDarkTheme ? "bg-gray-800" : "bg-white"
            }`}>
            <button
              onClick={() => setShowHomepageMedia(false)}
              className="absolute top-4 right-4 border w-10 h-10 rounded-full text-xl cursor-pointer"
            >
              ✕
            </button>
            <HomepageMedia setHasMediaChanged={setHasMediaChanged} />
          </div>
        </div>
      )}
      {/* Arrange Media Modal */}
      {showArrangeModal && (
        <ArrangeMediaModal
          showArrangeModal={showArrangeModal}
          onHide={() => setShowArrangeModal(false)}
          mediaFiles={mediaFiles}
          isDarkTheme={isDarkTheme}
          onArrangementSaved={handleArrangementSaved}
        />
      )}
      {showArrangeModal && (
        <ArrangeMediaModal
          showArrangeModal={showArrangeModal}
          onHide={() => setShowArrangeModal(false)}
          mediaFiles={mediaFiles}
          isDarkTheme={isDarkTheme}
          onArrangementSaved={handleArrangementSaved} // This comes from useVideoGallery
        />
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
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out 0.2s both;
        }
      `}</style>
    </VideoGalleryLayout>
  );
}
