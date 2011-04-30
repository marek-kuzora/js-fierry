group
  name: 'array.slice'

test
  name: 'small -clone'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e']
  run: ->
    @arr.slice()

test
  name: 'standard -clone'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice()

test
  name: 'inx-1'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice(1)

test
  name: 'inx-5'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice(5)

test
  name: 'inx-9'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice(9)

test
  name: 'big'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.slice(15)
