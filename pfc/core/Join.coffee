group
  name: 'array.join'

test
  name: 'array.join.small -default-token'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e']
  run: ->
    @arr.join()

test
  name: 'array.join.small -custom-token'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e']
  run: ->
    @arr.join('.-.')

test
  name: 'array.join.standard'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.join()

test
  name: 'array.join.big'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.join()

test
  name: 'array.join.recursive -small'
  before: ->
    @arr = [['a', 'b', 'c', 'd']]
  run: ->
    @arr.join()

test
  name: 'array.join.recursive -standard'
  before: ->
    @arr = ['a', ['b', 'c', 'd'], 'e']
  run: ->
    @arr.join()
    
test
  name: 'array.join.recursive -big'
  before: ->
    @arr = ['a', ['b', 'c', 'd', 'e'], 'f', 'g', ['h', 'i', 'j', 'k', 'l']]
  run: ->
    @arr.join()

test
  name: 'array.join.int -one-only'
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 10]
  run: ->
    @arr.join()

test
  name: 'array.join.int -all-ints'
  before: ->
    @arr = [1,2,3,4,5,6,7,8,9,10]
  run: ->
    @arr.join()

