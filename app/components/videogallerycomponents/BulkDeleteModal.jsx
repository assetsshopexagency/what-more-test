// components/videogallerycomponents/BulkDeleteModal.jsx
export default function BulkDeleteModal({
  showBulkDeleteModal,
  selectedVideos,
  onBulkDelete,
  onHide,
}) {
  if (!showBulkDeleteModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200">
        <div className="text-center mb-2">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Confirm Bulk Delete
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <strong>{selectedVideos.size}</strong> videos?
            <br />
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onHide}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={onBulkDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}
