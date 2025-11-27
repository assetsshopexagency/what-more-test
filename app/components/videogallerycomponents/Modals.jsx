// components/videogallerycomponents/Modals.jsx
import VideoOptionsModal from "./VideoOptionsModal";
import ProductsModal from "./ProductsModal";
import TagProductsModal from "./TagProducts";

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
  closeProductsModal,
  setSelectedProductsBatch,
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
          setSelectedProductsBatch={setSelectedProductsBatch}
        />
      )}

      {/* Single Delete Modal */}
      {showDeleteModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`
            rounded-xl p-8 max-w-md w-full shadow-2xl
            ${isDarkTheme ? "bg-gray-800" : "bg-white"}
          `}
          >
            <h3
              className={`
              text-lg font-semibold mb-4
              ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
            `}
            >
              Confirm Delete
            </h3>
            <p
              className={`
              mb-6
              ${isDarkTheme ? "text-gray-300" : "text-gray-600"}
            `}
            >
              Are you sure you want to delete "{showDeleteModal.videoTitle}"?
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onHideDeleteModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(showDeleteModal.videoId)}
                className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {showBulkDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`
            rounded-xl p-8 max-w-md w-full shadow-2xl
            ${isDarkTheme ? "bg-gray-800" : "bg-white"}
          `}
          >
            <h3
              className={`
              text-lg font-semibold mb-4
              ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
            `}
            >
              Confirm Bulk Delete
            </h3>
            <p
              className={`
              mb-6
              ${isDarkTheme ? "text-gray-300" : "text-gray-600"}
            `}
            >
              Are you sure you want to delete {selectedVideos.size} selected
              videos? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onHideBulkDeleteModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onBulkDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
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
