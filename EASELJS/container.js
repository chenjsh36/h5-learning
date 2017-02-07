var stage = new createjs.Stage(document.getElementById('canvas'));

var container  = new createjs.Container();
var pepper = new createjs.Bitmap('img/pepper.png');
var txt = new createjs.Text('Green Pepper', '20px Arial', '#000');
var bg = new createjs.Shape(new createjs.Graphics().beginStroke('#000').drawRect(0, 0, 250, 250));

txt.x = txt.y = 10;
pepper.x = pepper.y = 80;
container.regX = container.regY = 125;
container.x = 300;
container.y = 200;
container.addChild(bg, txt, pepper);

// createjs.Tween.get(container).to({rotation: 360 }, 4000);

container2 = container.clone(true);
container2.x = 430;
container2.y = 200;

stage.addChild(container, container2);

stage.update();

function init() {
    startGame();
}

function startGame() {
    createjs.Ticker.addEventListener('tick', function() {
        stage.update();
    });
    createjs.Ticker.setFPS(60);
}

