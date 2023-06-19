const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const string = require("rollup-plugin-string").string;
module.exports = {
    input: "src/main.js",
    output: {
        dir: "output",
        format: "iife",
        sourcemap: "inline",
    },
    plugins: [
        string({
            include: "**/*.txt",
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
    ]
};