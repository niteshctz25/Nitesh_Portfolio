# Nitesh Portfolio - Frontend

React 19 single-page application for the portfolio website. Built with Create React App (via CRACO) and styled with Tailwind CSS.

## Tech Stack

- **React 19** with React Router for client-side routing
- **CRACO** for custom webpack configuration without ejecting
- **Tailwind CSS** + **Shadcn UI** (Radix primitives) for styling
- **Framer Motion** for animations and page transitions
- **Axios** for backend API communication
- **Lucide React** for icons

## Project Structure

```text
src/
├── components/
│   ├── HeroSection.jsx        # Landing hero with profile and stats
│   ├── AboutSection.jsx       # About me section
│   ├── ProjectsSection.jsx    # GitHub projects grid
│   ├── TechnologiesSection.jsx # Tech stack showcase
│   ├── RoadmapSection.jsx     # Learning roadmap timeline
│   ├── CertificatesSection.jsx # Certificate categories
│   ├── CertificateCategory.jsx # Individual category page
│   ├── ContactModal.jsx       # Contact form dialog
│   ├── Navbar.jsx             # Navigation bar
│   ├── Footer.jsx             # Footer with social links
│   ├── LoadingScreen.jsx      # Animated loading screen
│   ├── ScrollProgress.jsx     # Scroll progress indicator
│   ├── about/                 # About sub-components
│   ├── certificate/           # Certificate sub-components
│   ├── common/                # Shared components (LoadingSpinner)
│   ├── footer/                # Footer sub-components
│   ├── hero/                  # Hero sub-components
│   ├── technologies/          # Technology sub-components
│   └── ui/                    # Shadcn UI primitives
├── services/api.js            # Backend API client
├── data/certificates.json     # Static certificate data
├── hooks/use-toast.js         # Toast notification hook
├── lib/utils.js               # Utility functions (cn helper)
├── styles/
│   ├── professional.css       # Main theme styles
│   └── jarvis.css             # Alternate theme styles
├── App.js                     # Root component with routing
├── mock.js                    # Fallback data for offline use
└── index.js                   # Entry point
```

## Setup

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Create a `.env` file:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

3. Start the development server:

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000). Hot-reloads on file changes.

## Available Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm start`       | Start development server on port 3000        |
| `npm test`        | Run tests in interactive watch mode          |
| `npm run build`   | Create optimized production build in `build/`|
| `npm run deploy`  | Build and deploy to GitHub Pages             |

## Key Behaviors

- If the backend is unreachable, the app automatically falls back to mock data defined in `src/mock.js`.
- Certificate data is loaded from `src/data/certificates.json` (static, no backend required).
- The `homepage` field in `package.json` is set to `https://niteshctz25.github.io/Nitesh_Portfolio` for GitHub Pages routing.

## Customization

- **Theme colors**: Edit `tailwind.config.js` and `src/styles/professional.css`
- **Sections**: Each section is a standalone component in `src/components/`
- **Backend URL**: Change `REACT_APP_BACKEND_URL` in `.env`

## Deployment

The frontend deploys to **GitHub Pages** via the `npm run deploy` script (uses `gh-pages` package). For Vercel deployment, point the build output to the `build/` directory and set the `REACT_APP_BACKEND_URL` environment variable.
