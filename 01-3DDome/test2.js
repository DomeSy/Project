// var arr=[1,3,5,7,9,11,13,11,9,7,5,3,1];
var s = '妙味课堂是北京最资深的前端开发培训机构，妙味课堂拥有系统的JavaScript、HTML5、CSS3、移动开发、远程培训等课程，并录制成最系统的前端开发视频教程，妙味课堂推出的VIP前端学习平台已经成为学习氛围最浓郁的前端学习圈。在未来几年内，妙味课堂会逐渐发展成由上百位优秀讲师所带领的创业培训团队，这些优秀讲师将是每个培训区域的独立负责人，他们是妙味课堂未来发展道路中最强大的力量。我们希望自己亦或是将来加入妙味的朋友一起，永远秉持以下思维方式：追求卓越但不崇拜权威，反叛创新绝不敷衍妥协；专注严谨摒弃死板生硬，细致耐心我们年复一年。';

var oSence=document.getElementById('sence');
var oBox=oSence.getElementsByClassName('box')[0];
var oUl=oBox.getElementsByTagName('ul')[0];
var aLi=oUl.getElementsByTagName('li');

// 通过传字来改变
var num=0;
var layer=0;
var wordNum=-1;

var circleArr=[];

var theta=0;
var phi=0;
var r=150;

iRange(4,13);

storageArr(circleArr);


creatLi(circleArr,drawCricle);

// 改变位置
// 弧度用rad,角度用deg
for(var i=0;i<aLi.length;i++){
    aLi[i].style.transform='translate3D('+aLi[i].circleX+'px,'+aLi[i].circleY+'px,'+aLi[i].circleZ+'px) rotateY('+
                            aLi[i].circlePhi+'rad) rotateX('+aLi[i].circleTheta+'rad)';
}

// 旋转
iRotate();

// 生成圆
function drawCricle(obj,theta,phi,i,j){
    theta=Math.PI/(circleArr.length-1);

    obj.circleX = r*Math.sin(theta*i)*Math.sin(phi*j)+200;
    // 原本是从下往上，改变y，让从上往下
    obj.circleY = -r*Math.cos(theta*i)+200;
    obj.circleZ = r*Math.sin(theta*i)*Math.cos(phi*j);
    obj.circleTheta= theta*(circleArr.length-i) - Math.PI/2;
    obj.circlePhi=phi*j;
}

// 存储数组
function storageArr(Arr){
    for(var i=0;i<layer;i++){
        if(i<(layer+1)/2){
            wordNum+=2;
        }else{
            wordNum-=2;
        }
        Arr.push(wordNum);
    }    
}

// 范围
function iRange(min,max){
    for(var i=min;i<max;i++){
        num = i*i+(i+1)*(i+1);
        if( num >= s.length){

            layer=(i-1)*2+1;
            break;
        }
        layer = (i-1)*2+1;
    }
}

// 创建li
function creatLi(Arr,draw){
    num=0;
    for(var i=0;i<Arr.length;i++){
        phi=2*Math.PI/Arr[i];
        for(var j=0;j<Arr[i];j++){
            var li=document.createElement('li');

            li.innerHTML=s[num];
            num++;
        
            draw(li,theta,phi,i,j);

            oUl.appendChild(li);
        }
    }

}

// 旋转
function iRotate(){
    var angleX=0;
    this.setInterval(function(){
        angleX++;
        oBox.style.transform='rotateX('+angleX+'deg) rotateY('+angleX+'deg)'
    },60);
}


// iNumber(aLi);
// function iNumber(obj){
//     for(var i=0;i<obj.length;i++){
//         aLi[i].style.transform='translate3D('+obj[i].circleX+'px,'+obj[i].circleY+'px,'+obj[i].circleZ+'px) rotateY('+
//                                 obj[i].circlePhi+'rad) rotateX('+obj[i].circleTheta+'rad)';
//     }
// }