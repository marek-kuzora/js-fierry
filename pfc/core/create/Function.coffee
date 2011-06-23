#
# Cases for function creation.
# Creating empty or very simple functions are somehow optimized at 75k ops/ms.
# Creating any kind of no-trivial functions results in 10k ops/ms.
#
group
  name: 'create.function'

test
  name: '1 line -empty'
  run: ->
    fn = ->

test
  name: '1 line -simple'
  run: ->
    fn = (a,b,c) ->
      return a+b+c

test
  name: '1 line -compex'
  run: ->
    fn = ->
      return ['a', ['a', 'b', 'c'], 'b', ['a', 'b', 'c'], 'c']

test
  name: '3 lines -simple'
  run: ->
    fn = (a,b,c) ->
      while a != b
        a++
        b--

test
  name: '3 lines -complex'
  run: ->
    fn = (a,b,c) ->
      x = ['a', ['a', 'b', 'c'], 'b', ['a', 'b', 'c'], 'c']
      y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      return {x: x, y: y}
