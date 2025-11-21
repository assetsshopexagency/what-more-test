// // // // // // // app/routes/app.video-gallery.jsx
// // // // // // import { Link } from "react-router";
// // // // // // import { useState, useEffect, useRef } from "react";
// // // // // // import HomepageMedia from "../components/videogallerycomponents/homepage-media.jsx";

// // // // // // // Loader function required by React Router
// // // // // // export async function loader({ request }) {
// // // // // //   return { 
// // // // // //     message: "Video Gallery Loaded",
// // // // // //     timestamp: new Date().toISOString()
// // // // // //   };
// // // // // // }

// // // // // // export default function VideoGallery() {
// // // // // //   const [isDarkTheme, setIsDarkTheme] = useState(false);
// // // // // //   const [showHomepageMedia, setShowHomepageMedia] = useState(false);
// // // // // //   const [mediaFiles, setMediaFiles] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [selectedVideos, setSelectedVideos] = useState(new Set());
// // // // // //   const [bulkDeleteMode, setBulkDeleteMode] = useState(false);
// // // // // //   const [toast, setToast] = useState({ show: false, message: '', type: '' });
// // // // // //   const [editingVideoId, setEditingVideoId] = useState(null);
// // // // // //   const [editTitle, setEditTitle] = useState('');
// // // // // //   const [showDeleteModal, setShowDeleteModal] = useState({ show: false, videoId: null, videoTitle: '' });
// // // // // //   const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
// // // // // //   const [showVideoOptions, setShowVideoOptions] = useState({ show: false, video: null, position: { x: 0, y: 0 } });
// // // // // //   const [showProductsModal, setShowProductsModal] = useState({ show: false, video: null });
// // // // // //   const [products, setProducts] = useState([]);
// // // // // //   const [selectedProducts, setSelectedProducts] = useState(new Set());
// // // // // //   const [loadingProducts, setLoadingProducts] = useState(false);

// // // // // //   // Show toast message
// // // // // //   const showToast = (message, type = 'success') => {
// // // // // //     setToast({ show: true, message, type });
// // // // // //     setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
// // // // // //   };

// // // // // //   // Detect theme from document
// // // // // //   useEffect(() => {
// // // // // //     const checkTheme = () => {
// // // // // //       setIsDarkTheme(document.documentElement.classList.contains('dark'));
// // // // // //     };

// // // // // //     checkTheme();
    
// // // // // //     const observer = new MutationObserver(checkTheme);
// // // // // //     observer.observe(document.documentElement, {
// // // // // //       attributes: true,
// // // // // //       attributeFilter: ['class']
// // // // // //     });

// // // // // //     return () => observer.disconnect();
// // // // // //   }, []);

// // // // // //   // Load media files on component mount
// // // // // //   useEffect(() => {
// // // // // //     loadMediaFiles();
// // // // // //   }, []);

// // // // // //   const loadMediaFiles = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const response = await fetch('/api/media-files');
// // // // // //       const result = await response.json();
      
// // // // // //       if (result.success) {
// // // // // //         setMediaFiles(result.mediaFiles);
// // // // // //       } else {
// // // // // //         console.error('Failed to load media files:', result.error);
// // // // // //         showToast('Failed to load media files', 'error');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error loading media files:', error);
// // // // // //       showToast('Error loading media files', 'error');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Refresh media files when upload modal closes
// // // // // //   useEffect(() => {
// // // // // //     if (!showHomepageMedia) {
// // // // // //       loadMediaFiles();
// // // // // //     }
// // // // // //   }, [showHomepageMedia]);

// // // // // //   // Toggle video selection for bulk delete
// // // // // //   const toggleVideoSelection = (videoId) => {
// // // // // //     setSelectedVideos(prev => {
// // // // // //       const newSelection = new Set(prev);
// // // // // //       if (newSelection.has(videoId)) {
// // // // // //         newSelection.delete(videoId);
// // // // // //       } else {
// // // // // //         newSelection.add(videoId);
// // // // // //       }
// // // // // //       return newSelection;
// // // // // //     });
// // // // // //   };

// // // // // //   // Select all videos
// // // // // //   const selectAllVideos = () => {
// // // // // //     if (selectedVideos.size === mediaFiles.length) {
// // // // // //       setSelectedVideos(new Set());
// // // // // //     } else {
// // // // // //       setSelectedVideos(new Set(mediaFiles.map(file => file.id)));
// // // // // //     }
// // // // // //   };

// // // // // //   // Start editing video title
// // // // // //   const startEditing = (video) => {
// // // // // //     setEditingVideoId(video.id);
// // // // // //     setEditTitle(video.title);
// // // // // //   };

// // // // // //   // Save edited title
// // // // // //   const saveTitle = async (videoId) => {
// // // // // //     if (!editTitle.trim()) {
// // // // // //       showToast('Title cannot be empty', 'error');
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       const response = await fetch(`/api/media-files/${videoId}`, {
// // // // // //         method: 'PUT',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //         body: JSON.stringify({ title: editTitle.trim() }),
// // // // // //       });

// // // // // //       const result = await response.json();

// // // // // //       if (result.success) {
// // // // // //         setMediaFiles(prev => 
// // // // // //           prev.map(file => 
// // // // // //             file.id === videoId ? { ...file, title: editTitle.trim() } : file
// // // // // //           )
// // // // // //         );
// // // // // //         setEditingVideoId(null);
// // // // // //         setEditTitle('');
// // // // // //         showToast('Video title updated successfully');
// // // // // //       } else {
// // // // // //         showToast('Failed to update title: ' + result.error, 'error');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Update error:', error);
// // // // // //       showToast('Failed to update title', 'error');
// // // // // //     }
// // // // // //   };

// // // // // //   // Cancel editing
// // // // // //   const cancelEditing = () => {
// // // // // //     setEditingVideoId(null);
// // // // // //     setEditTitle('');
// // // // // //   };

// // // // // //   // Show delete confirmation modal
// // // // // //   const showDeleteConfirmation = (videoId, videoTitle) => {
// // // // // //     setShowDeleteModal({ show: true, videoId, videoTitle });
// // // // // //   };

// // // // // //   // Delete single video
// // // // // //   const deleteVideo = async (videoId) => {
// // // // // //     try {
// // // // // //       const response = await fetch(`/api/media-files/${videoId}`, {
// // // // // //         method: 'DELETE',
// // // // // //       });

// // // // // //       const result = await response.json();

// // // // // //       if (result.success) {
// // // // // //         setMediaFiles(prev => prev.filter(file => file.id !== videoId));
// // // // // //         setSelectedVideos(prev => {
// // // // // //           const newSelection = new Set(prev);
// // // // // //           newSelection.delete(videoId);
// // // // // //           return newSelection;
// // // // // //         });
// // // // // //         setShowDeleteModal({ show: false, videoId: null, videoTitle: '' });
// // // // // //         showToast('Video deleted successfully');
// // // // // //       } else {
// // // // // //         showToast('Failed to delete video: ' + result.error, 'error');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Delete error:', error);
// // // // // //       showToast('Failed to delete video', 'error');
// // // // // //     }
// // // // // //   };

// // // // // //   // Show bulk delete confirmation
// // // // // //   const showBulkDeleteConfirmation = () => {
// // // // // //     if (selectedVideos.size === 0) {
// // // // // //       showToast('Please select videos to delete', 'error');
// // // // // //       return;
// // // // // //     }
// // // // // //     setShowBulkDeleteModal(true);
// // // // // //   };

// // // // // //   // Bulk delete videos
// // // // // //   const bulkDeleteVideos = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch('/api/media-files/bulk-delete', {
// // // // // //         method: 'DELETE',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //         body: JSON.stringify({ videoIds: Array.from(selectedVideos) }),
// // // // // //       });

// // // // // //       const result = await response.json();

// // // // // //       if (result.success) {
// // // // // //         setMediaFiles(prev => prev.filter(file => !selectedVideos.has(file.id)));
// // // // // //         setSelectedVideos(new Set());
// // // // // //         setBulkDeleteMode(false);
// // // // // //         setShowBulkDeleteModal(false);
// // // // // //         showToast(`${selectedVideos.size} videos deleted successfully`);
// // // // // //       } else {
// // // // // //         showToast('Failed to delete videos: ' + result.error, 'error');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Bulk delete error:', error);
// // // // // //       showToast('Failed to delete videos', 'error');
// // // // // //     }
// // // // // //   };

// // // // // //   // Show video options menu
// // // // // //   const showVideoOptionsMenu = (video, event) => {
// // // // // //     event.stopPropagation();
// // // // // //     const rect = event.currentTarget.getBoundingClientRect();
// // // // // //     setShowVideoOptions({
// // // // // //       show: true,
// // // // // //       video,
// // // // // //       position: { x: rect.left, y: rect.top + rect.height }
// // // // // //     });
// // // // // //   };

// // // // // //   // Hide video options menu
// // // // // //   const hideVideoOptionsMenu = () => {
// // // // // //     setShowVideoOptions({ show: false, video: null, position: { x: 0, y: 0 } });
// // // // // //   };

// // // // // //   // Copy video URL
// // // // // //   const copyVideoUrl = (url) => {
// // // // // //     navigator.clipboard.writeText(url);
// // // // // //     showToast('Video URL copied to clipboard');
// // // // // //     hideVideoOptionsMenu();
// // // // // //   };

// // // // // //   // Download video
// // // // // //   const downloadVideo = async (video) => {
// // // // // //     try {
// // // // // //       const response = await fetch(video.shopify_file_url);
// // // // // //       const blob = await response.blob();
// // // // // //       const url = window.URL.createObjectURL(blob);
// // // // // //       const a = document.createElement('a');
// // // // // //       a.href = url;
// // // // // //       a.download = video.title || 'video.mp4';
// // // // // //       document.body.appendChild(a);
// // // // // //       a.click();
// // // // // //       window.URL.revokeObjectURL(url);
// // // // // //       document.body.removeChild(a);
// // // // // //       showToast('Video download started');
// // // // // //     } catch (error) {
// // // // // //       showToast('Failed to download video', 'error');
// // // // // //     }
// // // // // //     hideVideoOptionsMenu();
// // // // // //   };

// // // // // //   // Load products for a video using your existing API
// // // // // //   const loadProductsForVideo = async (video) => {
// // // // // //     try {
// // // // // //       setLoadingProducts(true);
// // // // // //       setShowProductsModal({ show: true, video });
      
// // // // // //       // Use your existing products API
// // // // // //       const response = await fetch('/api/products');
// // // // // //       const result = await response.json();
      
// // // // // //       if (result.success) {
// // // // // //         // Transform products to match the expected format
// // // // // //         const transformedProducts = result.products.map(product => ({
// // // // // //           id: product.id,
// // // // // //           title: product.title,
// // // // // //           price: product.variants?.[0]?.price || '0.00',
// // // // // //           image_url: product.image?.src || null
// // // // // //         }));
        
// // // // // //         setProducts(transformedProducts);
        
// // // // // //         // Load already selected products for this video
// // // // // //         const videoProductsResponse = await fetch(`/api/video-products/${video.id}`);
// // // // // //         const videoProductsResult = await videoProductsResponse.json();
        
// // // // // //         if (videoProductsResult.success) {
// // // // // //           setSelectedProducts(new Set(videoProductsResult.products.map(p => p.id)));
// // // // // //         }
// // // // // //       } else {
// // // // // //         showToast('Failed to load products', 'error');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error loading products:', error);
// // // // // //       showToast('Error loading products', 'error');
// // // // // //     } finally {
// // // // // //       setLoadingProducts(false);
// // // // // //     }
// // // // // //     hideVideoOptionsMenu();
// // // // // //   };

// // // // // //   // Toggle product selection
// // // // // //   const toggleProductSelection = (productId) => {
// // // // // //     setSelectedProducts(prev => {
// // // // // //       const newSelection = new Set(prev);
// // // // // //       if (newSelection.has(productId)) {
// // // // // //         newSelection.delete(productId);
// // // // // //       } else {
// // // // // //         newSelection.add(productId);
// // // // // //       }
// // // // // //       return newSelection;
// // // // // //     });
// // // // // //   };

// // // // // //   // Save selected products for video
// // // // // //   const saveVideoProducts = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch(`/api/video-products/${showProductsModal.video.id}`, {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //         body: JSON.stringify({ 
// // // // // //           productIds: Array.from(selectedProducts) 
// // // // // //         }),
// // // // // //       });

// // // // // //       const result = await response.json();

// // // // // //       if (result.success) {
// // // // // //         showToast('Products saved successfully');
// // // // // //         setShowProductsModal({ show: false, video: null });
// // // // // //         setSelectedProducts(new Set());
        
// // // // // //         // Update the media files to show associated products
// // // // // //         loadMediaFiles();
// // // // // //       } else {
// // // // // //         showToast('Failed to save products: ' + result.error, 'error');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error saving products:', error);
// // // // // //       showToast('Error saving products', 'error');
// // // // // //     }
// // // // // //   };

// // // // // //   // Theme-based styles
// // // // // //   const themeStyles = {
// // // // // //     light: {
// // // // // //       background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// // // // // //       cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// // // // // //       text: '#1f2937',
// // // // // //       mutedText: '#6b7280',
// // // // // //       border: '1px solid #e2e8f0',
// // // // // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
// // // // // //       inputBackground: 'white'
// // // // // //     },
// // // // // //     dark: {
// // // // // //       background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
// // // // // //       cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
// // // // // //       text: '#f8fafc',
// // // // // //       mutedText: '#94a3b8',
// // // // // //       border: '1px solid #475569',
// // // // // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
// // // // // //       inputBackground: '#374151'
// // // // // //     }
// // // // // //   };

// // // // // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // // // // //   const formatDate = (dateString) => {
// // // // // //     return new Date(dateString).toLocaleDateString('en-US', {
// // // // // //       year: 'numeric',
// // // // // //       month: 'short',
// // // // // //       day: 'numeric',
// // // // // //       hour: '2-digit',
// // // // // //       minute: '2-digit'
// // // // // //     });
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ 
// // // // // //       maxWidth: '1400px', 
// // // // // //       margin: '0 auto',
// // // // // //       padding: '0 1rem',
// // // // // //       color: currentTheme.text
// // // // // //     }}>
// // // // // //       {/* Enhanced CSS */}
// // // // // //       <style>{`
// // // // // //         @keyframes fadeIn {
// // // // // //           from { opacity: 0; transform: translateY(20px); }
// // // // // //           to { opacity: 1; transform: translateY(0); }
// // // // // //         }
// // // // // //         @keyframes slideIn {
// // // // // //           from { transform: translateX(-100px); opacity: 0; }
// // // // // //           to { transform: translateX(0); opacity: 1; }
// // // // // //         }
        
// // // // // //         .video-player {
// // // // // //           border-radius: 12px;
// // // // // //           overflow: hidden;
// // // // // //           background: #000;
// // // // // //         }
        
// // // // // //         .video-controls {
// // // // // //           position: absolute;
// // // // // //           bottom: 0;
// // // // // //           left: 0;
// // // // // //           right: 0;
// // // // // //           background: linear-gradient(transparent, rgba(0,0,0,0.7));
// // // // // //           padding: 1rem;
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           gap: 0.5rem;
// // // // // //           opacity: 0;
// // // // // //           transition: opacity 0.3s ease;
// // // // // //         }
        
// // // // // //         .video-container:hover .video-controls {
// // // // // //           opacity: 1;
// // // // // //         }
        
// // // // // //         .control-btn {
// // // // // //           background: rgba(255,255,255,0.9);
// // // // // //           border: none;
// // // // // //           border-radius: 50%;
// // // // // //           width: 36px;
// // // // // //           height: 36px;
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           justify-content: center;
// // // // // //           cursor: pointer;
// // // // // //           transition: all 0.3s ease;
// // // // // //         }
        
// // // // // //         .control-btn:hover {
// // // // // //           background: white;
// // // // // //           transform: scale(1.1);
// // // // // //         }
        
// // // // // //         .volume-slider {
// // // // // //           width: 80px;
// // // // // //           height: 4px;
// // // // // //           background: rgba(255,255,255,0.3);
// // // // // //           border-radius: 2px;
// // // // // //           outline: none;
// // // // // //         }
        
// // // // // //         .checkbox-wrapper {
// // // // // //           position: absolute;
// // // // // //           top: 1rem;
// // // // // //           left: 1rem;
// // // // // //           z-index: 10;
// // // // // //         }
        
// // // // // //         .bulk-checkbox {
// // // // // //           width: 20px;
// // // // // //           height: 20px;
// // // // // //           border-radius: 4px;
// // // // // //           border: 2px solid white;
// // // // // //           background: rgba(0,0,0,0.5);
// // // // // //           cursor: pointer;
// // // // // //         }
        
// // // // // //         .bulk-checkbox:checked {
// // // // // //           background: #10b981;
// // // // // //           border-color: #10b981;
// // // // // //         }

// // // // // //         .toast {
// // // // // //           position: fixed;
// // // // // //           top: 2rem;
// // // // // //           right: 2rem;
// // // // // //           padding: 1rem 1.5rem;
// // // // // //           border-radius: 8px;
// // // // // //           color: white;
// // // // // //           font-weight: 600;
// // // // // //           z-index: 10000;
// // // // // //           animation: slideIn 0.3s ease-out;
// // // // // //         }

// // // // // //         .toast.success {
// // // // // //           background: #10b981;
// // // // // //         }

// // // // // //         .toast.error {
// // // // // //           background: #ef4444;
// // // // // //         }

// // // // // //         .edit-input {
// // // // // //           width: 100%;
// // // // // //           padding: 0.5rem;
// // // // // //           border: 1px solid #d1d5db;
// // // // // //           border-radius: 6px;
// // // // // //           background: white;
// // // // // //           color: #1f2937;
// // // // // //         }

// // // // // //         .edit-input:focus {
// // // // // //           outline: none;
// // // // // //           border-color: #3b82f6;
// // // // // //           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
// // // // // //         }

// // // // // //         .modal-overlay {
// // // // // //           position: fixed;
// // // // // //           top: 0;
// // // // // //           left: 0;
// // // // // //           right: 0;
// // // // // //           bottom: 0;
// // // // // //           background: rgba(0, 0, 0, 0.5);
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           justify-content: center;
// // // // // //           z-index: 10000;
// // // // // //           padding: 2rem;
// // // // // //         }

// // // // // //         .modal-content {
// // // // // //           background: white;
// // // // // //           border-radius: 12px;
// // // // // //           padding: 2rem;
// // // // // //           max-width: 400px;
// // // // // //           width: 100%;
// // // // // //           text-align: center;
// // // // // //         }

// // // // // //         .modal-buttons {
// // // // // //           display: flex;
// // // // // //           gap: 1rem;
// // // // // //           justify-content: center;
// // // // // //           margin-top: 1.5rem;
// // // // // //         }

// // // // // //         .video-options-menu {
// // // // // //           position: fixed;
// // // // // //           background: white;
// // // // // //           border-radius: 8px;
// // // // // //           box-shadow: 0 10px 30px rgba(0,0,0,0.2);
// // // // // //           z-index: 1000;
// // // // // //           min-width: 200px;
// // // // // //           animation: fadeIn 0.2s ease-out;
// // // // // //         }

// // // // // //         .video-option-item {
// // // // // //           padding: 0.75rem 1rem;
// // // // // //           cursor: pointer;
// // // // // //           border-bottom: 1px solid #f3f4f6;
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           gap: 0.5rem;
// // // // // //           transition: background 0.2s ease;
// // // // // //         }

// // // // // //         .video-option-item:hover {
// // // // // //           background: #f9fafb;
// // // // // //         }

// // // // // //         .video-option-item:last-child {
// // // // // //           border-bottom: none;
// // // // // //         }

// // // // // //         .products-grid {
// // // // // //           display: grid;
// // // // // //           grid-template-columns: 1fr;
// // // // // //           gap: 1rem;
// // // // // //           max-height: 400px;
// // // // // //           overflow-y: auto;
// // // // // //           margin: 1rem 0;
// // // // // //         }

// // // // // //         .product-item {
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           gap: 1rem;
// // // // // //           padding: 1rem;
// // // // // //           border: 1px solid #e2e8f0;
// // // // // //           border-radius: 8px;
// // // // // //           background: white;
// // // // // //         }

// // // // // //         .product-image {
// // // // // //           width: 50px;
// // // // // //           height: 50px;
// // // // // //           object-fit: cover;
// // // // // //           border-radius: 6px;
// // // // // //         }

// // // // // //         .product-info {
// // // // // //           flex: 1;
// // // // // //         }

// // // // // //         .product-name {
// // // // // //           font-weight: 600;
// // // // // //           margin-bottom: 0.25rem;
// // // // // //         }

// // // // // //         .product-price {
// // // // // //           color: #059669;
// // // // // //           font-weight: 600;
// // // // // //         }
// // // // // //       `}</style>

// // // // // //       {/* Toast Notification */}
// // // // // //       {toast.show && (
// // // // // //         <div className={`toast ${toast.type}`}>
// // // // // //           {toast.message}
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Video Options Menu */}
// // // // // //       {showVideoOptions.show && (
// // // // // //         <div 
// // // // // //           className="video-options-menu"
// // // // // //           style={{
// // // // // //             left: showVideoOptions.position.x,
// // // // // //             top: showVideoOptions.position.y
// // // // // //           }}
// // // // // //         >
// // // // // //           <div className="video-option-item" onClick={() => copyVideoUrl(showVideoOptions.video.shopify_file_url)}>
// // // // // //             📋 Copy Video URL
// // // // // //           </div>
// // // // // //           <div className="video-option-item" onClick={() => downloadVideo(showVideoOptions.video)}>
// // // // // //             ⬇️ Download Video
// // // // // //           </div>
// // // // // //           <div className="video-option-item" onClick={() => loadProductsForVideo(showVideoOptions.video)}>
// // // // // //             🏪 Select Products
// // // // // //           </div>
// // // // // //           <div className="video-option-item" style={{ color: '#ef4444' }} onClick={() => showDeleteConfirmation(showVideoOptions.video.id, showVideoOptions.video.title)}>
// // // // // //             🗑️ Delete Video
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Products Modal */}
// // // // // //       {showProductsModal.show && (
// // // // // //         <div className="modal-overlay">
// // // // // //           <div className="modal-content" style={{ maxWidth: '500px', maxHeight: '80vh', overflow: 'auto' }}>
// // // // // //             <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
// // // // // //               Select Products for "{showProductsModal.video.title}"
// // // // // //             </h3>
            
// // // // // //             {loadingProducts ? (
// // // // // //               <div style={{ textAlign: 'center', padding: '2rem' }}>
// // // // // //                 <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
// // // // // //                 Loading products...
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <>
// // // // // //                 <div className="products-grid">
// // // // // //                   {products.map(product => (
// // // // // //                     <div key={product.id} className="product-item">
// // // // // //                       <input
// // // // // //                         type="checkbox"
// // // // // //                         checked={selectedProducts.has(product.id)}
// // // // // //                         onChange={() => toggleProductSelection(product.id)}
// // // // // //                         style={{ width: '18px', height: '18px' }}
// // // // // //                       />
// // // // // //                       {product.image_url && (
// // // // // //                         <img 
// // // // // //                           src={product.image_url} 
// // // // // //                           alt={product.title}
// // // // // //                           className="product-image"
// // // // // //                         />
// // // // // //                       )}
// // // // // //                       <div className="product-info">
// // // // // //                         <div className="product-name">{product.title}</div>
// // // // // //                         <div className="product-price">${product.price}</div>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ))}
// // // // // //                 </div>
                
// // // // // //                 <div className="modal-buttons">
// // // // // //                   <button
// // // // // //                     onClick={saveVideoProducts}
// // // // // //                     style={{
// // // // // //                       background: '#10b981',
// // // // // //                       color: 'white',
// // // // // //                       border: 'none',
// // // // // //                       padding: '0.75rem 1.5rem',
// // // // // //                       borderRadius: '8px',
// // // // // //                       fontWeight: '600',
// // // // // //                       cursor: 'pointer'
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     💾 Save Products ({selectedProducts.size})
// // // // // //                   </button>
// // // // // //                   <button
// // // // // //                     onClick={() => {
// // // // // //                       setShowProductsModal({ show: false, video: null });
// // // // // //                       setSelectedProducts(new Set());
// // // // // //                     }}
// // // // // //                     style={{
// // // // // //                       background: '#6b7280',
// // // // // //                       color: 'white',
// // // // // //                       border: 'none',
// // // // // //                       padding: '0.75rem 1.5rem',
// // // // // //                       borderRadius: '8px',
// // // // // //                       fontWeight: '600',
// // // // // //                       cursor: 'pointer'
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     Cancel
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Delete Confirmation Modal */}
// // // // // //       {showDeleteModal.show && (
// // // // // //         <div className="modal-overlay">
// // // // // //           <div className="modal-content">
// // // // // //             <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
// // // // // //               Confirm Delete
// // // // // //             </h3>
// // // // // //             <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
// // // // // //               Are you sure you want to delete "{showDeleteModal.videoTitle}"? This action cannot be undone.
// // // // // //             </p>
// // // // // //             <div className="modal-buttons">
// // // // // //               <button
// // // // // //                 onClick={() => deleteVideo(showDeleteModal.videoId)}
// // // // // //                 style={{
// // // // // //                   background: '#ef4444',
// // // // // //                   color: 'white',
// // // // // //                   border: 'none',
// // // // // //                   padding: '0.75rem 1.5rem',
// // // // // //                   borderRadius: '8px',
// // // // // //                   fontWeight: '600',
// // // // // //                   cursor: 'pointer'
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Yes, Delete
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 onClick={() => setShowDeleteModal({ show: false, videoId: null, videoTitle: '' })}
// // // // // //                 style={{
// // // // // //                   background: '#6b7280',
// // // // // //                   color: 'white',
// // // // // //                   border: 'none',
// // // // // //                   padding: '0.75rem 1.5rem',
// // // // // //                   borderRadius: '8px',
// // // // // //                   fontWeight: '600',
// // // // // //                   cursor: 'pointer'
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Cancel
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Bulk Delete Confirmation Modal */}
// // // // // //       {showBulkDeleteModal && (
// // // // // //         <div className="modal-overlay">
// // // // // //           <div className="modal-content">
// // // // // //             <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
// // // // // //               Confirm Bulk Delete
// // // // // //             </h3>
// // // // // //             <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
// // // // // //               Are you sure you want to delete {selectedVideos.size} videos? This action cannot be undone.
// // // // // //             </p>
// // // // // //             <div className="modal-buttons">
// // // // // //               <button
// // // // // //                 onClick={bulkDeleteVideos}
// // // // // //                 style={{
// // // // // //                   background: '#ef4444',
// // // // // //                   color: 'white',
// // // // // //                   border: 'none',
// // // // // //                   padding: '0.75rem 1.5rem',
// // // // // //                   borderRadius: '8px',
// // // // // //                   fontWeight: '600',
// // // // // //                   cursor: 'pointer'
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Yes, Delete All
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 onClick={() => setShowBulkDeleteModal(false)}
// // // // // //                 style={{
// // // // // //                   background: '#6b7280',
// // // // // //                   color: 'white',
// // // // // //                   border: 'none',
// // // // // //                   padding: '0.75rem 1.5rem',
// // // // // //                   borderRadius: '8px',
// // // // // //                   fontWeight: '600',
// // // // // //                   cursor: 'pointer'
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Cancel
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Header Section */}
// // // // // //       <div style={{
// // // // // //         marginBottom: '2rem',
// // // // // //         animation: 'slideIn 0.6s ease-out'
// // // // // //       }}>
// // // // // //         <h1 style={{
// // // // // //           fontSize: '2.5rem',
// // // // // //           fontWeight: 'bold',
// // // // // //           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // // // //           WebkitBackgroundClip: 'text',
// // // // // //           WebkitTextFillColor: 'transparent',
// // // // // //           marginBottom: '0.5rem'
// // // // // //         }}>
// // // // // //           🎬 Video Gallery
// // // // // //         </h1>
// // // // // //         <p style={{
// // // // // //           fontSize: '1.1rem',
// // // // // //           color: currentTheme.mutedText,
// // // // // //           marginBottom: '2rem'
// // // // // //         }}>
// // // // // //           Manage and organize your video content across all platforms
// // // // // //         </p>
// // // // // //       </div>

// // // // // //       {/* Bulk Delete Controls */}
// // // // // //       {bulkDeleteMode && (
// // // // // //         <div style={{
// // // // // //           background: currentTheme.cardBackground,
// // // // // //           borderRadius: '12px',
// // // // // //           padding: '1.5rem',
// // // // // //           border: currentTheme.border,
// // // // // //           boxShadow: currentTheme.shadow,
// // // // // //           marginBottom: '2rem',
// // // // // //           display: 'flex',
// // // // // //           alignItems: 'center',
// // // // // //           justifyContent: 'space-between',
// // // // // //           animation: 'fadeIn 0.3s ease-out'
// // // // // //         }}>
// // // // // //           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// // // // // //             <button
// // // // // //               onClick={selectAllVideos}
// // // // // //               style={{
// // // // // //                 background: 'transparent',
// // // // // //                 border: `1px solid ${currentTheme.mutedText}`,
// // // // // //                 color: currentTheme.text,
// // // // // //                 padding: '0.5rem 1rem',
// // // // // //                 borderRadius: '6px',
// // // // // //                 cursor: 'pointer'
// // // // // //               }}
// // // // // //             >
// // // // // //               {selectedVideos.size === mediaFiles.length ? 'Deselect All' : 'Select All'}
// // // // // //             </button>
// // // // // //             <span style={{ color: currentTheme.mutedText }}>
// // // // // //               {selectedVideos.size} videos selected
// // // // // //             </span>
// // // // // //           </div>
// // // // // //           <div style={{ display: 'flex', gap: '1rem' }}>
// // // // // //             <button
// // // // // //               onClick={showBulkDeleteConfirmation}
// // // // // //               style={{
// // // // // //                 background: '#ef4444',
// // // // // //                 color: 'white',
// // // // // //                 border: 'none',
// // // // // //                 padding: '0.75rem 1.5rem',
// // // // // //                 borderRadius: '8px',
// // // // // //                 fontWeight: '600',
// // // // // //                 cursor: 'pointer'
// // // // // //               }}
// // // // // //             >
// // // // // //               🗑️ Delete Selected ({selectedVideos.size})
// // // // // //             </button>
// // // // // //             <button
// // // // // //               onClick={() => {
// // // // // //                 setBulkDeleteMode(false);
// // // // // //                 setSelectedVideos(new Set());
// // // // // //               }}
// // // // // //               style={{
// // // // // //                 background: 'transparent',
// // // // // //                 border: `1px solid ${currentTheme.mutedText}`,
// // // // // //                 color: currentTheme.text,
// // // // // //                 padding: '0.75rem 1.5rem',
// // // // // //                 borderRadius: '8px',
// // // // // //                 cursor: 'pointer'
// // // // // //               }}
// // // // // //             >
// // // // // //               Cancel
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Uploaded Media Section */}
// // // // // //       <div style={{
// // // // // //         background: currentTheme.cardBackground,
// // // // // //         borderRadius: '16px',
// // // // // //         padding: '2rem',
// // // // // //         border: currentTheme.border,
// // // // // //         boxShadow: currentTheme.shadow,
// // // // // //         marginBottom: '2rem',
// // // // // //         animation: 'fadeIn 0.6s ease-out 0.2s both'
// // // // // //       }}>
// // // // // //         <div style={{
// // // // // //           display: 'flex',
// // // // // //           justifyContent: 'space-between',
// // // // // //           alignItems: 'center',
// // // // // //           marginBottom: '1.5rem'
// // // // // //         }}>
// // // // // //           <h2 style={{
// // // // // //             fontSize: '1.5rem',
// // // // // //             fontWeight: 'bold',
// // // // // //             color: currentTheme.text
// // // // // //           }}>
// // // // // //             📁 Your Uploaded Media
// // // // // //             <span style={{
// // // // // //               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // // // //               color: 'white',
// // // // // //               padding: '0.25rem 0.75rem',
// // // // // //               borderRadius: '20px',
// // // // // //               fontSize: '0.875rem',
// // // // // //               marginLeft: '0.5rem'
// // // // // //             }}>
// // // // // //               {mediaFiles.length}
// // // // // //             </span>
// // // // // //           </h2>
// // // // // //           <div style={{ display: 'flex', gap: '1rem' }}>
// // // // // //             {mediaFiles.length > 0 && (
// // // // // //               <button
// // // // // //                 onClick={() => setBulkDeleteMode(!bulkDeleteMode)}
// // // // // //                 style={{
// // // // // //                   background: bulkDeleteMode ? '#6b7280' : '#f59e0b',
// // // // // //                   color: 'white',
// // // // // //                   border: 'none',
// // // // // //                   padding: '0.75rem 1.5rem',
// // // // // //                   borderRadius: '8px',
// // // // // //                   fontWeight: '600',
// // // // // //                   cursor: 'pointer',
// // // // // //                   transition: 'all 0.3s ease'
// // // // // //                 }}
// // // // // //               >
// // // // // //                 {bulkDeleteMode ? '✕ Cancel Bulk Delete' : '🗑️ Bulk Delete'}
// // // // // //               </button>
// // // // // //             )}
// // // // // //             <button
// // // // // //               onClick={() => setShowHomepageMedia(true)}
// // // // // //               style={{
// // // // // //                 background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
// // // // // //                 color: 'white',
// // // // // //                 border: 'none',
// // // // // //                 padding: '0.75rem 1.5rem',
// // // // // //                 borderRadius: '8px',
// // // // // //                 fontWeight: '600',
// // // // // //                 cursor: 'pointer',
// // // // // //                 transition: 'all 0.3s ease'
// // // // // //               }}
// // // // // //             >
// // // // // //               📤 Upload New Media
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Media Files Grid */}
// // // // // //         {loading ? (
// // // // // //           <div style={{ textAlign: 'center', padding: '3rem', color: currentTheme.mutedText }}>
// // // // // //             <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
// // // // // //             Loading your media files...
// // // // // //           </div>
// // // // // //         ) : mediaFiles.length === 0 ? (
// // // // // //           <div style={{ 
// // // // // //             textAlign: 'center', 
// // // // // //             padding: '3rem',
// // // // // //             background: isDarkTheme 
// // // // // //               ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
// // // // // //               : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
// // // // // //             borderRadius: '12px',
// // // // // //             border: isDarkTheme ? '1px solid #475569' : '1px solid #e2e8f0'
// // // // // //           }}>
// // // // // //             <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
// // // // // //             <h3 style={{ 
// // // // // //               fontSize: '1.25rem', 
// // // // // //               fontWeight: '600', 
// // // // // //               marginBottom: '0.5rem',
// // // // // //               color: currentTheme.text
// // // // // //             }}>
// // // // // //               No Media Files Yet
// // // // // //             </h3>
// // // // // //             <p style={{ 
// // // // // //               color: currentTheme.mutedText,
// // // // // //               marginBottom: '1.5rem'
// // // // // //             }}>
// // // // // //               Upload your first video or image to get started
// // // // // //             </p>
// // // // // //             <button
// // // // // //               onClick={() => setShowHomepageMedia(true)}
// // // // // //               style={{
// // // // // //                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // // // //                 color: 'white',
// // // // // //                 border: 'none',
// // // // // //                 padding: '0.75rem 1.5rem',
// // // // // //                 borderRadius: '8px',
// // // // // //                 fontWeight: '600',
// // // // // //                 cursor: 'pointer',
// // // // // //                 transition: 'all 0.3s ease'
// // // // // //               }}
// // // // // //             >
// // // // // //               🚀 Upload Your First File
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <div style={{
// // // // // //             display: 'grid',
// // // // // //             gridTemplateColumns: 'repeat(4, 1fr)',
// // // // // //             gap: '1.5rem'
// // // // // //           }}>
// // // // // //             {mediaFiles.map((file, index) => (
// // // // // //               <VideoPlayer 
// // // // // //                 key={file.id}
// // // // // //                 file={file}
// // // // // //                 index={index}
// // // // // //                 isSelected={selectedVideos.has(file.id)}
// // // // // //                 onSelect={() => toggleVideoSelection(file.id)}
// // // // // //                 onDelete={() => showDeleteConfirmation(file.id, file.title)}
// // // // // //                 onEdit={() => startEditing(file)}
// // // // // //                 onSave={() => saveTitle(file.id)}
// // // // // //                 onCancel={cancelEditing}
// // // // // //                 isEditing={editingVideoId === file.id}
// // // // // //                 editTitle={editTitle}
// // // // // //                 onEditTitleChange={setEditTitle}
// // // // // //                 bulkDeleteMode={bulkDeleteMode}
// // // // // //                 onShowOptions={showVideoOptionsMenu}
// // // // // //                 theme={currentTheme}
// // // // // //                 formatDate={formatDate}
// // // // // //               />
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Homepage Media Modal */}
// // // // // //       {showHomepageMedia && (
// // // // // //         <div style={{
// // // // // //           position: 'fixed',
// // // // // //           top: 0,
// // // // // //           left: 0,
// // // // // //           right: 0,
// // // // // //           bottom: 0,
// // // // // //           background: 'rgba(0, 0, 0, 0.5)',
// // // // // //           display: 'flex',
// // // // // //           alignItems: 'center',
// // // // // //           justifyContent: 'center',
// // // // // //           zIndex: 1000,
// // // // // //           padding: '2rem'
// // // // // //         }}>
// // // // // //           <div style={{
// // // // // //             background: 'white',
// // // // // //             borderRadius: '16px',
// // // // // //             padding: '0',
// // // // // //             maxWidth: '900px',
// // // // // //             width: '100%',
// // // // // //             maxHeight: '90vh',
// // // // // //             overflow: 'auto',
// // // // // //             position: 'relative'
// // // // // //           }}>
// // // // // //             <button
// // // // // //               onClick={() => setShowHomepageMedia(false)}
// // // // // //               style={{
// // // // // //                 position: 'absolute',
// // // // // //                 top: '1rem',
// // // // // //                 right: '1rem',
// // // // // //                 background: 'none',
// // // // // //                 border: 'none',
// // // // // //                 fontSize: '1.5rem',
// // // // // //                 cursor: 'pointer',
// // // // // //                 color: '#6b7280',
// // // // // //                 zIndex: 1001,
// // // // // //                 width: '40px',
// // // // // //                 height: '40px',
// // // // // //                 borderRadius: '50%',
// // // // // //                 display: 'flex',
// // // // // //                 alignItems: 'center',
// // // // // //                 justifyContent: 'center',
// // // // // //                 transition: 'all 0.3s ease'
// // // // // //               }}
// // // // // //             >
// // // // // //               ✕
// // // // // //             </button>
// // // // // //             <HomepageMedia />
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // // Video Player Component
// // // // // // function VideoPlayer({ 
// // // // // //   file, 
// // // // // //   index, 
// // // // // //   isSelected, 
// // // // // //   onSelect, 
// // // // // //   onDelete, 
// // // // // //   onEdit,
// // // // // //   onSave,
// // // // // //   onCancel,
// // // // // //   isEditing,
// // // // // //   editTitle,
// // // // // //   onEditTitleChange,
// // // // // //   bulkDeleteMode, 
// // // // // //   onShowOptions,
// // // // // //   theme, 
// // // // // //   formatDate 
// // // // // // }) {
// // // // // //   const videoRef = useRef(null);
// // // // // //   const [isPlaying, setIsPlaying] = useState(false);
// // // // // //   const [volume, setVolume] = useState(0.5);
// // // // // //   const [showControls, setShowControls] = useState(false);
// // // // // //   const [videoError, setVideoError] = useState(false);
// // // // // //   const [isHovered, setIsHovered] = useState(false);

// // // // // //   // Use proxy URL if available, otherwise fallback to original URL
// // // // // //   const videoSrc = file.videoUrl || file.shopify_file_url;

// // // // // //   // Auto-play on hover
// // // // // //   useEffect(() => {
// // // // // //     if (videoRef.current) {
// // // // // //       videoRef.current.volume = volume;
// // // // // //       videoRef.current.loop = true;
      
// // // // // //       if (isHovered) {
// // // // // //         videoRef.current.play()
// // // // // //           .then(() => setIsPlaying(true))
// // // // // //           .catch(error => {
// // // // // //             console.log('Auto-play on hover failed:', error);
// // // // // //           });
// // // // // //       } else {
// // // // // //         videoRef.current.pause();
// // // // // //         setIsPlaying(false);
// // // // // //       }
// // // // // //     }
// // // // // //   }, [isHovered, volume, videoSrc]);

// // // // // //   const togglePlay = () => {
// // // // // //     if (videoRef.current) {
// // // // // //       if (isPlaying) {
// // // // // //         videoRef.current.pause();
// // // // // //         setIsPlaying(false);
// // // // // //       } else {
// // // // // //         videoRef.current.play()
// // // // // //           .then(() => setIsPlaying(true))
// // // // // //           .catch(error => {
// // // // // //             console.error('Play failed:', error);
// // // // // //             setVideoError(true);
// // // // // //           });
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleVideoClick = (event) => {
// // // // // //     if (bulkDeleteMode) {
// // // // // //       onSelect();
// // // // // //     } else {
// // // // // //       onShowOptions(file, event);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleVolumeChange = (e) => {
// // // // // //     const newVolume = parseFloat(e.target.value);
// // // // // //     setVolume(newVolume);
// // // // // //     if (videoRef.current) {
// // // // // //       videoRef.current.volume = newVolume;
// // // // // //     }
// // // // // //   };

// // // // // //   const handleVideoEnd = () => {
// // // // // //     // Video should loop automatically due to loop attribute
// // // // // //     if (videoRef.current && !videoRef.current.loop) {
// // // // // //       videoRef.current.currentTime = 0;
// // // // // //       videoRef.current.play();
// // // // // //     }
// // // // // //   };

// // // // // //   const handleVideoError = (e) => {
// // // // // //     console.error('Video error:', e);
// // // // // //     setVideoError(true);
// // // // // //     setIsPlaying(false);
// // // // // //   };

// // // // // //   const handleVideoLoad = () => {
// // // // // //     setVideoError(false);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div
// // // // // //       style={{
// // // // // //         background: theme.cardBackground,
// // // // // //         borderRadius: '12px',
// // // // // //         padding: '1rem',
// // // // // //         border: theme.border,
// // // // // //         boxShadow: theme.shadow,
// // // // // //         transition: 'all 0.3s ease',
// // // // // //         animation: `fadeIn 0.6s ease-out ${0.3 + index * 0.1}s both`,
// // // // // //         position: 'relative'
// // // // // //       }}
// // // // // //       onMouseEnter={() => setIsHovered(true)}
// // // // // //       onMouseLeave={() => setIsHovered(false)}
// // // // // //     >
// // // // // //       {/* Bulk Delete Checkbox */}
// // // // // //       {bulkDeleteMode && (
// // // // // //         <div className="checkbox-wrapper">
// // // // // //           <input
// // // // // //             type="checkbox"
// // // // // //             checked={isSelected}
// // // // // //             onChange={onSelect}
// // // // // //             className="bulk-checkbox"
// // // // // //           />
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Video Player */}
// // // // // //       <div 
// // // // // //         className="video-container"
// // // // // //         style={{ 
// // // // // //           position: 'relative', 
// // // // // //           marginBottom: '1rem',
// // // // // //           height: '300px' // Increased height
// // // // // //         }}
// // // // // //         onMouseEnter={() => setShowControls(true)}
// // // // // //         onMouseLeave={() => setShowControls(false)}
// // // // // //       >
// // // // // //         {videoError ? (
// // // // // //           <div style={{
// // // // // //             width: '100%',
// // // // // //             height: '100%',
// // // // // //             background: '#f3f4f6',
// // // // // //             display: 'flex',
// // // // // //             alignItems: 'center',
// // // // // //             justifyContent: 'center',
// // // // // //             borderRadius: '8px',
// // // // // //             color: theme.mutedText,
// // // // // //             flexDirection: 'column',
// // // // // //             gap: '0.5rem'
// // // // // //           }}>
// // // // // //             <div style={{ fontSize: '2rem' }}>🎬</div>
// // // // // //             <div style={{ fontSize: '0.875rem', textAlign: 'center' }}>
// // // // // //               Video unavailable
// // // // // //             </div>
// // // // // //             <button
// // // // // //               onClick={() => {
// // // // // //                 setVideoError(false);
// // // // // //                 if (videoRef.current) {
// // // // // //                   videoRef.current.load();
// // // // // //                 }
// // // // // //               }}
// // // // // //               style={{
// // // // // //                 background: '#3b82f6',
// // // // // //                 color: 'white',
// // // // // //                 border: 'none',
// // // // // //                 padding: '0.25rem 0.5rem',
// // // // // //                 borderRadius: '4px',
// // // // // //                 fontSize: '0.75rem',
// // // // // //                 cursor: 'pointer'
// // // // // //               }}
// // // // // //             >
// // // // // //               Retry
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <>
// // // // // //             <video
// // // // // //               ref={videoRef}
// // // // // //               src={videoSrc}
// // // // // //               className="video-player"
// // // // // //               style={{
// // // // // //                 width: '100%',
// // // // // //                 height: '100%',
// // // // // //                 objectFit: 'cover',
// // // // // //                 cursor: 'pointer'
// // // // // //               }}
// // // // // //               onClick={handleVideoClick}
// // // // // //               onEnded={handleVideoEnd}
// // // // // //               onError={handleVideoError}
// // // // // //               onLoadedData={handleVideoLoad}
// // // // // //               loop
// // // // // //               playsInline
// // // // // //               preload="auto"
// // // // // //               muted={volume === 0}
// // // // // //             />
            
// // // // // //             {/* Video Controls */}
// // // // // //             <div className="video-controls" style={{ opacity: showControls ? 1 : 0 }}>
// // // // // //               <button className="control-btn" onClick={togglePlay}>
// // // // // //                 {isPlaying ? '⏸️' : '▶️'}
// // // // // //               </button>
// // // // // //               <input
// // // // // //                 type="range"
// // // // // //                 min="0"
// // // // // //                 max="1"
// // // // // //                 step="0.1"
// // // // // //                 value={volume}
// // // // // //                 onChange={handleVolumeChange}
// // // // // //                 className="volume-slider"
// // // // // //               />
// // // // // //               <span style={{ color: 'white', fontSize: '0.75rem', marginLeft: 'auto' }}>
// // // // // //                 {Math.round(volume * 100)}%
// // // // // //               </span>
// // // // // //             </div>
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Video Info */}
// // // // // //       <div style={{ marginBottom: '1rem' }}>
// // // // // //         {isEditing ? (
// // // // // //           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               value={editTitle}
// // // // // //               onChange={(e) => onEditTitleChange(e.target.value)}
// // // // // //               className="edit-input"
// // // // // //               placeholder="Enter video title"
// // // // // //               autoFocus
// // // // // //             />
// // // // // //             <div style={{ display: 'flex', gap: '0.5rem' }}>
// // // // // //               <button
// // // // // //                 onClick={onSave}
// // // // // //                 style={{
// // // // // //                   background: '#10b981',
// // // // // //                   color: 'white',
// // // // // //                   border: 'none',
// // // // // //                   padding: '0.25rem 0.5rem',
// // // // // //                   borderRadius: '4px',
// // // // // //                   fontSize: '0.75rem',
// // // // // //                   cursor: 'pointer'
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Save
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 onClick={onCancel}
// // // // // //                 style={{
// // // // // //                   background: '#6b7280',
// // // // // //                   color: 'white',
// // // // // //                   border: 'none',
// // // // // //                   padding: '0.25rem 0.5rem',
// // // // // //                   borderRadius: '4px',
// // // // // //                   fontSize: '0.75rem',
// // // // // //                   cursor: 'pointer'
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Cancel
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <>
// // // // // //             <h4 style={{
// // // // // //               fontSize: '0.875rem',
// // // // // //               fontWeight: '600',
// // // // // //               marginBottom: '0.25rem',
// // // // // //               color: theme.text,
// // // // // //               wordBreak: 'break-word',
// // // // // //               cursor: 'pointer'
// // // // // //             }}
// // // // // //             onClick={onEdit}
// // // // // //             title="Click to edit title"
// // // // // //             >
// // // // // //               {file.title}
// // // // // //             </h4>
// // // // // //             <p style={{
// // // // // //               fontSize: '0.7rem',
// // // // // //               color: theme.mutedText
// // // // // //             }}>
// // // // // //               {formatDate(file.created_at)}
// // // // // //             </p>
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Associated Products */}
// // // // // //       {file.products && file.products.length > 0 && (
// // // // // //         <div style={{
// // // // // //           marginBottom: '1rem',
// // // // // //           padding: '0.75rem',
// // // // // //           background: '#f0f9ff',
// // // // // //           borderRadius: '6px',
// // // // // //           border: '1px solid #bae6fd'
// // // // // //         }}>
// // // // // //           <div style={{
// // // // // //             fontSize: '0.7rem',
// // // // // //             fontWeight: '600',
// // // // // //             color: '#0369a1',
// // // // // //             marginBottom: '0.5rem'
// // // // // //           }}>
// // // // // //             📦 Associated Products ({file.products.length})
// // // // // //           </div>
// // // // // //           <div style={{
// // // // // //             display: 'flex',
// // // // // //             flexWrap: 'wrap',
// // // // // //             gap: '0.25rem'
// // // // // //           }}>
// // // // // //             {file.products.slice(0, 3).map(product => (
// // // // // //               <span
// // // // // //                 key={product.id}
// // // // // //                 style={{
// // // // // //                   background: '#e0f2fe',
// // // // // //                   color: '#0369a1',
// // // // // //                   padding: '0.25rem 0.5rem',
// // // // // //                   borderRadius: '4px',
// // // // // //                   fontSize: '0.6rem',
// // // // // //                   fontWeight: '500'
// // // // // //                 }}
// // // // // //               >
// // // // // //                 {product.title}
// // // // // //               </span>
// // // // // //             ))}
// // // // // //             {file.products.length > 3 && (
// // // // // //               <span style={{
// // // // // //                 background: '#e0f2fe',
// // // // // //                 color: '#0369a1',
// // // // // //                 padding: '0.25rem 0.5rem',
// // // // // //                 borderRadius: '4px',
// // // // // //                 fontSize: '0.6rem',
// // // // // //                 fontWeight: '500'
// // // // // //               }}>
// // // // // //                 +{file.products.length - 3} more
// // // // // //               </span>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Action Buttons */}
// // // // // //       <div style={{
// // // // // //         display: 'flex',
// // // // // //         gap: '0.5rem',
// // // // // //         flexWrap: 'wrap'
// // // // // //       }}>
// // // // // //         <a
// // // // // //           href={file.shopify_file_url}
// // // // // //           target="_blank"
// // // // // //           rel="noopener noreferrer"
// // // // // //           style={{
// // // // // //             background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
// // // // // //             color: 'white',
// // // // // //             textDecoration: 'none',
// // // // // //             padding: '0.25rem 0.5rem',
// // // // // //             borderRadius: '4px',
// // // // // //             fontSize: '0.7rem',
// // // // // //             fontWeight: '500'
// // // // // //           }}
// // // // // //         >
// // // // // //           🔗 Open
// // // // // //         </a>
// // // // // //         <button
// // // // // //           onClick={() => navigator.clipboard.writeText(file.shopify_file_url)}
// // // // // //           style={{
// // // // // //             background: 'transparent',
// // // // // //             border: `1px solid ${theme.mutedText}`,
// // // // // //             color: theme.text,
// // // // // //             padding: '0.25rem 0.5rem',
// // // // // //             borderRadius: '4px',
// // // // // //             fontSize: '0.7rem',
// // // // // //             fontWeight: '500',
// // // // // //             cursor: 'pointer'
// // // // // //           }}
// // // // // //         >
// // // // // //           📋 Copy
// // // // // //         </button>
// // // // // //         {!isEditing && !bulkDeleteMode && (
// // // // // //           <button
// // // // // //             onClick={onEdit}
// // // // // //             style={{
// // // // // //               background: '#f59e0b',
// // // // // //               color: 'white',
// // // // // //               border: 'none',
// // // // // //               padding: '0.25rem 0.5rem',
// // // // // //               borderRadius: '4px',
// // // // // //               fontSize: '0.7rem',
// // // // // //               fontWeight: '500',
// // // // // //               cursor: 'pointer'
// // // // // //             }}
// // // // // //           >
// // // // // //             ✏️ Edit
// // // // // //           </button>
// // // // // //         )}
// // // // // //         {!bulkDeleteMode && (
// // // // // //           <button
// // // // // //             onClick={onDelete}
// // // // // //             style={{
// // // // // //               background: '#ef4444',
// // // // // //               color: 'white',
// // // // // //               border: 'none',
// // // // // //               padding: '0.25rem 0.5rem',
// // // // // //               borderRadius: '4px',
// // // // // //               fontSize: '0.7rem',
// // // // // //               fontWeight: '500',
// // // // // //               cursor: 'pointer',
// // // // // //               marginLeft: 'auto'
// // // // // //             }}
// // // // // //           >
// // // // // //             🗑️ Delete
// // // // // //           </button>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }








// // // // // // app/routes/app.video-gallery.jsx
// // // // // import { useState, useEffect } from "react";
// // // // // import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
// // // // // import VideoGrid from "../components/videogallerycomponents/VideoGrid";
// // // // // import BulkDeleteControls from "../components/videogallerycomponents/BulkDeleteControls";
// // // // // import Modals from "../components/videogallerycomponents/Modals";
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
// // // // //     showVideoOptions,
// // // // //     showProductsModal,
// // // // //     products,
// // // // //     selectedProducts,
// // // // //     loadingProducts,
    
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
// // // // //     showVideoOptionsMenu,
// // // // //     hideVideoOptionsMenu,
// // // // //     copyVideoUrl,
// // // // //     downloadVideo,
// // // // //     loadProductsForVideo,
// // // // //     toggleProductSelection,
// // // // //     saveVideoProducts
// // // // //   } = useVideoGallery();

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

// // // // //         <VideoGrid
// // // // //           mediaFiles={mediaFiles}
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
// // // // //           onShowOptions={showVideoOptionsMenu}
// // // // //           onDelete={showDeleteConfirmation}
// // // // //           onUploadClick={() => setShowHomepageMedia(true)}
// // // // //         />
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
// // // // //         onHideProductsModal={() => {
// // // // //           setShowProductsModal({ show: false, video: null });
// // // // //           setSelectedProducts(new Set());
// // // // //         }}
// // // // //       />

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
// // // // //             background: 'white',
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
// // // // //                 background: 'none',
// // // // //                 border: 'none',
// // // // //                 fontSize: '1.5rem',
// // // // //                 cursor: 'pointer',
// // // // //                 color: '#6b7280',
// // // // //                 zIndex: 1001,
// // // // //                 width: '40px',
// // // // //                 height: '40px',
// // // // //                 borderRadius: '50%',
// // // // //                 display: 'flex',
// // // // //                 alignItems: 'center',
// // // // //                 justifyContent: 'center',
// // // // //                 transition: 'all 0.3s ease'
// // // // //               }}
// // // // //             >
// // // // //               ✕
// // // // //             </button>
// // // // //             <HomepageMedia />
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </VideoGalleryLayout>
// // // // //   );
// // // // // }








// // // // // app/routes/app.video-gallery.jsx
// // // // import { useState, useEffect } from "react";
// // // // import VideoGalleryLayout from "../components/videogallerycomponents/VideoGalleryLayout";
// // // // import VideoGrid from "../components/videogallerycomponents/VideoGrid";
// // // // import BulkDeleteControls from "../components/videogallerycomponents/BulkDeleteControls";
// // // // import Modals from "../components/videogallerycomponents/Modals";
// // // // import VideoPlayerModal from "../components/videogallerycomponents/VideoPlayerModal"; // Fixed import
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
// // // //     showVideoOptions,
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
// // // //     showVideoOptionsMenu,
// // // //     hideVideoOptionsMenu,
// // // //     copyVideoUrl,
// // // //     downloadVideo,
// // // //     loadProductsForVideo,
// // // //     toggleProductSelection,
// // // //     saveVideoProducts,
// // // //     showVideoPlayerModal,
// // // //     hideVideoPlayerModal
// // // //   } = useVideoGallery();

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

// // // //         <VideoGrid
// // // //           mediaFiles={mediaFiles}
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
// // // //           onShowOptions={showVideoOptionsMenu}
// // // //           onDelete={showDeleteConfirmation}
// // // //           onVideoClick={showVideoPlayerModal}
// // // //           onUploadClick={() => setShowHomepageMedia(true)}
// // // //         />
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
// // // //         onHideProductsModal={() => {
// // // //           setShowProductsModal({ show: false, video: null });
// // // //           setSelectedProducts(new Set());
// // // //         }}
// // // //         isDarkTheme={isDarkTheme}
// // // //       />

// // // //       {/* Video Player Modal */}
// // // //       <VideoPlayerModal
// // // //         showVideoPlayer={showVideoPlayer}
// // // //         onHide={hideVideoPlayerModal}
// // // //         videoData={showVideoPlayer.video}
// // // //         isDarkTheme={isDarkTheme}
// // // //       />

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
// // //     showVideoOptions,
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
// // //     showVideoOptionsMenu,
// // //     hideVideoOptionsMenu,
// // //     copyVideoUrl,
// // //     downloadVideo,
// // //     loadProductsForVideo,
// // //     toggleProductSelection,
// // //     saveVideoProducts,
// // //     showVideoPlayerModal,
// // //     hideVideoPlayerModal
// // //   } = useVideoGallery();

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

// // //         <VideoGrid
// // //           mediaFiles={mediaFiles}
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
// // //           onShowOptions={showVideoOptionsMenu}
// // //           onDelete={showDeleteConfirmation}
// // //           onVideoClick={showVideoPlayerModal}
// // //           onUploadClick={() => setShowHomepageMedia(true)}
// // //         />
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
// // //         onHideProductsModal={() => {
// // //           setShowProductsModal({ show: false, video: null });
// // //           setSelectedProducts(new Set());
// // //         }}
// // //         isDarkTheme={isDarkTheme}
// // //       />

// // //       {/* Video Player Modal */}
// // //       <VideoPlayerModal
// // //         showVideoPlayer={showVideoPlayer}
// // //         onHide={hideVideoPlayerModal}
// // //         videoData={showVideoPlayer.video}
// // //         isDarkTheme={isDarkTheme}
// // //       />

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
// // //     showVideoOptions,
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
// // //     showVideoOptionsMenu,
// // //     hideVideoOptionsMenu,
// // //     copyVideoUrl,
// // //     downloadVideo,
// // //     loadProductsForVideo,
// // //     toggleProductSelection,
// // //     saveVideoProducts,
// // //     showVideoPlayerModal,
// // //     hideVideoPlayerModal
// // //   } = useVideoGallery();

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

// // //         <VideoGrid
// // //           mediaFiles={mediaFiles}
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
// // //           onShowOptions={showVideoOptionsMenu}
// // //           onDelete={showDeleteConfirmation}
// // //           onVideoClick={showVideoPlayerModal}
// // //           onUploadClick={() => setShowHomepageMedia(true)}
// // //         />
// // //       </div>

// // //       {/* Modals - UPDATED TO PASS ALL REQUIRED PROPS */}
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
// // //         onHideProductsModal={() => {
// // //           setShowProductsModal({ show: false, video: null });
// // //           setSelectedProducts(new Set());
// // //         }}
// // //         isDarkTheme={isDarkTheme}
// // //         showVideoPlayerModal={showVideoPlayerModal} // ADD THIS PROP
// // //       />

// // //       {/* Video Player Modal */}
// // //       <VideoPlayerModal
// // //         showVideoPlayer={showVideoPlayer}
// // //         onHide={hideVideoPlayerModal}
// // //         videoData={showVideoPlayer ? showVideoPlayer.video : null} // ← Safe access
// // //         isDarkTheme={isDarkTheme}
// // //       />

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
// // //     showVideoOptions,
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
// // //     showVideoOptionsMenu,
// // //     hideVideoOptionsMenu,
// // //     copyVideoUrl,
// // //     downloadVideo,
// // //     loadProductsForVideo,
// // //     toggleProductSelection,
// // //     saveVideoProducts,
// // //     showVideoPlayerModal,
// // //     hideVideoPlayerModal
// // //   } = useVideoGallery();

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

// // //         <VideoGrid
// // //           mediaFiles={mediaFiles}
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
// // //           onShowOptions={showVideoOptionsMenu}
// // //           onDelete={showDeleteConfirmation}
// // //           onVideoClick={showVideoPlayerModal}
// // //           onUploadClick={() => setShowHomepageMedia(true)}
// // //         />
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
// // //         onHideProductsModal={() => {
// // //           setShowProductsModal({ show: false, video: null });
// // //           setSelectedProducts(new Set());
// // //         }}
// // //         isDarkTheme={isDarkTheme}
// // //         showVideoPlayerModal={showVideoPlayerModal}
// // //       />

// // //       {/* Video Player Modal - ADD CONDITIONAL RENDERING */}
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

// // //the above is the safe state



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
// //     showVideoOptions,
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
// //     showVideoOptionsMenu,
// //     hideVideoOptionsMenu,
// //     copyVideoUrl,
// //     downloadVideo,
// //     loadProductsForVideo,
// //     toggleProductSelection,
// //     saveVideoProducts,
// //     showVideoPlayerModal,
// //     hideVideoPlayerModal
// //   } = useVideoGallery();

// //   // COMPLETELY SEPARATE STATE FOR TAG PRODUCTS MODAL
// //   const [showTagProductsModal, setShowTagProductsModal] = useState({
// //     show: false,
// //     video: null
// //   });

// //   // SEPARATE state for tag products data (not sharing with products modal)
// //   const [tagProductsData, setTagProductsData] = useState({
// //     products: [],
// //     selectedProducts: new Set(),
// //     loading: false
// //   });

// //   // Handler for tag products button click - COMPLETELY SEPARATE
// //   const handleTagProducts = async (video, event) => {
// //     console.log('Opening tag products modal for video:', video.id);
    
// //     // Set loading state
// //     setTagProductsData(prev => ({
// //       ...prev,
// //       loading: true
// //     }));
    
// //     // Open the modal immediately
// //     setShowTagProductsModal({
// //       show: true,
// //       video: video
// //     });

// //     // Load products separately (not using the shared loadProductsForVideo)
// //     try {
// //       const response = await fetch('/api/products');
// //       const result = await response.json();
      
// //       if (result.success) {
// //         setTagProductsData(prev => ({
// //           ...prev,
// //           products: result.products || [],
// //           loading: false
// //         }));
// //       } else {
// //         console.error('Failed to load products for tagging');
// //         setTagProductsData(prev => ({
// //           ...prev,
// //           loading: false
// //         }));
// //       }
// //     } catch (error) {
// //       console.error('Error loading products for tagging:', error);
// //       setTagProductsData(prev => ({
// //         ...prev,
// //         loading: false
// //       }));
// //     }
// //   };

// //   // Handler for hiding tag products modal - COMPLETELY SEPARATE
// //   const handleHideTagProducts = () => {
// //     console.log('Closing tag products modal');
// //     setShowTagProductsModal({
// //       show: false,
// //       video: null
// //     });
// //     // Reset the tag products data when modal closes
// //     setTagProductsData({
// //       products: [],
// //       selectedProducts: new Set(),
// //       loading: false
// //     });
// //   };

// //   // SEPARATE handler for toggling product selection in tag products modal
// //   const handleToggleTagProduct = (productId) => {
// //     setTagProductsData(prev => {
// //       const newSelectedProducts = new Set(prev.selectedProducts);
// //       if (newSelectedProducts.has(productId)) {
// //         newSelectedProducts.delete(productId);
// //       } else {
// //         newSelectedProducts.add(productId);
// //       }
// //       return {
// //         ...prev,
// //         selectedProducts: newSelectedProducts
// //       };
// //     });
// //   };

// //   // SEPARATE handler for saving products in tag products modal
// //   const handleSaveTagProducts = async () => {
// //     if (!showTagProductsModal.video?.id) return;

// //     try {
// //       const response = await fetch('/api/videoproducts', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           videoId: showTagProductsModal.video.id,
// //           productIds: Array.from(tagProductsData.selectedProducts)
// //         })
// //       });

// //       const result = await response.json();
      
// //       if (result.success) {
// //         showToast('Products tagged successfully!', 'success');
// //         handleHideTagProducts();
// //       } else {
// //         showToast('Failed to tag products', 'error');
// //       }
// //     } catch (error) {
// //       console.error('Error saving tagged products:', error);
// //       showToast('Error saving products', 'error');
// //     }
// //   };

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

// //         <VideoGrid
// //           mediaFiles={mediaFiles}
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
// //         />
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
// //         onHideProductsModal={() => {
// //           setShowProductsModal({ show: false, video: null });
// //           setSelectedProducts(new Set());
// //         }}
// //         isDarkTheme={isDarkTheme}
// //         showVideoPlayerModal={showVideoPlayerModal}
        
// //         // SEPARATE props for tag products modal
// //         showTagProductsModal={showTagProductsModal}
// //         onHideTagProductsModal={handleHideTagProducts}
// //         tagProductsData={tagProductsData}
// //         onToggleTagProduct={handleToggleTagProduct}
// //         onSaveTagProducts={handleSaveTagProducts}
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
// import { useVideoGallery } from "../components/videogallerycomponents/hooks/useVideoGallery";

// // Loader function required by React Router
// export async function loader({ request }) {
//   return { 
//     message: "Video Gallery Loaded",
//     timestamp: new Date().toISOString()
//   };
// }

// export default function VideoGallery() {
//   const {
//     // State
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

//   // SEPARATE STATE FOR VIDEO OPTIONS MODAL
//   const [showVideoOptions, setShowVideoOptions] = useState({
//     show: false,
//     video: null
//   });

//   // SEPARATE STATE FOR TAG PRODUCTS MODAL
//   const [showTagProductsModal, setShowTagProductsModal] = useState({
//     show: false,
//     video: null
//   });

//   // Handler for video options menu (when video is clicked)
//   const showVideoOptionsMenu = (video, event) => {
//     setShowVideoOptions({
//       show: true,
//       video: video
//     });
//   };

//   const hideVideoOptionsMenu = () => {
//     setShowVideoOptions({
//       show: false,
//       video: null
//     });
//   };

//   // SEPARATE handler for tag products button
//   const handleTagProducts = (video, event) => {
//     console.log('Opening tag products modal for video:', video.id);
//     setShowTagProductsModal({
//       show: true,
//       video: video
//     });
//   };

//   const handleHideTagProducts = () => {
//     setShowTagProductsModal({
//       show: false,
//       video: null
//     });
//   };

//   // Theme styles for local use
//   const themeStyles = {
//     light: {
//       background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
//       cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
//       text: '#1f2937',
//       mutedText: '#6b7280',
//       border: '1px solid #e2e8f0',
//       shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//       inputBackground: 'white'
//     },
//     dark: {
//       background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
//       cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
//       text: '#f8fafc',
//       mutedText: '#94a3b8',
//       border: '1px solid #475569',
//       shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
//       inputBackground: '#374151'
//     }
//   };

//   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

//   // Detect theme from document
//   useEffect(() => {
//     const checkTheme = () => {
//       setIsDarkTheme(document.documentElement.classList.contains('dark'));
//     };

//     checkTheme();
    
//     const observer = new MutationObserver(checkTheme);
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ['class']
//     });

//     return () => observer.disconnect();
//   }, []);

//   // Load media files on component mount
//   useEffect(() => {
//     loadMediaFiles();
//   }, []);

//   // Refresh media files when upload modal closes
//   useEffect(() => {
//     if (!showHomepageMedia) {
//       loadMediaFiles();
//     }
//   }, [showHomepageMedia]);

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
//           onCancel={() => {
//             setBulkDeleteMode(false);
//             setSelectedVideos(new Set());
//           }}
//         />
//       )}

//       {/* Uploaded Media Section */}
//       <div style={{
//         background: currentTheme.cardBackground,
//         borderRadius: '16px',
//         padding: '2rem',
//         border: currentTheme.border,
//         boxShadow: currentTheme.shadow,
//         marginBottom: '2rem',
//         animation: 'fadeIn 0.6s ease-out 0.2s both'
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '1.5rem'
//         }}>
//           <h2 style={{
//             fontSize: '1.5rem',
//             fontWeight: 'bold',
//             color: currentTheme.text
//           }}>
//             📁 Your Uploaded Media
//             <span style={{
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               color: 'white',
//               padding: '0.25rem 0.75rem',
//               borderRadius: '20px',
//               fontSize: '0.875rem',
//               marginLeft: '0.5rem'
//             }}>
//               {mediaFiles.length}
//             </span>
//           </h2>
//           <div style={{ display: 'flex', gap: '1rem' }}>
//             {mediaFiles.length > 0 && (
//               <button
//                 onClick={() => setBulkDeleteMode(!bulkDeleteMode)}
//                 style={{
//                   background: bulkDeleteMode ? '#6b7280' : '#f59e0b',
//                   color: 'white',
//                   border: 'none',
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '8px',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease'
//                 }}
//               >
//                 {bulkDeleteMode ? '✕ Cancel Bulk Delete' : '🗑️ Bulk Delete'}
//               </button>
//             )}
//             <button
//               onClick={() => setShowHomepageMedia(true)}
//               style={{
//                 background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
//                 color: 'white',
//                 border: 'none',
//                 padding: '0.75rem 1.5rem',
//                 borderRadius: '8px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               📤 Upload New Media
//             </button>
//           </div>
//         </div>

//         <VideoGrid
//           mediaFiles={mediaFiles}
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
//           onShowOptions={showVideoOptionsMenu} // Video click → options menu
//           onTagProducts={handleTagProducts} // Tag products button → tag products modal
//           onDelete={showDeleteConfirmation}
//           onVideoClick={showVideoPlayerModal}
//           onUploadClick={() => setShowHomepageMedia(true)}
//         />
//       </div>

//       {/* Modals */}
//       <Modals
//         showVideoOptions={showVideoOptions}
//         showProductsModal={showProductsModal}
//         showDeleteModal={showDeleteModal}
//         showBulkDeleteModal={showBulkDeleteModal}
//         products={products}
//         selectedProducts={selectedProducts}
//         selectedVideos={selectedVideos}
//         loadingProducts={loadingProducts}
//         onHideVideoOptions={hideVideoOptionsMenu}
//         onCopyUrl={copyVideoUrl}
//         onDownload={downloadVideo}
//         onLoadProducts={loadProductsForVideo}
//         onDelete={deleteVideo}
//         onHideDeleteModal={() => setShowDeleteModal({ show: false, videoId: null, videoTitle: '' })}
//         onBulkDelete={bulkDeleteVideos}
//         onHideBulkDeleteModal={() => setShowBulkDeleteModal(false)}
//         onToggleProduct={toggleProductSelection}
//         onSaveProducts={saveVideoProducts}
//         onHideProductsModal={() => {
//           setShowProductsModal({ show: false, video: null });
//           setSelectedProducts(new Set());
//         }}
//         isDarkTheme={isDarkTheme}
//         showVideoPlayerModal={showVideoPlayerModal}
//         // SEPARATE props for tag products modal
//         showTagProductsModal={showTagProductsModal}
//         onHideTagProductsModal={handleHideTagProducts}
//       />

//       {/* Video Player Modal */}
//       {showVideoPlayer?.show && showVideoPlayer.video && (
//         <VideoPlayerModal
//           showVideoPlayer={showVideoPlayer}
//           onHide={hideVideoPlayerModal}
//           videoData={showVideoPlayer.video}
//           isDarkTheme={isDarkTheme}
//         />
//       )}

//       {/* Homepage Media Modal */}
//       {showHomepageMedia && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.5)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000,
//           padding: '2rem'
//         }}>
//           <div style={{
//             background: isDarkTheme ? '#1f2937' : 'white',
//             borderRadius: '16px',
//             padding: '0',
//             maxWidth: '900px',
//             width: '100%',
//             maxHeight: '90vh',
//             overflow: 'auto',
//             position: 'relative'
//           }}>
//             <button
//               onClick={() => setShowHomepageMedia(false)}
//               style={{
//                 position: 'absolute',
//                 top: '1rem',
//                 right: '1rem',
//                 background: isDarkTheme ? '#374151' : 'white',
//                 border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
//                 fontSize: '1.5rem',
//                 cursor: 'pointer',
//                 color: isDarkTheme ? '#9ca3af' : '#6b7280',
//                 zIndex: 1001,
//                 width: '40px',
//                 height: '40px',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = isDarkTheme ? '#374151' : 'white';
//               }}
//             >
//               ✕
//             </button>
//             <HomepageMedia />
//           </div>
//         </div>
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
//       `}</style>
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
import { useVideoGallery } from "../components/videogallerycomponents/hooks/useVideoGallery";

// Loader function required by React Router
export async function loader({ request }) {
  return { 
    message: "Video Gallery Loaded",
    timestamp: new Date().toISOString()
  };
}

export default function VideoGallery() {
  const {
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
    hideVideoPlayerModal
  } = useVideoGallery();

  // SEPARATE STATE FOR VIDEO OPTIONS MODAL
  const [showVideoOptions, setShowVideoOptions] = useState({
    show: false,
    video: null
  });

  // SEPARATE STATE FOR TAG PRODUCTS MODAL
  const [showTagProductsModal, setShowTagProductsModal] = useState({
    show: false,
    video: null
  });

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const videosPerPage = 12;

  // Handler for video options menu (when video is clicked)
  const showVideoOptionsMenu = (video, event) => {
    setShowVideoOptions({
      show: true,
      video: video
    });
  };

  const hideVideoOptionsMenu = () => {
    setShowVideoOptions({
      show: false,
      video: null
    });
  };

  // SEPARATE handler for tag products button
  const handleTagProducts = (video, event) => {
    console.log('Opening tag products modal for video:', video.id);
    setShowTagProductsModal({
      show: true,
      video: video
    });
  };

  const handleHideTagProducts = () => {
    setShowTagProductsModal({
      show: false,
      video: null
    });
  };

  // Filter media files based on search term
  const filteredMediaFiles = mediaFiles.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalVideos = filteredMediaFiles.length;
  const totalPages = Math.ceil(totalVideos / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredMediaFiles.slice(startIndex, startIndex + videosPerPage);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Theme styles for local use
  const themeStyles = {
    light: {
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      text: '#1f2937',
      mutedText: '#6b7280',
      border: '1px solid #e2e8f0',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      inputBackground: 'white'
    },
    dark: {
      background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
      cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
      text: '#f8fafc',
      mutedText: '#94a3b8',
      border: '1px solid #475569',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      inputBackground: '#374151'
    }
  };

  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  // Detect theme from document
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };

    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Load media files on component mount
  useEffect(() => {
    loadMediaFiles();
  }, []);

  // Refresh media files when upload modal closes
  useEffect(() => {
    if (!showHomepageMedia) {
      loadMediaFiles();
    }
  }, [showHomepageMedia]);

  return (
    <VideoGalleryLayout 
      isDarkTheme={isDarkTheme}
      toast={toast}
    >
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
      <div style={{
        background: currentTheme.cardBackground,
        borderRadius: '16px',
        padding: '2rem',
        border: currentTheme.border,
        boxShadow: currentTheme.shadow,
        marginBottom: '2rem',
        animation: 'fadeIn 0.6s ease-out 0.2s both'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: currentTheme.text
          }}>
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
          <div style={{ display: 'flex', gap: '1rem' }}>
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
                {bulkDeleteMode ? '✕ Cancel Bulk Delete' : '🗑️ Bulk Delete'}
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

        {/* Search Bar */}
        {mediaFiles.length > 0 && (
          <div style={{
            marginBottom: '1.5rem',
            maxWidth: '400px'
          }}>
            <input
              type="text"
              placeholder="Search videos by title..."
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
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = currentTheme.border;
                e.target.style.boxShadow = 'none';
              }}
            />
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
          onShowOptions={showVideoOptionsMenu} // Video click → options menu
          onTagProducts={handleTagProducts} // Tag products button → tag products modal
          onDelete={showDeleteConfirmation}
          onVideoClick={showVideoPlayerModal}
          onUploadClick={() => setShowHomepageMedia(true)}
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2rem',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                background: currentPage === 1 ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: currentPage === 1 ? 0.6 : 1
              }}
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    background: currentPage === page ? '#3b82f6' : 'transparent',
                    color: currentPage === page ? 'white' : currentTheme.text,
                    border: `1px solid ${currentPage === page ? '#3b82f6' : currentTheme.border}`,
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    minWidth: '2.5rem'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== page) {
                      e.target.style.background = isDarkTheme ? '#374151' : '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== page) {
                      e.target.style.background = 'transparent';
                    }
                  }}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                background: currentPage === totalPages ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: currentPage === totalPages ? 0.6 : 1
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
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        )}
      </div>

      {/* Modals */}
      <Modals
        showVideoOptions={showVideoOptions}
        showProductsModal={showProductsModal}
        showDeleteModal={showDeleteModal}
        showBulkDeleteModal={showBulkDeleteModal}
        products={products}
        selectedProducts={selectedProducts}
        selectedVideos={selectedVideos}
        loadingProducts={loadingProducts}
        onHideVideoOptions={hideVideoOptionsMenu}
        onCopyUrl={copyVideoUrl}
        onDownload={downloadVideo}
        onLoadProducts={loadProductsForVideo}
        onDelete={deleteVideo}
        onHideDeleteModal={() => setShowDeleteModal({ show: false, videoId: null, videoTitle: '' })}
        onBulkDelete={bulkDeleteVideos}
        onHideBulkDeleteModal={() => setShowBulkDeleteModal(false)}
        onToggleProduct={toggleProductSelection}
        onSaveProducts={saveVideoProducts}
        onHideProductsModal={() => {
          setShowProductsModal({ show: false, video: null });
          setSelectedProducts(new Set());
        }}
        isDarkTheme={isDarkTheme}
        showVideoPlayerModal={showVideoPlayerModal}
        // SEPARATE props for tag products modal
        showTagProductsModal={showTagProductsModal}
        onHideTagProductsModal={handleHideTagProducts}
      />

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
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: isDarkTheme ? '#1f2937' : 'white',
            borderRadius: '16px',
            padding: '0',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowHomepageMedia(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: isDarkTheme ? '#374151' : 'white',
                border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: isDarkTheme ? '#9ca3af' : '#6b7280',
                zIndex: 1001,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = isDarkTheme ? '#4b5563' : '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = isDarkTheme ? '#374151' : 'white';
              }}
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