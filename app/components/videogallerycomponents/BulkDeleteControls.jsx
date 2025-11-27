// components/videogallerycomponents/BulkDeleteControls.jsx
export default function BulkDeleteControls({
  selectedVideos,
  mediaFiles,
  isDarkTheme,
  onSelectAll,
  onBulkDelete,
  onCancel,
}) {
  return (
    <div
      className={`
      rounded-xl p-6 mb-8 flex items-center justify-between animate-fade-in
      ${
        isDarkTheme
          ? "bg-gradient-to-br from-gray-700 to-gray-600 border border-gray-500 shadow-xl"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg"
      }
    `}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onSelectAll}
          className={`
            bg-transparent border py-2 px-4 rounded-lg cursor-pointer transition-all duration-200
            ${
              isDarkTheme
                ? "border-gray-500 text-white hover:border-primary hover:bg-primary/10"
                : "border-gray-400 text-gray-700 hover:border-primary hover:bg-primary/5"
            }
          `}
        >
          {selectedVideos.size === mediaFiles.length
            ? "Deselect All"
            : "Select All"}
        </button>
        <span className={isDarkTheme ? "text-gray-400" : "text-gray-600"}>
          {selectedVideos.size} videos selected
        </span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onBulkDelete}
          className="bg-red-500 text-white border-none py-3 px-6 rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-red-600 hover:shadow-lg hover:transform hover:-translate-y-0.5"
        >
          🗑️ Delete Selected ({selectedVideos.size})
        </button>
        <button
          onClick={onCancel}
          className={`
            bg-transparent border py-3 px-6 rounded-lg cursor-pointer transition-all duration-200
            ${
              isDarkTheme
                ? "border-gray-500 text-white hover:border-gray-400 hover:bg-gray-600"
                : "border-gray-400 text-gray-700 hover:border-gray-500 hover:bg-gray-100"
            }
          `}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
