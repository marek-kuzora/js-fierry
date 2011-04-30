group
  name: 'array.concat'

test
  name: 'tiny'
  before: ->
    @a = ['a', 'b', 'c']
    @b = ['d', 'e']
  run: ->
    @a.concat(@b)

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

test
  name: 'big'
  before: ->
    @a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    @b = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @a.concat(@b)

      
