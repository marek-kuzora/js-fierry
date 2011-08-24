#
# Push & pop are fast enought when it comes to handling arrays.
# Working together, they get over 40k ops/ms for small arrays.
#
group '/array.push-pop',
  before: ->
    @i = 0
    @empty = []
    @full = gen.int_array(10000000, 5, true)


test '-pop-only',
  run: ->
    @full.pop()

test '-push-only',
  run: ->
    @empty.push(@i++)

test ' 5 chars',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e']
  run: ->
    @arr.push('f')
    @arr.pop()

test '10 chars',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.push('k')
    @arr.pop()

test '50 chars',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.push('k')
    @arr.pop()
