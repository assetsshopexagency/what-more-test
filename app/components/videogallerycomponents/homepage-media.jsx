// app/components/videogallerycomponents/homepage-media.jsx
import { useState, useRef } from "react";
export default function HomepageMedia({ setHasMediaChanged }) { // ADDED PROP
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    // Filter only video and image files with size validation
    const mediaFiles = files.filter(file => {
      const isValidType = file.type.startsWith('video/') || file.type.startsWith('image/');
      const isValidSize = file.size <= 100 * 1024 * 1024; // 100MB limit
      if (!isValidType) {
        alert(`❌ "${file.name}" is not a supported file type. Please upload videos or images only.`);
        return false;
      }
      if (!isValidSize) {
        alert(`❌ "${file.name}" is too large. Maximum file size is 100MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`);
        return false;
      }
      return true;
    });
    setSelectedFiles(prev => [...prev, ...mediaFiles]);
  };
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    setUploadProgress({});
    let hasSuccessfulUpload = false; // NEW FLAG TO TRACK SUCCESSFUL UPLOADS
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        // Update progress
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: { status: 'uploading', progress: 0 }
        }));
        // Upload to Shopify with progress tracking
        const result = await uploadToShopify(file, (progress) => {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { status: 'uploading', progress }
          }));
        });
        if (result.success) {
          hasSuccessfulUpload = true; // SET FLAG IF SUCCESS
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { status: 'completed', progress: 100, url: result.url, note: result.note }
          }));
        } else {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { status: 'error', progress: 0, error: result.error }
          }));
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      if (hasSuccessfulUpload && setHasMediaChanged) { // ONLY SET IF SUCCESS AND PROP EXISTS
        setHasMediaChanged(true);
      }
    }
  };
  const removeFile = (fileName) => {
    setSelectedFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const getFileTypeIcon = (fileType) => {
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('image/')) return '🖼️';
    return '📄';
  };
  const clearAllFiles = () => {
    setSelectedFiles([]);
    setUploadProgress({});
  };
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
          🎬 Upload Media to Shopify
        </h2>
        <p className="text-gray-600 text-base">
          Upload videos and images directly to your Shopify store (Max: 100MB per file)
        </p>
      </div>
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-8 bg-white cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
          handleFileSelect({ target: { files: e.dataTransfer.files } });
        }}>
        <div className="text-5xl mb-4">📁</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Drop files here or click to browse
        </h3>
        <p className="text-gray-500 text-sm">
          Supports videos (MP4, MOV, AVI) and images (JPG, PNG, GIF) up to 100MB
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="video/*,image/*"
          className="hidden"
        />
      </div>
      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Selected Files ({selectedFiles.length})
            </h4>
            <button
              onClick={clearAllFiles}
              className="bg-red-500 hover:bg-red-600 text-white border-none px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-0.5"
            >
              🗑️ Clear All
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 transition-all duration-300"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-2xl">
                    {getFileTypeIcon(file.type)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1 text-gray-800">
                      {file.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • {file.type}
                    </div>
                  </div>
                </div>
                {/* Progress/Status */}
                <div className="min-w-30 text-right">
                  {uploadProgress[file.name] && (
                    <div>
                      {uploadProgress[file.name].status === 'uploading' && (
                        <div className="text-yellow-500 text-sm">
                          ⏳ {uploadProgress[file.name].progress}%
                        </div>
                      )}
                      {uploadProgress[file.name].status === 'completed' && (
                        <div className="text-green-500 text-sm">
                          ✅ Complete
                        </div>
                      )}
                      {uploadProgress[file.name].status === 'error' && (
                        <div className="text-red-500 text-sm">
                          ❌ Failed
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.name)}
                  className="bg-transparent border-none text-red-500 cursor-pointer p-2 rounded-md ml-4 transition-all duration-300 hover:bg-red-50 hover:transform hover:scale-110"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Upload Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || uploading}
          className={`${selectedFiles.length === 0 || uploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            } text-white border-none px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 opacity-${selectedFiles.length === 0 || uploading ? '60' : '100'} min-w-50 hover:transform hover:-translate-y-0.5 hover:shadow-lg`}
        >
          {uploading ? '⏳ Uploading...' : '🚀 Start Uploading'}
        </button>
      </div>
      {/* Upload Results */}
      {Object.values(uploadProgress).some(progress => progress.status === 'completed') && (
        <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <h5 className="text-base font-semibold mb-4 text-blue-800">
            📦 Upload Results
          </h5>
          <div className="flex flex-col gap-3">
            {Object.entries(uploadProgress)
              .filter(([_, progress]) => progress.status === 'completed')
              .map(([fileName, progress]) => (
                <div key={fileName} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-100">
                  <span className="text-green-500 text-xl">✅</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm mb-1 text-gray-800">
                      {fileName}
                    </div>
                    <div className="text-xs text-gray-600 break-all mb-1">
                      <strong>URL:</strong> {progress.url}
                    </div>
                    {progress.note && (
                      <div className="text-xs text-yellow-600 italic">
                        {progress.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {/* Error Display */}
      {Object.values(uploadProgress).some(progress => progress.status === 'error') && (
        <div className="mb-8 p-6 bg-red-50 rounded-2xl border border-red-200">
          <h5 className="text-base font-semibold mb-4 text-red-800">
            ❌ Upload Errors
          </h5>
          <div className="flex flex-col gap-3">
            {Object.entries(uploadProgress)
              .filter(([_, progress]) => progress.status === 'error')
              .map(([fileName, progress]) => (
                <div key={fileName} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-red-100">
                  <span className="text-red-500 text-xl">❌</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm mb-1 text-red-700">
                      {fileName}
                    </div>
                    <div className="text-xs text-red-600">
                      {progress.error}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {/* Upload Tips */}
      <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200">
        <h5 className="text-base font-semibold mb-3 text-orange-800">
          💡 Upload Information
        </h5>
        <ul className="text-orange-700 text-sm list-disc pl-5 space-y-1">
          <li><strong>Maximum file size:</strong> 100MB per file</li>
          <li><strong>Upload timeout:</strong> 5 minutes for large files</li>
          <li>Upload progress is shown for each file individually</li>
          <li>You can remove files before uploading using the 🗑️ button</li>
          <li>Supported formats: MP4, MOV, AVI for videos; JPG, PNG, GIF for images</li>
          <li>If Shopify upload fails, files will be processed with simulated URLs for development</li>
        </ul>
      </div>
      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
          <div className="text-xs text-gray-600">
            <strong>Debug Info:</strong> {selectedFiles.length} files selected, {Object.values(uploadProgress).filter(p => p.status === 'completed').length} completed, {Object.values(uploadProgress).filter(p => p.status === 'error').length} errors
          </div>
        </div>
      )}
    </div>
  );
}
// Enhanced Upload function with Shopify integration and improved timeout handling
async function uploadToShopify(file, onProgress) {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    // Add custom filename with "zain" prefix
    const originalName = file.name;
    const customFileName = `zain-${Date.now()}-${originalName.replace(/\s+/g, '-')}`;
    // Create a new File object with the custom name
    const customFile = new File([file], customFileName, { type: file.type });
    formData.append('file', customFile);
    console.log(`🔄 Starting upload for: ${customFileName} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
    // Better progress simulation for large files
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5; // Slower progress for large files
      if (progress <= 80) { // Leave room for actual upload
        onProgress(progress);
      }
    }, 500);
    try {
      // Call our upload API with extended timeout (5 minutes for large files)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000); // 5 minute timeout
      const response = await fetch('/api/upload-media', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      onProgress(100);
      if (!response.ok) {
        let errorMessage = `Upload failed: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If we can't parse JSON, use the status text
        }
        throw new Error(errorMessage);
      }
      const result = await response.json();
      if (result.success) {
        console.log("✅ Upload successful:", result.fileUrl);
        return {
          success: true,
          url: result.fileUrl,
          shopifyFileId: result.shopifyFileId,
          note: result.note || 'Uploaded to Shopify'
        };
      } else {
        throw new Error(result.error || 'Upload failed - no specific error message');
      }
    } catch (fetchError) {
      clearInterval(progressInterval);
      if (fetchError.name === 'AbortError') {
        throw new Error('Upload timed out after 5 minutes. Please try again with a smaller file or better network connection.');
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message || 'Unknown upload error occurred'
    };
  }
}

