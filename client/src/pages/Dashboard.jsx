import React, { useState } from "react";

const Dashboard = () => {
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
    "https://images.unsplash.com/photo-1521334884684-d80222895322",
  ]);

  const [history, setHistory] = useState([
    "Abstract",
    "Architecture",
    "Minimalist",
    "Wallpapers",
    "Animals",
  ]);

  const [filters, setFilters] = useState([
    "All",
    "Nature",
    "Abstract",
    "Technology",
    "Minimalist",
    "Travel",
  ]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentSearchInput, setCurrentSearchInput] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#fafbff] text-gray-900">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#f3f2fb] border-r border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Your Search History
        </h2>
        <p className="text-sm text-gray-500 mb-4">Recent searches</p>

        <div className="flex flex-col gap-2">
          {history.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                idx === 0
                  ? "bg-[#ede9fe] text-[#6b21a8] font-medium"
                  : "hover:bg-[#f4f3ff]"
              }`}
            >
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 lg:p-10 overflow-y-auto">
        {/* Filter Section */}
        <div className="flex flex-wrap gap-3 pb-6">
          {filters.map((chip, idx) => (
            <button
              onClick={() => setCurrentSearch(chip)}
              key={idx}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition ${
                chip === currentSearch
                  ? "bg-[#6b21a8] text-white"
                  : "bg-white border border-gray-200 hover:bg-[#f6f5ff]"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Title Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6">
          <h3 className="text-2xl font-bold">
            You searched for:{" "}
            <span className="text-[#6b21a8] font-semibold">Nature</span> — 1,234
            results
          </h3>
          <p className="text-[#6b21a8] text-sm font-medium mt-2 sm:mt-0">
            Selected: 5 images
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {images.map((src, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (selectedImages.includes(src)) {
                  setSelectedImages(
                    selectedImages.filter((item) => item !== src)
                  );
                } else {
                  setSelectedImages([...selectedImages, src]);
                }
              }}
              className="relative group rounded-xl overflow-hidden bg-gray-100"
            >
              <img
                src={src}
                alt={`img-${idx}`}
                className="w-full cursor-pointer h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {selectedImages.length > 0 && (
                <div
                  className={`absolute top-2 right-2 w-6 h-6  border-2 flex items-center justify-center  transition-all ${
                    selectedImages.includes(src)
                      ? "border-[#6b21a8] bg-[#6b21a8] text-[#6b21a8]"
                      : "border-gray-200 bg-white bg-transparent text-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
