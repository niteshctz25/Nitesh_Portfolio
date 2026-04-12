from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class PortfolioService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.portfolio_data
    
    async def get_portfolio_data(self) -> Dict[str, Any]:
        """
        Fetch all portfolio data from MongoDB
        """
        try:
            cursor = self.collection.find({})
            documents = await cursor.to_list(length=100)
            
            result = {
                "personalInfo": None,
                "technologies": [],
                "roadmapEvents": [],
                "certificates": []
            }
            
            for doc in documents:
                doc_type = doc.get('type')
                if doc_type in result:
                    if doc_type == 'personalInfo':
                        result[doc_type] = doc.get('data')
                    else:
                        result[doc_type] = doc.get('data', [])
            
            return result
            
        except Exception as e:
            logger.error(f"Error fetching portfolio data: {e}")
            return self._get_default_data()
    
    async def seed_initial_data(self) -> bool:
        """
        Seed database with initial portfolio data
        """
        try:
            count = await self.collection.count_documents({})
            if count > 0:
                logger.info("Portfolio data already exists")
                return False
            
            initial_data = [
                self._get_personal_info_seed(),
                self._get_technologies_seed(),
                self._get_roadmap_seed(),
                self._get_certificates_seed()
            ]
            
            await self.collection.insert_many(initial_data)
            logger.info("Successfully seeded portfolio data")
            return True
            
        except Exception as e:
            logger.error(f"Error seeding data: {e}")
            return False
    
    def _get_personal_info_seed(self) -> Dict[str, Any]:
        """Get personal info seed data"""
        return {
            "type": "personalInfo",
            "data": {
                "name": "Nitesh Singh",
                "role": "QA-1 Engineer at CData",
                "experience": "2+ years",
                "bio": "QA Engineer focused on driver and connector testing, automation, and AI-driven QA solutions. Experienced in OAuth, JWT, OKTA SSO, REST/SOAP, and building AI-powered test workflows. Currently working on automating QA test cases using LLMs and AI agents to achieve faster productivity and smarter regression coverage.",
                "email": "niteshsingh15151@gmail.com",
                "phone": "1224354",
                "linkedin": "https://www.linkedin.com/in/nitesh-singh-3505861a2/",
                "github": "https://github.com/niteshctz25",
                "instagram": "https://www.instagram.com/ne_tej_/",
                "resumeLink": "https://drive.google.com/file/d/1a3jObke2_j2m5mrm_J4NkSWUsGQ1yXEc/view?usp=drive_link",
                "profileImage": "https://customer-assets.emergentagent.com/job_87d4d770-a649-44cb-94cc-fbcc4a12fb9d/artifacts/pghaj3sw_Profile.jpeg"
            }
        }
    
    def _get_technologies_seed(self) -> Dict[str, Any]:
        """Get technologies seed data"""
        return {
            "type": "technologies",
            "data": [
                {"name": "Python", "category": "Languages"},
                {"name": "Java", "category": "Languages"},
                {"name": "C++", "category": "Languages"},
                {"name": "C", "category": "Languages"},
                {"name": "JavaScript", "category": "Web"},
                {"name": "HTML/CSS", "category": "Web"},
                {"name": "REST API", "category": "Backend/APIs"},
                {"name": "SOAP", "category": "Backend/APIs"},
                {"name": "OAuth", "category": "Auth"},
                {"name": "JWT", "category": "Auth"},
                {"name": "OKTA SSO", "category": "Auth"},
                {"name": "Manual Testing", "category": "Testing"},
                {"name": "Driver & Connector Testing", "category": "Testing"},
                {"name": "AI Agents", "category": "AI/LLM"},
                {"name": "Test Automation", "category": "AI/LLM"}
            ]
        }
    
    def _get_roadmap_seed(self) -> Dict[str, Any]:
        """Get roadmap events seed data"""
        return {
            "type": "roadmapEvents",
            "data": [
                {
                    "year": "2019",
                    "title": "Started IT Journey",
                    "description": "Began programming with C, C++, Python, and Java. Built foundation in computer science fundamentals.",
                    "icon": "rocket"
                },
                {
                    "year": "2021",
                    "title": "Frontend Development",
                    "description": "Mastered HTML, CSS, JavaScript. Developed multiple college projects and web applications.",
                    "icon": "code"
                },
                {
                    "year": "2022",
                    "title": "DSA Mastery",
                    "description": "Deep-dived into Data Structures and Algorithms. Solved 500+ problems across various platforms.",
                    "icon": "brain"
                },
                {
                    "year": "2023",
                    "title": "Entered IT Industry",
                    "description": "Joined as QA Engineer. Learned APIs, OAuth, JWT, OKTA, REST, SOAP, and Manual Testing at scale.",
                    "icon": "briefcase"
                },
                {
                    "year": "Mid 2025-Present",
                    "title": "AI-Driven Testing",
                    "description": "Working on AI-driven test automation for drivers and connectors, using LLMs and AI agents to increase QA productivity and coverage.",
                    "icon": "sparkles"
                }
            ]
        }
    
    def _get_certificates_seed(self) -> Dict[str, Any]:
        """Get certificates seed data"""
        return {
            "type": "certificates",
            "data": [
                {
                    "id": 1,
                    "name": "Seminar Certificates",
                    "issuer": "Various Technical Events",
                    "date": "2019-2025",
                    "link": "https://drive.google.com/drive/u/0/folders/10dYrbLYNC1rEgKjqarOy8LIK_j_1jQcW"
                },
                {
                    "id": 2,
                    "name": "Internship Certificates",
                    "issuer": "Professional Experience",
                    "date": "2022-2023",
                    "link": "https://drive.google.com/drive/u/0/folders/1Pvjs0o6fNOg8q-JRrgQTwklzvFLFqSWK"
                },
                {
                    "id": 3,
                    "name": "Courses & Training Certificates",
                    "issuer": "Online Learning Platforms",
                    "date": "2020-2025",
                    "link": "https://drive.google.com/drive/u/0/folders/1TNeVm1aQZYyo4BBBGK66KIAN7u8MgdFJ"
                }
            ]
        }
    
    def _get_default_data(self) -> Dict[str, Any]:
        """
        Return default data as fallback
        """
        return {
            "personalInfo": self._get_personal_info_seed()["data"],
            "technologies": self._get_technologies_seed()["data"],
            "roadmapEvents": self._get_roadmap_seed()["data"],
            "certificates": self._get_certificates_seed()["data"]
        }
