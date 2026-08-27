"use client";

import "./ChromaGrid.css";

export interface ChromaItem {
  /** Local avatar under /public/assets/team/. When absent the card falls back
   *  to a generated initials tile — never a third-party placeholder service. */
  image?: string;
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
  continuousSlide?: boolean;
  slideDuration?: number;
}

function initials(name: string) {
  return name
    .replace(/^(Dr|Md|Mr|Ms|Mrs|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function ChromaGrid({
  items,
  className = "",
  continuousSlide = true,
  slideDuration = 38,
}: ChromaGridProps) {
  const data = items?.length ? items : [];
  // Duplicate for a seamless infinite marquee. The clones are decorative —
  // aria-hidden keeps screen readers from announcing the team twice.
  const displayItems = continuousSlide ? [...data, ...data] : data;

  const openProfile = (url?: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // Drives the per-card spotlight in ChromaGrid.css (.chroma-card::before).
  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className={`chroma-container ${className}`}>
      <div
        className={`chroma-grid ${continuousSlide ? "chroma-slider-track" : ""}`}
        style={
          continuousSlide
            ? ({ animationDuration: `${slideDuration}s` } as React.CSSProperties)
            : undefined
        }
      >
        {displayItems.map((c, i) => {
          const isClone = continuousSlide && i >= data.length;
          const interactive = Boolean(c.url);
          return (
            <article
              key={`${c.title}-${i}`}
              className="chroma-card"
              aria-hidden={isClone || undefined}
              onMouseMove={handleCardMove}
              onClick={interactive ? () => openProfile(c.url) : undefined}
              onKeyDown={
                interactive
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openProfile(c.url);
                      }
                    }
                  : undefined
              }
              role={interactive ? "link" : undefined}
              tabIndex={interactive && !isClone ? 0 : undefined}
              style={
                {
                  "--card-border": c.borderColor || "#00c2ff",
                  "--card-gradient":
                    c.gradient ||
                    "linear-gradient(145deg, rgba(15, 76, 255, 0.25), rgba(5, 11, 26, 0.95))",
                  cursor: interactive ? "pointer" : "default",
                } as React.CSSProperties
              }
            >
              <div className="chroma-img-wrapper">
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt={c.title} loading="lazy" />
                ) : (
                  <div className="chroma-avatar-fallback" aria-hidden="true">
                    {initials(c.title)}
                  </div>
                )}
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
          );
        })}
      </div>
    </div>
  );
}

export default ChromaGrid;
