// components/videogallerycomponents/VideoPlayerWithHover.jsx
import { useState, useRef, useEffect } from "react";

export default function VideoPlayerWithHover({ 
  videoUrl, 
  thumbnailUrl, 
  title, 
  onVideoClick, 
  isDarkTheme,
  height = "200px"
}) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && videoUrl) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log('Auto-play failed:', error);
          setHasError(true);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isHovered, videoUrl]);

  const handleVideoError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  const handleVideoLoad = () => {
    setHasError(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        background: isDarkTheme ? '#374151' : '#f3f4f6',
        cursor: 'pointer',
        height: height
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onVideoClick}
    >
      {hasError || !videoUrl ? (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDarkTheme ? '#9ca3af' : '#6b7280',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ fontSize: '2rem' }}>🎬</div>
          <div style={{ fontSize: '0.75rem' }}>Video Preview</div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          muted
          loop
          playsInline
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
        />
      )}
      
      {/* Play overlay */}
      {!isPlaying && !hasError && videoUrl && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            ▶️
          </div>
        </div>
      )}
    </div>
  );
}