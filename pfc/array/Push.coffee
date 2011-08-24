#
# Probably creating array & pushing right after that creates
# unnecessary performance loss, that these tests shows. For 
# more stable results please refer to PushPop.coffee.
#
group '/array.push',
  before: ->
    @i = 0
    @empty = []

test ' 5 chars',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e']
    arr.push('f')

test '10 chars',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    arr.push('k')

test '50 chars',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    ]
    arr.push('k')

test 'all',
  run: ->
    @empty.push(@i++)
