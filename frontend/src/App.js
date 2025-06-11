import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReferralGenerator from './components/ReferralGenerator';
import CountdownTimer from './components/CountdownTimer';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <Router>
      <div className="body">
        <nav className="nav">
          <ul className="nav ul">
            <li><Link to="/" className="nav a">Dashboard</Link></li>
            <li><Link to="/referral" className="nav a">Referral</Link></li>
            <li><Link to="/timer" className="nav a">Countdown</Link></li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/referral" element={<ReferralGenerator />} />
            <Route path="/timer" element={<CountdownTimer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;