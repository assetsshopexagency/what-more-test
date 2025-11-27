// app/routes/app.product-pages.jsx
import { useState, useEffect } from "react";

export default function ProductPages() {
  const [activeTab, setActiveTab] = useState("floating-widget");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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

  const widgets = [
    {
      id: "floating-widget",
      title: "Floating Widget",
      description: "Hook your users with a floating video showcase",
      status: "INACTIVE",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      features: [
        "Floating video player",
        "Auto-play on scroll",
        "Customizable position",
      ],
    },
    {
      id: "video-carousel",
      title: "Video Carousel",
      description: "Showcase your product videos in a horizontal section",
      status: "INACTIVE",
      image:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=300&h=200&fit=crop",
      features: [
        "Horizontal scrolling",
        "Multiple videos",
        "Thumbnail navigation",
      ],
    },
    {
      id: "video-stories",
      title: "Video Stories",
      description: "Showcase your product videos as Instagram like stories",
      status: "ACTIVE",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
      features: [
        "Full-screen experience",
        "Swipe navigation",
        "Progress indicators",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <div className="mb-12 animate-slide-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          📊 Analytics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Monitor and optimize your product page performance
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column - Widgets */}
        <div className="lg:col-span-2">
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center gap-4">
              <span className="bg-primary p-3 rounded-xl text-2xl">🎯</span>
              Product Page Widgets
            </h2>

            {/* Widgets Grid */}
            <div className="space-y-8">
              {widgets.map((widget, index) => (
                <div
                  key={widget.id}
                  className={`
                    rounded-2xl p-8 cursor-pointer transition-all duration-300 animate-fade-in
                    ${
                      activeTab === widget.id
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    }
                    hover:-translate-y-1 hover:shadow-xl
                  `}
                  style={{ animationDelay: `${index * 200}ms` }}
                  onClick={() => setActiveTab(widget.id)}
                >
                  <div className="grid grid-cols-[120px_1fr_auto] gap-6 items-start">
                    {/* Widget Image */}
                    <div className="w-30 h-20 rounded-xl overflow-hidden bg-primary flex items-center justify-center text-white text-3xl relative">
                      <img
                        src={widget.image}
                        alt={widget.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Widget Content */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {widget.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {widget.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {widget.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className={`
                        text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide
                        ${widget.status === "ACTIVE" ? "bg-success" : "bg-gray-500"}
                      `}
                      >
                        {widget.status}
                      </div>

                      <button
                        className={`
                        text-white border-none px-4 py-2 rounded-lg text-sm font-semibold 
                        cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg
                        ${widget.status === "ACTIVE" ? "bg-error" : "bg-success"}
                      `}
                      >
                        {widget.status === "ACTIVE" ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </div>

                  {/* How it looks section for active widget */}
                  {activeTab === widget.id && (
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <span>👀</span>
                        How it looks
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((preview) => (
                          <div
                            key={preview}
                            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700"
                          >
                            <div className="w-full h-30 bg-primary rounded-lg mb-2 flex items-center justify-center text-white text-3xl">
                              {preview === 1
                                ? "📱"
                                : preview === 2
                                  ? "💻"
                                  : "🖥️"}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                              {preview === 1
                                ? "Mobile View"
                                : preview === 2
                                  ? "Tablet View"
                                  : "Desktop View"}
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
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg mb-8 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className="bg-success p-2 rounded-lg text-lg">📈</span>
              Performance Overview
            </h3>

            {/* Metrics */}
            <div className="space-y-6">
              {[
                {
                  label: "Total Views",
                  value: "12.4K",
                  change: "+12%",
                  icon: "👁️",
                  color: "text-blue-500",
                },
                {
                  label: "Engagement Rate",
                  value: "24.7%",
                  change: "+8%",
                  icon: "❤️",
                  color: "text-pink-500",
                },
                {
                  label: "Conversion Rate",
                  value: "8.2%",
                  change: "+15%",
                  icon: "🔄",
                  color: "text-success",
                },
                {
                  label: "Avg. Watch Time",
                  value: "2:34",
                  change: "+5%",
                  icon: "⏱️",
                  color: "text-yellow-500",
                },
              ].map((metric, index) => (
                <div
                  key={metric.label}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 animate-fade-in"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{metric.icon}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {metric.label}
                      </span>
                    </div>
                    <span
                      className={`
                      text-xs font-bold px-2 py-1 rounded-full
                      ${
                        metric.change.startsWith("+")
                          ? "text-success bg-success/10"
                          : "text-error bg-error/10"
                      }
                    `}
                    >
                      {metric.change}
                    </span>
                  </div>
                  <div className={`text-xl font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className="bg-secondary p-2 rounded-lg text-base">⚡</span>
              Quick Actions
            </h3>

            <div className="space-y-4">
              {[
                { label: "Add New Widget", icon: "➕", color: "text-blue-500" },
                { label: "View Analytics", icon: "📊", color: "text-success" },
                {
                  label: "Customize Layout",
                  icon: "🎨",
                  color: "text-yellow-500",
                },
                { label: "Export Reports", icon: "📤", color: "text-pink-500" },
              ].map((action, index) => (
                <button
                  key={action.label}
                  className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 py-4 rounded-xl cursor-pointer transition-all duration-300 text-gray-700 dark:text-gray-300 font-medium text-sm hover:border-primary hover:translate-x-1 animate-fade-in"
                >
                  <span className={`text-lg ${action.color}`}>
                    {action.icon}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {[
          {
            label: "Active Widgets",
            value: "3/8",
            icon: "🎯",
            color: "text-success",
          },
          {
            label: "Total Products",
            value: "47",
            icon: "📦",
            color: "text-blue-500",
          },
          {
            label: "Avg. Load Time",
            value: "1.2s",
            icon: "⚡",
            color: "text-yellow-500",
          },
          {
            label: "User Satisfaction",
            value: "94%",
            icon: "😊",
            color: "text-pink-500",
          },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="bg-card-light dark:bg-card-dark rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center animate-fade-in"
          >
            <div className="text-4xl mb-4">{stat.icon}</div>
            <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-base text-gray-600 dark:text-gray-400 font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
