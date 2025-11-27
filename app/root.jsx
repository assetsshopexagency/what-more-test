import {
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
  Links,
} from "react-router";
import { useState, useEffect } from "react";
import "./styles/tailwind.css";

export default function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkTheme(true);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleSubMenu = (label) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  const menuSections = [
    {
      title: "Whatmore",
      icon: "🚀",
      items: [
        { label: "Home", checked: false, href: "/app", icon: "🏠" },
        {
          label: "VIDEO WIDGETS",
          icon: "🎬",
          subItems: [
            { label: "Video Gallery", href: "/app/video-gallery", icon: "🖼️" },
            { label: "Product Pages", href: "/app/product-pages", icon: "📦" },
            { label: "Homepage", href: "/app/homepage", icon: "🏡" },
            {
              label: "Collection Pages",
              href: "/app/collection-pages",
              icon: "📚",
            },
            { label: "Pages", href: "/app/pages", icon: "📄" },
          ],
        },
      ],
    },
    {
      title: "MARKETING",
      icon: "📈",
      items: [
        {
          label: "Smart Retargeting",
          checked: true,
          href: "/app/smart-retargeting",
          icon: "🎯",
        },
        {
          label: "Advanced Retargeting",
          checked: true,
          href: "/app/advanced-retargeting",
          icon: "⚡",
        },
        {
          label: "Spotlight",
          checked: true,
          href: "/app/spotlight",
          icon: "💡",
        },
        {
          label: "Lead Capture & Quiz",
          checked: false,
          href: "/app/lead-capture",
          icon: "📝",
        },
      ],
    },
    {
      title: "ANALYTICS",
      icon: "📊",
      items: [
        {
          label: "Overview",
          checked: true,
          href: "/app/analytics",
          icon: "👁️",
        },
        {
          label: "Conversions",
          checked: true,
          href: "/app/conversions",
          icon: "🔄",
        },
        {
          label: "Engagement",
          checked: false,
          href: "/app/engagement",
          icon: "❤️",
        },
        {
          label: "A/B Testing",
          checked: false,
          href: "/app/ab-testing",
          icon: "🧪",
        },
      ],
    },
    {
      title: "SETTINGS",
      icon: "⚙️",
      items: [
        {
          label: "Customizations",
          checked: true,
          href: "/app/customizations",
          icon: "🎨",
        },
        { label: "Profile", checked: false, href: "/app/profile", icon: "👤" },
      ],
    },
  ];

  return (
    <html lang="en" className={isDarkTheme ? "dark" : ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Watch-EE</title>
        <Links />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-all duration-300 min-h-screen m-0">
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="w-72 bg-card-light dark:bg-card-dark border-r border-gray-200 dark:border-gray-700 p-8 flex flex-col relative animate-slide-in shadow-xl">
              {/* Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm flex items-center justify-center cursor-pointer text-gray-500 dark:text-gray-400 transition-all duration-300 hover:bg-error/10 hover:text-error hover:rotate-90"
              >
                ✕
              </button>

              {/* Logo */}
              <div className="flex items-center mb-12 px-2 animate-fade-in">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg animate-pulse">
                  EE
                </div>
                <div className="ml-3">
                  <div className="text-xl font-bold text-black dark:text-white">
                    EE App ZAIN
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Premium Dashboard
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="flex-1">
                {menuSections.map((section, sectionIndex) => (
                  <div
                    key={section.title}
                    className="mb-10 animate-fade-in"
                    style={{ animationDelay: `${200 + sectionIndex * 100}ms` }}
                  >
                    {/* Section Title */}
                    <div className="flex items-center gap-3 mb-4 px-2">
                      <span className="text-base opacity-70">
                        {section.icon}
                      </span>
                      <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wide m-0">
                        {section.title}
                      </h3>
                    </div>

                    {/* Section Items */}
                    <ul className="list-none p-0 m-0">
                      {section.items.map((item, itemIndex) => (
                        <li key={item.label} className="mb-2">
                          {item.subItems ? (
                            <div>
                              <div
                                onClick={() => toggleSubMenu(item.label)}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                                  activeSubMenu === item.label
                                    ? "bg-primary/20 border-primary/30 text-primary"
                                    : "bg-transparent border-transparent text-gray-700 dark:text-gray-300"
                                } hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:translate-x-1`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-base">{item.icon}</span>
                                  <span
                                    className={`text-sm font-medium ${
                                      activeSubMenu === item.label
                                        ? "text-primary"
                                        : "text-gray-700 dark:text-gray-300"
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                </div>
                                <span
                                  className={`text-xs text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                                    activeSubMenu === item.label
                                      ? "rotate-180"
                                      : "rotate-0"
                                  }`}
                                >
                                  ▼
                                </span>
                              </div>

                              {/* Sub-items */}
                              {activeSubMenu === item.label && (
                                <ul className="list-none py-2 px-0 ml-8 border-l-2 border-primary/30">
                                  {item.subItems.map((subItem, subIndex) => (
                                    <li key={subItem.label}>
                                      <Link
                                        to={subItem.href}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-300 no-underline border ${
                                          location.pathname === subItem.href
                                            ? "bg-primary/20 border-primary/30 text-primary"
                                            : "bg-transparent border-transparent text-gray-500 dark:text-gray-400"
                                        } hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-700 dark:hover:text-gray-300 hover:translate-x-1`}
                                      >
                                        <span className="text-sm">
                                          {subItem.icon}
                                        </span>
                                        {subItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ) : (
                            <Link
                              to={item.href || "#"}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl no-underline transition-all duration-300 border ${
                                location.pathname === item.href
                                  ? "bg-primary/30 border-primary/40 text-primary shadow-lg shadow-primary/30"
                                  : "bg-transparent border-transparent text-gray-700 dark:text-gray-300"
                              } hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:translate-x-1`}
                            >
                              <div
                                className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                                  item.checked
                                    ? "bg-success border-success"
                                    : "border-gray-300 dark:border-gray-600 bg-transparent"
                                }`}
                              >
                                {item.checked && (
                                  <svg
                                    width="10"
                                    height="8"
                                    viewBox="0 0 10 8"
                                    fill="none"
                                  >
                                    <path
                                      d="M1 4L3.5 6.5L9 1"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm">{item.icon}</span>
                              <span className="text-sm font-medium flex-1">
                                {item.label}
                              </span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Separator */}
                    {sectionIndex < menuSections.length - 1 && (
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent my-6" />
                    )}
                  </div>
                ))}
              </nav>

              {/* Theme Toggle in Sidebar */}
              <div className="pt-4 px-2 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-3 bg-primary/10 border border-primary/20 px-4 py-3 rounded-xl cursor-pointer text-gray-700 dark:text-gray-300 text-sm font-semibold transition-all duration-300 hover:bg-primary/20 hover:-translate-y-0.5"
                >
                  <span className="text-lg">{isDarkTheme ? "☀️" : "🌙"}</span>
                  {isDarkTheme ? "Light Mode" : "Dark Mode"}
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 px-3 py-3 mt-4 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center text-sm">
                    👤
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      DEV STORE
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Premium Plan
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <header className="px-8 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-card-light dark:bg-card-dark backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-4">
                {/* Menu Toggle */}
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 cursor-pointer flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-md hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    Open Menu
                  </button>
                )}

                {/* Theme Toggle for Mobile */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 cursor-pointer text-xl transition-all duration-300 hover:scale-110"
                >
                  {isDarkTheme ? "☀️" : "🌙"}
                </button>
              </div>

              {/* Home Link */}
              <Link
                to="/app"
                className={`px-6 py-3 rounded-xl no-underline text-sm font-semibold transition-all duration-300 shadow-md ${
                  location.pathname === "/app"
                    ? "bg-primary text-white shadow-primary/40"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                } hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-xl`}
              >
                🏠 Home Dashboard
              </Link>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-8 bg-background-light dark:bg-background-dark overflow-auto relative">
              {/* Background Elements */}

              <Outlet />
            </main>

            {/* Footer */}
            <footer className="px-8 py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark backdrop-blur-sm">
              <div className="flex justify-center items-center gap-2 mb-1">
                <span>✨</span>
                <span>
                  © 2025{" "}
                  <strong className="text-gray-900 dark:text-gray-100">
                    Watch-EE
                  </strong>
                </span>
                <span>•</span>
                <span>
                  Built with 💙 using{" "}
                  <strong className="text-primary">Remix</strong> +{" "}
                  <strong className="text-success">Shopify</strong>
                </span>
                <span>✨</span>
              </div>
              <div className="text-xs opacity-70">
                Elevating e-commerce experiences with stunning visuals and
                powerful analytics
              </div>
            </footer>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
