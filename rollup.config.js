import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",  // Entry file (it must exist!)
  output: {
    file: "dist/tosa.js",  // Single bundled file
    format: "iife",  // Browser-compatible format
    name: "TosaComponents",  // Global namespace
  },
  plugins: [terser()],  // Minify the output
};
