group '/array.slice'

test 'small -clone',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e']
  run: ->
    @arr.slice()

test 'standard -clone',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice()

test 'inx-1',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice(1)

test 'inx-5',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice(5)

test 'inx-9',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice(9)

test 'big',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice(15)

