#
# Data Access class definition. High level API that enables
# clients to easily retrieve value from the storage, set value
# to the storage and track dao instances that were used to 
# access the data.
#
# @ singleton
#
class core.Dao

  #
  # Returns true if the given argument is a dao instance
  #
  # @param Any o
  #
  is: (o) ->
    return o instanceof dao.Plain

  #
  # Returns value from the underlying dao expression.
  # Tracks the affected dao if o.track_dao() is present.
  #
  # @param String key - string path _with_ leading dots.
  # @param Object o
  #
  get: (key, o) ->
    dao = @_retrieve_dao(key, o)
    o.track_dao?(dao) if o
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

  #
  # @param Boolean g  - true if the path is global.
  # @param String str - string path _without_ leading dots.
  # @param Array arr  - compiled array path.
  #
  create: (key, g, str, arr, o) ->
    #str = key.substr(1) # Spowalnia gdy tworze utworzone, natomiast nie wplywa na predkosc tworzenia...
    return pkg.STORAGE.create_dao(key, g, str, arr)

  #
  # @param String key - string path _with_ leading dots.
  #
  _retrieve_dao: (key, o) ->
    dao = pkg.STORAGE.retrieve_dao(key)

    unless dao
      arr = @compile(key, o)
      dao = pkg.STORAGE.create_dao(key, arr.g, arr.s, arr)

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

      if char is pkg.DOT
        unless arr.g?
          arr.g = str.charCodeAt(i+1) is pkg.DOT
          arr.p = i
        else
          arr.push(str.substring(p, i)) if p isnt i
        p = i + 1

      else if char is pkg.CLOSURE_BEGIN
        arr.push(str.substring(p, i)) if p isnt i
        st.push(arr)

        arr = []
        p = i + 1

      else if char is pkg.CLOSURE_END
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
