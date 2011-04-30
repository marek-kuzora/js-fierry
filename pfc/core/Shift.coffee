group
  name: 'array.shift'

test
  name: 'small'
  before: ->
    @arr = ['a', 'b', 'c', 'd']
  run: ->
    @arr.shift()

test
  name: 'standard'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.shift()


test
  name: 'big'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.shift()

