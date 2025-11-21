// app/components/videogallerycomponents/homepage-media.jsx
import { useState, useRef } from "react";

export default function HomepageMedia() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    
    // Filter only video and image files
    const mediaFiles = files.filter(file => 
      file.type.startsWith('video/') || file.type.startsWith('image/')
    );

    setSelectedFiles(prev => [...prev, ...mediaFiles]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress({});

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Update progress
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: { status: 'uploading', progress: 0 }
        }));

        // Upload to Shopify
        const result = await uploadToShopify(file, (progress) => {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { status: 'uploading', progress }
          }));
        });

        if (result.success) {
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
    <div style={{ 
      padding: '2rem',
      background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          🎬 Upload Media to Shopify
        </h2>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          Upload videos and images directly to your Shopify store
        </p>
      </div>

      {/* Upload Area */}
      <div style={{
        border: '2px dashed #cbd5e1',
        borderRadius: '12px',
        padding: '3rem 2rem',
        textAlign: 'center',
        marginBottom: '2rem',
        background: 'white',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#667eea';
        e.currentTarget.style.background = '#f0f4ff';
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#cbd5e1';
        e.currentTarget.style.background = 'white';
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#cbd5e1';
        e.currentTarget.style.background = 'white';
        handleFileSelect({ target: { files: e.dataTransfer.files } });
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Drop files here or click to browse
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Supports videos (MP4, MOV, AVI) and images (JPG, PNG, GIF)
        </p>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="video/*,image/*"
          style={{ display: 'none' }}
        />
      </div>

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>
              Selected Files ({selectedFiles.length})
            </h4>
            <button
              onClick={clearAllFiles}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#dc2626';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ef4444';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🗑️ Clear All
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div style={{ fontSize: '1.5rem' }}>
                    {getFileTypeIcon(file.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {formatFileSize(file.size)} • {file.type}
                    </div>
                  </div>
                </div>

                {/* Progress/Status */}
                <div style={{ minWidth: '120px', textAlign: 'right' }}>
                  {uploadProgress[file.name] && (
                    <div>
                      {uploadProgress[file.name].status === 'uploading' && (
                        <div style={{ color: '#f59e0b', fontSize: '0.875rem' }}>
                          ⏳ {uploadProgress[file.name].progress}%
                        </div>
                      )}
                      {uploadProgress[file.name].status === 'completed' && (
                        <div style={{ color: '#10b981', fontSize: '0.875rem' }}>
                          ✅ Complete
                        </div>
                      )}
                      {uploadProgress[file.name].status === 'error' && (
                        <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                          ❌ Failed
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.name)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginLeft: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fef2f2';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || uploading}
          style={{
            background: selectedFiles.length === 0 || uploading 
              ? '#9ca3af' 
              : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: selectedFiles.length === 0 || uploading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: selectedFiles.length === 0 || uploading ? 0.6 : 1,
            minWidth: '200px'
          }}
          onMouseEnter={(e) => {
            if (selectedFiles.length > 0 && !uploading) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          {uploading ? '⏳ Uploading...' : '🚀 Start Uploading'}
        </button>
      </div>

      {/* Upload Results */}
      {Object.values(uploadProgress).some(progress => progress.status === 'completed') && (
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#f0f9ff',
          borderRadius: '12px',
          border: '1px solid #bae6fd'
        }}>
          <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#0369a1' }}>
            📦 Upload Results
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(uploadProgress)
              .filter(([_, progress]) => progress.status === 'completed')
              .map(([fileName, progress]) => (
                <div key={fileName} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e0f2fe'
                }}>
                  <span style={{ color: '#10b981', fontSize: '1.25rem' }}>✅</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      {fileName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', wordBreak: 'break-all', marginBottom: '0.25rem' }}>
                      <strong>URL:</strong> {progress.url}
                    </div>
                    {progress.note && (
                      <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontStyle: 'italic' }}>
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
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#fef2f2',
          borderRadius: '12px',
          border: '1px solid #fecaca'
        }}>
          <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#dc2626' }}>
            ❌ Upload Errors
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(uploadProgress)
              .filter(([_, progress]) => progress.status === 'error')
              .map(([fileName, progress]) => (
                <div key={fileName} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid #fecaca'
                }}>
                  <span style={{ color: '#ef4444', fontSize: '1.25rem' }}>❌</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', fontSize: '0.875rem', marginBottom: '0.25rem', color: '#dc2626' }}>
                      {fileName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#b91c1c' }}>
                      {progress.error}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Upload Tips */}
      <div style={{
        padding: '1.5rem',
        background: '#fff7ed',
        borderRadius: '12px',
        border: '1px solid #fed7aa'
      }}>
        <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#ea580c' }}>
          💡 Upload Information
        </h5>
        <ul style={{ color: '#9a3412', fontSize: '0.875rem', margin: 0, paddingLeft: '1.25rem', lineHeight: '1.6' }}>
          <li>All files are automatically tagged with <strong>"zain"</strong> in their URLs</li>
          <li>Files are uploaded to your Shopify store's file system</li>
          <li>Upload progress is shown for each file individually</li>
          <li>You can remove files before uploading using the 🗑️ button</li>
          <li>Supported formats: MP4, MOV, AVI for videos; JPG, PNG, GIF for images</li>
          <li>If Shopify upload fails, files will be processed with simulated URLs for development</li>
        </ul>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#f3f4f6',
          borderRadius: '8px',
          border: '1px solid #d1d5db'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            <strong>Debug Info:</strong> {selectedFiles.length} files selected, {Object.values(uploadProgress).filter(p => p.status === 'completed').length} completed, {Object.values(uploadProgress).filter(p => p.status === 'error').length} errors
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Upload function with Shopify integration
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

    console.log("🔄 Starting upload for:", customFileName);

    // Better progress simulation
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 8;
      if (progress <= 80) { // Leave room for actual upload
        onProgress(progress);
      }
    }, 200);

    try {
      // Call our upload API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

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
        throw new Error('Upload timed out after 30 seconds');
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


