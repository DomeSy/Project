var ems = document.querySelectorAll('.skill_list em');
var spans = document.querySelectorAll('.skill_list li>span');
var arr = [];
Array.from(spans).map(obj=>{
  arr.push(obj.innerHTML);
});
for(var i=0;i<ems.length;i++){
  ems[i].style.width = arr[i];
}

// 点击列表的展开收缩
var h2s=document.querySelectorAll('.case_list h2');
var casespan=document.querySelectorAll('.case_list h2 span');

for(var i=0;i<h2s.length;i++){
  // 默认一个是展开,并且通过布尔值来判断是否有ul和li展开与搜索
  h2s[i].onoff=false;

  // 存取下标
  h2s[i].index=i;
  
  h2s[0].onoff=true;
  h2s[i].onclick=function(){
    // nextElementSibling:下一层级的节点
    // console.log(this.nextElementSibling);
    if(this.nextElementSibling){
      if(this.onoff){
        this.nextElementSibling.style.display='none';
        casespan[this.index].className='';
      }else{
        this.nextElementSibling.style.display='block';
        casespan[this.index].className='active';
      }
      // 通过取反来控制是否点开
      this.onoff=!this.onoff;
    }
  }
}

// 点击li显示对应的内容
var lis=document.querySelectorAll('.case_content li');
var contents=document.querySelectorAll('.list_content li');
var listContent=document.querySelector('.list_content');
var icon=document.querySelector('.list_content .icon');

icon.onclick=function(){
  listContent.style.transition='transform .5s';
  listContent.style.transform='translateX(100vw)';
}
for(var i=0;i<lis.length;i++){
  lis[i].index=i;
  lis[i].onclick=function(){
    for(var j=0;j<lis.length;j++){
      lis[j].className='';
      contents[j].style.display='none';
    }
    this.className='checked';
    contents[this.index].style.display='block';
    if(getSize()=='xs'){
      listContent.style.transition='transform .5s';
      listContent.style.transform='translateX(0)';
    }
  }
}

// 滑屏固定的时候没有滚动条
(function(){
  var firstPoint=0;
  var nowPoint=0;
  var dex=0;
  var beforelength=0;
  var vr=0;
  // touchstart:手指按下
  listContent.addEventListener('touchstart',function(e){
    firstPoint = e.changedTouches[0].clientY;
  });
  // touchmove：手指移动
  listContent.addEventListener('touchmove',function(e){
    // 平板横竖屏切换问题
    if(getSize() == 'lg'){
      return ;
    }

    // 阻止默认事件
    e.preventDefault();
    nowPoint=e.changedTouches[0].clientY;
    dex=nowPoint-firstPoint;

    // 对上下边距进行限制
    vr=beforelength+dex;

    if(vr>0){
      vr=0;
    }
    if(vr<window.innerHeight-listContent.offsetHeight){
      vr=window.innerHeight-listContent.offsetHeight;
    }

    listContent.style.top=vr+'px';
  });
  listContent.addEventListener('touchend',function(){
    beforelength=vr;
  })
})()


// 尺寸改变
window.onresize=function(){
  if(getSize()== 'lg'){
    listContent.style.transform='translateX(0)';
  }
}

// 当前屏幕尺寸来判断，划分屏幕
// 小于960和大于960
function getSize(){
  var deviceWidth=window.innerHeight ||document.documentElement.clientWidth;
  if(deviceWidth<960){
    return 'xs';
  }else{
    return 'lg';
  }
}

// 返回顶部
var backtop=document.querySelector('.backtop');
backtop.onclick=function(){
  window.scrollTo(0,0);
}
window.onscroll=function(){
  backtop.style.display=window.pageYOffset>150?"block":"none";
}