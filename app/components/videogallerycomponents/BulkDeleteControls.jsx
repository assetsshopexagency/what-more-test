// components/videogallerycomponents/BulkDeleteControls.jsx
export default function BulkDeleteControls({
    selectedVideos,
    mediaFiles,
    isDarkTheme,
    onSelectAll,
    onBulkDelete,
    onCancel
  }) {
    const themeStyles = {
      light: {
        cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        text: '#1f2937',
        mutedText: '#6b7280',
        border: '1px solid #e2e8f0',
        shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      dark: {
        cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
        text: '#f8fafc',
        mutedText: '#94a3b8',
        border: '1px solid #475569',
        shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }
    };
  
    const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;
  
    return (
      <div style={{
        background: currentTheme.cardBackground,
        borderRadius: '12px',
        padding: '1.5rem',
        border: currentTheme.border,
        boxShadow: currentTheme.shadow,
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onSelectAll}
            style={{
              background: 'transparent',
              border: `1px solid ${currentTheme.mutedText}`,
              color: currentTheme.text,
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {selectedVideos.size === mediaFiles.length ? 'Deselect All' : 'Select All'}
          </button>
          <span style={{ color: currentTheme.mutedText }}>
            {selectedVideos.size} videos selected
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
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
            🗑️ Delete Selected ({selectedVideos.size})
          </button>
          <button
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: `1px solid ${currentTheme.mutedText}`,
              color: currentTheme.text,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }