//整体思路 其实就是当我们点击右键的时候 会有默认的事件
//1.正常情况我们 我们点击鼠标右键 会弹出浏览器默认的右键菜单
// 所以我们首先要组织默认行为
//2. 然后创建我们的自己的元素 其实很简单 就是 div 和 li
// 然后 让我们创建的div 定位到我们鼠标的位置 通过事件对象我们可以拿到 鼠标的坐标
//3. 然后点击空白出的时候 我们需要销毁我们的自己创建的元素 让菜单消失




//1. 首先我们要监听鼠标的右键 这里我们需要给body去监听 然后 要组织它的默认行为
// 为了组织浏览器右键自己的菜单出现
document.body.oncontextmenu = function (ev) {
    // 组织浏览器右键自己弹出来菜单
    ev.preventDefault()
    //2. 先看看能不能获取到这个菜单元素
    let contextmenu = document.querySelector('#contextmenu')
    //3.如果获取不到 我们就自己创建一个菜单
    if(!contextmenu){
        //创建元素
        contextmenu = document.createElement('div')
        //赋值id
        contextmenu.id = 'contextmenu'
        const html = `<ul>
                <li>菜单一</li>
                <li>菜单二</li>
                <li>菜单三</li>
            </ul>`
        contextmenu.innerHTML = html
        //插入到body中
        document.body.appendChild(contextmenu)
    }
    //获取鼠标的 x y 轴地址
    const x = ev.clientX
    const y = ev.clientY
    //把菜单的位置 改变
    contextmenu.style.top = y+ 10 + 'px'
    contextmenu.style.left = x + 10 +'px'
}
//4. 点击空白的时候 要移除我们上面创建的元素 这里需要注意
// 首先 我们点空白处 要移除我们创建的元素 
// 其次 我们如果点击到 我们的菜单了 是不能移除了
// 这里点击的时候 我们能拿到它点击的事件源头 比如 你是点击的是也看上的哪个元素
window.onclick = function(ev){
    //5.比如此时你点击的是 body 那么就是body 如果是li 那么就是li
   let target = ev.target
   //拿到具体的事件源的标签
   let targetTag = target.tagName
   //6. 如果你点击的是li 那么我们肯定不能移除元素
   if(targetTag === 'LI'){
       //我们就让我们的点击事件源向上找一层 是ul
       target = targetTag.parentNode
       targetTag = target.tagName
   }
   //7. 然后我们继续向上找 直到你不我们的创建的元素位置
   if(targetTag === 'UL' && target.parentNode.id === 'contextmenu'){
        return
   }
   //8.否则 让右侧菜单消失 
   let contextmenu = document.querySelector('#contextmenu')
   if(contextmenu){
       document.body.removeChild(contextmenu)
   }
}
