/**
 * The film as a timeline. Time is measured in abstract units; ScrollStory maps the page's
 * scroll position onto them. Frame numbers refer to public/frames/v1.
 */

export const FRAME_ASPECT = 16 / 9;

const SUN = { x: 734.7 / 1280, y: 324.4 / 720, radius: 29.3 / 720 };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const frameUrl = (frame: number) =>
  `${basePath}/frames/v1/frame_${String(frame).padStart(4, "0")}.webp`;

type Segment =
  | { kind: "hold"; frame: number; length: number }
  | { kind: "portal"; from: number; to: number; length: number }
  | { kind: "play"; from: number; to: number; length: number }
  | { kind: "tide"; from: number; to: number; length: number }
  | { kind: "ebb"; frame: number; length: number };

const segments: Segment[] = [
  { kind: "hold", frame: 1, length: 6 },
  { kind: "portal", from: 35, to: 44, length: 13 },
  { kind: "play", from: 44, to: 55, length: 12 },
  { kind: "play", from: 55, to: 84, length: 20 },
  { kind: "tide", from: 84, to: 85, length: 6 },
  { kind: "play", from: 85, to: 120, length: 16 },
  { kind: "tide", from: 120, to: 121, length: 6 },
  { kind: "play", from: 121, to: 177, length: 24 },
  { kind: "play", from: 177, to: 216, length: 20 },
  { kind: "tide", from: 216, to: 217, length: 6 },
  { kind: "play", from: 217, to: 240, length: 12 },
  { kind: "hold", frame: 240, length: 12 },
  { kind: "ebb", frame: 240, length: 8 },
];

export const DURATION = segments.reduce((sum, segment) => sum + segment.length, 0);

/** Frames that must exist whatever the stride, because a segment starts or ends on them. */
const keyFrames = new Set([1, 35, 44, 55, 84, 85, 120, 121, 177, 216, 217, 240]);

export function filmFrames(stride = 1) {
  const frames = [1];
  for (let frame = 35; frame <= 240; frame++) {
    if ((frame - 35) % stride === 0 || keyFrames.has(frame)) frames.push(frame);
  }
  return frames;
}

export type Shot = {
  a: number;
  b: number;
  mix: number;
  portal: number;
  tide: number;
  toPaper: boolean;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

export function smoothstep(from: number, to: number, value: number) {
  const x = clamp01((value - from) / (to - from));
  return x * x * (3 - 2 * x);
}

export function shotAt(t: number): Shot {
  const still = { mix: 0, portal: 0, tide: 0, toPaper: false };
  let start = 0;

  for (const segment of segments) {
    const end = start + segment.length;
    if (t <= end || segment === segments[segments.length - 1]) {
      const p = clamp01((t - start) / segment.length);
      switch (segment.kind) {
        case "hold":
          return { ...still, a: segment.frame, b: segment.frame };
        case "portal":
          return { ...still, a: 1, b: Math.round(lerp(segment.from, segment.to, p)), portal: p };
        case "play": {
          const frame = lerp(segment.from, segment.to, p);
          const a = Math.floor(frame);
          return { ...still, a, b: Math.min(a + 1, segment.to), mix: frame - a };
        }
        case "tide":
          return { ...still, a: segment.from, b: segment.to, tide: p };
        case "ebb":
          return { ...still, a: segment.frame, b: segment.frame, tide: p, toPaper: true };
      }
    }
    start = end;
  }
  return { ...still, a: 240, b: 240 };
}

export type Lens = { scale: [number, number]; focus: [number, number] };

export type Camera = { a: Lens; b: Lens; portalRadius: number };

function coverScale(aspect: number): [number, number] {
  return aspect >= FRAME_ASPECT ? [1, FRAME_ASPECT / aspect] : [aspect / FRAME_ASPECT, 1];
}

/** Portrait screens fit the logo to their width, where a cover crop would cut it off. */
function openingScale(aspect: number): [number, number] {
  if (aspect >= 1) return coverScale(aspect);
  const x = 1 / PORTRAIT_LOGO_ZOOM;
  return [x, (x * FRAME_ASPECT) / aspect];
}

/** Matches the poster's portrait:scale-[1.95], so the canvas lands exactly on top of it. */
const PORTRAIT_LOGO_ZOOM = 1.95;

type Keys = [number, number][];

function sample(keys: Keys, t: number) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const [t0, v0] = keys[i - 1];
      const [t1, v1] = keys[i];
      return lerp(v0, v1, smoothstep(t0, t1, t));
    }
  }
  return keys[keys.length - 1][1];
}

/** A slow push in on each scene, easing back while the tide covers the join. */
const pushKeys: Keys = [
  [19, 1], [51, 1.07], [57, 1],
  [73, 1.07], [79, 1],
  [103, 1.06], [106, 1], [123, 1.06], [129, 1],
  [141, 1.05],
];

/** Portrait screens see about a quarter of the frame, so the camera pans to each subject. */
const portraitFocusKeys: Keys = [
  [19, 0.2], [31, 0.3], [40, 0.5], [73, 0.52], [79, 0.46], [103, 0.5], [107, 0.42], [123, 0.42], [129, 0.63],
];

export function cameraAt(t: number, aspect: number, shot: Shot): Camera {
  const zoom = sample(pushKeys, t);
  const cover = coverScale(aspect);
  const width = cover[0] / zoom;
  const panned = aspect < 1 ? sample(portraitFocusKeys, t) : 0.5;
  const focusX = Math.min(1 - width / 2, Math.max(width / 2, panned));
  const film: Lens = { scale: [width, cover[1] / zoom], focus: [focusX, 0.5] };

  if (shot.a !== 1) return { a: film, b: film, portalRadius: 0 };

  const open = openingScale(aspect);
  const p = shot.portal;
  const halfDiagonal = 0.5 * Math.hypot(open[0] * FRAME_ASPECT, open[1]);
  const reach = (halfDiagonal / SUN.radius) * 1.15;
  const flight = Math.exp(Math.log(reach) * Math.pow(p, 3.2));
  const toSun = smoothstep(0, 0.55, p);
  const arrival = lerp(1.24, 1, smoothstep(0.35, 1, p));

  return {
    a: {
      scale: [open[0] / flight, open[1] / flight],
      focus: [lerp(0.5, SUN.x, toSun), lerp(0.5, SUN.y, toSun)],
    },
    b: { scale: [film.scale[0] / arrival, film.scale[1] / arrival], focus: film.focus },
    portalRadius: SUN.radius * smoothstep(0.02, 0.4, p),
  };
}

export const OPENING_LINE =
  "All India tour packages, travel guides and hotel bookings, planned from Varkala, Kerala.";

export type Chapter = {
  id: string;
  place: string;
  rail: string;
  title: string;
  fadeIn: [number, number];
  fadeOut: [number, number];
  /** Where the rail lands, with the chapter fully on screen. */
  stop: number;
  layout: "bottom-left" | "top-left" | "bottom-right" | "center-top";
  still: number;
  alt: string;
};

export const chapters: Chapter[] = [
  {
    id: "coast",
    place: "Varkala, Kerala",
    rail: "Varkala",
    title: "It begins where the land meets the sea.",
    fadeIn: [15.5, 20],
    fadeOut: [28.5, 31],
    stop: 24,
    layout: "bottom-left",
    still: 44,
    alt: "Red cliffs above a calm green sea, with gulls overhead",
  },
  {
    id: "north",
    place: "Agra, Uttar Pradesh",
    rail: "Agra",
    title: "Follow the light north.",
    fadeIn: [39, 43],
    fadeOut: [48.5, 51],
    stop: 45,
    layout: "top-left",
    still: 74,
    alt: "The Taj Mahal and its gardens under a clear morning sky",
  },
  {
    id: "forts",
    place: "Rajasthan",
    rail: "Rajasthan",
    title: "Past forts that outlived their kings.",
    fadeIn: [58, 62],
    fadeOut: [70.5, 73],
    stop: 65,
    layout: "bottom-left",
    still: 105,
    alt: "A golden hill fort seen from the air in evening light",
  },
  {
    id: "india",
    place: "All of India",
    rail: "All India",
    title: "14 routes. 6 regions. One country.",
    fadeIn: [81, 85],
    fadeOut: [100, 103],
    stop: 92,
    layout: "bottom-right",
    still: 146,
    alt: "A relief map of India with travel postcards rising from it",
  },
  {
    id: "backwaters",
    place: "Alappuzha, Kerala",
    rail: "Alappuzha",
    title: "Then home, to slow water.",
    fadeIn: [107, 111],
    fadeOut: [120.5, 123],
    stop: 114,
    layout: "bottom-left",
    still: 198,
    alt: "Houseboats on the palm-lined Kerala backwaters at dusk",
  },
  {
    id: "shore",
    place: "The shore",
    rail: "Your story",
    title: "Every journey tells a story.",
    fadeIn: [131, 138],
    fadeOut: [152, 155],
    stop: 146,
    layout: "center-top",
    still: 240,
    alt: "A lantern and compass on the sand as the tide comes in at dusk",
  },
];
