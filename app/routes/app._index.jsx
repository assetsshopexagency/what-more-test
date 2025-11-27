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
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
        setMessage({
          text: `🎉 Successfully loaded ${data.products.length} products`,
          status: "success",
        });
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
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(query),
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
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          🛍️ Your Product Collection
        </h2>
        <div className="overflow-x-auto rounded-2xl bg-card-light dark:bg-card-dark shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                <th className="px-3 py-4 font-semibold text-xs text-left rounded-tl-2xl">
                  🖼️ Image
                </th>
                <th className="px-3 py-4 font-semibold text-xs text-left">
                  📦 Product Name
                </th>
                <th className="px-3 py-4 font-semibold text-xs text-right">
                  💰 Price
                </th>
                <th className="px-3 py-4 font-semibold text-xs text-center rounded-tr-2xl">
                  ⚡ Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => {
                const price = p.variants[0]?.price || "N/A";
                const currency = p.variants[0]?.currency_code || "USD";

                return (
                  <tr
                    key={p.id}
                    className={`
                      border-b border-gray-300 dark:border-gray-600 
                      transition-all duration-300 animate-fade-in
                      ${
                        i % 2 === 0
                          ? "bg-gray-50/50 dark:bg-gray-800/50"
                          : "bg-white dark:bg-gray-900"
                      }
                      text-gray-900 dark:text-gray-100
                      hover:bg-primary/10 dark:hover:bg-primary/20
                      hover:-translate-y-0.5
                      hover:shadow-lg dark:hover:shadow-2xl
                    `}
                  >
                    <td className="px-3 py-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md border-2 border-white dark:border-gray-600">
                        <img
                          src={p.image?.src || "/placeholder-image.jpg"}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-3 py-4 font-semibold text-sm max-w-xs">
                      {p.title}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <span className="font-bold text-base text-success">
                        {currency} {price}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button className="bg-gradient-to-r from-primary to-secondary text-white text-xs py-2 px-4 rounded-lg font-semibold border-none cursor-pointer transition-all duration-300 shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40">
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
    <div className="max-w-7xl mx-auto w-full px-4 text-gray-900 dark:text-gray-100">
      {/* Animated Welcome Section */}
      <div className="bg-primary rounded-3xl p-12 mb-12 text-white text-center relative overflow-hidden animate-slide-in">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1%,transparent_1%)] bg-[length:50px_50px] animate-float"></div>

        <h1 className="text-5xl font-bold mb-4 text-shadow-lg">
          🎉 Hi DEV STORE!
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Welcome to <strong>EE-Watch</strong> - Your Ultimate E-commerce
          Companion!
        </p>
        <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
          <span>Any questions?</span>
          <Link
            to="#"
            className="text-yellow-300 font-semibold no-underline py-2 px-4 bg-white/10 rounded-full transition-all duration-300 hover:bg-yellow-300/20 hover:scale-105"
          >
            📞 Book a Call Here
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Feature Card */}
        <div className="bg-card-light dark:bg-card-dark rounded-3xl p-10 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 dark:bg-primary/5 rounded-full"></div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white text-xl">
              🎬
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
              Video Carousels
            </h2>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            🚀 <strong>Reduce user drop off</strong> on your collection pages
            and <strong>boost CTR</strong> to Product Pages with highly engaging
            collection page carousels. Available in{" "}
            <strong>5+ stunning styles</strong>!
          </p>

          <button className="bg-gradient-to-r from-success to-green-700 text-white py-4 px-8 rounded-xl border-none text-lg font-bold cursor-pointer transition-all duration-300 shadow-lg shadow-success/30 animate-glow hover:-translate-y-1 hover:shadow-xl hover:shadow-success/50">
            ⚡ ADD NOW! (TAKES 4-5 MINS)
          </button>
        </div>

        {/* Analytics Dashboard */}
        <div className="bg-card-light dark:bg-card-dark rounded-3xl p-10 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-500/10 dark:bg-purple-500/5 rounded-full"></div>

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-lg">
                📊
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                Performance Overview
              </h3>
            </div>
            <Link
              to="/analytics"
              className="text-purple-500 text-sm font-semibold no-underline py-2 px-4 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg transition-all duration-300 hover:bg-purple-500/20 hover:translate-x-1"
            >
              🔍 Go to Analytics
            </Link>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                label: "Video Product Sales (last 30 days)",
                value: "0",
                currency: "PKR",
                icon: "💰",
                color: "text-success",
                bgColor: "bg-success/10",
                borderColor: "border-success/20",
              },
              {
                label: "Video Session Conversion Rate",
                value: "0%",
                currency: "%",
                icon: "📈",
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
                borderColor: "border-blue-500/20",
              },
              {
                label: "Average Order Value",
                value: "PKR 0",
                currency: "PKR",
                icon: "🛒",
                color: "text-yellow-500",

                borderColor: "border-yellow-500/20",
              },
            ].map((metric, index) => (
              <div
                key={index}
                className={`
                  p-7 rounded-2xl border ${metric.borderColor} 
                  shadow-lg dark:shadow-2xl transition-all duration-300 
                  animate-fade-in bg-white/80 dark:bg-gray-800/90
                  hover:-translate-y-1 hover:shadow-xl
                  ${metric.bgColor}
                `}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{metric.icon}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                      {metric.label}
                    </span>
                  </div>
                  <span
                    className={`text-xs ${metric.color} ${metric.bgColor} py-1 px-3 rounded-full font-semibold`}
                  >
                    {metric.currency}
                  </span>
                </div>
                <div
                  className={`text-3xl font-bold ${metric.color} text-shadow-sm`}
                >
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-card-light dark:bg-card-dark rounded-3xl p-12 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-2xl mb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
            🎯 Product Management
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your entire product catalog with powerful tools and insights
          </p>
        </div>

        {/* CTA Button */}
        {!showProducts && (
          <div className="text-center mb-12">
            <button
              onClick={loadProducts}
              disabled={loading}
              className={`
                bg-primary text-white 
                py-5 px-12 rounded-2xl font-bold border-none cursor-pointer 
                text-lg transition-all duration-300 
                shadow-lg shadow-pink-500/30
                ${loading ? "opacity-70" : "opacity-100"}
                hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/50
              `}
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block mr-2">🔄</span>
                  Loading Products...
                </>
              ) : (
                "🚀 Load Your Products"
              )}
            </button>
          </div>
        )}

        {/* Search Section */}
        {showProducts && (
          <div className="mb-8 bg-white/80 dark:bg-gray-800/90 p-8 rounded-2xl border border-purple-500/10">
            <div className="flex justify-center mb-4">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="🔍 Search products by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-4 px-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 text-base bg-white dark:bg-gray-700 transition-all duration-300 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/10"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">
                  🔍
                </span>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-center text-base text-gray-600 dark:text-gray-400 font-semibold">
              📊 Showing{" "}
              <strong className="text-purple-500">{paginated.length}</strong> of{" "}
              <strong className="text-pink-500">
                {filteredProducts.length}
              </strong>{" "}
              products
              {search && <span className="text-success"> for "{search}"</span>}
            </p>
          </div>
        )}

        {/* Message Alert */}
        {message.text && (
          <div
            className={`
            max-w-2xl mx-auto my-4 mb-8 p-6 rounded-xl text-center 
            text-base font-semibold border shadow-lg animate-fade-in
            ${
              message.status === "critical"
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
            }
          `}
          >
            {message.text}
            <button
              onClick={() => setMessage({ text: "", status: "" })}
              className="ml-4 text-base bg-none border-none cursor-pointer text-inherit"
            >
              ❌
            </button>
          </div>
        )}

        {/* Loading Animation */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 border-4 border-gray-300 dark:border-gray-600 border-t-purple-500 border-r-pink-500 rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
              Loading your amazing products...
            </p>
          </div>
        )}

        {/* Products Table */}
        {showProducts && paginated.length > 0 && (
          <ProductsTable products={paginated} />
        )}

        {/* Pagination */}
        {showProducts && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 p-8 bg-white/80 dark:bg-gray-800/90 rounded-2xl border border-purple-500/10">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`
                py-3 px-6 border-2 border-purple-500 rounded-lg font-semibold 
                transition-all duration-300
                ${
                  page === 1
                    ? "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-50"
                    : "text-purple-500 bg-white dark:bg-gray-900 cursor-pointer hover:bg-purple-500 hover:text-white hover:-translate-x-1"
                }
              `}
            >
              ⬅️ Previous
            </button>

            <div className="flex items-center gap-2 bg-purple-500/10 py-2 px-4 rounded-lg">
              <span className="text-purple-500 text-sm font-bold">
                📄 Page {page} of {totalPages}
              </span>
            </div>

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className={`
                py-3 px-6 border-2 border-pink-500 rounded-lg font-semibold 
                transition-all duration-300
                ${
                  page === totalPages
                    ? "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-50"
                    : "text-pink-500 bg-white dark:bg-gray-900 cursor-pointer hover:bg-pink-500 hover:text-white hover:translate-x-1"
                }
              `}
            >
              Next ➡️
            </button>
          </div>
        )}

        {/* Empty State */}
        {showProducts && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white/80 dark:bg-gray-800/90 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {search
                ? "Try adjusting your search terms"
                : "Start by loading your products"}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center p-8 text-gray-600 dark:text-gray-400 text-sm bg-card-light dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-2xl mt-8">
        <div className="flex justify-center items-center gap-2 mb-2">
          <span>✨</span>
          <span>© 2025 Watch-EE • Built with 💙 using Remix + Shopify</span>
          <span>✨</span>
        </div>
        <p className="text-xs opacity-70">
          Elevating e-commerce experiences with stunning visuals and powerful
          analytics
        </p>
      </footer>
    </div>
  );
}
