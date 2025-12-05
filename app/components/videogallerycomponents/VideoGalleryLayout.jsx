// components/videogallerycomponents/VideoGalleryLayout.jsx
import { useEffect, useState } from "react";

export default function VideoGalleryLayout({
  children,
  isDarkTheme,
  toast
}) {
  const [currentTheme, setCurrentTheme] = useState({});

  useEffect(() => {
    setCurrentTheme(isDarkTheme ? {
      background: 'bg-gradient-to-br from-gray-800 to-gray-900',
      cardBackground: 'bg-gradient-to-br from-gray-700 to-gray-800',
      text: 'text-white',
      mutedText: 'text-gray-300',
      border: 'border-gray-600',
      shadow: 'shadow-2xl',
      inputBackground: 'bg-gray-700'
    } : {
      background: 'bg-gradient-to-br from-white to-gray-50',
      cardBackground: 'bg-gradient-to-br from-white to-gray-50',
      text: 'text-gray-900',
      mutedText: 'text-gray-600',
      border: 'border-gray-200',
      shadow: 'shadow-lg',
      inputBackground: 'bg-white'
    });
  }, [isDarkTheme]);

  return (
    <div className={`max-w-7xl mx-auto px-4 min-h-screen ${currentTheme.background} ${currentTheme.text}`}>
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-8 right-8 z-50 px-6 py-4 rounded-lg font-semibold animate-slide-in-right ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
          {toast.message}
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8 animate-slide-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
          🎬 Video Gallery
        </h1>
        <p className={`text-lg ${currentTheme.mutedText} mb-8`}>
          Manage and organize your video content across all platforms
        </p>
      </div>

      {children}
    </div>
  );
}




