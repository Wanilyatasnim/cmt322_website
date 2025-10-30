# 2street Database Information

## Database Type
**SQLite** - Lightweight, file-based database perfect for development and MVP

## Database File
- **Location**: `2street.db` (in project root)
- **Auto-created**: Yes, on first server start
- **Backup**: The `.db` file can be easily copied for backup

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL (hashed with bcrypt),
  phone TEXT,
  matric_number TEXT,
  role TEXT DEFAULT 'user',  -- 'user' or 'admin'
  status TEXT DEFAULT 'active',  -- 'active' or 'banned'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Listings Table
```sql
CREATE TABLE listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL,  -- Electronics, Furniture, Books, Appliances, Others
  condition TEXT NOT NULL,  -- New, Like New, Good, Fair
  location TEXT,
  images TEXT NOT NULL,  -- Comma-separated filenames
  status TEXT DEFAULT 'active',  -- 'active' or 'sold'
  clicks INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

## Sample Data

### Test Users (Password: password123)
1. **Ahmad Zaki** - ahmad.zaki@student.usm.my
2. **Siti Sarah** - siti.sarah@student.usm.my
3. **Lee Wei Ming** - lee.weiming@student.usm.my
4. **Admin** - admin@2street.usm.my (Password: admin123)

### Sample Listings
1. MacBook Pro 13 inch M1 Chip - RM 3500 (Electronics)
2. IKEA Study Table with Drawer - RM 150 (Furniture)
3. Calculus Textbook - RM 80 (Books)
4. Samsung Galaxy S21 Ultra - RM 2200 (Electronics)
5. Mini Refrigerator - RM 280 (Appliances)
6. Chemistry Lab Coat - RM 35 (Others)
7. AirPods Pro 2nd Generation - RM 750 (Electronics)

## Database Management

### View Database Content
```bash
# Using sqlite3 command line
sqlite3 2street.db

# List tables
.tables

# View users
SELECT * FROM users;

# View listings
SELECT * FROM listings;

# Exit
.quit
```

### Reset Database
```bash
# Delete and recreate
rm 2street.db  # or del 2street.db on Windows
# Restart server - database will be auto-created
```

### Seed Sample Data
```bash
node server/scripts/seedDatabase.js
```

### Backup Database
```bash
# Simply copy the database file
cp 2street.db 2street.backup.db
```

## Migrating to Production

For production, consider migrating to:
- **PostgreSQL** - Robust, scalable
- **MySQL** - Widely supported
- **MongoDB** - NoSQL alternative

The code structure makes this migration straightforward by updating only the database configuration file.

## Database Tools

Recommended tools for viewing/editing:
1. **DB Browser for SQLite** (Free, GUI) - https://sqlitebrowser.org/
2. **DBeaver** (Free, Multi-database) - https://dbeaver.io/
3. **SQLite Studio** (Free, GUI) - https://sqlitestudio.pl/

## Performance Notes

- SQLite is file-based (no separate server needed)
- Great for development and small to medium traffic
- Supports transactions and foreign keys
- Database file size grows with data
- Maximum database size: 281 TB (theoretical)

## Security

- All passwords are hashed using bcrypt (10 rounds)
- SQL injection protection via parameterized queries
- User emails validated (must be @student.usm.my)
- Role-based access control implemented

---

**Current Database Status**: ✅ Seeded with sample data  
**Database Location**: `./2street.db`  
**Last Updated**: Check file modification date

