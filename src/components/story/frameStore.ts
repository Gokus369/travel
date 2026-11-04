import { frameUrl } from "@/components/story/timeline";

/**
 * Streams the film without holding it all in memory. Compressed frames are kept for the
 * session, but a decoded 720p frame costs nearly 4 MB, so only those around the playhead stay
 * decoded. Frames arrive coarse to fine, so the film can always show something nearby.
 */

const MAX_FETCHES = 6;
const MAX_DECODES = 3;
const NEAR_PLAYHEAD = 24;

/** Outlives the component, so hidden routes coming back do not fetch anything twice. */
const blobs = new Map<number, Blob>();
const fetching = new Set<number>();

/** A fetch can outlive the store that started it, so it reports to whichever store is live. */
let resumeLiveStore: (() => void) | null = null;

export class FrameStore {
  private bitmaps = new Map<number, ImageBitmap>();
  private decoding = new Set<number>();
  private queue: number[];
  private playhead = 1;
  private direction = 1;
  private fine = false;
  private disposed = false;
  private readonly resume = () => {
    this.pump();
    this.decode();
  };

  constructor(
    private frames: number[],
    private maxDecoded: number,
    private onChange: () => void,
  ) {
    this.queue = [...frames].sort((a, b) => passOf(frames.indexOf(a)) - passOf(frames.indexOf(b)));
    resumeLiveStore = this.resume;
    this.pump();
    this.decode();
  }

  /** Only the coarse pass loads before this, which spares visitors who never scroll. */
  loadEverything() {
    if (this.fine) return;
    this.fine = true;
    this.pump();
  }

  setPlayhead(frame: number) {
    if (frame === this.playhead) return;
    this.direction = frame > this.playhead ? 1 : -1;
    this.playhead = frame;
    this.pump();
    this.decode();
  }

  /** The exact frame if it is ready, otherwise the nearest one that is. */
  get(frame: number) {
    const exact = this.bitmaps.get(frame);
    if (exact) return exact;
    let best: ImageBitmap | null = null;
    let bestDistance = Infinity;
    for (const [candidate, bitmap] of this.bitmaps) {
      const distance = Math.abs(candidate - frame);
      if (distance < bestDistance) {
        best = bitmap;
        bestDistance = distance;
      }
    }
    return best;
  }

  isReady(frame: number) {
    return this.bitmaps.has(this.closestFilmFrame(frame));
  }

  dispose() {
    this.disposed = true;
    if (resumeLiveStore === this.resume) resumeLiveStore = null;
    for (const bitmap of this.bitmaps.values()) bitmap.close();
    this.bitmaps.clear();
  }

  private closestFilmFrame(frame: number) {
    return this.frames.reduce((best, candidate) =>
      Math.abs(candidate - frame) < Math.abs(best - frame) ? candidate : best,
    );
  }

  private nextFetch() {
    const index = this.frames.indexOf(this.closestFilmFrame(this.playhead));
    for (let offset = 0; this.fine && offset < NEAR_PLAYHEAD; offset++) {
      const frame = this.frames[index + offset * this.direction];
      if (frame !== undefined && !blobs.has(frame) && !fetching.has(frame)) return frame;
    }
    return this.queue.find(
      (frame) =>
        !blobs.has(frame) && !fetching.has(frame) && (this.fine || passOf(this.frames.indexOf(frame)) === 0),
    );
  }

  private pump() {
    while (!this.disposed && fetching.size < MAX_FETCHES) {
      const frame = this.nextFetch();
      if (frame === undefined) return;
      fetching.add(frame);
      fetch(frameUrl(frame))
        .then((response) => (response.ok ? response.blob() : null))
        .then((blob) => {
          if (blob) blobs.set(frame, blob);
        })
        .catch(() => {})
        .finally(() => {
          fetching.delete(frame);
          resumeLiveStore?.();
        });
    }
  }

  /** Mostly ahead of the playhead. Always fits the cap, or decoding and eviction would chase each other. */
  private wantedFrames() {
    const index = this.frames.indexOf(this.closestFilmFrame(this.playhead));
    const room = this.maxDecoded - 2;
    const ahead = Math.floor(room * 0.7);
    const wanted = [this.frames[index]];
    for (let offset = 1; offset <= ahead; offset++) wanted.push(this.frames[index + offset * this.direction]);
    for (let offset = 1; offset <= room - ahead; offset++) wanted.push(this.frames[index - offset * this.direction]);
    return wanted.filter((frame) => frame !== undefined);
  }

  private decode() {
    if (this.disposed) return;
    for (const frame of this.wantedFrames()) {
      if (this.decoding.size >= MAX_DECODES) break;
      const blob = blobs.get(frame);
      if (!blob || this.bitmaps.has(frame) || this.decoding.has(frame)) continue;
      this.decoding.add(frame);
      createImageBitmap(blob)
        .then((bitmap) => {
          if (this.disposed) {
            bitmap.close();
            return;
          }
          this.bitmaps.set(frame, bitmap);
          this.evict();
          this.onChange();
        })
        .catch(() => {})
        .finally(() => {
          this.decoding.delete(frame);
          this.decode();
        });
    }
  }

  private evict() {
    const wanted = new Set(this.wantedFrames());
    while (this.bitmaps.size > this.maxDecoded) {
      let furthest = -1;
      let distance = -1;
      for (const frame of this.bitmaps.keys()) {
        // The logo frame comes back whenever someone returns to the top.
        if (frame === 1 || wanted.has(frame)) continue;
        const away = Math.abs(frame - this.playhead);
        if (away > distance) {
          furthest = frame;
          distance = away;
        }
      }
      if (furthest < 0) return;
      this.bitmaps.get(furthest)?.close();
      this.bitmaps.delete(furthest);
    }
  }
}

/** 0 for every 8th frame, 1 for the 4ths between them, then 2, then 3 for the rest. */
function passOf(index: number) {
  if (index % 8 === 0) return 0;
  if (index % 4 === 0) return 1;
  return index % 2 === 0 ? 2 : 3;
}
