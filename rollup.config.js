import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: ['src/init.js', 'src/init-home.js'],
  output: [
    // ES module version, for modern browsers
    {
      dir: "static",
      format: "es",
      sourcemap: true
    },
    // SystemJS version, for older browsers
    {
      dir: "static/nomodule",
      format: "system",
      sourcemap: true
    },
  ],
  plugins: [
    resolve(), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    terser(), // minification :TODO: enable when ready to publish
  ]
}
