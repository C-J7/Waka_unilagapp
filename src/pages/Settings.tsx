import { useState } from 'react';
   import '../styles/styles.css';

   const Settings: React.FC = () => {
     const [darkMode, setDarkMode] = useState(false);

     const handleToggleDarkMode = () => {
       setDarkMode(!darkMode);
       document.body.classList.toggle('dark-mode', !darkMode);
     };

     const handleToggleRTL = () => {
       document.body.classList.toggle('rtl');
     };

     const handleAutoLocation = () => {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position) => {
           console.log(position.coords.latitude, position.coords.longitude);
         });
       }
     };

     return (
       <div className="settings">
         <h1>Settings</h1>
         <button className="settings-button" onClick={handleToggleDarkMode}> Dark Mode</button>
         <button className="settings-button" onClick={handleToggleRTL}>Toggle RTL</button>
         <button className="settings-button" onClick={handleAutoLocation}>Get Current Location</button>
       </div>
     );
   };

   export default Settings;