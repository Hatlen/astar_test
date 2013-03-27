(function() {
  define([], function() {
    var Astar;

    return Astar = (function() {
      function Astar(map) {
        this.map = map;
      }

      Astar.prototype.shortest_path = function(x, y) {
        var active, explored_indexes, get_best_frontier, get_frontier, get_path, i, nodes,
          _this = this;

        if (!this.map.map[x]) {
          throw "No Path Exception";
        }
        active = {
          index: x,
          frontier: true,
          parent: false,
          steps: 0
        };
        nodes = [active];
        explored_indexes = [];
        get_frontier = function() {
          return nodes.filter(function(item) {
            return item.frontier;
          });
        };
        get_best_frontier = function() {
          var frontier;

          frontier = get_frontier();
          if (frontier.length) {
            frontier.sort(function(a, b) {
              var a_cost, b_cost;

              a_cost = a.steps + _this.map.distance(a.index, y);
              b_cost = b.steps + _this.map.distance(b.index, y);
              if (a_cost > b_cost) {
                return 1;
              } else if (a_cost < b_cost) {
                return -1;
              } else if (a.index > b.index) {
                return 1;
              } else {
                return -1;
              }
            });
            return frontier[0];
          } else {
            return null;
          }
        };
        get_path = function(node) {
          var path;

          path = [];
          while (node.parent !== false) {
            path.push(node.index);
            node = (nodes.filter(function(_node) {
              return _node.index === node.parent;
            }))[0];
          }
          path.push(node.index);
          return path.reverse();
        };
        i = 0;
        while (get_frontier().length > 0) {
          i++;
          active = get_best_frontier();
          if (active.index === y) {
            console.log(i);
            return get_path(active);
          }
          active.frontier = false;
          explored_indexes.push(active.index);
          this.map.available_moves(active.index).forEach(function(index) {
            if (explored_indexes.indexOf(index) < 0 && nodes.filter(function(item) {
              return item.index === index;
            }).length < 1) {
              return nodes.push({
                index: index,
                frontier: true,
                parent: active.index,
                steps: active.steps + 1
              });
            }
          });
        }
        throw "No Path Exception";
      };

      return Astar;

    })();
  });

}).call(this);
