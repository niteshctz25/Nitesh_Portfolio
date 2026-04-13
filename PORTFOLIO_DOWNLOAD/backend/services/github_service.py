import requests
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class GitHubService:
    BASE_URL = "https://api.github.com"
    
    def __init__(self, username: str):
        self.username = username
    
    def fetch_repositories(self) -> List[Dict[str, Any]]:
        """
        Fetch repositories from GitHub API
        """
        try:
            url = f"{self.BASE_URL}/users/{self.username}/repos"
            params = {
                "sort": "updated",
                "per_page": 10,
                "type": "owner"
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            repos = response.json()
            return self._transform_repositories(repos)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching GitHub repos: {e}")
            return []
    
    def _transform_repositories(self, repos: List[Dict]) -> List[Dict[str, Any]]:
        """
        Transform GitHub API response to our project format
        """
        transformed = []
        
        for repo in repos:
            # Extract topics as tech stack
            tech_stack = repo.get('topics', [])
            
            # If no topics, infer from language
            if not tech_stack and repo.get('language'):
                tech_stack = [repo['language']]
            
            project = {
                "id": repo['id'],
                "name": repo['name'],
                "description": repo.get('description') or f"A {repo.get('language', 'project')} repository",
                "techStack": tech_stack[:4] if tech_stack else [],
                "github": repo['html_url'],
                "stars": repo.get('stargazers_count', 0),
                "language": repo.get('language', 'Unknown')
            }
            
            transformed.append(project)
        
        return transformed
