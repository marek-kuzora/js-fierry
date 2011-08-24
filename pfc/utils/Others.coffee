group '/utils.other'

test 'uid',
  run: ->
    uid({})

test 'assert',
  run: ->
    assert true, 'Illegal state occurred'

test 'math.rand -float',
  run: ->
    math.rand()

test 'math.rand -int',
  run: ->
    math.rand(1000)
