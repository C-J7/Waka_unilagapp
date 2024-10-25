import React from 'react';

interface TileProps {
  children: React.ReactNode;
}

const Tile: React.FC<TileProps> = ({ children }) => {
  return (
    <div className="tile">
      {children}
    </div>
  );
};

export default Tile;