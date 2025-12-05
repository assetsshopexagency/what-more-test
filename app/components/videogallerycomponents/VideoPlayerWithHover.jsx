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
      className={`rounded-lg overflow-hidden ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'} cursor-pointer h-48`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onVideoClick}
    >
      {hasError || !videoUrl ? (
        <div className={`w-full h-full flex items-center justify-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} flex-col gap-2`}>
          <div className="text-2xl">🎬</div>
          <div className="text-sm">Video Preview</div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
        />
      )}

      {/* Play overlay */}
      {!isPlaying && !hasError && videoUrl && (
        <div className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-${isHovered ? '100' : '0'} transition-opacity duration-300`}>
          <div className="bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center text-xl">
            ▶️
          </div>
        </div>
      )}
    </div>
  );
}










