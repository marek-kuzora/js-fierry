pkg.INT_INSTANCE = new pkg.IntGenerator()
pkg.PATH_INSTANCE = new pkg.PathGenerator()
pkg.STRING_INSTANCE = new pkg.StringGenerator()


pkg.int_array = (count, step, sorted) ->
  return pkg.INT_INSTANCE.int_array(count, step, sorted)

pkg.string_array = (count, length, range, sorted) ->
  return pkg.STRING_INSTANCE.string_array(count, length, range, sorted)

pkg.big_string = (length, range) ->
  return pkg.STRING_INSTANCE.big_string(length, range)

pkg.path_array = (count, length, arr) ->
  return pkg.PATH_INSTANCE.path_array(count, length, arr)

pkg.rules_array = (count, length, arr) ->
  return pkg.PATH_INSTANCE.rules_array(count, length, arr)


pkg.PATHS_ARRAY = [
  'open', 'seem', 'together', 'next', 'white', 'children', 'begin'
  'got', 'walk', 'example', 'ease', 'paper', 'often', 'always'
  'music', 'those', 'both', 'mark', 'book', 'letter', 'until', 'mile'
  'river', 'car', 'feet', 'care', 'second', 'group', 'carry', 'took'
  'rain', 'eat', 'room', 'friend', 'began', 'idea', 'fish', 'mountain'
  'north', 'once', 'base', 'hear', 'horse', 'cut', 'sure', 'watch'
  'color', 'face', 'wood', 'main'
]
