group
  name: 'array.indexOf'

test
  name: 'array.indexOf.empty'
  before: ->
    @arr = []
  run: ->
    @arr.indexOf('path')

test
  name: 'array.indexOf.standard -first-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('a')

test
  name: 'array.indexOf.standard -middle-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('d')

test
  name: 'array.indexOf.standard -last-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('j')

test
  name: 'array.indexOf.standard -not-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('z')

test
  name: 'array.indexOf.big -found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('j')

test
  name: 'array.indexOf.big -not-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('z')
