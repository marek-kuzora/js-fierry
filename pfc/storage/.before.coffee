group
  name: 'storage'

#
# 10 predefined path segments.
#
pkg.PATHS_ARRAY = [
  'movie', 'title', 'name', 'status', 'current', 'user'
  'logged', 'guest', 'description', 'visible'
]

#
# Permutates given array of path segments into paths with specified length.
# @param count - generated array size.
# @param length - each path length.
# @param arr - array of path segments.
#
pkg.permutate_paths = (count, length = 5, arr = pkg.PATHS_ARRAY) ->
  l = arr.length - 1

  while count--
    (arr[core.rand(l)] for _ in [0..length - 1]).join('.')

#
# Permuates given array of path segments into rules with specified length.
# Replaces random path segments with wildchars '*'.
# @param count - number of rules per head.
# @param length - each path length.
# @param arr - array of path segments.
#
pkg.permutate_rules = (count, length = 5, arr = pkg.PATHS_ARRAY) ->
  l = arr.length
  results = pkg.permutate_paths(count * l, length - 1, arr)
  for path, i in results
    arr[i % l] + '.' + path.replace(arr[core.rand(l)], '*')
