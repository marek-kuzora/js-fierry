class pkg.DomAction extends pkg.AbstractAction

  constructor: (ref, parent) ->
    super ref, parent

    @_attrs = ref.attrs()
    @_attached = false

  create: ->
    @_attrs = @_ref.attrs() # should be this variable??
    @_node = @create_node()

  create_node: ->
    throw new Error 'Unsupported method'

  #
  # Returns reference to HTMLElement represented by the action.
  #
  get_dom_reference: ->
    return @_node

  attach: ->
    pnode = @_parent.get_dom_reference()
    bnode = @_after.get_dom_reference() if @_after

    if @_after and @_after.is_attached()
      pnode.insertBefore @_node, bnode
    else
      pnode.appendChild @_node

  is_attached: ->
    return @_node.parentNode != null

  detach: ->
    @_node.parentNode.removeChild @_node
