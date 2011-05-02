arr_1m_1_step = (i for i in [0..1000000])
arr_1m_2_step = (2 * i for i in [0..1000000])

arr_100k_1_step = (i for i in [0..100000])
arr_100k_2_step = (2 * i for i in [0..100000])

arr_10k_1_step = (i for i in [0..10000])
arr_10k_2_step = (2 * i for i in [0..10000])

#
# Tests for binary-search of sorted arrays.
# Results shows that pfc degrades really slow with size of the array.
#
group
  name: 'array.bsearch'

test
  name: '   10 000 -step-1'
  before: ->
    @i = 0
    @max = 10000
    @ints = arr_10k_1_step
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '   10 000 -step-2'
  before: ->
    @i = 0
    @max = 10000
    @ints = arr_10k_2_step
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '  100 000 -step-1'
  before: ->
    @i = 0
    @max = 100000
    @ints = arr_100k_1_step
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '  100 000 -step-2'
  before: ->
    @i = 0
    @max = 100000
    @ints = arr_100k_2_step
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '1 000 000 -step-1'
  before: ->
    @i = 0
    @max = 1000000
    @ints = arr_1m_1_step
  run: ->
    array.binary_search(@ints, @i++ % @max)

test
  name: '1 000 000 -step-2'
  before: ->
    @i = 0
    @max = 1000000
    @ints = arr_1m_2_step
  run: ->
    array.binary_search(@ints, @i++ % @max)
  
###
arr = [1, 3, 5, 7, 9, 11]
console.log array.binary_search(arr, -1)
console.log array.binary_search(arr, 0)
console.log array.binary_search(arr, 2)
console.log array.binary_search(arr, 4)
console.log array.binary_search(arr, 6)
console.log array.binary_search(arr, 8)
console.log array.binary_search(arr, 10)
console.log array.binary_search(arr, 12)

# Proper inserting element after found that not-existing through the binary search!
# Fast & convinient :)
for i in [-7..-1]
  arr = [1, 3, 5, 7, 9, 11]
  arr.splice(-1*(i+1), 0, 'z')
  console.log i, arr
###
