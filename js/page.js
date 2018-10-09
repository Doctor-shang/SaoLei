//封装布阵方法
(function(){
    function Draw(){
        var gameBox = document.createElement('div');
        gameBox.className = 'gamebox'; //设置一个gamebox,里面放若干小格子
        gameBox.style.width = mineList[difficulty][0] * 20 + 'px';
        gameBox.style.height = mineList[difficulty][1] * 20 + 'px';
        for (let i = 0; i < mineList[difficulty][2]; i++) {
            var list = document.createElement('li');
            gameBox.appendChild(list)
        }
        game.appendChild(gameBox)
    }
    window.Draw = Draw
}());
//布雷
(function(){
    function Mine(){
        var num = mineList[difficulty][3];
        for (; num; ) { //随机出固定个数的雷
            var mine = parseInt(Math.random()*mineList[difficulty][2])
            if (mineArr.indexOf(mine) == -1) {
                mineArr.push(mine);
                num--
            }
        }
        for (let i = 0; i < mineArr.length; i++) { //把随机的雷安放在地图里
            list[mineArr[i]].setAttribute('isMine','yes');
            // list[mineArr[i]].classList.add('mine');
        }
    }
    window.Mine = Mine
}());
//计算附近雷数
(function(){
    function nearbyMine(){
        for (let i = 0; i < list.length; i++) { //给每个格子都设置附近雷数为0
            list[i].setAttribute('nearby',0);
        }
        for (let i = 0; i < mineArr.length; i++) { //根据雷的位置给周围格子设置nearby+1
            function Top(){
                list[mineArr[i] - mineList[difficulty][0]].setAttribute('nearby',(parseInt(list[mineArr[i] - mineList[difficulty][0]].getAttribute('nearby')) + 1))
            }
            function Bottom(){
                list[mineArr[i] + mineList[difficulty][0]].setAttribute('nearby',(parseInt(list[mineArr[i] + mineList[difficulty][0]].getAttribute('nearby')) + 1))
            }
            function Left(){
                list[mineArr[i] - 1].setAttribute('nearby',(parseInt(list[mineArr[i] - 1].getAttribute('nearby')) + 1))
            }
            function Right(){
                list[mineArr[i] + 1].setAttribute('nearby',(parseInt(list[mineArr[i] + 1].getAttribute('nearby')) + 1))
            }
            function lefttop(){
                list[mineArr[i] - mineList[difficulty][0] - 1].setAttribute('nearby',(parseInt(list[mineArr[i] - mineList[difficulty][0] - 1].getAttribute('nearby')) + 1))
            }
            function righttop(){
                list[mineArr[i] - mineList[difficulty][0] + 1].setAttribute('nearby',(parseInt(list[mineArr[i] - mineList[difficulty][0] + 1].getAttribute('nearby')) + 1))
            }
            function leftbottom(){
                list[mineArr[i] + mineList[difficulty][0] - 1].setAttribute('nearby',(parseInt(list[mineArr[i] + mineList[difficulty][0] - 1].getAttribute('nearby')) + 1))
            }
            function rightbottom(){
                list[mineArr[i] + mineList[difficulty][0] + 1].setAttribute('nearby',(parseInt(list[mineArr[i] + mineList[difficulty][0] + 1].getAttribute('nearby')) + 1))
            }

            
            if (mineArr[i] == 0) { //左上角
                Right();
                Bottom();
                rightbottom();
            } else if (mineArr[i] == (mineList[difficulty][0]-1)){ //右上角
                Left();
                Bottom();
                leftbottom();
            }else if (mineArr[i] == (mineList[difficulty][2] - mineList[difficulty][0])){ //左下角
                Top();
                Right();
                righttop();
            }else if (mineArr[i] == (mineList[difficulty][2] - 1)){ //右下角
                Top();
                Left();
                lefttop();
            }else if (mineArr[i] < (mineList[difficulty][0])){ //上边
                Left();
                Right();
                Bottom();
                leftbottom();
                rightbottom();
            }else if (mineArr[i] > (mineList[difficulty][2] - mineList[difficulty][0])){ //下边
                Left();
                Right();
                Top();
                righttop();
                lefttop();
            }else if (mineArr[i] % mineList[difficulty][0] == 0){ //左边
                Top();
                Bottom();
                Right();
                righttop();
                rightbottom();
            }else if (mineArr[i] % mineList[difficulty][0] == mineList[difficulty][0]-1){ //右边
                Top();
                Bottom();
                Left();
                lefttop();
                leftbottom();
            }else { //中间
                Top();
                Bottom();
                Left();
                lefttop();
                leftbottom();
                Right();
                rightbottom();
                righttop();
            }
        }
    }
    window.nearbyMine = nearbyMine
}());
//点击nearby==0
(function(){
    function Nomine(j){
        list[j].innerHTML = list[j].getAttribute('nearby'); //自己显示数字
        list[j].classList.add('safety')
        
        function right(){ //右
            list[j + 1].innerHTML = list[j + 1].getAttribute('nearby'); //右边
            list[j + 1].classList.add('safety');
            if(list[j + 1].getAttribute('nearby') == 0){
                Nomine(j + 1) 
            }
        }
        function left(){ //左
            list[j - 1].innerHTML = list[j - 1].getAttribute('nearby');
            list[j - 1].classList.add('safety');
            if(list[j - 1].getAttribute('nearby') == 0){
                Nomine(j - 1)
            }
        }
        function bottom(){ //下
            list[j + mineList[difficulty][0]].innerHTML = list[j + mineList[difficulty][0]].getAttribute('nearby'); 
            list[j + mineList[difficulty][0]].classList.add('safety');
            if(list[j + mineList[difficulty][0]].getAttribute('nearby') == 0){
                Nomine(j + mineList[difficulty][0])
            }
        }
        function top(){ //上
            list[j - mineList[difficulty][0]].innerHTML = list[j - mineList[difficulty][0]].getAttribute('nearby'); 
            list[j - mineList[difficulty][0]].classList.add('safety');
            if(list[j - mineList[difficulty][0]].getAttribute('nearby') == 0){
                Nomine(j - mineList[difficulty][0])
            }
        }
        function rightbottom(){ //右下
            list[j + mineList[difficulty][0] + 1].innerHTML = list[j + mineList[difficulty][0] + 1].getAttribute('nearby'); 
            list[j + mineList[difficulty][0] + 1].classList.add('safety');
        }
        function righttop(){ //右上
            list[j - mineList[difficulty][0] + 1].innerHTML = list[j - mineList[difficulty][0] + 1].getAttribute('nearby'); 
            list[j - mineList[difficulty][0] + 1].classList.add('safety');
        }
        function leftbottom(){ //左下
            list[j + mineList[difficulty][0] - 1].innerHTML = list[j + mineList[difficulty][0] - 1].getAttribute('nearby'); 
            list[j + mineList[difficulty][0] - 1].classList.add('safety');
        }
        function lefttop(){ //左上
            list[j - mineList[difficulty][0] - 1].innerHTML = list[j - mineList[difficulty][0] - 1].getAttribute('nearby'); 
            list[j - mineList[difficulty][0] - 1].classList.add('safety');
        }

        if (list[j].getAttribute('nearby') == 0 && !list[j].getAttribute('safety')) {
            list[j].setAttribute('safety','yes');
            if (j == 0) { //左上角
                right();
                rightbottom();
                bottom();
            } else if(j == mineList[difficulty][0] - 1){ //右上角
                bottom();
                leftbottom();
                left();                
            } else if(j == mineList[difficulty][2] - 1){ //右下角
                left();
                lefttop();
                top();
            } else if(j == mineList[difficulty][2] - mineList[difficulty][0]){ //左下角
                top();
                righttop();
                right()
            } else if(j < mineList[difficulty][0]){ //上边
                right();
                rightbottom();
                bottom();
                leftbottom();
                left();
            } else if(j > (mineList[difficulty][2] - mineList[difficulty][0])){ //下边
                left();
                lefttop();
                top();
                righttop();
                right();
            } else if(j % mineList[difficulty][0] == 0){ //左边
                top();
                righttop();
                right();
                rightbottom();
                bottom();
            } else if(j % mineList[difficulty][0] == (mineList[difficulty][0] - 1)){ //右边
                bottom();
                leftbottom();
                left();
                lefttop();
                top();
            } else{
                top();
                righttop();
                right();
                rightbottom();
                bottom();
                leftbottom();
                left();
                lefttop();
            }
        }
    }
    window.Nomine = Nomine
}());
//绑定点击事件
(function(){
    function Binding(){
        for (let i = 0; i < list.length; i++) {
            (function(){
                list[i].addEventListener('click', function(){
                    if (this.getAttribute('isMine')) {
                        for (let i = 0; i < mineArr.length; i++) {
                            list[mineArr[i]].classList.add('mine')
                        }
                        setTimeout(function(){
                            alert('BOOM!!')
                        },1000)
                    }else if(this.getAttribute('nearby') != 0){
                        this.innerHTML = this.getAttribute('nearby');
                        this.setAttribute('safety','yes');
                        this.classList.add('safety');
                    }else{
                        Nomine(i);
                    }
                    if (safety.length == mineList[difficulty][2] - mineList[difficulty][3]) {
                        setTimeout(function(){
                            alert('YOU ARE WIN!!')
                        },500)
                    }
                    
                },false)
            }());
            (function(){
                list[i].addEventListener('mousedown', function(e){
                    if (e.button == 2) {
                        if (this.className != 'warning') {
                            this.classList.add('warning')
                        }else{
                            this.classList.remove('warning')
                        }
                        
                    }
                },false)
            }())
        }
    }
    window.Binding = Binding
}())

document.oncontextmenu = function(){
    return false
}
var main = document.getElementsByClassName('main')[0];
var game = document.getElementsByClassName('game')[0];
var result = document.getElementsByClassName('result')[0];
var gameBox = document.getElementsByClassName('gameBox')[0];
var list = document.getElementsByTagName('li')
var safety = document.getElementsByClassName('safety')
var difficulty = null;
var mineList = [
    [9 , 9,  81,  15], 
    [15, 15, 225, 30], 
    [25, 20, 500, 40]
]
var mineArr = [];


var mainButton = document.getElementsByClassName('mainButton')
for (let i = 0; i < mainButton.length; i++) {
    (function(){
        mainButton[i].addEventListener('click', function(){
            difficulty = i
            main.classList.add('hide');
            game.classList.remove('hide');
            Draw();
            Mine();
            nearbyMine();
            Binding();
        },false)    
    }())
}


