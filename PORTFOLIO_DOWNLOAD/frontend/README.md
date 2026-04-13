# Nitesh Portfolio - Frontend

React 19 single-page application for the portfolio website. Built with Create React App (via CRACO) and styled with Tailwind CSS.

## Setup

```bash
npm install --legacy-peer-deps
```

Create a `.env` file:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Start the development server:

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm start`       | Start development server on port 3000        |
| `npm test`        | Run tests in interactive watch mode          |
| `npm run build`   | Create optimized production build in `build/`|
| `npm run deploy`  | Build and deploy to GitHub Pages             |

## Key Behaviors

- Falls back to mock data (`src/mock.js`) when the backend is unreachable.
- Certificate data is loaded from `src/data/certificates.json` (no backend required).
- The `homepage` in `package.json` controls the base path for GitHub Pages.

## Customization

- **Theme**: Edit `tailwind.config.js` and `src/styles/professional.css`
- **Sections**: Each section is a standalone component in `src/components/`
- **Backend URL**: Change `REACT_APP_BACKEND_URL` in `.env`
