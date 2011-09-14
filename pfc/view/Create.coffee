group '/view.create',
  before: ->
    @f0 = ->
    @f1 = -> 1
    @f2 = -> 2
    @f3 = -> 3
    @f4 = -> 4
    @f5 = -> 5
    @n0 = -> []
    @h = {f: @f0, n: @n0}


group 'outside'

test ' 4 actions: 1x3',
  before: ->
    $ = @
    @n = ->
      return [
        new view.Action('dummy-1', 1, $.f1, $.n0, @)
        new view.Action('dummy-1', 2, $.f2, $.n0, @)
        new view.Action('dummy-1', 3, $.f3, $.n0, @)
      ]
  run: ->
    view.execute_raw('dummy', @f0, @n)

test ' 4 actions: 1x1x1x1',
  before: ->
    $ = @
    @n2 = ->
      return [
        new view.Action('dummy-3', 1, $.f1, $.n0, @)
      ]
    @n1 = ->
      return [
        new view.Action('dummy-2', 1, $.f1, $.n2, @)
      ]
    @n = ->
      return [
        new view.Action('dummy-1', 1, $.f1, $.n1, @)
      ]
  run: ->
    view.execute_raw('dummy', @f0, @n)

test ' 6 actions: 1x5',
  before: ->
    $ = @
    @n = ->
      return [
        new view.Action('dummy-1', 1, $.f1, $.n0, @)
        new view.Action('dummy-1', 2, $.f2, $.n0, @)
        new view.Action('dummy-1', 3, $.f3, $.n0, @)
        new view.Action('dummy-1', 4, $.f4, $.n0, @)
        new view.Action('dummy-1', 5, $.f5, $.n0, @)
      ]
  run: ->
    view.execute_raw('dummy', @f0, @n)

test ' 7 actions: 1x3x1',
  before: ->
    $ = @
    @n1 = ->
      return [
        new view.Action('dummy-2', 1, $.f1, $.n0, @)
      ]
    @n = ->
      return [
        new view.Action('dummy-1', 1, $.f1, $.n1, @)
        new view.Action('dummy-1', 2, $.f2, $.n1, @)
        new view.Action('dummy-1', 3, $.f3, $.n1, @)
      ]
  run: ->
    view.execute_raw('dummy', @f0, @n)

test ' 7 actions: 1x2x1x1',
  before: ->
    $ = @
    @n2 = ->
      return [
        new view.Action('dummy-3', 1, $.f1, $.n0, @)
      ]
    @n1 = ->
      return [
        new view.Action('dummy-2', 1, $.f1, $.n2, @)
      ]
    @n = ->
      return [
        new view.Action('dummy-1', 1, $.f1, $.n1, @)
        new view.Action('dummy-1', 2, $.f2, $.n1, @)
      ]
  run: ->
    view.execute_raw('dummy', @f0, @n)

test '10 actions: 1x3x2',
  before: ->
    $ = @
    @n1 = ->
      return [
        new view.Action('dummy-2', 1, $.f1, $.n0, @)
        new view.Action('dummy-2', 1, $.f2, $.n0, @)
      ]
    @n = ->
      return [
        new view.Action('dummy-1', 1, $.f1, $.n1, @)
        new view.Action('dummy-1', 2, $.f2, $.n1, @)
        new view.Action('dummy-1', 3, $.f3, $.n1, @)
      ]
  run: ->
    view.execute_raw('dummy', @f0, @n)


group 'inside'

test ' 4 actions: 1x1x1x1',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = ->
          return [
            new view.Action('dummy-3', 1, $.f1, $.n0, @)
          ]
        return [
          new view.Action('dummy-2', 1, $.f1, n, @)
        ]
      return [
        new view.Action('dummy-1', 1, $.f1, n, @)
      ]
  run: ->
    view.execute_raw('dummy', @f0, @n)


test ' 7 actions: 1x2x1x1',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = ->
          return [
            new view.Action('dummy-3', 1, $.f1, $.n0, @)
          ]
        return [
          new view.Action('dummy-2', 1, $.f1, n, @)
        ]
      return [
        new view.Action('dummy-1', 1, $.f1, n, @)
        new view.Action('dummy-1', 2, $.f2, n, @)
      ]
  run: ->
    view.execute_raw('dummy', @f0, @n)

test '10 actions: 1x3x2',
  before: ->
    $ = @
    @n = ->
      n = ->
        return [
          new view.Action('dummy-2', 1, $.f1, $.n0, @)
          new view.Action('dummy-2', 1, $.f2, $.n0, @)
        ]
      return [
        new view.Action('dummy-1', 1, $.f1, n, @)
        new view.Action('dummy-1', 2, $.f2, n, @)
        new view.Action('dummy-1', 3, $.f3, n, @)
      ]
  run: ->
    view.execute_raw('dummy', @f0, @n)
