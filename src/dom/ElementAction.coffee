# type!
class pkg.ElementAction extends view2.Action

  on_create: ->
    super

    @node = @parent.node.create_child(@type, @_get_after())
    @node.set('id', @id) if @id
    @node.set('class', @tags.join(' ')) if @tags?.length

  _get_after: ->
    return if not @parent.finalized

    return @parent.find (nodes) ->
      i = nodes.indexOf(@)
      l = nodes.length

      while i++ < l when nodes[i].node instanceof pkg.Abstract
        return nodes[i].node

  on_update: ->
    super
    @node.set('text', @value) if @value?

  finalize: ->
    super
    @node.attach()

  dispose: ->
    super
    @node.detach()

  get_scope: -> 'html'

view2.register 'html', (type) ->
  #return new pkg.TagAtributeBehavior() if type is 'tag'
  return pkg.ElementAction if type of pkg.ELEMENTS
  #return new pkg.AttributeBehavior(type)
