#
# Throws an error unless the condition evaluates to true.
# @param condition - Boolean
# @param message - String
#
core.assert = (condition, message) ->
  throw new Error message unless condition
  return

#
# Stamps object with unique identificator.
# @param obj
#
core.uid = (obj) ->
  obj.__uid__ ?= ++core.uid.__counter__

core.uid.__counter__ = 0

#
# Returns random float or integer if max is defined.
# @param max - max random value for Integer rand().
#
core.rand = (max) ->
  return Math.random() unless max
  return Math.round(Math.random()*max)
