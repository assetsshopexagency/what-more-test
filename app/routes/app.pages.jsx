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
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
    },
    {
      id: "contact",
      name: "Contact",
      status: "ACTIVE",
      videos: 1,
      engagement: "1.5%",
      lastUpdated: "1 week ago",
      image:
        "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=300&h=200&fit=crop",
    },
    {
      id: "faq",
      name: "FAQ",
      status: "INACTIVE",
      videos: 0,
      engagement: "0%",
      lastUpdated: "1 month ago",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
    },
    {
      id: "blog",
      name: "Blog",
      status: "ACTIVE",
      videos: 8,
      engagement: "4.7%",
      lastUpdated: "5 hours ago",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    },
  ];

  const activePageData = pages.find((page) => page.id === activePage);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="mb-12 animate-slide-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          📄 Pages
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Manage video content across your website pages
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column - Pages List */}
        <div className="lg:col-span-2">
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center gap-4">
              <span className="bg-primary p-3 rounded-xl text-2xl">🌐</span>
              Website Pages
            </h2>

            {/* Pages Grid */}
            <div className="space-y-6">
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  className={`
                    rounded-2xl p-6 cursor-pointer transition-all duration-300 animate-fade-in
                    ${
                      activePage === page.id
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    }
                    hover:-translate-y-1 hover:shadow-lg
                  `}
                  style={{ animationDelay: `${index * 200}ms` }}
                  onClick={() => setActivePage(page.id)}
                >
                  <div className="grid grid-cols-[80px_1fr_auto] gap-4 items-center">
                    {/* Page Image */}
                    <div className="w-20 h-15 rounded-xl overflow-hidden bg-primary">
                      <img
                        src={page.image}
                        alt={page.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Page Info */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {page.name}
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>🎬 {page.videos} videos</span>
                        <span>📅 {page.lastUpdated}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`
                      text-white px-4 py-2 rounded-full text-xs font-bold uppercase
                      ${page.status === "ACTIVE" ? "bg-success" : "bg-gray-500"}
                    `}
                    >
                      {page.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create New Page */}
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 text-center animate-fade-in">
            <div className="text-5xl mb-4 text-gray-400">🆕</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Create New Page
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              Build a new page with engaging video content
            </p>
            <button className="bg-primary text-white border-none px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              ✨ Create Page
            </button>
          </div>
        </div>

        {/* Right Column - Page Details */}
        <div>
          {activePageData && (
            <div className="bg-card-light dark:bg-card-dark rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-lg animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <span className="bg-secondary p-2 rounded-lg text-lg">📈</span>
                {activePageData.name} Analytics
              </h3>

              {/* Page Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-success/10 rounded-xl p-6 text-center border border-success/20">
                  <div className="text-3xl font-bold text-success mb-1">
                    {activePageData.videos}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    Embedded Videos
                  </div>
                </div>

                <div className="bg-yellow-500/10 rounded-xl p-6 text-center border border-yellow-500/20">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">
                    {activePageData.engagement}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    Video Engagement
                  </div>
                </div>
              </div>

              {/* Page Actions */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  🛠️ Page Actions
                </h4>
                <div className="space-y-3">
                  <button className="flex items-center gap-3 bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 text-gray-600 dark:text-gray-400 font-medium text-sm hover:border-primary hover:translate-x-1">
                    <span>✏️</span>
                    Edit Page Content
                  </button>

                  <button className="flex items-center gap-3 bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 text-gray-600 dark:text-gray-400 font-medium text-sm hover:border-primary hover:translate-x-1">
                    <span>🎬</span>
                    Manage Videos
                  </button>

                  <button className="flex items-center gap-3 bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 text-gray-600 dark:text-gray-400 font-medium text-sm hover:border-primary hover:translate-x-1">
                    <span>👁️</span>
                    Preview Page
                  </button>
                </div>
              </div>

              {/* Video Recommendations */}
              <div className="bg-primary/10 rounded-xl p-6 border border-primary/30">
                <h4 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
                  💎 Video Recommendations
                </h4>
                <ul className="text-primary text-sm space-y-1">
                  <li>• Add brand story video to build connection</li>
                  <li>• Include customer testimonial videos</li>
                  <li>• Use explainer videos for complex topics</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
