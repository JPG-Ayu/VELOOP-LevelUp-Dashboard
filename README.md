# VELOOP Level-Up Dashboard

A fresh responsive VELOOP Rewards dashboard redesign built with React and Vite.

## Progress
- Phase 1: Preparation & discovery — complete
- Phase 2: React + Vite setup — complete
- Phase 3: UI foundation & design system — complete
- Phase 4: Home Dashboard — complete

## Phase 4 scope
- Welcome header and navigation preview
- Current level badge, XP total, progress and remaining XP
- Today's Boost summary
- Earn More shortcut cards
- Next-level rewards preview
- Responsive desktop, tablet and mobile layout

## Tech stack
React, Vite, Bootstrap, CSS Modules, Lucide React.

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Data note
XP, daily activity and reward examples are illustrative demo values only. Earning shortcuts are labelled Coming Soon until supported product routes and approved earning rules are confirmed. No real rewards are issued by this frontend prototype.

## Phase 5 — Level progression and rewards

- Level roadmap is driven by `src/data/levelData.js` and displays completed, current, next, and locked states.
- The next-level reward preview reads its level name, reward label, XP target, and explanatory copy from the same configuration.
- Reward details and level-system information can be expanded with accessible controls.
- XP progress and remaining XP are calculated from the configured demo values.
- All displayed level thresholds and rewards are illustrative frontend data only; they are not connected to a live rewards backend and are not claimable wallet credits.

### Run locally

```bash
npm install
npm run dev
```
