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
