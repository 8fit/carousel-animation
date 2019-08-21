import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.ts',
  output: [
    { file: './dist/index.js', format: 'cjs', sourcemap: true },
    { file: './dist/index.module.js', format: 'es', sourcemap: true },
  ],
  plugins: [
    resolve({ extensions }),
    babel({ extensions, include: ['src/**/*'], exclude: 'node_modules/**' }),
    terser({ sourcemap: true }),
  ],
  external: ['react', 'react-native'],
};
