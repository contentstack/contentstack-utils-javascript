const resolve = require('@rollup/plugin-node-resolve').default;
const typescript = require('rollup-plugin-typescript2');
const json = require('@rollup/plugin-json').default;

const pkg = require('./package.json');
module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
          },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        // Node.js built-ins
        'fs',
        'path',
        // Exclude regions.json from bundling - it's loaded at runtime
        /regions\.json$/,
    ],
    plugins: [
        // Allow json resolution
        json(),

        typescript({
            useTsconfigDeclarationDir: true,
            objectHashIgnoreUnknownHack: false      
        }),

        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),
    ],
};
        