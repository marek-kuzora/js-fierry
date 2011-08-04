class pkg.Node

  constructor: (@_ref, @_parent, env, runner) ->
    @_curr = {}
    @_prev = {}

    @nodes = []
    @_parent.attach(@) if @_parent
    # Jesli parent jest finalized to inaczej dopinamy! :-O

  children: ->

  type: ->
    return @_ref.type

  detach: (child) ->
    
  attach: (child) ->
