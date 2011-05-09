group
  name: 'utils.other'

test
  name: 'core.uid'
  run: ->
    core.uid({})

test
  name: 'core.assert'
  run: ->
    core.assert true, 'Illegal state occurred'

test
  name: 'core.rand -float'
  run: ->
    core.rand()

test
  name: 'core.rand -int'
  run: ->
    core.rand(1000)
