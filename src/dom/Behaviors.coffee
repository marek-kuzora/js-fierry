pkg.ElementBehavior = (type) ->
  return {
  
    create: (o) ->
      type = @_discover_type(o) if not type
      o.node = o.parent.node.create_child(type, @_get_after(o))

      o.node.set('id', o.id) if o.id
      o.node.set('class', o.tags.join(' ')) if o.tags?.length

    _discover_type: (o) ->
      return 'div' if o.id || o.tags?.length
      return 'text'

    _get_after: (o) ->
      return if not o.parent.finalized

      return o.parent.find (nodes) ->
        i = nodes.indexOf(o)
        l = nodes.length

        while i++ < l when nodes[i].node instanceof pkg.Abstract
          return nodes[i].node

    update: (o, v) ->
      o.node.set('text', v) if v?

    finalize: (o) ->
      o.node.attach()

    dispose: (o) ->
      o.node.detach()

    get_scope: -> 'html'
  }

pkg.AttributeBehavior = (type) ->
  return {
    
    update: (o, v) ->
      o.parent.node.set(type, v, o.old_value) if o.parent.set(type, v, o.uid)
      o.old_value = v

    dispose: (o) ->
      if o.parent.remove(type, o.uid)
        v = o.parent.get(type)
        o.parent.node.set(type, v, o.old_value) if v
        o.parent.node.remove(type, o.old_value) if not v
  }

pkg.TagAtributeBehavior = ->
  return {

    update: (o, v) ->
      o.parent.set('tag', v, o.uid)
      o.parent.node.set('class', @_get_tags(o.parent))

    dispose: (o) ->
      o.parent.remove('tag', o.uid)
      o.parent.node.set('class', @_get_tags(o.parent))

    _get_tags: (p) ->
      # p.get_all('class') mi sie nie podoba!
      tags = for t in p.get_all('tag') when t?
        if lang.array(t) then t.join(' ') else t
      return tags.join(' ')

    get_scope: -> 'html'
  }

view.register 'html', (type) ->
  return new pkg.TagAtributeBehavior() if type is 'tag'
  return new pkg.ElementBehavior(type) if type of pkg.ELEMENTS
  return new pkg.AttributeBehavior(type)
