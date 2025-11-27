// components/videogallerycomponents/VideoPlayerModal.jsx
import { useState, useRef, useEffect } from "react";

export default function VideoPlayerModal({
  showVideoPlayer,
  onHide,
  videoData,
  isDarkTheme,
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
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[10000] p-8"
      onClick={handleBackdropClick}
    >
      <div
        className={`rounded-xl p-8 max-w-[90vw] max-h-[90vh] w-auto relative ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onHide}
          className={`absolute top-4 right-4 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-[10001] font-bold text-xl border ${
            isDarkTheme
              ? "bg-gray-700 border-gray-600 text-gray-400"
              : "bg-white border-gray-200 text-gray-500"
          }`}
        >
          ✕
        </button>

        {/* Video Player */}
        <div className="w-full max-w-[800px] mb-4">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-auto max-h-[70vh] rounded-lg bg-black"
            controls
            autoPlay
          />
        </div>

        {/* Video Info */}
        <div
          className={`text-center ${
            isDarkTheme ? "text-gray-100" : "text-gray-800"
          }`}
        >
          <p
            className={`text-sm m-0 ${
              isDarkTheme ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Click the video controls to play/pause
          </p>
        </div>
      </div>
    </div>
  );
}
