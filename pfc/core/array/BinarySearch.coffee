#
# Tests for binary-search of sorted arrays.
# Results shows that pfc degrades really slow with size of the array.
#
group
  name: 'array.bsearch'

group
  name: 'array.bsearch.int'

test
  name: ' 10 000 -step-1'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.int_array(10000, 1, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: ' 10 000 -step-5'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.int_array(10000, 5, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '100 000 -step-1'
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.int_array(100000, 1, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '100 000 -step-5'
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.int_array(100000, 5, true)
  run: ->
    array.binary_search(@ints, @i++ % @max)

#
# BSearch on String is extremely slow - over 6-8x slower than with numbers!
#
group
  name: 'array.bsearch.string'


test
  name: ' 10 000  -5-length'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.string_array(10000, 5)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])

test
  name: ' 10 000 -20-length'
  before: ->
    @i = 0
    @max = 10000
    @ints = gen.string_array(10000, 20)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])

test
  name: '100 000  -5-length'
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.string_array(100000, 5)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])

test
  name: '100 000 -20-length'
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.string_array(100000, 20)
  run: ->
    array.binary_search(@ints, @ints[@i % @max])
