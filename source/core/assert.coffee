#
# Throws an error unless the condition evaluates to true.
#
# @param Boolean condition
# @param String message
#
return assert = (condition, message) ->
  throw new Error message unless condition
