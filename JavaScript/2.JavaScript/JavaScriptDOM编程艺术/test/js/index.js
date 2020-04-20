var countBodyChildren = function(){
    let body = document.getElementsByTagName("body")[0];
    let bodyChildrenList = body.childNodes;
    console.log(bodyChildrenList);
    console.log(bodyChildrenList.length);
    // body子元素节点附近的空格也是body的子节点（文本节点）
    // 例如：如果a标签和ul标签之间有空格或换行，则这两者之间还有一个文本节点，内容为空格或换行（可以包含多个空格或换行）。反之，则没有。

    bodyChildrenList.forEach(function(val){
        console.log(val.nodeType);
        // nodeType属性有12种取值。其中有3种具有实用价值。
        // 元素节点的nodeType属性值为 1 
        // 属性节点的nodeType属性值为 2
        // 文本节点的nodeType属性值为 3
    })


    // nodeValue
    // todo:是否只有文本元素的nodeValue不为null？
    console.log(bodyChildrenList[0].nodeValue);
}


window.onload = function (){
    countBodyChildren();
}