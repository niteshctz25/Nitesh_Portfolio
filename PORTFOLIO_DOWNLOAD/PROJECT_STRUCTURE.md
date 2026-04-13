# Project Structure

```
nitesh-portfolio/
├── frontend/                    # React frontend application
│   ├── public/                 # Static files
│   │   └── index.html
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ui/            # Shadcn UI components
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── TechnologiesSection.jsx
│   │   │   ├── RoadmapSection.jsx
│   │   │   ├── CertificatesSection.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── services/          # API services
│   │   │   └── api.js
│   │   ├── styles/            # CSS files
│   │   │   └── jarvis.css     # JARVIS-themed styles
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── use-toast.js
│   │   ├── lib/               # Utility functions
│   │   │   └── utils.js
│   │   ├── App.js             # Main app component
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   └── mock.js            # Fallback mock data
│   ├── package.json
│   ├── tailwind.config.js
│   ├── craco.config.js
│   └── .env                   # Environment variables
│
├── backend/                    # FastAPI backend
│   ├── services/              # Business logic services
│   │   ├── github_service.py  # GitHub API integration
│   │   └── portfolio_service.py # Portfolio data management
│   ├── models.py              # Pydantic models
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
├── README.md                   # Main documentation
├── DEPLOYMENT.md              # Deployment guide
├── PROJECT_STRUCTURE.md       # This file
├── setup.sh                   # Quick setup script
└── .gitignore

```

## Key Files

### Frontend

- **App.js**: Main application component with routing and data fetching
- **api.js**: Centralized API service for backend communication
- **jarvis.css**: Custom CSS for JARVIS-themed animations and effects
- **mock.js**: Fallback data when backend is unavailable

### Backend

- **server.py**: FastAPI application with all API endpoints
- **github_service.py**: Handles GitHub API integration
- **portfolio_service.py**: Manages MongoDB operations
- **models.py**: Pydantic data models for validation

## Component Hierarchy

```
App
├── LoadingScreen (initial load)
├── ScrollProgress (scroll indicator)
├── Navbar (sticky navigation)
├── Main Content
│   ├── HeroSection (animated intro)
│   ├── AboutSection (personal info)
│   ├── ProjectsSection (GitHub projects)
│   ├── TechnologiesSection (skills)
│   ├── RoadmapSection (timeline)
│   ├── CertificatesSection (certifications)
│   └── ContactSection (contact form)
└── Footer
```

## Data Flow

1. **App.js** fetches data from backend via **api.js**
2. **Backend** gets GitHub data via **github_service.py**
3. **Backend** gets portfolio data from MongoDB via **portfolio_service.py**
4. Data flows to components as props
5. Components render with Framer Motion animations

## Styling Architecture

- **Tailwind CSS**: Utility-first styling
- **Shadcn UI**: Pre-built component library
- **Custom CSS**: JARVIS-themed animations in jarvis.css
- **Color Theme**: Cyan/blue (#00d4ff, #00ffff)

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/` | GET | Health check |
| `/api/projects` | GET | Fetch GitHub repos |
| `/api/portfolio` | GET | Get portfolio data |
| `/api/contact` | POST | Submit contact form |
| `/api/seed-data` | POST | Initialize database |

## Database Schema

### Collection: portfolio_data

```javascript
{
  type: "personalInfo" | "technologies" | "roadmapEvents" | "certificates",
  data: { ... }
}
```

## Environment Variables

### Frontend (.env)
- `REACT_APP_BACKEND_URL`: Backend API URL

### Backend (.env)
- `MONGO_URL`: MongoDB connection string
- `DB_NAME`: Database name
