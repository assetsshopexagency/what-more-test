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

  // Load products for a video
  const loadProductsForVideo = async (video) => {
    try {
      setLoadingProducts(true);
      setShowProductsModal({ show: true, video });
      
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        const transformedProducts = result.products.map(product => ({
          id: product.id,
          title: product.title,
          price: product.variants?.[0]?.price || '0.00',
          image_url: product.image?.src || null
        }));
        
        setProducts(transformedProducts);
        
        const videoProductsResponse = await fetch(`/api/video-products/${video.id}`);
        const videoProductsResult = await videoProductsResponse.json();
        
        if (videoProductsResult.success) {
          setSelectedProducts(new Set(videoProductsResult.products.map(p => p.id)));
        }
      } else {
        showToast('Failed to load products', 'error');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      showToast('Error loading products', 'error');
    } finally {
      setLoadingProducts(false);
    }
    hideVideoOptionsMenu();
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

  // Save selected products for video
  const saveVideoProducts = async () => {
    try {
      const response = await fetch(`/api/video-products/${showProductsModal.video.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          productIds: Array.from(selectedProducts) 
        }),
      });

      const result = await response.json();

      if (result.success) {
        showToast('Products saved successfully');
        setShowProductsModal({ show: false, video: null });
        setSelectedProducts(new Set());
        loadMediaFiles();
      } else {
        showToast('Failed to save products: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Error saving products:', error);
      showToast('Error saving products', 'error');
    }
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
    showVideoOptionsMenu,
    hideVideoOptionsMenu,
    copyVideoUrl,
    downloadVideo,
    loadProductsForVideo,
    toggleProductSelection,
    saveVideoProducts,
    showVideoPlayerModal,
    hideVideoPlayerModal
  };
}