const glob = require('glob');
const path = require('path');


function getEntryPoints(src = 'src') {
    const entries = {}
    glob.sync(`${src}/**/*.ts`).map((filepath) => {
        const name = path.relative(src, filepath).replace(/\.ts$/, '')
        // entries[name] = `./${filepath}`
        entries[name] = `${filepath}`
    })
    return entries
}

module.exports = {
    entry: getEntryPoints(path.resolve(__dirname, 'src'), '.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    mode: 'production',
    devtool: false,
};