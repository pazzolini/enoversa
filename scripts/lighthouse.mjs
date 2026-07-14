import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';

const previewPort = 4326;
const chromePort = 9225;
const baseUrl = `http://127.0.0.1:${previewPort}`;
const routes = [
  '/',
  '/selections',
  '/addresses',
  '/portraits/claudio-miguel-marzagana-elementales',
];
const minimumScores = {
  performance: 0.8,
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.9,
};

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const profileDirectory = await mkdtemp(join(tmpdir(), 'enoversa-lighthouse-'));
const preview = spawn(
  npmCommand,
  ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(previewPort)],
  { stdio: 'inherit' },
);
const chrome = spawn(
  chromium.executablePath(),
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${chromePort}`,
    `--user-data-dir=${profileDirectory}`,
  ],
  { stdio: 'ignore' },
);

async function waitFor(url, timeout = 30_000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The local process is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function stopProcess(child) {
  if (child.exitCode !== null || child.signalCode !== null) return;

  await new Promise((resolve) => {
    const forceKillTimer = setTimeout(() => {
      child.kill('SIGKILL');
    }, 5_000);

    child.once('exit', () => {
      clearTimeout(forceKillTimer);
      resolve();
    });

    if (!child.kill('SIGTERM')) {
      clearTimeout(forceKillTimer);
      resolve();
    }
  });
}

let failed = false;

try {
  await Promise.all([
    waitFor(baseUrl),
    waitFor(`http://127.0.0.1:${chromePort}/json/version`),
  ]);

  for (const route of routes) {
    const result = await lighthouse(`${baseUrl}${route}`, {
      port: chromePort,
      logLevel: 'error',
      output: 'json',
      onlyCategories: Object.keys(minimumScores),
    });

    if (!result) throw new Error(`Lighthouse returned no result for ${route}`);

    const scores = Object.fromEntries(
      Object.entries(minimumScores).map(([category, minimum]) => {
        const score = result.lhr.categories[category].score ?? 0;
        if (score < minimum) failed = true;
        return [category, `${Math.round(score * 100)} (minimum ${Math.round(minimum * 100)})`];
      }),
    );

    console.log(`\n${route}`);
    console.table(scores);
  }
} finally {
  await Promise.all([stopProcess(preview), stopProcess(chrome)]);
  await rm(profileDirectory, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 200,
  });
}

if (failed) {
  console.error('\nOne or more Lighthouse scores are below the configured minimum.');
  process.exitCode = 1;
}
