#
# Auguments the given class with mixins prototypes.
# @param cls - class
# @param mixins - class[]
#
core.include = (cls, mixins...) ->
  for mixin in mixins
    for name, method of mixin::
      cls::[name] = method
  return

core.is_included = (o, mixins...) ->
  for mixin in mixins
    for name, method of mixin::
      if o[name] != method then return false
  return true
