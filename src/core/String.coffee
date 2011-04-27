Env.string =

  #
  # Splits sting into two using the given index.
  # @param str - String
  # @param idx - Integer split point.
  #
  split_index: (str, idx) ->
   return [str.substr(0, idx), str.substr(idx)]

