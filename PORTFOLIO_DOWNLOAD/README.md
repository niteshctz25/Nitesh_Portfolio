# Nitesh Singh - Portfolio

A full-stack portfolio website featuring real-time GitHub integration, MongoDB backend, and smooth animations.

## Features

- Professional design with animated transitions and scroll effects
- Real GitHub integration that fetches and displays latest repositories
- MongoDB backend for dynamic content management
- Fully responsive across all devices
- Contact form with email notifications

## Tech Stack

### Frontend
- React 19
- Framer Motion (animations)
- Tailwind CSS
- Shadcn UI components (Radix primitives)
- Lucide React (icons)
- Axios (API calls)

### Backend
- FastAPI
- MongoDB (Motor - async driver)
- Python 3.11+
- GitHub API integration

## Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.11+
- MongoDB (local or MongoDB Atlas)

### Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
```

Create `.env` file in the frontend directory:
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Start the development server:
```bash
npm start
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file in the backend directory:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
```

Start the backend server:
```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

## Deployment

### Frontend (GitHub Pages / Vercel / Netlify)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to your hosting provider
3. Set environment variable: `REACT_APP_BACKEND_URL` to your backend URL

### Backend (Railway / Render)
1. Deploy backend from GitHub
2. Add a MongoDB database
3. Set environment variables:
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: Database name (e.g. `portfolio_db`)

## Customization

### Update Personal Information
Edit the seed data in `backend/services/portfolio_service.py` or update via the MongoDB collection `portfolio_data`.

### Change GitHub Username
Update in `backend/server.py`:
```python
github_service = GitHubService(username="YOUR_GITHUB_USERNAME")
```

### Modify Theme
Edit styles in:
- `frontend/tailwind.config.js`
- `frontend/src/styles/professional.css`

### Add New Sections
1. Create a new component in `frontend/src/components/`
2. Import and add it to `frontend/src/App.js`
3. Add a corresponding API endpoint in `backend/server.py` if needed

## API Endpoints

| Method | Path             | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/`          | Health check                 |
| GET    | `/api/projects`  | Fetch GitHub repositories    |
| GET    | `/api/portfolio` | Get all portfolio data       |
| POST   | `/api/contact`   | Submit contact form          |
| POST   | `/api/seed-data` | Initialize database          |

## Troubleshooting

### Frontend
- Clear browser cache and reload
- Delete `node_modules` and run `npm install --legacy-peer-deps` again
- Check the browser console for errors

### Backend
- Verify MongoDB is running and connection string is correct
- Check backend logs for stack traces
- Ensure all environment variables are set

### GitHub API Rate Limits
- Unauthenticated: 60 requests/hour
- Projects are cached in MongoDB to reduce API calls
- Add a GitHub token in your environment for higher rate limits

## Author

**Nitesh Singh**
- GitHub: [@niteshctz25](https://github.com/niteshctz25)
- LinkedIn: [Nitesh Singh](https://www.linkedin.com/in/nitesh-singh-3505861a2/)
- Email: niteshsingh15151@gmail.com

## License

MIT
