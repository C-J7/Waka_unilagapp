// import { Map, TileLayer, Marker } from 'leaflet';

// const MapComponent = () => {
//   const map = useRef(null);

//   useEffect(() => {
//     map.current = L.map('map', {
//       center: [6.4531, 3.3957], // Unilag coordinates
//       zoom: 18,
//     });

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
//       subdomains: ['a', 'b', 'c'],
//     }).addTo(map.current);
//   }, []);

//   return (
//     <div id="map" style={{ height: '500px', width: '800px' }} />
//   );
// };