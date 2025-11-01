import React from "react";

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

export default ImageCard;
