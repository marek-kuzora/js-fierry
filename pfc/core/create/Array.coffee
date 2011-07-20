group '/create.array'

#
# Creating one dimension arrays.
# Crazy fast, 3x faster than creating simple hashes.
#
group 'normal'

test ' 0 length',
  run: ->
    a = []

test ' 5 length',
  run: ->
    a = [0,1,2,3,4]

test '10 length',
  run: ->
    a = [0,1,2,3,4,5,6,7,8,9]

#
# Creating two dimension arrays.
# Only 6-8k ops/ms that is equal to nested hashes creation.
# Big performance loss.
#
group 'nested'

test ' 5 length -nested',
  run: ->
    a = [0, 1, [], 2, []]

test '10 length -nested',
  run: ->
    a = [0, 1, [], 2, 3, 4, 5, [], 6, []]
