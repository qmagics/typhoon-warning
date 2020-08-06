module.exports = {
    // 部署根路径
    publicPath: '/BigScreen/',

    // 输出文件目录
    outputDir: '../COSCO.Management/BigScreen',

    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '舟山中远海运重工',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },

        page2: 'src/pages/page2/main.js'
    },

    //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    // runtimeCompiler:true,

    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:19123',
                ws: true,
                changeOrigin: true
            }
        }
    }
}