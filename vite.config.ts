import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Disable type checking
    loader: "tsx",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  build: {
    target: "esnext",
    outDir: "dist", // Ensure this matches your Firebase hosting folder
  }
});
