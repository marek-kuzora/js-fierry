group
  name: 'array.splice'

test
  name: 'small     -3'
  run: ->
    ['a', 'b', 'c'].splice(1, 0, 'f')

test
  name: 'standard -10'
  run: ->
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].splice(5, 0, 'k')

test
  name: 'big     -500'
  before: ->
    @arr = (i for i in [0..500])
  run: ->
    @arr.splice(core.rand(500), 0, 'a')
    @arr.splice(core.rand(500), 1)

test
  name: 'big   -1 000'
  before: ->
    @arr = (i for i in [0..1000])
  run: ->
    @arr.splice(core.rand(1000), 0, 'a')
    @arr.splice(core.rand(1000), 1)

test
  name: 'huge -10 000 -500-last'
  before: ->
    @arr = (i for i in [0..10000])
  run: ->
    @arr.splice(10000 - core.rand(500), 0, 'a')
    @arr.splice(10000 - core.rand(500), 1)


test
  name: 'huge -10 000 -all-rand'
  before: ->
    @arr = (i for i in [0..10000])
  run: ->
    @arr.splice(core.rand(10000), 0, 'a')
    @arr.splice(core.rand(10000), 1)
