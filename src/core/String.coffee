Env.string =

  #
  # Returns new String padded with spaces to the left, matching the specified length.
  # @param str - String
  # @param len - Number
  #
  lpad: (str, len) ->
    str = ' ' + str while str.length < len
    return str

  #
  # Returns new String padded with spaces to the right, matching the specified length.
  # @param str - String
  # @param len - Number
  #
  rpad: (str, len) ->
    str += ' ' while str.length < len
    return str

  #
  # Splits sting into two using the given index.
  # @param str - String
  # @param idx - Integer split point.
  #
  split_index: (str, idx) ->
   return [str.substr(0, idx), str.substr(idx+1)]

