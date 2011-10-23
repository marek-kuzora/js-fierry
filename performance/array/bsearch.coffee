array  = require '/source/core/array'
int    = require '/source/generators/number'
string = require '/source/generators/string'


#
# Tests for binary-search of sorted arrays. Results shows that
# pfc degrades really slow with size of the array.
#
group '/array.bsearch',
  before: ->
    @i = 0
    @max = 100000


group 'int'

test '    100 -1 step',
  before: ->
    @ints = int.array(100, 1, true)
  run: ->
    array.bsearch(@ints, @i++ % @max)

test '    100 -5 step',
  before: ->
    @ints = int.array(100, 5, true)
  run: ->
    array.bsearch(@ints, @i++ % @max)

test ' 10 000 -1 step',
  before: ->
    @ints = int.array(10000, 1, true)
  run: ->
    array.bsearch(@ints, @i++ % @max)

test ' 10 000 -5 step',
  before: ->
    @ints = int.array(10000, 5, true)
  run: ->
    array.bsearch(@ints, @i++ % @max)

test '100 000 -1 step',
  before: ->
    @ints = int.array(100000, 1, true)
  run: ->
    array.bsearch(@ints, @i++ % @max)

test '100 000 -5 step',
  before: ->
    @ints = int.array(100000, 5, true)
  run: ->
    array.bsearch(@ints, @i++ % @max)


#
# BSearch on Strings is about 30% faster than with numbers.
# If String's char codes are bigger than 127 then String
# comparision is 3x slower!
#
#
group 'string'

test '    100  -5 length',
  before: ->
    @arr = string.array(100, 5, true)
  run: ->
    array.bsearch(@arr, @arr[@i % 10])

test '    100 -20 length',
  before: ->
    @arr = string.array(100, 20, true)
  run: ->
    array.bsearch(@arr, @arr[@i % 10])

test ' 10 000  -5 length',
  before: ->
    @ints = string.array(10000, 5, true)
  run: ->
    array.bsearch(@ints, @ints[@i % @max])

test ' 10 000 -20 length',
  before: ->
    @ints = string.array(10000, 20, true)
  run: ->
    array.bsearch(@ints, @ints[@i % @max])

test '100 000  -5 length',
  before: ->
    @ints = string.array(100000, 5, true)
  run: ->
    array.bsearch(@ints, @ints[@i % @max])

test '100 000 -20 length',
  before: ->
    @ints = string.array(100000, 20, true)
  run: ->
    array.bsearch(@ints, @ints[@i % @max])

#
# BinarySearch with custom comparator is 2-3x slower than
# int / string version using native compare.
#
group 'custom',
  before: ->
    @fn = (a,b) -> a - b

test '    100 -1 step',
  before: ->
    @ints = int.array(100, 1, true)
  run: ->
    array.bsearch_cst(@ints, @i++ % @max, @fn)

test '    100 -5 step',
  before: ->
    @ints = int.array(100, 5, true)
  run: ->
    array.bsearch_cst(@ints, @i++ % @max, @fn)

test ' 10 000 -1 step',
  before: ->
    @ints = int.array(10000, 1, true)
  run: ->
    array.bsearch_cst(@ints, @i++ % @max, @fn)

test ' 10 000 -5 step',
  before: ->
    @ints = int.array(10000, 5, true)
  run: ->
    array.bsearch_cst(@ints, @i++ % @max, @fn)

test '100 000 -1 step',
  before: ->
    @ints = int.array(100000, 1, true)
  run: ->
    array.bsearch_cst(@ints, @i++ % @max, @fn)

test '100 000 -5 step',
  before: ->
    @ints = int.array(100000, 5, true)
  run: ->
    array.bsearch_cst(@ints, @i++ % @max, @fn)


