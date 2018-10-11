function hasClass(obj, cls){
    var obj_class = obj.className;//获取 class 内容.
    var obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
    var x = 0;
    for(x in obj_class_lst) {
        if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
            return true;
        }
    }
    return false
}
//封装布阵方法
(function(){
    function Draw(){
        var gameBox = document.createElement('div'); //新建div标签
        gameBox.className = 'gamebox'; //设置一个gamebox,里面放若干小格子
        gameBox.style.width = mineList[difficulty][0] * 20 + 'px'; //设置div宽高
        gameBox.style.height = mineList[difficulty][1] * 20 + 'px';
        for (let i = 0; i < mineList[difficulty][2]; i++) { //里面放li标签
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
            if (mineArr.indexOf(mine) == -1) { //防止两个雷的位置相同
                mineArr.push(mine);
                list[mine].setAttribute('isMine','yes');
                num--;
            }
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

            
            if (mineArr[i] == 0) { //雷的位置在地图左上角
                Right();
                Bottom();
                rightbottom();
            } else if (mineArr[i] == (mineList[difficulty][0]-1)){ //雷的位置在地图右上角
                Left();
                Bottom();
                leftbottom();
            }else if (mineArr[i] == (mineList[difficulty][2] - mineList[difficulty][0])){ //雷的位置在地图左下角
                Top();
                Right();
                righttop();
            }else if (mineArr[i] == (mineList[difficulty][2] - 1)){ //雷的位置在地图右下角
                Top();
                Left();
                lefttop();
            }else if (mineArr[i] < (mineList[difficulty][0])){ //雷的位置在地图上边
                Left();
                Right();
                Bottom();
                leftbottom();
                rightbottom();
            }else if (mineArr[i] > (mineList[difficulty][2] - mineList[difficulty][0])){ //雷的位置在地图下边
                Left();
                Right();
                Top();
                righttop();
                lefttop();
            }else if (mineArr[i] % mineList[difficulty][0] == 0){ //雷的位置在地图左边
                Top();
                Bottom();
                Right();
                righttop();
                rightbottom();
            }else if (mineArr[i] % mineList[difficulty][0] == mineList[difficulty][0]-1){ //雷的位置在地图右边
                Top();
                Bottom();
                Left();
                lefttop();
                leftbottom();
            }else { //雷的位置在地图中间
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
                list[i].addEventListener('mousedown', function(e){
                    if(e.button == 0 && !hasClass(this,'warning')){ //如果点击的是鼠标左键,并且这个格子没有warning
                        if (this.getAttribute('isMine')) { //如果踩了雷
                            for (let i = 0; i < mineArr.length; i++) {
                                list[mineArr[i]].classList.add('mine')
                            }
                            setTimeout(function(){
                                game.classList.add('hide');
                                result.classList.remove('hide');
                                lose.classList.remove('hide');
                            },500)
                        }else if(this.getAttribute('nearby') != 0){ //如果附近有雷
                            this.innerHTML = this.getAttribute('nearby');
                            this.setAttribute('safety','yes');
                            this.classList.add('safety');
                        }else{ //如果附近没有雷
                            Nomine(i);
                        }
                        if (safety.length == mineList[difficulty][2] - mineList[difficulty][3]) { //判断是否胜利
                            setTimeout(function(){
                                game.classList.add('hide');
                                result.classList.remove('hide');
                                win.classList.remove('hide');
                            },500)
                        }
                    }else if(e.button == 2){ //如果点击的是右键
                        if (!list[i].innerHTML) { //如果这个格子还没确定安全
                            if (this.className != 'warning') { //如果没有插旗
                                this.classList.add('warning')
                            }else{
                                this.classList.remove('warning')
                            }
                        }
                    }
                },false)
        }
    }
    window.Binding = Binding
}())

document.oncontextmenu = function(){ //取消右键默认事件
    return false
}
var main = document.getElementsByClassName('main')[0];
var game = document.getElementsByClassName('game')[0];
var result = document.getElementsByClassName('result')[0];
var win = document.getElementsByClassName('win')[0];
var lose = document.getElementsByClassName('lose')[0];
var replay = document.getElementsByTagName('button')[3];
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
        mainButton[i].addEventListener('click', function(){
            difficulty = i
            main.classList.add('hide');
            game.classList.remove('hide');
            Draw();
            Mine();
            nearbyMine();
            Binding();
        },false)
}
replay.addEventListener('click', function(){
    difficulty = null;
    mineArr = [];
    main.classList.remove('hide');
    result.classList.add('hide');
    win.classList.add('hide');
    lose.classList.add('hide');
    game.innerHTML=''; //清空game
},false)

