define [], ->
  class Astar
    constructor: (map) ->
      @map = map

    shortest_path: (x, y) ->
      throw "No Path Exception" if !@map.map[x]
      active = {index: x, frontier: true, parent: false, steps: 0}
      nodes = [active]
      explored_indexes = []

      get_frontier = =>
        nodes.filter (item) =>
          return item.frontier

      get_best_frontier = =>
        frontier = get_frontier()
        if frontier.length
          frontier.sort (a, b) =>
            a_cost = a.steps + @map.distance(a.index, y)
            b_cost = b.steps + @map.distance(b.index, y)
            if a_cost > b_cost
              1
            else if a_cost < b_cost
              -1
            else if a.index > b.index
              1
            else
              -1
          frontier[0]
        else
          null

      get_path = (node)=>
        path = []
        while node.parent != false 
          path.push(node.index)
          node = (nodes.filter (_node) ->
            return _node.index == node.parent
          )[0]
        path.push(node.index)
        path.reverse()


      i = 0
      while get_frontier().length > 0
        i++
        active = get_best_frontier()
        if active.index == y
          console.log(i)
          return get_path(active)

        active.frontier = false
        explored_indexes.push active.index
        @map.available_moves(active.index).forEach (index) ->
          if explored_indexes.indexOf(index) < 0 and nodes.filter((item) -> item.index == index).length < 1
            nodes.push
              index: index
              frontier: true
              parent: active.index
              steps: active.steps + 1
      throw "No Path Exception"
