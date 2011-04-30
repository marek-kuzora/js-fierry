group
  name: 'array.concat'

test
  name: 'array.concat.small'
  before: ->
    @a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    @b = ['k']
  run: ->
    @a.concat(@b)

test
  name: 'array.concat.standard'
  before: ->
    @a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    @b = ['k', 'i', 'j', 'l', 'm']
  run: ->
    @a.concat(@b)
  
