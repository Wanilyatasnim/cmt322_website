const express = require('express');
const { query } = require('../config/database');
const { verifyToken, isAdmin } = require('../config/auth');

const router = express.Router();

// Middleware to check admin access
router.use(verifyToken, isAdmin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await query.all(
      'SELECT id, name, email, phone, matric_number, role, status, created_at FROM users ORDER BY id DESC'
    );
    
    // Debug: Log user count and IDs
    console.log(`[Admin] Returning ${users.length} users:`, users.map(u => `${u.id}:${u.email}`).join(', '));
    
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all listings
router.get('/listings', async (req, res) => {
  try {
    const listings = await query.all(
      'SELECT * FROM listings ORDER BY created_at DESC'
    );
    res.json(listings);
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete listing
router.delete('/listings/:id', async (req, res) => {
  try {
    await query.run('DELETE FROM listings WHERE id = ?', [req.params.id]);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Ban user
router.patch('/users/:id/ban', async (req, res) => {
  try {
    await query.run(
      'UPDATE users SET status = ? WHERE id = ?',
      ['banned', req.params.id]
    );
    res.json({ message: 'User banned successfully' });
  } catch (error) {
    console.error('Ban user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Unban user
router.patch('/users/:id/unban', async (req, res) => {
  try {
    await query.run(
      'UPDATE users SET status = ? WHERE id = ?',
      ['active', req.params.id]
    );
    res.json({ message: 'User unbanned successfully' });
  } catch (error) {
    console.error('Unban user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await query.get('SELECT COUNT(*) as count FROM users');
    const totalListings = await query.get('SELECT COUNT(*) as count FROM listings');
    const activeListings = await query.get("SELECT COUNT(*) as count FROM listings WHERE status = 'active'");
    const soldListings = await query.get("SELECT COUNT(*) as count FROM listings WHERE status = 'sold'");
    
    // Debug: Log actual counts
    console.log(`[Admin Stats] Users: ${totalUsers.count}, Listings: ${totalListings.count}`);
    
    res.json({
      totalUsers: totalUsers.count,
      totalListings: totalListings.count,
      activeListings: activeListings.count,
      soldListings: soldListings.count
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Approve listing (can be extended for approval workflow)
router.patch('/listings/:id/approve', async (req, res) => {
  try {
    await query.run(
      'UPDATE listings SET status = ? WHERE id = ?',
      ['active', req.params.id]
    );
    res.json({ message: 'Listing approved successfully' });
  } catch (error) {
    console.error('Approve listing error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Debug endpoint: Get all users with full details (including password hash for verification)
router.get('/debug/users', async (req, res) => {
  try {
    const users = await query.all('SELECT * FROM users ORDER BY id');
    const count = await query.get('SELECT COUNT(*) as count FROM users');
    
    res.json({
      totalCount: count.count,
      users: users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        matric_number: u.matric_number,
        role: u.role,
        status: u.status,
        created_at: u.created_at,
        hasPassword: !!u.password
      }))
    });
  } catch (error) {
    console.error('Debug users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

