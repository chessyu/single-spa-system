
  
/**
 * 动态计算 table 表格的高度
 * @param {*} newVal  watch newValu 
 * @param {*} id  元素id
 * @param {*} obj  vue 当前实例
 */
  export function fixedTableHeader(newVal,id,obj){
    try{
      let perNodeH = document.getElementById(id).parentNode.previousElementSibling.offsetHeight;  //查询条件块的高度
      let parentNodeH = document.getElementById(id).parentNode.parentNode.offsetHeight;                  //视图容器的高度
      if(obj){
        let {width,height} = newVal;
        obj.tableHeight = height - 250 - perNodeH ;
      }else{
          return   parentNodeH - perNodeH - 105;
      }
    }catch(err){}
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

