roots  = require '/fierry/view/roots'
Action = require '/fierry/view/action'
Dummy  = require 'dummy_behavior'


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
    $ = @
    @n = ->
      return [
        new Action('dummy-1', 1, @, Dummy, $.f1, $.n0)
        new Action('dummy-1', 2, @, Dummy, $.f2, $.n0)
        new Action('dummy-1', 3, @, Dummy, $.f3, $.n0)
      ]
  run: ->
    roots.execute_raw('dummy', Dummy, @n)

test ' 4 actions: 1x1x1x1',
  before: ->
    $ = @
    @n2 = ->
      return [
        new Action('dummy-3', 1, @, Dummy, $.f1, $.n0)
      ]
    @n1 = ->
      return [
        new Action('dummy-2', 1, @, Dummy, $.f1, $.n2)
      ]
    @n = ->
      return [
        new Action('dummy-1', 1, @, Dummy, $.f1, $.n1)
      ]
  run: ->
    roots.execute_raw('dummy', Dummy, @n)

test ' 6 actions: 1x5',
  before: ->
    $ = @
    @n = ->
      return [
        new Action('dummy-1', 1, @, Dummy, $.f1, $.n0)
        new Action('dummy-1', 2, @, Dummy, $.f2, $.n0)
        new Action('dummy-1', 3, @, Dummy, $.f3, $.n0)
        new Action('dummy-1', 4, @, Dummy, $.f4, $.n0)
        new Action('dummy-1', 5, @, Dummy, $.f5, $.n0)
      ]
  run: ->
    roots.execute_raw('dummy', Dummy, @n)

test ' 7 actions: 1x3x1',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('dummy-2', 1, @, Dummy, $.f1, $.n0)
      ]
    @n = ->
      return [
        new Action('dummy-1', 1, @, Dummy, $.f1, $.n1)
        new Action('dummy-1', 2, @, Dummy, $.f2, $.n1)
        new Action('dummy-1', 3, @, Dummy, $.f3, $.n1)
      ]
  run: ->
    roots.execute_raw('dummy', Dummy, @n)

test ' 7 actions: 1x2x1x1',
  before: ->
    $ = @
    @n2 = ->
      return [
        new Action('dummy-3', 1, @, Dummy, $.f1, $.n0)
      ]
    @n1 = ->
      return [
        new Action('dummy-2', 1, @, Dummy, $.f1, $.n2)
      ]
    @n = ->
      return [
        new Action('dummy-1', 1, @, Dummy, $.f1, $.n1)
        new Action('dummy-1', 2, @, Dummy, $.f2, $.n1)
      ]
  run: ->
    roots.execute_raw('dummy', Dummy, @n)

test '10 actions: 1x3x2',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('dummy-2', 1, @, Dummy, $.f1, $.n0)
        new Action('dummy-2', 1, @, Dummy, $.f2, $.n0)
      ]
    @n = ->
      return [
        new Action('dummy-1', 1, @, Dummy, $.f1, $.n1)
        new Action('dummy-1', 2, @, Dummy, $.f2, $.n1)
        new Action('dummy-1', 3, @, Dummy, $.f3, $.n1)
      ]
  run: ->
    roots.execute_raw('dummy', Dummy, @n)


group 'inside'

test ' 4 actions: 1x1x1x1',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = ->
          return [
            new Action('dummy-3', 1, @, Dummy, $.f1, $.n0)
          ]
        return [
          new Action('dummy-2', 1, @, Dummy, $.f1, n)
        ]
      return [
        new Action('dummy-1', 1, @, Dummy, $.f1, n)
      ]
  run: ->
    roots.execute_raw('dummy', Dummy, @n)

test ' 7 actions: 1x2x1x1',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = ->
          return [
            new Action('dummy-3', 1, @, Dummy, $.f1, $.n0)
          ]
        return [
          new Action('dummy-2', 1, @, Dummy, $.f1, n)
        ]
      return [
        new Action('dummy-1', 1, @, Dummy, $.f1, n)
        new Action('dummy-1', 2, @, Dummy, $.f2, n)
      ]
  run: ->
    roots.execute_raw('dummy', Dummy, @n)

test '10 actions: 1x3x2',
  before: ->
    $ = @
    @n = ->
      n = ->
        return [
          new Action('dummy-2', 1, @, Dummy, $.f1, $.n0)
          new Action('dummy-2', 1, @, Dummy, $.f2, $.n0)
        ]
      return [
        new Action('dummy-1', 1, @, Dummy, $.f1, n)
        new Action('dummy-1', 2, @, Dummy, $.f2, n)
        new Action('dummy-1', 3, @, Dummy, $.f3, n)
      ]
  run: ->
    roots.execute_raw('dummy', Dummy, @n)
