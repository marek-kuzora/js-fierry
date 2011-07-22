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

    o.track?(dao) if o
    return dao.get()

  #
  # Sets value to the underlying dao expression.
  #
  # @param String str - string path _with_ leading dots.
  # @param Any v
  # @param Object o
  #
  set: (key, v, o) ->
    @_retrieve_dao(key, o).set(nv)

  #
  # @param Boolean g  - true if the path is global.
  # @param String str - string path _without_ leading dots.
  # @param Array arr  - compiled array path.
  #
  create: (g, str, arr, o) ->
    storage = @_retrieve_storage(o)
    return storage.create_dao(g, str, arr)

  #
  # @param String key - string path _with_ leading dots.
  #
  _retrieve_dao: (key, o) ->
    storage = @_retrieve_storage(o)
    dao = storage.retrieve_dao(key)

    unless dao
      arr = @compile(key, o)
      dao = storage.create_dao(arr.g, arr.s, arr)

    return dao

  #
  # Retrieves storages from the given object.
  #
  # @param Object o
  #
  _retrieve_storage: (o = pkg.STORAGE_INSTANCE) ->
    return o if o instanceof core.Storage
    return o.get_local_storage?()

    throw new Error 'No local storage found for dao expression'

  #
  # Compiles the raw path into valid dao expression.
  #
  # @param String str - string path _with_ leading dots.
  # @param Object o
  #
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
          arr.p = if arr.g then i + 2 else i + 1
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
        arr.s = str.substring(arr.p, i)

        dao = @create(arr.g, arr.s, arr, o)
        arr = st.pop()
        arr.push(dao)

        p = i + 1

      i++

    arr.push(str.substr(p)) if p isnt i
    arr.s = str.substr(arr.p)

    return arr
