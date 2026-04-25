import createExternalOptionFunction from '@niche-works/dev/createExternalOptionFunction';
import createSassClassNameFunction from '@niche-works/dev/createSassClassNameFunction';
import distPackage from '@niche-works/rollup-plugin-dist-package';
import { defineConfig } from 'tsdown';
import classNames from './src/css/classNames';

export default defineConfig({
  entry: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.d.{ts,tsx}',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  unbundle: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  minify: false,
  css: {
    inject: true,
    preprocessorOptions: {
      scss: {
        functions: {
          'cls($classNameKey)': createSassClassNameFunction(classNames),
        },
      },
    },
  },
  inputOptions: {
    external: createExternalOptionFunction(),
  },
  outputOptions: {
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    distPackage({
      content: {
        main: './index.cjs',
        module: './index.mjs',
        sideEffects: ['**/*.css'],
        exports: {
          '.': {
            import: './index.mjs',
            require: './index.cjs',
          },
          './*': {
            import: './*/index.mjs',
            require: './*/index.cjs',
          },
          './constants': {
            import: './constants.mjs',
            require: './constants.cjs',
          },
          './*/constants': {
            import: './*/constants.mjs',
            require: './*/constants.cjs',
          },
          './types': {
            import: './types.mjs',
            require: './types.cjs',
          },
          './*/types': {
            import: './*/types.mjs',
            require: './*/types.cjs',
          },
        },
      },
    }),
  ],
});
