import { useState } from "react";
import { Bell, Menu, Home, Wallet, Gift, UserRound, Zap, ClipboardList, Flame, Play, Users, Magnet, Gamepad2, ArrowRight, ChevronRight, Trophy, Sparkles, Coins, Star, CheckCircle2, X } from "lucide-react";
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
const navItems = [{label:"Home",icon:Home},{label:"Earn",icon:Zap},{label:"Rewards",icon:Gift},{label:"Wallet",icon:Wallet},{label:"Profile",icon:UserRound}];

export default function LevelDashboard() {
  const [activeNav,setActiveNav] = useState("Home");
  const [notice,setNotice] = useState("");
  const currentXp = levelData.currentXp ?? 6420;
  const targetXp = levelData.nextLevelXp ?? 8000;
  const currentLevel = levelData.currentLevel ?? 4;
  const nextLevel = currentLevel + 1;
  const progress = Math.min(100,Math.round(currentXp/targetXp*100));
  const remainingXp = Math.max(0,targetXp-currentXp);
  const preview = (name) => setNotice(`${name} is a concept preview and will be implemented in a later phase.`);

  return <main className={styles.dashboard}><div className={styles.container}>
    <header className={styles.header}>
      <button className={styles.iconButton} aria-label="Open menu" onClick={()=>preview("Menu")}><Menu size={20}/></button>
      <a className={styles.brand} href="#home"><span className={styles.brandMark}><Sparkles size={19}/></span><span><strong>VELOOP</strong><small>REWARDS</small></span></a>
      <button className={`${styles.iconButton} ${styles.notification}`} aria-label="Notifications" onClick={()=>preview("Notifications")}><Bell size={19}/><i/></button>
    </header>

    <section className={styles.welcome} id="home">
      <div><p className={styles.kicker}>YOUR REWARDS JOURNEY</p><h1>Good morning, VELOOPER! <span>👋</span></h1><p>Level up your journey and unlock exciting rewards every day.</p></div>
      <div className={styles.demoTag}><span/> DEMO EXPERIENCE</div>
    </section>

    <section className={styles.heroGrid}>
      <article className={styles.levelHero}>
        <div className={styles.heroTopline}><span className={styles.eyebrow}>YOUR CURRENT LEVEL</span><span className={styles.liveBadge}><span/> IN PROGRESS</span></div>
        <div className={styles.levelMain}>
          <div className={styles.levelBadge}><span>LEVEL</span><strong>{String(currentLevel).padStart(2,"0")}</strong><small>{levelData.levelName ?? "Pathfinder"}</small></div>
          <div className={styles.xpSummary}><span className={styles.xpLabel}>TOTAL EXPERIENCE</span><strong>{currentXp.toLocaleString("en-IN")} <small>XP</small></strong><span className={styles.nextTarget}>to reach Level {String(nextLevel).padStart(2,"0")}</span></div>
        </div>
        <div className={styles.progressHeader}><span>LEVEL PROGRESS</span><strong>{progress}%</strong></div>
        <div className={styles.progressTrack} role="progressbar" aria-label="Level progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"><span style={{width:`${progress}%`}}/></div>
        <div className={styles.progressFooter}><span>{currentXp.toLocaleString("en-IN")} XP</span><span>{targetXp.toLocaleString("en-IN")} XP</span></div>
        <div className={styles.remaining}><Zap size={14}/><strong>{remainingXp.toLocaleString("en-IN")} XP</strong> left to Level {String(nextLevel).padStart(2,"0")}</div>
      </article>

      <article className={styles.boostCard}>
        <div className={styles.sectionTop}><div><p className={styles.eyebrow}>KEEP YOUR MOMENTUM</p><h2>Today’s Boost</h2></div><span className={styles.boostIcon}><Zap size={18}/></span></div>
        <div className={styles.boostStats}>
          <div className={styles.boostStat}><span className={`${styles.statIcon} ${styles.purple}`}><Star size={17}/></span><strong>215 XP</strong><small>XP earned</small></div>
          <div className={styles.boostStat}><span className={`${styles.statIcon} ${styles.gold}`}><ClipboardList size={17}/></span><strong>4 / 8</strong><small>Tasks done</small></div>
          <div className={styles.boostStat}><span className={`${styles.statIcon} ${styles.orange}`}><Flame size={17}/></span><strong>7 Days</strong><small>Current streak</small></div>
        </div>
        <p className={styles.demoNote}>Illustrative daily activity · Demo data</p>
      </article>
    </section>

    <section className={styles.earnSection}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>MAKE EVERY ACTION COUNT</p><h2>Earn More</h2><p>Explore fun activities and earn eligible rewards.</p></div><button className={styles.roundArrow} aria-label="Explore earning options" onClick={()=>preview("Earn more")}><ArrowRight size={19}/></button></div>
      <div className={styles.earningGrid}>{earningItems.map(({title,description,reward,icon:Icon,tone})=><button key={title} className={styles.earningCard} onClick={()=>preview(title)}><span className={`${styles.earningIcon} ${styles[tone]}`}><Icon size={21}/></span><span className={styles.earningText}><strong>{title}</strong><small>{description}</small><em>{reward}</em></span><span className={styles.cardArrow}><ChevronRight size={17}/></span><span className={styles.comingSoon}>Coming Soon</span></button>)}</div>
    </section>

    <section className={styles.rewardBanner}>
      <div className={styles.rewardCopy}><p className={styles.eyebrow}>YOUR NEXT MILESTONE</p><h2>Level {String(nextLevel).padStart(2,"0")} Rewards</h2><p>A new milestone is waiting. Keep earning XP and unlock what’s next.</p><button className={styles.rewardButton} onClick={()=>preview("Level rewards")}>View rewards <ArrowRight size={16}/></button></div>
      <div className={styles.rewardArt} aria-hidden="true"><div className={styles.rewardGlow}/><div className={styles.rewardChest}><Gift size={47}/></div><div className={styles.rewardGem}><Sparkles size={25}/></div><div className={styles.rewardCoins}><Coins size={31}/></div></div>
      <span className={styles.rewardDemo}>DEMO REWARD PREVIEW</span>
    </section>

    {notice && <div className={styles.notice} role="status"><span>{notice}</span><button onClick={()=>setNotice("")} aria-label="Dismiss notice"><X size={16}/></button></div>}
    <nav className={styles.bottomNav} aria-label="Main navigation">{navItems.map(({label,icon:Icon})=><button key={label} className={`${styles.navItem} ${activeNav===label?styles.navActive:""}`} onClick={()=>{setActiveNav(label);if(label!=="Home")preview(label);}}><Icon size={19}/><span>{label}</span></button>)}</nav>
    <footer className={styles.footer}><span><CheckCircle2 size={14}/> VELOOP REWARDS</span><small>Frontend prototype · Demo data only</small></footer>
  </div></main>;
}
