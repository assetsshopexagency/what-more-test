// app/routes/app.homepage.jsx
import { useState } from "react";

export default function Homepage() {
  const [activeTab, setActiveTab] = useState("carousels");

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
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Homepage Performance & Widget Analytics
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        
        {/* Left Column - Active Videos & Carousels */}
        <div style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          padding: '2.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          animation: 'fadeIn 0.6s ease-out 0.2s both'
        }}>
          {/* Active Videos Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '1'
              }}>
                13
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                fontWeight: '600'
              }}>
                Active Videos
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              🟢 LIVE
            </div>
          </div>

          {/* Trending Widgets Section */}
          <div>
            <h3 style={{
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                padding: '0.5rem',
                borderRadius: '10px',
                fontSize: '1.2rem'
              }}>
                📈
              </span>
              Trending Widgets
            </h3>

            {/* Carousels Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              border: '2px solid #f59e0b',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem',
              animation: 'fadeIn 0.6s ease-out 0.4s both'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  fontSize: '1.5rem'
                }}>
                  🎠
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: '#92400e',
                    marginBottom: '0.5rem'
                  }}>
                    Carousels
                  </h4>
                  <p style={{
                    color: '#b45309',
                    lineHeight: '1.5',
                    marginBottom: '1rem'
                  }}>
                    Your videos are added but the carousel is not active
                  </p>
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid #f59e0b',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#b45309'
                  }}>
                    ⚠️ Activation Required
                  </div>
                </div>
              </div>

              {/* How it looks section */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <h5 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>👀</span>
                  How it looks
                </h5>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '8px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem'
                  }}>
                    🎨
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '8px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem'
                  }}>
                    📱
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#059669',
                    fontWeight: '600'
                  }}>
                    <span>✅</span>
                    Choose from 7+ templates
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#059669',
                    fontWeight: '600'
                  }}>
                    <span>📈</span>
                    Increase conversions by 5x
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stories & Engagement */}
        <div style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          padding: '2.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          animation: 'fadeIn 0.6s ease-out 0.3s both'
        }}>
          {/* Active Stories Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '1'
              }}>
                0
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                fontWeight: '600'
              }}>
                Active Stories
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              🔴 INACTIVE
            </div>
          </div>

          {/* Stories Section */}
          <div style={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            border: '2px solid #ef4444',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            animation: 'fadeIn 0.6s ease-out 0.5s both'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '12px',
                fontSize: '1.5rem'
              }}>
                📖
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  marginBottom: '0.5rem'
                }}>
                  Stories
                </h4>
                <p style={{
                  color: '#b91c1c',
                  lineHeight: '1.5'
                }}>
                  Your stories are not active yet
                </p>
              </div>
            </div>

            {/* How it looks section for Stories */}
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <h5 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>👀</span>
                How it looks
              </h5>
              <div style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                borderRadius: '8px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                📱
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#7c3aed',
                  fontWeight: '600'
                }}>
                  <span>✅</span>
                  Choose from 3+ templates
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#7c3aed',
                  fontWeight: '600'
                }}>
                  <span>🔥</span>
                  Add trending videos like (a)
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            animation: 'fadeIn 0.6s ease-out 0.7s both'
          }}>
            {/* Total Clicks */}
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
              border: '1px solid #3b82f6',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#1d4ed8',
                marginBottom: '0.5rem'
              }}>
                57
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#374151',
                fontWeight: '600'
              }}>
                Total Homepage Video Clicks
              </div>
            </div>

            {/* Engaged Sections */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #f7fee7 100%)',
              border: '1px solid #22c55e',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#15803d',
                marginBottom: '0.5rem'
              }}>
                5
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#374151',
                fontWeight: '600'
              }}>
                Total Engaged Sections
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banners Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        
        {/* Banners Info */}
        <div style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          padding: '2.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          animation: 'fadeIn 0.6s ease-out 0.8s both'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.5rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
              color: 'white',
              padding: '1rem',
              borderRadius: '12px',
              fontSize: '2rem'
            }}>
              🎨
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Banners
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontSize: '1.1rem'
              }}>
                Switch to dynamic video banners, avoid boring image banners
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                🚀 Unlock Banners
              </button>
            </div>
          </div>
        </div>

        {/* How it looks for Banners */}
        <div style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          padding: '2.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          animation: 'fadeIn 0.6s ease-out 0.9s both'
        }}>
          <h4 style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              padding: '0.5rem',
              borderRadius: '8px',
              fontSize: '1.1rem'
            }}>
              👀
            </span>
            How it looks
          </h4>
          
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fef7cd 100%)',
            border: '2px dashed #f59e0b',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              🎬
            </div>
            <div style={{
              fontSize: '1rem',
              color: '#92400e',
              fontWeight: '600'
            }}>
              Dynamic Video Banner Preview
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #bbf7d0'
            }}>
              <span style={{ color: '#059669', fontSize: '1.2rem' }}>📈</span>
              <span style={{ color: '#065f46', fontWeight: '600' }}>
                Increase conversion by 3x
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #bfdbfe'
            }}>
              <span style={{ color: '#1d4ed8', fontSize: '1.2rem' }}>⚡</span>
              <span style={{ color: '#1e40af', fontWeight: '600' }}>
                Real-time dynamic banners
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {[
          { label: 'Avg. Session Duration', value: '3:24', icon: '⏱️', color: '#3b82f6' },
          { label: 'Bounce Rate', value: '32%', icon: '📊', color: '#ef4444' },
          { label: 'Video Completion', value: '78%', icon: '✅', color: '#10b981' },
          { label: 'User Engagement', value: '4.2/5', icon: '⭐', color: '#f59e0b' }
        ].map((stat, index) => (
          <div key={stat.label} style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            animation: `fadeIn 0.6s ease-out ${1 + index * 0.1}s both`
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.75rem',
              color: stat.color
            }}>
              {stat.icon}
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: stat.color,
              marginBottom: '0.5rem'
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#6b7280',
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