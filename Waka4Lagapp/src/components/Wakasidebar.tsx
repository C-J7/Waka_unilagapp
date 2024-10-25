import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCog, FaInfoCircle, FaBars } from 'react-icons/fa';

const Wakasidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
      setCollapsed(!collapsed);
    };


    return (
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <FaBars className="sidebar-toggle" onClick={toggleSidebar} />
        <ul>
          <li>
            <Link to="/"><FaHome /> Home</Link>
          </li>
          <li>
            <Link to="/settings"><FaCog /> Settings</Link>
          </li>
          <li>
            <Link to="/about"><FaInfoCircle /> About</Link>
          </li>
        </ul>
      </div>
    );
};

export default Wakasidebar;
