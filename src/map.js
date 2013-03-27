(function() {
  define([], function() {
    var Map;

    return Map = (function() {
      function Map(map, tiles) {
        this.map = map;
        this.tiles = tiles;
      }

      Map.prototype.position = function(i) {
        return {
          x: i % this.tiles.x,
          y: Math.floor(i / this.tiles.x)
        };
      };

      Map.prototype.available_moves = function(i) {
        var position, _available_moves,
          _this = this;

        position = this.position(i);
        _available_moves = [];
        if (position.y > 0) {
          _available_moves.push(i - this.tiles.x);
        }
        if (position.x > 0) {
          _available_moves.push(i - 1);
        }
        if (position.x !== this.tiles.x - 1) {
          _available_moves.push(i + 1);
        }
        if (position.y < this.tiles.y - 1) {
          _available_moves.push(i + this.tiles.x);
        }
        return _available_moves.filter(function(i) {
          return _this.map[i] > 0;
        });
      };

      Map.prototype.distance = function(x, y) {
        var pos_x, pos_y;

        pos_x = this.position(x);
        pos_y = this.position(y);
        return Math.abs(pos_x.x - pos_y.x) + Math.abs(pos_x.y - pos_y.y);
      };

      return Map;

    })();
  });

}).call(this);
