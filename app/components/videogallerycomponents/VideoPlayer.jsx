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
  productRefreshTrigger,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const videoSrc = file.videoUrl || file.shopify_file_url;

  useEffect(() => {
    if (file?.id) {
      fetchSavedProducts();
    }
  }, [file?.id]);

  useEffect(() => {
    if (productRefreshTrigger > 0 && file?.id) {
      fetchSavedProducts();
    }
  }, [productRefreshTrigger, file?.id]);

  const fetchSavedProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const response = await fetch(`/api/video-products/${file.id}`);
      const result = await response.json();

      if (result.success) {
        setSavedProducts(result.products || []);
      } else {
        setSavedProducts([]);
      }
    } catch (error) {
      console.error("Error fetching saved products:", error);
      setSavedProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
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

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditMenu(!showEditMenu);
  };

  const handleViewFullVideo = (e) => {
    e.stopPropagation();
    if (onViewFullVideo) onViewFullVideo(file);
    setShowEditMenu(false);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    if (onCopyLink) onCopyLink(file.shopify_file_url);
    setShowEditMenu(false);
  };

  const handleTagProducts = (e) => {
    e.stopPropagation();
    if (onTagProducts) onTagProducts(file, e);
    setShowEditMenu(false);
  };

  const renderProductImages = () => {
    if (isLoadingProducts)
      return (
        <div className="flex items-center justify-center text-white text-xs">
          Loading...
        </div>
      );

    if (savedProducts.length === 0)
      return (
        <div className="flex items-center justify-center text-white text-sm font-medium">
          Tag Products
        </div>
      );

    const productsToShow = savedProducts.slice(0, 3);

    return (
      <div className="flex items-center justify-center gap-1">
        {productsToShow.map((product, index) => (
          <div
            key={product.video_product_id || product.id}
            className="w-5 h-5 rounded border border-white/30 overflow-hidden relative"
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                P
              </div>
            )}
          </div>
        ))}
        {savedProducts.length > 3 && (
          <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center text-white text-xs font-bold">
            +{savedProducts.length - 3}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="relative overflow-hidden mx-auto transition-all duration-300 ease-in-out"
      style={{
        background: theme.cardBackground,
        border: theme.border,
        boxShadow: theme.shadow,
        animation: `fadeIn 0.6s ease-out ${0.3 + index * 0.1}s both`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main container with rounded corners and dimensions */}
      <div className="bg-cardBackground rounded-xl w-40 h-80 relative overflow-hidden">
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
            className="absolute top-2 right-2 bg-black/60 border-none rounded text-white px-2.5 py-1.5 text-xs font-medium cursor-pointer z-10 backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-black/80"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png"
              alt="Edit"
              className="w-3 h-3 invert"
            />
          </button>
        )}

        {/* Edit Menu Dropdown */}
        {showEditMenu && !bulkDeleteMode && (
          <div className="absolute top-10 right-2 bg-black/80 rounded-lg p-2 z-20 backdrop-blur-md border border-white/20 min-w-[150px]">
            <button
              onClick={handleViewFullVideo}
              className="w-full bg-transparent border-none text-white px-3 py-2 rounded text-xs cursor-pointer text-left flex items-center gap-2 transition-colors duration-200 ease-in-out hover:bg-white/10"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991937.png"
                alt="Video"
                className="w-3.5 h-3.5 invert"
              />
              View Full Video
            </button>
            <button
              onClick={handleCopyLink}
              className="w-full bg-transparent border-none text-white px-3 py-2 rounded text-xs cursor-pointer text-left flex items-center gap-2 transition-colors duration-200 ease-in-out hover:bg-white/10"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="Copy Link"
                className="w-3.5 h-3.5 invert"
              />
              Copy Link
            </button>
            <button
              onClick={handleTagProducts}
              className="w-full bg-transparent border-none text-white px-3 py-2 rounded text-xs cursor-pointer text-left flex items-center gap-2 transition-colors duration-200 ease-in-out hover:bg-white/10"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3917/3917759.png"
                alt="Tag Products"
                className="w-3.5 h-3.5 invert"
              />
              Tag Products
            </button>
          </div>
        )}

        {/* Video Player */}
        <div className="relative w-full h-full">
          {videoError ? (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-mutedText flex-col gap-2">
              <div className="text-2xl">Video unavailable</div>
              <button
                onClick={() => {
                  setVideoError(false);
                  if (videoRef.current) videoRef.current.load();
                }}
                className="bg-blue-500 text-white border-none px-2 py-1 rounded text-xs cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover cursor-pointer block"
              onClick={handleVideoClick}
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
            className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 border-none rounded text-white font-medium cursor-pointer z-10 backdrop-blur-sm transition-all duration-300 ease-in-out whitespace-nowrap hover:bg-black/80 hover:scale-105 ${
              savedProducts.length > 0
                ? "px-3 py-1.5 text-[0px] min-h-8"
                : "px-4 py-2 text-sm min-w-[100px]"
            }`}
          >
            {renderProductImages()}
          </button>
        )}
      </div>
    </div>
  );
}
