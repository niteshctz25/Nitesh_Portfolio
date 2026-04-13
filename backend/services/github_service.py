import requests
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class GitHubService:
    BASE_URL = "https://api.github.com"
    ALLOWED_REPOS = [
        'Driver_Feature',
        'Edura_Hub_4th-Sem-Project',
        'Highway-Traffic-Game',
        'Unit-Conversion'
    ]
    
    def __init__(self, username: str):
        self.username = username
    
    def _get_required_projects(self) -> Dict[str, Dict[str, Any]]:
        """Get fallback data for required projects"""
        return {
            'Driver_Feature': {
                "name": "Driver_Feature",
                "description": "Check for null values, duplicate records, status of objects with row counts, and duplicate columns checker for data validation.",
                "techStack": ["Python"],
                "github": "https://github.com/niteshctz25/Driver_Feature",
                "stars": 0,
                "language": "Python"
            },
            'Edura_Hub_4th-Sem-Project': {
                "name": "Edura_Hub_4th-Sem-Project",
                "description": "E-learning website built as a 4th semester project with course management and learning features.",
                "techStack": ["HTML", "CSS", "JavaScript"],
                "github": "https://github.com/niteshctz25/Edura_Hub_4th-Sem-Project",
                "stars": 1,
                "language": "HTML"
            },
            'Highway-Traffic-Game': {
                "name": "Highway-Traffic-Game",
                "description": "Interactive highway traffic game with engaging gameplay and smooth controls.",
                "techStack": ["Python"],
                "github": "https://github.com/niteshctz25/Highway-Traffic-Game",
                "stars": 0,
                "language": "Python"
            },
            'Unit-Conversion': {
                "name": "Unit-Conversion",
                "description": "Simple and efficient unit conversion tool for various measurement units.",
                "techStack": ["JavaScript"],
                "github": "https://github.com/niteshctz25/Unit-Conversion",
                "stars": 2,
                "language": "JavaScript"
            }
        }
    
    def _build_project_object(self, repo: Dict, descriptions: Dict[str, str]) -> Dict[str, Any]:
        """Build a project object from GitHub repo data"""
        tech_stack = repo.get('topics', [])
        
        if not tech_stack and repo.get('language'):
            tech_stack = [repo['language']]
        
        return {
            "id": repo['id'],
            "name": repo['name'],
            "description": descriptions.get(repo['name'], repo.get('description')) or f"A {repo.get('language', 'project')} repository",
            "techStack": tech_stack[:4] if tech_stack else [],
            "github": repo['html_url'],
            "stars": repo.get('stargazers_count', 0),
            "language": repo.get('language', 'Unknown')
        }
    
    def fetch_repositories(self) -> List[Dict[str, Any]]:
        """Fetch repositories from GitHub API and ensure we have all 4 required projects"""
        required_projects = self._get_required_projects()
        
        try:
            url = f"{self.BASE_URL}/users/{self.username}/repos"
            params = {
                "sort": "updated",
                "per_page": 50,
                "type": "owner"
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            repos = response.json()
            transformed = self._transform_repositories(repos)
            
            found_repos = {p['name'] for p in transformed}
            for repo_name, repo_data in required_projects.items():
                if repo_name not in found_repos:
                    repo_data_with_id = repo_data.copy()
                    repo_data_with_id['id'] = hash(repo_name)
                    transformed.append(repo_data_with_id)
            
            order = list(required_projects.keys())
            transformed.sort(key=lambda x: order.index(x['name']) if x['name'] in order else 999)
            
            return transformed
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching GitHub repos: {e}")
            return [
                {**data, 'id': hash(name)} 
                for name, data in required_projects.items()
            ]
    
    def _transform_repositories(self, repos: List[Dict]) -> List[Dict[str, Any]]:
        """Transform GitHub API response to our project format"""
        descriptions = {
            'Driver_Feature': 'Check for null values, duplicate records, status of objects with row counts, and duplicate columns checker for data validation.',
            'Edura_Hub_4th-Sem-Project': 'E-learning website built as a 4th semester project with course management and learning features.',
            'Highway-Traffic-Game': 'Interactive highway traffic game with engaging gameplay and smooth controls.',
            'Unit-Conversion': 'Simple and efficient unit conversion tool for various measurement units.'
        }
        
        transformed = []
        
        for repo in repos:
            if repo['name'] not in self.ALLOWED_REPOS:
                continue
                
            project = self._build_project_object(repo, descriptions)
            transformed.append(project)
        
        order = {name: idx for idx, name in enumerate(self.ALLOWED_REPOS)}
        transformed.sort(key=lambda x: order.get(x['name'], 999))
        
        return transformed
