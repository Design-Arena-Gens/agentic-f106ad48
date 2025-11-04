"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Scene = {
  id: number;
  title?: string;
  heading?: string;
  devanagari?: string;
  subtext?: string;
  names?: string;
  date?: string;
  venue?: string;
  durationMs: number;
};

const SCENES: Scene[] = [
  {
    id: 1,
    devanagari: "|| ???? ?????? ??? ||\n????????? ?????? ????????? ???????\n?????????? ???? ?? ??? ???????????? ???????",
    durationMs: 4200
  },
  {
    id: 2,
    heading:
      "Mr. Bharatbhai Patel and Mrs. Bhavanaben Patel cordially invite you to the wedding of their beloved daughter.",
    durationMs: 3800
  },
  {
    id: 3,
    title: "Save the Date!",
    names: "Dhruva Patel weds Prakhar Patel",
    durationMs: 4200
  },
  {
    id: 4,
    heading: "Join us for the Vibrant Haldi Ceremony",
    date: "Saturday, 29th November 2025",
    durationMs: 4200
  },
  {
    id: 5,
    heading: "The Wedding Ceremony",
    date: "Sunday, 30th November 2025",
    durationMs: 4200
  },
  {
    id: 6,
    heading: "Venue",
    venue:
      "Nr. Shyam vihar society,\nSander Dabhadi Road,\nSander, Patan.",
    durationMs: 4200
  },
  {
    id: 7,
    heading: "With Best Compliments",
    subtext: "We Await Your Presence!",
    durationMs: 3800
  }
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [playing, setPlaying] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);

  const current = SCENES[index];

  const totalDuration = useMemo(
    () => SCENES.reduce((acc, s) => acc + s.durationMs, 0),
    []
  );

  useEffect(() => {
    if (!playing) return;

    setPhase("enter");
    const showTimer = setTimeout(() => {
      setPhase("exit");
      const exitTimer = setTimeout(() => {
        setIndex((i) => {
          const next = i + 1;
          if (next >= SCENES.length) {
            setPlaying(false);
            return i; // stay on last
          }
          return next;
        });
      }, 800);
      return () => clearTimeout(exitTimer);
    }, Math.max(1000, current.durationMs - 800));

    return () => clearTimeout(showTimer);
  }, [index, current.durationMs, playing]);

  // simple overall progress animation
  useEffect(() => {
    if (!progressRef.current) return;

    const el = progressRef.current;
    el.animate(
      [
        { transform: "scaleX(0)" },
        { transform: "scaleX(1)" }
      ],
      { duration: totalDuration, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" }
    );
  }, [totalDuration]);

  function restart() {
    setIndex(0);
    setPlaying(true);
    setPhase("enter");
  }

  return (
    <div className="container">
      <div className="card">
        <div className="framing" />
        <div className="sparkles" />

        {/* Layered parallax accents */}
        <DecorativeBackdrop />

        <div className={`scene fade-${phase}`}>
          <div style={{ display: "grid", gap: 10 }}>
            {current.title && <div className="title">{current.title}</div>}
            {current.devanagari && (
              <div className="devanagari" aria-label="Ganesh Shloka">
                {current.devanagari}
              </div>
            )}
            {current.heading && <div className="heading">{current.heading}</div>}
            {current.names && <div className="names">{current.names}</div>}
            {current.date && <div className="date">{current.date}</div>}
            {current.venue && <div className="subtext venue">{current.venue}</div>}
            {current.subtext && <div className="subtext">{current.subtext}</div>}
          </div>
        </div>

        <div className="controls">
          <button className="button" onClick={() => setPlaying((p) => !p)}>
            {playing ? "Pause" : "Play"}
          </button>
          <button className="button" onClick={restart}>Restart</button>
        </div>

        <div className="progress" ref={progressRef} />
      </div>
    </div>
  );
}

function DecorativeBackdrop() {
  return (
    <svg className="framing" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#E0C48C" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#E0C48C" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#E0C48C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0c48c" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#e8b4c3" stopOpacity="0.5" />
        </linearGradient>
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      <g opacity="0.35">
        <circle cx="50" cy="50" r="46" fill="url(#glow)" />
      </g>

      <g filter="url(#softBlur)" opacity="0.6">
        <path d="M5 20 C 25 10, 75 10, 95 20" stroke="url(#line)" strokeWidth="0.6" fill="none" />
        <path d="M5 80 C 25 90, 75 90, 95 80" stroke="url(#line)" strokeWidth="0.6" fill="none" />
      </g>

      <g opacity="0.25">
        {Array.from({ length: 24 }).map((_, i) => (
          <circle key={i} cx={Math.random() * 100} cy={Math.random() * 100} r={Math.random() * 0.5 + 0.2} fill="#fff" />
        ))}
      </g>
    </svg>
  );
}
