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
    console.log(
      "🔄 TagProductsModal closing, refreshing products for video:",
      showTagProductsModal.video?.id,
    );
    setShowTagProductsModal({ show: false, video: null });
    setProductRefreshTrigger((prev) => prev + 1);
  };

  // Function to fetch products for a specific video
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

  // Enhanced search function that searches both video titles and product names
  const filteredMediaFiles = mediaFiles.filter((file) => {
    if (!searchTerm.trim()) return true;

    const searchLower = searchTerm.toLowerCase();

    // Search in video title
    const titleMatch = file.title.toLowerCase().includes(searchLower);

    // Search in product names for this video
    const videoProducts = videoProductsMap[file.id] || [];
    const productMatch = videoProducts.some((product) =>
      product.title.toLowerCase().includes(searchLower),
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

  // Effects
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
    if (!showHomepageMedia) loadMediaFiles();
  }, [showHomepageMedia]);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Fetch products for all videos when mediaFiles load
  useEffect(() => {
    if (mediaFiles.length > 0) {
      mediaFiles.forEach((video) => {
        fetchVideoProducts(video.id);
      });
    }
  }, [mediaFiles]);

  // Refresh video products when productRefreshTrigger changes
  useEffect(() => {
    if (productRefreshTrigger > 0 && mediaFiles.length > 0) {
      mediaFiles.forEach((video) => {
        fetchVideoProducts(video.id);
      });
    }
  }, [productRefreshTrigger]);

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
          onCancel={() => {
            setBulkDeleteMode(false);
            setSelectedVideos(new Set());
          }}
        />
      )}

      {/* Uploaded Media Section */}
      <div className="bg-card-light dark:bg-card-dark rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg mb-8 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            📁 Your Uploaded Media
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm ml-2">
              {mediaFiles.length}
            </span>
          </h2>
          <div className="flex gap-4">
            {mediaFiles.length > 0 && (
              <button
                onClick={() => setBulkDeleteMode(!bulkDeleteMode)}
                className={`px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 ${
                  bulkDeleteMode
                    ? "bg-gray-500 text-white"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                {bulkDeleteMode ? "✕ Cancel Bulk Delete" : "🗑️ Bulk Delete"}
              </button>
            )}
            <button
              onClick={() => setShowHomepageMedia(true)}
              className="bg-success text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-green-700"
            >
              📤 Upload New Media
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {mediaFiles.length > 0 && (
          <div className="mb-6 max-w-md">
            <input
              type="text"
              placeholder="Search videos by title or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
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
          <div className="flex justify-center items-center mt-8 gap-4 flex-wrap">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-400 text-white cursor-not-allowed opacity-60"
                  : "bg-primary text-white hover:bg-blue-700 cursor-pointer"
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
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 min-w-10 ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "bg-transparent text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
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
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-400 text-white cursor-not-allowed opacity-60"
                  : "bg-primary text-white hover:bg-blue-700 cursor-pointer"
              }`}
            >
              Next →
            </button>
          </div>
        )}

        {/* Results Info */}
        {mediaFiles.length > 0 && (
          <div className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm">
            Showing {startIndex + 1}-
            {Math.min(startIndex + videosPerPage, totalVideos)} of {totalVideos}{" "}
            videos
            {searchTerm && (
              <span>
                {" for "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  "{searchTerm}"
                </span>
                {filteredMediaFiles.some((file) => {
                  const videoProducts = videoProductsMap[file.id] || [];
                  return videoProducts.some((product) =>
                    product.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  );
                }) && (
                  <span className="ml-2 bg-success text-white px-2 py-1 rounded text-xs">
                    Includes product matches
                  </span>
                )}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
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

      {/* Video Player Modal */}
      {showVideoPlayer?.show && showVideoPlayer.video && (
        <VideoPlayerModal
          showVideoPlayer={showVideoPlayer}
          onHide={hideVideoPlayerModal}
          videoData={showVideoPlayer.video}
          isDarkTheme={isDarkTheme}
        />
      )}

      {/* Homepage Media Modal */}
      {showHomepageMedia && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setShowHomepageMedia(false)}
              className="absolute top-4 right-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-10 h-10 rounded-full text-xl cursor-pointer text-gray-600 dark:text-gray-400 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
            >
              ✕
            </button>
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
