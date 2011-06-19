group
  name: 'create.array'

group
  name: 'create.array.normal'

test
  name: ' 0 length'
  run: ->
    a = []

test
  name: ' 5 length'
  run: ->
    a = [0,1,2,3,4]

test
  name: '10 length'
  run: ->
    a = [0,1,2,3,4,5,6,7,8,9]

group
  name: 'create.array.nested'

test
  name: ' 5 length -nested'
  run: ->
    a = [0, 1, [], 2, []]

test
  name: '10 length -nested'
  run: ->
    a = [0, 1, [], 2, 3, 4, 5, [], 6, []]
