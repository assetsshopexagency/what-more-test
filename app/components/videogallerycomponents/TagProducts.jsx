// components/videogallerycomponents/TagProductsModal.jsx
import { useState, useEffect } from "react";
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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TagProductsModal({
  showTagProducts,
  onHide,
  onLoadProducts,
  isDarkTheme,
  selectedProducts,
  products,
  onToggleProduct,
  onSaveProducts,
  productsModalOpened,
  closeProductsModal,
  onProductsReordered,
}) {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoadingSavedProducts, setIsLoadingSavedProducts] = useState(false);
  const [items, setItems] = useState([]);
  const [enableStatuses, setEnableStatuses] = useState({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  // Sortable Product Card Component
  const SortableProductCard = ({
    product,
    onRemove,
    isDarkTheme,
    currentTheme,
  }) => {
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

  // Save product order function
  const saveProductOrder = async (newItems) => {
    try {
      const response = await fetch(
        `/api/video-products/${showTagProducts.video.id}/reorder`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productOrder: newItems.map((item, index) => ({
              productId: item.shopify_product_id || item.id,
              position: index,
            })),
          }),
        },
      );

      const result = await response.json();
      if (result.success) {
        console.log("✅ Product order saved successfully");
        if (onProductsReordered) {
          onProductsReordered(newItems);
        }
      } else {
        console.error("Failed to save product order:", result.error);
      }
    } catch (error) {
      console.error("Error saving product order:", error);
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

  // Fetch saved products when modal opens
  useEffect(() => {
    if (showTagProducts.show && showTagProducts.video?.id) {
      console.log(
        "TagProductsModal: Fetching saved products for video:",
        showTagProducts.video.id,
      );
      fetchSavedProducts();
      fetchEnableStatuses();
    } else {
      setItems([]);
    }
  }, [showTagProducts.show, showTagProducts.video?.id]);

  const fetchSavedProducts = async () => {
    try {
      setIsLoadingSavedProducts(true);
      const response = await fetch(
        `/api/video-products/${showTagProducts.video.id}`,
      );
      const result = await response.json();

      if (result.success) {
        setSavedProducts(result.products);
        setItems(result.products);
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

  // Fetch enable statuses
  const fetchEnableStatuses = async () => {
    try {
      const response = await fetch(
        `/api/videooptionsmodal-enableoption?videoId=${showTagProducts.video.id}`,
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

  // Toggle enable status
  const toggleEnableStatus = async (productId, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      const response = await fetch("/api/videooptionsmodal-enableoption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: showTagProducts.video.id,
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

  // Remove product from video
  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(
        `/api/video-products/${showTagProducts.video.id}/delete`,
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    console.log(
      "🔄 Closing TagProductsModal WITHOUT refreshing entire page...",
    );
    onHide();
  };

  const handleSubmitProducts = async () => {
    try {
      setIsLoadingProducts(true);
      if (onLoadProducts) {
        await onLoadProducts(showTagProducts.video);
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
    if (closeProductsModal) {
      closeProductsModal();
    }
    setTimeout(() => {
      fetchSavedProducts();
      fetchEnableStatuses();
    }, 500);
  };

  if (!showTagProducts.show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center  p-4"
        onClick={handleBackdropClick}
      >
        <div
          className={`
          rounded-xl p-8 max-w-2xl w-full max-h-screen 
          overflow-hidden relative animate-scale-in
          ${
            isDarkTheme
              ? "bg-gray-800 border border-gray-600 shadow-2xl"
              : "bg-white border border-gray-200 shadow-2xl"
          }
        `}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
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

          <div className="flex flex-col gap-6 h-full overflow-hidden">
            <div className="flex flex-col h-full gap-5">
              <h3
                className={`
                text-xl font-semibold
                ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
              `}
              >
                Tag Products to Video
              </h3>

              <button
                onClick={handleSubmitProducts}
                disabled={isLoadingProducts || productsModalOpened}
                className={`
                  w-full py-3 rounded-lg font-medium transition-colors duration-200
                  ${
                    isLoadingProducts || productsModalOpened
                      ? "bg-gray-400 cursor-not-allowed opacity-60"
                      : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  }
                `}
              >
                {isLoadingProducts
                  ? "Loading Products..."
                  : productsModalOpened
                    ? "Opening..."
                    : "Add Products"}
              </button>

              {/* Saved Products Section */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <div
                  className={`
                  text-base font-semibold mb-3
                  ${isDarkTheme ? "text-gray-100" : "text-gray-900"}
                `}
                >
                  Saved Products {items.length > 0 && `(${items.length})`}
                </div>

                {isLoadingSavedProducts ? (
                  <div
                    className={`
                    text-center py-8 text-sm border rounded-lg
                    ${
                      isDarkTheme
                        ? "text-gray-300 border-gray-600 bg-gray-700"
                        : "text-gray-700 border-gray-300 bg-gray-50"
                    }
                  `}
                  >
                    Loading saved products...
                  </div>
                ) : items.length > 0 ? (
                  <div
                    className={`
                    flex-1 overflow-y-auto border rounded-lg p-3 max-h-72
                    ${
                      isDarkTheme
                        ? "border-gray-600 bg-gray-700"
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
                            isDarkTheme={isDarkTheme}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                ) : (
                  <div
                    className={`
                    text-center py-8 text-sm italic border border-dashed rounded-lg
                    ${
                      isDarkTheme
                        ? "text-gray-400 border-gray-600 bg-gray-700"
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
