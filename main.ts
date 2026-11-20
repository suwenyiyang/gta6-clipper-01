import { copyFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const videoDirectory = resolve(process.env.MAKEFUN_BOT_DIR ?? '/bot');
const deliveryDirectory = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

function deliverVideoManifest() {
  mkdirSync(deliveryDirectory, { recursive: true });
  copyFileSync(
    join(videoDirectory, 'VIDEO.json'),
    join(deliveryDirectory, 'VIDEO.json'),
  );
}

try {
  deliverVideoManifest();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Could not deliver VIDEO.json: ${message}`);
  process.exitCode = 1;
}
