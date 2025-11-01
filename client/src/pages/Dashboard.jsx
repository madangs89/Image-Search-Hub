import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";
import ImageCard from "../components/ImageCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topSearchData, setTopSearchData] = useState("");
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState([]);
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [details, setDetails] = useState({ total: "", pages: "" });
  const [scrollLoading, setScrollLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/status`,
          {
            withCredentials: true,
          }
        );
        console.log("Auth Status:", res.data);
        if (!res.data.authenticated) {
          navigate("/");
        }
      } catch (error) {
        // navigate("/");
        console.error("Error fetching auth status:", error);
      }
    })();
  }, []);

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
          setTopSearchData(data.topSearch);
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
          { query: searchQuery.trim() },
          { withCredentials: true }
        );
        if (data.success) {
          setHistory((prev) => [data.history, ...prev]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    })();

    (async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/top/create`,
          { query: searchQuery.trim() },
          { withCredentials: true }
        );
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
          setDetails({ total: data.total, pages: data.total_pages });
          setImages((prevImages) => [...prevImages, ...data.results]);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error loading more images:", error);
      } finally {
        setScrollLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/history/delete/${id}`,
        { withCredentials: true }
      );
      if (data.success) {
        setHistory((prev) => prev.filter((item) => item._id !== id));
        toast.success("History deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting history:", error);
      toast.error("Error deleting history");
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
          setDetails({ total: data.total, pages: data.total_pages });
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
    <div className="flex flex-col lg:flex-row relative h-screen bg-[#fafbff] text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-screen w-64 overflow-y-auto bg-[#f3f2fb] border-r border-gray-200 p-5 transition-transform duration-300 z-50 ${
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
                <button
                  onClick={() => setCurrentSearch(item.query)}
                  className="flex flex-col text-left flex-1"
                >
                  <span className="text-sm truncate">{item.query}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </button>

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
        className="flex-1 h-screen overflow-y-auto pb-20 relative"
      >
        {/* Top Bar */}
        <div className="sticky top-0 bg-[#fafbff] z-40 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden text-gray-700"
                onClick={() => setSidebarOpen(true)}
              >
                <FiMenu size={22} />
              </button>

              {currentSearch == "top" ? (
                <h3 className="text-lg sm:text-xl font-bold text-center sm:text-left">
                  Highest Searched{" "}
                  <span className="text-[#6b21a8]">{topSearchData}</span>
                </h3>
              ) : (
                <h3 className="text-lg sm:text-xl font-bold text-center sm:text-left">
                  You searched for:{" "}
                  <span className="text-[#6b21a8]">{currentSearch}</span>
                </h3>
              )}
            </div>
            <div className="flex gap-2 text-sm text-gray-500 justify-center sm:justify-start">
              <p>{details.total} results</p>
              <p>
                {details.pages} pages({page})
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-auto">
            <SearchBar
              handleFormSubmit={handleFormSubmit}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-[#fafbff]">
          <div className="flex flex-wrap gap-2">
            {filters.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSearch(chip)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  chip === currentSearch
                    ? "bg-[#6b21a8] text-white shadow-sm"
                    : "bg-white border border-gray-200 hover:bg-[#f6f5ff]"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2 sm:mt-0">
            {selectedImages.length} Selected
          </p>
        </div>

        {/* Image Grid */}
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
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
          {scrollLoading && <SkeletonCard />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
