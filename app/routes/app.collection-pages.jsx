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
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    },
    {
      id: "summer",
      name: "Summer Collection",
      status: "ACTIVE",
      videos: 8,
      products: 18,
      engagement: "3.8%",
      image:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=200&fit=crop",
    },
    {
      id: "winter",
      name: "Winter Collection",
      status: "INACTIVE",
      videos: 0,
      products: 15,
      engagement: "0%",
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop",
    },
    {
      id: "new-arrivals",
      name: "New Arrivals",
      status: "ACTIVE",
      videos: 6,
      products: 12,
      engagement: "5.1%",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    },
  ];

  const activeCollectionData = collections.find(
    (col) => col.id === activeCollection,
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      {/* Header Section */}
      <div className="mb-12 animate-slide-in">
        <h1 className="text-5xl font-bold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
          📚 Collection Pages
        </h1>
        <p className="text-xl text-muted-light mb-8">
          Manage video content across your product collections
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-12 items-start">
        {/* Left Column - Collections List */}
        <div>
          <div className="bg-gradient-to-br from-card-light to-background-light rounded-2xl p-10 border border-border-light shadow-xl mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-4">
              <span className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-2 rounded-xl text-2xl">
                🗂️
              </span>
              Your Collections
            </h2>

            {/* Collections Grid */}
            <div className="space-y-6">
              {collections.map((collection, index) => (
                <div
                  key={collection.id}
                  className={`
                    rounded-2xl p-6 cursor-pointer transition-all duration-300 ease-in-out
                    ${
                      activeCollection === collection.id
                        ? "bg-gradient-to-br from-primary/5 to-secondary/3 border-2 border-primary"
                        : "bg-gradient-to-br from-card-light to-background-light border border-border-light"
                    }
                    animate-fade-in
                  `}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => setActiveCollection(collection.id)}
                  onMouseEnter={(e) => {
                    if (activeCollection !== collection.id) {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(0, 0, 0, 0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCollection !== collection.id) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  <div className="grid grid-cols-[80px,1fr,auto] gap-4 items-center">
                    {/* Collection Image */}
                    <div className="w-20 h-15 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-secondary">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Collection Info */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {collection.name}
                      </h3>
                      <div className="flex gap-4 text-sm text-muted-light">
                        <span>🎬 {collection.videos} videos</span>
                        <span>📦 {collection.products} products</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`
                      text-white py-2 px-4 rounded-full text-xs font-bold uppercase
                      ${
                        collection.status === "ACTIVE"
                          ? "bg-gradient-to-br from-success to-[#059669]"
                          : "bg-gradient-to-br from-gray-500 to-gray-600"
                      }
                    `}
                    >
                      {collection.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Collection */}
          <div
            className="bg-gradient-to-br from-card-light to-background-light rounded-2xl p-8 border-2 border-dashed border-gray-300 text-center animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-5xl mb-4 text-gray-400">➕</div>
            <h3 className="text-lg font-semibold text-muted-light mb-2">
              Create New Collection
            </h3>
            <p className="text-gray-400 mb-6">
              Start a new collection and add engaging video content
            </p>
            <button className="bg-gradient-to-br from-primary to-secondary text-white border-none py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30">
              🆕 Create Collection
            </button>
          </div>
        </div>

        {/* Right Column - Collection Details */}
        <div>
          {activeCollectionData && (
            <div
              className="bg-gradient-to-br from-card-light to-background-light rounded-2xl p-10 border border-border-light shadow-xl animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-br from-success to-[#059669] p-2 rounded-lg text-lg">
                  📊
                </span>
                {activeCollectionData.name} Analytics
              </h3>

              {/* Collection Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-300">
                  <div className="text-3xl font-bold text-blue-800 mb-2">
                    {activeCollectionData.videos}
                  </div>
                  <div className="text-sm text-gray-700 font-semibold">
                    Active Videos
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 text-center border border-emerald-300">
                  <div className="text-3xl font-bold text-emerald-800 mb-2">
                    {activeCollectionData.engagement}
                  </div>
                  <div className="text-sm text-gray-700 font-semibold">
                    Engagement Rate
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-background-light to-slate-100 rounded-xl p-6 border border-border-light mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  ⚡ Quick Actions
                </h4>
                <div className="space-y-3">
                  <button className="flex items-center gap-3 bg-transparent border border-border-light py-3 px-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out text-sm font-medium text-slate-600 hover:bg-gradient-to-br hover:from-background-light hover:to-slate-100 hover:border-primary hover:translate-x-2">
                    <span>🎬</span>
                    Add Videos
                  </button>

                  <button className="flex items-center gap-3 bg-transparent border border-border-light py-3 px-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out text-sm font-medium text-slate-600 hover:bg-gradient-to-br hover:from-background-light hover:to-slate-100 hover:border-primary hover:translate-x-2">
                    <span>⚙️</span>
                    Customize Layout
                  </button>

                  <button className="flex items-center gap-3 bg-transparent border border-border-light py-3 px-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out text-sm font-medium text-slate-600 hover:bg-gradient-to-br hover:from-background-light hover:to-slate-100 hover:border-primary hover:translate-x-2">
                    <span>📊</span>
                    View Analytics
                  </button>
                </div>
              </div>

              {/* Performance Tips */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-500">
                <h4 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  💡 Performance Tips
                </h4>
                <ul className="text-amber-700 text-sm leading-relaxed list-disc pl-4 space-y-1">
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
