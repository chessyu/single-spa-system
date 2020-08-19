const systemJs = require('../../public/system')
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin')

class rewriteEntryFile{
    constructor(){
    }
    apply(compiler){
        compiler.hooks.compilation.tap(
            'rewriteEntryFile',
            (compilation) => {
                // Static Plugin interface |compilation |HOOK NAME | register listener 
                HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                    'rewriteEntryFile', // <-- Set a meaningful name here for stacktraces
                    (data, cb) => {
                        data.html = data.html.replace(/<!--injectjs-->/g,`<script type="systemjs-importmap">${JSON.stringify(systemJs)}</script>`)
                        cb(null, data)
                    }
                )
            }
        );
        
    }
}

module.exports = rewriteEntryFile