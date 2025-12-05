// components/videogallerycomponents/Modals.jsx
import VideoOptionsModal from './VideoOptionsModal';
import ProductsModal from './ProductsModal';
import TagProductsModal from './TagProducts';
export default function Modals({
  showVideoOptions,
  onHideVideoOptions,
  showProductsModal,
  showDeleteModal,
  showBulkDeleteModal,
  products = [],
  selectedProducts = new Set(),
  selectedVideos = new Set(),
  loadingProducts = false,
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
  showTagProductsModal,
  onHideTagProductsModal,
  productsModalOpened,
  closeProductsModal,
  setSelectedProductsBatch,
  onRefreshProducts
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
        onRefreshProducts={onRefreshProducts}
      />
      {/* Tag Products Modal - opens ONLY when tag products button is clicked */}
      {showTagProductsModal && (
        <TagProductsModal
          showTagProducts={showTagProductsModal}
          onHide={onHideTagProductsModal}
          onLoadProducts={onLoadProducts}
          isDarkTheme={isDarkTheme}
          onSaveProducts={onSaveProducts}
          productsModalOpened={showProductsModal.show}
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
          setSelectedProductsBatch={setSelectedProductsBatch}
        />
      )}
      {/* Single Delete Modal */}
      {showDeleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full`}>
            <h3 className={`${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-4`}>
              Confirm Delete
            </h3>
            <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Are you sure you want to delete ? This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={onHideDeleteModal}
                className="bg-gray-500 hover:bg-gray-600 text-white border-none px-6 py-3 rounded-lg cursor-pointer transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(showDeleteModal.videoId)}
                className="bg-red-500 hover:bg-red-600 text-white border-none px-6 py-3 rounded-lg cursor-pointer transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bulk Delete Modal */}
      {showBulkDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full`}>
            <h3 className={`${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-4`}>
              Confirm Bulk Delete
            </h3>
            <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Are you sure you want to delete selected videos? This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={onHideBulkDeleteModal}
                className="bg-gray-500 hover:bg-gray-600 text-white border-none px-6 py-3 rounded-lg cursor-pointer transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onBulkDelete}
                className="bg-red-500 hover:bg-red-600 text-white border-none px-6 py-3 rounded-lg cursor-pointer transition-all duration-200"
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