import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manrope = await readFile(resolve(root, "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"));
const jetbrains = await readFile(resolve(root, "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2"));
const claudioPortrait = await readFile(resolve(root, "public/images/portraits/marzagana-elementales/claudio-miguel-2400.webp"));
const wines2022 = await readFile(resolve(root, "public/images/portraits/marzagana-elementales/wines-2022-2400.webp"));
const barrelsOutside = await readFile(resolve(root, "public/images/portraits/marzagana-elementales/barrels-outside-2400.webp"));
const frenchDiskoBottle = await readFile(resolve(root, "social/instagram/french-disko/01-bottle-and-glasses-3x4.jpeg"));
const frenchDiskoTable = await readFile(resolve(root, "social/instagram/french-disko/05-wine-and-food-3x4.jpeg"));

const webpDataUrl = (image) => `data:image/webp;base64,${image.toString("base64")}`;
const jpegDataUrl = (image) => `data:image/jpeg;base64,${image.toString("base64")}`;

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
    --carbonic: #6e2c2c;
    --carbonic-ink: #f2e6e6;
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
  {
    path: "social/instagram/selections/french-disko-2023/01-card.png",
    html: `
      <main class="artboard website-selection-card">
        <header>
          <div>
            <span class="kicker">Domaine Matassa</span>
            <h1>French Disko</h1>
          </div>
          <span class="mono tasted-date">Tasted 21 Jul 2026</span>
        </header>
        <section class="website-vibe-card">
          <div class="vibe-tags"><span>Carbonic</span><span>Natural</span></div>
          <p>Redcurrant.<br>Sanguine.<br>Spices.</p>
        </section>
        <footer class="website-data-strip">
          <div><span>Vintage</span><strong>2023</strong></div>
          <div><span>Type</span><strong>Red</strong></div>
          <div><span>Origin</span><strong>France / Roussillon</strong></div>
          <div><span>Grapes</span><strong>Cinsault</strong></div>
        </footer>
      </main>
    `,
    css: `
      .website-selection-card { background: var(--black); color: var(--paper); }
      .website-selection-card::after { opacity: .08; }
      .website-selection-card header { position: absolute; top: 82px; left: 70px; right: 70px; display: flex; justify-content: space-between; align-items: end; }
      .website-selection-card header .kicker { color: var(--terracotta); }
      .website-selection-card h1 { margin: 15px 0 0; font-size: 76px; font-weight: 280; line-height: .96; letter-spacing: -.06em; }
      .tasted-date { padding-bottom: 7px; color: var(--muted); font-size: 14px; }
      .website-vibe-card { position: absolute; top: 278px; left: 70px; right: 70px; height: 870px; overflow: hidden; border-radius: 2px; background: var(--carbonic); color: var(--carbonic-ink); display: flex; align-items: center; justify-content: center; text-align: center; }
      .website-vibe-card p { margin: 0; padding: 80px; font-size: 76px; font-weight: 540; line-height: 1.12; letter-spacing: -.055em; text-transform: uppercase; }
      .vibe-tags { position: absolute; left: 28px; bottom: 28px; display: flex; gap: 11px; }
      .vibe-tags span { padding: 7px 12px 6px; border: 1px solid currentColor; border-radius: 999px; opacity: .64; font: 500 13px/1 "JetBrains Mono"; text-transform: uppercase; letter-spacing: .1em; }
      .website-data-strip { position: absolute; left: 70px; right: 70px; bottom: 72px; padding-top: 26px; border-top: 1px solid var(--line); display: grid; grid-template-columns: .7fr .7fr 1.6fr 1fr; gap: 22px; }
      .website-data-strip div { min-width: 0; }
      .website-data-strip span, .website-data-strip strong { display: block; font: 500 12px/1.35 "JetBrains Mono"; text-transform: uppercase; letter-spacing: .1em; }
      .website-data-strip span { margin-bottom: 9px; color: #777; }
      .website-data-strip strong { color: var(--paper); font-weight: 450; }
    `,
  },
  {
    path: "social/instagram/selections/french-disko-2023/02-bottle-and-glasses.png",
    html: `
      <main class="artboard selection-photo">
        <img src="${jpegDataUrl(frenchDiskoBottle)}" alt="" />
      </main>
    `,
    css: `
      .selection-photo::after { display: none; }
      .selection-photo img { width: 100%; height: 100%; display: block; object-fit: cover; }
    `,
  },
  {
    path: "social/instagram/selections/french-disko-2023/03-wine-and-food.png",
    html: `
      <main class="artboard selection-photo">
        <img src="${jpegDataUrl(frenchDiskoTable)}" alt="" />
      </main>
    `,
    css: `
      .selection-photo::after { display: none; }
      .selection-photo img { width: 100%; height: 100%; display: block; object-fit: cover; }
    `,
  },
  {
    path: "social/instagram/selections/french-disko-2023/04-score.png",
    html: `
      <main class="artboard website-selection-index">
        <header>
          <div>
            <span class="kicker">Domaine Matassa</span>
            <h1>French Disko</h1>
          </div>
          <span class="mono index-vintage">2023</span>
        </header>
        <section class="website-index-panel">
          <div class="panel-heading"><span class="kicker">The Tasting Index</span><span class="mono">How we taste →</span></div>
          <div class="website-metrics">
            <div class="website-metric"><span>Energy</span><div><i></i><i></i></div></div>
            <div class="website-metric"><span>Drinkability</span><div><i></i><i></i></div></div>
            <div class="website-metric"><span>Balance</span><div><i></i><i></i></div></div>
            <div class="website-metric"><span>Complexity</span><div><i></i><i class="off"></i></div></div>
            <div class="website-metric"><span>Emotion</span><div><i></i><i class="off"></i></div></div>
          </div>
          <div class="website-total"><span class="mono">Total</span><strong>8<small>/10</small></strong></div>
          <div class="website-service">
            <span class="mono">Glass <b>Spiegelau Definition Bordeaux</b></span>
            <span class="mono">Decant <b>15 minutes</b></span>
            <span class="mono">Temperature <b>13 °C</b></span>
          </div>
        </section>
        <footer class="mono">Full note · enoversa.com</footer>
      </main>
    `,
    css: `
      .website-selection-index { background: var(--black); color: var(--paper); }
      .website-selection-index::after { opacity: .08; }
      .website-selection-index > header { position: absolute; top: 82px; left: 70px; right: 70px; display: flex; justify-content: space-between; align-items: end; }
      .website-selection-index > header .kicker { color: var(--terracotta); }
      .website-selection-index h1 { margin: 15px 0 0; font-size: 76px; font-weight: 280; line-height: .96; letter-spacing: -.06em; }
      .index-vintage { padding-bottom: 7px; color: var(--muted); font-size: 14px; }
      .website-index-panel { position: absolute; top: 280px; left: 70px; right: 70px; padding: 42px 48px 40px; border: 1px solid var(--line); border-radius: 2px; background: rgba(18,18,18,.72); }
      .panel-heading { padding-bottom: 28px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; color: var(--muted); }
      .panel-heading .mono { color: var(--terracotta); font-size: 12px; }
      .website-metrics { padding: 17px 0; }
      .website-metric { min-height: 112px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(34,34,34,.75); }
      .website-metric > span { font-size: 25px; font-weight: 300; }
      .website-metric > div { display: flex; gap: 11px; }
      .website-metric i { display: block; width: 92px; height: 16px; background: var(--paper); }
      .website-metric i.off { background: #303030; }
      .website-total { padding: 34px 0 28px; display: flex; justify-content: space-between; align-items: end; border-bottom: 1px solid var(--line); }
      .website-total > span { padding-bottom: 6px; color: var(--muted); font-size: 13px; }
      .website-total strong { font-size: 77px; font-weight: 280; line-height: .8; letter-spacing: -.06em; }
      .website-total small { margin-left: 7px; color: #777; font: 500 17px/1 "JetBrains Mono"; letter-spacing: 0; }
      .website-service { padding-top: 28px; display: grid; grid-template-columns: 1.5fr .8fr .6fr; gap: 20px; color: #777; font-size: 10px; line-height: 1.55; }
      .website-service b { display: block; margin-top: 5px; color: var(--paper); font-weight: 450; }
      .website-selection-index footer { position: absolute; left: 70px; bottom: 72px; color: var(--muted); font-size: 14px; }
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
