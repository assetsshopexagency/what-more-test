// // File: app/components/VideoPlayer.jsx
// import { useState, useEffect, useRef } from "react";
// import { Box, Badge, Button, Icon, InlineStack, Text } from "@shopify/polaris";

// export default function VideoPlayer({ video }) {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showControls, setShowControls] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);

//   useEffect(() => {
//     if (videoRef.current && video.shopify_file_url) {
//       const playVideo = async () => {
//         try {
//           videoRef.current.loop = true;
//           videoRef.current.muted = true;
//           await videoRef.current.play();
//           setIsPlaying(true);
//         } catch (error) {
//           console.log("Auto-play failed, waiting for user interaction");
//         }
//       };
      
//       playVideo();
//     }
//   }, [video.shopify_file_url]);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = (e) => {
//     e.stopPropagation();
//     if (videoRef.current) {
//       videoRef.current.muted = !videoRef.current.muted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleMouseEnter = () => {
//     setShowControls(true);
//   };

//   const handleMouseLeave = () => {
//     setShowControls(false);
//   };

//   const handleVideoClick = () => {
//     togglePlay();
//   };

//   if (!video.shopify_file_url) {
//     return (
//       <Box
//         background="bg-surface-secondary"
//         padding="400"
//         width="100%"
//         height="180px"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         borderRadius="200"
//       >
//         <Text tone="subdued" alignment="center">
//           🎬<br />No Video URL
//         </Text>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       position="relative"
//       width="100%"
//       height="180px"
//       maxWidth="240px"
//       margin="0 auto"
//       overflow="hidden"
//       borderRadius="200"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onClick={handleVideoClick}
//       style={{ cursor: 'pointer' }}
//     >
//       <video
//         ref={videoRef}
//         src={video.shopify_file_url}
//         style={{
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           borderRadius: '8px',
//           backgroundColor: '#000'
//         }}
//         muted={isMuted}
//         loop
//         playsInline
//         preload="auto"
//       />
      
//       {showControls && (
//         <Box position="absolute" top="8px" right="8px">
//           <InlineStack gap="100" align="center">
//             <Badge tone={isPlaying ? "success" : "subdued"} size="small">
//               {isPlaying ? "🔴 Live" : "⏸️ Paused"}
//             </Badge>
//             <Button
//               size="slim"
//               variant="primary"
//               onClick={toggleMute}
//               icon={isMuted ? <Icon source="MuteMinor" /> : <Icon source="SoundMajor" />}
//             />
//           </InlineStack>
//         </Box>
//       )}
//     </Box>
//   );
// }




// app/components/VideoPlayer.jsx

import { useState, useEffect, useRef } from "react";

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
      <div className="bg-gray-200 p-4 w-full h-45 flex items-center justify-center rounded">
        <p className="text-gray-500 text-center">🎬<br />No Video URL</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-45 max-w-60 mx-auto overflow-hidden rounded cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleVideoClick}
    >
      <video
        ref={videoRef}
        src={video.shopify_file_url}
        className="w-full h-full object-cover rounded bg-black"
        muted={isMuted}
        loop
        playsInline
        preload="auto"
      />
      
      {showControls && (
        <div className="absolute top-2 right-2 flex gap-1 items-center">
          <span className={`text-xs px-2 py-1 rounded ${isPlaying ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
            {isPlaying ? "🔴 Live" : "⏸️ Paused"}
          </span>
          <button
            onClick={toggleMute}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            {isMuted ? "Mute" : "Sound"}
          </button>
        </div>
      )}
    </div>
  );
}