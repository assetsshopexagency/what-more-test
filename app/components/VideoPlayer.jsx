// File: app/components/VideoPlayer.jsx
import { useState, useEffect, useRef } from "react";
import { Box, Badge, Button, Icon, InlineStack, Text } from "@shopify/polaris";

export default function VideoPlayer({ video }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current && video.shopify_file_url) {
      const playVideo = async () => {
        try {
          videoRef.current.loop = true;
          videoRef.current.muted = true;
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Auto-play failed, waiting for user interaction");
        }
      };
      
      playVideo();
    }
  }, [video.shopify_file_url]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  if (!video.shopify_file_url) {
    return (
      <Box
        background="bg-surface-secondary"
        padding="400"
        width="100%"
        height="180px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="200"
      >
        <Text tone="subdued" alignment="center">
          🎬<br />No Video URL
        </Text>
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      width="100%"
      height="180px"
      maxWidth="240px"
      margin="0 auto"
      overflow="hidden"
      borderRadius="200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleVideoClick}
      style={{ cursor: 'pointer' }}
    >
      <video
        ref={videoRef}
        src={video.shopify_file_url}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
          backgroundColor: '#000'
        }}
        muted={isMuted}
        loop
        playsInline
        preload="auto"
      />
      
      {showControls && (
        <Box position="absolute" top="8px" right="8px">
          <InlineStack gap="100" align="center">
            <Badge tone={isPlaying ? "success" : "subdued"} size="small">
              {isPlaying ? "🔴 Live" : "⏸️ Paused"}
            </Badge>
            <Button
              size="slim"
              variant="primary"
              onClick={toggleMute}
              icon={isMuted ? <Icon source="MuteMinor" /> : <Icon source="SoundMajor" />}
            />
          </InlineStack>
        </Box>
      )}
    </Box>
  );
}