from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# GitHub Project Models
class Project(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    techStack: List[str] = []
    github: str
    stars: int = 0
    language: Optional[str] = None

# Technology Model
class Technology(BaseModel):
    name: str
    category: str
    proficiency: int

# Roadmap Event Model
class RoadmapEvent(BaseModel):
    year: str
    title: str
    description: str
    icon: str

# Certificate Model
class Certificate(BaseModel):
    id: int
    name: str
    issuer: str
    date: str
    link: str

# Personal Info Model
class PersonalInfo(BaseModel):
    name: str
    role: str
    experience: str
    bio: str
    email: str
    phone: str
    linkedin: str
    github: str
    instagram: str
    resumeLink: str
    profileImage: str

# Portfolio Data Response
class PortfolioData(BaseModel):
    personalInfo: PersonalInfo
    technologies: List[Technology]
    roadmapEvents: List[RoadmapEvent]
    certificates: List[Certificate]

# Contact Form Model
class ContactForm(BaseModel):
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
