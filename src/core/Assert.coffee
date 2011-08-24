#
# Throws an error unless the condition evaluates to true.
# @param condition - Boolean
# @param message - String
#
Env.assert = (condition, message) ->
  throw new Error message unless condition
