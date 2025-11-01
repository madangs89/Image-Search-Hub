import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Memoized image card
const ImageCard = React.memo(({ src, isSelected, onToggle }) => (
  <div
    onClick={() => onToggle(src?.id)}
    className="relative group rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
  >
    <img
      src={src?.urls?.small}
      alt={`img-${src?.id}`}
      loading="lazy"
      className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div
      className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
        isSelected
          ? "border-[#6b21a8] bg-[#6b21a8]"
          : "border-gray-300 bg-white"
      }`}
    >
      {isSelected && <span className="text-white text-xs font-bold">✓</span>}
    </div>
  </div>
));

// Skeleton card for loading state
const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl w-full h-48 sm:h-56" />
);

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [history] = useState([
    "Abstract",
    "Architecture",
    "Minimalist",
    "Wallpapers",
    "Animals",
  ]);
  const [filters] = useState([
    "All",
    "Nature",
    "Abstract",
    "Technology",
    "Minimalist",
    "Travel",
  ]);
  const [currentSearch, setCurrentSearch] = useState("All");
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchTopImages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/top`,
          { withCredentials: true }
        );
        if (data.success) setImages(data.results);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopImages();
  }, []);

  const toggleImageSelect = useCallback((id) => {
    setSelectedImages((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }, []);

  return (
    <div className="flex h-screen bg-[#fafbff] text-gray-900">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 fixed top-0 left-0 h-screen bg-[#f3f2fb] border-r border-gray-200 p-5 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Your Search History
        </h2>
        <p className="text-sm text-gray-500 mb-4">Recent searches</p>

        <div className="flex flex-col gap-2">
          {history.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSearch(item)}
              className={`text-left w-full px-3 py-2 rounded-lg cursor-pointer transition-all ${
                currentSearch === item
                  ? "bg-[#ede9fe] text-[#6b21a8] font-medium"
                  : "hover:bg-[#f4f3ff]"
              }`}
            >
              <span className="text-sm">{item}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 h-screen overflow-y-auto p-5 lg:p-10">
        {/* Filter Section */}
        <div className="flex flex-wrap gap-3 pb-6  bg-[#fafbff] z-10 pt-2">
          {filters.map((chip, idx) => (
            <button
              onClick={() => setCurrentSearch(chip)}
              key={idx}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition ${
                chip === currentSearch
                  ? "bg-[#6b21a8] text-white shadow-sm"
                  : "bg-white border border-gray-200 hover:bg-[#f6f5ff]"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Title Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6">
          <h3 className="text-xl sm:text-2xl font-bold">
            You searched for:{" "}
            <span className="text-[#6b21a8] font-semibold">
              {currentSearch}
            </span>{" "}
            — {images.length} results
          </h3>
          <p className="text-[#6b21a8] text-sm font-medium mt-2 sm:mt-0">
            Selected: {selectedImages.length} image
            {selectedImages.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 pb-10">
          {loading
            ? // 🔄 Show skeletons while loading
              Array.from({ length: 15 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : // ✅ Show actual images
              images.map((src) => (
                <ImageCard
                  key={src?.id}
                  src={src}
                  isSelected={selectedImages.includes(src?.id)}
                  onToggle={toggleImageSelect}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
