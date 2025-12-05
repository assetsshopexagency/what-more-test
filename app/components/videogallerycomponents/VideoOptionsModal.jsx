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
    onRefreshProducts,
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
    const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasProductChanged, setHasProductChanged] = useState(false);
    const [selectedForRemove, setSelectedForRemove] = useState(new Set());
    const [initialSelected, setInitialSelected] = useState(new Set());
    const [wasProductsModalOpen, setWasProductsModalOpen] = useState(false);
    const productsModalOpenedRef = useRef(false);
    const videoRef = useRef(null);
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
    function setsEqual(setA, setB) {
        if (setA.size !== setB.size) return false;
        for (const item of setA) {
            if (!setB.has(item)) return false;
        }
        return true;
    }
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
                    {isMarkedForRemoval ? "↶" : <img src="/trash.png" className="w-5 h-3" style={{ color: 'red' }} />}
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

        // Remove the product from the items list on the spot
        setItems(prev => prev.filter(product =>
            (product.shopify_product_id || product.id) !== productId
        ));

        // Remove from savedProducts as well
        setSavedProducts(prev => prev.filter(product =>
            (product.shopify_product_id || product.id) !== productId
        ));

        // Update enableStatuses to remove the product
        setEnableStatuses(prev => {
            const newStatuses = { ...prev };
            delete newStatuses[productId];
            return newStatuses;
        });

        // Remove from pendingStatusChanges if present
        setPendingStatusChanges(prev => {
            const newPending = { ...prev };
            delete newPending[productId];
            return newPending;
        });

        // Update hasProductChanged state
        setHasProductChanged(true);
    };
    const handleRestoreProduct = (productId) => {
        setPendingRemovals(prev => {
            const newSet = new Set(prev);
            newSet.delete(productId);
            return newSet;
        });

        // Find the original product from originalItems and restore it
        const originalProduct = originalItems.find(item =>
            (item.shopify_product_id || item.id) === productId
        );

        if (originalProduct) {
            // Restore to items list
            setItems(prev => [...prev, originalProduct]);

            // Restore to savedProducts
            setSavedProducts(prev => [...prev, originalProduct]);

            // Restore enable status
            const originalStatus = originalEnableStatuses[productId];
            if (originalStatus !== undefined) {
                setEnableStatuses(prev => ({
                    ...prev,
                    [productId]: originalStatus
                }));
            }
        }
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
            const videoId = showVideoOptions.video.id;
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

                // Update original items after successful save
                setOriginalItems([...items]);
                setOriginalEnableStatuses({ ...enableStatuses });

                setPendingStatusChanges({});
                setPendingRemovals(new Set());
                setPendingReorder([]);
                showSuccess("All changes saved successfully");

                // Refresh data from server
                fetchSavedProducts();
                fetchEnableStatuses();
                if (onRefreshProducts) {
                    onRefreshProducts();
                }
            } else {
                showSuccess("Failed to save changes. Please try again.");
            }
        } catch (error) {
            showSuccess("Error saving changes. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleSelectAllForRemove = () => {
        const allIds = items.map(item => item.shopify_product_id || item.id);
        setSelectedForRemove(new Set(allIds));
    };
    const handleDeselectAllForRemove = () => {
        setSelectedForRemove(new Set());
    };
    const handleRemoveSelected = () => {
        if (selectedForRemove.size > 0) {
            selectedForRemove.forEach(id => handlePendingRemove(id));
            setHasProductChanged(true);
            setSelectedForRemove(new Set());
        }
    };
    const handleHideProductsModal = () => {
        if (closeProductsModal) {
            closeProductsModal();
        }
        productsModalOpenedRef.current = false;
        // Refresh saved products when ProductsModal closes
        setTimeout(() => {
            fetchSavedProducts();
            fetchEnableStatuses();
            if (onRefreshProducts) {
                onRefreshProducts();
            }
        }, 300);
    };
    const handleCloseModal = () => {
        if (onRefreshProducts && hasProductChanged) {
            onRefreshProducts();
        }
        onHide();
    };
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            if (onRefreshProducts && hasProductChanged) {
                onRefreshProducts();
            }
            onHide();
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
                const reorderChange = newItems.map((item, index) => ({
                    productId: item.shopify_product_id || item.id,
                    position: index,
                }));
                setPendingReorder(reorderChange);
                return newItems;
            });
        }
    }

    // Track when ProductsModal was opened/closed
    useEffect(() => {
        if (productsModalOpened) {
            setWasProductsModalOpen(true);
        } else if (wasProductsModalOpen) {
            // ProductsModal just closed - refresh data
            fetchSavedProducts();
            fetchEnableStatuses();
            setWasProductsModalOpen(false);
        }
    }, [productsModalOpened]);

    // Initial data fetch when modal opens
    useEffect(() => {
        if (showVideoOptions.show && showVideoOptions.video?.id) {
            fetchSavedProducts();
            fetchEnableStatuses();
            setPendingStatusChanges({});
            setPendingRemovals(new Set());
            setPendingReorder([]);
            setHasProductChanged(false);
            setWasProductsModalOpen(false);
        } else {
            setItems([]);
        }
    }, [showVideoOptions.show, showVideoOptions.video?.id]);

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
                `/api/videooptionsmodal-enableoption?videoId=${showVideoOptions.video.id}`,
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
    const handleVideoClick = () => {
        setShowFullScreenVideo(true);
    };
    const handleCloseFullScreenVideo = () => {
        setShowFullScreenVideo(false);
    };
    const handleAddProducts = async () => {
        if (isLoadingProducts || productsModalOpened) {
            return;
        }
        setInitialSelected(new Set(selectedProducts));
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
            const currentSelected = new Set(selectedProducts);
            const isChanged = !setsEqual(initialSelected, currentSelected);
            if (isChanged) {
                // Refresh saved products after saving
                setTimeout(() => {
                    fetchSavedProducts();
                    fetchEnableStatuses();
                }, 500);
                setHasProductChanged(true);
            }
        }
    };
    if (!showVideoOptions.show) return null;
    const videoUrl =
        showVideoOptions.video?.videoUrl ||
        showVideoOptions.video?.shopify_file_url;
    const getAddProductsButtonText = () => {
        if (isLoadingProducts) return "Loading Products...";
        if (productsModalOpened) return "Opening...";
        return "Add Products";
    };
    const hasPendingChanges = Object.keys(pendingStatusChanges).length > 0 ||
        pendingRemovals.size > 0 ||
        pendingReorder.length > 0;
    return (
        <>
            {showFullScreenVideo && videoUrl && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
                    onClick={handleCloseFullScreenVideo}
                >
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        controls
                        autoPlay
                        className="max-w-[90%] max-h-[90%] rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
            {showSuccessMessage && (
                <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in-right">
                    <div className="flex items-center gap-2">
                        <span>✅</span>
                        <span className="font-medium">{successMessage}</span>
                    </div>
                </div>
            )}
            <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4"
                onClick={handleBackdropClick}
            >
                <div
                    className={`relative flex flex-row justify-between items-start gap-6 rounded-xl border shadow-lg p-6 max-w-4xl min-w-[800px] max-h-[90vh] min-h-[500px] overflow-auto animate-scale-in ${isDarkTheme
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
                    <div className="flex-1 min-w-[350px] flex flex-col gap-6 relative">
                        <div>
                            <h3 className={`text-lg font-semibold mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'
                                }`}>
                                Selected Video
                            </h3>
                            {videoUrl ? (
                                <div
                                    className="w-full h-64 flex justify-center items-center rounded-lg overflow-hidden cursor-pointer relative bg-transparent"
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
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onCopyUrl(showVideoOptions.video.shopify_file_url);
                                            }}
                                            title="Copy Video URL"
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent border-none text-white opacity-80 backdrop-blur transition-all hover:scale-110 hover:opacity-100"
                                        >
                                            <img
                                                src="/link.png"
                                                alt="Copy Link"
                                                className="w-5 h-5 invert"
                                            />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDownload(showVideoOptions.video);
                                            }}
                                            title="Download Video"
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent border-none text-white opacity-80 backdrop-blur transition-all hover:scale-110 hover:opacity-100"
                                        >
                                            <img
                                                src="/download.png"
                                                alt="Download"
                                                className="w-5 h-5 invert"
                                            />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(
                                                    showVideoOptions.video.id,
                                                    showVideoOptions.video.title,
                                                );
                                            }}
                                            title="Delete Video"
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent border-none text-white opacity-80 backdrop-blur transition-all hover:scale-110 hover:opacity-100"
                                        >
                                            <img
                                                src="/trash.png"
                                                alt="Delete"
                                                className="w-5 h-5 invert-0 brightness-0"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-64 bg-transparent rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 flex-col gap-3">
                                    <div className="text-2xl">🎬</div>
                                    <div>Video not available</div>
                                </div>
                            )}
                        </div>
                        <div
                            className={`rounded-lg p-4 border ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                                }`}
                        >
                            <h4
                                className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'
                                    }`}
                            >
                                <span className={isDarkTheme ? 'invert' : ''}>▦</span>
                                Video Analytics
                            </h4>
                            <div className="flex items-center gap-2 mb-3 text-gray-500 dark:text-gray-400 text-xs">
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
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div
                                    className={`rounded-md p-3 border text-center ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <div className={`text-xl font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        5
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        Video Clicks
                                    </div>
                                </div>
                                <div
                                    className={`rounded-md p-3 border text-center ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <div className={`text-xl font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        0 sec
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        Watch Time
                                    </div>
                                </div>
                                <div
                                    className={`rounded-md p-3 border text-center ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <div className={`text-xl font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        0
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        Engaged Sessions
                                    </div>
                                </div>
                                <div
                                    className={`rounded-md p-3 border text-center ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <div className={`text-xl font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {savedProducts.length}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        Products Tagged
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`flex items-center justify-between p-2 rounded border ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="w-3.5 h-3.5 cursor-pointer"
                                    />
                                    <span
                                        className={`text-xs font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'
                                            }`}
                                    >
                                        Stories Settings
                                    </span>
                                </div>
                                <button
                                    className="bg-transparent border-none text-gray-500 dark:text-gray-400 cursor-pointer text-base"
                                >
                                    ⚙️
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute left-1/2 top-10 bottom-10 w-px bg-gray-300 dark:bg-gray-600 z-10 transform -translate-x-1/2"
                    />
                    <div className="flex-1 min-w-[300px] flex flex-col gap-5 h-full overflow-hidden">
                        <div className="flex flex-col h-full gap-4">
                            <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'
                                }`}>
                                Product Management
                            </h3>
                            <button
                                onClick={handleAddProducts}
                                disabled={isLoadingProducts || productsModalOpened}
                                className={`w-full bg-green-500 text-white border-none py-3 rounded-lg text-sm font-medium transition-all h-12 ${isLoadingProducts || productsModalOpened
                                    ? 'cursor-not-allowed opacity-60'
                                    : 'cursor-pointer hover:bg-green-600'
                                    }`}
                            >
                                {getAddProductsButtonText()}
                            </button>
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <div className={`text-sm font-semibold mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    Saved Products {items.length > 0 && `(${items.length})`}
                                </div>
                                {isLoadingSavedProducts ? (
                                    <div
                                        className={`text-center p-5 border rounded-lg ${isDarkTheme
                                            ? 'text-white border-gray-600 bg-gray-800'
                                            : 'text-gray-900 border-gray-200 bg-gray-50'
                                            } h-20 flex items-center justify-center`}
                                    >
                                        Loading saved products...
                                    </div>
                                ) : items.length > 0 ? (
                                    <>
                                        <div
                                            className={`flex-1 overflow-y-auto border rounded-lg p-3 max-h-64 ${isDarkTheme
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
                                                        />
                                                    ))}
                                                </SortableContext>
                                            </DndContext>
                                        </div>
                                        <div>
                                            <div className="flex gap-2">
                                            </div>
                                        </div>
                                        <div className={`w-full h-px bg-gray-300 dark:bg-gray-600 mt-4 mb-4`}></div> {/* DIVIDER */}
                                        {hasPendingChanges && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleConfirmChanges}
                                                    disabled={isSubmitting}
                                                    className={`flex-1 text-white border-none py-3 rounded-lg text-sm font-medium transition-all h-12 ${isSubmitting
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : 'bg-green-500 cursor-pointer hover:bg-green-600'
                                                        }`}
                                                >
                                                    {isSubmitting ? "Saving..." : "Confirm Changes"}
                                                </button>
                                                <button
                                                    onClick={handleCancelChanges}
                                                    disabled={isSubmitting}
                                                    className={`flex-1 bg-gray-500 text-white border-none py-3 rounded-lg text-sm font-medium transition-all h-12 ${isSubmitting
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
                                            } h-20 flex items-center justify-center`}
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
