// components/videogallerycomponents/VideoGalleryLayout.jsx
import { useEffect } from "react";

export default function VideoGalleryLayout({ children, isDarkTheme, toast }) {
  const themeClasses = isDarkTheme
    ? {
        background: "bg-gradient-to-br from-gray-800 to-gray-700",
        text: "text-gray-100",
        mutedText: "text-gray-400",
        card: "bg-gradient-to-br from-gray-700 to-gray-600 border border-gray-600 shadow-xl",
      }
    : {
        background: "bg-gradient-to-br from-white to-gray-50",
        text: "text-gray-900",
        mutedText: "text-gray-600",
        card: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg",
      };

  return (
    <div
      className={`max-w-[1400px] mx-auto px-4 min-h-screen ${themeClasses.background} ${themeClasses.text}`}
    >
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`
          fixed top-8 right-8 py-4 px-6 rounded-lg font-semibold z-50
          animate-slide-in transition-all duration-300
          ${
            toast.type === "success"
              ? "bg-green-500 text-white shadow-lg"
              : "bg-red-500 text-white shadow-lg"
          }
        `}
        >
          <div className="flex items-center gap-2">
            {toast.type === "success" ? "✅" : "❌"}
            {toast.message}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8 animate-slide-in">
        <h1 className="text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-2">
          🎬 Video Gallery
        </h1>
        <p className={`text-lg ${themeClasses.mutedText} mb-8`}>
          Manage and organize your video content across all platforms
        </p>
      </div>

      {children}
    </div>
  );
}

// Additional utility classes that can be used throughout the video gallery
export const videoGalleryClasses = {
  // Card styles
  card: (isDark) => `
    rounded-xl p-6 border
    ${
      isDark
        ? "bg-gradient-to-br from-gray-700 to-gray-600 border-gray-600 shadow-xl"
        : "bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-lg"
    }
  `,

  // Button styles
  button: {
    primary:
      "bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200",
    secondary: (isDark) => `
      border font-semibold py-2 px-4 rounded-lg transition-all duration-200
      ${
        isDark
          ? "border-gray-600 text-gray-300 hover:bg-gray-600"
          : "border-gray-300 text-gray-700 hover:bg-gray-100"
      }
    `,
    danger:
      "bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200",
    success:
      "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200",
  },

  // Input styles
  input: (isDark) => `
    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200
    ${
      isDark
        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    }
  `,

  // Modal styles
  modal: {
    overlay:
      "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4",
    content: (isDark) => `
      rounded-2xl p-8 max-w-md w-full shadow-2xl border
      ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
    `,
  },

  // Video player styles
  videoPlayer: {
    container: "rounded-xl overflow-hidden bg-black relative group",
    controls:
      "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    controlBtn:
      "bg-white/90 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110",
  },

  // Checkbox styles
  checkbox: {
    wrapper: "absolute top-4 left-4 z-10",
    input:
      "w-5 h-5 rounded border-2 border-white bg-black/50 cursor-pointer checked:bg-green-500 checked:border-green-500",
  },
};
