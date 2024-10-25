import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Select from 'react-select';
import Tile from '../components/Tile';
import { dijkstra } from '../Waka-algo/dijkstra';
import '../styles/styles.css';
import { landmarks } from '../Data/landmarks';
import CardComponent from '../components/cardComponent';

const HomePage: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [path, setPath] = useState([]);
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const [rightClickCoords, setRightClickCoords] = useState(null);
  const [showCoords, setShowCoords] = useState(false);

  const handleCurrentLocationChange = (selectedOption) => {
    setCurrentLocation(selectedOption);
  };

  const handleDestinationChange = (selectedOption) => {
    setDestination(selectedOption);
  };

  const handleFindPath = () => {
    const graph = {
      science: { engineering: 1, library: 1, CITS: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      engineering: { science: 1, library: 1, CITS: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      CITS: { science: 1, engineering: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      library: { science: 1, engineering: 1, CITS: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      senate: { science: 1, engineering: 1, CITS: 1, library: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      law: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      arts: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      social_sciences: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      education: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      environmental_sciences: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      pharmacy: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      Management_Science: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      dli: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      nithub: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      church: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      mosque: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      iya_moriya: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      sports: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      hospital: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      Staff_school: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Jaja_Complex: 1, Moremi: 1, JAJA: 1 },
      Jaja_Complex: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Moremi: 1, JAJA: 1 },
      Moremi: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, JAJA: 1 },
      JAJA: { science: 1, engineering: 1, CITS: 1, library: 1, senate: 1, law: 1, arts: 1, social_sciences: 1, education: 1, environmental_sciences: 1, pharmacy: 1, Management_Science: 1, dli: 1, nithub: 1, church: 1, mosque: 1, iya_moriya: 1, sports: 1, hospital: 1, Staff_school: 1, Jaja_Complex: 1, Moremi: 1 },
    };
    const path = dijkstra(graph, currentLocation.value, destination.value);
    setPath(path);
  };

  const handleMarkerClick = (landmark) => {
    setSelectedLandmark(landmark);
  };

  const MapEvents = () => {
    useMapEvents({
      contextmenu(event) {
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
          attributionControl={true}
        />
        {landmarks.map(landmark => (
          <Marker key={landmark.value} position={landmark.position} eventHandlers={{ click: () => handleMarkerClick(landmark) }}>
            <Popup>{landmark.label}</Popup>
          </Marker>
        ))}
        {path.length > 0 && (
          <Polyline
            positions={path.map(node => landmarks.find(landmark => landmark.value === node).position)}
            color="blue"
            pathOptions={{ animate: true, duration: 2 }}
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