from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Optional, List, Dict, Any
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
            # Fetch all portfolio documents
            cursor = self.collection.find({})
            documents = await cursor.to_list(length=100)
            
            # Organize by type
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
            # Check if data already exists
            count = await self.collection.count_documents({})
            if count > 0:
                logger.info("Portfolio data already exists")
                return False
            
            # Initial data
            initial_data = [
                {
                    "type": "personalInfo",
                    "data": {
                        "name": "Nitesh Singh",
                        "role": "QA-1 Engineer at CData",
                        "experience": "2+ years",
                        "bio": "QA Engineer passionate about APIs, automation, and AI-driven testing. Experienced in OAuth, JWT, SSO, REST/SOAP, and currently building AI-powered testing solutions.",
                        "email": "niteshsingh15151@gmail.com",
                        "phone": "1224354",
                        "linkedin": "https://www.linkedin.com/in/nitesh-singh-3505861a2/",
                        "github": "https://github.com/niteshctz25",
                        "instagram": "https://www.instagram.com/ne_tej_/",
                        "resumeLink": "https://drive.google.com/file/d/1a3jObke2_j2m5mrm_J4NkSWUsGQ1yXEc/view?usp=drive_link",
                        "profileImage": "https://customer-assets.emergentagent.com/job_87d4d770-a649-44cb-94cc-fbcc4a12fb9d/artifacts/pghaj3sw_Profile.jpeg"
                    }
                },
                {
                    "type": "technologies",
                    "data": [
                        {"name": "Python", "category": "Languages", "proficiency": 90},
                        {"name": "Java", "category": "Languages", "proficiency": 85},
                        {"name": "C++", "category": "Languages", "proficiency": 80},
                        {"name": "C", "category": "Languages", "proficiency": 75},
                        {"name": "JavaScript", "category": "Web", "proficiency": 85},
                        {"name": "HTML/CSS", "category": "Web", "proficiency": 88},
                        {"name": "REST API", "category": "Backend/APIs", "proficiency": 95},
                        {"name": "SOAP", "category": "Backend/APIs", "proficiency": 85},
                        {"name": "OAuth", "category": "Auth", "proficiency": 90},
                        {"name": "JWT", "category": "Auth", "proficiency": 90},
                        {"name": "OKTA SSO", "category": "Auth", "proficiency": 85},
                        {"name": "Manual Testing", "category": "Testing", "proficiency": 95},
                        {"name": "API Testing", "category": "Testing", "proficiency": 95},
                        {"name": "AI Agents", "category": "AI/LLM", "proficiency": 80},
                        {"name": "Test Automation", "category": "AI/LLM", "proficiency": 85}
                    ]
                },
                {
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
                            "year": "2024-Present",
                            "title": "AI-Driven Testing",
                            "description": "Building next-gen test automation using LLMs and AI agents. Pioneering intelligent QA solutions.",
                            "icon": "sparkles"
                        }
                    ]
                },
                {
                    "type": "certificates",
                    "data": [
                        {
                            "id": 1,
                            "name": "API Testing Certification",
                            "issuer": "Postman",
                            "date": "2023",
                            "link": "#"
                        },
                        {
                            "id": 2,
                            "name": "OAuth 2.0 Security",
                            "issuer": "LinkedIn Learning",
                            "date": "2023",
                            "link": "#"
                        },
                        {
                            "id": 3,
                            "name": "Python for Test Automation",
                            "issuer": "Udemy",
                            "date": "2022",
                            "link": "#"
                        },
                        {
                            "id": 4,
                            "name": "Advanced DSA",
                            "issuer": "Coursera",
                            "date": "2022",
                            "link": "#"
                        }
                    ]
                }
            ]
            
            await self.collection.insert_many(initial_data)
            logger.info("Successfully seeded portfolio data")
            return True
            
        except Exception as e:
            logger.error(f"Error seeding data: {e}")
            return False
    
    def _get_default_data(self) -> Dict[str, Any]:
        """
        Return default data as fallback
        """
        return {
            "personalInfo": {
                "name": "Nitesh Singh",
                "role": "QA-1 Engineer at CData",
                "experience": "2+ years",
                "bio": "QA Engineer passionate about APIs, automation, and AI-driven testing.",
                "email": "niteshsingh15151@gmail.com",
                "phone": "1224354",
                "linkedin": "https://www.linkedin.com/in/nitesh-singh-3505861a2/",
                "github": "https://github.com/niteshctz25",
                "instagram": "https://www.instagram.com/ne_tej_/",
                "resumeLink": "https://drive.google.com/file/d/1a3jObke2_j2m5mrm_J4NkSWUsGQ1yXEc/view?usp=drive_link",
                "profileImage": "https://customer-assets.emergentagent.com/job_87d4d770-a649-44cb-94cc-fbcc4a12fb9d/artifacts/pghaj3sw_Profile.jpeg"
            },
            "technologies": [],
            "roadmapEvents": [],
            "certificates": []
        }
