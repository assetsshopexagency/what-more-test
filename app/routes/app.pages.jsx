// app/routes/app.pages.jsx
import { useState } from "react";

export default function Pages() {
  const [activePage, setActivePage] = useState("about");

  const pages = [
    {
      id: "about",
      name: "About Us",
      status: "ACTIVE",
      videos: 3,
      engagement: "2.8%",
      lastUpdated: "2 days ago",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"
    },
    {
      id: "contact",
      name: "Contact",
      status: "ACTIVE",
      videos: 1,
      engagement: "1.5%",
      lastUpdated: "1 week ago",
      image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=300&h=200&fit=crop"
    },
    {
      id: "faq",
      name: "FAQ",
      status: "INACTIVE",
      videos: 0,
      engagement: "0%",
      lastUpdated: "1 month ago",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop"
    },
    {
      id: "blog",
      name: "Blog",
      status: "ACTIVE",
      videos: 8,
      engagement: "4.7%",
      lastUpdated: "5 hours ago",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop"
    }
  ];

  const activePageData = pages.find(page => page.id === activePage);

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
          📄 Pages
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Manage video content across your website pages
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '3rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column - Pages List */}
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
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                padding: '0.5rem',
                borderRadius: '10px',
                fontSize: '1.5rem'
              }}>
                🌐
              </span>
              Website Pages
            </h2>

            {/* Pages Grid */}
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {pages.map((page, index) => (
                <div 
                  key={page.id}
                  style={{
                    background: activePage === page.id ? 
                      'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.03) 100%)' : 
                      'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: activePage === page.id ? 
                      '2px solid #667eea' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: `fadeIn 0.6s ease-out ${index * 0.2}s both`
                  }}
                  onClick={() => setActivePage(page.id)}
                  onMouseEnter={(e) => {
                    if (activePage !== page.id) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activePage !== page.id) {
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
                    {/* Page Image */}
                    <div style={{
                      width: '80px',
                      height: '60px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}>
                      <img 
                        src={page.image} 
                        alt={page.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    {/* Page Info */}
                    <div>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '0.25rem'
                      }}>
                        {page.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        fontSize: '0.8rem',
                        color: '#6b7280'
                      }}>
                        <span>🎬 {page.videos} videos</span>
                        <span>📅 {page.lastUpdated}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div style={{
                      background: page.status === 'ACTIVE' ? 
                        'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 
                        'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {page.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create New Page */}
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
              🆕
            </div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: '0.5rem'
            }}>
              Create New Page
            </h3>
            <p style={{
              color: '#9ca3af',
              marginBottom: '1.5rem'
            }}>
              Build a new page with engaging video content
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
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
              e.target.style.boxShadow = '0 6px 20px rgba(236, 72, 153, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              ✨ Create Page
            </button>
          </div>
        </div>

        {/* Right Column - Page Details */}
        <div>
          {activePageData && (
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
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  fontSize: '1.2rem'
                }}>
                  📈
                </span>
                {activePageData.name} Analytics
              </h3>

              {/* Page Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
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
                    {activePageData.videos}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#374151',
                    fontWeight: '600'
                  }}>
                    Embedded Videos
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fef7cd 100%)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: '1px solid #fcd34d'
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#d97706',
                    marginBottom: '0.5rem'
                  }}>
                    {activePageData.engagement}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#374151',
                    fontWeight: '600'
                  }}>
                    Video Engagement
                  </div>
                </div>
              </div>

              {/* Page Actions */}
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
                  🛠️ Page Actions
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
                    <span>✏️</span>
                    Edit Page Content
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
                    <span>🎬</span>
                    Manage Videos
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
                    <span>👁️</span>
                    Preview Page
                  </button>
                </div>
              </div>

              {/* Video Recommendations */}
              <div style={{
                background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #818cf8'
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#3730a3',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  💎 Video Recommendations
                </h4>
                <ul style={{
                  color: '#4338ca',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  paddingLeft: '1rem'
                }}>
                  <li>Add brand story video to build connection</li>
                  <li>Include customer testimonial videos</li>
                  <li>Use explainer videos for complex topics</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}