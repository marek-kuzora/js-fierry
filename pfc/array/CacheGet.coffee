group '/array.cache.get'

test ' 25 000',
  before: ->
    @i = 0
    @max = 25000
    @ints = gen.int_array(@max, 5)

    @cache = []
    @cache[i] = i for i in @ints
  run: ->
    @cache[@ints[@i++ % @max]]

test ' 50 000',
  before: ->
    @i = 0
    @max = 50000
    @ints = gen.int_array(@max, 5)

    @cache = []
    @cache[i] = i for i in @ints
  run: ->
    @cache[@ints[@i++ % @max]]


test '100 000',
  before: ->
    @i = 0
    @max = 100000
    @ints = gen.int_array(@max, 5)

    @cache = []
    @cache[i] = i for i in @ints
  run: ->
    @cache[@ints[@i++ % @max]]



