group
  name: 'array.concat'

test
  name: 'small'
  before: ->
    @a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    @b = ['k']
  run: ->
    @a.concat(@b)

test
  name: 'standard'
  before: ->
    @a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    @b = ['k', 'i', 'j', 'l', 'm']
  run: ->
    @a.concat(@b) 
