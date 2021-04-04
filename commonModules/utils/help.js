
  
/**
 * 动态计算 table 表格的高度
 * @param {*} newVal  watch newValu 
 * @param {*} id  元素id
 * @param {*} obj  vue 当前实例
 */
  export function fixedTableHeader(newVal,_this){
    var boxHeight = _this.$refs.sys__table.offsetHeight;
    var sumHeight = 5;
    for(var i =0; i<_this.$refs.sys__table.childElementCount; i++){
      var classList = Array.from(_this.$refs.sys__table.children[i].classList);
      if(!classList.includes('table-container')){
        sumHeight += _this.$refs.sys__table.children[i].offsetHeight;
        var margin = document.defaultView.getComputedStyle(_this.$refs.sys__table.children[i]).margin.split(' ');
        if(margin.length == 1 || margin.length == 2){
          sumHeight += ~~(margin[0].split('px')[0]) * 2;
        }else if(margin.length ==3){
          sumHeight += Number(margin[0].split('px')[0]) + Number(margin[2].split('px')[0])
        }
      }
    }
    return boxHeight - sumHeight ;
  }

  /**
   * 判断当前用户是否有按钮权限，返回有权限按钮的数量
   * @param {String} id domId
   */
  export function removeTableColumns(id){
    let dom = document.getElementById(id);
    let length=0;
    dom.firstChild.children.forEach(e => {
      if(e.getAttribute("type") === 'button'){
        length++;
      } 
    })
    return length;
  }

