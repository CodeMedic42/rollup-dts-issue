const { defineConfig } = require('rollup');
const map = require('lodash/map');
const pluginTs = require('@rollup/plugin-typescript');
const { dts } = require('rollup-plugin-dts');
const packageJson = require('./package.json');

const input = map(packageJson.exports, (exportObj) => {
    return exportObj.import
        .replace('/dist/', '/src/')
        .replace('.mjs', '.ts')
});

const external = id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/');

module.exports = defineConfig([
    {
        input,
        output: [
            {
                dir: 'dist',
                format: 'es',
                entryFileNames: '[name].mjs',
                preserveModules: true,
            },
        ],
        external,
        plugins: [
            pluginTs(),
        ],
    },
    {
        input,
        output: [
            {
                dir: 'dist',
                format: 'es',
                entryFileNames: '[name].d.ts',
                preserveModules: true,
            },
        ],
        external,
        plugins: [dts()],
    },
]);
