pkg.INT_INSTANCE = new pkg.IntGenerator()
pkg.PATH_INSTANCE = new pkg.PathGenerator()
pkg.STRING_INSTANCE = new pkg.StringGenerator()

pkg.PATHS_ARRAY = [
  'movie', 'title', 'name', 'status', 'current', 'user'
  'logged', 'guest', 'description', 'visible'
]

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
