'use strict';
var pageCount = 0;
var pageMax = document.querySelectorAll('div.page').length;
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
	oPageBtn.appendChild(oLi);
	if(i == 0) oLi.className='active';
}
oPageBtn.style.marginTop = -oPageBtn.offsetHeight/2+'px';
//pageBtn点击事件
for(var i=0;i<pageMax;i++){
	(function(index){
		oPageBtn.children[i].onclick = function(){
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

//我的技能动画
function pageTwoAni(){
	var json = {
		html : 0.95,
		css :0.95,
		js : 0.80,
		angular : 0.50,
		react : 0.50,
		vue : 0.30,
		JQuery : 0.70,
		zepto : 0.70,
		sea : 0.90,
		artTemplate : 0.90,
		less : 0.90
	}
	var aLabel = document.getElementById('skill').getElementsByTagName('span');

	for(var i=0;i<aLabel.length;i++){
		aLabel[i].style.transition = '1s '+100*i+'ms';
		aLabel[i].style.color = 'rgba(255,255,255,1)';
		aLabel[i].style.background = 'rgba(55,221,196,'+json[aLabel[i].className]+')';
	}
}
//我的经历动画
function pageThreeAni(){
	var aHistory = document.getElementById('history').getElementsByTagName('p');
	for(var i=0;i<aHistory.length;i++){
		aHistory[i].style.transition = '0.8s cubic-bezier(0.01, 0.89, 0.59, 1.41) '+300*i+'ms';
		aHistory[i].style.transform = 'scaleX(1)';
	}
}
function scrollEvent(fnUp,fnDown){
	if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		document.addEventListener('DOMMouseScroll',scroll,false);
	}
	else{
		document.onmousewheel=scroll;
	}
	function scroll(ev){
		var oEvent = ev||window.event;
		var bDown = true;
		var timer = null;
		if(playCheck) return false;
		playCheck = true;
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
			fnDown && fnDown();
		}
		else{
			fnUp && fnUp();
		}
		window.clearTimeout(timer);
		timer = window.setTimeout(moveEnd,1000);
		oEvent.preventDefault && oEvent.preventDefault();
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
	switch(pageCount){
		case 1:
			pageTwoAni();
			break;
		case 2:
			pageThreeAni();
			break;
	}
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
		aLi[i].className = '';
	}
	aLi[index].className = 'active';
}