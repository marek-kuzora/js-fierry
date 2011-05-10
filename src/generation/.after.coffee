pkg.INT_INSTANCE = new pkg.IntGenerator()
pkg.STRING_INSTANCE = new pkg.StringGenerator()

pkg.int_array = (count, step, sorted) ->
  return pkg.INT_INSTANCE.int_array(count, step, sorted)

pkg.string_array = (count, length, range, sorted) ->
  return pkg.STRING_INSTANCE.string_array(count, length, range, sorted)

pkg.big_string = (length, range) ->
  return pkg.STRING_INSTANCE.big_string(length, range)