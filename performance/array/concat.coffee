group '/array.concat'

test ' 5 length',
  before: ->
    @a = ['a', 'b', 'c']
    @b = ['d', 'e']
  run: ->
    @a.concat(@b)

test '10 length',
  before: ->
    @a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    @b = ['k']
  run: ->
    @a.concat(@b)

test '15 length',
  before: ->
    @a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    @b = ['k', 'i', 'j', 'l', 'm']
  run: ->
    @a.concat(@b)

test '40 length',
  before: ->
    @a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    @b = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @a.concat(@b)
