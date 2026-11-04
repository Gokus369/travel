import type { Camera } from "@/components/story/timeline";

export type Picture = {
  a: ImageBitmap | null;
  b: ImageBitmap | null;
  mix: number;
  camera: Camera;
  tide: number;
  toPaper: boolean;
  portal: number;
  /** 0 to 1, how hard the page is being scrolled. Bends the image like water. */
  ripple: number;
  phase: number;
  pointer: [x: number, y: number, strength: number];
  ringPhase: number;
  /** 0 while the film is still the paper page, 1 once it is footage. */
  film: number;
};

export type Renderer = {
  resize(width: number, height: number): void;
  draw(picture: Picture): void;
  dispose(): void;
};

const vertexShader = `#version 300 es
out vec2 vUv;
void main() {
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = vec2(corner.x, corner.y);
  gl_Position = vec4(corner.x * 2.0 - 1.0, 1.0 - corner.y * 2.0, 0.0, 1.0);
}`;

const fragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uA;
uniform sampler2D uB;
uniform vec4 uLensA;
uniform vec4 uLensB;
uniform float uMix;
uniform float uTide;
uniform float uToPaper;
uniform float uPortal;
uniform float uPortalRadius;
uniform float uRipple;
uniform float uPhase;
uniform vec3 uPointer;
uniform float uRingPhase;
uniform float uAspect;
uniform float uFilm;

const float FRAME_ASPECT = 16.0 / 9.0;
const vec2 TEXEL = vec2(1.0 / 1280.0, 1.0 / 720.0);
const vec2 SUN = vec2(734.7 / 1280.0, 324.4 / 720.0);
const vec3 PAPER = vec3(247.0, 240.0, 224.0) / 255.0;
const vec3 GOLD = vec3(246.0, 179.0, 101.0) / 255.0;
const vec3 SEA = vec3(68.0, 133.0, 141.0) / 255.0;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    sum += noise(p) * amplitude;
    p = p * 2.03 + 17.0;
    amplitude *= 0.5;
  }
  return sum / 0.875;
}

vec2 toFrame(vec4 lens, vec2 uv) {
  return (uv - 0.5) * lens.xy + lens.zw;
}

// Anything past the edge of the frame is paper, which is how phones fit the logo to the screen.
vec3 inFrame(vec3 color, vec2 f) {
  vec2 edge = smoothstep(vec2(0.0), vec2(0.004), f) * smoothstep(vec2(0.0), vec2(0.004), 1.0 - f);
  return mix(PAPER, color, edge.x * edge.y);
}

vec3 frame(sampler2D tex, vec4 lens, vec2 uv, float split) {
  vec2 f = toFrame(lens, uv);
  vec3 color = vec3(
    texture(tex, f + vec2(split, 0.0)).r,
    texture(tex, f).g,
    texture(tex, f - vec2(split, 0.0)).b
  );
  return inFrame(color, f);
}

// A gentle unsharp mask offsets the softness of 720p footage on large screens.
vec3 sharpened(vec3 color, vec2 uv) {
  vec2 f = toFrame(uLensA, uv);
  vec3 around = (
    texture(uA, f + vec2(TEXEL.x, 0.0)).rgb + texture(uA, f - vec2(TEXEL.x, 0.0)).rgb +
    texture(uA, f + vec2(0.0, TEXEL.y)).rgb + texture(uA, f - vec2(0.0, TEXEL.y)).rgb
  ) * 0.25;
  return color + (texture(uA, f).rgb - around) * 0.55 * uFilm;
}

void main() {
  vec2 uv = vUv;
  float y = 1.0 - uv.y;
  float x = uv.x * uAspect;

  // Scrolling bends the whole picture like water, more strongly low in the frame.
  float low = mix(0.45, 1.0, uv.y);
  vec2 bend = vec2(
    sin(uv.y * 24.0 + uPhase * 2.6) * 0.6 + sin(uv.y * 9.0 - uPhase * 1.7) * 0.4,
    sin(uv.x * 15.0 - uPhase * 2.1) * 0.5
  ) * vec2(0.011, 0.006) * uRipple * low;

  // The cursor leaves rings, as a fingertip would on still water.
  vec2 fromPointer = (uv - uPointer.xy) * vec2(uAspect, 1.0);
  float ringDistance = length(fromPointer);
  bend += (fromPointer / max(ringDistance, 0.001)) *
    sin(ringDistance * 64.0 - uRingPhase) * exp(-ringDistance * 6.5) * uPointer.z * 0.006;

  // The tide: a crest rises through the frame with the next scene beneath it.
  float tideActive = step(0.0001, uTide) * step(uTide, 0.9999);
  float swell = uTide * 9.0;
  float crest = mix(-0.17, 1.17, uTide)
    + sin(x * 5.0 + swell * 1.1) * 0.05
    + sin(x * 11.0 - swell * 1.6) * 0.025
    + sin(x * 25.0 + swell * 2.4) * 0.01;
  float nearCrest = exp(-pow((y - crest) / 0.1, 2.0)) * tideActive;
  bend += vec2(sin(y * 60.0 + swell) * 0.01, -0.035) * nearCrest;

  vec2 bent = uv + bend;
  float split = 0.0022 * uRipple + 0.0009 * nearCrest;
  vec3 color = frame(uA, uLensA, bent, split);

  if (uPortal > 0.0) {
    // The sun in the logo opens into the sea, then the camera flies through it.
    vec2 f = toFrame(uLensA, uv);
    float d = length((f - SUN) * vec2(FRAME_ASPECT, 1.0));
    float soft = max(fwidth(d) * 1.5, 0.0003);
    float through = smoothstep(uPortalRadius + soft, uPortalRadius - soft, d);
    color = mix(color, frame(uB, uLensB, bent, split), through);
    float rimWidth = uPortalRadius * 0.14 + 0.0006;
    float rim = exp(-pow((d - uPortalRadius) / rimWidth, 2.0));
    color += GOLD * rim * 0.75 * smoothstep(0.0, 0.08, uPortal);
    color += GOLD * exp(-max(d - uPortalRadius, 0.0) / (uPortalRadius * 0.9 + 0.001)) * (1.0 - through) * 0.16 * smoothstep(0.0, 0.3, uPortal);
  } else {
    color = mix(color, frame(uB, uLensB, bent, split), uMix);
  }

  color = sharpened(color, bent);

  if (tideActive > 0.0) {
    vec3 next = uToPaper > 0.5 ? PAPER : frame(uB, uLensB, bent, split);
    float covered = smoothstep(crest + 0.005, crest - 0.005, y);
    color = mix(color, next, covered);
    color = mix(color, SEA, nearCrest * 0.2 * (1.0 - uToPaper * covered));

    // Foam: a broken white crest, trailing the thin web of lace that a wave leaves behind it.
    float lip = crest + (fbm(vec2(x * 13.0, swell * 1.4)) - 0.5) * 0.045;
    float band = smoothstep(0.03, 0.008, abs(y - lip));
    float behind = max(crest - y, 0.0);
    float web = 1.0 - abs(fbm(vec2(x * 8.0 + swell * 0.5, behind * 20.0 + swell * 0.8)) * 2.0 - 1.0);
    float lace = smoothstep(0.86, 0.97, web) * exp(-behind * 12.0) * step(y, crest);
    color = mix(color, PAPER, clamp(band * 0.95 + lace * 0.85, 0.0, 1.0));
  } else if (uToPaper > 0.5 && uTide >= 0.9999) {
    color = PAPER;
  }

  // Finish: a soft vignette, and fine grain that also hides banding in the skies.
  float vignette = smoothstep(0.42, 0.98, length((uv - 0.5) * vec2(1.08, 1.0)));
  float graded = uFilm * (1.0 - uToPaper * smoothstep(crest + 0.02, crest - 0.02, y));
  color *= 1.0 - vignette * 0.26 * graded;
  color += (hash(gl_FragCoord.xy * 0.5 + fract(uPhase * 0.37) * 37.0) - 0.5) * 0.034 * graded;

  fragColor = vec4(color, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

function createWebGLRenderer(canvas: HTMLCanvasElement): Renderer | null {
  const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, powerPreference: "high-performance" });
  if (!gl) return null;

  const uniformNames = [
    "uA", "uB", "uLensA", "uLensB", "uMix", "uTide", "uToPaper", "uPortal", "uPortalRadius",
    "uRipple", "uPhase", "uPointer", "uRingPhase", "uAspect", "uFilm",
  ] as const;

  let uniforms = {} as Record<(typeof uniformNames)[number], WebGLUniformLocation | null>;
  let textures: [WebGLTexture | null, WebGLTexture | null] = [null, null];
  let loaded: [ImageBitmap | null, ImageBitmap | null] = [null, null];
  let last: Picture | null = null;

  function setUp() {
    const vertex = compile(gl!, gl!.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl!, gl!.FRAGMENT_SHADER, fragmentShader);
    const program = gl!.createProgram();
    if (!vertex || !fragment || !program) return false;
    gl!.attachShader(program, vertex);
    gl!.attachShader(program, fragment);
    gl!.linkProgram(program);
    if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
      console.error(gl!.getProgramInfoLog(program));
      return false;
    }
    gl!.useProgram(program);
    gl!.bindVertexArray(gl!.createVertexArray());
    for (const name of uniformNames) uniforms[name] = gl!.getUniformLocation(program, name);

    textures = [gl!.createTexture(), gl!.createTexture()];
    textures.forEach((texture, unit) => {
      gl!.activeTexture(gl!.TEXTURE0 + unit);
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    });
    gl!.uniform1i(uniforms.uA, 0);
    gl!.uniform1i(uniforms.uB, 1);
    loaded = [null, null];
    return true;
  }

  function upload(unit: 0 | 1, bitmap: ImageBitmap) {
    gl!.activeTexture(gl!.TEXTURE0 + unit);
    gl!.bindTexture(gl!.TEXTURE_2D, textures[unit]);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA8, gl!.RGBA, gl!.UNSIGNED_BYTE, bitmap);
    loaded[unit] = bitmap;
  }

  const onLost = (event: Event) => event.preventDefault();
  const onRestored = () => {
    uniforms = {} as typeof uniforms;
    if (setUp() && last) renderer.draw(last);
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  if (!setUp()) return null;

  const renderer: Renderer = {
    resize(width, height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    },
    draw(picture) {
      last = picture;
      if (gl.isContextLost() || !picture.a) return;

      // Playing forwards, today's B is tomorrow's A, so swap units rather than upload again.
      if (picture.a !== loaded[0] && picture.a === loaded[1]) {
        textures.reverse();
        loaded.reverse();
        textures.forEach((texture, unit) => {
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, texture);
        });
      }
      if (picture.a !== loaded[0]) upload(0, picture.a);
      const b = picture.b ?? picture.a;
      if (b !== loaded[1]) upload(1, b);

      const { a: lensA, b: lensB, portalRadius } = picture.camera;
      gl.uniform4f(uniforms.uLensA, ...lensA.scale, ...lensA.focus);
      gl.uniform4f(uniforms.uLensB, ...lensB.scale, ...lensB.focus);
      gl.uniform1f(uniforms.uMix, picture.mix);
      gl.uniform1f(uniforms.uTide, picture.tide);
      gl.uniform1f(uniforms.uToPaper, picture.toPaper ? 1 : 0);
      gl.uniform1f(uniforms.uPortal, picture.portal);
      gl.uniform1f(uniforms.uPortalRadius, portalRadius);
      gl.uniform1f(uniforms.uRipple, picture.ripple);
      gl.uniform1f(uniforms.uPhase, picture.phase);
      gl.uniform3f(uniforms.uPointer, ...picture.pointer);
      gl.uniform1f(uniforms.uRingPhase, picture.ringPhase);
      gl.uniform1f(uniforms.uAspect, canvas.width / canvas.height);
      gl.uniform1f(uniforms.uFilm, picture.film);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      textures.forEach((texture) => gl.deleteTexture(texture));
    },
  };
  return renderer;
}

/** For browsers without WebGL2: the same film, with crossfades in place of the water. */
function createCanvasRenderer(canvas: HTMLCanvasElement): Renderer | null {
  const context = canvas.getContext("2d");
  if (!context) return null;

  function paint(bitmap: ImageBitmap, lens: Camera["a"], alpha: number) {
    const { width, height } = bitmap;
    context!.globalAlpha = alpha;
    context!.drawImage(
      bitmap,
      (lens.focus[0] - lens.scale[0] / 2) * width,
      (lens.focus[1] - lens.scale[1] / 2) * height,
      lens.scale[0] * width,
      lens.scale[1] * height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }

  return {
    resize(width, height) {
      canvas.width = width;
      canvas.height = height;
    },
    draw({ a, b, mix, tide, toPaper, portal, camera }) {
      if (!a) return;
      context.globalAlpha = 1;
      context.fillStyle = "#f7f0e0";
      context.fillRect(0, 0, canvas.width, canvas.height);
      paint(a, camera.a, 1);
      const blend = portal || (toPaper ? 0 : tide) || mix;
      if (b && blend > 0) paint(b, camera.b, blend);
      if (toPaper) {
        context.globalAlpha = tide;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      context.globalAlpha = 1;
    },
    dispose() {},
  };
}

export function createRenderer(canvas: HTMLCanvasElement) {
  return createWebGLRenderer(canvas) ?? createCanvasRenderer(canvas);
}
