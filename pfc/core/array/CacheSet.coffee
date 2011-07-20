group '/array.cache.set'

test 'random_int',
  before: ->
    @i = 0
    @cache = []
    @max = 100000
    @ints = gen.int_array(@max, 20)
  run: ->
    @cache[@ints[@i++ % @max]] = true

test 'core.uid',
  before: ->
    @i = 0
    @cache = []
    @max = 100000
    @objects = ({} for i in [0..@max])
  run: ->
    @cache[core.uid @objects[@i++ % @max]] = true
