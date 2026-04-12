from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Dict, Any
from datetime import datetime

# Import services
from services.github_service import GitHubService
from services.portfolio_service import PortfolioService
from models import Project, PortfolioData, ContactForm

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize services
github_service = GitHubService(username="niteshctz25")
portfolio_service = PortfolioService(db=db)

# Create the main app without a prefix
app = FastAPI(title="Nitesh Singh Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# =============================================================================
# API ENDPOINTS
# =============================================================================

@api_router.get("/")
async def root() -> Dict[str, str]:
    """Health check endpoint"""
    return {"message": "Portfolio API is running", "status": "active"}

@api_router.get("/projects", response_model=Dict[str, List[Project]])
async def get_projects() -> Dict[str, List[Dict[str, Any]]]:
    """
    Fetch real projects from GitHub
    """
    try:
        projects = github_service.fetch_repositories()
        
        if not projects:
            logger.warning("GitHub API returned no projects, using fallback")
            projects = _get_mock_projects()
        
        return {"projects": projects}
        
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        return {"projects": _get_mock_projects()}

@api_router.get("/portfolio", response_model=Dict[str, Any])
async def get_portfolio() -> Dict[str, Any]:
    """
    Get all portfolio data (technologies, roadmap, certificates, personal info)
    """
    try:
        data = await portfolio_service.get_portfolio_data()
        return data
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch portfolio data")

@api_router.post("/contact")
async def submit_contact(form: ContactForm) -> Dict[str, Any]:
    """
    Handle contact form submissions
    """
    try:
        result = await db.contact_submissions.insert_one(form.dict())
        
        logger.info(f"Contact form submitted by {form.name} ({form.email})")
        
        return {
            "success": True,
            "message": "Thank you for your message! I'll get back to you soon.",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        logger.error(f"Error saving contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit form")

@api_router.post("/seed-data")
async def seed_database() -> Dict[str, Any]:
    """
    Seed database with initial portfolio data
    """
    try:
        result = await portfolio_service.seed_initial_data()
        if result:
            return {"success": True, "message": "Database seeded successfully"}
        else:
            return {"success": False, "message": "Data already exists"}
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        raise HTTPException(status_code=500, detail="Failed to seed database")

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def _get_mock_projects() -> List[Dict[str, Any]]:
    """
    Fallback mock projects if GitHub API fails
    """
    return [
        {
            "id": 1,
            "name": "Driver_Feature",
            "description": "Check for null values, duplicate records, status of objects with row counts, and duplicate columns checker for data validation.",
            "techStack": ["Python", "Data Analysis"],
            "github": "https://github.com/niteshctz25/Driver_Feature/tree/master",
            "stars": 0,
            "language": "Python"
        },
        {
            "id": 2,
            "name": "Edura_Hub_4th-Sem-Project",
            "description": "E-learning website built as a 4th semester project with course management and learning features.",
            "techStack": ["HTML", "CSS", "JavaScript", "PHP"],
            "github": "https://github.com/niteshctz25/Edura_Hub_4th-Sem-Project",
            "stars": 1,
            "language": "HTML"
        },
        {
            "id": 3,
            "name": "Highway-Traffic-Game",
            "description": "Interactive highway traffic game with engaging gameplay and smooth controls.",
            "techStack": ["Python", "Pygame"],
            "github": "https://github.com/niteshctz25/Highway-Traffic-Game",
            "stars": 0,
            "language": "Python"
        },
        {
            "id": 4,
            "name": "Unit-Conversion",
            "description": "Simple and efficient unit conversion tool for various measurement units.",
            "techStack": ["JavaScript", "HTML", "CSS"],
            "github": "https://github.com/niteshctz25/Unit-Conversion",
            "stars": 2,
            "language": "JavaScript"
        }
    ]

# =============================================================================
# APP LIFECYCLE
# =============================================================================

@app.on_event("startup")
async def startup_event() -> None:
    """
    Initialize database and seed data if needed
    """
    logger.info("Starting Portfolio API...")
    
    try:
        await portfolio_service.seed_initial_data()
    except Exception as e:
        logger.error(f"Error during startup seeding: {e}")

@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    """Close database connection"""
    client.close()

# =============================================================================
# MIDDLEWARE & ROUTER SETUP
# =============================================================================

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
