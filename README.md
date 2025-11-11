# Football Tracking

An Express + EJS dashboard for checking club and national team information or league tables using data from [TheSportsDB](https://www.thesportsdb.com/). Pick a league to view the latest standings, or pick a team to pull badge and metadata without leaving the page.

## Features
- League standings lookup for popular competitions (La Liga, Champions League, MLS, Premier League, Bundesliga, Serie A, World Cup).
- Team lookup for curated clubs/national teams.
- Mutually exclusive dropdowns so you never request a league and a team at the same time.
- Responsive glassmorphism UI styled with vanilla CSS.

## Tech Stack
- Node.js + Express 5 (server & routing)
- EJS (templating and conditional rendering)
- Axios (HTTP client for TheSportsDB API)
- Body-parser middleware

## Getting Started

### Prerequisites
- Node.js 18+ (any modern LTS works)
- npm (bundled with Node)

### Installation
```bash
npm install
```

### Run the app
```bash
npm run start
```
Then open `http://localhost:3000` in your browser.

## Usage
1. Select a league **or** a team (the other dropdown auto-disables to prevent conflicting submissions).
2. Hit **Go** to send a POST request to `/choice`.
3. The server uses TheSportsDB endpoints:
   - `lookuptable.php?l=<leagueId>` for standings
   - `lookupteam.php?id=<teamId>` for team details
4. EJS renders the results in `views/index.ejs`, showing standings in a table or (if implemented) additional team data cards.

> TheSportsDB provides a demo API key `123` that is already baked into the code. Replace it with your personal key for higher rate limits.

## Project Structure
```
.
├── index.js          # Express server and routes
├── views/
│   └── index.ejs     # Main view + UI logic
├── public/
│   └── styles.css    # Styling for the dashboard
├── package.json
└── README.md
```

## Customization Ideas
- Add more dropdown options or make them dynamic via API calls.
- Display richer team info (stadium, manager, upcoming fixtures).
- Cache API responses to stay within rate limits.
- Deploy to Render, Railway, or another free-tier host.

## License
This project is for personal learning purposes. Feel free to adapt it for your own football-tracking experiments.
