group
  name: 'array.indexOf'

test
  name: 'empty'
  before: ->
    @arr = []
  run: ->
    @arr.indexOf('path')

test
  name: 'standard -first-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('a')

test
  name: 'standard -middle-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('d')

test
  name: 'standard -last-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('j')

test
  name: 'standard -not-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('z')

test
  name: 'big -found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('j')

test
  name: 'big -not-found'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('z')
