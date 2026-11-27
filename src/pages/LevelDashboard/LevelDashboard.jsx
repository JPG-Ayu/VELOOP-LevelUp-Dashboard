import XPCatcherSection from "../../components/PlayAndEarn/GameContainer/XPCatcher";
import { useState } from "react";
import { Bell, Menu, Home, Wallet, Gift, UserRound, Zap, ClipboardList, Flame, Play, Users, Magnet, Gamepad2, ArrowRight, ChevronRight, Sparkles, Coins, Star, CheckCircle2, X, Info, LockKeyhole, Check } from "lucide-react";
import { levelData } from "../../data/levelData";
import styles from "./LevelDashboard.module.css";

const earningItems = [
  { title: "Watch & Earn", description: "Watch eligible videos", reward: "+50 XP", icon: Play, tone: "purple" },
  { title: "Daily Tasks", description: "Complete daily activities", reward: "+30 XP", icon: ClipboardList, tone: "green" },
  { title: "Refer & Earn", description: "Invite friends to VELOOP", reward: "+100 XP", icon: Users, tone: "gold" },
  { title: "XP Catcher", description: "Catch XP orbs and coins", reward: "+10 XP", icon: Magnet, tone: "blue" },
  { title: "Mini Games", description: "Play skill-based games", reward: "+75 XP", icon: Gamepad2, tone: "purple" },
  { title: "Streak Bonus", description: "Keep your streak alive", reward: "+25 XP", icon: Flame, tone: "orange" },
];
const navItems = [{ label: "Home", icon: Home }, { label: "Earn", icon: Zap }, { label: "Rewards", icon: Gift }, { label: "Wallet", icon: Wallet }, { label: "Profile", icon: UserRound }];

export default function LevelDashboard() {
  const [activeNav, setActiveNav] = useState("Home");
  const [notice, setNotice] = useState("");
  const [showRewardInfo, setShowRewardInfo] = useState(false);
  const [showLevelInfo, setShowLevelInfo] = useState(false);
  const currentXp = levelData.currentXp ?? 6420;
  const targetXp = levelData.nextLevelXp ?? 8000;
  const currentLevel = levelData.currentLevel ?? 4;
  const nextLevel = currentLevel + 1;
  const nextLevelData = levelData.levels.find((item) => item.level === nextLevel);
  const progress = Math.min(100, Math.round(currentXp / targetXp * 100));
  const remainingXp = Math.max(0, targetXp - currentXp);
  const preview = (name) => setNotice(`${name} is a concept preview and will be implemented in a later phase.`);

  return <main className={styles.dashboard}><div className={styles.container}>
    <header className={styles.header}>
      <button className={styles.iconButton} aria-label="Open menu" onClick={() => preview("Menu")}><Menu size={20} /></button>
      <a className={styles.brand} href="#home"><span className={styles.brandMark}><Sparkles size={19} /></span><span><strong>VELOOP</strong><small>REWARDS</small></span></a>
      <button className={`${styles.iconButton} ${styles.notification}`} aria-label="Notifications" onClick={() => preview("Notifications")}><Bell size={19} /><i /></button>
    </header>

    <section className={styles.welcome} id="home">
      <div><p className={styles.kicker}>YOUR REWARDS JOURNEY</p><h1>Good morning, VELOOPER! <span>👋</span></h1><p>Level up your journey and unlock exciting rewards every day.</p></div>
      <div className={styles.demoTag}><span /> DEMO EXPERIENCE</div>
    </section>

    <section className={styles.heroGrid}>
      <article className={styles.levelHero}>
        <div className={styles.heroTopline}><span className={styles.eyebrow}>YOUR CURRENT LEVEL</span><span className={styles.liveBadge}><span /> IN PROGRESS</span></div>
        <div className={styles.levelMain}>
          <div className={styles.levelBadge}><span>LEVEL</span><strong>{String(currentLevel).padStart(2, "0")}</strong><small>{levelData.levelName ?? "Pathfinder"}</small></div>
          <div className={styles.xpSummary}><span className={styles.xpLabel}>TOTAL EXPERIENCE</span><strong>{currentXp.toLocaleString("en-IN")} <small>XP</small></strong><span className={styles.nextTarget}>to reach Level {String(nextLevel).padStart(2, "0")}</span></div>
        </div>
        <div className={styles.progressHeader}><span>LEVEL PROGRESS</span><strong>{progress}%</strong></div>
        <div className={styles.progressTrack} role="progressbar" aria-label="Level progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${progress}%` }} /></div>
        <div className={styles.progressFooter}><span>{currentXp.toLocaleString("en-IN")} XP</span><span>{targetXp.toLocaleString("en-IN")} XP</span></div>
        <div className={styles.remaining}><Zap size={14} /><strong>{remainingXp.toLocaleString("en-IN")} XP</strong> left to Level {String(nextLevel).padStart(2, "0")}</div>
      </article>

      <article className={styles.boostCard}>
        <div className={styles.sectionTop}><div><p className={styles.eyebrow}>KEEP YOUR MOMENTUM</p><h2>Today’s Boost</h2></div><span className={styles.boostIcon}><Zap size={18} /></span></div>
        <div className={styles.boostStats}>
          <div className={styles.boostStat}><span className={`${styles.statIcon} ${styles.purple}`}><Star size={17} /></span><strong>215 XP</strong><small>XP earned</small></div>
          <div className={styles.boostStat}><span className={`${styles.statIcon} ${styles.gold}`}><ClipboardList size={17} /></span><strong>4 / 8</strong><small>Tasks done</small></div>
          <div className={styles.boostStat}><span className={`${styles.statIcon} ${styles.orange}`}><Flame size={17} /></span><strong>7 Days</strong><small>Current streak</small></div>
        </div>
        <p className={styles.demoNote}>Illustrative daily activity · Demo data</p>
      </article>
    </section>

<section className={styles.roadmapSection} aria-labelledby="roadmap-title">
      <div className={styles.roadmapHeading}>
        <div><p className={styles.eyebrow}>YOUR JOURNEY</p><h2 id="roadmap-title">Level Roadmap</h2><p>See what you’ve achieved and what’s waiting ahead.</p></div>
        <button className={styles.infoButton} type="button" aria-label="About level progression" aria-expanded={showLevelInfo} onClick={() => setShowLevelInfo((value) => !value)}><Info size={17} /></button>
      </div>
      {showLevelInfo && <p className={styles.infoPanel}>XP helps you progress through VELOOP Rewards levels. The roadmap below is an illustrative frontend preview; official thresholds and rewards depend on the platform’s reward configuration.</p>}
      <div className={styles.roadmapGrid}>
        {levelData.levels.map((item) => {
          const isCompleted = item.status === "completed";
          const isCurrent = item.status === "current";
          const isNext = item.status === "next" || item.status === "upcoming";
          return <article key={item.level} className={`${styles.levelTile} ${isCompleted ? styles.levelCompleted : ""} ${isCurrent ? styles.levelCurrent : ""} ${isNext ? styles.levelNext : ""} ${item.status === "locked" ? styles.levelLocked : ""}`}>
            <div className={styles.tileTop}><span>LEVEL {String(item.level).padStart(2, "0")}</span>{isCompleted ? <Check size={16} /> : isCurrent ? <Star size={16} /> : isNext ? <Gift size={16} /> : <LockKeyhole size={15} />}</div>
            <h3>{item.name}</h3><p>{item.reward}</p>
            <strong>{isCompleted ? "Completed" : isCurrent ? "You are here" : isNext ? "Next milestone" : "Locked"}</strong>
            {isCurrent && <span className={styles.currentTileTag}>CURRENT</span>}
          </article>;
        })}
      </div>
    </section>

    <section className={styles.earnSection}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>MAKE EVERY ACTION COUNT</p><h2>Earn More</h2><p>Explore fun activities and earn eligible rewards.</p></div><button className={styles.roundArrow} aria-label="Explore earning options" onClick={() => setShowGame(true)}><ArrowRight size={19} /></button></div>
      <div className={styles.earningGrid}>{earningItems.map(({ title, description, reward, icon: Icon, tone }) => <button key={title} className={styles.earningCard} onClick={() => title === "XP Catcher" ? document.getElementById("xp-catcher")?.scrollIntoView({ behavior: "smooth" }) : preview(title)}><span className={`${styles.earningIcon} ${styles[tone]}`}><Icon size={21} /></span><span className={styles.earningText}><strong>{title}</strong><small>{description}</small><em>{reward}</em></span><span className={styles.cardArrow}><ChevronRight size={17} /></span><span className={styles.comingSoon}>{title === "XP Catcher" ? "PLAY NOW" : "Coming Soon"}</span></button>)}</div>
    </section>

    <XPCatcherSection />

    <section className={styles.rewardBanner} aria-labelledby="next-reward-title">
      <div className={styles.rewardCopy}>
        <p className={styles.eyebrow}>YOUR NEXT MILESTONE</p>
        <h2 id="next-reward-title">Level {String(nextLevel).padStart(2, "0")} · {nextLevelData?.name ?? levelData.nextLevelName ?? "Next Level"}</h2>
        <p>{remainingXp.toLocaleString("en-IN")} XP remaining to reach your next milestone.</p>
        <div className={styles.rewardProgressMeta}><span>Progress to unlock</span><strong>{progress}%</strong></div>
        <div className={styles.rewardProgressTrack} role="progressbar" aria-label="Progress toward next level reward" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${progress}%` }} /></div>
        <div className={styles.rewardActions}>
          <button className={styles.rewardButton} type="button" onClick={() => setShowRewardInfo((value) => !value)} aria-expanded={showRewardInfo}> {showRewardInfo ? "Hide reward details" : "View reward details"} <ArrowRight size={16} /></button>
          <button className={styles.infoButton} type="button" aria-label="Reward information" aria-expanded={showRewardInfo} onClick={() => setShowRewardInfo((value) => !value)}><Info size={17} /></button>
        </div>
        {showRewardInfo && <div className={styles.rewardInfoPanel}><strong>{levelData.nextLevelRewardLabel ?? `${levelData.nextLevelReward} VEs`} · Demo reward preview</strong><span>{levelData.rewardDescription ?? "The displayed reward is associated with the next level according to the current reward configuration."} This is not a confirmed or claimable wallet credit.</span></div>}
      </div>
      <div className={styles.rewardArt} aria-hidden="true"><div className={styles.rewardGlow} /><div className={styles.rewardChest}><Gift size={47} /></div><div className={styles.rewardGem}><Sparkles size={25} /></div><div className={styles.rewardCoins}><Coins size={31} /></div></div>
      <span className={styles.rewardDemo}>DEMO REWARD PREVIEW · LOCKED</span>
    </section>

    {notice && <div className={styles.notice} role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={16} /></button></div>}
    <nav className={styles.bottomNav} aria-label="Main navigation">{navItems.map(({ label, icon: Icon }) => <button key={label} className={`${styles.navItem} ${activeNav === label ? styles.navActive : ""}`} onClick={() => { setActiveNav(label); if (label !== "Home") preview(label); }}><Icon size={19} /><span>{label}</span></button>)}</nav>
    <footer className={styles.footer}><span><CheckCircle2 size={14} /> VELOOP REWARDS</span><small>Frontend prototype · Demo data only</small></footer>
  </div></main>;
}
