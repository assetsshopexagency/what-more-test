// app/routes/app.collection-pages.jsx
import { useState } from "react";

export default function CollectionPages() {
  const [activeCollection, setActiveCollection] = useState("featured");

  const collections = [
    {
      id: "featured",
      name: "Featured Collection",
      status: "ACTIVE",
      videos: 12,
      products: 24,
      engagement: "4.2%",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop"
    },
    {
      id: "summer",
      name: "Summer Collection",
      status: "ACTIVE",
      videos: 8,
      products: 18,
      engagement: "3.8%",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=200&fit=crop"
    },
    {
      id: "winter",
      name: "Winter Collection",
      status: "INACTIVE",
      videos: 0,
      products: 15,
      engagement: "0%",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop"
    },
    {
      id: "new-arrivals",
      name: "New Arrivals",
      status: "ACTIVE",
      videos: 6,
      products: 12,
      engagement: "5.1%",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop"
    }
  ];

  const activeCollectionData = collections.find(col => col.id === activeCollection);

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto',
      padding: '0 1rem'
    }}>
      {/* Enhanced CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Header Section */}
      <div style={{
        marginBottom: '3rem',
        animation: 'slideIn 0.6s ease-out'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          📚 Collection Pages
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Manage video content across your product collections
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '3rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column - Collections List */}
        <div>
          <div style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '20px',
            padding: '2.5rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                padding: '0.5rem',
                borderRadius: '10px',
                fontSize: '1.5rem'
              }}>
                🗂️
              </span>
              Your Collections
            </h2>

            {/* Collections Grid */}
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {collections.map((collection, index) => (
                <div 
                  key={collection.id}
                  style={{
                    background: activeCollection === collection.id ? 
                      'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.03) 100%)' : 
                      'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: activeCollection === collection.id ? 
                      '2px solid #667eea' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: `fadeIn 0.6s ease-out ${index * 0.2}s both`
                  }}
                  onClick={() => setActiveCollection(collection.id)}
                  onMouseEnter={(e) => {
                    if (activeCollection !== collection.id) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCollection !== collection.id) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr auto',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    {/* Collection Image */}
                    <div style={{
                      width: '80px',
                      height: '60px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}>
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    {/* Collection Info */}
                    <div>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '0.25rem'
                      }}>
                        {collection.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        fontSize: '0.8rem',
                        color: '#6b7280'
                      }}>
                        <span>🎬 {collection.videos} videos</span>
                        <span>📦 {collection.products} products</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div style={{
                      background: collection.status === 'ACTIVE' ? 
                        'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 
                        'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {collection.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Collection */}
          <div style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px dashed #d1d5db',
            textAlign: 'center',
            animation: 'fadeIn 0.6s ease-out 0.8s both'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              color: '#9ca3af'
            }}>
              ➕
            </div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: '0.5rem'
            }}>
              Create New Collection
            </h3>
            <p style={{
              color: '#9ca3af',
              marginBottom: '1.5rem'
            }}>
              Start a new collection and add engaging video content
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              🆕 Create Collection
            </button>
          </div>
        </div>

        {/* Right Column - Collection Details */}
        <div>
          {activeCollectionData && (
            <div style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              animation: 'fadeIn 0.6s ease-out 0.4s both'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  fontSize: '1.2rem'
                }}>
                  📊
                </span>
                {activeCollectionData.name} Analytics
              </h3>

              {/* Collection Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#1d4ed8',
                    marginBottom: '0.5rem'
                  }}>
                    {activeCollectionData.videos}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#374151',
                    fontWeight: '600'
                  }}>
                    Active Videos
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#059669',
                    marginBottom: '0.5rem'
                  }}>
                    {activeCollectionData.engagement}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#374151',
                    fontWeight: '600'
                  }}>
                    Engagement Rate
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0',
                marginBottom: '2rem'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '1rem'
                }}>
                  ⚡ Quick Actions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'transparent',
                    border: '1px solid #e2e8f0',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#475569'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
                    e.target.style.borderColor = '#667eea';
                    e.target.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.transform = 'translateX(0)';
                  }}>
                    <span>🎬</span>
                    Add Videos
                  </button>
                  
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'transparent',
                    border: '1px solid #e2e8f0',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#475569'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
                    e.target.style.borderColor = '#667eea';
                    e.target.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.transform = 'translateX(0)';
                  }}>
                    <span>⚙️</span>
                    Customize Layout
                  </button>
                  
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'transparent',
                    border: '1px solid #e2e8f0',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#475569'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
                    e.target.style.borderColor = '#667eea';
                    e.target.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.transform = 'translateX(0)';
                  }}>
                    <span>📊</span>
                    View Analytics
                  </button>
                </div>
              </div>

              {/* Performance Tips */}
              <div style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #f59e0b'
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  💡 Performance Tips
                </h4>
                <ul style={{
                  color: '#b45309',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  paddingLeft: '1rem'
                }}>
                  <li>Add video testimonials to boost trust</li>
                  <li>Use product demonstration videos</li>
                  <li>Optimize video thumbnails for CTR</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}