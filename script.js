require(['/src/map.js'], function(Map) {
  var
  _map = [
    0, 0, 0, 0,
    1, 1, 1, 0,
    0, 0, 0, 0,
    1, 1, 1, 1
  ],
  num_x_tiles = 4,
  num_y_tiles = 4,
  map = new Map(_map, {x: 4, y: 4}),
  tile_height = tile_width = 48,
  gutter = 2,
  tiles_count = map.tiles.x * map.tiles.y,

  draw = function(ctx, map) {
    ctx.clearRect(0, 0, 200, 200);
    map.map.forEach(function (code, index) {
      ctx.fillStyle = code === 1 ? "#00cccc" : "#ffff88";
      start_x = (index % num_x_tiles) * (tile_width + 2) + gutter/2;
      start_y = Math.floor(index / num_x_tiles) * (tile_width + 2) + gutter/2;
      ctx.fillRect(start_x, start_y, tile_height, tile_width);
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom"
      ctx.fillStyle = code === 0 ? "#00cccc" : "#ffff88";
      ctx.fillText(index, start_x + tile_width, start_y + tile_height);
    });
  },

  drawContinously = function(ctx, map) {
    draw(ctx, map);
    setTimeout(function() {
      drawContinously(ctx, map)
    }, 1000)
  },

  //i = index
  getAvailableMoves = (function() {
    var
    available_moves = [],
    x = 0,
    y = 0;
    return function(i) {
      available_moves = [];
      x = i % num_x_tiles;
      y = Math.floor(i / num_x_tiles);
      if (x > 0) available_moves.push(i - 1)
      if (x !== num_x_tiles - 1) available_moves.push(i + 1)
      if (y > 0) available_moves.push(i - num_x_tiles)
      if (y < num_y_tiles - 1) available_moves.push(i + num_x_tiles)

      return available_moves;
    }
  }());

  whenReady = function(callback) {
    if (document.readyState === "complete") callback()
    else document.addEventListener('DOMContentLoaded', callback)
  }

  whenReady(function() {
    var canvas, ctx, img;
    canvas = document.getElementById('canvas');
    canvas.height = num_x_tiles * (tile_width + gutter);
    canvas.width = num_y_tiles * (tile_height + gutter);
    ctx = canvas.getContext('2d');
    draw(ctx, map);
  });

  function print_available_moves() {
    var
    i = tiles_count;
    console.log('Map index and corresponding available moves');
    while(i--) {
      console.log(i, getAvailableMoves(i));
    }
  }
  //print_available_moves()
});
