define ['/src/map.js'], (Map) ->
  describe "Map:", ->
    describe "Holds initialization parameters:", ->
      map = new Map [0,1,1,0], {x: 2, y: 2}, {x:10, y:10}
      map2 = new Map [0], {x:1, y:1}, {x:10, y: 10}
      it "It can be initialized", ->
        expect("object").toEqual(typeof map)
      it "Has map", ->
        expect([0,1,1,0]).toEqual(map.map)
      it "Has tiles", ->
        expect({x:2, y:2}).toEqual(map.tiles)

    describe "Knows where you can go:", ->
      map = new Map [1,1,1,1], {x: 2, y: 2}, {x:10, y:10}
      map2 = new Map [0], {x:1, y:1}, {x:10, y: 10}
      index_and_moves = [
        [0, [1, 2]]
        [1, [0, 3]]
        [2, [0, 3]]
        [3, [1, 2]]
      ]

      index_and_moves.forEach (row) ->
        it "from tile " + row[0], ->
          index = row[0]
          moves = row[1]
          expect(moves).toEqual(map.available_moves(index).sort())

      it "on a one tile map", ->
        expect([]).toEqual(map2.available_moves(0))

    describe "Knows where you can go on a bigger map:", ->
      _map = [
        1, 1, 1, 1
        1, 1, 1, 1
        1, 1, 1, 1
        1, 1, 1, 1
      ]

      map = new Map _map, {x: 4, y: 4}, {x: 10, y: 10}

      index_and_moves = [
        [0, [1, 4]]
        [1, [0, 2, 5]]
        [3, [2, 7]]
        [5, [1, 4, 6, 9]]
      ]

      index_and_moves.forEach (row) ->
        it "from tile " + row[0], ->
          index = row[0]
          moves = row[1]
          expect(moves).toEqual(map.available_moves(index).sort())

    describe "Can get position of an index and the distance between points", ->
      map = new Map [0,1,1,0], {x: 2, y: 2}, {x:10, y:10}
      it "Knows the x,y positions of index 0", ->
        expect({x:0, y: 0}).toEqual(map.position(0))
      it "Knows the x,y positions of index 3", ->
        expect({x:1, y: 1}).toEqual(map.position(3))
      it "The distance between adjacent spaces", ->
        expect(1).toEqual(map.distance(0,1))
        expect(1).toEqual(map.distance(0,2))
      it "The distance between not adjacent spaces", ->
        expect(2).toEqual(map.distance(0, 3))
