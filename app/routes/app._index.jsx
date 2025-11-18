// app/routes/app._index.jsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";

export const loader = async () => null;

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [message, setMessage] = useState({ text: "", status: "" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const perPage = 10;

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
      inputBackground: 'white',
      tableRowEven: 'rgba(248, 250, 252, 0.5)',
      tableRowOdd: 'white',
      tableHover: 'linear-gradient(135deg, #f0f4ff 0%, #fdf2ff 100%)'
    },
    dark: {
      background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
      cardBackground: 'linear-gradient(145deg, #374151 0%, #4b5563 100%)',
      text: '#f8fafc',
      mutedText: '#94a3b8',
      border: '1px solid #475569',
      shadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      inputBackground: '#374151',
      tableRowEven: 'rgba(30, 41, 59, 0.5)',
      tableRowOdd: '#1e293b',
      tableHover: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
    }
  };

  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  const loadProducts = async () => {
    setLoading(true);
    setMessage({ text: "", status: "" });
    try {
      console.log("Fetching products from API...");
      
      const res = await fetch("/api/products");
      console.log("Response status:", res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("API response:", data);

      if (data.success) {
        setAllProducts(data.products || []);
        setFilteredProducts(data.products || []);
        setShowProducts(true);
        setPage(1);
        setMessage({ text: `🎉 Successfully loaded ${data.products.length} products`, status: "success" });
      } else {
        setMessage({ text: `❌ Failed: ${data.error}`, status: "critical" });
      }
    } catch (e) {
      console.error("Error loading products:", e);
      setMessage({ text: `⚠️ Error: ${e.message}`, status: "critical" });
    } finally {
      setLoading(false);
    }
  };

  // Search Filter
  useEffect(() => {
    const query = search.toLowerCase().trim();
    const filtered = allProducts.filter(p =>
      p.title.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
    setPage(1);
  }, [search, allProducts]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const ProductsTable = ({ products }) => {
    if (!products.length) return null;

    return (
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          🛍️ Your Product Collection
        </h2>
        <div style={{ 
          overflowX: 'auto',
          borderRadius: '16px',
          background: currentTheme.cardBackground,
          boxShadow: currentTheme.shadow,
          border: currentTheme.border
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '0.875rem'
          }}>
            <thead>
              <tr style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <th style={{ padding: '1rem 0.75rem', fontWeight: '600', fontSize: '0.8rem', textAlign: 'left', borderTopLeftRadius: '16px' }}>🖼️ Image</th>
                <th style={{ padding: '1rem 0.75rem', fontWeight: '600', fontSize: '0.8rem', textAlign: 'left' }}>📦 Product Name</th>
                <th style={{ padding: '1rem 0.75rem', fontWeight: '600', fontSize: '0.8rem', textAlign: 'right' }}>💰 Price</th>
                <th style={{ padding: '1rem 0.75rem', fontWeight: '600', fontSize: '0.8rem', textAlign: 'center', borderTopRightRadius: '16px' }}>⚡ Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => {
                const price = p.variants[0]?.price || "N/A";
                const currency = p.variants[0]?.currency_code || "USD";

                return (
                  <tr
                    key={p.id}
                    style={{ 
                      borderBottom: isDarkTheme ? '1px solid #475569' : '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      animation: `fadeIn 0.5s ease-out ${i * 50}ms forwards`,
                      opacity: 0,
                      background: i % 2 === 0 ? currentTheme.tableRowEven : currentTheme.tableRowOdd,
                      color: currentTheme.text
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = currentTheme.tableHover;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = isDarkTheme 
                        ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
                        : '0 4px 20px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = i % 2 === 0 ? currentTheme.tableRowEven : currentTheme.tableRowOdd;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: isDarkTheme 
                          ? '0 4px 12px rgba(0, 0, 0, 0.4)' 
                          : '0 4px 12px rgba(0, 0, 0, 0.15)',
                        border: isDarkTheme ? '2px solid #475569' : '2px solid white'
                      }}>
                        <img
                          src={p.image?.src || '/placeholder-image.jpg'}
                          alt={p.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    </td>
                    <td style={{ 
                      padding: '1rem 0.75rem', 
                      fontWeight: '600', 
                      fontSize: '0.9rem',
                      maxWidth: '20rem'
                    }}>
                      {p.title}
                    </td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                      <span style={{ 
                        fontWeight: 'bold', 
                        fontSize: '1rem',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {currency} {price}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                      <button style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontSize: '0.8rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                      }}
                      >
                        👁️ View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      width: '100%',
      padding: '0 1rem',
      color: currentTheme.text
    }}>
      {/* Enhanced CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
          50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); }
        }
        @keyframes slideIn {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Animated Welcome Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        borderRadius: '24px',
        padding: '3rem 2rem',
        marginBottom: '3rem',
        border: 'none',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'slideIn 0.8s ease-out'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 1%)',
          backgroundSize: '50px 50px',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}>
          🎉 Hi DEV STORE!
        </h1>
        <p style={{
          fontSize: '1.25rem',
          marginBottom: '2rem',
          opacity: 0.9
        }}>
          Welcome to <strong>EE-Watch</strong> - Your Ultimate E-commerce Companion!
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          backdropFilter: 'blur(10px)'
        }}>
          <span>Any questions?</span>
          <Link to="#" style={{ 
            color: '#ffd700', 
            fontWeight: '600',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '25px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 215, 0, 0.2)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'scale(1)';
          }}
          >
            📞 Book a Call Here
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Feature Card - Enhanced */}
        <div style={{
          background: currentTheme.cardBackground,
          borderRadius: '24px',
          padding: '2.5rem',
          border: currentTheme.border,
          boxShadow: currentTheme.shadow,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, rgba(59, 130, 246, ${isDarkTheme ? '0.05' : '0.1'}) 0%, transparent 70%)`,
            borderRadius: '50%'
          }}></div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: 'white'
            }}>
              🎬
            </div>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Video Carousels
            </h2>
          </div>
          
          <p style={{
            fontSize: '1.1rem',
            color: currentTheme.mutedText,
            lineHeight: '1.7',
            marginBottom: '2rem'
          }}>
            🚀 <strong>Reduce user drop off</strong> on your collection pages and <strong>boost CTR</strong> to Product Pages with highly engaging collection page carousels. Available in <strong>5+ stunning styles</strong>!
          </p>
          
          <button style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
            animation: 'glow 2s ease-in-out infinite'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
          }}
          >
            ⚡ ADD NOW! (TAKES 4-5 MINS)
          </button>
        </div>

        {/* Analytics Dashboard - Enhanced */}
        <div style={{
          background: currentTheme.cardBackground,
          borderRadius: '24px',
          padding: '2.5rem',
          border: currentTheme.border,
          boxShadow: currentTheme.shadow,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '150px',
            height: '150px',
            background: `radial-gradient(circle, rgba(168, 85, 247, ${isDarkTheme ? '0.05' : '0.1'}) 0%, transparent 70%)`,
            borderRadius: '50%'
          }}></div>

          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                color: 'white'
              }}>
                📊
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Performance Overview
              </h3>
            </div>
            <Link to="/analytics" style={{
              color: '#8b5cf6',
              fontSize: '0.9rem',
              fontWeight: '600',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              background: isDarkTheme ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(139, 92, 246, 0.2)';
              e.target.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDarkTheme ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)';
              e.target.style.transform = 'translateX(0)';
            }}
            >
              🔍 Go to Analytics
            </Link>
          </div>

          {/* Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem'
          }}>
            {[
              { label: "Video Product Sales (last 30 days)", value: "0", currency: "PKR", icon: "💰", color: "#10b981" },
              { label: "Video Session Conversion Rate", value: "0%", currency: "%", icon: "📈", color: "#3b82f6" },
              { label: "Average Order Value", value: "PKR 0", currency: "PKR", icon: "🛒", color: "#f59e0b" }
            ].map((metric, index) => (
              <div key={index} style={{
                padding: '1.75rem',
                background: isDarkTheme 
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.9) 100%)'
                  : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
                borderRadius: '16px',
                border: `1px solid ${metric.color}20`,
                boxShadow: currentTheme.shadow,
                transition: 'all 0.3s ease',
                animation: `fadeIn 0.6s ease-out ${index * 200}ms forwards`,
                opacity: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 8px 30px ${metric.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = currentTheme.shadow;
              }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{metric.icon}</span>
                    <span style={{
                      fontSize: '0.9rem',
                      color: currentTheme.mutedText,
                      fontWeight: '600'
                    }}>
                      {metric.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: metric.color,
                    backgroundColor: `${metric.color}15`,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    {metric.currency}
                  </span>
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: metric.color,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section - Enhanced */}
      <div style={{
        background: currentTheme.cardBackground,
        borderRadius: '24px',
        padding: '3rem',
        border: currentTheme.border,
        boxShadow: currentTheme.shadow,
        marginBottom: '2rem'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            🎯 Product Management
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: currentTheme.mutedText,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Manage your entire product catalog with powerful tools and insights
          </p>
        </div>

        {/* CTA Button */}
        {!showProducts && (
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <button
              onClick={loadProducts}
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                color: 'white',
                padding: '1.25rem 3rem',
                borderRadius: '16px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 30px rgba(236, 72, 153, 0.3)',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 40px rgba(236, 72, 153, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 30px rgba(236, 72, 153, 0.3)';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginRight: '0.5rem' }}>🔄</span>
                  Loading Products...
                </>
              ) : (
                '🚀 Load Your Products'
              )}
            </button>
          </div>
        )}

        {/* Search Section */}
        {showProducts && (
          <div style={{ 
            marginBottom: '2rem',
            background: isDarkTheme 
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
            padding: '2rem',
            borderRadius: '16px',
            border: isDarkTheme ? '1px solid #475569' : '1px solid rgba(139, 92, 246, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                <input
                  type="text"
                  placeholder="🔍 Search products by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    border: isDarkTheme ? '2px solid #475569' : '2px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '12px',
                    color: currentTheme.text,
                    fontSize: '1rem',
                    background: currentTheme.inputBackground,
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDarkTheme ? '#475569' : 'rgba(139, 92, 246, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <span style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.25rem'
                }}>
                  🔍
                </span>
              </div>
            </div>

            {/* Results Count */}
            <p style={{ 
              textAlign: 'center', 
              fontSize: '1rem', 
              color: currentTheme.mutedText,
              fontWeight: '600'
            }}>
              📊 Showing <strong style={{ color: '#8b5cf6' }}>{paginated.length}</strong> of{' '}
              <strong style={{ color: '#ec4899' }}>{filteredProducts.length}</strong> products
              {search && (
                <span style={{ color: '#10b981' }}> for "{search}"</span>
              )}
            </p>
          </div>
        )}

        {/* Message Alert */}
        {message.text && (
          <div style={{
            maxWidth: '600px',
            margin: '1rem auto 2rem',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: '600',
            border: '1px solid',
            background: message.status === "critical" 
              ? (isDarkTheme 
                  ? 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)'
                  : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)')
              : (isDarkTheme
                  ? 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)'
                  : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'),
            borderColor: message.status === "critical" 
              ? (isDarkTheme ? '#7f1d1d' : '#fecaca')
              : (isDarkTheme ? '#065f46' : '#bbf7d0'),
            color: message.status === "critical" 
              ? (isDarkTheme ? '#fecaca' : '#dc2626')
              : (isDarkTheme ? '#bbf7d0' : '#059669'),
            boxShadow: currentTheme.shadow,
            animation: 'fadeIn 0.5s ease-out'
          }}>
            {message.text}
            <button
              onClick={() => setMessage({ text: "", status: "" })}
              style={{ 
                marginLeft: '1rem', 
                fontSize: '1rem', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: 'inherit'
              }}
            >
              ❌
            </button>
          </div>
        )}

        {/* Loading Animation */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: `4px solid ${isDarkTheme ? '#374151' : '#f3f4f6'}`,
              borderTop: '4px solid #8b5cf6',
              borderRight: '4px solid #ec4899',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1.5rem'
            }}></div>
            <p style={{ 
              color: currentTheme.mutedText, 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Loading your amazing products...
            </p>
          </div>
        )}

        {/* Products Table */}
        {showProducts && paginated.length > 0 && <ProductsTable products={paginated} />}

        {/* Pagination - Enhanced */}
        {showProducts && totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '1rem', 
            marginTop: '3rem',
            padding: '2rem',
            background: isDarkTheme 
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
            borderRadius: '16px',
            border: isDarkTheme ? '1px solid #475569' : '1px solid rgba(139, 92, 246, 0.1)'
          }}>
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid #8b5cf6',
                borderRadius: '10px',
                color: page === 1 ? (isDarkTheme ? '#6b7280' : '#9ca3af') : '#8b5cf6',
                backgroundColor: isDarkTheme ? '#1e293b' : 'white',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                opacity: page === 1 ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (page !== 1) {
                  e.target.style.background = '#8b5cf6';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateX(-3px)';
                }
              }}
              onMouseLeave={(e) => {
                if (page !== 1) {
                  e.target.style.background = isDarkTheme ? '#1e293b' : 'white';
                  e.target.style.color = '#8b5cf6';
                  e.target.style.transform = 'translateX(0)';
                }
              }}
            >
              ⬅️ Previous
            </button>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(139, 92, 246, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '10px'
            }}>
              <span style={{ 
                color: '#8b5cf6', 
                fontSize: '0.9rem',
                fontWeight: '700'
              }}>
                📄 Page {page} of {totalPages}
              </span>
            </div>
            
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid #ec4899',
                borderRadius: '10px',
                color: page === totalPages ? (isDarkTheme ? '#6b7280' : '#9ca3af') : '#ec4899',
                backgroundColor: isDarkTheme ? '#1e293b' : 'white',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                opacity: page === totalPages ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (page !== totalPages) {
                  e.target.style.background = '#ec4899';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateX(3px)';
                }
              }}
              onMouseLeave={(e) => {
                if (page !== totalPages) {
                  e.target.style.background = isDarkTheme ? '#1e293b' : 'white';
                  e.target.style.color = '#ec4899';
                  e.target.style.transform = 'translateX(0)';
                }
              }}
            >
              Next ➡️
            </button>
          </div>
        )}

        {/* Empty State */}
        {showProducts && filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            background: isDarkTheme 
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
            borderRadius: '16px',
            border: isDarkTheme ? '2px dashed #475569' : '2px dashed #d1d5db'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😔</div>
            <h3 style={{
              fontSize: '1.5rem',
              color: currentTheme.mutedText,
              marginBottom: '0.5rem'
            }}>
              No products found
            </h3>
            <p style={{ color: isDarkTheme ? '#6b7280' : '#9ca3af' }}>
              {search ? 'Try adjusting your search terms' : 'Start by loading your products'}
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: currentTheme.mutedText,
        fontSize: '0.9rem',
        background: currentTheme.cardBackground,
        borderRadius: '16px',
        marginTop: '2rem',
        border: currentTheme.border,
        boxShadow: currentTheme.shadow
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span>✨</span>
          <span>© 2025 Watch-EE • Built with 💙 using Remix + Shopify</span>
          <span>✨</span>
        </div>
        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
          Elevating e-commerce experiences with stunning visuals and powerful analytics
        </p>
      </footer>
    </div>
  );
}