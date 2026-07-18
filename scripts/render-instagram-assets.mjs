import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manrope = await readFile(resolve(root, "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"));
const jetbrains = await readFile(resolve(root, "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2"));
const claudioPortrait = await readFile(resolve(root, "public/images/portraits/marzagana-elementales/claudio-miguel-2400.webp"));
const wines2022 = await readFile(resolve(root, "public/images/portraits/marzagana-elementales/wines-2022-2400.webp"));
const barrelsOutside = await readFile(resolve(root, "public/images/portraits/marzagana-elementales/barrels-outside-2400.webp"));

const webpDataUrl = (image) => `data:image/webp;base64,${image.toString("base64")}`;

const fontCss = `
  @font-face {
    font-family: "Manrope";
    src: url(data:font/woff2;base64,${manrope.toString("base64")}) format("woff2");
    font-weight: 200 800;
  }
  @font-face {
    font-family: "JetBrains Mono";
    src: url(data:font/woff2;base64,${jetbrains.toString("base64")}) format("woff2");
    font-weight: 200 800;
  }
`;

const sharedCss = `
  ${fontCss}
  :root {
    --black: #050505;
    --surface: #121212;
    --line: #222222;
    --paper: #eae6df;
    --muted: #a3a3a3;
    --terracotta: #d66a57;
    --sand: #8f8776;
    --sand-ink: #262420;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1080px; height: 1440px; overflow: hidden; }
  body { font-family: "Manrope", sans-serif; }
  .artboard {
    position: relative;
    width: 1080px;
    height: 1440px;
    overflow: hidden;
    isolation: isolate;
  }
  .artboard::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 20;
    pointer-events: none;
    opacity: .16;
    background-image:
      repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0, rgba(255,255,255,.035) 1px, transparent 1px, transparent 4px),
      repeating-linear-gradient(90deg, rgba(0,0,0,.025) 0, rgba(0,0,0,.025) 1px, transparent 1px, transparent 5px);
    mix-blend-mode: soft-light;
  }
  .frame { position: absolute; inset: 54px; border: 1px solid currentColor; opacity: .6; }
  .mono { font-family: "JetBrains Mono", monospace; text-transform: uppercase; letter-spacing: .12em; }
  .kicker { font: 500 18px/1.25 "JetBrains Mono", monospace; text-transform: uppercase; letter-spacing: .14em; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: currentColor; display: inline-block; }
  .rule { height: 1px; background: currentColor; opacity: .55; }
`;

const works = [
  {
    path: "public/og-image.png",
    width: 1200,
    height: 630,
    html: `
      <main class="artboard og-cover">
        <div class="og-mark">
          <div class="og-wordmark">ENOVERSA</div>
          <div class="og-tagline"><span></span>Narratives of Soil &amp; Craft</div>
        </div>
      </main>
    `,
    css: `
      .og-cover { background: var(--black); color: var(--paper); display: grid; place-items: center; }
      .og-cover::after { opacity: .08; }
      .og-mark { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
      .og-wordmark { padding-left: .25em; font-size: 102px; font-weight: 700; line-height: 1; letter-spacing: .25em; }
      .og-tagline { margin-top: 34px; display: flex; align-items: center; gap: 17px; color: var(--muted); font: 450 20px/1.3 "JetBrains Mono", monospace; text-transform: uppercase; letter-spacing: .14em; }
      .og-tagline span { width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); }
    `,
  },
  {
    path: "social/instagram/volume-ii/01-cover.png",
    html: `
      <main class="artboard cover">
        <div class="frame"></div>
        <header><span class="dot"></span><span class="kicker">Enoversa / 2026</span></header>
        <section class="cover-title">
          <div class="roman">II</div>
          <div>
            <h1>VOLUME</h1>
            <p>A new beginning</p>
          </div>
        </section>
        <footer class="mono">Wine · People · Places</footer>
      </main>
    `,
    css: `
      .cover { background: var(--black); color: var(--paper); }
      .cover header { position: absolute; left: 86px; right: 86px; top: 88px; display: flex; align-items: center; gap: 18px; }
      .cover header .dot { color: var(--terracotta); }
      .cover-title { position: absolute; left: 86px; right: 86px; top: 390px; display: grid; grid-template-columns: 190px 1fr; align-items: end; gap: 38px; }
      .cover-title .roman { color: var(--terracotta); font: 250 246px/.76 "Manrope"; letter-spacing: -.1em; }
      .cover h1 { margin: 0; font-size: 142px; font-weight: 720; line-height: .82; letter-spacing: -.075em; }
      .cover p { margin: 40px 0 0 7px; color: var(--muted); font: 450 24px/1.3 "JetBrains Mono"; text-transform: uppercase; letter-spacing: .12em; }
      .cover footer { position: absolute; left: 86px; bottom: 88px; font-size: 17px; color: var(--muted); }
    `,
  },
  {
    path: "social/instagram/volume-ii/02-colophon.png",
    html: `
      <main class="artboard colophon">
        <div class="block"></div>
        <div class="frame"></div>
        <header class="kicker">Enoversa / Volume II</header>
        <section>
          <div class="kicker section-label">Edited by</div>
          <div class="rule"></div>
          <h1>Vítor<br>Ferreira</h1>
          <div class="plus">+</div>
          <h1>Catarina<br>Teixeira</h1>
        </section>
        <footer class="mono">Independent wine journal</footer>
      </main>
    `,
    css: `
      .colophon { background: var(--paper); color: var(--black); }
      .colophon .block { position: absolute; right: 0; top: 0; width: 268px; height: 100%; background: var(--terracotta); }
      .colophon header { position: absolute; top: 88px; left: 86px; }
      .colophon section { position: absolute; top: 268px; left: 86px; width: 720px; }
      .colophon .section-label { margin-bottom: 25px; }
      .colophon .rule { width: 720px; }
      .colophon h1 { margin: 54px 0 0; font-size: 105px; font-weight: 690; line-height: .9; letter-spacing: -.065em; }
      .colophon .plus { position: absolute; right: 3px; top: 315px; color: var(--terracotta); font-size: 94px; font-weight: 260; }
      .colophon footer { position: absolute; left: 86px; bottom: 88px; font-size: 17px; }
    `,
  },
  {
    path: "social/instagram/volume-ii/03-contents.png",
    html: `
      <main class="artboard contents">
        <div class="frame"></div>
        <header class="kicker">Contents / Volume II</header>
        <section>
          <div class="entry"><span>01</span><strong>Selections</strong></div>
          <div class="entry"><span>02</span><strong>Portraits</strong></div>
          <div class="entry"><span>03</span><strong>Essays</strong></div>
          <div class="entry"><span>04</span><strong>Addresses</strong></div>
        </section>
        <footer>
          <span class="dot"></span>
          <span class="mono">Volume II starts here.</span>
        </footer>
      </main>
    `,
    css: `
      .contents { background: var(--terracotta); color: var(--black); }
      .contents header { position: absolute; top: 88px; left: 86px; }
      .contents section { position: absolute; left: 86px; right: 86px; top: 286px; }
      .contents .entry { min-height: 175px; border-top: 1px solid rgba(5,5,5,.58); display: grid; grid-template-columns: 86px 1fr; align-items: center; }
      .contents .entry:last-child { border-bottom: 1px solid rgba(5,5,5,.58); }
      .contents .entry span { font: 500 16px/1 "JetBrains Mono"; letter-spacing: .08em; }
      .contents .entry strong { font-size: 76px; line-height: 1; font-weight: 660; letter-spacing: -.055em; }
      .contents footer { position: absolute; left: 86px; bottom: 88px; display: flex; align-items: center; gap: 18px; font-size: 17px; }
      .contents footer .dot { background: var(--paper); }
    `,
  },
  {
    path: "social/instagram/profile/enoversa-profile.png",
    width: 1080,
    height: 1080,
    html: `
      <main class="artboard profile-cover">
        <div class="profile-wordmark">ENOVERSA</div>
      </main>
    `,
    css: `
      .profile-cover { background: var(--black); color: var(--paper); display: grid; place-items: center; }
      .profile-cover::after { opacity: .1; }
      .profile-wordmark { position: relative; z-index: 2; padding-left: .25em; font-size: 103px; font-weight: 700; line-height: 1; letter-spacing: .25em; }
    `,
  },
  {
    path: "social/instagram/marzagana-elementales/01-claudio-portrait-3x4.png",
    html: `
      <main class="artboard photo-crop">
        <img src="${webpDataUrl(claudioPortrait)}" alt="" />
      </main>
    `,
    css: `
      .photo-crop::after { display: none; }
      .photo-crop img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: 53% 50%; }
    `,
  },
  {
    path: "social/instagram/marzagana-elementales/02-wines-2022-3x4.png",
    html: `
      <main class="artboard photo-crop wines-photo">
        <img src="${webpDataUrl(wines2022)}" alt="" />
      </main>
    `,
    css: `
      .photo-crop::after { display: none; }
      .photo-crop img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: 52% 50%; }
    `,
  },
  {
    path: "social/instagram/marzagana-elementales/03-barrels-outside-3x4.png",
    html: `
      <main class="artboard photo-crop barrels-photo">
        <img src="${webpDataUrl(barrelsOutside)}" alt="" />
      </main>
    `,
    css: `
      .photo-crop::after { display: none; }
      .photo-crop img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: 50% 50%; }
    `,
  },
  {
    path: "social/instagram/portraits/marzagana-elementales/01-cover.png",
    html: `
      <main class="artboard portrait-cover">
        <img src="${webpDataUrl(claudioPortrait)}" alt="" />
        <div class="portrait-shade"></div>
        <header class="kicker">Portrait / 001</header>
        <section>
          <h1>Marzagana<br>Elementales</h1>
          <div class="rule"></div>
          <p class="mono">Claudio Miguel Luis Lorenzo<br>La Orotava · August 2024</p>
        </section>
      </main>
    `,
    css: `
      .portrait-cover { color: var(--paper); background: var(--black); }
      .portrait-cover::after { opacity: .06; }
      .portrait-cover > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 53% 50%; }
      .portrait-cover .portrait-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(5,5,5,.55) 0%, transparent 28%, transparent 50%, rgba(5,5,5,.9) 100%); }
      .portrait-cover header { position: absolute; top: 70px; left: 70px; }
      .portrait-cover section { position: absolute; left: 70px; right: 70px; bottom: 70px; }
      .portrait-cover h1 { margin: 0 0 36px; max-width: 900px; font-size: 105px; font-weight: 280; line-height: .91; letter-spacing: -.065em; }
      .portrait-cover .rule { margin-bottom: 25px; }
      .portrait-cover p { margin: 0; font-size: 16px; line-height: 1.7; color: #d0ccc5; }
    `,
  },
  {
    path: "social/instagram/portraits/marzagana-elementales/02-place.png",
    html: `
      <main class="artboard portrait-place">
        <img src="${webpDataUrl(barrelsOutside)}" alt="" />
        <header class="kicker">Marzagana Elementales / La Orotava</header>
        <footer class="mono">Barrels and demijohns outside the house.</footer>
      </main>
    `,
    css: `
      .portrait-place { color: var(--paper); background: var(--black); }
      .portrait-place::after { display: none; }
      .portrait-place > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; }
      .portrait-place::before { content: ""; position: absolute; z-index: 1; inset: 0; background: linear-gradient(180deg, rgba(5,5,5,.5), transparent 24%, transparent 68%, rgba(5,5,5,.75)); }
      .portrait-place header { position: absolute; z-index: 2; top: 70px; left: 70px; right: 70px; }
      .portrait-place footer { position: absolute; z-index: 2; left: 70px; right: 70px; bottom: 70px; font-size: 16px; line-height: 1.5; }
    `,
  },
  {
    path: "social/instagram/portraits/marzagana-elementales/03-quote.png",
    html: `
      <main class="artboard portrait-quote">
        <div class="frame"></div>
        <header class="kicker">Marzagana Elementales / Portrait 001</header>
        <blockquote>“Es complicado<br>emocionar.”</blockquote>
        <footer>
          <span class="accent-line"></span>
          <span class="mono">Claudio Miguel Luis Lorenzo<br>Viñador</span>
        </footer>
      </main>
    `,
    css: `
      .portrait-quote { background: var(--black); color: var(--paper); }
      .portrait-quote header { position: absolute; top: 88px; left: 86px; color: var(--terracotta); }
      .portrait-quote blockquote { position: absolute; left: 86px; right: 60px; top: 390px; margin: 0; font-size: 112px; font-weight: 260; line-height: 1.02; letter-spacing: -.065em; }
      .portrait-quote footer { position: absolute; left: 86px; bottom: 88px; display: flex; gap: 24px; align-items: start; color: var(--muted); font-size: 16px; line-height: 1.7; }
      .portrait-quote .accent-line { width: 56px; height: 2px; margin-top: 11px; background: var(--terracotta); }
    `,
  },
  {
    path: "social/instagram/portraits/marzagana-elementales/04-el-roque.png",
    html: `
      <main class="artboard portrait-wines">
        <div class="photo-panel"><img src="${webpDataUrl(wines2022)}" alt="" /></div>
        <section>
          <span class="kicker">The 2022 wines</span>
          <p>When Claudio poured El Roque, we stopped talking for a moment.</p>
          <footer class="mono">Read the portrait · enoversa.com</footer>
        </section>
      </main>
    `,
    css: `
      .portrait-wines { background: var(--paper); color: var(--black); }
      .portrait-wines::after { opacity: .08; }
      .portrait-wines .photo-panel { position: absolute; top: 0; left: 0; right: 0; height: 760px; overflow: hidden; background: var(--black); }
      .portrait-wines .photo-panel img { width: 100%; height: 100%; object-fit: cover; object-position: 52% 50%; display: block; }
      .portrait-wines section { position: absolute; left: 70px; right: 70px; top: 824px; bottom: 70px; }
      .portrait-wines section > p { margin: 42px 0 0; max-width: 900px; font-size: 53px; font-weight: 300; line-height: 1.18; letter-spacing: -.045em; }
      .portrait-wines footer { position: absolute; left: 0; bottom: 0; font-size: 15px; color: #5c5a55; }
    `,
  },
];

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: 1 });

for (const work of works) {
  const width = work.width ?? 1080;
  const height = work.height ?? 1440;
  const output = resolve(root, work.path);
  await mkdir(resolve(output, ".."), { recursive: true });
  await page.setViewportSize({ width, height });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${sharedCss}${work.css}html,body,.artboard{width:${width}px;height:${height}px}</style></head><body>${work.html}</body></html>`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: output, type: "png" });
  console.log(work.path);
}

await browser.close();
