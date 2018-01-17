var col = 30; //地图列数
var row = 20; //地图列数
var boxWidth = 20; //每个格子的宽度
var boxHeidht = 20; //每个格子的长度
var snakeX; //蛇的横坐标
var snakeY; //蛇的纵坐标
var foodX; //食物的横坐标
var foodY; //食物的纵坐标
var direction; //蛇的运动方向
var snake = []; //蛇的数组
var map = []; //地图
var food; //食物
var game = {
    init: function() {
        this.create();
        this.move();
    },
    create: function() { //初始化地图以及蛇和食物的位置
        for (var i = 0; i < col; i++) {
            map[i] = [];
            for (var j = 0; j < row; j++) {
                map[i][j] = 0; //地图数组赋值为0时代表地图
            }
        }
        snakeX = Math.floor(Math.random() * col); //随机生成蛇和食物的坐标
        snakeY = Math.floor(Math.random() * row);
        foodX = Math.floor(Math.random() * col);
        foodY = Math.floor(Math.random() * row);
        map[snakeX][snakeY] = 1; //地图坐标赋值为1时代表蛇
        map[foodX][foodY] = 2; //地图坐标赋值为2时代表食物
        for (var i = 0; i < col; i++) {
            for (var j = 0; j < row; j++) {
                var oDiv = document.createElement("div"); //创建格子
                if (map[i][j] == 1) {
                    snake[0] = j * col + i;
                    oDiv.className = "snake";
                } else if (map[i][j] == 2) {
                    oDiv.className = "food";
                } else if (map[i][j] == 0) {
                    oDiv.className = "box";
                }
                oDiv.id = j * col + i;
                oDiv.style.width = boxWidth + "px"; //赋予格子属性
                oDiv.style.height = boxHeidht + "px";
                oDiv.style.top = (boxHeidht * j) + "px";
                oDiv.style.left = (boxWidth * i) + "px";
                document.getElementById("background").appendChild(oDiv); //添加到页面中
            }
        }
    },
    move: function() { //运动函数
        var start1 = snake[0];
        var start = snake[0];
        switch (direction) {
            case "left":
                start = snake[0] - 1;
                break;
            case "up":
                start = snake[0] - col;
                break;
            case "right":
                start = snake[0] + 1;
                break;
            case "down":
                start = snake[0] + col;
                break;
        }
        if ((direction == "right" && start % col == 0) || (direction == "left" && (start + 1) % col == 0) || (start < 0) || (direction == "down" && start > col * row)) {
            alert("游戏结束");
            return 0; //撞到墙结束游戏
        }
        for (var i = 0; i <= snake.length; i++) {
            if (start != start1 && start == snake[i]) {
                alert("游戏结束"); //吃到自己结束游戏
                return 0;
            }
        }
        snake.unshift(start);
        food = foodY * col + foodX; //食物的位一维坐标
        if (start == food) { //吃到食物重新生成食物
            foodX = Math.floor(Math.random() * col);
            foodY = Math.floor(Math.random() * row);
            for (var i = 1; i <= snake.length; i++) { //判断新生成的食物是否在蛇身上，如果在重新生成
                if (food == snake[i]) {
                    foodX = Math.floor(Math.random() * col);
                    foodY = Math.floor(Math.random() * row);
                }
            }
            document.getElementById(foodY * col + foodX).className = "food";
        } else {
            var last = snake.pop();
            if (last != start) {
                document.getElementById(last).className = "box";
            }
        }
        for (var i = 0; i < snake.length; i++) {
            document.getElementById(snake[i]).className = "snake";
        }
        setTimeout(function() {
            game.move();
        }, 150)
    }
}
window.document.onkeydown = function(e) { //键盘事件
    var event = e || window.event;
    if (direction != "right" && event.keyCode == 37) {
        lastkey = 37;
        direction = "left";
    }
    if (direction != "left" && event.keyCode == 39) {
        lastkey = 39;
        direction = "right";
    }
    if (direction != "up" && event.keyCode == 40) {
        lastkey = 40;
        direction = "down";
    }
    if (direction != "down" && event.keyCode == 38) {
        lastkey = 38;
        direction = "up";
    }
}