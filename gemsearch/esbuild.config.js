import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';

const watch = process.argv.includes('--watch');

const config = {
  entryPoints: [
    'src/content.js',
    'src/background.js'
  ],
  bundle: true,
  minify: !watch,
  sourcemap: watch ? 'inline' : false,
  target: 'es2020',
  outdir: 'dist',
  format: 'esm',
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: [
        {
          from: ['public/**/*'],
          to: ['dist']
        },
        {
          from: ['src/ui/styles/**/*.css'],
          to: ['dist/styles']
        }
      ]
    })
  ]
};

if (watch) {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(config);
  console.log('Build complete');
}
