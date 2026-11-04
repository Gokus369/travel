(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,15013,e=>{"use strict";var t=e.i(43476),r=e.i(22016),a=e.i(71645),i=e.i(42694),s=e.i(64326),o=e.i(68178);let n=()=>()=>{},l=()=>new Date().getMonth()+1,c=()=>0;e.s(["SeasonPicker",0,function(){let e=(0,a.useSyncExternalStore)(n,l,c),[h,u]=(0,a.useState)(null),d=h??e,f=d?s.Q.filter(e=>e.months.includes(d)):s.Q;return(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{role:"group","aria-label":"Choose a month",className:"grid grid-cols-6 gap-1 md:grid-cols-12",children:o.m.map((e,r)=>{let a=r+1,i=a===d;return(0,t.jsx)("button",{type:"button","aria-pressed":i,"aria-label":o.O[r],onClick:()=>u(a),className:`min-h-11 cursor-pointer rounded-full px-2 text-[0.9375rem] font-medium transition-colors ${i?"bg-ink text-paper":"text-ink-soft hover:bg-paper-deep hover:text-ink"}`,children:e},e)})}),(0,t.jsx)("p",{"aria-live":"polite",className:"mt-8 mb-8 text-ink-soft",children:d?`${f.length} trips are in season in ${o.O[d-1]}.`:`${s.Q.length} trips, every one with its best months marked.`}),(0,t.jsx)(i.f,{trips:f.slice(0,3)}),(0,t.jsx)(r.default,{href:d?`/packages?month=${d}`:"/packages",className:"btn btn-ghost mt-10",children:d?`See all ${f.length} ${o.O[d-1]} trips`:"See all trips"})]})}])},79374,e=>{"use strict";var t=e.i(43476),r=e.i(25164),a=e.i(22016),i=e.i(71645),s=e.i(54086);let o=16/9,n={x:.573984375,y:324.4/720,radius:29.3/720},l=e=>`/travel/frames/v1/frame_${String(e).padStart(4,"0")}.webp`,c=[{kind:"hold",frame:1,length:5},{kind:"portal",from:35,to:44,length:8},{kind:"play",from:44,to:55,length:12},{kind:"play",from:55,to:66,length:3},{kind:"play",from:66,to:84,length:14},{kind:"tide",from:84,to:85,length:3},{kind:"play",from:85,to:120,length:16},{kind:"tide",from:120,to:121,length:3},{kind:"play",from:121,to:177,length:24},{kind:"play",from:177,to:183,length:2},{kind:"play",from:183,to:216,length:14},{kind:"tide",from:216,to:217,length:3},{kind:"play",from:217,to:240,length:12},{kind:"hold",frame:240,length:12},{kind:"ebb",frame:240,length:4}],h=c.reduce((e,t)=>e+t.length,0),u=new Set([1,35,44,55,66,84,85,120,121,177,183,216,217,240]),d=e=>Math.min(1,Math.max(0,e)),f=(e,t,r)=>e+(t-e)*r;function m(e,t,r){let a=d((r-e)/(t-e));return a*a*(3-2*a)}function p(e,t){if(t<=e[0][0])return e[0][1];for(let r=1;r<e.length;r++)if(t<=e[r][0]){let[a,i]=e[r-1],[s,o]=e[r];return f(i,o,m(a,s,t))}return e[e.length-1][1]}let g=[[13,1],[42,1.07],[45,1],[61,1.07],[64,1],[88,1.06],[90,1],[104,1.06],[107,1],[119,1.05]],v=[[13,.2],[25,.3],[29,.5],[61,.52],[64,.46],[88,.5],[90,.42],[104,.42],[107,.63]],x=[{id:"coast",place:"Varkala, Kerala",rail:"Varkala",title:"It begins where the land meets the sea.",fadeIn:[11,14.5],fadeOut:[22.5,25],stop:18,layout:"bottom-left"},{id:"north",place:"Agra, Uttar Pradesh",rail:"Agra",title:"Follow the light north.",fadeIn:[28.5,31.5],fadeOut:[39.5,42],stop:35,layout:"top-left"},{id:"forts",place:"Rajasthan",rail:"Rajasthan",title:"Past forts that outlived their kings.",fadeIn:[45,48],fadeOut:[58.5,61],stop:53,layout:"bottom-left"},{id:"india",place:"All of India",rail:"All India",title:"14 routes. 6 regions. One country.",fadeIn:[66,69.5],fadeOut:[85,88],stop:77,layout:"bottom-right"},{id:"backwaters",place:"Alappuzha, Kerala",rail:"Alappuzha",title:"Then home, to slow water.",fadeIn:[90.5,93.5],fadeOut:[101.5,104],stop:97,layout:"bottom-left"},{id:"shore",place:"The shore",rail:"Your story",title:"Every journey tells a story.",fadeIn:[109,115],fadeOut:[130,133],stop:125,layout:"center-top"}],b=new Map,y=new Set,w=null;class E{frames;maxDecoded;onChange;bitmaps;decoding;queue;playhead;direction;fine;disposed;resume;constructor(e,t,r){this.frames=e,this.maxDecoded=t,this.onChange=r,this.bitmaps=new Map,this.decoding=new Set,this.playhead=1,this.direction=1,this.fine=!1,this.disposed=!1,this.resume=()=>{this.pump(),this.decode()},this.queue=[...e].sort((t,r)=>P(e.indexOf(t))-P(e.indexOf(r))),w=this.resume,this.pump(),this.decode()}loadEverything(){this.fine||(this.fine=!0,this.pump())}setPlayhead(e){e!==this.playhead&&(this.direction=e>this.playhead?1:-1,this.playhead=e,this.pump(),this.decode())}get(e){let t=this.bitmaps.get(e);if(t)return t;let r=null,a=1/0;for(let[t,i]of this.bitmaps){let s=Math.abs(t-e);s<a&&(r=i,a=s)}return r}isReady(e){return this.bitmaps.has(this.closestFilmFrame(e))}dispose(){for(let e of(this.disposed=!0,w===this.resume&&(w=null),this.bitmaps.values()))e.close();this.bitmaps.clear()}closestFilmFrame(e){return this.frames.reduce((t,r)=>Math.abs(r-e)<Math.abs(t-e)?r:t)}nextFetch(){let e=this.frames.indexOf(this.closestFilmFrame(this.playhead));for(let t=0;this.fine&&t<24;t++){let r=this.frames[e+t*this.direction];if(void 0!==r&&!b.has(r)&&!y.has(r))return r}return this.queue.find(e=>!b.has(e)&&!y.has(e)&&(this.fine||0===P(this.frames.indexOf(e))))}pump(){for(;!this.disposed&&y.size<6;){let e=this.nextFetch();if(void 0===e)return;y.add(e),fetch(l(e)).then(e=>e.ok?e.blob():null).then(t=>{t&&b.set(e,t)}).catch(()=>{}).finally(()=>{y.delete(e),w?.()})}}wantedFrames(){let e=this.frames.indexOf(this.closestFilmFrame(this.playhead)),t=this.maxDecoded-2,r=Math.floor(.7*t),a=[this.frames[e]];for(let t=1;t<=r;t++)a.push(this.frames[e+t*this.direction]);for(let i=1;i<=t-r;i++)a.push(this.frames[e-i*this.direction]);return a.filter(e=>void 0!==e)}decode(){if(!this.disposed)for(let e of this.wantedFrames()){if(this.decoding.size>=3)break;let t=b.get(e);!t||this.bitmaps.has(e)||this.decoding.has(e)||(this.decoding.add(e),createImageBitmap(t).then(t=>{this.disposed?t.close():(this.bitmaps.set(e,t),this.evict(),this.onChange())}).catch(()=>{}).finally(()=>{this.decoding.delete(e),this.decode()}))}}evict(){let e=new Set(this.wantedFrames());for(;this.bitmaps.size>this.maxDecoded;){let t=-1,r=-1;for(let a of this.bitmaps.keys()){if(1===a||e.has(a))continue;let i=Math.abs(a-this.playhead);i>r&&(t=a,r=i)}if(t<0)return;this.bitmaps.get(t)?.close(),this.bitmaps.delete(t)}}}function P(e){return e%8==0?0:e%4==0?1:e%2==0?2:3}let T=`#version 300 es
out vec2 vUv;
void main() {
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = vec2(corner.x, corner.y);
  gl_Position = vec4(corner.x * 2.0 - 1.0, 1.0 - corner.y * 2.0, 0.0, 1.0);
}`,A=`#version 300 es
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
}`;function R(e,t,r){let a=e.createShader(t);return a?(e.shaderSource(a,r),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS))?a:(console.error(e.getShaderInfoLog(a)),null):null}var k=e.i(70326),M=e.i(14829);let j=e=>11+4*Math.sin(e/46)+1.6*Math.sin(e/19),F=Array.from({length:81},(e,t)=>{let r=8*t;return`${0===t?"M":"L"}${r} ${j(r).toFixed(2)}`}).join(" ");function S({onJump:e}){let r=x[x.length-1].stop;return(0,t.jsxs)("div",{className:"story-rail-track",children:[(0,t.jsx)("svg",{viewBox:"0 0 640 22",preserveAspectRatio:"none","aria-hidden":!0,className:"story-rail-line",children:(0,t.jsx)("path",{d:F,vectorEffect:"non-scaling-stroke"})}),(0,t.jsx)("svg",{viewBox:"0 0 640 22",preserveAspectRatio:"none","aria-hidden":!0,className:"story-rail-done",children:(0,t.jsx)("path",{d:F,vectorEffect:"non-scaling-stroke"})}),(0,t.jsx)("ol",{children:x.map((a,i)=>{let s=a.stop/r*100,o=j(a.stop/r*640)/22*100;return(0,t.jsx)("li",{style:{left:`${s}%`,top:`${o}%`},"data-index":i,children:(0,t.jsxs)("button",{type:"button","aria-label":`Go to ${a.place}`,onClick:()=>e(a),children:[(0,t.jsx)("span",{className:"story-rail-dot"}),(0,t.jsx)("span",{className:"story-rail-label",children:a.rail})]})},a.id)})})]})}e.s(["ScrollStory",0,function(){let e=(0,i.useRef)(null),b=(0,i.useRef)(null),y=(0,i.useRef)(null),w=(0,i.useRef)(null);function P(t){let r=e.current,a=b.current;if(!r||!a)return;let i=r.offsetHeight-a.offsetHeight;window.scrollTo({top:r.offsetTop+t.stop/h*i})}(0,i.useEffect)(()=>{let t,r=e.current,a=b.current,i=y.current,s=w.current;if(!r||!a||!i||!s)return;let l=function(e){let t=e.getContext("webgl2",{alpha:!1,antialias:!1,powerPreference:"high-performance"});if(!t)return null;let r=["uA","uB","uLensA","uLensB","uMix","uTide","uToPaper","uPortal","uPortalRadius","uRipple","uPhase","uPointer","uRingPhase","uAspect","uFilm"],a={},i=[null,null],s=[null,null],o=null;function n(){let e=R(t,t.VERTEX_SHADER,T),o=R(t,t.FRAGMENT_SHADER,A),n=t.createProgram();if(!e||!o||!n)return!1;if(t.attachShader(n,e),t.attachShader(n,o),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))return console.error(t.getProgramInfoLog(n)),!1;for(let e of(t.useProgram(n),t.bindVertexArray(t.createVertexArray()),r))a[e]=t.getUniformLocation(n,e);return(i=[t.createTexture(),t.createTexture()]).forEach((e,r)=>{t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}),t.uniform1i(a.uA,0),t.uniform1i(a.uB,1),s=[null,null],!0}function l(e,r){t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,i[e]),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,r),s[e]=r}let c=e=>e.preventDefault(),h=()=>{a={},n()&&o&&u.draw(o)};if(e.addEventListener("webglcontextlost",c),e.addEventListener("webglcontextrestored",h),!n())return null;let u={resize(r,a){e.width=r,e.height=a,t.viewport(0,0,r,a)},draw(r){if(o=r,t.isContextLost()||!r.a)return;r.a!==s[0]&&r.a===s[1]&&(i.reverse(),s.reverse(),i.forEach((e,r)=>{t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,e)})),r.a!==s[0]&&l(0,r.a);let n=r.b??r.a;n!==s[1]&&l(1,n);let{a:c,b:h,portalRadius:u}=r.camera;t.uniform4f(a.uLensA,...c.scale,...c.focus),t.uniform4f(a.uLensB,...h.scale,...h.focus),t.uniform1f(a.uMix,r.mix),t.uniform1f(a.uTide,r.tide),t.uniform1f(a.uToPaper,+!!r.toPaper),t.uniform1f(a.uPortal,r.portal),t.uniform1f(a.uPortalRadius,u),t.uniform1f(a.uRipple,r.ripple),t.uniform1f(a.uPhase,r.phase),t.uniform3f(a.uPointer,...r.pointer),t.uniform1f(a.uRingPhase,r.ringPhase),t.uniform1f(a.uAspect,e.width/e.height),t.uniform1f(a.uFilm,r.film),t.drawArrays(t.TRIANGLES,0,3)},dispose(){e.removeEventListener("webglcontextlost",c),e.removeEventListener("webglcontextrestored",h),i.forEach(e=>t.deleteTexture(e))}};return u}(s)??function(e){let t=e.getContext("2d");if(!t)return null;function r(r,a,i){let{width:s,height:o}=r;t.globalAlpha=i,t.drawImage(r,(a.focus[0]-a.scale[0]/2)*s,(a.focus[1]-a.scale[1]/2)*o,a.scale[0]*s,a.scale[1]*o,0,0,e.width,e.height)}return{resize(t,r){e.width=t,e.height=r},draw({a,b:i,mix:s,tide:o,toPaper:n,portal:l,camera:c}){if(!a)return;t.globalAlpha=1,t.fillStyle="#f7f0e0",t.fillRect(0,0,e.width,e.height),r(a,c.a,1);let h=l||(n?0:o)||s;i&&h>0&&r(i,c.b,h),n&&(t.globalAlpha=o,t.fillRect(0,0,e.width,e.height)),t.globalAlpha=1},dispose(){}}}(s);if(!l)return;let P=window.matchMedia("(max-width: 767px)").matches,k=window.matchMedia("(hover: hover) and (pointer: fine)").matches,M=0,j=!0,F=performance.now(),S=1,L={scale:[1,1],focus:[.5,.5]},N=0,D=1,_=window.scrollY,I=0,C=0,U=!1,B={x:.5,y:.5,strength:0},O=new E(function(e=1){let t=[1];for(let r=35;r<=240;r++)((r-35)%e==0||u.has(r))&&t.push(r);return t}((t=navigator.connection,t?.saveData||t?.effectiveType==="2g"||t?.effectiveType==="slow-2g"?4:t?.effectiveType==="3g"?3:P?2:1)),P?20:40,V),X=[...r.querySelectorAll("[data-chapter]")],$=[...r.querySelectorAll("[data-index]")];function z(){return Math.min(1,Math.max(0,-r.getBoundingClientRect().top/D))*h}function G(e){let t;M=0;let a=Math.min((e-F)/1e3,.05);F=e;let i=z(),h=N;N+=(i-N)*(1-Math.exp(-(7*a))),.002>Math.abs(i-N)&&(N=i);let u=a>0?Math.abs(N-h)/a:0;(I+=(Math.min(u/24,1)-I)*(1-Math.exp(-(5*a))))<.002&&(I=0),B.strength*=Math.exp(-(1.5*a)),B.strength<.01&&(B.strength=0),C+=11*a;let b=function(e){let t={mix:0,portal:0,tide:0,toPaper:!1},r=0;for(let a of c){let i=r+a.length;if(e<=i||a===c[c.length-1]){let i=d((e-r)/a.length);switch(a.kind){case"hold":return{...t,a:a.frame,b:a.frame};case"portal":return{...t,a:1,b:Math.round(f(a.from,a.to,i)),portal:i};case"play":{let e=f(a.from,a.to,i),r=Math.floor(e);return{...t,a:r,b:Math.min(r+1,a.to),mix:e-r}}case"tide":return{...t,a:a.from,b:a.to,tide:i};case"ebb":return{...t,a:a.frame,b:a.frame,tide:i,toPaper:!0}}}r=i}return{...t,a:240,b:240}}(N);O.setPlayhead(b.b),l.draw({a:O.get(b.a),b:O.get(b.b),mix:b.mix,camera:function(e,t,r,a){let i=p(g,e),s=t>=o?[1,o/t]:[t/o,1],l=s[0]/i,c=Math.min(1-l/2,Math.max(l/2,t<1?p(v,e):.5)),h={scale:[l,s[1]/i],focus:[c,.5]};if(1!==r.a)return{a:h,b:h,portalRadius:0};let u=r.portal,d=Math.exp(Math.log(.5*Math.hypot(a.scale[0]*o,a.scale[1])/n.radius*1.15)*Math.pow(u,3.2)),x=m(0,.55,u),b=f(1.24,1,m(.35,1,u));return{a:{scale:[a.scale[0]/d,a.scale[1]/d],focus:[f(a.focus[0],n.x,x),f(a.focus[1],n.y,x)]},b:{scale:[h.scale[0]/b,h.scale[1]/b],focus:h.focus},portalRadius:n.radius*m(.02,.4,u)}}(N,S,b,L),tide:b.tide,toPaper:b.toPaper,portal:b.portal,ripple:I,phase:1.1*N,pointer:[B.x,B.y,B.strength],ringPhase:C,film:m(5,11,N)}),!U&&O.isReady(1)&&(U=!0,s.style.opacity="1"),x.forEach((e,t)=>{let r=X[t],a=m(e.fadeIn[0],e.fadeIn[1],N),i=m(e.fadeOut[0],e.fadeOut[1],N);r.style.setProperty("--in",a.toFixed(3)),r.style.setProperty("--out",i.toFixed(3)),r.dataset.live=a>.8&&i<.2?"true":"false"}),r.style.setProperty("--opening",(1-m(.4,4,N)).toFixed(3)),r.style.setProperty("--progress",Math.min(1,N/x[x.length-1].stop).toFixed(4)),r.style.setProperty("--interface",(1-m(128,133,N)).toFixed(3)),r.dataset.tone=N<9.5?"paper":"film",t=x.findLastIndex(e=>N>=e.fadeIn[0]),$.forEach((e,r)=>e.toggleAttribute("data-current",r===t));let y=N===i&&0===I&&0===B.strength;y||V()}function V(){!M&&j&&(M=requestAnimationFrame(G))}function W(){let e=Math.min(window.devicePixelRatio||1,1.5),{width:t,height:s,left:o,top:n}=a.getBoundingClientRect();S=t/s,D=r.offsetHeight-s;let c=i.getBoundingClientRect();L={scale:[t/c.width,s/c.height],focus:[(t/2+o-c.left)/c.width,(s/2+n-c.top)/c.height]},l.resize(Math.round(t*e),Math.round(s*e)),F=performance.now(),V()}function q(){O.loadEverything();let e=window.scrollY,t=e>40&&r.getBoundingClientRect().bottom>1.2*window.innerHeight;document.documentElement.dataset.story=t?e>=_?"away":"back":"",_=e,V()}function H(e){let t=a.getBoundingClientRect();B.x=(e.clientX-t.left)/t.width,B.y=(e.clientY-t.top)/t.height,B.strength=Math.min(1,B.strength+.22),V()}let K=new IntersectionObserver(([e])=>{(j=e.isIntersecting)&&(F=performance.now(),V())});K.observe(r);let Y=new ResizeObserver(W);return Y.observe(a),window.addEventListener("scroll",q,{passive:!0}),k&&a.addEventListener("pointermove",H,{passive:!0}),(N=z())>0&&O.loadEverything(),W(),()=>{cancelAnimationFrame(M),K.disconnect(),Y.disconnect(),window.removeEventListener("scroll",q),a.removeEventListener("pointermove",H),O.dispose(),l.dispose(),delete document.documentElement.dataset.story}},[]);let j=x[x.length-1];return(0,t.jsx)("section",{ref:e,"aria-label":"The Wave Story film","data-tone":"paper",className:"story relative -mt-[calc(4.5rem+1px)] h-[730svh] bg-paper [@media(scripting:none)]:mt-0 [@media(scripting:none)]:h-auto",children:(0,t.jsxs)("div",{ref:b,className:"sticky top-0 h-svh overflow-hidden",children:[(0,t.jsx)(r.default,{ref:y,src:l(1),alt:`${k.B.name} logo: ${k.B.tagline}`,width:1280,height:720,preload:!0,unoptimized:!0,className:"story-poster"}),(0,t.jsx)("canvas",{ref:w,"aria-hidden":!0,className:"absolute inset-0 size-full opacity-0"}),(0,t.jsxs)("div",{className:"story-opening px-6 text-center text-ink",children:[(0,t.jsx)("h1",{className:"mx-auto max-w-3xl text-[1.0625rem] leading-relaxed tracking-normal text-ink-soft md:text-lg",children:"All India tour packages and travel guides, planned from Varkala, Kerala."}),(0,t.jsxs)("p",{"aria-hidden":!0,className:"mt-3 inline-flex flex-col items-center gap-1.5 text-[0.8125rem] font-semibold",children:["Scroll to begin",(0,t.jsx)("span",{className:"story-cue"})]})]}),x.map(e=>(0,t.jsxs)("article",{"data-chapter":e.id,className:`story-chapter story-${e.layout}`,children:[(0,t.jsx)("div",{className:"story-scrim"}),(0,t.jsxs)("div",{className:"story-copy",children:[(0,t.jsx)("p",{className:"story-place",children:e.place}),(0,t.jsx)("h2",{className:"story-title",children:e.title.split(" ").map((e,r)=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsx)("span",{className:"story-word",children:(0,t.jsx)("span",{style:{"--i":r},children:e})})," "]},`${e}${r}`))}),e===j&&(0,t.jsxs)("div",{className:"story-actions",children:[(0,t.jsx)("p",{className:"font-display text-xl text-paper md:text-3xl",children:"Where will yours begin?"}),(0,t.jsxs)("div",{className:"mt-5 flex flex-wrap justify-center gap-3",children:[(0,t.jsx)(a.default,{href:"/packages",onFocus:()=>P(j),className:"btn btn-sun",children:"See tour packages"}),(0,t.jsxs)("a",{href:M.p,target:"_blank",rel:"noreferrer",onFocus:()=>P(j),className:"btn btn-ghost text-paper",children:[(0,t.jsx)(s.f,{className:"size-[18px]"}),"Plan on WhatsApp"]})]})]})]})]},e.id)),(0,t.jsx)("nav",{"aria-label":"Chapters of the film",className:"story-rail",children:(0,t.jsx)(S,{onJump:P})})]})})}],79374)}]);