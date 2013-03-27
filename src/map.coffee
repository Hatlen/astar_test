define [], () ->
  class Map
    constructor: (map, tiles) ->
      @map = map
      @tiles = tiles

    position: (i) ->
      x: i % @tiles.x
      y: Math.floor(i / @tiles.x)

    available_moves: (i) ->
      position = @position(i)
      _available_moves = []

      _available_moves.push(i - @tiles.x) if position.y > 0
      _available_moves.push(i - 1) if position.x > 0
      _available_moves.push(i + 1) if position.x != @tiles.x - 1
      _available_moves.push(i + @tiles.x) if position.y < @tiles.y - 1

      _available_moves.filter (i) =>
        return @map[i] > 0

    distance: (x, y) ->
      pos_x = @position(x)
      pos_y = @position(y)
      Math.abs(pos_x.x - pos_y.x) + Math.abs(pos_x.y - pos_y.y)
