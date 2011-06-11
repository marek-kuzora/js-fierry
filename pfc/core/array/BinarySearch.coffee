#
# Tests for binary-search of sorted arrays.
# Results shows that pfc degrades really slow with size of the array.
#
group
  name: 'array.bsearch'

group
  name: 'array.bsearch.int'

test
  name: '    100 -1 step'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.int_array(100, 1, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '    100 -5 step'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.int_array(100, 5, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: ' 10 000 -1 step'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.int_array(10000, 1, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: ' 10 000 -5 step'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.int_array(10000, 5, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '100 000 -1 step'
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.int_array(100000, 1, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '100 000 -5 step'
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.int_array(100000, 5, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

group
  name: 'array.bsearch.string'

#
# BSearch on Strings is around 2x slower than with numbers.
# If String's char codes are bigger than 127 then String comparision is 3x slower!
#
test
  name: '    100  -5 length'
  before: ->
    @i = 0
    @arr = gen.string_array(100, 5, true)
  run: ->
    array.binary_search(@arr, @arr[@i % 10])

test
  name: '    100 -20 length'
  before: ->
    @i = 0
    @arr = gen.string_array(100, 20, true)
  run: ->
    array.binary_search(@arr, @arr[@i % 10])


test
  name: ' 10 000  -5 length'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.string_array(10000, 5, true)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])

test
  name: ' 10 000 -20 length'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.string_array(10000, 20, true)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])

test
  name: '100 000  -5 length'
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.string_array(100000, 5, true)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])

test
  name: '100 000 -20 length'
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.string_array(100000, 20, true)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])
