import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    proxy: {
      "/cdn": {
        target: "https://unpkg.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ""),
      },
    },
  },
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/socket.io": {
//         target: "https://gpt-web-container.vercel.app", // Use your backend URL
//         ws: true, // Make sure this is enabled for WebSockets
//       },
//     },
//   },
// });
