// components/videogallerycomponents/VideoOptionsModal.jsx
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect, useRef } from "react";
import ProductsModal from "./ProductsModal";
import VideoPlayerWithHover from "./VideoPlayerWithHover";

export default function VideoOptionsModal({
  showVideoOptions,
  onHide,
  onCopyUrl,
  onDownload,
  onLoadProducts,
  onDelete,
  isDarkTheme,
  selectedProducts,
  products,
  onToggleProduct,
  onSaveProducts,
  showVideoPlayerModal,
  productsModalOpened,
  closeProductsModal,
  onProductsReordered,
}) {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
  const [items, setItems] = useState([]);
  const [enableStatuses, setEnableStatuses] = useState({});
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
  const productsModalOpenedRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  // Sortable Product Card Component
  const SortableProductCard = ({ product, onRemove }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: product.video_product_id || product.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`
          flex items-center gap-3 p-3 mb-2 rounded-lg relative
          ${isDarkTheme ? "bg-gray-700" : "bg-white"}
          ${isDragging ? "opacity-50 cursor-grabbing" : "cursor-grab"}
        `}
        {...attributes}
        {...listeners}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-7 h-7 rounded-md object-cover"
          />
        ) : (
          <div className="w-7 h-7 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs font-bold">
            P
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div
            className={`
            font-medium whitespace-nowrap overflow-hidden text-ellipsis
            ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
          `}
          >
            {product.title}
          </div>
          <div className="text-green-500 text-sm">${product.price}</div>

          {/* Enable Video on Product Page Checkbox */}
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={enableStatuses[product.id] || false}
              onChange={() =>
                toggleEnableStatus(
                  product.id,
                  enableStatuses[product.id] || false,
                )
              }
              className="w-3.5 h-3.5 cursor-pointer"
            />
            <label
              className={`
              text-xs cursor-pointer
              ${isDarkTheme ? "text-gray-300" : "text-gray-700"}
            `}
            >
              Enable Video on Product Page
            </label>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(product.shopify_product_id || product.id);
          }}
          className="bg-transparent border-none text-red-500 cursor-pointer p-1 rounded text-xs flex items-center justify-center w-5 h-5 hover:bg-red-500 hover:text-white transition-colors duration-200"
          title="Remove product"
        >
          ✕
        </button>
      </div>
    );
  };

  // Handle modal state properly
  const handleHideProductsModal = () => {
    if (closeProductsModal) {
      closeProductsModal();
    }
    productsModalOpenedRef.current = false;

    setTimeout(() => {
      fetchSavedProducts();
      if (onProductsReordered) {
        onProductsReordered();
      }
    }, 300);
  };

  // Update handleRemoveProduct to update both states
  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(
        `/api/video-products/${showVideoOptions.video.id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        },
      );

      const result = await response.json();

      if (result.success) {
        setSavedProducts((prev) =>
          prev.filter(
            (product) =>
              product.shopify_product_id !== productId &&
              product.id !== productId,
          ),
        );
        setItems((prev) =>
          prev.filter(
            (product) =>
              product.shopify_product_id !== productId &&
              product.id !== productId,
          ),
        );
        setEnableStatuses((prev) => {
          const newStatuses = { ...prev };
          delete newStatuses[productId];
          return newStatuses;
        });
        console.log("✅ Product removed successfully");
      } else {
        console.error("Failed to remove product:", result.error);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => (item.video_product_id || item.id) === active.id,
        );
        const newIndex = items.findIndex(
          (item) => (item.video_product_id || item.id) === over.id,
        );

        const newItems = arrayMove(items, oldIndex, newIndex);
        saveProductOrder(newItems);
        return newItems;
      });
    }
  }

  // Fetch saved products when modal opens or video changes
  useEffect(() => {
    if (showVideoOptions.show && showVideoOptions.video?.id) {
      fetchSavedProducts();
      fetchEnableStatuses();
    } else {
      setItems([]);
    }
  }, [showVideoOptions.show, showVideoOptions.video?.id]);

  // Auto-refresh when productsModalOpened becomes false
  useEffect(() => {
    if (
      !productsModalOpened &&
      showVideoOptions.show &&
      showVideoOptions.video?.id
    ) {
      fetchSavedProducts();
      fetchEnableStatuses();
    }
  }, [productsModalOpened, showVideoOptions.show, showVideoOptions.video?.id]);

  const fetchSavedProducts = async () => {
    try {
      setIsLoadingSavedProducts(true);
      const response = await fetch(
        `/api/video-products/${showVideoOptions.video.id}`,
      );
      const result = await response.json();

      if (result.success) {
        setSavedProducts(result.products);
        setItems(result.products);
        console.log(
          "✅ Loaded saved products for display:",
          result.products.length,
        );
      } else {
        console.error("Failed to fetch saved products:", result.error);
        setSavedProducts([]);
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching saved products:", error);
      setSavedProducts([]);
      setItems([]);
    } finally {
      setIsLoadingSavedProducts(false);
    }
  };

  const saveProductOrder = async (orderedProducts) => {
    try {
      const productOrder = orderedProducts.map((product, index) => ({
        productId: product.shopify_product_id || product.id,
        position: index + 1,
      }));

      const response = await fetch(
        `/api/video-products/${showVideoOptions.video.id}/reorder`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productOrder }),
        },
      );

      const result = await response.json();

      if (result.success) {
        console.log("✅ Product order saved successfully");
      } else {
        console.error("Failed to save product order:", result.error);
      }
    } catch (error) {
      console.error("Error saving product order:", error);
    }
  };

  // Fetch enable statuses for all products in this video
  const fetchEnableStatuses = async () => {
    try {
      const response = await fetch(
        `/api/videooptionsmodal-enableoption?videoId=${showVideoOptions.video.id}`,
      );
      const result = await response.json();

      if (result.success) {
        const statusMap = {};
        result.data.forEach((item) => {
          statusMap[item.product_id] = item.status;
        });
        setEnableStatuses(statusMap);
        console.log("✅ Loaded enable statuses:", statusMap);
      } else {
        console.error("Failed to fetch enable statuses:", result.error);
        setEnableStatuses({});
      }
    } catch (error) {
      console.error("Error fetching enable statuses:", error);
      setEnableStatuses({});
    }
  };

  // Toggle enable status for a product
  const toggleEnableStatus = async (productId, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      const response = await fetch("/api/videooptionsmodal-enableoption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: showVideoOptions.video.id,
          productId: productId,
          status: newStatus,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setEnableStatuses((prev) => ({
          ...prev,
          [productId]: newStatus,
        }));
        console.log(`✅ Enable status updated to: ${newStatus}`);
      } else {
        console.error("Failed to update enable status:", result.error);
      }
    } catch (error) {
      console.error("Error updating enable status:", error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  const handleOptionClick = (action) => {
    action();
    onHide();
  };

  // FIXED: Apply the full-screen video modal approach from your code
  const handleVideoClick = () => {
    setShowFullScreenVideo(true);
  };

  const handleCloseFullScreenVideo = () => {
    setShowFullScreenVideo(false);
  };

  // Handle modal state properly
  const handleAddProducts = async () => {
    if (isLoadingProducts || productsModalOpened) {
      console.log("⚠️ Modal already opening or opened, skipping");
      return;
    }

    setIsLoadingProducts(true);

    try {
      if (onLoadProducts) {
        await onLoadProducts(showVideoOptions.video);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleSaveProducts = async () => {
    if (onSaveProducts) {
      await onSaveProducts();
    }
  };

  // Early return should be AFTER all hooks
  if (!showVideoOptions.show) return null;

  // Get the correct video URL
  const videoUrl =
    showVideoOptions.video?.videoUrl ||
    showVideoOptions.video?.shopify_file_url;

  // Determine button text based on multiple states
  const getAddProductsButtonText = () => {
    if (isLoadingProducts) return "Loading Products...";
    if (productsModalOpened) return "Opening...";
    return "Add Products";
  };

  return (
    <>
      {/* APPLIED: Full Screen Video Modal from your code */}
      {showFullScreenVideo && videoUrl && (
        <div
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-[10003] p-4"
          onClick={handleCloseFullScreenVideo}
        >
          <video
            src={videoUrl}
            controls
            autoPlay
            className="max-w-[90%] max-h-[90%] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div
          className={`
          rounded-xl p-10 max-w-4xl w-full max-h-[90vh] z-50
          overflow-auto animate-scale-in flex flex-row justify-between items-start gap-10 relative
          ${
            isDarkTheme
              ? "bg-gray-800 border border-gray-600 shadow-2xl"
              : "bg-white border border-gray-200 shadow-2xl"
          }
        `}
        >
          {/* Close Button */}
          <button
            onClick={onHide}
            className={`
              absolute top-6 right-6 rounded-full w-10 h-10
              flex items-center justify-center cursor-pointer text-xl font-bold
              transition-all duration-300 z-50
              ${
                isDarkTheme
                  ? "bg-gray-700 border border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-gray-200"
                  : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
            `}
          >
            ✕
          </button>

          {/* Left Column - Video Player & Analytics */}
          <div className="flex-1 min-w-[350px] flex flex-col gap-8 relative">
            {/* Vertical Line Separator */}
            <div
              className={`
              absolute -right-5 top-0 bottom-0 w-px z-10
              ${isDarkTheme ? "bg-gray-600" : "bg-gray-300"}
            `}
            />

            {/* Video Player Section */}
            <div className="flex-0">
              <h3
                className={`
                text-lg font-semibold mb-5
                ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
              `}
              >
                Selected Video
              </h3>

              {/* Video Player with Hover - Now clickable for full screen */}
              {videoUrl ? (
                <div className="relative">
                  <div
                    className="w-full h-64 flex justify-center items-center rounded-xl overflow-hidden cursor-pointer"
                    onClick={handleVideoClick}
                  >
                    <VideoPlayerWithHover
                      videoUrl={videoUrl}
                      thumbnailUrl={showVideoOptions.video?.thumbnail_url}
                      title={showVideoOptions.video?.title}
                      onVideoClick={handleVideoClick}
                      isDarkTheme={isDarkTheme}
                      height="250px"
                      width="100%"
                      objectFit="contain"
                    />
                  </div>
                  {/* Watch Full Video Button */}
                  <button
                    onClick={handleVideoClick}
                    className={`
                      absolute bottom-3 left-1/2 transform -translate-x-1/2
                      bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium
                      backdrop-blur-sm transition-all duration-300 hover:bg-black/80 hover:scale-105
                      flex items-center gap-2
                    `}
                  >
                    <span>▶️</span>
                    Watch Full Video
                  </button>
                </div>
              ) : (
                <div
                  className={`
                  h-64 rounded-xl flex items-center justify-center flex-col gap-3
                  ${isDarkTheme ? "text-gray-400" : "text-gray-500"}
                `}
                >
                  <div className="text-3xl">🎬</div>
                  <div className="text-base">Video not available</div>
                </div>
              )}
            </div>

            {/* Analytics Section */}
            <div
              className={`
              rounded-xl p-4 border
              ${isDarkTheme ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"}
            `}
            >
              <h4
                className={`
                text-sm font-semibold mb-3 flex items-center gap-2
                ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
              `}
              >
                <span className={isDarkTheme ? "invert" : ""}>▦</span>
                Video Analytics
              </h4>

              {/* Added Date */}
              <div
                className={`
                flex items-center gap-2 mb-3 text-xs
                ${isDarkTheme ? "text-gray-400" : "text-gray-500"}
              `}
              >
                <span className="font-medium">Added in Homepage</span>
                <span>•</span>
                <span>
                  Added on -{" "}
                  {new Date(
                    showVideoOptions.video?.created_at || Date.now(),
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>

              {/* Analytics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Video Clicks */}
                <div
                  className={`
                  rounded-lg p-3 border text-center
                  ${isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"}
                `}
                >
                  <div
                    className={`
                    text-xl font-bold mb-1
                    ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                  `}
                  >
                    5
                  </div>
                  <div
                    className={`
                    text-xs font-medium
                    ${isDarkTheme ? "text-gray-400" : "text-gray-500"}
                  `}
                  >
                    Video Clicks
                  </div>
                </div>

                {/* Watch Time */}
                <div
                  className={`
                  rounded-lg p-3 border text-center
                  ${isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"}
                `}
                >
                  <div
                    className={`
                    text-xl font-bold mb-1
                    ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                  `}
                  >
                    0 sec
                  </div>
                  <div
                    className={`
                    text-xs font-medium
                    ${isDarkTheme ? "text-gray-400" : "text-gray-500"}
                  `}
                  >
                    Watch Time
                  </div>
                </div>

                {/* Engaged Sessions */}
                <div
                  className={`
                  rounded-lg p-3 border text-center
                  ${isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"}
                `}
                >
                  <div
                    className={`
                    text-xl font-bold mb-1
                    ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                  `}
                  >
                    0
                  </div>
                  <div
                    className={`
                    text-xs font-medium
                    ${isDarkTheme ? "text-gray-400" : "text-gray-500"}
                  `}
                  >
                    Engaged Sessions
                  </div>
                </div>

                {/* Products Tagged */}
                <div
                  className={`
                  rounded-lg p-3 border text-center
                  ${isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"}
                `}
                >
                  <div
                    className={`
                    text-xl font-bold mb-1
                    ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                  `}
                  >
                    {savedProducts.length}
                  </div>
                  <div
                    className={`
                    text-xs font-medium
                    ${isDarkTheme ? "text-gray-400" : "text-gray-500"}
                  `}
                  >
                    Products Tagged
                  </div>
                </div>
              </div>

              {/* Stories Settings */}
              <div
                className={`
                flex items-center justify-between p-3 rounded border
                ${isDarkTheme ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"}
              `}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 cursor-pointer"
                  />
                  <span
                    className={`
                    text-xs font-medium
                    ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                  `}
                  >
                    Stories Settings
                  </span>
                </div>
                <button
                  className={`
                  bg-transparent border-none cursor-pointer text-base
                  ${isDarkTheme ? "text-gray-400" : "text-gray-500"}
                `}
                >
                  ⚙️
                </button>
              </div>
            </div>

            {/* Video Actions Section */}
            <div className="flex justify-between items-center gap-4 mt-4">
              <button
                onClick={() =>
                  handleOptionClick(() =>
                    onCopyUrl(showVideoOptions.video.shopify_file_url),
                  )
                }
                title="Copy Video URL"
                className={`
                  bg-transparent border-none rounded-xl text-lg font-medium cursor-pointer
                  transition-all duration-200 flex items-center justify-center w-11 h-11 opacity-80
                  hover:scale-110 hover:opacity-100
                  ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                `}
              >
                <img
                  src="/link.png"
                  alt="Copy Link"
                  className={`w-5 h-5 ${isDarkTheme ? "" : "invert"}`}
                />
              </button>
              <button
                onClick={() =>
                  handleOptionClick(() => onDownload(showVideoOptions.video))
                }
                title="Download Video"
                className={`
                  bg-transparent border-none rounded-xl text-lg font-medium cursor-pointer
                  transition-all duration-200 flex items-center justify-center w-11 h-11 opacity-80
                  hover:scale-110 hover:opacity-100
                  ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                `}
              >
                <img
                  src="/download.png"
                  alt="Download"
                  className={`w-5 h-5 ${isDarkTheme ? "" : "invert"}`}
                />
              </button>
              <button
                onClick={() =>
                  handleOptionClick(() =>
                    onDelete(
                      showVideoOptions.video.id,
                      showVideoOptions.video.title,
                    ),
                  )
                }
                title="Delete Video"
                className="bg-transparent border-none text-red-500 rounded-xl text-lg font-medium cursor-pointer transition-all duration-200 flex items-center justify-center w-11 h-11 opacity-80 hover:scale-110 hover:opacity-100"
              >
                <img src="/trash.png" alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column - Products Section */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-7 h-full overflow-hidden">
            {/* Products Section */}
            <div className="flex flex-col h-full gap-5">
              <h3
                className={`
                text-lg font-semibold
                ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
              `}
              >
                Product Management
              </h3>

              <button
                onClick={handleAddProducts}
                disabled={isLoadingProducts || productsModalOpened}
                className={`
                  w-full py-4 rounded-xl font-medium transition-colors duration-200 h-12
                  ${
                    isLoadingProducts || productsModalOpened
                      ? "bg-gray-400 cursor-not-allowed opacity-60"
                      : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  }
                `}
              >
                {getAddProductsButtonText()}
              </button>

              {/* Saved Products Section */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <div
                  className={`
                  text-sm font-semibold mb-3
                  ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                `}
                >
                  Saved Products {items.length > 0 && `(${items.length})`}
                </div>

                {isLoadingSavedProducts ? (
                  <div
                    className={`
                    text-center py-5 text-sm border rounded-xl h-16 flex items-center justify-center
                    ${
                      isDarkTheme
                        ? "text-gray-300 border-gray-600 bg-gray-900"
                        : "text-gray-700 border-gray-300 bg-gray-50"
                    }
                  `}
                  >
                    Loading saved products...
                  </div>
                ) : items.length > 0 ? (
                  <div
                    className={`
                    flex-1 overflow-y-auto border rounded-xl p-3 max-h-64
                    ${
                      isDarkTheme
                        ? "border-gray-600 bg-gray-900"
                        : "border-gray-300 bg-gray-50"
                    }
                  `}
                  >
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      modifiers={[
                        restrictToVerticalAxis,
                        restrictToParentElement,
                      ]}
                    >
                      <SortableContext
                        items={items.map(
                          (item) => item.video_product_id || item.id,
                        )}
                        strategy={verticalListSortingStrategy}
                      >
                        {items.map((product) => (
                          <SortableProductCard
                            key={product.video_product_id || product.id}
                            product={product}
                            onRemove={handleRemoveProduct}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                ) : (
                  <div
                    className={`
                    text-center py-5 text-sm italic border border-dashed rounded-xl h-16 flex items-center justify-center
                    ${
                      isDarkTheme
                        ? "text-gray-400 border-gray-600 bg-gray-900"
                        : "text-gray-500 border-gray-300 bg-gray-50"
                    }
                  `}
                  >
                    No products saved for this video
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
