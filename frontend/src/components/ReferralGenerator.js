import React, { useState } from 'react';
import axios from 'axios';

function ReferralGenerator() {
  const [userId, setUserId] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerate = async () => {
    if (!userId) {
      setMessage('Please enter a user ID');
      return;
    }
    try {
      const response = await axios.post('https://squadbid-1.onrender.com/api/referral', { userId });
      setReferralLink(response.data.referralLink);
      setMessage('Referral link generated!');
    } catch (error) {
      setMessage('Error generating link');
    }
  };

  return (
    <div className="card">
      <h2 className="card h2">Generate Referral Link</h2>
      <input
        type="text"
        placeholder="Enter your User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="card input"
      />
      <button
        onClick={handleGenerate}
        className="card button"
      >
        Generate Link
      </button>
      {referralLink && (
        <p className="card p success">Your link: <a href={referralLink} className="underline">{referralLink}</a></p>
      )}
      {message && <p className="card p error">{message}</p>}
    </div>
  );
}

export default ReferralGenerator;