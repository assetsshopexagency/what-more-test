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
  productRefreshTrigger
}) {
  const videoRef = useRef(null);
  const menuRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0); // Local refresh counter
  const videoSrc = file.videoUrl || file.shopify_file_url;

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        const menuButton = document.querySelector(`[data-video-id="${file.id}"]`);
        if (menuButton && !menuButton.contains(event.target)) {
          setShowEditMenu(false);
        }
      }
    };
    if (showEditMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEditMenu, file.id]);

  // Fetch saved products - now depends on both productRefreshTrigger and refreshCounter
  useEffect(() => {
    if (file?.id) {
      fetchSavedProducts();
    }
  }, [file?.id, productRefreshTrigger, refreshCounter]);

  // Function to refresh this component
  const refreshComponent = () => {
    setRefreshCounter(prev => prev + 1);
  };

  // Expose refresh function to parent via callback
  useEffect(() => {
    // If there's a callback to register refresh function, call it
    // This would need to be set up by the parent component
  }, []);

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
      console.error('Error fetching saved products:', error);
      setSavedProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      if (isHovered) {
        videoRef.current.play().catch(() => { });
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
    if (onViewFullVideo) {
      onViewFullVideo(file);
    } else {
      window.open(videoSrc, '_blank');
    }
    setShowEditMenu(false);
  };

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    try {
      if (onCopyLink) {
        onCopyLink(file.shopify_file_url || videoSrc);
      } else {
        await navigator.clipboard.writeText(file.shopify_file_url || videoSrc);
        console.log('Video URL copied to clipboard');
      }
    } catch (error) {
      console.error('Failed to copy link:', error);
      const textArea = document.createElement('textarea');
      textArea.value = file.shopify_file_url || videoSrc;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      console.log('Video URL copied to clipboard (fallback)');
    }
    setShowEditMenu(false);
  };

  const handleTagProducts = (e) => {
    e.stopPropagation();
    if (onTagProducts) onTagProducts(file, e);
    setShowEditMenu(false);
    // Refresh after tagging products
    refreshComponent();
  };

  // Simple SVG icons
  const Icons = {
    menu: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="6" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="18" r="1.5" />
      </svg>
    ),
    video: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
    link: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
      </svg>
    ),
    tag: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
      </svg>
    ),
    product: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zm-2.99-3.9l1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52L9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zm-4.45-.16c-.26-.33-.36-.75-.25-1.17l1.05-4.37 1.94.01-.54 4.86c-.07.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.94-.47h-.05zM5 19v-6.03c.08.01.15.03.23.03h13.54c.08 0 .15-.02.23-.03V19H5z" />
      </svg>
    )
  };

  const renderProductImages = () => {
    if (isLoadingProducts) return <div className="text-white text-xs">Loading...</div>;
    if (savedProducts.length === 0) return <div className="text-white text-sm font-medium">Tag Products</div>;
    const productsToShow = savedProducts.slice(0, 3);
    return (
      <div className="flex items-center justify-center gap-1">
        {productsToShow.map((product, index) => (
          <div key={product.video_product_id || product.id} className="w-5 h-5 rounded border border-white border-opacity-30 overflow-hidden">
            {product.image_url ? (
              <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {Icons.product}
              </div>
            )}
          </div>
        ))}
        {savedProducts.length > 3 && (
          <div className="w-5 h-5 bg-white bg-opacity-20 rounded flex items-center justify-center text-white text-xs font-bold">
            +{savedProducts.length - 3}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg transition-all duration-300 animate-fade-in relative overflow-hidden w-40 h-80 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CHECKBOX - Only shows when bulkDeleteMode is true */}
      {bulkDeleteMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="absolute top-2 left-2 z-10 w-5 h-5 rounded border-2 border-white bg-black bg-opacity-50 cursor-pointer checked:bg-green-500 checked:border-green-500"
        />
      )}

      {!bulkDeleteMode && (
        <button
          onClick={handleEditClick}
          data-video-id={file.id}
          className="absolute top-2 right-2 bg-black bg-opacity-60 border-none rounded text-white p-1.5 text-xs font-medium cursor-pointer z-10 backdrop-blur-sm flex items-center justify-center w-6 h-6"
        >
          {Icons.menu}
        </button>
      )}

      {showEditMenu && !bulkDeleteMode && (
        <div
          ref={menuRef}
          className="absolute top-10 right-2 bg-black bg-opacity-90 rounded-lg p-2 z-20 backdrop-blur-lg border border-white border-opacity-20 min-w-[140px]"
        >
          <button
            onClick={handleViewFullVideo}
            className="w-full bg-transparent border-none text-white px-3 py-2 rounded text-xs cursor-pointer text-left flex items-center gap-2 transition-all duration-200 hover:bg-white hover:bg-opacity-10"
          >
            {Icons.video}
            View Full Video
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full bg-transparent border-none text-white px-3 py-2 rounded text-xs cursor-pointer text-left flex items-center gap-2 transition-all duration-200 hover:bg-white hover:bg-opacity-10"
          >
            {Icons.link}
            Copy Link
          </button>
          <button
            onClick={handleTagProducts}
            className="w-full bg-transparent border-none text-white px-3 py-2 rounded text-xs cursor-pointer text-left flex items-center gap-2 transition-all duration-200 hover:bg-white hover:bg-opacity-10"
          >
            {Icons.tag}
            Tag Products
          </button>
        </div>
      )}

      <div className="relative w-full h-full">
        {videoError ? (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 flex-col gap-2">
            <div className="text-2xl">🎬</div>
            <div>Video unavailable</div>
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
            onError={() => setVideoError(true)}
          />
        )}
      </div>

      {!bulkDeleteMode && (
        <button
          onClick={handleTagProducts}
          className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 border-none rounded text-white ${savedProducts.length > 0 ? 'px-3 py-1.5' : 'px-4 py-2'
            } text-sm font-medium cursor-pointer z-10 backdrop-blur-sm transition-all duration-200 hover:bg-black hover:bg-opacity-80 min-w-${savedProducts.length > 0 ? 'auto' : '24'
            } min-h-${savedProducts.length > 0 ? '8' : 'auto'}`}
        >
          {renderProductImages()}
        </button>
      )}
    </div>
  );
}
