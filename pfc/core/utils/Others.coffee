group '/utils.other'

test 'core.uid',
  run: ->
    core.uid({})

test 'core.assert',
  run: ->
    core.assert true, 'Illegal state occurred'

test 'core.rand -float',
  run: ->
    core.rand()

test 'core.rand -int',
  run: ->
    core.rand(1000)
