// 获取 canvas context
var getContext = function(id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    return {
    canvas: canvas,
    ctx: ctx
  };
}
// 矩形
var drawRect = function(ctx, ltx, lty, width, height, type) {
    type = !type ? 'fillRect' : type;// strokeRect;
  ctx[type](ltx, lty, width, height);
    return ctx;
}

// 线条
var drawLine = function(ctx, x1, y1, x2, y2, lineWidth) {
    ctx.lineWidth = lineWidth ? lineWidth : 1;
    ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
  ctx.lineWidth = 1;
    return ctx;
}
// 圆形
var drawCircle = function(ctx, x, y, radius, startAngle, endAngle, clock) {
    clock = clock ? clock : false; // false 顺时针
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle, clock);
  ctx.closePath();
  ctx.fill();
    return ctx;
}

// 文本
var drawText = function(ctx, text, x, y) {
    ctx.font = 'italic 30px serif';
  ctx.fillText(text, x, y);
  return ctx;
}

// 擦除
var clearRect = function(ctx, x, y, width, height) {
    ctx.clearRect(x, y, width, height);
  return ctx;
}

var c = getContext('canvas');
var canvas = c.canvas;
var ctx = c.ctx;

var cW = $(canvas).width();
var cH = $(canvas).height();

var isAnimate = false;
var x = 0;

var Shape = function(x, y, width, height, radius, angle) {
    this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.radius = radius;
  this.angle = angle;
}

var Shapes = [];
Shapes.push(new Shape(0, 10, 15, 10, Math.random() * 30, 0));
Shapes.push(new Shape(19, 20, 10, 20, Math.random() * 30, 0));
Shapes.push(new Shape(1, 30, 17, 17, Math.random() * 30, 0));
Shapes.push(new Shape(3, 40, 12, 12, Math.random() * 30, 0));

animate = function() {
    console.log('a');
  clearRect(ctx, 0, 0, cW, cH);
    for (var i = 0, len = Shapes.length; i < len; i++) {
    var tmp = Shapes[i];
    var x = tmp.x + (tmp.radius * Math.cos(tmp.angle * (Math.PI / 180)));
    var y = tmp.y + (tmp.radius * Math.sin(tmp.angle * (Math.PI / 180)));
    tmp.angle += 5;
    if (tmp.angle > 360) {
        tmp.angle = 0;
    }
    drawRect(ctx, x, y, tmp.width, tmp.height);
  }

  if (isAnimate === true) {
        setTimeout(animate, 33);  
  }
};
animate();

var $start = $('#start');
var $stop = $('#stop');



$start.on('click', function() {
  $(this).hide();
  $stop.show();
  
  isAnimate = true;
  animate();
})

$stop.on('click', function() {
  $(this).hide();
  $start.show();
  
  isAnimate = false;
})


