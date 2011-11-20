array = require '/fierry/core/array'

group '/array.erase'


#
# Tests for erasing exactly one item from the array of specified
# length. The array is recreated before each test invocation.
#
group 'existing'

test ' 3 length',
  run: ->
    arr = ['a', 'b', 'c']
    array.erase(arr, 'b')

test '10 length',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    array.erase(arr, 'b')

test '50 length',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    ]
    array.erase(arr, 'b')


#
# Tests for erasing when no items for erase are found. The array
# is recreated before each test invocation.
#
group 'unexisting'

test ' 3 length -unexisting',
  run: ->
    arr = ['a', 'b', 'c']
    array.erase(arr, 'd')

test '10 length -unexisting',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    array.erase(arr, 'k')

test '50 length',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    ]
    array.erase(arr, 'z')


#
# Tests for custom erasing exactly one item from the array of 
# specified length. Item for erasing is found using custom
# comparator. The array is recreated before each test invocation.
#
group 'custom',
  before: ->
    @fn = (a,b) -> a is b

test ' 3 length',
  run: ->
    arr = ['a', 'b', 'c']
    array.erase_cst(arr, 'b', @fn)

test '10 length',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    array.erase_cst(arr, 'b', @fn)

test '50 length',
  run: ->
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
           'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    ]
    array.erase_cst(arr, 'b', @fn)
