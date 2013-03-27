(function() {
  define(['/src/map.js'], function(Map) {
    return describe("Map:", function() {
      describe("Holds initialization parameters:", function() {
        var map, map2;

        map = new Map([0, 1, 1, 0], {
          x: 2,
          y: 2
        }, {
          x: 10,
          y: 10
        });
        map2 = new Map([0], {
          x: 1,
          y: 1
        }, {
          x: 10,
          y: 10
        });
        it("It can be initialized", function() {
          return expect("object").toEqual(typeof map);
        });
        it("Has map", function() {
          return expect([0, 1, 1, 0]).toEqual(map.map);
        });
        return it("Has tiles", function() {
          return expect({
            x: 2,
            y: 2
          }).toEqual(map.tiles);
        });
      });
      describe("Knows where you can go:", function() {
        var index_and_moves, map, map2;

        map = new Map([1, 1, 1, 1], {
          x: 2,
          y: 2
        }, {
          x: 10,
          y: 10
        });
        map2 = new Map([0], {
          x: 1,
          //y: 1
        }, {
          x: 10,
          y: 10
        });
        index_and_moves = [[0, [1, 2]], [1, [0, 3]], [2, [0, 3]], [3, [1, 2]]];
        index_and_moves.forEach(function(row) {
          return it("from tile " + row[0], function() {
            var index, moves;

            index = row[0];
            moves = row[1];
            return expect(moves).toEqual(map.available_moves(index).sort());
          });
        });
        return it("on a one tile map", function() {
          return expect([]).toEqual(map2.available_moves(0));
        });
      });
      describe("Knows where you can go on a bigger map:", function() {
        var index_and_moves, map, _map;

        _map = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        map = new Map(_map, {
          x: 4,
          y: 4
        }, {
          x: 10,
          y: 10
        });
        index_and_moves = [[0, [1, 4]], [1, [0, 2, 5]], [3, [2, 7]], [5, [1, 4, 6, 9]]];
        return index_and_moves.forEach(function(row) {
          return it("from tile " + row[0], function() {
            var index, moves;

            index = row[0];
            moves = row[1];
            return expect(moves).toEqual(map.available_moves(index).sort());
          });
        });
      });
      return describe("Can get position of an index and the distance between points", function() {
        var map;

        map = new Map([0, 1, 1, 0], {
          x: 2,
          y: 2
        }, {
          x: 10,
          y: 10
        });
        it("Knows the x,y positions of index 0", function() {
          return expect({
            x: 0,
            y: 0
          }).toEqual(map.position(0));
        });
        it("Knows the x,y positions of index 3", function() {
          return expect({
            x: 1,
            y: 1
          }).toEqual(map.position(3));
        });
        it("The distance between adjacent spaces", function() {
          expect(1).toEqual(map.distance(0, 1));
          return expect(1).toEqual(map.distance(0, 2));
        });
        return it("The distance between not adjacent spaces", function() {
          return expect(2).toEqual(map.distance(0, 3));
        });
      });
    });
  });

}).call(this);
