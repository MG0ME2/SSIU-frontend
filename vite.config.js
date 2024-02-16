import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// para mejorar las importaciones
//import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

 /*  // para hacer las importaciones mas faciles de leer
  resolve: {
    alias: {
      //    '@components': path.resolve(__dirname, 'src/components'),
      "@images": path.resolve("src/Components/Img"),
    },
  }, */
});
