var SvgStore = require('webpack-svgstore-plugin');
module.exports = {
    publicPath: './',
    runtimeCompiler: true,
    configureWebpack: {
        plugins: [
            // create svgStore instance object
            new SvgStore({
                // svgo options
                svgoOptions: {
                    plugins: [
                        { removeTitle: true }
                    ]
                },
                prefix: 'icon--'
            })
        ]
    }
}