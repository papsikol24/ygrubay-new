import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to Your Gaming Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Ready to play? 🎮</h2>
          <p>You've successfully logged in to your gaming account.</p>
        </div>
        
        <div className="stats-container">
          <Link to="/games-owned" className="stat-card games-owned-card">
            <h3>Games Owned</h3>
            <p>42</p>
          </Link>
          
          <Link to="/hours-played" className="stat-card" style={{ cursor: 'pointer' }}>
            <h3>Hours Played</h3>
            <p>327</p>
          </Link>
          
          {/* Add a link to the Achievements page */}
          <Link to="/achievements" className="stat-card" style={{ cursor: 'pointer' }}>
            <h3>Achievements</h3>
            <p>86</p>
          </Link>
        </div>
        
        <div className="recent-activity">
          <h3>Recent Gaming Activity</h3>
          <ul>
            <li>🏆 Earned "Mythical Glory" in Mobile Legends Bang Bang</li>
            <li>🎮 Played Special Force for 3 hours</li>
            <li>👥 Joined multiplayer session in Valorant</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;