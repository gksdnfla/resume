'use strict';
var pageCount = 0;
var pageMax = 4;
var playCheck = true;
var oPageBtn = document.getElementById('pageBtn');
//年龄计算
(function(){
  var oDate = new Date();
  document.getElementById('birthday').innerHTML = oDate.getFullYear()-1994 + '岁';
})();
//判断动画结束
window.setTimeout(moveEnd,1000);
//创建li按钮
for(var i=0;i<pageMax;i++){
  var oLi = document.createElement('li');
  oLi.innerHTML = '<span></span>';
  oPageBtn.appendChild(oLi);
  if(i == 0) oLi.children[0].className = 'active';
}
oPageBtn.style.marginTop = -oPageBtn.offsetHeight/2+'px';
//pageBtn点击事件
for(var i=0;i<pageMax;i++){
  (function(index){
    oPageBtn.children[i].children[0].onclick = function(){
      if(playCheck) return false;
      playCheck = true;
      for(var i=0;i<Math.abs(index-pageCount);i++){
        window.setTimeout(function(){
          if(index-pageCount>0){
            scrollDown();
          }
          else{
            scrollUp();
          }
        },i*100);
      }
      window.setTimeout(moveEnd,(Math.abs(index-pageCount)-1)*100+1000);
    }
  })(i);
}
//滚轮事件
scrollEvent(scrollUp,scrollDown);


function scrollEvent(fnUp,fnDown){
  if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
    document.addEventListener('DOMMouseScroll',scroll,false);
  }
  else{
    document.onmousewheel=scroll;
  }
  function scroll(ev){
    var oEvent=ev||window.event;
    var bDown=true;
    if(oEvent.wheelDelta){
      if(oEvent.wheelDelta<0){
        bDown=true;
      }
      else{
        bDown=false;
      }
    }
    else{
      if(oEvent.detail<0){
        bDown=false;
      }
      else{
        bDown=true;
      }
    }
    if(bDown){
      if(playCheck) return false;
      playCheck = true;
      fnDown && fnDown();
      window.setTimeout(moveEnd,1000);
    }
    else{
    if(playCheck) return false;
    playCheck = true;
      fnUp && fnUp();
      window.setTimeout(moveEnd,1000);
    }
    oEvent.preventDefault&&oEvent.preventDefault();
    return false;
  }
}
function scrollUp(){
  pageCount--;
  pageCount<0 ? pageCount=0:pageCount=pageCount;
  if(pageCount >= 0){
    move(pageCount+1,pageCount);
  }
}
function scrollDown(){
  pageCount++;
  pageCount>=pageMax ? pageCount=pageMax-1:pageCount=pageCount;
  if(pageCount < pageMax){
    move(pageCount-1,pageCount);
  }
}
function rnd(min,max){
  return parseInt(Math.random()*(max-min))+min;
}
function move(min,max){
  if(max-min>0){
    var oPrev = document.getElementById('page'+(pageCount-1));
    var oNext = document.getElementById('page'+pageCount);
    oPrev.style.transform = 'scale(0.7)';
    oNext.children[0].style.transform = 'translateX(0)';
    oNext.children[1].style.transform = 'translateX(0)';
  }
  else{
    var oPrev = document.getElementById('page'+pageCount);
    var oNext = document.getElementById('page'+(pageCount+1));
    oPrev.style.transform = 'scale(1)';
    oNext.children[0].style.transform = 'translateX(-100%)';
    oNext.children[1].style.transform = 'translateX(100%)';
  }
  addShadow(pageCount);
  addClassActive(oPageBtn.children,pageCount);
}
function moveEnd(){
  playCheck = false;
  addShadow(pageCount);
}
function addShadow(pageCount){
  var aPage = document.getElementById('page'+pageCount).children;
  for(var i=pageCount;i<pageMax;i++){
    document.getElementById('page'+i).children[0].className = 'left';
    document.getElementById('page'+i).children[1].className = 'right';
  }
  if(pageCount%2){
    aPage[0].className = "left shadowL";
  }
  else{
    aPage[1].className = "right shadowR";
  }
}
function addClassActive(aLi,index){
  for(var i=0;i<pageMax;i++){
    aLi[i].children[0].className = '';
  }
  aLi[index].children[0].className = 'active';
}