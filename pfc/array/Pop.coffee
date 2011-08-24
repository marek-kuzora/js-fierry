#
# Probably creating array & poping right after that creates
# unnecessary performance loss, that these tests shows. For 
# more stable results please refer to PushPop.coffee.
#
group '/array.pop',
  before: ->
    @full = gen.int_array(10000000, 5, true)

test ' 5 chars',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e']
    arr.pop()

test '10 chars',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    arr.pop()

test '50 chars',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    ]
    arr.pop()

test 'all',
  run: ->
    @full.pop()
