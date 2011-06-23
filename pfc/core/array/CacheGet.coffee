group
  name: 'array.cache.get'

test
  name: ' 25 000'
  before: ->
    @i = 0
    @max = 25000
    @ints = gen.int_array(@max, 5)

    @cache = []
    @cache[i] = i for i in @ints
  run: ->
    @cache[@ints[@i++ % @max]]

test
  name: ' 50 000'
  before: ->
    @i = 0
    @max = 50000
    @ints = gen.int_array(@max, 5)

    @cache = []
    @cache[i] = i for i in @ints
  run: ->
    @cache[@ints[@i++ % @max]]


test
  name: '100 000'
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.int_array(@max, 5)

    @cache = []
    @cache[i] = i for i in @ints
  run: ->
    @cache[@ints[@i++ % @max]]



