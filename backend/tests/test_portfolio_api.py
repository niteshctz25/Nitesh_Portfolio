"""
Portfolio API Backend Tests
Tests for: Health check, Portfolio data, Projects (GitHub), Contact form
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestHealthCheck:
    """Health check endpoint tests"""
    
    def test_api_root_returns_active_status(self):
        """Test that API root returns active status"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert "status" in data
        assert data["status"] == "active"
        assert "Portfolio API is running" in data["message"]


class TestPortfolioEndpoint:
    """Portfolio data endpoint tests"""
    
    def test_portfolio_returns_all_data_sections(self):
        """Test that /api/portfolio returns all required data sections"""
        response = requests.get(f"{BASE_URL}/api/portfolio")
        assert response.status_code == 200
        
        data = response.json()
        
        # Verify all required sections exist
        assert "personalInfo" in data
        assert "technologies" in data
        assert "roadmapEvents" in data
        assert "certificates" in data
    
    def test_portfolio_personal_info_structure(self):
        """Test personal info has required fields"""
        response = requests.get(f"{BASE_URL}/api/portfolio")
        assert response.status_code == 200
        
        data = response.json()
        personal_info = data["personalInfo"]
        
        # Verify required personal info fields
        assert personal_info["name"] == "Nitesh Singh"
        assert "role" in personal_info
        assert "experience" in personal_info
        assert "bio" in personal_info
        assert "email" in personal_info
        assert "linkedin" in personal_info
        assert "github" in personal_info
        assert "resumeLink" in personal_info
        assert "profileImage" in personal_info
    
    def test_portfolio_technologies_not_empty(self):
        """Test technologies array is not empty"""
        response = requests.get(f"{BASE_URL}/api/portfolio")
        assert response.status_code == 200
        
        data = response.json()
        technologies = data["technologies"]
        
        assert isinstance(technologies, list)
        assert len(technologies) > 0
        
        # Verify technology structure
        for tech in technologies:
            assert "name" in tech
            assert "category" in tech
    
    def test_portfolio_roadmap_events_structure(self):
        """Test roadmap events have required fields"""
        response = requests.get(f"{BASE_URL}/api/portfolio")
        assert response.status_code == 200
        
        data = response.json()
        roadmap_events = data["roadmapEvents"]
        
        assert isinstance(roadmap_events, list)
        assert len(roadmap_events) > 0
        
        for event in roadmap_events:
            assert "year" in event
            assert "title" in event
            assert "description" in event
    
    def test_portfolio_certificates_structure(self):
        """Test certificates have required fields"""
        response = requests.get(f"{BASE_URL}/api/portfolio")
        assert response.status_code == 200
        
        data = response.json()
        certificates = data["certificates"]
        
        assert isinstance(certificates, list)
        assert len(certificates) == 3  # 3 certificate categories
        
        for cert in certificates:
            assert "id" in cert
            assert "name" in cert
            assert "issuer" in cert
            assert "link" in cert


class TestProjectsEndpoint:
    """GitHub projects endpoint tests"""
    
    def test_projects_returns_4_specific_repos(self):
        """Test that /api/projects returns exactly 4 specific GitHub repos"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        
        data = response.json()
        assert "projects" in data
        
        projects = data["projects"]
        assert isinstance(projects, list)
        assert len(projects) == 4
        
        # Verify specific project names
        project_names = [p["name"] for p in projects]
        expected_names = [
            "Driver_Feature",
            "Edura_Hub_4th-Sem-Project",
            "Highway-Traffic-Game",
            "Unit-Conversion"
        ]
        
        for name in expected_names:
            assert name in project_names, f"Expected project '{name}' not found"
    
    def test_projects_have_required_fields(self):
        """Test each project has required fields"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        
        data = response.json()
        projects = data["projects"]
        
        for project in projects:
            assert "id" in project
            assert "name" in project
            assert "description" in project
            assert "techStack" in project
            assert "github" in project
            assert "stars" in project
            assert "language" in project
            
            # Verify GitHub URL format
            assert "github.com/niteshctz25" in project["github"]
    
    def test_projects_order_is_correct(self):
        """Test projects are returned in correct order"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        
        data = response.json()
        projects = data["projects"]
        
        expected_order = [
            "Driver_Feature",
            "Edura_Hub_4th-Sem-Project",
            "Highway-Traffic-Game",
            "Unit-Conversion"
        ]
        
        actual_order = [p["name"] for p in projects]
        assert actual_order == expected_order


class TestContactEndpoint:
    """Contact form endpoint tests"""
    
    def test_contact_form_submission_success(self):
        """Test contact form submission works"""
        payload = {
            "name": "TEST_User",
            "email": "test@example.com",
            "message": "This is a test message from automated testing"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True
        assert "message" in data
        assert "id" in data
    
    def test_contact_form_missing_fields(self):
        """Test contact form validation for missing fields"""
        payload = {
            "name": "TEST_User"
            # Missing email and message
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        # Should return 422 for validation error
        assert response.status_code == 422


class TestSeedDataEndpoint:
    """Seed data endpoint tests"""
    
    def test_seed_data_endpoint_exists(self):
        """Test seed data endpoint is accessible"""
        response = requests.post(f"{BASE_URL}/api/seed-data")
        assert response.status_code == 200
        
        data = response.json()
        assert "success" in data
        assert "message" in data


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
