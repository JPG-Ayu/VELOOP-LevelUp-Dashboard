# VELOOP Level-Up Dashboard

A responsive, premium dark-themed rewards dashboard prototype for VELOOP. The interface helps users explore their level progression, XP progress, reward previews, and ways to earn XP—all in a polished dashboard experience.

> **Prototype notice:** This is a frontend demonstration. XP, levels, rewards, activity and game results use illustrative/demo data. There is no live backend, authentication, wallet crediting, eligibility enforcement, or real reward issuance.

## ✨ Highlights

- **Dashboard overview** — current level, XP, progress toward the next level, and daily boost summary.
- **Level roadmap** — explore completed, current, upcoming and locked level states.
- **Rewards preview** — view illustrative next-level reward information.
- **Earn More XP** — shortcut cards for Watch & Earn, Daily Tasks, Refer & Earn, XP Catcher, Mini Games and Streak Bonus.
- **XP Catcher mini-game** — playable, timed game with mouse, touch, keyboard and on-screen controls.
- **Interaction polish** — hover/active feedback, transitions and motion effects with reduced-motion support.
- **Responsive layout** — refinements for mobile, tablet, laptop and large desktop widths.
- **UI states** — loading, empty, error and normal-state examples are available for development/testing, not intended as permanent dashboard content.

## 🕹️ XP Catcher

Move the basket to catch falling collectibles:

| Collectible | Demo score |
|---|---:|
| XP Orb | 10 |
| VE Coin | 5 |
| Gem | 15 |

- Round duration: **18 seconds**
- Controls: mouse/pointer, touch, arrow keys, **A/D**, and on-screen controls
- Replay is available in the prototype

Scores and reward tiers are illustrative. The game does not credit real XP or wallet balances.

## 🧰 Tech Stack

- React 19
- Vite 6
- Bootstrap 5
- CSS Modules
- Lucide React
- React Icons

## 🚀 Getting Started

### Requirements

- Node.js (current LTS recommended)
- npm

### Install and run

```bash
git clone https://github.com/JPG-Ayu/VELOOP-LevelUp-Dashboard.git
cd VELOOP-LevelUp-Dashboard
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```text
src/
├── assets/                 # Local assets
├── components/              # Dashboard UI components
│   ├── CurrentLevel/
│   ├── EarnMoreXP/
│   ├── LevelHero/
│   ├── LevelInfo/
│   ├── LevelRoadmap/
│   ├── LevelRewardCard/
│   ├── LevelUpModal/
│   ├── NextLevelReward/
│   ├── PlayAndEarn/
│   │   ├── GameContainer/
│   │   ├── GamePlay/
│   │   ├── GameResult/
│   │   └── GameStart/
│   ├── XPActivity/
│   └── XPProgress/
├── data/                   # Demo level and reward configuration
├── hooks/                  # Reusable hooks
├── pages/
│   └── LevelDashboard/
└── styles/                 # Global styles and design foundations
```

## 📱 Responsive QA

The layout has been reviewed at common viewport sizes, including:

- 320px — compact mobile
- 375px / 390px — standard mobile
- 768px — tablet
- 1280px — laptop
- 1440px — desktop

Use Chrome DevTools responsive mode (`Ctrl + Shift + M`) to check additional widths.

## 🗺️ Development Progress

| Phase | Work | Status |
|---|---|---|
| 1 | Preparation & discovery | Complete |
| 2 | React + Vite setup | Complete |
| 3 | UI foundation & design system | Complete |
| 4 | Home dashboard | Complete |
| 5 | Level progression & rewards | Complete |
| 6 | XP Catcher mini-game | Complete |
| 7 | Earn More XP section | Complete |
| 8 | Interactions & animations | Complete |
| 9 | Loading, empty & error UI states | Complete |
| 10 | Responsive QA & testing | Complete |
| 11 | GitHub repository & README polish | In progress |
| 12 | Deployment | Pending |
| 13 | Final verification & submission | Pending |

## ⚠️ Demo Limitations

This project is a frontend prototype and currently does not include:

- Backend/API integration
- Login or user accounts
- Persistent progress or database
- Real XP or wallet crediting
- Server-side reward eligibility/frequency checks
- Actual video, referral, task or mini-game reward fulfillment

The displayed values, reward descriptions and activities are sample/demo content.

## 🔗 Repository

[GitHub Repository](https://github.com/JPG-Ayu/VELOOP-LevelUp-Dashboard)

## 👤 Author

**Arnav Bisht**  
Frontend project prototype

---

If you clone this repository, follow the setup commands above to run the prototype locally.
