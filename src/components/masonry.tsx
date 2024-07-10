import React from "react";

interface MasonryGridProps {
  images: string[];
  columns: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ columns, images }) => {
  const columnWrapper: { [key: string]: JSX.Element[] } = {};
  const result: JSX.Element[] = [];

  // Create array of empty arrays for each column
  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  // Distribute images into columns
  for (let i = 0; i < images.length; i++) {
    const column = i % columns;
    columnWrapper[`column${column}`].push(
      <div key={i} className="mb-2">
        <img src={images[i]} alt={`Image ${i}`} className="w-full h-auto" />
      </div>
    );
  }

  // Wrap column content in a div
  for (let i = 0; i < columns; i++) {
    result.push(
      <div key={i} className="flex-1 px-1">
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return <div className="flex">{result}</div>;
};

export default MasonryGrid;
