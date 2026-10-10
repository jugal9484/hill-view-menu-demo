import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Inline the (small) app stylesheet into index.html so first paint doesn't wait on a CSS request. */
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html'];
      if (!html || html.type !== 'asset') return;
      let source = String(html.source);
      for (const [name, chunk] of Object.entries(bundle)) {
        if (!name.endsWith('.css') || chunk.type !== 'asset') continue;
        const tag = new RegExp(`<link rel="stylesheet"[^>]*href="/${name}"[^>]*>`);
        if (!tag.test(source)) continue;
        source = source.replace(tag, () => `<style>${chunk.source}</style>`);
        delete bundle[name];
      }
      html.source = source;
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), inlineCss()],
  build: {
    target: 'es2020',
    emptyOutDir: !isSsrBuild,
    rollupOptions: isSsrBuild
      ? {}
      : { output: { manualChunks: { react: ['react', 'react-dom'], motion: ['framer-motion'] } } },
  },
}));
