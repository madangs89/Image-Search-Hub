import React from "react";

const SearchBar = ({handleFormSubmit, searchQuery, setSearchQuery}) => {
  return (
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
  );
};

export default SearchBar;
