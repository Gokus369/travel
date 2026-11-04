"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import { WhatsAppIcon } from "@/components/Ornaments";
import { FrameStore } from "@/components/story/frameStore";
import { createRenderer } from "@/components/story/renderer";
import {
  cameraAt,
  chapters,
  DURATION,
  filmFrames,
  frameUrl,
  OPENING_LINE,
  shotAt,
  smoothstep,
  type Chapter,
  type Lens,
} from "@/components/story/timeline";
import { site } from "@/data/site";
import { defaultWhatsappUrl } from "@/lib/contact";

type Connection = { saveData?: boolean; effectiveType?: string };

/** How many frames to step by, so slow or metered connections fetch fewer of them. */
function chooseStride(narrow: boolean) {
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  if (connection?.saveData) return 4;
  if (connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g") return 4;
  if (connection?.effectiveType === "3g") return 3;
  return narrow ? 2 : 1;
}

export function ScrollStory() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const poster = posterRef.current;
    const canvas = canvasRef.current;
    if (!root || !stage || !poster || !canvas) return;

    const renderer = createRenderer(canvas);
    if (!renderer) return;

    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let raf = 0;
    let visible = true;
    let last = performance.now();
    let aspect = 1;
    let opening: Lens = { scale: [1, 1], focus: [0.5, 0.5] };
    let t = 0;
    let travel = 1;
    let lastScroll = window.scrollY;
    let ripple = 0;
    let ringPhase = 0;
    let shown = false;
    const pointer = { x: 0.5, y: 0.5, strength: 0 };

    const store = new FrameStore(filmFrames(chooseStride(narrow)), narrow ? 20 : 40, wake);

    const chapterNodes = [...root.querySelectorAll<HTMLElement>("[data-chapter]")];
    const railStops = [...root.querySelectorAll<HTMLElement>("[data-index]")];

    function targetTime() {
      const top = root!.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, -top / travel)) * DURATION;
    }

    function paintInterface() {
      chapters.forEach((chapter, index) => {
        const node = chapterNodes[index];
        const fadeIn = smoothstep(chapter.fadeIn[0], chapter.fadeIn[1], t);
        const fadeOut = smoothstep(chapter.fadeOut[0], chapter.fadeOut[1], t);
        node.style.setProperty("--in", fadeIn.toFixed(3));
        node.style.setProperty("--out", fadeOut.toFixed(3));
        node.dataset.live = fadeIn > 0.8 && fadeOut < 0.2 ? "true" : "false";
      });
      root!.style.setProperty("--opening", (1 - smoothstep(0.4, 5, t)).toFixed(3));
      root!.style.setProperty("--progress", Math.min(1, t / chapters[chapters.length - 1].stop).toFixed(4));
      root!.style.setProperty("--interface", (1 - smoothstep(148, 154, t)).toFixed(3));
      root!.dataset.tone = t < 13 ? "paper" : "film";

      const active = chapters.findLastIndex((chapter) => t >= chapter.fadeIn[0]);
      railStops.forEach((stop, index) => stop.toggleAttribute("data-current", index === active));
    }

    function loop(now: number) {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const target = targetTime();
      const before = t;
      t += (target - t) * (1 - Math.exp(-dt * 7));
      if (Math.abs(target - t) < 0.002) t = target;

      const speed = dt > 0 ? Math.abs(t - before) / dt : 0;
      ripple += (Math.min(speed / 24, 1) - ripple) * (1 - Math.exp(-dt * 5));
      if (ripple < 0.002) ripple = 0;

      pointer.strength *= Math.exp(-dt * 1.5);
      if (pointer.strength < 0.01) pointer.strength = 0;
      ringPhase += dt * 11;

      const shot = shotAt(t);
      store.setPlayhead(shot.b);
      renderer!.draw({
        a: store.get(shot.a),
        b: store.get(shot.b),
        mix: shot.mix,
        camera: cameraAt(t, aspect, shot, opening),
        tide: shot.tide,
        toPaper: shot.toPaper,
        portal: shot.portal,
        ripple,
        phase: t * 1.1,
        pointer: [pointer.x, pointer.y, pointer.strength],
        ringPhase,
        film: smoothstep(6, 16, t),
      });

      if (!shown && store.isReady(1)) {
        shown = true;
        canvas!.style.opacity = "1";
      }
      paintInterface();

      // Frames that land later wake the loop themselves, so a failed one cannot keep it spinning.
      const settled = t === target && ripple === 0 && pointer.strength === 0;
      if (!settled) wake();
    }

    function wake() {
      if (!raf && visible) {
        raf = requestAnimationFrame(loop);
      }
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height, left, top } = stage!.getBoundingClientRect();
      aspect = width / height;
      travel = root!.offsetHeight - height;

      // The CSS lays out the logo and its text, and the film starts exactly where the logo sits.
      const logo = poster!.getBoundingClientRect();
      opening = {
        scale: [width / logo.width, height / logo.height],
        focus: [(width / 2 + left - logo.left) / logo.width, (height / 2 + top - logo.top) / logo.height],
      };

      renderer!.resize(Math.round(width * ratio), Math.round(height * ratio));
      last = performance.now();
      wake();
    }

    function onScroll() {
      store.loadEverything();
      const y = window.scrollY;
      const inFilm = y > 40 && root!.getBoundingClientRect().bottom > window.innerHeight * 1.2;
      document.documentElement.dataset.story = inFilm ? (y >= lastScroll ? "away" : "back") : "";
      lastScroll = y;
      wake();
    }

    function onPointerMove(event: PointerEvent) {
      const box = stage!.getBoundingClientRect();
      pointer.x = (event.clientX - box.left) / box.width;
      pointer.y = (event.clientY - box.top) / box.height;
      pointer.strength = Math.min(1, pointer.strength + 0.22);
      wake();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = performance.now();
        wake();
      }
    });
    observer.observe(root);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);

    window.addEventListener("scroll", onScroll, { passive: true });
    if (hover) stage.addEventListener("pointermove", onPointerMove, { passive: true });

    t = targetTime();
    if (t > 0) store.loadEverything();
    resize();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      stage.removeEventListener("pointermove", onPointerMove);
      store.dispose();
      renderer.dispose();
      delete document.documentElement.dataset.story;
    };
  }, []);

  function jumpTo(chapter: Chapter) {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const distance = root.offsetHeight - stage.offsetHeight;
    window.scrollTo({ top: root.offsetTop + (chapter.stop / DURATION) * distance });
  }

  const shore = chapters[chapters.length - 1];

  return (
    <section
      ref={rootRef}
      aria-label="The Wave Story film"
      data-tone="paper"
      className="story relative -mt-[calc(4.5rem+1px)] h-[850svh] bg-paper [@media(scripting:none)]:mt-0 [@media(scripting:none)]:h-auto"
    >
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
        <Image
          ref={posterRef}
          src={frameUrl(1)}
          alt={`${site.name} logo: ${site.tagline}`}
          width={1280}
          height={720}
          preload
          unoptimized
          className="story-poster"
        />
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full opacity-0" />

        <div className="story-opening px-6 text-center text-ink">
          <h1 className="mx-auto max-w-3xl text-[1.0625rem] leading-relaxed tracking-normal text-ink-soft md:text-lg">
            {OPENING_LINE}
          </h1>
          <p aria-hidden className="mt-3 inline-flex flex-col items-center gap-1.5 text-[0.8125rem] font-semibold">
            Scroll to begin
            <span className="story-cue" />
          </p>
        </div>

        {chapters.map((chapter) => (
          <article key={chapter.id} data-chapter={chapter.id} className={`story-chapter story-${chapter.layout}`}>
            <div className="story-scrim" />
            <div className="story-copy">
              <p className="story-place">{chapter.place}</p>
              <h2 className="story-title">
                {chapter.title.split(" ").map((word, index) => (
                  <Fragment key={`${word}${index}`}>
                    <span className="story-word">
                      <span style={{ "--i": index } as CSSProperties}>{word}</span>
                    </span>{" "}
                  </Fragment>
                ))}
              </h2>

              {chapter === shore && (
                <div className="story-actions">
                  <p className="font-display text-xl text-paper md:text-3xl">Where will yours begin?</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <Link href="/packages" onFocus={() => jumpTo(shore)} className="btn btn-sun">
                      See tour packages
                    </Link>
                    <a
                      href={defaultWhatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      onFocus={() => jumpTo(shore)}
                      className="btn btn-ghost text-paper"
                    >
                      <WhatsAppIcon className="size-[18px]" />
                      Plan on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}

        <nav aria-label="Chapters of the film" className="story-rail">
          <JourneyRail onJump={jumpTo} />
        </nav>
      </div>
    </section>
  );
}

const RAIL_WIDTH = 640;

const railY = (x: number) => 11 + Math.sin(x / 46) * 4 + Math.sin(x / 19) * 1.6;

const railPath = Array.from({ length: RAIL_WIDTH / 8 + 1 }, (_, index) => {
  const x = index * 8;
  return `${index === 0 ? "M" : "L"}${x} ${railY(x).toFixed(2)}`;
}).join(" ");

function JourneyRail({ onJump }: { onJump: (chapter: Chapter) => void }) {
  const end = chapters[chapters.length - 1].stop;

  return (
    <div className="story-rail-track">
      <svg viewBox={`0 0 ${RAIL_WIDTH} 22`} preserveAspectRatio="none" aria-hidden className="story-rail-line">
        <path d={railPath} vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox={`0 0 ${RAIL_WIDTH} 22`} preserveAspectRatio="none" aria-hidden className="story-rail-done">
        <path d={railPath} vectorEffect="non-scaling-stroke" />
      </svg>
      <ol>
        {chapters.map((chapter, index) => {
          const x = (chapter.stop / end) * 100;
          const top = (railY((chapter.stop / end) * RAIL_WIDTH) / 22) * 100;
          return (
            <li key={chapter.id} style={{ left: `${x}%`, top: `${top}%` }} data-index={index}>
              <button type="button" aria-label={`Go to ${chapter.place}`} onClick={() => onJump(chapter)}>
                <span className="story-rail-dot" />
                <span className="story-rail-label">{chapter.rail}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
