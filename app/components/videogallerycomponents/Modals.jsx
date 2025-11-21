// components/videogallerycomponents/Modals.jsx
import VideoOptionsModal from './VideoOptionsModal';
import ProductsModal from './ProductsModal';
import TagProductsModal from './TagProducts';

export default function Modals({
  showVideoOptions,
  showProductsModal,
  showDeleteModal,
  showBulkDeleteModal,
  products = [],
  selectedProducts = new Set(),
  selectedVideos = new Set(),
  loadingProducts = false,
  onHideVideoOptions,
  onCopyUrl,
  onDownload,
  onLoadProducts,
  onDelete,
  onHideDeleteModal,
  onBulkDelete,
  onHideBulkDeleteModal,
  onToggleProduct,
  onSaveProducts,
  onHideProductsModal,
  isDarkTheme,
  showVideoPlayerModal,
  // NEW: Separate props for tag products modal
  showTagProductsModal,
  onHideTagProductsModal,
  productsModalOpened,
  closeProductsModal
}) {
  return (
    <>
      {/* Video Options Modal - opens when video is clicked */}
      <VideoOptionsModal
        showVideoOptions={showVideoOptions}
        onHide={onHideVideoOptions}
        onCopyUrl={onCopyUrl}
        onDownload={onDownload}
        onLoadProducts={onLoadProducts}
        onDelete={onDelete}
        isDarkTheme={isDarkTheme}
        selectedProducts={selectedProducts}
        products={products}
        onToggleProduct={onToggleProduct}
        onSaveProducts={onSaveProducts}
        showVideoPlayerModal={showVideoPlayerModal}
        productsModalOpened={productsModalOpened}
        closeProductsModal={closeProductsModal}
      />

      {/* Tag Products Modal - opens ONLY when tag products button is clicked */}
      {showTagProductsModal && (
        <TagProductsModal
          showTagProducts={showTagProductsModal}
          onHide={onHideTagProductsModal}
          onLoadProducts={onLoadProducts}
          isDarkTheme={isDarkTheme}
          selectedProducts={selectedProducts}
          products={products}
          onToggleProduct={onToggleProduct}
          onSaveProducts={onSaveProducts}
          productsModalOpened={productsModalOpened}
          closeProductsModal={closeProductsModal}
        />
      )}

      {/* Products Modal - Shared between both VideoOptionsModal and TagProductsModal */}
      {showProductsModal.show && (
        <ProductsModal
          showProductsModal={showProductsModal}
          products={products}
          selectedProducts={selectedProducts}
          loadingProducts={loadingProducts}
          onToggleProduct={onToggleProduct}
          onSaveProducts={onSaveProducts}
          onHide={onHideProductsModal}
          isDarkTheme={isDarkTheme}
        />
      )}

      {/* Single Delete Modal */}
      {showDeleteModal.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: isDarkTheme ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h3 style={{ 
              color: isDarkTheme ? '#f9fafb' : '#1f2937',
              marginBottom: '1rem'
            }}>
              Confirm Delete
            </h3>
            <p style={{ 
              color: isDarkTheme ? '#d1d5db' : '#6b7280',
              marginBottom: '2rem'
            }}>
              Are you sure you want to delete "{showDeleteModal.videoTitle}"? This action cannot be undone.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'flex-end' 
            }}>
              <button
                onClick={onHideDeleteModal}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(showDeleteModal.videoId)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {showBulkDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: isDarkTheme ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h3 style={{ 
              color: isDarkTheme ? '#f9fafb' : '#1f2937',
              marginBottom: '1rem'
            }}>
              Confirm Bulk Delete
            </h3>
            <p style={{ 
              color: isDarkTheme ? '#d1d5db' : '#6b7280',
              marginBottom: '2rem'
            }}>
              Are you sure you want to delete {selectedVideos.size} selected videos? This action cannot be undone.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'flex-end' 
            }}>
              <button
                onClick={onHideBulkDeleteModal}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={onBulkDelete}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}