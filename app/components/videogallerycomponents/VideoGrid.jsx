// components/videogallerycomponents/VideoGrid.jsx
import VideoPlayer from "./VideoPlayer";

export default function VideoGrid({
  mediaFiles,
  loading,
  selectedVideos,
  bulkDeleteMode,
  editingVideoId,
  editTitle,
  isDarkTheme,
  onVideoSelect,
  onEdit,
  onSave,
  onCancel,
  onEditTitleChange,
  onShowOptions,
  onDelete,
  onVideoClick,
  onUploadClick,
  onTagProducts,
  onViewFullVideo,
  onCopyLink,
  productRefreshTrigger, // ← NEW PROP: Triggers refresh in all cards
}) {
  const themeClasses = isDarkTheme
    ? {
        background: "bg-gradient-to-br from-gray-800 to-gray-700",
        cardBackground: "bg-gradient-to-br from-gray-700 to-gray-600",
        text: "text-gray-100",
        mutedText: "text-gray-400",
        border: "border border-gray-600",
        shadow: "shadow-xl",
      }
    : {
        background: "bg-gradient-to-br from-white to-gray-50",
        cardBackground: "bg-gradient-to-br from-white to-gray-50",
        text: "text-gray-900",
        mutedText: "text-gray-600",
        border: "border border-gray-200",
        shadow: "shadow-lg",
      };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className={`text-center py-12 ${themeClasses.mutedText}`}>
        <div className="text-3xl mb-4">Loading...</div>
        Loading your media files...
      </div>
    );
  }

  if (mediaFiles.length === 0) {
    return (
      <div
        className={`
        text-center p-12 rounded-xl border
        ${
          isDarkTheme
            ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
            : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
        }
      `}
      >
        <div className="text-4xl mb-4">📁</div>
        <h3
          className={`
          text-xl font-semibold mb-2
          ${themeClasses.text}
        `}
        >
          No Media Files Yet
        </h3>
        <p
          className={`
          mb-6
          ${themeClasses.mutedText}
        `}
        >
          Upload your first video or image to get started
        </p>
        <button
          onClick={onUploadClick}
          className="bg-gradient-to-br from-primary to-secondary text-white border-none py-3 px-6 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          Upload Your First File
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
      {mediaFiles.map((file, index) => (
        <VideoPlayer
          key={file.id}
          file={file}
          index={index}
          isSelected={selectedVideos.has(file.id)}
          onSelect={() => onVideoSelect(file.id)}
          onDelete={() => onDelete(file.id, file.title)}
          onEdit={() => onEdit(file)}
          onSave={() => onSave(file.id)}
          onCancel={onCancel}
          isEditing={editingVideoId === file.id}
          editTitle={editTitle}
          onEditTitleChange={onEditTitleChange}
          bulkDeleteMode={bulkDeleteMode}
          onShowOptions={onShowOptions}
          theme={themeClasses}
          formatDate={formatDate}
          onTagProducts={onTagProducts}
          onViewFullVideo={onViewFullVideo}
          onCopyLink={onCopyLink}
          productRefreshTrigger={productRefreshTrigger} // ← PASSED DOWN
        />
      ))}
    </div>
  );
}
