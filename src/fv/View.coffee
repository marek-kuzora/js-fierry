#
# Class responsible for view management. Enables clients to register
# own views and select which to execute on application startup.
#
# @singleton
#
class pkg.View

  constructor: (@_registry) ->
    @_reg = {}
    @_root = null
    @_view = null

  #
  # Registers view definition with the given name.
  #
  # @param String name
  # @param {} view
  #
  register: (name, view) ->
    assert !@_reg[name], "View #{name} already defined."
    @_reg[name] = view

  #
  # Selects the view to execute on application startup.
  # The view must exist.
  #
  # @param String name
  #
  load: (name) ->
    assert app.is_stopped(), "Application should be stopped"
    assert @_reg[name],      "View #{name} not found."

    @_view = @_reg[name]

  #
  # Executes the selected view on application startup.
  #
  on_start: (env = new pkg.Environment()) =>
    if @_view
      env.push_node()
      env.set('scope', '')

      @_root = @_registry.create(@_view, env.get('scope'))
      @_root.create(null, env)
      @_root.update(env)
      @_root.finalize(env)

      env.pop_node()

  #
  # Disposes the current view on application shutdown.
  #
  on_stop: =>
    if @_root
      @_root.dispose()
      @_root = null
      @_view = null
