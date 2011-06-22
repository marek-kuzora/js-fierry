#
# Abstract Storage class.
# Implements basic API & functionality required from Storage.
#
class storage.Abstract

  constructor: ->
    @_nps = {}
    @_root = {}

  #
  # Returns value from the path.
  # If the path does not exist, returns undefined.
  #
  # @param Array arr - path array representation.
  #
  get: (arr) ->
    return object.get(@_root, arr)

  #
  # Sets value at the end of the path.
  # If path does not exist, creates it.
  # Sets listeners corresponding to the given path as dirty.
  #
  # @param Array arr - path array representation.
  # @param Any v - value to be set.
  #
  set: (arr, v, str = '') ->
    object.set(@_root, arr, v)
    @_get_np(arr).set_dirty() if app.is_running()

  #
	# Registers listener for the given path.
  #
  # @param Array arr - path array representation.
  # @param String str - path string representation.
	# @param Function fn - listener.
	#
  register: (arr, fn, str = '') ->
    @_get_np(arr, str).register(fn)

  #
	# Unregisters listener from the given path.
  #
  # @param Array arr - path array representation.
  # @param String str - path string representation.
	# @param Function fn - listener.
	#
  unregister: (arr, fn, str = '') ->
    @_get_np(arr, str).unregister(fn)

  #
  # Returns storage.NotifyPoint for the given path.
  #
  # @param Array arr - path array representation.
  # @param String str - path string representation.
  #
  _get_np: (arr, str) ->
    throw new Error 'Unsupported method'
