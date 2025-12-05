// app/components/videogallerycomponents/ArrangeMediaModal.jsx
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import {
    restrictToHorizontalAxis,
} from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect, useRef } from "react";

// Video Player Component for Carousel
function SortableVideoItem({ video, index, isDragging, isDarkTheme }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: video.id });

    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // Auto-play video on hover
    useEffect(() => {
        if (videoRef.current) {
            if (isHovered && !isDragging) {
                videoRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(e => {
                        console.log("Auto-play prevented:", e);
                        setIsPlaying(false);
                    });
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [isHovered, isDragging]);

    const videoSrc = video.videoUrl || video.shopify_file_url;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative flex-shrink-0 transition-all duration-200 ${isDragging ? 'opacity-50 z-10 scale-105' : 'opacity-100'
                }`}
        >
            <div
                className="relative w-40 h-80 rounded-xl overflow-hidden border-2 border-gray-300 dark:border-gray-600 cursor-grab active:cursor-grabbing group shadow-lg"
                {...attributes}
                {...listeners}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Video Player */}
                {videoSrc ? (
                    <div className="relative w-full h-full">
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            preload="metadata"
                        />
                        {!isPlaying && isHovered && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700 ml-1">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                ) : video.thumbnail_url ? (
                    <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 dark:text-gray-500">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                )}

                {/* Position Badge */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                </div>

                {/* Video Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-6">
                    <div className="text-sm text-white font-semibold truncate mb-1">
                        {video.title}
                    </div>
                    <div className="text-xs text-gray-300 flex items-center justify-between">
                        <span>
                            {new Date(video.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${isHovered ? 'bg-blue-500 text-white' : 'bg-gray-500/50 text-gray-300'}`}>
                            {isHovered ? 'Playing' : 'Hover to play'}
                        </span>
                    </div>
                </div>

                {/* Drag Hint Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
                        </svg>
                        Drag to reorder
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ArrangeMediaModal({
    showArrangeModal,
    onHide,
    mediaFiles,
    isDarkTheme,
    onArrangementSaved,
}) {
    const [items, setItems] = useState([]);
    const [originalItems, setOriginalItems] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [arrangementOption, setArrangementOption] = useState('current');

    const carouselRef = useRef(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor),
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSaveArrangement = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const arrangement = items.map((item, index) => ({
                videoId: item.id,
                position: index,
            }));

            console.log('📤 Sending arrangement to API:', arrangement);

            const response = await fetch("/api/video-arrangement", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ arrangement }),
            });

            console.log('📥 API Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('📥 API Response data:', result);

            if (result.success) {
                setOriginalItems([...items]);
                showSuccessMessage("🎉 Video arrangement saved successfully!");

                // Call the arrangement saved callback
                if (onArrangementSaved) {
                    onArrangementSaved();
                }

                // Close modal after successful save
                setTimeout(() => {
                    onHide();
                }, 1500);
            } else {
                console.error('❌ API returned error:', result.error);
                showSuccessMessage(`❌ Failed to save: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("❌ Error saving arrangement:", error);
            showSuccessMessage("❌ Error saving arrangement. Please check console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setItems([...originalItems]);
        setArrangementOption('current');
        showSuccessMessage("🔄 Arrangement reset to original");
    };

    const handleCancel = () => {
        setItems([...originalItems]);
        onHide();
    };

    const handleApplyArrangement = (option) => {
        setArrangementOption(option);

        let sortedVideos = [...items];

        switch (option) {
            case 'newest':
                sortedVideos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'oldest':
                sortedVideos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                break;
            case 'current':
            default:
                sortedVideos = [...originalItems];
                break;
        }

        setItems(sortedVideos);
        showSuccessMessage(`✅ Arranged by: ${option === 'newest' ? 'Newest First' : option === 'oldest' ? 'Oldest First' : 'Current Order'}`);
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setSuccessMessage("");
        }, 3000);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (showArrangeModal && mediaFiles.length > 0) {
            // Sort mediaFiles by position for initial display
            const sortedFiles = [...mediaFiles].sort((a, b) => a.position - b.position);
            setItems(sortedFiles);
            setOriginalItems(sortedFiles);
        }
    }, [showArrangeModal, mediaFiles]);

    if (!showArrangeModal) return null;

    const hasChanges = JSON.stringify(items.map(i => i.id)) !==
        JSON.stringify(originalItems.map(i => i.id));

    const activeVideo = activeId ? items.find(item => item.id === activeId) : null;

    return (
        <>
            {showSuccess && (
                <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in-right">
                    <div className="flex items-center gap-2">
                        <span>✅</span>
                        <span className="font-medium">{successMessage}</span>
                    </div>
                </div>
            )}

            <div
                className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
                onClick={handleBackdropClick}
            >
                <div
                    className={`relative rounded-2xl border shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col ${isDarkTheme
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                        : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header - Fixed at top */}
                    <div className="p-6 flex-shrink-0">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-gray-900"
                                    }`}>
                                    Arrange Media
                                </h2>
                            </div>
                            <button
                                onClick={handleCancel}
                                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all flex-shrink-0 ${isDarkTheme
                                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-900 shadow-sm"
                                    }`}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Arrange Options */}
                        <div className="mb-4">
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => handleApplyArrangement('current')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${arrangementOption === 'current'
                                        ? isDarkTheme
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                        : isDarkTheme
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Current Order
                                </button>
                                <button
                                    onClick={() => handleApplyArrangement('newest')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${arrangementOption === 'newest'
                                        ? isDarkTheme
                                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                                        : isDarkTheme
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Newest First
                                </button>
                                <button
                                    onClick={() => handleApplyArrangement('oldest')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${arrangementOption === 'oldest'
                                        ? isDarkTheme
                                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                                            : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                                        : isDarkTheme
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Oldest First
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - No vertical scrolling, with room for buttons */}
                    <div className="flex-1 overflow-hidden px-6">
                        {/* Carousel Container */}
                        <div className="relative h-full">
                            {/* Left Scroll Button */}
                            {items.length > 4 && (
                                <button
                                    onClick={scrollLeft}
                                    className={`absolute -left-3 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${isDarkTheme
                                        ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        } transition-all duration-300 hover:scale-110`}
                                    style={{ top: 'calc(50% - 5rem)' }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                                    </svg>
                                </button>
                            )}

                            {/* Carousel */}
                            <div className="h-full flex flex-col justify-center">
                                <div
                                    ref={carouselRef}
                                    className="overflow-x-auto scrollbar-hide"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    <div className="flex gap-6 min-w-full px-4 py-2">
                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragStart={handleDragStart}
                                            onDragEnd={handleDragEnd}
                                            modifiers={[restrictToHorizontalAxis]}
                                        >
                                            <SortableContext
                                                items={items.map((item) => item.id)}
                                                strategy={horizontalListSortingStrategy}
                                            >
                                                {items.map((video, index) => (
                                                    <SortableVideoItem
                                                        key={video.id}
                                                        video={video}
                                                        index={index}
                                                        isDragging={activeId === video.id}
                                                        isDarkTheme={isDarkTheme}
                                                    />
                                                ))}
                                            </SortableContext>

                                            {/* Drag Overlay */}
                                            <DragOverlay dropAnimation={null}>
                                                {activeVideo && (
                                                    <div className="w-40 h-80 rounded-xl overflow-hidden border-2 border-blue-500 shadow-2xl">
                                                        {activeVideo.videoUrl || activeVideo.shopify_file_url ? (
                                                            <video
                                                                src={activeVideo.videoUrl || activeVideo.shopify_file_url}
                                                                className="w-full h-full object-cover"
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                            />
                                                        ) : activeVideo.thumbnail_url ? (
                                                            <img
                                                                src={activeVideo.thumbnail_url}
                                                                alt={activeVideo.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 dark:text-gray-500">
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                                                            {items.findIndex(item => item.id === activeVideo.id) + 1}
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-6">
                                                            <div className="text-sm text-white font-semibold truncate">
                                                                {activeVideo.title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </DragOverlay>
                                        </DndContext>
                                    </div>
                                </div>
                            </div>

                            {/* Right Scroll Button */}
                            {items.length > 4 && (
                                <button
                                    onClick={scrollRight}
                                    className={`absolute -right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${isDarkTheme
                                        ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        } transition-all duration-300 hover:scale-110`}
                                    style={{ top: 'calc(50% - 5rem)' }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Action Buttons Section - Placed under videos */}
                        <div className="mt-6 pb-6">
                            {/* Save Button - Centered */}
                            <div className="flex justify-center mb-4">
                                <button
                                    onClick={handleSaveArrangement}
                                    disabled={!hasChanges || isSubmitting}
                                    className={`px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 ${!hasChanges || isSubmitting
                                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white hover:from-green-600 hover:via-green-700 hover:to-green-800"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Saving Video Order...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                                            </svg>
                                            SAVE ARRANGEMENT
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Secondary Actions */}
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleReset}
                                        disabled={!hasChanges}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${!hasChanges
                                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                            : isDarkTheme
                                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        Reset Changes
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${isDarkTheme
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className={`text-xs font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">
                                        {items.length} videos • {hasChanges ? 'Unsaved changes' : 'No changes'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
        </>
    );
}