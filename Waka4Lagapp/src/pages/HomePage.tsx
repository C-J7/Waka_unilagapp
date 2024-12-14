import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Select from 'react-select';
import Tile from '../components/Tile';
import { dijkstra } from '../Waka-algo/dijkstra';
import '../styles/styles.css';
import { landmarks } from '../Data/landmarks';
import CardComponent from '../components/cardComponent';

interface Landmark {
  label: string;
  value: string;
  position: [number, number];
  info: string;
}

const HomePage: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Landmark | null>(null);
  const [destination, setDestination] = useState<Landmark | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [rightClickCoords, setRightClickCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showCoords, setShowCoords] = useState(false);

  const handleCurrentLocationChange = (selectedOption: Landmark | null) => {
    setCurrentLocation(selectedOption);
  };

  const handleDestinationChange = (selectedOption: Landmark | null) => {
    setDestination(selectedOption);
  };

  const handleFindPath = () => {
    if (!currentLocation || !destination) {
      return;
    }

    const graph = landmarks.reduce<{ [key: string]: { [key: string]: number } }>((acc, landmark) => {
      acc[landmark.value] = landmarks.reduce<{ [key: string]: number }>((innerAcc, innerLandmark) => {
        if (landmark.value !== innerLandmark.value) {
          innerAcc[innerLandmark.value] = 1; // Assuming a distance of 1 for simplicity
        }
        return innerAcc;
      }, {});
      return acc;
    }, {});

    const path = dijkstra(graph, currentLocation.value, destination.value);
    setPath(path);
  };

  const handleMarkerClick = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
  };

  const MapEvents = () => {
    useMapEvents({
      contextmenu(event: { latlng: { lat: any; lng: any; }; }) {
        const { lat, lng } = event.latlng;
        setRightClickCoords({ lat, lng });
        setShowCoords(true);
      },
      mouseup() {
        setShowCoords(false);
      },
    });
    return null;
  };

  return (
    <div className="home">
      <Tile>
        <div className="location-inputs">
          <Select
            placeholder="Where are you?"
            value={currentLocation}
            onChange={handleCurrentLocationChange}
            options={landmarks}
          />
          <Select
            placeholder="Where to?"
            value={destination}
            onChange={handleDestinationChange}
            options={landmarks}
          />
          <button className="find-path-button" onClick={handleFindPath}>Find Path</button>
        </div>
      </Tile>
      <MapContainer center={[6.516, 3.396]} zoom={15} style={{ height: '80vh', width: '100%' }} id="transitmap">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {landmarks.map(landmark => (
          <Marker key={landmark.value} position={landmark.position} eventHandlers={{ click: () => handleMarkerClick(landmark) }}>
            <Popup>{landmark.label}</Popup>
          </Marker>
        ))}
        {path.length > 0 && (
          <Polyline
            positions={path.map(node => {
              const landmark = landmarks.find(landmark => landmark.value === node);
              return landmark ? landmark.position : [0, 0];
            })}
            pathOptions={{ color: 'blue'}}
          />
        )}
        <MapEvents />
      </MapContainer>
      {showCoords && rightClickCoords && (
        <div className="coordinates-popup">
          <p>Coordinates: {rightClickCoords.lat}, {rightClickCoords.lng}</p>
        </div>
      )}
      {selectedLandmark && (
        <CardComponent title={selectedLandmark.label} info={selectedLandmark.info} />
      )}
    </div>
  );
};

export default HomePage;