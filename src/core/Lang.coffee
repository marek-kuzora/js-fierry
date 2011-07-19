#
# Returns type of the given object.
# @param Any o
#
core.type = (o) ->
  return 'null' if o is null
  return t unless t = typeof o is 'object'
  return 'array' if Array.isArray(o)

  switch o.toString()
    when '[object Date]'      then return 'date'
    when '[object Array]'     then return 'array'
    when '[object Number]'    then return 'number'
    when '[object Object]'    then return 'object'
    when '[object RegExp]'    then return 'regexp'
    when '[object String]'    then return 'string'
    when '[object Boolean]'   then return 'boolean'
    when '[object Function]'  then return 'function'

  return 'object'
