// components/videogallerycomponents/BulkDeleteModal.jsx
export default function BulkDeleteModal({
  showBulkDeleteModal,
  selectedVideos,
  onBulkDelete,
  onHide
}) {
  if (!showBulkDeleteModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
          Confirm Bulk Delete
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Are you sure you want to delete {selectedVideos.size} videos? This action cannot be undone.
        </p>
        <div className="modal-buttons">
          <button
            onClick={onBulkDelete}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Yes, Delete All
          </button>
          <button
            onClick={onHide}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}