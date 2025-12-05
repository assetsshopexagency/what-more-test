// components/videogallerycomponents/TagProducts.jsx
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
import ProductsModal from "./ProductsModal";
import VideoPlayerWithHover from "./VideoPlayerWithHover";

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
  const [pendingStatusChanges, setPendingStatusChanges] = useState({});
  const [pendingRemovals, setPendingRemovals] = useState(new Set());
  const [pendingReorder, setPendingReorder] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [originalEnableStatuses, setOriginalEnableStatuses] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProductChanged, setHasProductChanged] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setSuccessMessage("");
    }, 3000);
  };

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

    const currentStatus = product.id in pendingStatusChanges
      ? pendingStatusChanges[product.id]
      : enableStatuses[product.id] || false;

    const isMarkedForRemoval = pendingRemovals.has(product.shopify_product_id || product.id);

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-center gap-3 p-3 mb-2 rounded-lg text-sm relative transition-all ${isDragging ? 'opacity-50' : isMarkedForRemoval ? 'opacity-60' : 'opacity-100'
          } ${isMarkedForRemoval
            ? isDarkTheme ? 'bg-red-900 border-red-500' : 'bg-red-50 border-red-500'
            : isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
          } border`}
      >
        <button
          {...attributes}
          {...listeners}
          className={`flex items-center justify-center w-6 h-6 p-1 rounded transition-all ${isMarkedForRemoval
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-grab hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
            } bg-transparent border-none text-gray-500 dark:text-gray-400`}
          title="Drag to reorder"
          disabled={isMarkedForRemoval}
        >
          ⋮⋮
        </button>

        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className={`w-7 h-7 rounded object-cover ${isMarkedForRemoval ? 'opacity-50' : 'opacity-100'
              }`}
          />
        ) : (
          <div
            className={`w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold ${isMarkedForRemoval ? 'bg-red-500 opacity-50' : 'bg-blue-500'
              }`}
          >
            P
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div
            className={`font-medium whitespace-nowrap overflow-hidden text-ellipsis ${isMarkedForRemoval
              ? 'text-red-500 line-through opacity-70'
              : isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}
          >
            {product.title}
          </div>
          <div
            className={`text-green-500 text-xs ${isMarkedForRemoval ? 'opacity-70' : 'opacity-100'
              }`}
          >
            ${product.price}
          </div>

          <div
            className={`flex items-center gap-2 mt-1 ${isMarkedForRemoval ? 'opacity-50' : 'opacity-100'
              }`}
          >
            <input
              type="checkbox"
              checked={currentStatus}
              onChange={(e) => {
                if (!isMarkedForRemoval) {
                  handleCheckboxChange(product.id, currentStatus);
                }
              }}
              className="w-3.5 h-3.5 cursor-pointer"
              disabled={isMarkedForRemoval}
            />
            <label
              className={`text-xs cursor-pointer ${isMarkedForRemoval
                ? 'text-red-500 cursor-not-allowed'
                : isDarkTheme ? 'text-white' : 'text-gray-900'
                }`}
            >
              Enable Video on Product Page
            </label>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isMarkedForRemoval) {
              handleRestoreProduct(product.shopify_product_id || product.id);
            } else {
              handlePendingRemove(product.shopify_product_id || product.id);
            }
          }}
          className="flex items-center justify-center w-5 h-5 p-1 rounded bg-transparent border-none transition-all hover:bg-red-500 hover:text-white text-red-500"
          title={isMarkedForRemoval ? "Restore product" : "Remove product"}
        >
          {isMarkedForRemoval ? "↶" : <img src="/trash.png" className="w-5 h-3" />}
        </button>
      </div>
    );
  };

  const handleCheckboxChange = (productId, currentStatus) => {
    const newStatus = !currentStatus;
    setPendingStatusChanges(prev => ({
      ...prev,
      [productId]: newStatus
    }));
  };

  const handlePendingRemove = (productId) => {
    setPendingRemovals(prev => new Set([...prev, productId]));
  };

  const handleRestoreProduct = (productId) => {
    setPendingRemovals(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  const handleCancelChanges = () => {
    setItems([...originalItems]);
    setEnableStatuses({ ...originalEnableStatuses });
    setPendingStatusChanges({});
    setPendingRemovals(new Set());
    setPendingReorder([]);
    showSuccess("Changes cancelled");
  };

  const handleConfirmChanges = async () => {
    if (Object.keys(pendingStatusChanges).length === 0 &&
      pendingRemovals.size === 0 &&
      pendingReorder.length === 0) {
      showSuccess("No changes to save");
      return;
    }

    setIsSubmitting(true);

    try {
      const videoId = showTagProducts.video.id;
      const changes = {
        videoId: videoId,
        statusChanges: Object.entries(pendingStatusChanges).map(([productId, status]) => ({
          productId: parseInt(productId),
          status: status
        })),
        removals: Array.from(pendingRemovals),
        reorder: pendingReorder
      };

      const response = await fetch("/api/video-bulk-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changes),
      });

      const result = await response.json();

      if (result.success) {
        setHasProductChanged(true);

        if (pendingRemovals.size > 0) {
          setSavedProducts((prev) =>
            prev.filter(product =>
              !pendingRemovals.has(product.shopify_product_id || product.id)
            )
          );
          setItems((prev) =>
            prev.filter(product =>
              !pendingRemovals.has(product.shopify_product_id || product.id)
            )
          );
        }

        if (Object.keys(pendingStatusChanges).length > 0) {
          setEnableStatuses(prev => ({
            ...prev,
            ...pendingStatusChanges
          }));
        }

        setPendingStatusChanges({});
        setPendingRemovals(new Set());
        setPendingReorder([]);
        showSuccess("All changes saved successfully");
        fetchSavedProducts();
        fetchEnableStatuses();
      } else {
        showSuccess("Failed to save changes. Please try again.");
      }
    } catch (error) {
      showSuccess("Error saving changes. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        setPendingStatusChanges((prev) => {
          const newPending = { ...prev };
          delete newPending[productId];
          return newPending;
        });
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
        const reorderChange = newItems.map((item, index) => ({
          productId: item.shopify_product_id || item.id,
          position: index,
        }));

        setPendingReorder(reorderChange);
        return newItems;
      });
    }
  }

  useEffect(() => {
    if (showTagProducts.show && showTagProducts.video?.id) {
      fetchSavedProducts();
      fetchEnableStatuses();
      setPendingStatusChanges({});
      setPendingRemovals(new Set());
      setPendingReorder([]);
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
        setOriginalItems([...result.products]);
      } else {
        setSavedProducts([]);
        setItems([]);
        setOriginalItems([]);
      }
    } catch (error) {
      setSavedProducts([]);
      setItems([]);
      setOriginalItems([]);
    } finally {
      setIsLoadingSavedProducts(false);
    }
  };

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
        setOriginalEnableStatuses({ ...statusMap });
      } else {
        setEnableStatuses({});
        setOriginalEnableStatuses({});
      }
    } catch (error) {
      setEnableStatuses({});
      setOriginalEnableStatuses({});
    }
  };

  if (!showTagProducts.show) return null;

  const hasPendingChanges = Object.keys(pendingStatusChanges).length > 0 ||
    pendingRemovals.size > 0 ||
    pendingReorder.length > 0;

  return (
    <>
      {showSuccessMessage && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in-right">
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        <div
          className={`relative rounded-xl border shadow-lg p-6 max-w-2xl min-w-[600px] max-h-screen overflow-hidden animate-scale-in ${isDarkTheme
            ? 'bg-gray-700 border-gray-600 shadow-gray-900'
            : 'bg-white border-gray-200 shadow-gray-200'
            }`}
        >
          <button
            onClick={handleCloseModal}
            className={`absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full border transition-all z-50 ${isDarkTheme
              ? 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            ✕
          </button>

          <div className="flex flex-col gap-5 h-full overflow-hidden">
            <div className="flex flex-col h-full gap-4">
              <h3 className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'
                }`}>
                Tag Products to Video
              </h3>

              <button
                onClick={handleSubmitProducts}
                disabled={isLoadingProducts || productsModalOpened}
                className={`w-full bg-green-500 text-white border-none py-3 rounded-lg font-medium transition-all ${isLoadingProducts || productsModalOpened
                  ? 'cursor-not-allowed opacity-60'
                  : 'cursor-pointer hover:bg-green-600'
                  }`}
              >
                {isLoadingProducts
                  ? "Loading Products..."
                  : productsModalOpened
                    ? "Opening..."
                    : "Add Products"}
              </button>

              <div className="flex-1 flex flex-col overflow-hidden">
                <div className={`font-semibold mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'
                  }`}>
                  Saved Products {items.length > 0 && `(${items.length})`}
                </div>

                {isLoadingSavedProducts ? (
                  <div
                    className={`text-center p-5 border rounded-lg ${isDarkTheme
                      ? 'text-white border-gray-600 bg-gray-800'
                      : 'text-gray-900 border-gray-200 bg-gray-50'
                      }`}
                  >
                    Loading saved products...
                  </div>
                ) : items.length > 0 ? (
                  <>
                    <div
                      className={`flex-1 overflow-y-auto border rounded-lg p-3 max-h-72 ${isDarkTheme
                        ? 'border-gray-600 bg-gray-800'
                        : 'border-gray-200 bg-gray-50'
                        }`}
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
                              onRemove={handlePendingRemove}
                              isDarkTheme={isDarkTheme}
                              currentTheme={isDarkTheme ? {
                                text: "text-white",
                                background: "bg-gray-700"
                              } : {
                                text: "text-gray-900",
                                background: "bg-white"
                              }}
                            />
                          ))}
                        </SortableContext>
                      </DndContext>
                    </div>

                    {hasPendingChanges && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={handleConfirmChanges}
                          disabled={isSubmitting}
                          className={`flex-1 text-white border-none py-3 rounded-lg font-medium transition-all ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 cursor-pointer hover:bg-green-600'
                            }`}
                        >
                          {isSubmitting ? "Saving..." : "Confirm Changes"}
                        </button>
                        <button
                          onClick={handleCancelChanges}
                          disabled={isSubmitting}
                          className={`flex-1 bg-gray-500 text-white border-none py-3 rounded-lg font-medium transition-all ${isSubmitting
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer hover:bg-gray-600'
                            }`}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className={`text-center p-5 text-gray-500 dark:text-gray-400 italic border border-dashed rounded-lg ${isDarkTheme
                      ? 'border-gray-600 bg-gray-800'
                      : 'border-gray-200 bg-gray-50'
                      }`}
                  >
                    No products saved for this video
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}