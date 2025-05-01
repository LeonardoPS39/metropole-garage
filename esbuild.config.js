const { build } = require('esbuild');
const { resolve } = require('path');

const root = __dirname;

// 1) Server: transpila TS → JS (CommonJS), sem bundle, preserva require
build({
  entryPoints: [
    resolve(root, 'server', 'database.ts'),
    resolve(root, 'server', 'garage.ts'),
  ],
  outdir: resolve(root, 'server'),
  bundle: false,
  platform: 'node',
  format: 'cjs',
  target: ['es2017'],
  sourcemap: false,
  logLevel: 'info',
}).catch(() => process.exit(1));

// 2) Client: bundle TS → JS (IIFE), único arquivo
build({
  entryPoints: [resolve(root, 'client', 'garage.ts')],
  outdir: resolve(root, 'client'),
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2017'],
  sourcemap: false,
  logLevel: 'info',
}).catch(() => process.exit(1));
