// // // // components/videogallerycomponents/VideoGrid.jsx
// // // import VideoPlayer from "./VideoPlayer";

// // // export default function VideoGrid({
// // //    mediaFiles,
// // //   loading,
// // //   selectedVideos,
// // //   bulkDeleteMode,
// // //   editingVideoId,
// // //   editTitle,
// // //   isDarkTheme,
// // //   onVideoSelect,
// // //   onEdit,
// // //   onSave,
// // //   onCancel,
// // //   onEditTitleChange,
// // //   onShowOptions,
// // //   onDelete,
// // //   onVideoClick,
// // //   onUploadClicky
// // // }) {
// // //   const themeStyles = {
// // //     light: {
// // //       cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// // //       text: '#1f2937',
// // //       mutedText: '#6b7280',
// // //       border: '1px solid #e2e8f0',
// // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
// // //     },
// // //     dark: {
// // //       cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
// // //       text: '#f8fafc',
// // //       mutedText: '#94a3b8',
// // //       border: '1px solid #475569',
// // //       shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
// // //     }
// // //   };

// // //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// // //   const formatDate = (dateString) => {
// // //     return new Date(dateString).toLocaleDateString('en-US', {
// // //       year: 'numeric',
// // //       month: 'short',
// // //       day: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     });
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div style={{ textAlign: 'center', padding: '3rem', color: currentTheme.mutedText }}>
// // //         <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
// // //         Loading your media files...
// // //       </div>
// // //     );
// // //   }

// // //   if (mediaFiles.length === 0) {
// // //     return (
// // //       <div style={{ 
// // //         textAlign: 'center', 
// // //         padding: '3rem',
// // //         background: isDarkTheme 
// // //           ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
// // //           : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
// // //         borderRadius: '12px',
// // //         border: isDarkTheme ? '1px solid #475569' : '1px solid #e2e8f0'
// // //       }}>
// // //         <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
// // //         <h3 style={{ 
// // //           fontSize: '1.25rem', 
// // //           fontWeight: '600', 
// // //           marginBottom: '0.5rem',
// // //           color: currentTheme.text
// // //         }}>
// // //           No Media Files Yet
// // //         </h3>
// // //         <p style={{ 
// // //           color: currentTheme.mutedText,
// // //           marginBottom: '1.5rem'
// // //         }}>
// // //           Upload your first video or image to get started
// // //         </p>
// // //         <button
// // //           onClick={onUploadClick}
// // //           style={{
// // //             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // //             color: 'white',
// // //             border: 'none',
// // //             padding: '0.75rem 1.5rem',
// // //             borderRadius: '8px',
// // //             fontWeight: '600',
// // //             cursor: 'pointer',
// // //             transition: 'all 0.3s ease'
// // //           }}
// // //         >
// // //           🚀 Upload Your First File
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div style={{
// // //       display: 'grid',
// // //       gridTemplateColumns: 'repeat(4, 1fr)',
// // //       gap: '1.5rem'
// // //     }}>
// // //       {mediaFiles.map((file, index) => (
// // //         <VideoPlayer 
// // //           key={file.id}
// // //           file={file}
// // //           index={index}
// // //           isSelected={selectedVideos.has(file.id)}
// // //           onSelect={() => onVideoSelect(file.id)}
// // //           onDelete={() => onDelete(file.id, file.title)}
// // //           onEdit={() => onEdit(file)}
// // //           onSave={() => onSave(file.id)}
// // //           onCancel={onCancel}
// // //           isEditing={editingVideoId === file.id}
// // //           editTitle={editTitle}
// // //           onEditTitleChange={onEditTitleChange}
// // //           bulkDeleteMode={bulkDeleteMode}
// // //           onShowOptions={onShowOptions}
// // //           theme={currentTheme}
// // //           formatDate={formatDate}
// // //         />
// // //       ))}
// // //     </div>
// // //   );
// // // }






// // // components/videogallerycomponents/VideoGrid.jsx
// // import VideoPlayer from "./VideoPlayer";

// // export default function VideoGrid({
// //   mediaFiles,
// //   loading,
// //   selectedVideos,
// //   bulkDeleteMode,
// //   editingVideoId,
// //   editTitle,
// //   isDarkTheme,
// //   onVideoSelect,
// //   onEdit,
// //   onSave,
// //   onCancel,
// //   onEditTitleChange,
// //   onShowOptions,
// //   onDelete,
// //   onVideoClick,
// //   onUploadClick,
// //   // ADD THESE NEW PROPS:
// //   onTagProducts,
// //   onViewFullVideo,
// //   onCopyLink
// // }) {
// //   const themeStyles = {
// //     light: {
// //       cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
// //       text: '#1f2937',
// //       mutedText: '#6b7280',
// //       border: '1px solid #e2e8f0',
// //       shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
// //     },
// //     dark: {
// //       cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
// //       text: '#f8fafc',
// //       mutedText: '#94a3b8',
// //       border: '1px solid #475569',
// //       shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
// //     }
// //   };

// //   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div style={{ textAlign: 'center', padding: '3rem', color: currentTheme.mutedText }}>
// //         <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
// //         Loading your media files...
// //       </div>
// //     );
// //   }

// //   if (mediaFiles.length === 0) {
// //     return (
// //       <div style={{ 
// //         textAlign: 'center', 
// //         padding: '3rem',
// //         background: isDarkTheme 
// //           ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
// //           : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
// //         borderRadius: '12px',
// //         border: isDarkTheme ? '1px solid #475569' : '1px solid #e2e8f0'
// //       }}>
// //         <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
// //         <h3 style={{ 
// //           fontSize: '1.25rem', 
// //           fontWeight: '600', 
// //           marginBottom: '0.5rem',
// //           color: currentTheme.text
// //         }}>
// //           No Media Files Yet
// //         </h3>
// //         <p style={{ 
// //           color: currentTheme.mutedText,
// //           marginBottom: '1.5rem'
// //         }}>
// //           Upload your first video or image to get started
// //         </p>
// //         <button
// //           onClick={onUploadClick}
// //           style={{
// //             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //             color: 'white',
// //             border: 'none',
// //             padding: '0.75rem 1.5rem',
// //             borderRadius: '8px',
// //             fontWeight: '600',
// //             cursor: 'pointer',
// //             transition: 'all 0.3s ease'
// //           }}
// //         >
// //           🚀 Upload Your First File
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{
// //       display: 'grid',
// //       gridTemplateColumns: 'repeat(4, 1fr)',
// //       gap: '1.5rem'
// //     }}>
// //       {mediaFiles.map((file, index) => (
// //         <VideoPlayer 
// //           key={file.id}
// //           file={file}
// //           index={index}
// //           isSelected={selectedVideos.has(file.id)}
// //           onSelect={() => onVideoSelect(file.id)}
// //           onDelete={() => onDelete(file.id, file.title)}
// //           onEdit={() => onEdit(file)}
// //           onSave={() => onSave(file.id)}
// //           onCancel={onCancel}
// //           isEditing={editingVideoId === file.id}
// //           editTitle={editTitle}
// //           onEditTitleChange={onEditTitleChange}
// //           bulkDeleteMode={bulkDeleteMode}
// //           onShowOptions={onShowOptions}
// //           theme={currentTheme}
// //           formatDate={formatDate}
// //           // PASS THE NEW PROPS TO VideoPlayer
// //           onTagProducts={onTagProducts}
// //           onViewFullVideo={onViewFullVideo}
// //           onCopyLink={onCopyLink}
// //         />
// //       ))}
// //     </div>
// //   );
// // }



// // components/videogallerycomponents/VideoGrid.jsx
// import VideoPlayer from "./VideoPlayer";

// export default function VideoGrid({
//   mediaFiles,
//   loading,
//   selectedVideos,
//   bulkDeleteMode,
//   editingVideoId,
//   editTitle,
//   isDarkTheme,
//   onVideoSelect,
//   onEdit,
//   onSave,
//   onCancel,
//   onEditTitleChange,
//   onShowOptions,
//   onDelete,
//   onVideoClick,
//   onUploadClick,
//   // ADD THESE NEW PROPS:
//   onTagProducts,
//   onViewFullVideo,
//   onCopyLink
// }) {
//   const themeStyles = {
//     light: {
//       cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
//       text: '#1f2937',
//       mutedText: '#6b7280',
//       border: '1px solid #e2e8f0',
//       shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//     },
//     dark: {
//       cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
//       text: '#f8fafc',
//       mutedText: '#94a3b8',
//       border: '1px solid #475569',
//       shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
//     }
//   };

//   const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', padding: '3rem', color: currentTheme.mutedText }}>
//         <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
//         Loading your media files...
//       </div>
//     );
//   }

//   if (mediaFiles.length === 0) {
//     return (
//       <div style={{ 
//         textAlign: 'center', 
//         padding: '3rem',
//         background: isDarkTheme 
//           ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
//           : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
//         borderRadius: '12px',
//         border: isDarkTheme ? '1px solid #475569' : '1px solid #e2e8f0'
//       }}>
//         <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
//         <h3 style={{ 
//           fontSize: '1.25rem', 
//           fontWeight: '600', 
//           marginBottom: '0.5rem',
//           color: currentTheme.text
//         }}>
//           No Media Files Yet
//         </h3>
//         <p style={{ 
//           color: currentTheme.mutedText,
//           marginBottom: '1.5rem'
//         }}>
//           Upload your first video or image to get started
//         </p>
//         <button
//           onClick={onUploadClick}
//           style={{
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             border: 'none',
//             padding: '0.75rem 1.5rem',
//             borderRadius: '8px',
//             fontWeight: '600',
//             cursor: 'pointer',
//             transition: 'all 0.3s ease'
//           }}
//         >
//           🚀 Upload Your First File
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: 'repeat(4, 1fr)',
//       gap: '1.5rem'
//     }}>
//       {mediaFiles.map((file, index) => (
//         <VideoPlayer 
//           key={file.id}
//           file={file}
//           index={index}
//           isSelected={selectedVideos.has(file.id)}
//           onSelect={() => onVideoSelect(file.id)}
//           onDelete={() => onDelete(file.id, file.title)}
//           onEdit={() => onEdit(file)}
//           onSave={() => onSave(file.id)}
//           onCancel={onCancel}
//           isEditing={editingVideoId === file.id}
//           editTitle={editTitle}
//           onEditTitleChange={onEditTitleChange}
//           bulkDeleteMode={bulkDeleteMode}
//           onShowOptions={onShowOptions}
//           theme={currentTheme}
//           formatDate={formatDate}
//           // PASS THE NEW PROPS TO VideoPlayer
//           onTagProducts={onTagProducts}
//           onViewFullVideo={onViewFullVideo}
//           onCopyLink={onCopyLink}
//         />
//       ))}
//     </div>
//   );
// }



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
  // ADD THESE NEW PROPS:
  onTagProducts,
  onViewFullVideo,
  onCopyLink
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: currentTheme.mutedText }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        Loading your media files...
      </div>
    );
  }

  if (mediaFiles.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem',
        background: isDarkTheme 
          ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '12px',
        border: isDarkTheme ? '1px solid #475569' : '1px solid #e2e8f0'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: currentTheme.text
        }}>
          No Media Files Yet
        </h3>
        <p style={{ 
          color: currentTheme.mutedText,
          marginBottom: '1.5rem'
        }}>
          Upload your first video or image to get started
        </p>
        <button
          onClick={onUploadClick}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          🚀 Upload Your First File
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)', // CHANGED to 6 columns
      gap: '1rem' // DECREASED gap
    }}>
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
          theme={currentTheme}
          formatDate={formatDate}
          // PASS THE NEW PROPS TO VideoPlayer
          onTagProducts={onTagProducts}
          onViewFullVideo={onViewFullVideo}
          onCopyLink={onCopyLink}
        />
      ))}
    </div>
  );
}