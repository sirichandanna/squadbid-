import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get('https://squadbid-1.onrender.com/api/deals');
        setDeals(response.data);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="card">
      <h2 className="card h2">Active Group Deals</h2>
      <div className="grid">
        {deals.map(deal => (
          <div key={deal.id} className="grid div">
            <h3 className="text-lg font-semibold">{deal.name}</h3>
            <p className="card p">Users Joined: {deal.usersJoined}/{deal.totalNeeded}</p>
            <p className="card p">Deadline: {new Date(deal.deadline).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;