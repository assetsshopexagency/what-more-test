// components/videogallerycomponents/hooks/useVideoGallery.js
import { useState } from "react";

export function useVideoGallery() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showHomepageMedia, setShowHomepageMedia] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideos, setSelectedVideos] = useState(new Set());
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState({ show: false, videoId: null, videoTitle: '' });
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showVideoOptions, setShowVideoOptions] = useState({ show: false, video: null, position: { x: 0, y: 0 } });
  const [showProductsModal, setShowProductsModal] = useState({ show: false, video: null });
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState({ show: false, video: null });
  const [productsModalOpened, setProductsModalOpened] = useState(false);

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // Load media files
  const loadMediaFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/media-files');
      const result = await response.json();
      
      if (result.success) {
        setMediaFiles(result.mediaFiles);
      } else {
        console.error('Failed to load media files:', result.error);
        showToast('Failed to load media files', 'error');
      }
    } catch (error) {
      console.error('Error loading media files:', error);
      showToast('Error loading media files', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Toggle video selection for bulk delete
  const toggleVideoSelection = (videoId) => {
    setSelectedVideos(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(videoId)) {
        newSelection.delete(videoId);
      } else {
        newSelection.add(videoId);
      }
      return newSelection;
    });
  };

  // Select all videos
  const selectAllVideos = () => {
    if (selectedVideos.size === mediaFiles.length) {
      setSelectedVideos(new Set());
    } else {
      setSelectedVideos(new Set(mediaFiles.map(file => file.id)));
    }
  };

  // Start editing video title
  const startEditing = (video) => {
    setEditingVideoId(video.id);
    setEditTitle(video.title);
  };

  // Save edited title
  const saveTitle = async (videoId) => {
    if (!editTitle.trim()) {
      showToast('Title cannot be empty', 'error');
      return;
    }

    try {
      const response = await fetch(`/api/media-files/${videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editTitle.trim() }),
      });

      const result = await response.json();

      if (result.success) {
        setMediaFiles(prev => 
          prev.map(file => 
            file.id === videoId ? { ...file, title: editTitle.trim() } : file
          )
        );
        setEditingVideoId(null);
        setEditTitle('');
        showToast('Video title updated successfully');
      } else {
        showToast('Failed to update title: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Update error:', error);
      showToast('Failed to update title', 'error');
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingVideoId(null);
    setEditTitle('');
  };

  // Show delete confirmation modal
  const showDeleteConfirmation = (videoId, videoTitle) => {
    setShowDeleteModal({ show: true, videoId, videoTitle });
  };

  // Delete single video
  const deleteVideo = async (videoId) => {
    try {
      const response = await fetch(`/api/media-files/${videoId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setMediaFiles(prev => prev.filter(file => file.id !== videoId));
        setSelectedVideos(prev => {
          const newSelection = new Set(prev);
          newSelection.delete(videoId);
          return newSelection;
        });
        setShowDeleteModal({ show: false, videoId: null, videoTitle: '' });
        showToast('Video deleted successfully');
      } else {
        showToast('Failed to delete video: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showToast('Failed to delete video', 'error');
    }
  };

  // Show bulk delete confirmation
  const showBulkDeleteConfirmation = () => {
    if (selectedVideos.size === 0) {
      showToast('Please select videos to delete', 'error');
      return;
    }
    setShowBulkDeleteModal(true);
  };

  // Bulk delete videos
  const bulkDeleteVideos = async () => {
    try {
      const response = await fetch('/api/media-files/bulk-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoIds: Array.from(selectedVideos) }),
      });

      const result = await response.json();

      if (result.success) {
        setMediaFiles(prev => prev.filter(file => !selectedVideos.has(file.id)));
        setSelectedVideos(new Set());
        setBulkDeleteMode(false);
        setShowBulkDeleteModal(false);
        showToast(`${selectedVideos.size} videos deleted successfully`);
      } else {
        showToast('Failed to delete videos: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Bulk delete error:', error);
      showToast('Failed to delete videos', 'error');
    }
  };

  // Show video options menu
  const showVideoOptionsMenu = (video, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setShowVideoOptions({
      show: true,
      video,
      position: { x: rect.left, y: rect.top + rect.height }
    });
  };

  // Hide video options menu
  const hideVideoOptionsMenu = () => {
    setShowVideoOptions({ show: false, video: null, position: { x: 0, y: 0 } });
  };

  // Copy video URL
  const copyVideoUrl = (url) => {
    navigator.clipboard.writeText(url);
    showToast('Video URL copied to clipboard');
    hideVideoOptionsMenu();
  };

  // Download video
  const downloadVideo = async (video) => {
    try {
      const response = await fetch(video.shopify_file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = video.title || 'video.mp4';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('Video download started');
    } catch (error) {
      showToast('Failed to download video', 'error');
    }
    hideVideoOptionsMenu();
  };

  // FIXED: Load products for a video - works for both VideoOptionsModal and TagProductsModal
  const loadProductsForVideo = async (video) => {
    try {
      setLoadingProducts(true);
      setProductsModalOpened(true);
      
      console.log('🔄 Loading products for video:', video.id);
      
      // Load products from Shopify
      const response = await fetch('/api/products');
      console.log('📡 Products API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Products API HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('📦 Products API result:', result);
      
      if (result.success) {
        const transformedProducts = result.products.map(product => ({
          id: product.id,
          title: product.title,
          price: product.variants?.[0]?.price || '0.00',
          image_url: product.image?.src || null
        }));
        
        setProducts(transformedProducts);
        console.log('✅ Loaded products:', transformedProducts.length);
        
        // Load saved products for this video
        try {
          const videoProductsResponse = await fetch(`/api/video-products/${video.id}`);
          console.log('📡 Video products API response status:', videoProductsResponse.status);
          
          if (videoProductsResponse.ok) {
            const videoProductsResult = await videoProductsResponse.json();
            console.log('💾 Video products result:', videoProductsResult);
            
            if (videoProductsResult.success) {
              // Map the saved products to use Shopify product IDs
              const savedShopifyProductIds = videoProductsResult.products.map(p => p.shopify_product_id || p.id);
              setSelectedProducts(new Set(savedShopifyProductIds));
              console.log('✅ Loaded saved products:', videoProductsResult.products.length);
            }
          } else {
            console.log('⚠️ Video products API returned error status:', videoProductsResponse.status);
          }
        } catch (error) {
          console.log('⚠️ Could not load saved products:', error.message);
        }
        
        // Set modal to show after products are loaded
        setShowProductsModal({ show: true, video });
        
      } else {
        throw new Error(result.error || 'Failed to load products');
      }
      
    } catch (error) {
      console.error('💥 Error loading products:', error);
      showToast('Error loading products: ' + error.message, 'error');
      setProductsModalOpened(false);
    } finally {
      setLoadingProducts(false);
    }
    
    // Only hide VideoOptionsMenu if it's coming from VideoOptionsModal
    // Don't hide TagProductsModal when loading products
    if (showVideoOptions.show) {
      hideVideoOptionsMenu();
    }
  };

  // Toggle product selection
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(productId)) {
        newSelection.delete(productId);
      } else {
        newSelection.add(productId);
      }
      return newSelection;
    });
  };

  // FIXED: Save selected products for video
  const saveVideoProducts = async () => {
    if (!showProductsModal.video?.id) {
      console.error('❌ No video selected for saving products');
      showToast('No video selected', 'error');
      return;
    }

    try {
      console.log('🔄 Saving products for video:', showProductsModal.video.id);
      console.log('📦 Selected products:', Array.from(selectedProducts));
      
      const response = await fetch(`/api/video-products/${showProductsModal.video.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          productIds: Array.from(selectedProducts) 
        }),
      });

      console.log('📡 Save API response status:', response.status);
      
      const result = await response.json();
      console.log('📄 Save API result:', result);

      if (!response.ok) {
        const errorMessage = result.error || `HTTP ${response.status}: ${response.statusText}`;
        console.error('❌ Server error:', errorMessage);
        throw new Error(errorMessage);
      }

      if (result.success) {
        showToast('Products saved successfully');
        setShowProductsModal({ show: false, video: null });
        setProductsModalOpened(false);
        setSelectedProducts(new Set());
        loadMediaFiles();
        console.log('✅ Products saved successfully!');
        
        // Refresh the VideoOptionsModal by re-fetching saved products
        if (showVideoOptions.show && showVideoOptions.video?.id === showProductsModal.video.id) {
          // This will trigger the VideoOptionsModal to refresh its saved products list
          setShowVideoOptions(prev => ({ ...prev }));
        }
      } else {
        throw new Error(result.error || 'Failed to save products');
      }
      
    } catch (error) {
      console.error('💥 Error saving products:', error);
      
      // Show more detailed error message
      let errorMessage = 'Error saving products';
      if (error.message.includes('Shopify not configured')) {
        errorMessage = 'Shopify session issue - please refresh the page';
      } else if (error.message.includes('Prisma')) {
        errorMessage = 'Database error - please check server logs';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error - please check server logs';
      } else {
        errorMessage = error.message;
      }
      
      showToast(errorMessage, 'error');
    }
  };

  // NEW: Function to close products modal without saving
  const closeProductsModal = () => {
    setShowProductsModal({ show: false, video: null });
    setProductsModalOpened(false);
  };

  // Show video player modal
  const showVideoPlayerModal = (video) => {
    setShowVideoPlayer({
      show: true,
      video: video
    });
  };

  // Hide video player modal
  const hideVideoPlayerModal = () => {
    setShowVideoPlayer({
      show: false,
      video: null
    });
  };

  return {
    // State
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
    showVideoOptions,
    showProductsModal,
    products,
    selectedProducts,
    loadingProducts,
    showVideoPlayer,
    productsModalOpened,
    
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
    setProductsModalOpened,
    
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
    showVideoOptionsMenu,
    hideVideoOptionsMenu,
    copyVideoUrl,
    downloadVideo,
    loadProductsForVideo,
    toggleProductSelection,
    saveVideoProducts,
    showVideoPlayerModal,
    hideVideoPlayerModal,
    closeProductsModal
  };
}