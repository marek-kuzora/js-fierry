roots  = require '/source/view/roots'
Action = require '/source/view/action'


group '/view.create',
  before: ->
    @f0 = ->
    @f1 = -> 1
    @f2 = -> 2
    @f3 = -> 3
    @f4 = -> 4
    @f5 = -> 5
    @n0 = -> []

group 'outside'

test ' 4 actions: 1x3',
  before: ->
    @fn = require 'create:1x3'
    $ = @
    @n = ->
      return [
        new Action('dummy-1', 1, $.f1, $.n0, @)
        new Action('dummy-1', 2, $.f2, $.n0, @)
        new Action('dummy-1', 3, $.f3, $.n0, @)
      ]
  run: ->
    roots.execute_raw('dummy', @n)

test ' 4 actions: 1x1x1x1',
  before: ->
    $ = @
    @n2 = ->
      return [
        new Action('dummy-3', 1, $.f1, $.n0, @)
      ]
    @n1 = ->
      return [
        new Action('dummy-2', 1, $.f1, $.n2, @)
      ]
    @n = ->
      return [
        new Action('dummy-1', 1, $.f1, $.n1, @)
      ]
  run: ->
    roots.execute_raw('dummy', @n)

test ' 6 actions: 1x5',
  before: ->
    $ = @
    @n = ->
      return [
        new Action('dummy-1', 1, $.f1, $.n0, @)
        new Action('dummy-1', 2, $.f2, $.n0, @)
        new Action('dummy-1', 3, $.f3, $.n0, @)
        new Action('dummy-1', 4, $.f4, $.n0, @)
        new Action('dummy-1', 5, $.f5, $.n0, @)
      ]
  run: ->
    roots.execute_raw('dummy', @n)

test ' 7 actions: 1x3x1',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('dummy-2', 1, $.f1, $.n0, @)
      ]
    @n = ->
      return [
        new Action('dummy-1', 1, $.f1, $.n1, @)
        new Action('dummy-1', 2, $.f2, $.n1, @)
        new Action('dummy-1', 3, $.f3, $.n1, @)
      ]
  run: ->
    roots.execute_raw('dummy', @n)

test ' 7 actions: 1x2x1x1',
  before: ->
    $ = @
    @n2 = ->
      return [
        new Action('dummy-3', 1, $.f1, $.n0, @)
      ]
    @n1 = ->
      return [
        new Action('dummy-2', 1, $.f1, $.n2, @)
      ]
    @n = ->
      return [
        new Action('dummy-1', 1, $.f1, $.n1, @)
        new Action('dummy-1', 2, $.f2, $.n1, @)
      ]
  run: ->
    roots.execute_raw('dummy', @n)

test '10 actions: 1x3x2',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('dummy-2', 1, $.f1, $.n0, @)
        new Action('dummy-2', 1, $.f2, $.n0, @)
      ]
    @n = ->
      return [
        new Action('dummy-1', 1, $.f1, $.n1, @)
        new Action('dummy-1', 2, $.f2, $.n1, @)
        new Action('dummy-1', 3, $.f3, $.n1, @)
      ]
  run: ->
    roots.execute_raw('dummy', @n)


group 'inside'

test ' 4 actions: 1x1x1x1',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = ->
          return [
            new Action('dummy-3', 1, $.f1, $.n0, @)
          ]
        return [
          new Action('dummy-2', 1, $.f1, n, @)
        ]
      return [
        new Action('dummy-1', 1, $.f1, n, @)
      ]
  run: ->
    roots.execute_raw('dummy', @n)

test ' 7 actions: 1x2x1x1',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = ->
          return [
            new Action('dummy-3', 1, $.f1, $.n0, @)
          ]
        return [
          new Action('dummy-2', 1, $.f1, n, @)
        ]
      return [
        new Action('dummy-1', 1, $.f1, n, @)
        new Action('dummy-1', 2, $.f2, n, @)
      ]
  run: ->
    roots.execute_raw('dummy', @n)

test '10 actions: 1x3x2',
  before: ->
    $ = @
    @n = ->
      n = ->
        return [
          new Action('dummy-2', 1, $.f1, $.n0, @)
          new Action('dummy-2', 1, $.f2, $.n0, @)
        ]
      return [
        new Action('dummy-1', 1, $.f1, n, @)
        new Action('dummy-1', 2, $.f2, n, @)
        new Action('dummy-1', 3, $.f3, n, @)
      ]
  run: ->
    roots.execute_raw('dummy', @n)

