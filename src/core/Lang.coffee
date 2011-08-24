#
# Module responsible for type discovery. Provides methods for
# checking if an argument is boolean, string, object, array, etc.
#
# Checking if argument is an ordinary object is currently rather
# slow - please use it only as a last resort. Please also note,
# that checking type of any primitive wrapped with an object,
# will be probably as slow as pure object checking.
#
Env.lang = $lang =

  #
  # Returns true if argument is an array.
  #
  # @param Any o
  #
  array: (o) ->
    return Array.isArray(o)

  #
  # Returns true if argument is a string.
  #
  # @param Any o
  #
  string: (o) ->
    typeof o is 'string' || o.toString() is '[object String]'

  #
  # Returns true if argument is a number.
  #
  # @param Any o
  #
  number: (o) ->
    typeof o is 'number' || o.toString() is '[object Number]'

  #
  # Returns true if argument is a boolean.
  #
  # @param Any o
  #
  boolean: (o) ->
    typeof o is 'boolean' || o.toString() is '[object Boolean]'

  #
  # Returns true if argument is a function.
  #
  # @param Any o
  #
  function: (o) ->
    typeof o is 'function' || o.toString() is '[object Function]'

  #
  # Returns true if argument is an ordinary object.
  # @important This method is rather slow.
  #
  # @param Any o
  #
  object: (o) ->
    typeof o is 'object' && o.toString() is '[object Object]'

  #
  # Returns true if argument is a date object.
  #
  # @param Any o
  #
  date: (o) ->
    o instanceof Date

  #
  # Returns true if argument is a regexp object.
  #
  # @param Any o
  #
  regexp: (o) ->
    o instanceof RegExp
