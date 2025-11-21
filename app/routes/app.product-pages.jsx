// app/routes/app.product-pages.jsx
import { useState, useEffect } from "react";

export default function ProductPages() {
  const [activeTab, setActiveTab] = useState("floating-widget");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Detect theme from document
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };

    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Theme-based styles
  const themeStyles = {
    light: {
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      cardBackground: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      text: '#1f2937',
      mutedText: '#6b7280',
      border: '1px solid #e2e8f0',
      shadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
      activeBackground: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.03) 100%)',
      metricBackground: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      quickActionBackground: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    },
    dark: {
      background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
      cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
      text: '#f8fafc',
      mutedText: '#94a3b8',
      border: '1px solid #475569',
      shadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      activeBackground: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)',
      metricBackground: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.9) 100%)',
      quickActionBackground: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.9) 100%)'
    }
  };

  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;
  
  const widgets = [
    {
      id: "floating-widget",
      title: "Floating Widget",
      description: "Hook your users with a floating video showcase",
      status: "INACTIVE",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      features: ["Floating video player", "Auto-play on scroll", "Customizable position"]
    },
    {
      id: "video-carousel",
      title: "Video Carousel",
      description: "Showcase your product videos in a horizontal section",
      status: "INACTIVE",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=300&h=200&fit=crop",
      features: ["Horizontal scrolling", "Multiple videos", "Thumbnail navigation"]
    },
    {
      id: "video-stories",
      title: "Video Stories",
      description: "Showcase your product videos as Instagram like stories",
      status: "ACTIVE",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
      features: ["Full-screen experience", "Swipe navigation", "Progress indicators"]
    }
  ];

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto',
      padding: '0 1rem',
      color: currentTheme.text
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
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
          50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); }
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
          📊 Analytics
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: currentTheme.mutedText,
          marginBottom: '2rem'
        }}>
          Monitor and optimize your product page performance
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '3rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column - Widgets */}
        <div>
          <div style={{
            background: currentTheme.cardBackground,
            borderRadius: '20px',
            padding: '2.5rem',
            border: currentTheme.border,
            boxShadow: currentTheme.shadow,
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: currentTheme.text,
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '0.5rem',
                borderRadius: '10px',
                fontSize: '1.5rem'
              }}>
                🎯
              </span>
              Product Page Widgets
            </h2>

            {/* Widgets Grid */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}>
              {widgets.map((widget, index) => (
                <div 
                  key={widget.id}
                  style={{
                    background: activeTab === widget.id ? 
                      currentTheme.activeBackground : 
                      currentTheme.cardBackground,
                    border: activeTab === widget.id ? 
                      '2px solid #667eea' : currentTheme.border,
                    borderRadius: '16px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: `fadeIn 0.6s ease-out ${index * 0.2}s both`
                  }}
                  onClick={() => setActiveTab(widget.id)}
                  onMouseEnter={(e) => {
                    if (activeTab !== widget.id) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = isDarkTheme 
                        ? '0 15px 40px rgba(0, 0, 0, 0.4)' 
                        : '0 15px 40px rgba(0, 0, 0, 0.12)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== widget.id) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr auto',
                    gap: '1.5rem',
                    alignItems: 'start'
                  }}>
                    {/* Widget Image */}
                    <div style={{
                      width: '120px',
                      height: '80px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem',
                      position: 'relative'
                    }}>
                      <img 
                        src={widget.image} 
                        alt={widget.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    {/* Widget Content */}
                    <div>
                      <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        color: currentTheme.text,
                        marginBottom: '0.5rem'
                      }}>
                        {widget.title}
                      </h3>
                      <p style={{
                        color: currentTheme.mutedText,
                        lineHeight: '1.6',
                        marginBottom: '1rem'
                      }}>
                        {widget.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                      }}>
                        {widget.features.map((feature, featureIndex) => (
                          <span 
                            key={featureIndex}
                            style={{
                              background: isDarkTheme 
                                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
                                : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                              color: isDarkTheme ? '#e5e7eb' : '#475569',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: '500'
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        background: widget.status === 'ACTIVE' ? 
                          'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 
                          'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {widget.status}
                      </div>
                      
                      <button style={{
                        background: widget.status === 'ACTIVE' ? 
                          'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 
                          'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}>
                        {widget.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>

                  {/* How it looks section for active widget */}
                  {activeTab === widget.id && (
                    <div style={{
                      marginTop: '2rem',
                      paddingTop: '2rem',
                      borderTop: isDarkTheme ? '1px solid #475569' : '1px solid #e2e8f0',
                      animation: 'fadeIn 0.4s ease-out'
                    }}>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: currentTheme.text,
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span>👀</span>
                        How it looks
                      </h4>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                      }}>
                        {[1, 2, 3].map((preview) => (
                          <div key={preview} style={{
                            background: isDarkTheme 
                              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.9) 100%)'
                              : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            borderRadius: '12px',
                            padding: '1rem',
                            textAlign: 'center',
                            border: currentTheme.border
                          }}>
                            <div style={{
                              width: '100%',
                              height: '120px',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              borderRadius: '8px',
                              marginBottom: '0.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '2rem'
                            }}>
                              {preview === 1 ? '📱' : preview === 2 ? '💻' : '🖥️'}
                            </div>
                            <span style={{
                              fontSize: '0.8rem',
                              color: currentTheme.mutedText,
                              fontWeight: '500'
                            }}>
                              {preview === 1 ? 'Mobile View' : preview === 2 ? 'Tablet View' : 'Desktop View'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Analytics Sidebar */}
        <div>
          {/* Performance Overview */}
          <div style={{
            background: currentTheme.cardBackground,
            borderRadius: '20px',
            padding: '2rem',
            border: currentTheme.border,
            boxShadow: currentTheme.shadow,
            marginBottom: '2rem',
            animation: 'fadeIn 0.6s ease-out 0.4s both'
          }}>
            <h3 style={{
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: currentTheme.text,
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
                📈
              </span>
              Performance Overview
            </h3>

            {/* Metrics */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {[
                { label: 'Total Views', value: '12.4K', change: '+12%', icon: '👁️', color: '#3b82f6' },
                { label: 'Engagement Rate', value: '24.7%', change: '+8%', icon: '❤️', color: '#ec4899' },
                { label: 'Conversion Rate', value: '8.2%', change: '+15%', icon: '🔄', color: '#10b981' },
                { label: 'Avg. Watch Time', value: '2:34', change: '+5%', icon: '⏱️', color: '#f59e0b' }
              ].map((metric, index) => (
                <div key={metric.label} style={{
                  background: currentTheme.metricBackground,
                  borderRadius: '12px',
                  padding: '1.25rem',
                  border: currentTheme.border,
                  animation: `fadeIn 0.6s ease-out ${0.6 + index * 0.1}s both`
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{metric.icon}</span>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: currentTheme.text
                      }}>
                        {metric.label}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      color: metric.change.startsWith('+') ? '#10b981' : '#ef4444',
                      background: metric.change.startsWith('+') 
                        ? (isDarkTheme ? 'rgba(16, 185, 129, 0.2)' : '#dcfce7')
                        : (isDarkTheme ? 'rgba(239, 68, 68, 0.2)' : '#fef2f2'),
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px'
                    }}>
                      {metric.change}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: metric.color
                  }}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: currentTheme.cardBackground,
            borderRadius: '20px',
            padding: '2rem',
            border: currentTheme.border,
            boxShadow: currentTheme.shadow,
            animation: 'fadeIn 0.6s ease-out 0.8s both'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: currentTheme.text,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                padding: '0.5rem',
                borderRadius: '8px',
                fontSize: '1.1rem'
              }}>
                ⚡
              </span>
              Quick Actions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Add New Widget', icon: '➕', color: '#3b82f6' },
                { label: 'View Analytics', icon: '📊', color: '#10b981' },
                { label: 'Customize Layout', icon: '🎨', color: '#f59e0b' },
                { label: 'Export Reports', icon: '📤', color: '#ec4899' }
              ].map((action, index) => (
                <button 
                  key={action.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: currentTheme.quickActionBackground,
                    border: currentTheme.border,
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: `fadeIn 0.6s ease-out ${1 + index * 0.1}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${action.color}15 0%, ${action.color}08 100%)`;
                    e.currentTarget.style.borderColor = action.color;
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = currentTheme.quickActionBackground;
                    e.currentTarget.style.borderColor = currentTheme.border.split(' ')[2];
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ 
                    fontSize: '1.2rem',
                    color: action.color
                  }}>
                    {action.icon}
                  </span>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: currentTheme.text
                  }}>
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '3rem'
      }}>
        {[
          { label: 'Active Widgets', value: '3/8', icon: '🎯', color: '#10b981' },
          { label: 'Total Products', value: '47', icon: '📦', color: '#3b82f6' },
          { label: 'Avg. Load Time', value: '1.2s', icon: '⚡', color: '#f59e0b' },
          { label: 'User Satisfaction', value: '94%', icon: '😊', color: '#ec4899' }
        ].map((stat, index) => (
          <div key={stat.label} style={{
            background: currentTheme.cardBackground,
            borderRadius: '16px',
            padding: '2rem',
            border: currentTheme.border,
            textAlign: 'center',
            animation: `fadeIn 0.6s ease-out ${1.2 + index * 0.1}s both`
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem'
            }}>
              {stat.icon}
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: stat.color,
              marginBottom: '0.5rem'
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '1rem',
              color: currentTheme.mutedText,
              fontWeight: '600'
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}