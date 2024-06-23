import React from "react";

interface MasonryGridProps {
  images: string[];
  columns: number;
  rows: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  images,
  columns = 4,
  rows = 4,
}) => {
  const gridColumns = Array.from({ length: columns }, () => []);

  images.forEach((image, index) => {
    gridColumns[index % columns].push(image);
  });

  return (
    <div className={`grid grid-cols-4 md:grid-cols-${rows} gap-4`}>
      {gridColumns.map((column, colIndex) => (
        <div key={colIndex} className="grid gap-4">
          {column.map((image, imgIndex) => (
            <div key={imgIndex}>
              <img
                className="h-full max-w-full bg-cover rounded-none"
                src={image}
                alt={`Gallery Image ${colIndex * columns + imgIndex}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
