import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './HoursPlayed.css';

const HoursPlayed = () => {
  const navigate = useNavigate();

  const gameDetails = [
    { name: "Mobile Legends", hours: 156 },
    { name: "Special Force", hours: 89 },
    { name: "Valorant", hours: 42 },
    { name: "Genshin Impact", hours: 67 },
    // Add more if needed
  ];

  const [animatedHours, setAnimatedHours] = useState(
    gameDetails.reduce((acc, game) => ({ ...acc, [game.name]: 0 }), {})
  );

  useEffect(() => {
    // Animate count-up for each game hours
    gameDetails.forEach((game) => {
      let current = 0;
      const target = game.hours;
      const duration = 1500; // 1.5 seconds
      const startTime = performance.now();

      const animate = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
        setAnimatedHours((prev) => ({ ...prev, [game.name]: value }));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimatedHours((prev) => ({ ...prev, [game.name]: target }));
        }
      };
      requestAnimationFrame(animate);
    });
  }, []);

  return (
    <div className="hours-played-container fade-in">
      <header className="header"> 
        <h1>My Total Play Hours</h1>
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          &larr; Back to Dashboard
        </button>
      </header>
      <div className="games-list">
        {gameDetails.map((game, index) => (
          <div key={index} className="game-card slide-up">
            <h2>{game.name}</h2>
            <p className="hours-count">{animatedHours[game.name]}h</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoursPlayed;