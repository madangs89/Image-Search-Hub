import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";

// ✅ Image Card Component
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

// ✅ Skeleton Loader
const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl w-full h-48 sm:h-56" />
);

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState([]);
  const [filters, setFilters] = useState([
    "All",
    "Nature",
    "Abstract",
    "Technology",
    "Minimalist",
    "Travel",
  ]);
  const [currentSearch, setCurrentSearch] = useState("All");
  const [selectedImages, setSelectedImages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [details, setDetails] = useState({
    total: "",
    pages: "",
  });
  const [scrollLoading, setScrollLoading] = useState(false);

  // ✅ Fetch Images
  useEffect(() => {
    const fetchTopImages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/top`,
          { withCredentials: true }
        );
        if (data.success) {
          setCurrentSearch(data.currentSearch);
          setImages(data.results);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopImages();
  }, []);

  // ✅ Toggle selection
  const toggleImageSelect = useCallback((id) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    (async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/history/create`,
          {
            query: searchQuery.trim(),
          },
          { withCredentials: true }
        );
        console.log(data);
        if (data.success) {
          clearTimeout(data.history);
          setHistory((prev) => [data.history, ...prev]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    })();
    (async () => {
      try {
        const d = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/top/create`,
          {
            query: searchQuery.trim(),
          },
          { withCredentials: true }
        );
        console.log(d);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    })();
    setSelectedImages([]);
    setCurrentSearch(searchQuery.trim());
  };

  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      !loading &&
      page < details.pages
    ) {
      {
        setScrollLoading(true);
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/search`,
            {
              params: { input: currentSearch, page: page + 1 },
              withCredentials: true,
            }
          );

          if (data.success) {
            setDetails({
              total: data.total,
              pages: data.total_pages,
            });
            setImages((prevImages) => [...prevImages, ...data.results]);
            setPage((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Error loading more images:", error);
        } finally {
          setScrollLoading(false);
        }
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/history/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.success) {
        setHistory((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/search?input=${currentSearch}&page=${page}`,
          { withCredentials: true }
        );
        if (data.success) {
          setDetails({
            total: data.total,
            pages: data.total_pages,
          });
          setImages(data.results);
        }
        setSearchQuery("");
        setPage(1);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentSearch]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/history`,
          { withCredentials: true }
        );
        if (data.success) {
          setHistory(data.history);
        }
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="flex relative h-screen bg-[#fafbff] text-gray-900">
      {/* Sidebar */}
      <aside
        className={`sticky top-0 left-0 h-screen w-64 overflow-y-scroll bg-[#f3f2fb] border-r border-gray-200 p-5 transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Search History
          </h2>
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {history && history.length > 0 ? (
            history.map((item, idx) => (
              <div
                key={idx}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                  currentSearch === item.query
                    ? "bg-[#ede9fe] text-[#6b21a8] font-medium"
                    : "hover:bg-[#f4f3ff]"
                }`}
              >
                {/* Left: Query and Date */}
                <button
                  onClick={() => setCurrentSearch(item.query)}
                  className="flex flex-col text-left flex-1"
                >
                  <span className="text-sm truncate">{item.query}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </button>

                {/* Right: Delete Button (visible on hover) */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No search history found.</p>
          )}
        </div>
      </aside>

      {/* Main Section */}
      <main
        onScroll={handleScroll}
        className="flex-1  pb-20 h-screen overflow-y-auto relative"
      >
        {/* Top Bar */}
        <div className="sticky top-0 bg-[#fafbff] z-40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={22} />
            </button>
            <h3 className="text-xl sm:text-2xl font-bold">
              You searched for:{" "}
              <span className="text-[#6b21a8]">{currentSearch}</span>
            </h3>
            <div className="flex gap-2">
              <p className="text-sm text-gray-500">{details.total} results</p>
              <p className="text-sm text-gray-500">
                {details.pages} pages({page})
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="w-full sm:w-72 relative"
          >
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6b21a8] text-sm"
            />
          </form>
        </div>

        {/* Filters */}
        <div className="flex justify-between pr-3">
          <div className="flex flex-wrap gap-3 p-4 bg-[#fafbff]">
            {filters.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSearch(chip)}
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
          <p className="">{selectedImages.length} Selected</p>
        </div>

        {/* Image Grid */}
        <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 15 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : images.length > 0
            ? images.map((src) => (
                <ImageCard
                  key={src?.id}
                  src={src}
                  isSelected={selectedImages.includes(src?.id)}
                  onToggle={toggleImageSelect}
                />
              ))
            : !loading && (
                <p className="col-span-full text-center text-gray-500">
                  No images found.
                </p>
              )}
          {scrollLoading && (
            <>
              <SkeletonCard />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
