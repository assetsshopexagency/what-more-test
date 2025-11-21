// // components/videogallerycomponents/VideoPlayerModal.jsx
// import { useState, useEffect } from "react";

// export default function VideoPlayerModal({
//   showVideoPlayer,
//   onHide,
//   videoData,
//   isDarkTheme
// }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Close modal on escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         onHide();
//       }
//     };

//     if (showVideoPlayer.show) {
//       document.addEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'hidden'; // Prevent background scrolling
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'unset';
//     };
//   }, [showVideoPlayer.show, onHide]);

//   if (!showVideoPlayer.show) return null;

//   const themeStyles = {
//     light: {
//       background: 'rgba(0, 0, 0, 0.8)',
//       modalBackground: '#ffffff',
//       text: '#1f2937',
//       mutedText: '#6b7280',
//       border: '#e5e7eb',
//       closeButton: '#6b7280',
//       closeButtonHover: '#374151'
//     },
//     dark: {
//       background: 'rgba(0, 0, 0, 0.9)',
//       modalBackground: '#1f2937',
//       text: '#f9fafb',
//       mutedText: '#d1d5db',
//       border: '#374151',
//       closeButton: '#9ca3af',
//       closeButtonHover: '#e5e7eb'
//     }
//   };

//   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

//   const handleVideoLoad = () => {
//     setIsLoading(false);
//     setError(null);
//   };

//   const handleVideoError = () => {
//     setIsLoading(false);
//     setError('Failed to load video');
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onHide();
//     }
//   };

//   return (
//     <div 
//       className="video-player-modal-backdrop"
//       onClick={handleBackdropClick}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: currentTheme.background,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 10000,
//         padding: '2rem',
//         backdropFilter: 'blur(8px)'
//       }}
//     >
//       <div 
//         className="video-player-modal"
//         style={{
//           background: currentTheme.modalBackground,
//           borderRadius: '16px',
//           padding: '0',
//           maxWidth: '90vw',
//           width: 'auto',
//           maxHeight: '90vh',
//           height: 'auto',
//           position: 'relative',
//           boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
//           border: `1px solid ${currentTheme.border}`,
//           overflow: 'hidden',
//           animation: 'scaleIn 0.3s ease-out'
//         }}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onHide}
//           style={{
//             position: 'absolute',
//             top: '1rem',
//             right: '1rem',
//             background: 'rgba(0, 0, 0, 0.7)',
//             border: 'none',
//             borderRadius: '50%',
//             width: '40px',
//             height: '40px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: 'pointer',
//             color: 'white',
//             fontSize: '1.25rem',
//             fontWeight: 'bold',
//             zIndex: 10,
//             transition: 'all 0.3s ease'
//           }}
//           onMouseOver={(e) => {
//             e.target.style.background = 'rgba(0, 0, 0, 0.9)';
//             e.target.style.transform = 'scale(1.1)';
//           }}
//           onMouseOut={(e) => {
//             e.target.style.background = 'rgba(0, 0, 0, 0.7)';
//             e.target.style.transform = 'scale(1)';
//           }}
//         >
//           ✕
//         </button>

//         {/* Video Container */}
//         <div style={{
//           position: 'relative',
//           width: '100%',
//           height: '100%'
//         }}>
//           {/* Loading State */}
//           {isLoading && (
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               background: currentTheme.modalBackground,
//               zIndex: 2
//             }}>
//               <div style={{
//                 textAlign: 'center',
//                 color: currentTheme.text
//               }}>
//                 <div style={{
//                   width: '40px',
//                   height: '40px',
//                   border: `3px solid ${currentTheme.border}`,
//                   borderTop: `3px solid ${currentTheme.mutedText}`,
//                   borderRadius: '50%',
//                   animation: 'spin 1s linear infinite',
//                   margin: '0 auto 1rem'
//                 }}></div>
//                 <p>Loading video...</p>
//               </div>
//             </div>
//           )}

//           {/* Error State */}
//           {error && (
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               background: currentTheme.modalBackground,
//               zIndex: 2,
//               color: '#ef4444',
//               textAlign: 'center',
//               padding: '2rem'
//             }}>
//               <div>
//                 <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
//                 <h3 style={{ marginBottom: '0.5rem' }}>Failed to load video</h3>
//                 <p style={{ color: currentTheme.mutedText }}>Please try again later</p>
//               </div>
//             </div>
//           )}

//           {/* Video Element */}
//           <video
//             controls
//             autoPlay
//             style={{
//               width: '100%',
//               height: '100%',
//               maxWidth: '80vw',
//               maxHeight: '80vh',
//               display: error ? 'none' : 'block',
//               borderRadius: '8px'
//             }}
//             onLoadStart={() => setIsLoading(true)}
//             onLoadedData={handleVideoLoad}
//             onCanPlay={handleVideoLoad}
//             onError={handleVideoError}
//           >
//             <source src={videoData?.shopify_file_url} type="video/mp4" />
//             <source src={videoData?.shopify_file_url} type="video/webm" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         {/* Video Info Footer */}
//         {videoData?.title && (
//           <div style={{
//             padding: '1.5rem',
//             borderTop: `1px solid ${currentTheme.border}`,
//             background: currentTheme.modalBackground
//           }}>
//             <h3 style={{
//               color: currentTheme.text,
//               margin: '0 0 0.5rem 0',
//               fontSize: '1.1rem',
//               fontWeight: '600'
//             }}>
//               {videoData.title}
//             </h3>
//             {videoData.products && videoData.products.length > 0 && (
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 color: currentTheme.mutedText,
//                 fontSize: '0.875rem'
//               }}>
//                 <span>🏷️</span>
//                 <span>Tagged with {videoData.products.length} product(s)</span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
        
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }


// components/videogallerycomponents/VideoPlayerModal.jsx
import { useState, useRef, useEffect } from "react";

export default function VideoPlayerModal({
  showVideoPlayer,
  onHide,
  videoData,
  isDarkTheme
}) {
  // ADD THIS SAFETY CHECK AT THE TOP
  if (!showVideoPlayer || !showVideoPlayer.show || !videoData) {
    return null;
  }

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const videoSrc = videoData.videoUrl || videoData.shopify_file_url;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '2rem'
      }}
      onClick={handleBackdropClick}
    >
      <div style={{
        background: isDarkTheme ? '#1f2937' : 'white',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '90vw',
        maxHeight: '90vh',
        width: 'auto',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onHide}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: isDarkTheme ? '#374151' : 'white',
            border: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isDarkTheme ? '#9ca3af' : '#6b7280',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            zIndex: 10001
          }}
        >
          ✕
        </button>

        {/* Video Player */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          marginBottom: '1rem'
        }}>
          <video
            ref={videoRef}
            src={videoSrc}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '70vh',
              borderRadius: '8px',
              background: '#000'
            }}
            controls
            autoPlay
          />
        </div>

        {/* Video Info */}
        <div style={{
          color: isDarkTheme ? '#f9fafb' : '#1f2937',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>
            {videoData.title}
          </h3>
          <p style={{ 
            color: isDarkTheme ? '#9ca3af' : '#6b7280',
            margin: 0,
            fontSize: '0.875rem'
          }}>
            Click the video controls to play/pause
          </p>
        </div>
      </div>
    </div>
  );
}