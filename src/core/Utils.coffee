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

core.uid.__counter = 0
