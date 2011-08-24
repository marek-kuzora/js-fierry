Env.string =

  #
  # Returns new String padded with spaces to the left, matching the specified length.
  #
  # @param str - String
  # @param len - Number
  #
  lpad: (str, len) ->
    str = ' ' + str while str.length < len
    return str

  #
  # Returns new String padded with spaces to the right, matching the specified length.
  #
  # @param str - String
  # @param len - Number
  #
  rpad: (str, len) ->
    str += ' ' while str.length < len
    return str
