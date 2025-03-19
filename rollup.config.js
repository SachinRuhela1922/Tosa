import { terser } from "rollup-plugin-terser";

export default {
  input: "src/components/navbar/navbar.js",  // Source file
  output: {
    file: "dist/tosa-navbar.js",  // Output file
    format: "iife",  // Immediately Invoked Function Expression
  },
  plugins: [terser()],  // Minify the output
};
