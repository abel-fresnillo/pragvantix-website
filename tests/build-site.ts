import { execFileSync } from 'node:child_process';

// Seam 1 checks run against the real build output, so build once for the whole run.
export default function buildSite() {
  execFileSync('npx', ['astro', 'build'], { stdio: 'inherit' });
}
