const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Initialize database
db.init().then(() => {
  console.log('Database initialized successfully');
  
  // Auto-seed sample data if database is empty (for Railway deployment)
  seedDatabaseIfEmpty();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});

// Function to seed database if empty
async function seedDatabaseIfEmpty() {
  try {
    const { query } = require('./config/database');
    const bcrypt = require('bcryptjs');
    
    // Always check and create sample users if they don't exist (don't check listings first)
    console.log('Checking for sample users...');
    
    // Sample users data
    const sampleUsers = [
      { name: 'Ahmad Zaki', email: 'ahmad.zaki@student.usm.my', password: bcrypt.hashSync('password123', 10), phone: '0123456789', matric: '123456' },
      { name: 'Siti Sarah', email: 'siti.sarah@student.usm.my', password: bcrypt.hashSync('password123', 10), phone: '0198765432', matric: '234567' },
      { name: 'Lee Wei Ming', email: 'lee.weiming@student.usm.my', password: bcrypt.hashSync('password123', 10), phone: '0165432198', matric: '345678' }
    ];
    
    // Check and create each sample user if they don't exist
    for (const userData of sampleUsers) {
      const existingUser = await query.get(
        'SELECT * FROM users WHERE email = ?',
        [userData.email]
      );
      
      if (!existingUser) {
        await query.run(
          `INSERT INTO users (name, email, password, phone, matric_number) VALUES (?, ?, ?, ?, ?)`,
          [userData.name, userData.email, userData.password, userData.phone, userData.matric]
        );
        console.log(`✓ Created sample user: ${userData.name}`);
      }
    }
    
    // Check if listings exist (only seed listings if database is empty)
    const listings = await query.all("SELECT COUNT(*) as count FROM listings");
    const hasListings = listings && listings.length > 0 && listings[0].count > 0;
    
    if (!hasListings) {
      console.log('Database has no listings. Seeding sample listings...');
      
      // Get user IDs for listings (after ensuring users exist)
      const user1 = await query.get("SELECT id FROM users WHERE email = 'ahmad.zaki@student.usm.my'");
      const user2 = await query.get("SELECT id FROM users WHERE email = 'siti.sarah@student.usm.my'");
      const user3 = await query.get("SELECT id FROM users WHERE email = 'lee.weiming@student.usm.my'");
      
      if (user1 && user2 && user3) {
        // Sample listings (using actual user IDs)
        const listingsData = [
          [user1.id, 'MacBook Pro 13 inch M1 Chip', 'Excellent condition MacBook Pro with M1 chip. 256GB SSD, 8GB RAM.', 3500.00, 'Electronics', 'Like New', 'Aman Damai Hostel', 'macbook.jpg'],
          [user2.id, 'IKEA Study Table with Drawer', 'Good quality study table with built-in drawer. White color.', 150.00, 'Furniture', 'Good', 'Ria Hostel', 'table.jpg'],
          [user3.id, 'Calculus Textbook - James Stewart', 'Used for one semester only, minimal highlights.', 80.00, 'Books', 'Good', 'Cahaya Gemilang Hostel', 'book.jpg'],
          [user1.id, 'Samsung Galaxy S21 Ultra', 'Excellent condition, screen protector included.', 2200.00, 'Electronics', 'Like New', 'Aman Damai Hostel', 'samsung.jpg'],
          [user2.id, 'Mini Refrigerator - Sharp', 'Perfect for hostel room. Energy efficient.', 280.00, 'Appliances', 'Good', 'Ria Hostel', 'fridge.jpg'],
          [user3.id, 'Chemistry Lab Coat', 'White lab coat for chemistry practical classes.', 35.00, 'Others', 'Good', 'Cahaya Gemilang Hostel', 'labcoat.jpg'],
          [user1.id, 'AirPods Pro 2nd Generation', 'Apple AirPods Pro 2nd generation with MagSafe.', 750.00, 'Electronics', 'Like New', 'Aman Damai Hostel', 'airpods.jpg']
        ];
        
        for (const listing of listingsData) {
          await query.run(
            `INSERT INTO listings (user_id, title, description, price, category, condition, location, images, status, clicks) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', 0)`,
            listing
          );
        }
        
        console.log('Sample listings created');
      }
    }
    
    console.log('Database seeding check completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = app;

