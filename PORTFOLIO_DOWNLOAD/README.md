# Nitesh Singh - JARVIS-Inspired Portfolio

A stunning, futuristic portfolio website with JARVIS-style UI, featuring real-time GitHub integration, MongoDB backend, and advanced animations.

## 🌟 Features

- **JARVIS-Inspired Design**: Futuristic UI with particle effects, rotating HUD rings, glowing elements
- **Real GitHub Integration**: Automatically fetches and displays your latest repositories
- **MongoDB Backend**: Dynamic content management system
- **Modern Tech Stack**: React, FastAPI, MongoDB, Framer Motion
- **Fully Responsive**: Works perfectly on all devices
- **Advanced Animations**: Smooth scroll, typing effects, particle backgrounds

## 🛠️ Tech Stack

### Frontend
- React 19
- Framer Motion (animations)
- Tailwind CSS
- Shadcn UI components
- Lucide React (icons)
- Axios (API calls)

### Backend
- FastAPI
- MongoDB (Motor - async driver)
- Python 3.11+
- GitHub API integration

## 📦 Installation

### Prerequisites
- Node.js 16+ and Yarn
- Python 3.11+
- MongoDB (local or MongoDB Atlas)

### Frontend Setup

```bash
cd frontend
yarn install
```

Create `.env` file in frontend directory:
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Start development server:
```bash
yarn start
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file in backend directory:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
```

Start backend server:
```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend
   yarn build
   ```
2. Deploy the `build` folder to Vercel/Netlify
3. Set environment variable: `REACT_APP_BACKEND_URL` to your backend URL

### Backend (Railway/Render/DigitalOcean)
1. Deploy backend with MongoDB connection
2. Set environment variables:
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: Database name

## 📝 Customization

### Update Personal Information
Edit the MongoDB collection `portfolio_data` or modify initial seed data in:
`backend/services/portfolio_service.py`

### Change GitHub Username
Update in `backend/server.py`:
```python
github_service = GitHubService(username="YOUR_GITHUB_USERNAME")
```

### Modify Colors/Theme
Edit color variables in:
- `frontend/src/styles/jarvis.css`
- `frontend/tailwind.config.js`

### Add New Sections
1. Create new component in `frontend/src/components/`
2. Import and add to `frontend/src/App.js`
3. Add corresponding API endpoint in `backend/server.py` if needed

## 🎨 Design Guidelines

- Uses cyan/blue color scheme (#00d4ff, #00ffff)
- NO purple/pink gradients
- Lucide-react icons only (NO emojis)
- Glass morphism effects
- Particle animations
- Smooth scroll behavior

## 📡 API Endpoints

- `GET /api/` - Health check
- `GET /api/projects` - Fetch GitHub repositories
- `GET /api/portfolio` - Get all portfolio data
- `POST /api/contact` - Submit contact form
- `POST /api/seed-data` - Initialize database

## 🔧 Troubleshooting

### Frontend Issues
- Clear browser cache and reload
- Delete `node_modules` and run `yarn install` again
- Check console for errors

### Backend Issues
- Verify MongoDB connection
- Check backend logs
- Ensure all environment variables are set

### GitHub API Rate Limits
- GitHub API allows 60 requests/hour (unauthenticated)
- Projects are cached in MongoDB to reduce API calls
- Consider adding GitHub token for higher limits

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 👨‍💻 Author

**Nitesh Singh**
- GitHub: [@niteshctz25](https://github.com/niteshctz25)
- LinkedIn: [Nitesh Singh](https://www.linkedin.com/in/nitesh-singh-3505861a2/)
- Email: niteshsingh15151@gmail.com

---

Built with ❤️ using React, FastAPI, and MongoDB
