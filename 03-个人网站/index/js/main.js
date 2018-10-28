var domesy={};

domesy.timeScroll=null;

domesy.currentStep = "step1";

domesy.init=function(){

  domesy.resize();

  domesy.events();

  domesy.configIntAnimate();

  domesy.configTimeScroll();

  domesy.button3D(".start",".state1",".state2",0.3);
  domesy.button3D(".button1",".state1",".state2",0.3);


  twoAnimation.init();
  threeAnimation.init();
  fourAnimation.init();
  fiveAnimation.init();

  margic();
}

$(document).ready(domesy.init);


domesy.events=function(){
  $(window).resize(domesy.resize());

  $(window).bind("scroll",scrollFn);

  domesy.nav();

  function scrollFn(){
    $(window).scrollTop(0);
  }
  $(window).bind("scroll",domesy.scrollStatus);

  $(window).bind("mousedown",function(){
    $(window).unbind("scroll",scrollFn);
  });

  $(window).bind("mouseup",domesy.mouseupFn);

	$("#index").bind("mousewheel",function(ev){
		ev.preventDefault();
  });
  
  $("#index").one("mousewheel",mousewheelFn);

  var timer=null;

  function mousewheelFn(ev,direction){

    $(window).unbind("scroll",scrollFn);
    
    if(direction<1){
      domesy.changeStep("next");
    }else{
      domesy.changeStep("prev");
    }

    clearTimeout(timer);
    timer=setTimeout(function(){
      $("#index").one("mousewheel",mousewheelFn);
    },1200);
  }
  $(window).resize(domesy.resize);
}

domesy.configIntAnimate=function(){
  var initAnimate=new TimelineMax();

  initAnimate.to(".menu",0.5,{opacity:1});
  initAnimate.to(".menu",0.5,{left:50});
  initAnimate.to(".nav-title span",0.5,{opacity:1});
  initAnimate.to(".content",0.5,{opacity:1});
  initAnimate.to(".nav-img",0.5,{opacity:1});

  initAnimate.to(".light_left",0.7,{rotationZ:0,ease:Cubic.easeOut},0);
  initAnimate.to(".light_right",0.7,{rotationZ:0,ease:Cubic.easeOut},0);
  initAnimate.to(".wel1",2,{opacity:1,rotationX:0,ease:Elastic.easeOut},"-=0.7");
  initAnimate.to(".wel2",2,{opacity:1,rotationX:0,ease:Elastic.easeOut},"-=1.5");
  initAnimate.to(".wel3",2,{opacity:1,rotationX:0,ease:Elastic.easeOut},"-=1.5");
  initAnimate.to(".controls",0.5,{bottom:20,opacity:1},"-=1.4");
  
  initAnimate.to("body,html",0,{"height":6000},"-=0.8");
}

domesy.nav=function(){
  var navAnimate=new TimelineMax();
  $(".content a").bind("mouseenter",function(){
    var w=$(this).width();
    var l=$(this).offset().left-30;
    navAnimate.clear();
    navAnimate.to(".line",0.4,{opacity:1,left:l,width:w});
  });
  $(".content a").bind("mouseleave",function(){
    navAnimate.clear();    
    navAnimate.to(".line",0.4,{opacity:0});
  });

} 

domesy.resize=function(){
  
  $(".page").height($(window).height());

  $(".page:not(':first')").css("top",$(window).height());

  domesy.configTimeScroll();
}

domesy.mouseupFn=function(){
  var scale=domesy.scale();
  var times=scale*domesy.timeScroll.totalDuration();

  var prevStep=domesy.timeScroll.getLabelBefore(times);
  var nextStep=domesy.timeScroll.getLabelAfter(times);

  var prevTime=domesy.timeScroll.getLabelTime(prevStep);
  var nextTime=domesy.timeScroll.getLabelTime(nextStep);

  var prevDvalue=Math.abs(prevTime-times);
  var nextDvalue=Math.abs(nextTime-times);


  var step="";
  if(scale===0){
    step="step1";
  }else if(scale === 1){
    step="step5";
  }else if(prevDvalue<nextDvalue){
    step=prevStep;
  }else{
    step=nextStep;
  }

  domesy.timeScroll.tweenTo(step);

  var totalTime=domesy.timeScroll.totalDuration();

  var afterTime=domesy.timeScroll.getLabelTime(step);
  
  var maxH=$("body").height()-$(window).height();

  var positionY=afterTime/totalTime*maxH;

  var d=Math.abs(domesy.timeScroll.time()-afterTime);

  var scrollAnimate=new TimelineMax();

  scrollAnimate.to("html,body",d,{scrollTop:positionY});

  domesy.currentStep=step;
}

domesy.scale=function(){
  var scrollT=$(window).scrollTop();
  var MaxH=$("body").height()-$(window).height();
  var s=scrollT/MaxH;
  return s;
}

domesy.scrollStatus=function(){
  var times=domesy.scale()*domesy.timeScroll.totalDuration();
  
  domesy.timeScroll.seek(times,false);
}

domesy.configTimeScroll=function(){

  var time=domesy.timeScroll?domesy.timeScroll.time():0;

  if(domesy.timeScroll) domesy.timeScroll.clear();

  domesy.timeScroll=new TimelineMax();

  domesy.timeScroll.add("step1");
  domesy.timeScroll.to("#page2",0.8,{top:0,ease:Cubic.easeInOut,onReverseComplete:function(){
    twoAnimation.timeline.seek(0,false);
  }});
  domesy.timeScroll.to({},0.1,{onComplete:function(){
    twoAnimation.timeline.tweenTo("twoState");
  }},"-=0.2");

  domesy.timeScroll.to({},0.1,{onComplete:function(){
    menu.changeMenu("menu_state2");
  },onReverseComplete:function(){
    menu.changeMenu("menu_state1");
  }},"-=0.2");

  domesy.timeScroll.add("step2");
  domesy.timeScroll.to("#page3",0.8,{top:0,ease:Cubic.easeInOut,onReverseComplete:function(){
    threeAnimation.timeline.seek(0,false);
  }});

  domesy.timeScroll.to({},0.1,{onComplete:function(){
    menu.changeMenu("menu_state3");
  },onReverseComplete:function(){
    menu.changeMenu("menu_state2");
  }},"-=0.2");

  domesy.timeScroll.to({},0,{onComplete:function(){
    threeAnimation.timeline.tweenTo("threeStart1");
  }},"-=0.2");

  domesy.timeScroll.add("step3");

  domesy.timeScroll.to({},0,{onComplete:function(){
    threeAnimation.timeline.tweenTo("threeStart2");
  },onReverseComplete:function(){
    threeAnimation.timeline.tweenTo("threeStart1");
  }});
  domesy.timeScroll.to({},0.4,{});
  domesy.timeScroll.add("point1");

  domesy.timeScroll.to({},0,{onComplete:function(){
    threeAnimation.timeline.tweenTo("threeStart3");
  },onReverseComplete:function(){
    threeAnimation.timeline.tweenTo("threeStart2");
  }});
  domesy.timeScroll.to({},0.4,{});
  domesy.timeScroll.add("point2");

  domesy.timeScroll.to({},0,{onComplete:function(){
    threeAnimation.timeline.tweenTo("threeStart4");
  },onReverseComplete:function(){
    threeAnimation.timeline.tweenTo("threeStart3");
  }});
  domesy.timeScroll.to({},0.4,{});
  domesy.timeScroll.add("point3");
  domesy.timeScroll.to("#page4",0.8,{top:0,ease:Cubic.easeInOut,onReverseComplete:function(){
    fourAnimation.timeline.seek(0,false);
  }});

  domesy.timeScroll.to({},0.1,{onComplete:function(){
    fourAnimation.timeline.tweenTo("fourState");
  }},"-=0.2");

  domesy.timeScroll.to({},0.1,{onComplete:function(){
    menu.changeMenu("menu_state4");
  },onReverseComplete:function(){
    menu.changeMenu("menu_state3");
  }},"-=0.2");

  domesy.timeScroll.add("step4");
  domesy.timeScroll.to("#page5",0.8,{top:0,ease:Cubic.easeInOut,onReverseComplete:function(){
    fiveAnimation.timeline.seek(0,false);
  }});

  domesy.timeScroll.to({},0.1,{onComplete:function(){
    fiveAnimation.timeline.tweenTo("fiveState");
  }},"-=0.2");

  domesy.timeScroll.to({},0.1,{onComplete:function(){
    menu.changeMenu("menu_state5");
  },onReverseComplete:function(){
    menu.changeMenu("menu_state4");
  }},"-=0.2");

  domesy.timeScroll.add("step5");

  domesy.timeScroll.stop();

  domesy.timeScroll.seek(time);
}

var twoAnimation={};
twoAnimation.timeline=new TimelineMax();
twoAnimation.init=function(){
  twoAnimation.timeline.to("#page2 .d-title",0,{marginLeft:-600,opacity:0.5});
  twoAnimation.timeline.to("#page2 .table",0,{opacity:0});
 
  twoAnimation.timeline.to("#page2 .d-title",1,{marginLeft:20,opacity:1,ease:Cubic.easeInOut});
  twoAnimation.timeline.to("#page2 .table",1,{opacity:1,ease:Cubic.easeOut},"-=0.5");

  twoAnimation.timeline.add("twoState");
  twoAnimation.timeline.stop();
} 

var threeAnimation={};
threeAnimation.timeline=new TimelineMax();
threeAnimation.init=function(){
  threeAnimation.timeline.to(".scene3_1 img",1.5,{opacity:1,rotationX:0,ease:Elastic.easeOut},0);
  threeAnimation.timeline.staggerTo(".scene3_1 .step1 p",0.8,{opacity:0.7,rotationX:0,ease:Elastic.easeOut},0.8,"-=1");

  threeAnimation.timeline.to(".points",0.2,{bottom:20},"-=0.6");
  threeAnimation.timeline.to("#page3 .point0 .text",0.1,{opacity:1});
  threeAnimation.timeline.to("#page3 .point0 .point_icon",0,{"background_position":"right top"});

  threeAnimation.timeline.add("threeStart1");

  threeAnimation.timeline.to(".scene3_1 img",0.4,{opacity:0,rotationX:90});
  threeAnimation.timeline.staggerTo(".scene3_1 .step1 p",0.4,{opacity:0,rotationX:0,});

  threeAnimation.timeline.to(".scene3_2 .left",0.4,{opacity:1});
  threeAnimation.timeline.staggerTo(".scene3_2 .right",0.3,{opacity:1,rotationX:0,ease:Cubic.easeInOut},0,"-=0.4");

  threeAnimation.timeline.to(".point .text",0,{opacity:0},"-=0.4");
  threeAnimation.timeline.to(".point1 .text",0.1,{opacity:1});
  threeAnimation.timeline.to("#page3 .point .point_icon",0,{"background-position":"left top"},"-=0.4");
	threeAnimation.timeline.to("#page3 .point1 .point_icon",0,{"background-position":"right top"},"-=0.4");


  threeAnimation.timeline.add("threeStart2");

  threeAnimation.timeline.to(".scene3_2 .left",0.4,{opacity:0});
  threeAnimation.timeline.staggerTo(".scene3_2 .right",0.3,{opacity:0,rotationX:-90,ease:Cubic.easeInOut},0,"-=0.4");
  threeAnimation.timeline.staggerTo(".scene3_3 .right",0.3,{opacity:1,rotationX:0,ease:Cubic.easeInOut},0,"-=0.4");

  threeAnimation.timeline.to(".scene3_3 .left",0.4,{opacity:1});

  threeAnimation.timeline.to("#page3 .point .text",0,{opacity:0},"-=0.4");
  threeAnimation.timeline.to("#page3 .point2 .text",0.1,{opacity:1});
  threeAnimation.timeline.to("#page3 .point .point_icon",0,{"background-position":"left top"},"-=0.4");
	threeAnimation.timeline.to("#page3 .point2 .point_icon",0,{"background-position":"right top"},"-=0.4");

  threeAnimation.timeline.add("threeStart3");

  threeAnimation.timeline.to(".scene3_3 .left",0.4,{opacity:0});
  threeAnimation.timeline.to(".scene3_4 .left",0.4,{opacity:1});
  threeAnimation.timeline.staggerTo(".scene3_3 .right",0.3,{opacity:0,rotationX:-90,ease:Cubic.easeInOut},0,"-=0.4");
  threeAnimation.timeline.staggerTo(".scene3_4 .right",0.3,{opacity:1,rotationX:0,ease:Cubic.easeInOut},0,"-=0.4");


  threeAnimation.timeline.to("#page3 .point .text",0,{opacity:0},"-=0.4");
  threeAnimation.timeline.to("#page3 .point3 .text",0.1,{opacity:1});
  threeAnimation.timeline.to("#page3 .point .point_icon",0,{"background-position":"left top"},"-=0.4");
	threeAnimation.timeline.to("#page3 .point3 .point_icon",0,{"background-position":"right top"},"-=0.4");
  
  threeAnimation.timeline.add("threeStart4");

  threeAnimation.timeline.stop();
}

var fourAnimation={};
fourAnimation.timeline=new TimelineMax();
fourAnimation.init=function(){
  fourAnimation.timeline.to("#page4 .demo-title",0,{left:-650,opacity:0.5});
  fourAnimation.timeline.staggerTo('#page4 .margic',0,{opacity:0,rotationX:-90});

  fourAnimation.timeline.to("#page4 .demo-title",0.7,{left:0,opacity:1,ease:Cubic.easeInOut});
  fourAnimation.timeline.staggerTo('#page4 .margic',0.7,{opacity:1,rotationX:0,ease:Cubic.easeOut},0.2);

  fourAnimation.timeline.add("fourState");
  fourAnimation.timeline.stop();
}

var fiveAnimation={};
fiveAnimation.timeline=new TimelineMax();
fiveAnimation.init=function(){
  fiveAnimation.timeline.to("#page5 .conTict",0,{marginLeft:-1200,opacity:0.5});
  fiveAnimation.timeline.to("#page5 .information h4,#page5 .information p",0,{marginLeft:-600,opacity:0.5});
  fiveAnimation.timeline.staggerTo("#page5 .infor span",0,{marginLeft:-800,opacity:0.5});
  fiveAnimation.timeline.staggerTo("#page5 .lookinfo",0,{opacity:0});
  fiveAnimation.timeline.staggerTo("#page5 .button1",0,{rotationX:-90,transformPerspective:600,transformOrigin:"center center"});

  fiveAnimation.timeline.to("#page5 .conTict",0.7,{marginLeft:20,opacity:1,ease:Cubic.easeInOut});
  fiveAnimation.timeline.to("#page5 .information h4,#page5 .information p",0.7,{marginLeft:48,opacity:1,ease:Cubic.easeInOut},"-=0.5");
  fiveAnimation.timeline.staggerTo("#page5 .infor span",0.7,{marginLeft:48,opacity:1,ease:Cubic.easeOut},0.5);
  fiveAnimation.timeline.to("#page5 .lookinfo",0.5,{opacity:1,ease:Cubic.easeInOut},"-=0.3");
  fiveAnimation.timeline.staggerTo("#page5 .button1",1.2,{rotationX:0,ease:Elastic.easeOut},1,"-=3.5");


  fiveAnimation.timeline.add("fiveState");
  fiveAnimation.timeline.stop();
}



domesy.changeStep=function(value){
  if(value==="next"){

    var currentTime=domesy.timeScroll.getLabelTime(domesy.currentStep);

    var afterStep=domesy.timeScroll.getLabelAfter(currentTime);

    if(!afterStep) return;

    var totalTime=domesy.timeScroll.totalDuration();
    var afterTime=domesy.timeScroll.getLabelTime(afterStep);
    var maxH=$("body").height()-$(window).height();

    var positionY=afterTime/totalTime * maxH;
    var d=Math.abs(domesy.timeScroll.time()-afterTime);

    var scrollAnimate=new TimelineMax();

    scrollAnimate.to("html,body",d,{scrollTop:positionY});

    domesy.currentStep=afterStep;
  }else{

    var currentTime=domesy.timeScroll.getLabelTime(domesy.currentStep);

    var beforeStep=domesy.timeScroll.getLabelBefore(currentTime);

    if(!beforeStep) return;

    var totalTime=domesy.timeScroll.totalDuration();
    var BeforeTime=domesy.timeScroll.getLabelTime(beforeStep);
    var maxH=$("body").height()-$(window).height();


    var positionY=BeforeTime/totalTime * maxH;

    var d=Math.abs(domesy.timeScroll.time()-BeforeTime);

    var scrollAnimate=new TimelineMax();

    scrollAnimate.to("html,body",d,{scrollTop:positionY});


    domesy.currentStep=beforeStep;
  }
}

domesy.button3D=function(obj,element1,element2,d){
  
  var button3DAnimate = new TimelineMax();

	button3DAnimate.to( $(obj).find(element1),0,{rotationX:0,transformPerspective:600,transformOrigin:"center bottom"} );
	button3DAnimate.to( $(obj).find(element2),0,{rotationX:-90,transformPerspective:600,transformOrigin:"top center"} );

	$(obj).bind("mouseenter",function(){
		var enterAnimate = new TimelineMax();

		var ele1 = $(this).find(element1);
		var ele2 = $(this).find(element2);

		enterAnimate.to(ele1,d,{rotationX:90,top:-ele1.height(),ease:Cubic.easeInOut},0);
		enterAnimate.to(ele2,d,{rotationX:0,top:0,ease:Cubic.easeInOut},0);
	});

	$(obj).bind("mouseleave",function(){
		var leaveAinimate = new TimelineMax();

		var ele1 = $(this).find(element1);
		var ele2 = $(this).find(element2);

    leaveAinimate.to(ele1,d,{rotationX:0,top:0,ease:Cubic.easeInOut},0);
		leaveAinimate.to(ele2,d,{rotationX:-90,top:ele2.height(),ease:Cubic.easeInOut},0);
	});
}


var menu={};

menu.changeMenu=function(stateClass){

  var oldMenu=$(".menu");
  var newMenu=oldMenu.clone();

  newMenu.removeClass("menu_state1").removeClass("menu_state2").removeClass("menu_state3").removeClass("menu_state4").removeClass("menu_state5");
  newMenu.addClass(stateClass);

  $("#menu_wrapper").append(newMenu);

  oldMenu.addClass("removeClass");

  domesy.nav();
  domesy.button3D(".start",".state1",".state2",0.3);

  var menuAnimate=new TimelineMax();

  menuAnimate.to(newMenu,0,{top:100,rotationX:-90,transformPerspective:800,transformOrigin:"top,bottom"});
  menuAnimate.to(oldMenu,0,{rotationX:0,top:20,transformPerspective:800,transformOrigin:"bottom"});

  menuAnimate.to(oldMenu,0,{rotationX:90,top:-55,ease:Cubic.easeInOut,onComplete:function(){
    $(".removeClass").remove();
  }});
  menuAnimate.to(newMenu,0.3,{rotationX:0,top:20,ease:Cubic.easeInOut},"-=0.3");
}


function margic(){
  var y=-60;
  var x=45;
  $("#page4 .box").bind("mousedown",function(ev){
    $("#page4 .squre").addClass("into");
    disX=ev.clientX-y;
    disY=ev.clientY-x;
    $("#page4 .into").bind("mousemove",function(ev){
      x=ev.clientY-disY;
      y=ev.clientX-disX;
      $("#page4 .box").css("transform",'perspective(800px) rotateX('+x+'deg) rotateY('+y+'deg)');
    });
    $("#page4 .into").bind("mouseup",function(){
      $("#page4 .into").unbind("mousemove");
      $("#page4 .squre").removeClass("into");
    });
    return false;
  });
}