import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css"; // We'll create this CSS file

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Animation timing
    setIsLoaded(true);
    const timer = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  if (!isLoaded) return;

  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the faster
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  };

  animateCounters();
}, [isLoaded]);

  return (
    <div className={`intro-container ${isLoaded ? "loaded" : ""}`}>
      {/* Particle background */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Main content */}
      <div className="intro-content">
        <h1 className="intro-title">
          <span className="title-gradient">MGA TUMINONGNONG</span>
          <span className="title-glow">GAMING</span>
        </h1>
        
        <p className="intro-subtitle">
          Enter the ultimate gaming universe where every play counts
        </p>

        {/* Animated gaming stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-count="42">0</div>
            <div className="stat-label">Games Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-count="327">0</div>
            <div className="stat-label">Hours Played</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-count="86">0</div>
            <div className="stat-label">Achievements</div>
          </div>
        </div>

        {/* Glowing CTA button */}
        {showButton && (
          <Link to="/login" className="enter-button pulse">
            <span className="button-text">ENTER PORTAL</span>
            <span className="button-icon">🎮</span>
            <div className="button-glow"></div>
          </Link>
        )}
      </div>

      {/* Footer with social links */}
      <div className="intro-footer">
        <div className="social-links">
          <a href="#" className="social-link">Discord</a>
          <a href="#" className="social-link">Twitch</a>
          <a href="#" className="social-link">Twitter</a>
        </div>
        <p className="copyright">© 2023 Nexus Gaming. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
