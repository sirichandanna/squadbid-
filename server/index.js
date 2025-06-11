const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let deals = [
  { id: 1, name: '50% Off Headphones', usersJoined: 3, totalNeeded: 10, deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
  { id: 2, name: '30% Off Sneakers', usersJoined: 5, totalNeeded: 8, deadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString() },
];
let referrals = {};

app.get('/api/deals', (req, res) => {
  res.json(deals);
});

app.post('/api/deals/:id/join', (req, res) => {
  const deal = deals.find(d => d.id === parseInt(req.params.id));
  if (!deal) return res.status(404).json({ message: 'Deal not found' });
  if (deal.usersJoined >= deal.totalNeeded) return res.json({ success: false, message: 'Deal is full' });
  deal.usersJoined += 1;
  res.json({ success: true, usersJoined: deal.usersJoined });
});

app.post('/api/referral', (req, res) => {
  const { userId } = req.body;
  const referralCode = uuidv4().slice(0, 8);
  referrals[referralCode] = userId;
  const referralLink = `http://localhost:3000/join?ref=${referralCode}`;
  res.json({ referralLink });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));