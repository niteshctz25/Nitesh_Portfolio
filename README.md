# Nitesh Portfolio

Full-stack portfolio website built with React on the frontend and FastAPI on the backend. The project showcases personal information, featured projects, technologies, roadmap items, certificates, and a contact flow.

## Tech Stack

- Frontend: React 19, CRACO, Tailwind CSS, Framer Motion, Radix UI
- Backend: FastAPI, Motor, MongoDB
- Data sources: MongoDB for portfolio data, GitHub API for project data

## Features

- Responsive portfolio landing page
- Animated hero and section transitions
- GitHub project integration with fallback mock data
- Portfolio data API for personal info, technologies, roadmap, and certificates
- Contact form endpoint
- Certificate category routing

## Project Structure

```text
.
|-- frontend/
|   |-- public/
|   |-- src/
|   |-- package.json
|   `-- craco.config.js
|-- backend/
|   |-- services/
|   |-- tests/
|   |-- server.py
|   `-- requirements.txt
|-- tests/
|-- backend_test.py
`-- QUICK_START.txt
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

3. Start the frontend:

```bash
npm start
```

The frontend runs on `http://localhost:3000`.

### Backend

1. Install Python 3.11+.

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

3. Install backend dependencies:

```bash
pip install -r requirements.txt
```

4. Create `backend/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
CORS_ORIGINS=*
```

5. Start the backend:

```bash
uvicorn server:app --reload --port 8001
```

The backend runs on `http://localhost:8001`, with the API available under `http://localhost:8001/api`.

## Important Notes

- The frontend can fall back to mock data if the backend is unavailable.
- The backend expects MongoDB to be running locally unless you change `MONGO_URL`.
- Project data is fetched from the GitHub account configured in `backend/server.py`.

## Helpful Commands

Frontend:

```bash
cd frontend
npm start
npm test
npm run build
```

Backend:

```bash
cd backend
uvicorn server:app --reload --port 8001
pytest
```

## API Overview

- `GET /api/` - health check
- `GET /api/projects` - GitHub-backed project list
- `GET /api/portfolio` - portfolio data
- `POST /api/contact` - contact form submission
- `POST /api/seed-data` - seed initial MongoDB data

## Deployment

### Lifetime Free Hosting Setup

This project is configured for **lifetime free hosting** using GitHub Pages (frontend) + Railway (backend).

#### Step 1: Enable GitHub Pages (Frontend)

1. Go to your GitHub repository: https://github.com/niteshctz25/Nitesh_Portfolio
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Set **Source** to **"GitHub Actions"**
5. Your frontend will be available at: `https://niteshctz25.github.io/Nitesh_Portfolio`

#### Step 2: Deploy Backend to Railway (Free Tier)

1. Sign up at [railway.app](https://railway.app) (free account)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `Nitesh_Portfolio` repository
4. Configure the service:
   - **Root Directory**: `backend`
   - Railway will auto-detect FastAPI and MongoDB
5. Add MongoDB database to your Railway project (free)
6. Your backend will get a URL like: `https://your-project.up.railway.app`

#### Step 3: Connect Frontend to Backend

1. In your GitHub repo, go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secret: `REACT_APP_BACKEND_URL` = your Railway backend URL
3. Push any change to trigger deployment

#### Step 4: Seed Database (Optional)

Once backend is deployed, you can seed it with data:
```bash
curl -X POST https://your-railway-url.up.railway.app/api/seed-data
```

### Features of Free Lifetime Hosting:

- **GitHub Pages**: Unlimited bandwidth, custom domain support
- **Railway**: 512MB RAM, 1GB disk, perfect for portfolio APIs
- **MongoDB**: 512MB free database from Railway
- **Automatic deployments**: Push to main → auto-deploy
- **No credit card required**

### Alternative: Full Stack on Vercel + Railway

If you prefer Vercel for frontend (better performance), follow the Option 2 instructions in the original README.

## Repository Notes

- The Emergent badge and dev overlay references have been removed from the app UI.
- Local `.env` files, logs, and workspace-specific tooling files should stay out of version control.

Updated deployment
