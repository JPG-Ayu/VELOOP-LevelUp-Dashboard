# VELOOP Level-Up Dashboard

A fresh responsive VELOOP Rewards dashboard redesign built with React and Vite.

## Progress
- Phase 1: Preparation & discovery — complete
- Phase 2: React + Vite setup — complete
- Phase 3: UI foundation & design system — complete
- Phase 4: Home Dashboard — complete
- Phase 5: Level progression & rewards — complete
- Phase 6: XP Catcher mini-game — implementation added; local verification pending

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

## Phase 6 — XP Catcher mini-game

A playable, skill-based 18-second mini-game is integrated in the dashboard. Use pointer, touch, arrow keys, A/D or on-screen buttons to move the basket and catch falling collectibles. XP orbs score 10, VE coins 5, and gems 15. The game provides a start screen, timer, live score, collected count, completion screen, illustrative reward tiers, and Play Again. The XP Catcher shortcut scrolls to the playable game.

**Prototype-only:** reward values and gameplay limits are examples. No backend reward issuance, actual wallet credit, server eligibility, or daily frequency enforcement is implemented. Replay is unlimited locally.


## Phase 6 — XP Catcher (frontend prototype)

The XP Catcher game is accessible from the Earn More section. Catch falling XP orbs (10 points), VE coins (5 points), and gems (15 points) by moving the basket with the mouse, touch, arrow keys, or A/D keys. Each round lasts 18 seconds. Results award *illustrative* 5/15/30 XP and up to 12 VEs based on score. Unlimited replay is supported in this frontend prototype. No actual account XP or wallet credits are issued. Official reward eligibility, frequency limits, and credit processing require backend integration.
