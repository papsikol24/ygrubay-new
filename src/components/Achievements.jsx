// src/components/Achievements.jsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Achievements.css';

const Achievements = () => {
  const navigate = useNavigate();

  // Sample data: list of achievements across all games
  const [achievements, setAchievements] = useState([]);

  // Sample achievements data, you can extend this or fetch dynamically
  const allAchievements = [
    {
      game: "Mobile Legends",
      achievement: "Legendary Hero",
      description: "Achieved the highest rank in Mobile Legends",
      date: "2023-03-15",
    },
    {
      game: "Cyberpunk 2077",
      achievement: "Cybernetics Expert",
      description: "Unlocked all cyberware upgrades",
      date: "2023-04-10",
    },
    {
      game: "Valorant",
      achievement: "Sharpshooter",
      description: "Achieved 100 headshots in a single match",
      date: "2023-05-05",
    },
    {
      game: "Genshin Impact",
      achievement: "Adventurer",
      description: "Completed all main quests",
      date: "2023-06-20",
    },
    // Add more achievements as needed
  ];

  useEffect(() => {
    // In real app, fetch achievements from API or state
    setAchievements(allAchievements);
  }, []);

  return (
    <div className="achievements-container">
      <header className="achievements-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
        <h1>My Achievements</h1>
      </header>
      <div className="achievements-list">
        {achievements.length > 0 ? (
          achievements.map((achieve, index) => (
            <div key={index} className="achievement-card">
              <h2>{achieve.achievement}</h2>
              <p><strong>Game:</strong> {achieve.game}</p>
              <p><strong>Description:</strong> {achieve.description}</p>
              <p><strong>Date:</strong> {achieve.date}</p>
            </div>
          ))
        ) : (
          <p>No achievements to display.</p>
        )}
      </div>
    </div>
  );
};

export default Achievements;