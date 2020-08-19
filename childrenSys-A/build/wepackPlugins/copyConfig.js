const fs = require('fs')
const aa =  require('../../src/single-spa-config')
class copyConfig{
    constructor({from,to}){
        this.from = from;
        this.to = to;
    }
    apply(compiler){
        compiler.hooks.emit.tapAsync(
            'copyConfig',
            (compilation, callback) => {
                let context = fs.readFileSync(this.from, 'utf-8');
                
                
                callback();
            }
        );
        
    }
}

module.exports = copyConfig