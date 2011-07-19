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

core.uid.__counter__ = 1

core.uid.sort_asc  = (a,b) -> a.__uid__ - b.__uid__
core.uid.sort_desc = (a,b) -> b.__uid__ - a.__uid__

#
# Returns random float or integer if max is defined.
# @param max - max random value for Integer rand().
#
core.rand = (max) ->
  return Math.random() if max == undefined
  return Math.round(Math.random()*max) #TODO Can be faster? >> << operations??

#
# Sums running time of multiple operations happening sequentially
# @param Number[] ops - array of k_ops/ms.
#
core.sum_ops = (ops...) ->
  sum = 0
  sum += 1 / (op * 1000) for op in ops
  return 1 / sum / 1000
