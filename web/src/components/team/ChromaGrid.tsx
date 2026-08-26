"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./ChromaGrid.css";

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  institution?: string;
  contributions?: string[];
  skills?: string[];
}

interface ChromaGridProps {
  items: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  continuousSlide?: boolean;
  slideDuration?: number;
}

export function ChromaGrid({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
  continuousSlide = true,
  slideDuration = 35,
}: ChromaGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<any>(null);
  const setY = useRef<any>(null);
  const pos = useRef({ x: 0, y: 0 });

  const data = items?.length ? items : [];
  // Duplicate for seamless infinite sliding marquee
  const displayItems = continuousSlide ? [...data, ...data] : data;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current?.(pos.current.x);
    setY.current?.(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    if (fadeRef.current) {
      gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    }
  };

  const handleLeave = () => {
    if (fadeRef.current) {
      gsap.to(fadeRef.current, {
        opacity: 1,
        duration: fadeOut,
        overwrite: true,
      });
    }
  };

  const handleCardClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-container ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div
        className={`chroma-grid ${continuousSlide ? "chroma-slider-track" : ""}`}
        style={{
          "--r": `${radius}px`,
          ...(continuousSlide ? { animationDuration: `${slideDuration}s` } : {}),
        } as React.CSSProperties}
      >
        {displayItems.map((c, i) => (
          <article
            key={`${c.title}-${i}`}
            className="chroma-card"
            onMouseMove={handleCardMove}
            onClick={() => handleCardClick(c.url)}
            style={{
              "--card-border": c.borderColor || "#00c2ff",
              "--card-gradient": c.gradient || "linear-gradient(145deg, rgba(15, 76, 255, 0.25), rgba(5, 11, 26, 0.95))",
              cursor: c.url ? "pointer" : "default",
            } as React.CSSProperties}
          >
            <div className="chroma-img-wrapper">
              <img src={c.image} alt={c.title} loading="lazy" />
            </div>
            <footer className="chroma-info">
              <div className="name-row">
                <h3 className="name">{c.title}</h3>
                {c.handle && <span className="handle">{c.handle}</span>}
              </div>
              <p className="role">{c.subtitle}</p>

              {c.institution && (
                <span className="institution">🎓 {c.institution}</span>
              )}

              {c.contributions && c.contributions.length > 0 && (
                <div className="contributions-list">
                  {c.contributions.map((item, idx) => (
                    <div key={idx} className="contribution-item">
                      <span style={{ color: "#00c2ff" }}>•</span> {item}
                    </div>
                  ))}
                </div>
              )}

              {c.skills && c.skills.length > 0 && (
                <div className="skills-row">
                  {c.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </footer>
          </article>
        ))}
      </div>

      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
}

export default ChromaGrid;
