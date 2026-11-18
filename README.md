# VELOOP Rewards — Level-Up Dashboard

A new React + Vite frontend project scaffold for VELOOP Rewards Task 16.

## Project status

**Phase 2 scaffold:** project structure and dependencies are prepared. The dashboard UI and game functionality will be implemented in later phases.

## Technology

- React
- Vite
- Bootstrap 5
- CSS Modules
- Lucide React
- React Icons

## Setup

Install Node.js (LTS recommended), then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Useful commands

```bash
npm run dev       # Start local development server
npm run build     # Create production build
npm run preview   # Preview production build
```

## Folder structure

```text
src/
├── assets/
├── components/
│   ├── common/
│   ├── LevelHero/
│   ├── CurrentLevel/
│   ├── XPProgress/
│   ├── NextLevelReward/
│   ├── LevelRoadmap/
│   ├── LevelRewardCard/
│   ├── PlayAndEarn/
│   │   ├── GameContainer/
│   │   ├── GameStart/
│   │   ├── GamePlay/
│   │   └── GameResult/
│   ├── EarnMoreXP/
│   ├── XPActivity/
│   ├── LevelInfo/
│   └── LevelUpModal/
├── data/
├── hooks/
├── pages/
│   └── LevelDashboard/
└── styles/
```

## Notes

- Values in `src/data/levelData.js` are development/demo placeholders, not live account or wallet data.
- Proposed earning concepts must be labelled Coming Soon until approved by the product team.
- The frontend game prototype must not claim to credit real rewards unless connected to an approved backend.
- Do not commit `.env`, API keys, passwords, or other credentials.

## Author

Project contributor: Ayush Singh
