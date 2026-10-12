import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { beats, business, sequence } from "../content";

gsap.registerPlugin(ScrollTrigger);

const MAX_DPR = 2;
const CONCURRENCY = 6;
const HANDOFF_START = 0.9; // scroll progress where the footage starts dimming out

export function ScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const poster = section.querySelector<HTMLImageElement>(".seq__poster");

    const total = sequence.frameCount;
    const frames: (HTMLImageElement | null)[] = new Array(total).fill(null);
    let targetIndex = 0;
    let drawnIndex = -1;
    let cancelled = false;

    // Draw the nearest decoded frame at or before the target, so a fast jump
    // never produces a blank canvas; the last good frame stays visible.
    const draw = () => {
      let i = targetIndex;
      while (i >= 0 && !frames[i]) i--;
      if (i < 0) {
        i = targetIndex;
        while (i < total && !frames[i]) i++;
      }
      const img = frames[i];
      if (!img || (i === drawnIndex && !resizedFlag)) return;
      resizedFlag = false;
      drawnIndex = i;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (cw - dw) * sequence.focalX;
      const dy = (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    let resizedFlag = true;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      resizedFlag = true;
      draw();
    };

    // Bounded loader: a few requests at a time, first frame first.
    let next = 0;
    const loadNext = () => {
      if (cancelled || next >= total) return;
      const idx = next++;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        frames[idx] = img;
        draw();
        loadNext();
      };
      img.onerror = () => loadNext(); // keep last good frame on failure
      img.src = sequence.framePath(idx);
    };
    for (let k = 0; k < CONCURRENCY; k++) loadNext();

    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctxG = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            targetIndex = Math.min(total - 1, Math.round(self.progress * (total - 1)));
            requestAnimationFrame(draw);
            const p = self.progress;
            const fade = 0.04;
            beats.forEach((b, n) => {
              const el = beatRefs.current[n];
              if (!el) return;
              // The first beat is visible from the very top and the last beat
              // holds to the end, so the hero is never left without a headline.
              const isFirst = n === 0;
              const isLast = n === beats.length - 1;
              let o = 0;
              const inStart = isFirst ? -Infinity : b.at;
              const inEnd = isLast ? Infinity : b.to;
              if (p >= inStart && p <= inEnd) {
                const fadeIn = isFirst ? 1 : (p - b.at) / fade;
                const fadeOut = isLast ? 1 : (b.to - p) / fade;
                o = Math.max(0, Math.min(1, fadeIn, fadeOut));
              }
              el.style.opacity = String(o);
              el.style.transform = `translateY(${(1 - o) * 14}px)`;
            });
            // Hand-off: dim the footage over the last stretch so the hero
            // settles into the page background instead of cutting.
            const t = Math.max(0, Math.min(1, (p - HANDOFF_START) / (1 - HANDOFF_START)));
            const dim = String(1 - 0.65 * t * t * (3 - 2 * t));
            canvas.style.opacity = dim;
            if (poster) poster.style.opacity = dim;
          },
        });
        // Initial state for reload mid-page.
        ScrollTrigger.refresh();
      }, section);
      return () => ctxG.revert();
    });

    // Reduced motion: show the resolved last frame, all beats stacked in flow.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      targetIndex = total - 1;
      draw();
    });

    return () => {
      cancelled = true;
      ro.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="seq"
      style={{ ["--seq-length" as string]: `${sequence.scrollLengthVh}vh` }}
      aria-label={`${business.name} introduction`}
    >
      <div className="seq__pin">
        <img
          className="seq__poster"
          src={sequence.framePath(0)}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />
        <canvas ref={canvasRef} className="seq__canvas" aria-hidden="true" />
        <div className="seq__shade" aria-hidden="true" />
        <div className="seq__copy">
          <h1 className="sr-only">
            {business.name}: {business.tagline}
          </h1>
          <div className="beats">
            {beats.map((b, n) => (
              <div
                key={b.title}
                className="beat"
                ref={(el) => {
                  beatRefs.current[n] = el;
                }}
                style={n === 0 ? { opacity: 1 } : { opacity: 0 }}
              >
                <p className="beat__kicker">{b.kicker}</p>
                <h2 className="beat__title">{b.title}</h2>
                <p className="beat__body">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="seq__cta">
            <a className="btn btn--primary" href={business.phoneHref}>
              Call {business.phoneDisplay}
            </a>
            <a className="btn" href={business.smsHref}>
              Text us
            </a>
          </div>
        </div>
        {sequence.isPlaceholder && (
          <p className="seq__flag">Placeholder footage. Replace with approved assets.</p>
        )}
      </div>
    </section>
  );
}
