group
  name: 'array.foreach'
  before: ->
    @i = 0
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

test
  name: 'for-in'
  run: ->
    (@i++ if v) for v in @arr
    return
