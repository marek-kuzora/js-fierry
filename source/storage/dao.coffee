storage = require 'storage'


DOT           = 46
CLOSURE_BEGIN = 123
CLOSURE_END   = 125


#
# Data Access class definition. High level API that enables
# clients to easily retrieve value from the storage, set value
# to the storage and track dao instances that were used to 
# access the data.
#
# @{set:dao}
# @ singleton
#
class Dao

  #
  # Returns value from the underlying dao expression.
  # Tracks the affected dao if o.track_dao() is present.
  #
  # @param String key - string path _with_ leading dots.
  # @param Object o
  #
  get: (key, o) ->
    dao = @_retrieve_dao(key, o)
    o?.register_dao?(dao)
    return dao.get()

  #
  # Sets value to the underlying dao expression.
  #
  # @param String str - string path _with_ leading dots.
  # @param Any v
  # @param Object o
  #
  set: (key, v, o) ->
    @_retrieve_dao(key, o).set(v)

  subscribe: (str, fn, instance) ->
    @_retrieve_dao(str, instance).subscribe(fn)

  unsubscribe: (str, fn, instance) ->
    @_retrieve_dao(str, instance).unsubscribe(fn)

  #
  # @param Boolean g  - true if the path is global.
  # @param String str - string path _without_ leading dots.
  # @param Array arr  - compiled array path.
  # TODO remove?
  #
  create: (key, g, str, arr) ->
    return storage.create_dao(key, g, str, arr)

  #
  # @param String key - string path _with_ leading dots.
  #
  _retrieve_dao: (key, o) ->
    dao = storage.retrieve_dao(key)

    unless dao
      arr = @compile(key, o)
      dao = storage.create_dao(key, arr.g, arr.s, arr)

    return dao

  #
  # Compiles the raw path into valid dao expression.
  #
  # @param String str - string path _with_ leading dots.
  # @param Object o
  #
  # I could check someday if recursive @_retrieve_dao when found its name isn't
  # faster than standard compile. It could be faster with big cache founds.
  compile: (str, o) ->
    i = 0
    p = 0
    l = str.length

    st = []
    arr = []

    while i < l
      char = str.charCodeAt(i)

      if char is DOT
        unless arr.g?
          arr.g = str.charCodeAt(i+1) is DOT
          arr.p = i
        else
          arr.push(str.substring(p, i)) if p isnt i
        p = i + 1

      else if char is CLOSURE_BEGIN
        arr.push(str.substring(p, i)) if p isnt i
        st.push(arr)

        arr = []
        p = i + 1

      else if char is CLOSURE_END
        arr.push(str.substring(p, i)) if p isnt i

        nkey = str.substring(arr.p, i)
        nstr = nkey.substr(if arr.g then 2 else 1)

        dao = @create(nkey, arr.g, nstr, arr, o)
        arr = st.pop()

        arr.push(dao)
        p = i + 1

      i++

    arr.push(str.substr(p)) if p isnt i
    arr.s = str.substr(arr.p)
    return arr


return new Dao()
