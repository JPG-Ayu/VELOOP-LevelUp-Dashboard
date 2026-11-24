// Demo configuration only — not connected to the live VELOOP rewards backend.
// Update this file when approved level thresholds and rewards are provided.

export const levelData = {
  currentLevel: 4,
  levelName: "Pathfinder",
  currentXp: 6420,
  nextLevelXp: 8000,
  nextLevelReward: 500,
  nextLevelName: "Champion",
  nextLevelRewardLabel: "500 VEs",
  rewardDescription: "Reach Level 05 to unlock this illustrative reward preview.",
  isDemo: true,
  levels: [
    { level: 1, name: "Beginner", status: "completed", reward: "Previously unlocked" },
    { level: 2, name: "Explorer", status: "completed", reward: "Previously unlocked" },
    { level: 3, name: "Achiever", status: "completed", reward: "Previously unlocked" },
    { level: 4, name: "Pathfinder", status: "current", reward: "Current level" },
    { level: 5, name: "Champion", status: "next", xpRequired: 8000, reward: "500 VEs" },
    { level: 6, name: "Legend", status: "locked", reward: "Coming soon" },
  ],
};
