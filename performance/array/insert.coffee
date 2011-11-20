array = require '/fierry/core/array'

group '/array.insert'


group 'start'

test ' 3 length',
  run: ->
    arr = ['b', 'c', 'e']
    array.insert(arr, 'a')

test '10 length',
  run: ->
    arr = ['b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l']
    array.insert(arr, 'a')

test '50 length'
  run: ->
    arr = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'
           'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'
           'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'
           'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'
           'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'
    ]
    array.insert(arr, 'a')


group 'middle'

test ' 3 length',
  run: ->
    arr = ['b', 'c', 'e']
    array.insert(arr, 'd')

test '10 length',
  run: ->
    arr = ['b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l']
    array.insert(arr, 'h')

test '50 length'
  run: ->
    arr = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'
           'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'
           'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'
           'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'
           'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'
    ]
    array.insert(arr, 'e')


group 'end'

test ' 3 length',
  run: ->
    arr = ['b', 'c', 'e']
    array.insert(arr, 'f')

test '10 length',
  run: ->
    arr = ['b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l']
    array.insert(arr, 'm')

test '50 length'
  run: ->
    arr = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'
           'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'
           'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'
           'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'
           'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'
    ]
    array.insert(arr, 'h')


group 'custom',
  before: ->
    @fn = (a,b) -> return if a < b then -1 else 1

test ' 3 length',
  run: ->
    arr = ['b', 'c', 'e']
    array.insert_cst(arr, 'd', @fn)

test '10 length',
  run: ->
    arr = ['b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l']
    array.insert_cst(arr, 'h', @fn)

test '50 length'
  run: ->
    arr = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'
           'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'
           'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'
           'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'
           'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'
    ]
    array.insert_cst(arr, 'e', @fn)


