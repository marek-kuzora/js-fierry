#gen = require '/'

{group, test} = require '/fierry/performance/registry'


group '/array.indexOf'


test '     0 length',
  before: ->
    @arr = []
  run: ->
    @arr.indexOf('path')

test '    10 length -first-found',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('a')

test '    10 length -middle-found',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('d')

test '    10 length -last-found',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('j')

test '    10 length -not-found',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('z')

test '    40 length -found',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('j')

test '    40 length -not-found',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.indexOf('z')

test '   500 length',
  before: ->
    @arr = gen.string_array(500, 5)
    @it = @arr[math.rand(500)]
  run: ->
    @arr.indexOf(@it)

test ' 5 000 length',
  before: ->
    @arr = gen.string_array(5000, 5)
    @it = @arr[math.rand(5000)]
  run: ->
    @arr.indexOf(@it)

test '50 000 length',
  before: ->
    @arr = gen.string_array(50000, 5)
    @it = @arr[math.rand(50000)]
  run: ->
    @arr.indexOf(@it)

