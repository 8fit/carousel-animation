import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.ts',
  output: [
    { file: './dist/index.js', format: 'cjs' },
    { file: './dist/index.module.js', format: 'es' },
  ],
  plugins: [
    resolve({ extensions }),
    babel({ extensions, include: ['src/**/*'], exclude: 'node_modules/**' }),
  ],
  external: ['react', 'react-native'],
};
