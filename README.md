# Nitesh Portfolio

Full-stack portfolio website built with React 19 and FastAPI. Showcases personal information, GitHub projects, technologies, learning roadmap, certificates, and a contact form with email notifications.

**Live:** [niteshctz25.github.io/Nitesh_Portfolio](https://niteshctz25.github.io/Nitesh_Portfolio)

## Tech Stack

| Layer    | Technologies                                                       |
| -------- | ------------------------------------------------------------------ |
| Frontend | React 19, CRACO, Tailwind CSS, Framer Motion, Radix UI, Shadcn UI |
| Backend  | FastAPI, Motor (async MongoDB driver), Pydantic                    |
| Database | MongoDB                                                            |
| Data     | GitHub API for projects, MongoDB for portfolio content             |

## Features

- Responsive portfolio with smooth section transitions and scroll progress
- Real-time GitHub project integration with mock-data fallback
- Portfolio data API (personal info, technologies, roadmap, certificates)
- Contact form with MongoDB persistence and email notification
- Certificate category routing via React Router
- Loading screen with animated entry

## Project Structure

```text
.
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Page sections and UI components
│   │   ├── services/api.js   # Backend API client
│   │   ├── data/             # Static certificate data
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   ├── styles/           # CSS theme files
│   │   ├── App.js
│   │   └── mock.js           # Fallback data when backend is offline
│   ├── plugins/              # CRACO webpack plugins
│   ├── package.json
│   └── craco.config.js
├── backend/
│   ├── services/
│   │   ├── github_service.py
│   │   └── portfolio_service.py
│   ├── tests/
│   ├── models.py
│   ├── server.py
│   └── requirements.txt
├── tests/
└── QUICK_START.txt
```

## Local Setup

### Frontend

1. Install dependencies:

```bash
cd frontend
npm install --legacy-peer-deps
```

2. Create `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

3. Start the dev server:

```bash
npm start
```

Runs on `http://localhost:3000`.

### Backend

1. Requires Python 3.11+ and a running MongoDB instance.

2. Create and activate a virtual environment:

```bash
cd backend
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create `backend/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
CORS_ORIGINS=*
```

5. Start the server:

```bash
uvicorn server:app --reload --port 8001
```

Runs on `http://localhost:8001`. API base path: `/api`.

## Important Notes

- The frontend falls back to mock data when the backend is unreachable.
- MongoDB must be running locally unless `MONGO_URL` points elsewhere.
- The GitHub username is configured in `backend/server.py` (`GitHubService(username="niteshctz25")`).

## Useful Commands

| Action         | Command                                     |
| -------------- | ------------------------------------------- |
| Frontend start | `cd frontend && npm start`                  |
| Frontend test  | `cd frontend && npm test`                   |
| Frontend build | `cd frontend && npm run build`              |
| Backend start  | `cd backend && uvicorn server:app --reload --port 8001` |
| Backend test   | `cd backend && pytest`                      |
| Deploy to GH Pages | `cd frontend && npm run deploy`         |

## API Endpoints

| Method | Path             | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/`          | Health check                 |
| GET    | `/api/projects`  | GitHub-backed project list   |
| GET    | `/api/portfolio` | Full portfolio data          |
| POST   | `/api/contact`   | Contact form submission      |
| POST   | `/api/seed-data` | Seed initial MongoDB data    |

## Deployment

### GitHub Pages (Frontend) + Railway (Backend)

#### 1. Enable GitHub Pages

1. Go to **Settings > Pages** in your GitHub repository
2. Set **Source** to **GitHub Actions**
3. Frontend will be available at `https://niteshctz25.github.io/Nitesh_Portfolio`

#### 2. Deploy Backend to Railway

1. Sign up at [railway.app](https://railway.app)
2. Create a new project from your GitHub repo
3. Set **Root Directory** to `backend`
4. Add a MongoDB database to the project
5. Railway provides a URL like `https://your-project.up.railway.app`

#### 3. Connect Frontend to Backend

1. In GitHub repo **Settings > Secrets and variables > Actions**, add:
   - `REACT_APP_BACKEND_URL` = your Railway backend URL
2. Push any change to trigger redeployment

#### 4. Seed Database (Optional)

```bash
curl -X POST https://your-railway-url.up.railway.app/api/seed-data
```

### Hosting Benefits

- **GitHub Pages**: Free, unlimited bandwidth, custom domain support
- **Railway Free Tier**: 512 MB RAM, 1 GB disk, built-in MongoDB
- **Auto-deploy**: Push to main triggers both frontend and backend deploys
- **No credit card required**

## Author

**Nitesh Singh**
- GitHub: [@niteshctz25](https://github.com/niteshctz25)
- LinkedIn: [Nitesh Singh](https://www.linkedin.com/in/nitesh-singh-3505861a2/)
- Email: niteshsingh15151@gmail.com

## License

MIT
