(function() {
  define(["/src/a_star.js", "/src/map.js"], function(Astar, Map) {
    return describe("Astar:", function() {
      it("Can be initialized", function() {
        var astar, map;

        map = new Map([1], {
          x: 1,
          y: 1
        });
        astar = new Astar(map);
        return expect("object").toEqual(typeof astar);
      });
      describe("shortest_path:", function() {
        var astar, expect_shortest_path_length, map;

        map = null;
        astar = null;
        expect_shortest_path_length = function(_map, tiles, start_point, end_point, expected_path_length) {
          map = new Map(_map, tiles);
          astar = new Astar(map);
          return expect(expected_path_length).toEqual(astar.shortest_path(start_point, end_point).length);
        };
        describe("easy paths", function() {
          beforeEach(function() {
            map = new Map([1, 1, 1, 1], {
              x: 4,
              y: 1
            });
            return astar = new Astar(map);
          });
          it("forward", function() {
            return expect([0, 1]).toEqual(astar.shortest_path(0, 1));
          });
          it("backwards", function() {
            return expect([1, 0]).toEqual(astar.shortest_path(1, 0));
          });
          it("multistep", function() {
            return expect([0, 1, 2, 3]).toEqual(astar.shortest_path(0, 3));
          });
          return it("downwards", function() {
            map = new Map([1, 1, 1, 1], {
              x: 2,
              y: 2
            });
            astar = new Astar(map);
            return expect([0, 1, 3]).toEqual(astar.shortest_path(0, 3));
          });
        });
        describe("longer paths", function() {
          beforeEach(function() {
            var _map;

            _map = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            map = new Map(_map, {
              x: 5,
              y: 5
            });
            return astar = new Astar(map);
          });
          it("down", function() {
            return expect([0, 5, 10, 15, 20]).toEqual(astar.shortest_path(0, 20));
          });
          it("down and sideways", function() {
            var length, path;

            path = astar.shortest_path(0, 23);
            length = path.length;
            return expect(8).toEqual(length);
          });
          return it("up and sideways", function() {
            var length, path;

            path = astar.shortest_path(17, 5);
            length = path.length;
            return expect(5).toEqual(length);
          });
        });
        return describe("paths on maps with walls/obstacles", function() {
          it("finds the one path around the obstacles", function() {
            var _map;

            _map = [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1];
            map = new Map(_map, {
              x: 5,
              y: 5
            });
            astar = new Astar(map);
            return expect([0, 1, 2, 3, 4, 9, 14, 13, 12, 11, 10, 15, 20, 21, 22, 23, 24]).toEqual(astar.shortest_path(0, 24));
          });
          it("finds the way around the obstacles", function() {
            var _map;

            _map = [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1];
            return expect_shortest_path_length(_map, {
              x: 5,
              y: 5
            }, 0, 24, 17);
          });
          it("finds one of the shortest ways of many ways around some obstacles", function() {
            var _map;

            _map = [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1];
            return expect_shortest_path_length(_map, {
              x: 5,
              y: 5
            }, 23, 3, 9);
          });
          it("finds one of the shortest ways of many ways around some obstacles", function() {
            var _map;

            _map = [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1];
            return expect_shortest_path_length(_map, {
              x: 5,
              y: 5
            }, 23, 3, 11);
          });
          return it("finds one of the shortest ways of many ways around some obstacles", function() {
            var _map;

            _map = [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1];
            return expect_shortest_path_length(_map, {
              x: 5,
              y: 5
            }, 24, 0, 9);
          });
        });
      });
      return describe("no paths", function() {
        it("throws no path error when there's no path", function() {
          var astar, map, _map;

          _map = [1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1];
          map = new Map(_map, {
            x: 5,
            y: 3
          });
          astar = new Astar(map);
          return expect(function() {
            return astar.shortest_path(0, 14);
          }).toThrow("No Path Exception");
        });
        return it("throws no path exception when the start or end point is outside of the map or 0 (a wall)", function() {
          var astar, map;

          map = new Map([0, 0], {
            x: 2,
            y: 1
          });
          astar = new Astar(map);
          expect(function() {
            return astar.shortest_path(0, 0);
          }).toThrow("No Path Exception");
          expect(function() {
            return astar.shortest_path(0, 1);
          }).toThrow("No Path Exception");
          expect(function() {
            return astar.shortest_path(9, 1);
          }).toThrow("No Path Exception");
          return expect(function() {
            return astar.shortest_path(0, 9);
          }).toThrow("No Path Exception");
        });
      });
    });
  });

}).call(this);
