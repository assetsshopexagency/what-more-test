// components/videogallerycomponents/VideoPlayerWithHover.jsx
import { useState, useRef, useEffect } from "react";

export default function VideoPlayerWithHover({
  videoUrl,
  thumbnailUrl,
  title,
  onVideoClick,
  isDarkTheme,
  height = "200px",
}) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && videoUrl) {
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Auto-play failed:", error);
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
      className={`relative rounded-lg overflow-hidden cursor-pointer ${
        isDarkTheme ? "bg-gray-700" : "bg-gray-100"
      }`}
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onVideoClick}
    >
      {hasError || !videoUrl ? (
        <div
          className={`w-full h-full flex items-center justify-center flex-col gap-2 ${
            isDarkTheme ? "text-gray-400" : "text-gray-500"
          }`}
        >
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
        <div
          className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white/90 rounded-full w-12 h-12 flex items-center justify-center text-xl">
            ▶️
          </div>
        </div>
      )}
    </div>
  );
}
