(function() {
/*
cloud, sky, sky
left_ground, ground, right_ground
right_earth, earth, right_earth
*/
var
tiles = [
  "cloud", "sky", "sky",
  "left_ground", "ground", "right_ground",
  "left_earth", "earth", "right_earth",
  "left_ground_earth", undefined, "right_ground_earth"
],
map = [
"sky", "cloud", "sky", "cloud", "sky", "cloud", "cloud","sky", "cloud", "sky", "cloud", "sky", "cloud", "cloud","cloud",
"sky", "cloud", "cloud", "sky", "sky", "sky", "sky","sky", "cloud", "sky", "cloud", "sky", "cloud", "sky", "sky",
"cloud", "sky", "cloud", "sky", "cloud", "sky", "sky","cloud", "sky", "cloud", "sky", "cloud", "sky", "sky","sky",
"sky", "sky", "left_ground", "ground", "ground", "ground", "right_ground", "sky", "sky", "sky", "cloud", "sky", "cloud", "sky", "sky",
"sky", "left_ground", "left_ground_earth", "right_earth", "sky", "sky", "sky","sky", "left_ground", "ground", "ground", "ground", "right_ground", "sky", "sky",
"left_ground", "left_ground_earth", "earth", "right_ground_earth", "right_ground", "left_ground", "ground", "ground","left_ground_earth", "earth", "earth", "earth", "right_ground_earth", "right_ground", "sky",
"left_earth", "earth", "earth", "earth", "right_earth", "left_earth", "earth", "earth", "earth","earth","earth","earth","earth", "right_ground_earth", "ground",
"left_earth", "earth", "earth", "earth", "right_earth", "left_earth", "earth", "earth", "earth","earth","earth","earth","earth", "earth", "earth",
],
numXTiles = 15,
numYTiles = 8,
tileWidth = 100,

draw = function(ctx, map, img) {
  ctx.clearRect(0, 0, 150, 300);
  map.forEach(function (name, index) {
    var
    pos = getImage(name);
    ctx.drawImage(img, pos.x, pos.y, tileWidth, tileWidth, (index % numXTiles) * tileWidth, Math.floor(index / numXTiles) * tileWidth, tileWidth, tileWidth);
  });
},

drawContinously = function(ctx, map) {
  draw(ctx, map);
  setTimeout(function() {
    drawContinously(ctx, map)
  }, 1000)
},

getImage = (function() {
  var
  TILE_WIDTH = 100,
  TILES_X_WIDTH = 3,
  TILES_Y_WIDTH = 3,
  tile_object = {};
  tiles.forEach(function(name, index) {
    tile_object[name] = {
      x: (index % TILES_X_WIDTH) * TILE_WIDTH,
      y: Math.floor(index / TILES_X_WIDTH) * TILE_WIDTH
    }
  });

  return function(name) {
    return tile_object[name];
  }
}());



document.addEventListener('DOMContentLoaded', function() {
  console.log('document ready');
  var canvas, ctx, img;
  canvas = document.getElementById('canvas');
  canvas.height = 800;
  canvas.width = 1500;
  ctx = canvas.getContext('2d');
  img = new Image();
  img.onload = function() {
    draw(ctx, map, img);
  }
  img.src = "sprite.png";
});
}())
