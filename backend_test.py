#!/usr/bin/env python3
"""
Portfolio Backend API Testing Suite
Tests all portfolio backend endpoints for functionality and data structure validation
"""

import requests
import json
import sys
from typing import Dict, Any, List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://qa-hub-ai.preview.emergentagent.com')
BASE_API_URL = f"{BACKEND_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BASE_API_URL
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name: str, success: bool, message: str, details: Dict = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details or {}
        }
        self.test_results.append(result)
        
        if not success:
            self.failed_tests.append(result)
            
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate response structure
                if "message" in data and "status" in data:
                    self.log_test(
                        "Health Check Endpoint",
                        True,
                        f"Health check successful - Status: {data.get('status')}",
                        {"response": data}
                    )
                else:
                    self.log_test(
                        "Health Check Endpoint",
                        False,
                        "Health check response missing required fields",
                        {"response": data, "expected_fields": ["message", "status"]}
                    )
            else:
                self.log_test(
                    "Health Check Endpoint",
                    False,
                    f"Health check failed with status {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Health Check Endpoint",
                False,
                f"Health check request failed: {str(e)}",
                {"error": str(e)}
            )
    
    def test_projects_endpoint(self):
        """Test GET /api/projects - Should fetch projects from GitHub or return mock data"""
        try:
            response = requests.get(f"{self.base_url}/projects", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate response structure
                if "projects" in data and isinstance(data["projects"], list):
                    projects = data["projects"]
                    
                    if len(projects) > 0:
                        # Validate project structure
                        required_fields = ["id", "name", "description", "techStack", "github", "stars", "language"]
                        sample_project = projects[0]
                        
                        missing_fields = [field for field in required_fields if field not in sample_project]
                        
                        if not missing_fields:
                            self.log_test(
                                "Projects Endpoint - Structure",
                                True,
                                f"Projects endpoint returned {len(projects)} projects with correct structure",
                                {
                                    "project_count": len(projects),
                                    "sample_project": sample_project,
                                    "all_fields_present": True
                                }
                            )
                            
                            # Test individual project data validity
                            valid_projects = 0
                            for project in projects:
                                if (isinstance(project.get("id"), int) and 
                                    isinstance(project.get("name"), str) and
                                    isinstance(project.get("techStack"), list) and
                                    isinstance(project.get("github"), str) and
                                    isinstance(project.get("stars"), int)):
                                    valid_projects += 1
                            
                            if valid_projects == len(projects):
                                self.log_test(
                                    "Projects Endpoint - Data Validation",
                                    True,
                                    f"All {len(projects)} projects have valid data types",
                                    {"valid_projects": valid_projects, "total_projects": len(projects)}
                                )
                            else:
                                self.log_test(
                                    "Projects Endpoint - Data Validation",
                                    False,
                                    f"Only {valid_projects}/{len(projects)} projects have valid data types",
                                    {"valid_projects": valid_projects, "total_projects": len(projects)}
                                )
                        else:
                            self.log_test(
                                "Projects Endpoint - Structure",
                                False,
                                f"Projects missing required fields: {missing_fields}",
                                {"missing_fields": missing_fields, "sample_project": sample_project}
                            )
                    else:
                        self.log_test(
                            "Projects Endpoint - Data",
                            False,
                            "Projects endpoint returned empty array",
                            {"response": data}
                        )
                else:
                    self.log_test(
                        "Projects Endpoint - Structure",
                        False,
                        "Projects endpoint response missing 'projects' array",
                        {"response": data}
                    )
            else:
                self.log_test(
                    "Projects Endpoint",
                    False,
                    f"Projects endpoint failed with status {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Projects Endpoint",
                False,
                f"Projects endpoint request failed: {str(e)}",
                {"error": str(e)}
            )
    
    def test_portfolio_endpoint(self):
        """Test GET /api/portfolio - Should return all portfolio data from MongoDB"""
        try:
            response = requests.get(f"{self.base_url}/portfolio", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate response structure
                required_sections = ["personalInfo", "technologies", "roadmapEvents", "certificates"]
                missing_sections = [section for section in required_sections if section not in data]
                
                if not missing_sections:
                    self.log_test(
                        "Portfolio Endpoint - Structure",
                        True,
                        "Portfolio endpoint returned all required sections",
                        {"sections": list(data.keys()), "required_sections": required_sections}
                    )
                    
                    # Validate personalInfo structure
                    personal_info = data.get("personalInfo")
                    if personal_info and isinstance(personal_info, dict):
                        required_personal_fields = ["name", "role", "experience", "bio", "email", "github"]
                        missing_personal_fields = [field for field in required_personal_fields if field not in personal_info]
                        
                        if not missing_personal_fields:
                            self.log_test(
                                "Portfolio Endpoint - Personal Info",
                                True,
                                "Personal info section has all required fields",
                                {"personal_info_fields": list(personal_info.keys())}
                            )
                        else:
                            self.log_test(
                                "Portfolio Endpoint - Personal Info",
                                False,
                                f"Personal info missing fields: {missing_personal_fields}",
                                {"missing_fields": missing_personal_fields, "available_fields": list(personal_info.keys())}
                            )
                    else:
                        self.log_test(
                            "Portfolio Endpoint - Personal Info",
                            False,
                            "Personal info section is missing or invalid",
                            {"personal_info": personal_info}
                        )
                    
                    # Validate technologies structure
                    technologies = data.get("technologies", [])
                    if isinstance(technologies, list) and len(technologies) > 0:
                        sample_tech = technologies[0]
                        required_tech_fields = ["name", "category", "proficiency"]
                        missing_tech_fields = [field for field in required_tech_fields if field not in sample_tech]
                        
                        if not missing_tech_fields:
                            self.log_test(
                                "Portfolio Endpoint - Technologies",
                                True,
                                f"Technologies section has {len(technologies)} items with correct structure",
                                {"technology_count": len(technologies), "sample_technology": sample_tech}
                            )
                        else:
                            self.log_test(
                                "Portfolio Endpoint - Technologies",
                                False,
                                f"Technology items missing fields: {missing_tech_fields}",
                                {"missing_fields": missing_tech_fields, "sample_technology": sample_tech}
                            )
                    else:
                        self.log_test(
                            "Portfolio Endpoint - Technologies",
                            False,
                            "Technologies section is empty or invalid",
                            {"technologies": technologies}
                        )
                    
                    # Validate roadmapEvents structure
                    roadmap_events = data.get("roadmapEvents", [])
                    if isinstance(roadmap_events, list) and len(roadmap_events) > 0:
                        sample_event = roadmap_events[0]
                        required_event_fields = ["year", "title", "description", "icon"]
                        missing_event_fields = [field for field in required_event_fields if field not in sample_event]
                        
                        if not missing_event_fields:
                            self.log_test(
                                "Portfolio Endpoint - Roadmap Events",
                                True,
                                f"Roadmap events section has {len(roadmap_events)} items with correct structure",
                                {"event_count": len(roadmap_events), "sample_event": sample_event}
                            )
                        else:
                            self.log_test(
                                "Portfolio Endpoint - Roadmap Events",
                                False,
                                f"Roadmap event items missing fields: {missing_event_fields}",
                                {"missing_fields": missing_event_fields, "sample_event": sample_event}
                            )
                    else:
                        self.log_test(
                            "Portfolio Endpoint - Roadmap Events",
                            False,
                            "Roadmap events section is empty or invalid",
                            {"roadmap_events": roadmap_events}
                        )
                    
                    # Validate certificates structure
                    certificates = data.get("certificates", [])
                    if isinstance(certificates, list) and len(certificates) > 0:
                        sample_cert = certificates[0]
                        required_cert_fields = ["id", "name", "issuer", "date", "link"]
                        missing_cert_fields = [field for field in required_cert_fields if field not in sample_cert]
                        
                        if not missing_cert_fields:
                            self.log_test(
                                "Portfolio Endpoint - Certificates",
                                True,
                                f"Certificates section has {len(certificates)} items with correct structure",
                                {"certificate_count": len(certificates), "sample_certificate": sample_cert}
                            )
                        else:
                            self.log_test(
                                "Portfolio Endpoint - Certificates",
                                False,
                                f"Certificate items missing fields: {missing_cert_fields}",
                                {"missing_fields": missing_cert_fields, "sample_certificate": sample_cert}
                            )
                    else:
                        self.log_test(
                            "Portfolio Endpoint - Certificates",
                            False,
                            "Certificates section is empty or invalid",
                            {"certificates": certificates}
                        )
                        
                else:
                    self.log_test(
                        "Portfolio Endpoint - Structure",
                        False,
                        f"Portfolio endpoint missing required sections: {missing_sections}",
                        {"missing_sections": missing_sections, "available_sections": list(data.keys())}
                    )
            else:
                self.log_test(
                    "Portfolio Endpoint",
                    False,
                    f"Portfolio endpoint failed with status {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Portfolio Endpoint",
                False,
                f"Portfolio endpoint request failed: {str(e)}",
                {"error": str(e)}
            )
    
    def test_contact_endpoint(self):
        """Test POST /api/contact - Contact form submission"""
        try:
            test_data = {
                "name": "Test User",
                "email": "test@example.com",
                "message": "This is a test message from the API testing suite."
            }
            
            response = requests.post(f"{self.base_url}/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if "success" in data and data["success"] and "message" in data:
                    self.log_test(
                        "Contact Endpoint",
                        True,
                        "Contact form submission successful",
                        {"response": data}
                    )
                else:
                    self.log_test(
                        "Contact Endpoint",
                        False,
                        "Contact form response missing success confirmation",
                        {"response": data}
                    )
            else:
                self.log_test(
                    "Contact Endpoint",
                    False,
                    f"Contact form submission failed with status {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Contact Endpoint",
                False,
                f"Contact form submission request failed: {str(e)}",
                {"error": str(e)}
            )
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Portfolio Backend API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Run all tests
        self.test_health_check()
        self.test_projects_endpoint()
        self.test_portfolio_endpoint()
        self.test_contact_endpoint()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["success"]])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  • {test['test']}: {test['message']}")
        
        return len(self.failed_tests) == 0

def main():
    """Main test execution"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()