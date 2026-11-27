import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Clock3, Coins, Info, Play, RotateCcw, Sparkles, Trophy, Zap } from "lucide-react";
import styles from "./XPCatcher.module.css";

const DURATION = 18;
const DROP_TYPES = ["xp", "coin", "gem"];
const points = { xp: 10, coin: 5, gem: 15 };
const randomDrop = (id) => ({ id, x: 8 + Math.random() * 84, y: -8, kind: DROP_TYPES[Math.floor(Math.random() * DROP_TYPES.length)], speed: 0.8 + Math.random() * 0.65 });

export default function XPCatcher({ onClose }) {
  const [phase, setPhase] = useState("ready");
  const [seconds, setSeconds] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [caught, setCaught] = useState(0);
  const [drops, setDrops] = useState([]);
  const [basket, setBasket] = useState(50);
  const [soundlessMessage, setSoundlessMessage] = useState("");
  const boardRef = useRef(null);
  const basketRef = useRef(50);
  const nextId = useRef(0);
  const scoreRef = useRef(0);
  const caughtRef = useRef(0);
  const lastSpawn = useRef(0);
  const lastFrame = useRef(0);
  const dropsRef = useRef([]);
  const moveBasket = useCallback((value) => { const next = Math.max(9, Math.min(91, value)); basketRef.current = next; setBasket(next); }, []);
  const finish = useCallback(() => { setPhase("result"); setDrops([]); dropsRef.current = []; }, []);
  const start = () => {
    nextId.current = 0; scoreRef.current = 0; caughtRef.current = 0;
    dropsRef.current = []; lastSpawn.current = 0; lastFrame.current = 0;
    setScore(0); setCaught(0); setSeconds(DURATION); setDrops([]); setSoundlessMessage(""); moveBasket(50); setPhase("playing");
  };
  useEffect(() => {
    if (phase !== "playing") return;
    const timer = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [phase]);
  useEffect(() => { if (phase === "playing" && seconds === 0) finish(); }, [seconds, phase, finish]);
  useEffect(() => {
    if (phase !== "playing") return;
    let raf;
    const animate = (time) => {
      if (!lastFrame.current) { lastFrame.current = time; lastSpawn.current = time; }
      const delta = Math.min(40, time - lastFrame.current) / 16.67;
      lastFrame.current = time;
      if (time - lastSpawn.current >= 520) { dropsRef.current.push(randomDrop(nextId.current++)); lastSpawn.current = time; }
      const remaining = [];
      for (const drop of dropsRef.current) {
        const moved = { ...drop, y: drop.y + drop.speed * delta };
        if (moved.y >= 76 && moved.y <= 88 && Math.abs(moved.x - basketRef.current) <= 12) {
          scoreRef.current += points[moved.kind]; caughtRef.current += 1;
          setScore(scoreRef.current); setCaught(caughtRef.current);
          setSoundlessMessage(`Caught ${moved.kind === "xp" ? "XP orb" : moved.kind === "coin" ? "VE coin" : "gem"}! +${points[moved.kind]} points`);
        } else if (moved.y < 105) remaining.push(moved);
      }
      dropsRef.current = remaining; setDrops([...remaining]);
      raf = window.requestAnimationFrame(animate);
    };
    raf = window.requestAnimationFrame(animate);
    return () => { window.cancelAnimationFrame(raf); lastFrame.current = 0; };
  }, [phase]);
  useEffect(() => {
    if (phase !== "playing") return;
    const keydown = (event) => {
      if (["ArrowLeft", "ArrowRight", "a", "d", "A", "D"].includes(event.key)) {
        event.preventDefault(); moveBasket(basketRef.current + (["ArrowLeft", "a", "A"].includes(event.key) ? -7 : 7));
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [phase, moveBasket]);
  const pointerMove = (event) => {
    if (phase !== "playing" || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    moveBasket(((event.clientX - rect.left) / rect.width) * 100);
  };
  const earnedXp = score >= 80 ? 30 : score >= 30 ? 15 : score > 0 ? 5 : 0;
  const earnedVes = score >= 80 ? 12 : 0;
  return <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="XP Catcher mini-game">
    <div className={styles.shell}>
      <header className={styles.topbar}><button type="button" onClick={onClose} className={styles.back}><ArrowLeft size={19}/> Dashboard</button><strong>XP CATCHER <Sparkles size={16}/></strong><span className={styles.timer}><Clock3 size={15}/> {`00:${String(seconds).padStart(2,"0")}`}</span></header>
      {phase === "ready" && <div className={styles.ready}>
        <div className={styles.orb}><Zap size={46}/></div><p className={styles.kicker}>PLAY & EARN · SKILL CHALLENGE</p><h1>Catch the XP!</h1><p>Move your golden basket to collect falling XP orbs, VE coins and gems before time runs out.</p>
        <div className={styles.rules}><h2><Info size={17}/> How to play</h2><p><b>Objective:</b> Catch as many falling objects as possible in 18 seconds.</p><p><b>Controls:</b> Move your mouse or finger across the playfield; use ← / → or A / D on keyboard.</p><p><b>Score:</b> XP orb = 10, VE coin = 5, gem = 15 points.</p><p><b>Demo reward:</b> 30+ points = 15 XP; 80+ points = 30 XP and 12 VEs. Smaller positive scores earn 5 XP.</p><p><b>Eligibility & frequency:</b> Unlimited prototype replays; no real reward eligibility, limits or credits are connected.</p></div>
        <button className={styles.primary} onClick={start}><Play size={18}/> Start Challenge</button>
      </div>}
      {phase === "playing" && <div className={styles.playing}>
        <div className={styles.instructions}>Catch XP orbs & coins <span>Score high for better demo rewards!</span></div>
        <div ref={boardRef} className={styles.board} onPointerMove={pointerMove} onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); pointerMove(e); }} aria-label="Move the basket to catch falling rewards">
          <div className={styles.boardGlow}/>
          {drops.map((drop) => <div key={drop.id} className={`${styles.drop} ${styles[drop.kind]}`} style={{left:`${drop.x}%`,top:`${drop.y}%`}}>{drop.kind === "xp" ? "XP" : drop.kind === "coin" ? "V" : "◆"}</div>)}
          <div className={styles.basket} style={{left:`${basket}%`}}><div className={styles.rim}/><div className={styles.net}/></div>
        </div>
        <div className={styles.stats}><div><small>YOUR SCORE</small><strong>{score}</strong></div><div><small>COLLECTED</small><strong>{caught}</strong></div><div><small>TIME LEFT</small><strong>{seconds}s</strong></div></div>
        <div className={styles.mobileControls}><button onPointerDown={() => moveBasket(basketRef.current-9)}>← Move left</button><button onPointerDown={() => moveBasket(basketRef.current+9)}>Move right →</button></div>
        <span className={styles.srOnly} role="status">{soundlessMessage}</span>
      </div>}
      {phase === "result" && <div className={styles.result}><div className={styles.trophy}><Trophy size={74}/></div><p className={styles.kicker}>CHALLENGE COMPLETE!</p><h1>{score >= 80 ? "Outstanding!" : score > 0 ? "Great effort!" : "Give it another go!"}</h1><div className={styles.resultScore}><small>FINAL SCORE</small><strong>{score}</strong><span>{caught} collectibles caught</span></div><div className={styles.rewardGrid}><div><Zap size={20}/><strong>+{earnedXp} XP</strong><small>Demo experience</small></div><div><Coins size={20}/><strong>+{earnedVes} VEs</strong><small>Demo reward</small></div></div><p className={styles.disclaimer}>Prototype result only. XP and VEs are not added to your account or wallet. Official rewards require backend validation and eligibility rules.</p><button className={styles.primary} onClick={start}><RotateCcw size={18}/> Play Again</button><button className={styles.secondary} onClick={onClose}>Back to Dashboard</button></div>}
    </div>
  </div>;
}
