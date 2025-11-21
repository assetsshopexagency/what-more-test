// components/videogallerycomponents/VideoGalleryLayout.jsx
import { useEffect, useState } from "react";

export default function VideoGalleryLayout({ 
  children, 
  isDarkTheme, 
  toast 
}) {
  const [currentTheme, setCurrentTheme] = useState({});

  const themeStyles = {
    light: {
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      text: '#1f2937',
      mutedText: '#6b7280',
      border: '1px solid #e2e8f0',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.08)', 
      inputBackground: 'white'
    },
    dark: {
      background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
      cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
      text: '#f8fafc',
      mutedText: '#94a3b8',
      border: '1px solid #475569',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      inputBackground: '#374151'
    }
  };

  useEffect(() => {
    setCurrentTheme(isDarkTheme ? themeStyles.dark : themeStyles.light);
  }, [isDarkTheme]);

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto',
      padding: '0 1rem',
      color: currentTheme.text,
      background: currentTheme.background,
      minHeight: '100vh'
    }}>
      <VideoGalleryStyles />
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* Header Section */}
      <div style={{
        marginBottom: '2rem',
        animation: 'slideIn 0.6s ease-out'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          🎬 Video Gallery
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: currentTheme.mutedText,
          marginBottom: '2rem'
        }}>
          Manage and organize your video content across all platforms
        </p>
      </div>

      {children}
    </div>
  );
}

function VideoGalleryStyles() {
  return (
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideIn {
        from { transform: translateX(-100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      .video-player {
        border-radius: 12px;
        overflow: hidden;
        background: #000;
      }
      
      .video-controls {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .video-container:hover .video-controls {
        opacity: 1;
      }
      
      .control-btn {
        background: rgba(255,255,255,0.9);
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .control-btn:hover {
        background: white;
        transform: scale(1.1);
      }
      
      .volume-slider {
        width: 80px;
        height: 4px;
        background: rgba(255,255,255,0.3);
        border-radius: 2px;
        outline: none;
      }
      
      .checkbox-wrapper {
        position: absolute;
        top: 1rem;
        left: 1rem;
        z-index: 10;
      }
      
      .bulk-checkbox {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 2px solid white;
        background: rgba(0,0,0,0.5);
        cursor: pointer;
      }
      
      .bulk-checkbox:checked {
        background: #10b981;
        border-color: #10b981;
      }

      .toast {
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
      }

      .toast.success {
        background: #10b981;
      }

      .toast.error {
        background: #ef4444;
      }

      .edit-input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: white;
        color: #1f2937;
      }

      .edit-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 2rem;
      }

      .modal-content {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 400px;
        width: 100%;
        text-align: center;
      }

      .modal-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.5rem;
      }

      .video-options-menu {
        position: fixed;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        min-width: 200px;
        animation: fadeIn 0.2s ease-out;
      }

      .video-option-item {
        padding: 0.75rem 1rem;
        cursor: pointer;
        border-bottom: 1px solid #f3f4f6;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background 0.2s ease;
      }

      .video-option-item:hover {
        background: #f9fafb;
      }

      .video-option-item:last-child {
        border-bottom: none;
      }

      .products-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        max-height: 400px;
        overflow-y: auto;
        margin: 1rem 0;
      }

      .product-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: white;
      }

      .product-image {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 6px;
      }

      .product-info {
        flex: 1;
      }

      .product-name {
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      .product-price {
        color: #059669;
        font-weight: 600;
      }
    `}</style>
  );
}