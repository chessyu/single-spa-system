

/**
 * 扁平化数据构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function formatTree(data, id, parentId, children, rootId) {
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId = rootId || 0
	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData =  cloneData.filter(father => {
	  let branchArr = cloneData.filter(child => {
		//返回每一项的子级数组
		return father[id] === child[parentId]
	  });
	  branchArr.length > 0 ? father.children = branchArr : '';
	  //返回第一层
	  return father[parentId] === rootId;
	});
	return treeData != '' ? treeData : data;
}

/**
 * 根据子节点，查找所有父节点
 * @param {*} data 数据源
 * @param {*} childrenId 子节点的id值
 * @param {*} name  返回参数 默认返回 'id'
 * @param {*} diffId  需要对比的id值
 */

export function childrenFindFatherTree(data,childrenId,name,diffId) {
	name = name || 'id';
	diffId = diffId || 'id'
	for (var i in data) {
		if (data[i][diffId] == childrenId) {
			return [data[i][name]];
		}
		if (data[i].children) {
			var ro = childrenFindFatherTree(data[i].children, childrenId,name,diffId);
			if (ro !== undefined) {
				return ro.concat(data[i][name]);
			}
		}
	}
}

/**
 * 遍历树，并根据id 勾选
 * @param {*} data   树的数据
 * @param {*} nodeids  选中节点Id 数据组
 * @param {*} id  比对参数属性
 */
export function selectNode(data,nodeids,id){
	if(nodeids.length < 1){
		return data;
	}
	for(var i in data){
		for(let j=0; j < nodeids.length; j++){
			if(data[i][id] == nodeids[j]){
				if(data[i].children == undefined || data[i].children == null || data[i].children.length == 0) data[i].checked = true;
				nodeids.splice(j,1);
			}
			if(data[i].children.length > 0){
				selectNode(data[i].children,nodeids,id)
			}
		}
	}
	return data;
}

/**
 *  根据id,找出当前一条数据 并返回
 * @param {Array | Object} data 遍历树
 * @param {Number} nodeids 节点Id   
 * @param {String} id 判断字段 
 */
export function selectNodeList(data,nodeids,id){
	for(var i in data){
		if(data[i][id] == nodeids){
			return data[i]
		}
		if(data[i].children){
			let arr =  selectNodeList(data[i].children,nodeids,id)
			if(arr !== undefined){
				return arr;
			}
		}
	}
}







