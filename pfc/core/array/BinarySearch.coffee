#
# Tests for binary-search of sorted arrays.
# Results shows that pfc degrades really slow with size of the array.
#
group '/array.bsearch',
  before: ->
    @i = 0
    @max = 100000


group 'int'

test '    100 -1 step',
  before: ->
    @ints = gen.int_array(100, 1, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test '    100 -5 step',
  before: ->
    @ints = gen.int_array(100, 5, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test ' 10 000 -1 step',
  before: ->
    @ints = gen.int_array(10000, 1, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test ' 10 000 -5 step',
  before: ->
    @ints = gen.int_array(10000, 5, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test '100 000 -1 step',
  before: ->
    @ints = gen.int_array(100000, 1, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test '100 000 -5 step',
  before: ->
    @ints = gen.int_array(100000, 5, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)


#
# BSearch on Strings is around 2x slower than with numbers.
# If String's char codes are bigger than 127 then String comparision is 3x slower!
#
group 'string'

test '    100  -5 length',
  before: ->
    @arr = gen.string_array(100, 5, true)
  run: ->
    array.binary_search(@arr, @arr[@i % 10])

test '    100 -20 length',
  before: ->
    @arr = gen.string_array(100, 20, true)
  run: ->
    array.binary_search(@arr, @arr[@i % 10])

test ' 10 000  -5 length',
  before: ->
    @ints = gen.string_array(10000, 5, true)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])

test ' 10 000 -20 length',
  before: ->
    @ints = gen.string_array(10000, 20, true)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])

test '100 000  -5 length',
  before: ->
    @ints = gen.string_array(100000, 5, true)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])

test '100 000 -20 length',
  before: ->
    @ints = gen.string_array(100000, 20, true)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])
