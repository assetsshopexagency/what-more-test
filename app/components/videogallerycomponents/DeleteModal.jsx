// components/videogallerycomponents/DeleteModal.jsx
export default function DeleteModal({
    showDeleteModal,
    onDelete,
    onHide
  }) {
    if (!showDeleteModal.show) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
            Confirm Delete
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Are you sure you want to delete "{showDeleteModal.videoTitle}"? This action cannot be undone.
          </p>
          <div className="modal-buttons">
            <button
              onClick={() => onDelete(showDeleteModal.videoId)}
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
              Yes, Delete
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