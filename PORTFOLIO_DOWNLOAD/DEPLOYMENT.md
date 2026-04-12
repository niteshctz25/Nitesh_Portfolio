# Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel
1. Push frontend code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Build Command: `yarn build`
   - Output Directory: `build`
   - Install Command: `yarn install`
4. Add environment variable:
   - `REACT_APP_BACKEND_URL`: Your Railway backend URL

#### Backend on Railway
1. Create new project on Railway
2. Add MongoDB database
3. Deploy backend from GitHub
4. Add environment variables:
   - `MONGO_URL`: (auto-set by Railway)
   - `DB_NAME`: `portfolio_db`
5. Expose port 8001

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend on Netlify
1. Drag and drop `frontend/build` folder
2. Configure environment:
   - `REACT_APP_BACKEND_URL`: Your Render backend URL

#### Backend on Render
1. Create new Web Service
2. Connect GitHub repository
3. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port 8001`
4. Add MongoDB Atlas connection string

### Option 3: Full Stack on DigitalOcean App Platform

1. Create new app
2. Add both frontend and backend components
3. Configure MongoDB database
4. Set all environment variables
5. Deploy

## MongoDB Setup

### Option A: MongoDB Atlas (Recommended for Production)
1. Create free cluster at mongodb.com/atlas
2. Get connection string
3. Add to backend environment variables
4. Whitelist IP addresses

### Option B: Local MongoDB
```bash
# Install MongoDB
brew install mongodb-community  # macOS
sudo apt install mongodb         # Ubuntu

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongodb          # Ubuntu
```

## Environment Variables

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Backend (.env)
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
DB_NAME=portfolio_db
```

## Production Checklist

- [ ] Update GitHub username in backend
- [ ] Configure MongoDB with proper credentials
- [ ] Set production environment variables
- [ ] Test all API endpoints
- [ ] Verify GitHub integration works
- [ ] Check responsive design on mobile
- [ ] Test contact form submission
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics (Google Analytics)

## Post-Deployment

1. Test all features on production
2. Monitor backend logs for errors
3. Check MongoDB data seeding
4. Verify GitHub API integration
5. Test contact form

## Updating Content

### Update Personal Info
1. Access MongoDB database
2. Edit `portfolio_data` collection
3. Changes reflect immediately

### Update Projects
- Projects auto-sync from GitHub
- Push new repositories to GitHub
- They'll appear automatically

## Support

For issues, check:
- Backend logs in your hosting platform
- Frontend console errors
- MongoDB connection status
- GitHub API rate limits
