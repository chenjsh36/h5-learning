
// 一般使用图像
// var frank = new createjs.Bitmap('img/frank.png');
// stage.addChild(frank);
// frank.x = 100;
// frank.y = 40;
// frank.alpha = .5;
// stage.update();

// 预加载使用图像
var stage, queue;

function init() {
    var canvas = document.getElementById('canvas');
    stage = new createjs.Stage(canvas);
    preload();
}

function preload() {
    queue = new createjs.LoadQueue();
    queue.addEventListener('complete', drawCharacters);
    queue.loadManifest([
        { id: 'frank', src: 'img/frank.png' },
        { id: 'v1', src: 'img/villager1.png' },
        { id: 'v2', src: 'img/villager2.png' }    
    ]);
}

function drawCharacters() {
    var frank = new createjs.Bitmap(queue.getResult('frank'));
    var villager1 = new createjs.Bitmap(queue.getResult('v1'));
    var villager2 = new createjs.Bitmap(queue.getResult('v2'));
    frank.y = villager1.y = villager2.y = 40;
    frank.x = 20;
    villager1.x = 190;
    villager2.x = 360;
    stage.addChild(frank, villager1, villager2);
    // 添加阴影
    villager1.shadow = new createjs.Shadow('#000', 5, 5, 8);
    // 模糊图像
    var w = frank.image.width;
    var h = frank.image.height;
    var blur = new createjs.BoxBlurFilter(5, 5, 1);
    frank.filters = [blur];
    frank.cache(0, 0, w, h);
    var color = new createjs.ColorFilter(1, 0, 0, 1, 0, 0, 0, 0);
    villager2.filters = [color, blur];
    villager2.cache(0, 0, w + 10, h + 10);

    var bmp = new createjs.Bitmap(queue.getResult('frank'));
    var circle = new createjs.Shape(new createjs.Graphics().drawCircle(0, 0, 60));
    bmp.x = 0;
    bmp.y = 200;
    circle.x = 50;
    circle.y = 200 + 75;
    stage.addChild(bmp);
    bmp.mask = circle;

    stage.update();
}