const express = require('express');
const bcrypt = require('bcryptjs');
const { query } = require('../config/database');
const { verifyToken } = require('../config/auth');

const router = express.Router();

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await query.get(
      'SELECT id, name, email, phone, matric_number, created_at FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, phone, matricNumber } = req.body;

    await query.run(
      'UPDATE users SET name = ?, phone = ?, matric_number = ? WHERE id = ?',
      [name, phone, matricNumber, req.user.userId]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's listings
router.get('/my-listings', verifyToken, async (req, res) => {
  try {
    const listings = await query.all(
      `SELECT * FROM listings WHERE user_id = ? ORDER BY created_at DESC`,
      [req.user.userId]
    );

    res.json(listings);
  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get public user info
router.get('/:id', async (req, res) => {
  try {
    const user = await query.get(
      'SELECT id, name, email, phone, created_at FROM users WHERE id = ?',
      [req.params.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

