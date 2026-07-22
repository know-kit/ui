import { defineConfig } from 'tsdown';

// export default defineConfig({
//   entry: ['src/**/*.ts', 'src/**/*.tsx'],
//   unbundle: true,
//   root: 'src',
//   dts: true,
// });
export default defineConfig({
  entry: 'src/index.ts',
  unbundle: true,
  outDir: 'es',
  // root: 'src',
  dts: true,
});
