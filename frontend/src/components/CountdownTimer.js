import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CountdownTimer() {
  const deal = { 
    id: 1, 
    name: '🎧 50% Off Premium Headphones', 
    totalNeeded: 10, 
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() 
  };
  const [usersJoined, setUsersJoined] = useState(3);
  const [timeLeft, setTimeLeft] = useState('');
  const [message, setMessage] = useState('');

  const progressPercentage = (usersJoined / deal.totalNeeded) * 100;

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const deadline = new Date(deal.deadline);
      const diff = deadline - now;
      if (diff <= 0) {
        setTimeLeft('Deal Expired');
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleJoin = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/deals/${deal.id}/join`);
      if (response.data.success) {
        setUsersJoined(response.data.usersJoined);
        setMessage('🎉 Successfully joined the group deal!');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('❌ Error joining deal');
    }
  };

  return (
    <div className="card">
      <h2>{deal.name}</h2>
      
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p><strong>{usersJoined}</strong> of <strong>{deal.totalNeeded}</strong> people joined</p>
      
      <div className="timer-display">
        ⏰ {timeLeft}
      </div>
      
      <button
        onClick={handleJoin}
        disabled={usersJoined >= deal.totalNeeded || timeLeft === 'Deal Expired'}
      >
        {usersJoined >= deal.totalNeeded ? '✅ Deal Complete' : '🚀 Join Deal'}
      </button>
      
      {message && <p className={message.includes('Successfully') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default CountdownTimer;
