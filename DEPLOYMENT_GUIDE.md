# 🚀 Quick Deployment Guide for 2Street.my

Your code is now on GitHub: https://github.com/Wanilyatasnim/cmt322_website

**Share this with your friends so they can access your marketplace website without any setup!**

---

## Option A: One-Click Deploy (RECOMMENDED) ⚡

### Deploy to Railway (5 minutes, FREE)

1. Go to https://railway.app/
2. Click "Login with GitHub"
3. Click "New Project" → "Deploy from GitHub repo"
4. Select: `Wanilyatasnim/cmt322_website`
5. Railway auto-detects your project! ✅
6. Click on your project, go to "Settings" → "Generate Domain"
7. Done! Your app is live at: `https://your-app.railway.app`

**That's it!** Share that link with anyone - no setup needed!

---

### Deploy to Render (Alternative, FREE)

1. Go to https://render.com/
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect repo: `Wanilyatasnim/cmt322_website`
5. Build command: `npm install && cd client && npm install && npm run build && cd .. && npm start`
6. Start command: `npm start`
7. Add environment variables:
   - `PORT = 5000`
   - `JWT_SECRET = your_secret_key_here`
8. Click "Create Web Service"
9. Wait ~5 minutes, get your URL!

---

## Option B: Let Friends Run It Locally (They need Node.js)

If someone wants to develop or customize your code:

### Prerequisites
- Node.js installed (https://nodejs.org/)
- Git installed (https://git-scm.com/)

### Steps
```bash
# Clone your repository
git clone https://github.com/Wanilyatasnim/cmt322_website.git
cd cmt322_website

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Create .env file
echo PORT=5000 > .env
echo JWT_SECRET=your_secret_key_here >> .env
echo NODE_ENV=development >> .env

# Start the app
npm run dev
```

Then open: http://localhost:3000

---

## 🌟 What Your Friends Get

### After Deploying:
- ✅ **Live website** they can access immediately
- ✅ **No installation** required
- ✅ **Works on phone/computer** - just share the link
- ✅ **All features working**: browse, search, register, sell items
- ✅ **Admin dashboard** included

### Admin Credentials (share with trusted admin):
- Email: `admin@2street.usm.my`
- Password: `admin123`

---

## 📊 Current Status

**Repository:** https://github.com/Wanilyatasnim/cmt322_website
**Status:** ✅ Code is pushed and ready
**Database:** SQLite (auto-creates on first run)
**Sample Data:** Included (7 listings, 3 test users)

---

## ⚠️ Important Notes

1. **Free tier limitations:**
   - May sleep after inactivity (takes 30s to wake up)
   - Storage resets on deploy (use Cloudinary for images later)

2. **For production:**
   - Change `JWT_SECRET` to something random
   - Add proper image hosting (Cloudinary/AWS S3)
   - Consider PostgreSQL instead of SQLite

3. **Security:**
   - Never commit `.env` file to GitHub
   - `.gitignore` is set up correctly ✅

---

## 🎯 Quick Start Commands

### Start locally:
```bash
npm run dev
```

### Build for production:
```bash
npm run build
```

### Just backend:
```bash
npm run server
```

### Just frontend:
```bash
cd client && npm start
```

---

## 📞 Need Help?

Check the full README.md in the repository for detailed documentation!

**Your marketplace is ready to share! 🎉**

