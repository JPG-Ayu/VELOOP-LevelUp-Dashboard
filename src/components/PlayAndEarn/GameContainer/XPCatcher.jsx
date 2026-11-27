import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Coins, Gamepad2, Info, Magnet, Play, RotateCcw, Sparkles, Trophy, Zap } from "lucide-react";
import styles from "./XPCatcher.module.css";

const DURATION = 18;
const STEP = 50;
const FALL_SPEED = 0.43; // percentage of playfield height per 50 ms
const SPAWN_MS = 620;
const TYPES = ["xp", "ve", "gem"];
const pick = () => TYPES[Math.floor(Math.random() * TYPES.length)];
const points = { xp: 10, ve: 5, gem: 15 };

export default function XPCatcher() {
  const [mode, setMode] = useState("ready");
  const [seconds, setSeconds] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [caught, setCaught] = useState(0);
  const [basket, setBasket] = useState(50);
  const [orbs, setOrbs] = useState([]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const arenaRef = useRef(null);
  const live = useRef({ basket: 50, orbs: [], score: 0, caught: 0, elapsed: 0, spawn: 0, nextId: 0 });

  const start = useCallback(() => {
    live.current = { basket: 50, orbs: [], score: 0, caught: 0, elapsed: 0, spawn: 0, nextId: 0 };
    setBasket(50); setOrbs([]); setScore(0); setCaught(0); setSeconds(DURATION); setMode("playing");
  }, []);
  const move = useCallback((value) => {
    const next = Math.max(9, Math.min(91, value));
    live.current.basket = next;
    setBasket(next);
  }, []);
  const handlePointer = (event) => {
    if (mode !== "playing") return;
    const rect = arenaRef.current?.getBoundingClientRect();
    if (rect) move(((event.clientX - rect.left) / rect.width) * 100);
  };

  useEffect(() => {
    if (mode !== "playing") return undefined;
    const onKeyDown = (event) => {
      if (["ArrowLeft", "ArrowRight", "a", "A", "d", "D"].includes(event.key)) {
        event.preventDefault();
        move(live.current.basket + (["ArrowLeft", "a", "A"].includes(event.key) ? -7 : 7));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const timer = window.setInterval(() => {
      const game = live.current;
      game.elapsed += STEP;
      game.spawn += STEP;
      if (game.spawn >= SPAWN_MS) {
        game.spawn = 0;
        game.orbs.push({ id: ++game.nextId, x: 10 + Math.random() * 80, y: -8, type: pick() });
      }
      const remaining = [];
      for (const orb of game.orbs) {
        const updated = { ...orb, y: orb.y + FALL_SPEED };
        if (updated.y >= 77 && updated.y <= 94 && Math.abs(updated.x - game.basket) <= 11) {
          game.score += points[updated.type];
          game.caught += 1;
        } else if (updated.y < 105) remaining.push(updated);
      }
      game.orbs = remaining;
      setOrbs([...remaining]);
      setScore(game.score); setCaught(game.caught);
      setSeconds(Math.max(0, Math.ceil((DURATION * 1000 - game.elapsed) / 1000)));
      if (game.elapsed >= DURATION * 1000) setMode("result");
    }, STEP);
    return () => { window.clearInterval(timer); window.removeEventListener("keydown", onKeyDown); };
  }, [mode, move]);

  const demoXp = score >= 100 ? 30 : score >= 40 ? 15 : score > 0 ? 5 : 0;
  const demoVes = score >= 100 ? 12 : score >= 40 ? 5 : 0;

  return <section className={styles.section} id="xp-catcher" aria-labelledby="xp-catcher-heading">
    <div className={styles.heading}>
      <div><p className={styles.kicker}>PLAY & EARN · SKILL CHALLENGE</p><h2 id="xp-catcher-heading">XP Catcher</h2><p>Catch falling XP orbs and coins. Beat your score in 18 seconds.</p></div>
      <button className={styles.info} type="button" onClick={() => setRulesOpen(v => !v)} aria-expanded={rulesOpen} aria-label="Show XP Catcher game rules"><Info size={18}/><span>Rules</span></button>
    </div>
    {rulesOpen && <div className={styles.rules}>
      <strong>How to play</strong><p>Move the basket using your mouse, touch, or ← → arrow keys (A/D also work). Catch glowing items before they fall. XP orbs score 10 points, VE coins 5, and gems 15. You have 18 seconds per round. Higher scores unlock higher <b>illustrative</b> result previews. You can replay as often as you like in this local prototype; actual play eligibility, frequency limits, and reward rules require backend approval. No XP, VEs or Gems are credited to a real account.</p>
    </div>}
    <div className={styles.shell}>
      <div className={styles.topbar}><span><Magnet size={16}/> XP CATCHER</span><span className={styles.timer}><Clock3 size={15}/> 00:{String(seconds).padStart(2,"0")}</span></div>
      <div className={styles.arena} ref={arenaRef} onPointerMove={handlePointer} onPointerDown={handlePointer}>
        <div className={styles.arenaGlow} aria-hidden="true" />
        {mode === "playing" && <>
          {orbs.map(orb => <span key={orb.id} className={`${styles.orb} ${styles[orb.type]}`} style={{ left: `${orb.x}%`, top: `${orb.y}%` }} aria-hidden="true">{orb.type === "xp" ? "XP" : orb.type === "ve" ? "V" : "◆"}</span>)}
          <div className={styles.basket} style={{ left: `${basket}%` }} aria-hidden="true"><span className={styles.basketRim}/><span className={styles.basketBody}/></div>
          <span className={styles.arenaHint}>MOVE TO CATCH</span>
        </>}
        {mode === "ready" && <div className={styles.overlay}><span className={styles.heroOrb}><Zap size={36}/></span><h3>Ready to catch?</h3><p>18 seconds. Catch the orbs. Stack your score.</p><button type="button" className={styles.primary} onClick={start}><Play size={17}/> Start Challenge</button></div>}
        {mode === "result" && <div className={styles.overlay} role="status"><span className={styles.heroOrb}><Trophy size={37}/></span><p className={styles.kicker}>CHALLENGE COMPLETE!</p><h3>{score} <small>points</small></h3><p>You caught {caught} collectibles.</p><div className={styles.resultRewards}><span><Zap size={17}/> +{demoXp} XP</span><span><Coins size={17}/> +{demoVes} VEs</span></div><small className={styles.disclaimer}>Demo reward preview only · Nothing added to your wallet</small><button type="button" className={styles.primary} onClick={start}><RotateCcw size={17}/> Play Again</button></div>}
      </div>
      <div className={styles.scorebar}><div><small>YOUR SCORE</small><strong>{score}</strong></div><div><small>COLLECTED</small><strong>{caught}</strong></div><div><small>TIME LEFT</small><strong>{seconds}s</strong></div></div>
      {mode === "playing" && <div className={styles.controls}><button type="button" onPointerDown={() => move(live.current.basket - 10)} onClick={() => move(live.current.basket - 10)} aria-label="Move basket left"><ArrowLeft size={20}/></button><span>Drag, move pointer or use ← → keys</span><button type="button" onPointerDown={() => move(live.current.basket + 10)} onClick={() => move(live.current.basket + 10)} aria-label="Move basket right"><ArrowRight size={20}/></button></div>}
      <p className={styles.footnote}><Sparkles size={14}/> Frontend demo only · Score and rewards reset on refresh · No backend credits</p>
    </div>
  </section>;
}
