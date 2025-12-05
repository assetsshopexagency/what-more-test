// components/videogallerycomponents/BulkDeleteControls.jsx
export default function BulkDeleteControls({
  selectedVideos,
  mediaFiles,
  isDarkTheme,
  onSelectAll,
  onBulkDelete,
  onCancel
}) {
  // This component now correctly shows "Deselect All" when all videos are selected
  // and "Select All" when not all videos are selected

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 shadow-lg mb-8 flex items-center justify-between animate-fade-in`}>
      <div className="flex items-center gap-4">
        <button
          onClick={onSelectAll}
          className="bg-transparent border border-gray-500 dark:border-gray-400 text-gray-900 dark:text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          {selectedVideos.size === mediaFiles.length ? 'Deselect All' : 'Select All'}
        </button>
        <span className="text-gray-600 dark:text-gray-300">
          Selected ({selectedVideos.size})
        </span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onBulkDelete}
          className="bg-red-500 hover:bg-red-600 text-white border-none px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-200"
        >
          🗑️ Remove Selected
        </button>
        <button
          onClick={onCancel}
          className="bg-transparent border border-gray-500 dark:border-gray-400 text-gray-900 dark:text-white px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}