
import './theme/default.less'
import './theme/lnkBlack.less'
import './theme/pureWhite.less'
import './theme/yellOra.less'

let theme = localStorage.getItem('theme');
if(!theme){
    localStorage.setItem('theme','default');
    document.body.classList.add('default');
}else{
    document.body.classList.add(theme);
}
