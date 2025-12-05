// // components/videogallerycomponents/VideoCacheManager.jsx
// import { useState, useEffect, useRef, createContext, useContext } from 'react';

// // Create a context for video cache
// const VideoCacheContext = createContext();

// export function VideoCacheProvider({ children }) {
//     const [cache] = useState(() => {
//         // Create a simple in-memory cache
//         if (typeof window !== 'undefined') {
//             return {
//                 videos: new Map(),
//                 thumbnails: new Map(),
//                 lastAccessed: new Map(),
//                 blobUrls: new Set() // Track blob URLs for cleanup
//             };
//         }
//         return null;
//     });

//     // Clean up old cache entries periodically
//     useEffect(() => {
//         const cleanupInterval = setInterval(() => {
//             if (!cache) return;

//             const now = Date.now();
//             const maxAge = 30 * 60 * 1000; // 30 minutes

//             // Clean up old entries
//             cache.lastAccessed.forEach((timestamp, url) => {
//                 if (now - timestamp > maxAge) {
//                     // Revoke blob URLs if they exist
//                     const blobUrl = cache.videos.get(url);
//                     if (blobUrl && blobUrl.startsWith('blob:')) {
//                         URL.revokeObjectURL(blobUrl);
//                         cache.blobUrls.delete(blobUrl);
//                     }

//                     cache.videos.delete(url);
//                     cache.thumbnails.delete(url);
//                     cache.lastAccessed.delete(url);
//                 }
//             });
//         }, 5 * 60 * 1000); // Clean every 5 minutes

//         return () => clearInterval(cleanupInterval);
//     }, [cache]);

//     // Clean up all blob URLs on unmount
//     useEffect(() => {
//         return () => {
//             if (cache) {
//                 cache.blobUrls.forEach(blobUrl => {
//                     URL.revokeObjectURL(blobUrl);
//                 });
//                 cache.blobUrls.clear();
//             }
//         };
//     }, [cache]);

//     const getCachedVideo = (url) => {
//         if (!cache || !url) return null;

//         if (cache.videos.has(url)) {
//             cache.lastAccessed.set(url, Date.now());
//             return cache.videos.get(url);
//         }
//         return null;
//     };

//     const cacheVideo = (url, blob) => {
//         if (!cache || !url || !blob) return;

//         // Create blob URL
//         const blobUrl = URL.createObjectURL(blob);

//         cache.videos.set(url, blobUrl);
//         cache.blobUrls.add(blobUrl);
//         cache.lastAccessed.set(url, Date.now());

//         console.log(`✅ Video cached: ${url.substring(0, 50)}...`);
//     };

//     const preloadVideo = (url) => {
//         if (!cache || !url || cache.videos.has(url)) return;

//         console.log(`🔄 Preloading video: ${url.substring(0, 50)}...`);

//         // Use fetch with arrayBuffer to get the video
//         fetch(url, {
//             method: 'GET',
//             headers: { 'Range': 'bytes=0-1048576' } // Get first 1MB for preload
//         })
//             .then(response => {
//                 if (!response.ok) throw new Error('Failed to fetch');
//                 return response.blob();
//             })
//             .then(blob => {
//                 cacheVideo(url, blob);
//             })
//             .catch(error => {
//                 console.log(`⚠️ Failed to preload video ${url.substring(0, 50)}:`, error.message);
//             });
//     };

//     const clearCache = () => {
//         if (!cache) return;

//         // Revoke all blob URLs
//         cache.blobUrls.forEach(blobUrl => {
//             URL.revokeObjectURL(blobUrl);
//         });

//         // Clear all maps
//         cache.videos.clear();
//         cache.thumbnails.clear();
//         cache.lastAccessed.clear();
//         cache.blobUrls.clear();

//         console.log('🗑️ Video cache cleared');
//     };

//     const getCacheStats = () => {
//         if (!cache) return { videoCount: 0 };

//         return {
//             videoCount: cache.videos.size,
//             thumbnailCount: cache.thumbnails.size,
//             lastCleaned: new Date().toISOString()
//         };
//     };

//     const value = {
//         getCachedVideo,
//         cacheVideo,
//         preloadVideo,
//         clearCache,
//         getCacheStats
//     };

//     return (
//         <VideoCacheContext.Provider value={value}>
//             {children}
//         </VideoCacheContext.Provider>
//     );
// }

// // Custom hook to use video cache
// export function useVideoCache() {
//     const context = useContext(VideoCacheContext);
//     if (!context) {
//         throw new Error('useVideoCache must be used within VideoCacheProvider');
//     }
//     return context;
// }

// // Cached Video Player Component
// export function CachedVideoPlayer({
//     videoUrl,
//     thumbnailUrl,
//     className = '',
//     style = {},
//     autoPlay = false,
//     loop = true,
//     muted = true,
//     playsInline = true,
//     controls = false,
//     onLoad,
//     onError,
//     onPlay,
//     onPause,
//     onClick,
//     children,
//     ...props
// }) {
//     const videoRef = useRef(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [hasError, setHasError] = useState(false);
//     const [cachedUrl, setCachedUrl] = useState(null);
//     const { getCachedVideo, cacheVideo } = useVideoCache();

//     useEffect(() => {
//         if (!videoUrl) {
//             setIsLoading(false);
//             setHasError(true);
//             return;
//         }

//         // Check cache first
//         const cached = getCachedVideo(videoUrl);
//         if (cached) {
//             setCachedUrl(cached);
//             setIsLoading(false);
//             setHasError(false);
//             if (onLoad) onLoad();
//         } else {
//             // No cache, will load from network
//             setIsLoading(true);
//             setHasError(false);
//         }
//     }, [videoUrl, getCachedVideo, onLoad]);

//     const handleVideoLoad = () => {
//         if (videoRef.current && videoRef.current.readyState >= 3 && !cachedUrl) {
//             // Cache the video if it's loaded and not already cached
//             try {
//                 // We can't directly cache the video element's data
//                 // The actual caching happens in the preload function
//             } catch (error) {
//                 console.log('Could not cache video:', error);
//             }
//         }
//         setIsLoading(false);
//         setHasError(false);
//         if (onLoad) onLoad();
//     };

//     const handleVideoError = (error) => {
//         console.error('Video error:', error);
//         setHasError(true);
//         setIsLoading(false);
//         if (onError) onError(error);
//     };

//     const handleVideoCanPlay = () => {
//         setIsLoading(false);
//         setHasError(false);
//     };

//     const videoSource = cachedUrl || videoUrl;

//     return (
//         <div
//             className={`relative ${className}`}
//             style={style}
//             onClick={onClick}
//         >
//             {isLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
//                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//             )}

//             {hasError && !isLoading ? (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
//                     <div className="text-center">
//                         <div className="text-2xl mb-2">🎬</div>
//                         <div className="text-gray-500 dark:text-gray-400 text-sm">Video loading...</div>
//                     </div>
//                 </div>
//             ) : (
//                 <video
//                     ref={videoRef}
//                     src={videoSource}
//                     className="w-full h-full object-cover"
//                     autoPlay={autoPlay}
//                     loop={loop}
//                     muted={muted}
//                     playsInline={playsInline}
//                     controls={controls}
//                     preload="metadata"
//                     onLoadedData={handleVideoLoad}
//                     onCanPlay={handleVideoCanPlay}
//                     onError={handleVideoError}
//                     onPlay={onPlay}
//                     onPause={onPause}
//                     {...props}
//                 >
//                     {children}
//                 </video>
//             )}

//             {/* Loading overlay */}
//             {isLoading && videoSource && (
//                 <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10">
//                     <div className="text-white text-sm">Loading...</div>
//                 </div>
//             )}
//         </div>
//     );
// }

// // Video Preloader Component
// export function VideoPreloader({ videos = [] }) {
//     const { preloadVideo } = useVideoCache();

//     useEffect(() => {
//         if (videos.length > 0) {
//             console.log(`🔄 Preloading ${videos.length} videos...`);
//             videos.forEach(videoUrl => {
//                 if (videoUrl) {
//                     preloadVideo(videoUrl);
//                 }
//             });
//         }
//     }, [videos, preloadVideo]);

//     return null; // This component doesn't render anything
// }

// // Cache Stats Component (for debugging)
// export function CacheStats() {
//     const { getCacheStats } = useVideoCache();
//     const [stats, setStats] = useState({ videoCount: 0 });

//     useEffect(() => {
//         const stats = getCacheStats();
//         setStats(stats);

//         // Update stats periodically
//         const interval = setInterval(() => {
//             const newStats = getCacheStats();
//             setStats(newStats);
//         }, 10000);

//         return () => clearInterval(interval);
//     }, [getCacheStats]);

//     return (
//         <div className="fixed bottom-4 left-4 bg-black bg-opacity-70 text-white text-xs p-2 rounded z-50">
//             <div>Videos cached: {stats.videoCount}</div>
//         </div>
//     );
// }




