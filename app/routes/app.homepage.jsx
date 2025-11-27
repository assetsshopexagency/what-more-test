// app/routes/app.homepage.jsx
import { useState } from "react";

export default function Homepage() {
  const [activeTab, setActiveTab] = useState("carousels");

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      {/* Header Section */}
      <div className="mb-12 animate-slide-in">
        <h1 className="text-5xl font-bold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
          📊 Analytics
        </h1>
        <p className="text-xl text-muted-light mb-8">
          Homepage Performance & Widget Analytics
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Active Videos & Carousels */}
        <div className="bg-gradient-to-br from-card-light to-background-light rounded-2xl p-10 border border-border-light shadow-xl animate-fade-in delay-200">
          {/* Active Videos Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-7xl font-bold bg-gradient-to-br from-success to-[#059669] bg-clip-text text-transparent leading-none">
                13
              </div>
              <div className="text-lg text-muted-light font-semibold">
                Active Videos
              </div>
            </div>
            <div className="bg-gradient-to-br from-success to-[#059669] text-white py-2 px-4 rounded-full text-xs font-bold">
              🟢 LIVE
            </div>
          </div>

          {/* Trending Widgets Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-2 rounded-lg text-xl">
                📈
              </span>
              Trending Widgets
            </h3>

            {/* Carousels Widget */}
            <div className="bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] border-2 border-amber-500 rounded-2xl p-8 mb-8 animate-fade-in delay-400">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white p-3 rounded-xl text-2xl">
                  🎠
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-amber-900 mb-2">
                    Carousels
                  </h4>
                  <p className="text-amber-700 leading-relaxed mb-4">
                    Your videos are added but the carousel is not active
                  </p>
                  <div className="bg-amber-50 border border-amber-500 rounded-lg py-3 px-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                    ⚠️ Activation Required
                  </div>
                </div>
              </div>

              {/* How it looks section */}
              <div className="bg-gradient-to-br from-background-light to-slate-100 rounded-xl p-6 border border-border-light">
                <h5 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span>👀</span>
                  How it looks
                </h5>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg h-20 flex items-center justify-center text-white text-2xl">
                    🎨
                  </div>
                  <div className="bg-gradient-to-br from-success to-[#059669] rounded-lg h-20 flex items-center justify-center text-white text-2xl">
                    📱
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-success font-semibold">
                    <span>✅</span>
                    Choose from 7+ templates
                  </div>
                  <div className="flex items-center gap-2 text-success font-semibold">
                    <span>📈</span>
                    Increase conversions by 5x
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stories & Engagement */}
        <div className="bg-gradient-to-br from-card-light to-background-light rounded-2xl p-10 border border-border-light shadow-xl animate-fade-in delay-300">
          {/* Active Stories Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-7xl font-bold bg-gradient-to-br from-error to-[#dc2626] bg-clip-text text-transparent leading-none">
                0
              </div>
              <div className="text-lg text-muted-light font-semibold">
                Active Stories
              </div>
            </div>
            <div className="bg-gradient-to-br from-error to-[#dc2626] text-white py-2 px-4 rounded-full text-xs font-bold">
              🔴 INACTIVE
            </div>
          </div>

          {/* Stories Section */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-error rounded-2xl p-8 mb-8 animate-fade-in delay-500">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-error to-[#dc2626] text-white p-3 rounded-xl text-2xl">
                📖
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-error mb-2">Stories</h4>
                <p className="text-red-700 leading-relaxed">
                  Your stories are not active yet
                </p>
              </div>
            </div>

            {/* How it looks section for Stories */}
            <div className="bg-gradient-to-br from-background-light to-slate-100 rounded-xl p-6 border border-border-light">
              <h5 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span>👀</span>
                How it looks
              </h5>
              <div className="bg-gradient-to-br from-[#8b5cf6] to-[#a855f7] rounded-lg h-24 flex items-center justify-center text-white text-3xl mb-4">
                📱
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-violet-600 font-semibold">
                  <span>✅</span>
                  Choose from 3+ templates
                </div>
                <div className="flex items-center gap-2 text-violet-600 font-semibold">
                  <span>🔥</span>
                  Add trending videos like (a)
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in delay-700">
            {/* Total Clicks */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-500 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-800 mb-2">57</div>
              <div className="text-sm text-gray-700 font-semibold">
                Total Homepage Video Clicks
              </div>
            </div>

            {/* Engaged Sections */}
            <div className="bg-gradient-to-br from-green-50 to-lime-100 border border-green-500 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-green-800 mb-2">5</div>
              <div className="text-sm text-gray-700 font-semibold">
                Total Engaged Sections
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banners Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Banners Info */}
        <div className="bg-gradient-to-br from-card-light to-background-light rounded-2xl p-10 border border-border-light shadow-xl animate-fade-in delay-800">
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-[#8b5cf6] to-[#a855f7] text-white p-4 rounded-xl text-3xl">
              🎨
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Banners</h3>
              <p className="text-muted-light leading-relaxed mb-6 text-lg">
                Switch to dynamic video banners, avoid boring image banners
              </p>
              <button className="bg-gradient-to-br from-[#8b5cf6] to-[#a855f7] text-white border-none py-4 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-400/40">
                🚀 Unlock Banners
              </button>
            </div>
          </div>
        </div>

        {/* How it looks for Banners */}
        <div className="bg-gradient-to-br from-card-light to-background-light rounded-2xl p-10 border border-border-light shadow-xl animate-fade-in delay-900">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-2 rounded-lg text-lg">
              👀
            </span>
            How it looks
          </h4>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-dashed border-amber-500 rounded-xl p-8 text-center mb-6">
            <div className="text-5xl mb-4">🎬</div>
            <div className="text-base text-amber-900 font-semibold">
              Dynamic Video Banner Preview
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-gradient-to-br from-green-50 to-emerald-100 py-4 px-4 rounded-lg border border-emerald-300">
              <span className="text-success text-xl">📈</span>
              <span className="text-emerald-800 font-semibold">
                Increase conversion by 3x
              </span>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4 rounded-lg border border-blue-300">
              <span className="text-blue-700 text-xl">⚡</span>
              <span className="text-blue-800 font-semibold">
                Real-time dynamic banners
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Avg. Session Duration",
            value: "3:24",
            icon: "⏱️",
            color: "text-blue-500",
          },
          {
            label: "Bounce Rate",
            value: "32%",
            icon: "📊",
            color: "text-error",
          },
          {
            label: "Video Completion",
            value: "78%",
            icon: "✅",
            color: "text-success",
          },
          {
            label: "User Engagement",
            value: "4.2/5",
            icon: "⭐",
            color: "text-amber-500",
          },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="bg-gradient-to-br from-card-light to-background-light rounded-2xl p-6 border border-border-light text-center animate-fade-in"
            style={{ animationDelay: `${1 + index * 0.1}s` }}
          >
            <div className={`text-3xl mb-3 ${stat.color}`}>{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-sm text-muted-light font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
