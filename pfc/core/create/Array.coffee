group
  name: 'create.array'

#
# Creating one dimension arrays.
# Crazy fast, 3x faster than creating simple hashes.
#
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

#
# Creating two dimension arrays.
# Only 6-8k ops/ms that is equal to nested hashes creation.
# Big performance loss.
#
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
