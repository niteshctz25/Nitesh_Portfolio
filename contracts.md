# API Contracts & Backend Integration Plan

## Overview
This document outlines the API contracts and integration strategy for Nitesh Singh's portfolio website.

## Current Mock Data (in `/app/frontend/src/mock.js`)
- `mockProjects` - GitHub projects simulation
- `technologies` - Skills and proficiency levels
- `roadmapEvents` - Career timeline
- `certificates` - Certifications list
- `personalInfo` - Personal details and contact info

---

## Backend APIs to Implement

### 1. GitHub Projects API
**Endpoint:** `GET /api/projects`

**Purpose:** Fetch real repositories from GitHub

**Response:**
```json
{
  "projects": [
    {
      "id": 123,
      "name": "Project Name",
      "description": "Project description",
      "techStack": ["Python", "React"],
      "github": "https://github.com/niteshctz25/repo",
      "stars": 45,
      "language": "Python"
    }
  ]
}
```

**Implementation:**
- Use GitHub REST API: `https://api.github.com/users/niteshctz25/repos`
- Filter and transform response
- Cache results for 1 hour to avoid rate limits

---

### 2. Portfolio Content API
**Endpoint:** `GET /api/portfolio`

**Purpose:** Get all portfolio data (technologies, roadmap, certificates, personal info)

**Response:**
```json
{
  "personalInfo": { ... },
  "technologies": [ ... ],
  "roadmapEvents": [ ... ],
  "certificates": [ ... ]
}
```

**MongoDB Collection:** `portfolio_data`

---

### 3. Contact Form API (Optional Enhancement)
**Endpoint:** `POST /api/contact`

**Purpose:** Handle contact form submissions

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

---

## Frontend Integration Changes

### Files to Update:

1. **`/app/frontend/src/App.js`**
   - Replace mock data imports with API calls
   - Add loading states
   - Handle API errors

2. **Create `/app/frontend/src/services/api.js`**
   - Centralized API service
   - Axios configuration with REACT_APP_BACKEND_URL

3. **Update Components:**
   - `ProjectsSection.jsx` - Use real GitHub data
   - Remove "// Fetched from GitHub API" comment and replace with actual fetch

---

## MongoDB Schema

### Collection: `portfolio_data`
```javascript
{
  _id: ObjectId,
  type: "technologies" | "roadmap" | "certificates" | "personalInfo",
  data: { ... },
  updated_at: Date
}
```

---

## Integration Steps

1. ✅ Create backend APIs
2. ✅ Seed MongoDB with initial data
3. ✅ Create frontend API service
4. ✅ Update App.js to fetch data on mount
5. ✅ Remove mock.js imports
6. ✅ Test all endpoints
7. ✅ Handle loading/error states

---

## Error Handling Strategy

- Display cached/fallback data if API fails
- Show user-friendly error messages
- Implement retry logic for GitHub API (rate limits)

---

## Notes

- GitHub API has rate limit: 60 requests/hour (unauthenticated)
- Consider caching GitHub data in MongoDB to reduce API calls
- Personal info should be stored in MongoDB for easy updates
