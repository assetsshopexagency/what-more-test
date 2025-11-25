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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        padding: "2rem",
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          background: isDarkTheme ? "#1f2937" : "white",
          borderRadius: "12px",
          padding: "2rem",
          maxWidth: "90vw",
          maxHeight: "90vh",
          width: "auto",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onHide}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: isDarkTheme ? "#374151" : "white",
            border: `1px solid ${isDarkTheme ? "#4b5563" : "#e5e7eb"}`,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: isDarkTheme ? "#9ca3af" : "#6b7280",
            fontSize: "1.2rem",
            fontWeight: "bold",
            zIndex: 10001,
          }}
        >
          ✕
        </button>

        {/* Video Player */}
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            marginBottom: "1rem",
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "70vh",
              borderRadius: "8px",
              background: "#000",
            }}
            controls
            autoPlay
          />
        </div>

        {/* Video Info */}
        <div
          style={{
            color: isDarkTheme ? "#f9fafb" : "#1f2937",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: isDarkTheme ? "#9ca3af" : "#6b7280",
              margin: 0,
              fontSize: "0.875rem",
            }}
          >
            Click the video controls to play/pause
          </p>
        </div>
      </div>
    </div>
  );
}
