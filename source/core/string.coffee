#
# Module providing additional functionality for strings: left and
# right padding with spaces.
#
return string =

  #
  # Returns new String padded with spaces to the left, matching
  # the specified length.
  #
  # @param String str
  # @param Number len
  #
  lpad: (str, len) ->
    str = ' ' + str while str.length < len
    return str

  #
  # Returns new String padded with spaces to the right, matching
  # the specified length.
  #
  # @param String str
  # @param Number len
  #
  rpad: (str, len) ->
    str += ' ' while str.length < len
    return str
