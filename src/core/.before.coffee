#
# Wraps the given function as a root for the given hash. 
# Common pattern to promote key functionality and save
# unnecessary keystrokes.
#
# @example Array() and Array.isArray()
#
# @param {...} h
# @param Function f
#
core.install_head = (h, fn) ->
  fn[k] = v for k,v of h
  return fn
