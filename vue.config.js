var SvgStore = require('webpack-svgstore-plugin');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/tiptap_editor/' : '/',
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