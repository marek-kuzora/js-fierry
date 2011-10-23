Plain = require 'plain'


#
# Dao instance that can handle nested dao expressions. 
# The object will behave exactly as PlainDao instance. 
# Underlying data will be tracked internally so whenever 
# the direct path or its value changes the listeners 
# will be notified.
#
return class Complex extends Plain

  constructor: (@_nested, _storage) ->
    @_recompile()

    for e in @_nested
      e.subscribe(@_on_nested_change) if e instanceof Plain

    super(@_str, @_array, _storage)
    return

  #
  # Listener binded with ComplexDao instance.
  # Will trigger whenever the underlying path changes.
  #
  _on_nested_change: =>
    @_storage.unsubscribe(@_array, @_str, @_on_change)
    @_recompile()
    @_storage.subscribe(@_array, @_str, @_on_change)
    @_on_change()

  #
  # Recompiles the nested dao expressions in order to
  # update the underlying path which value should be 
  # presented.
  #
  _recompile: ->
    @_array = for e in @_nested
      if e instanceof Plain then e.get() else e

    @_str = @_array.join('.')

