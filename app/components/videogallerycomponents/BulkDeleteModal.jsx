// components/videogallerycomponents/BulkDeleteModal.jsx
export default function BulkDeleteModal({
  showBulkDeleteModal,
  selectedVideos,
  onBulkDelete,
  onHide
}) {
  if (!showBulkDeleteModal) return null;

  const handleCancel = (e) => {
    e.stopPropagation();
    onHide();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onBulkDelete();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Confirm Bulk Delete
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete videos? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white border-none px-6 py-3 rounded-lg font-semibold cursor-pointer transition-colors"
          >
            Yes, Delete All
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white border-none px-6 py-3 rounded-lg font-semibold cursor-pointer transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}