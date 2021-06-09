
  
/**
 * 
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

