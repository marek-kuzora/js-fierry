class pkg.Abstract

  constructor: (@_parent, @_after) ->
    @node = document.createElement(@get_element_type())

  create_child: (type, after) ->
    assert !@text, 'Text only elements cannot contain other nodes.'
    
    assert pkg.ELEMENTS[type]?, "Factory for type #{type} not found."
    return pkg.ELEMENTS[type](@node, after)

  get: (name) ->
    switch @get_attribute_type(name)

      when pkg.ATTRIBUTE
        return @node.getAttribute(name)

      when pkg.STYLE
        return @node.style[name]

      when pkg.EVENT
        throw new Error 'Cannot retrieve event listener from HTMLElement.'

    return @text if name is 'text'
  
  set: (name, value, old_value) ->

    switch @get_attribute_type(name)

      when pkg.ATTRIBUTE
        return @node.setAttribute(name, value)
        
      when pkg.STYLE
        return @node.style[name] = value

      when pkg.EVENT
        @node.removeEventListener(name, old_value) if old_value?
        return @node.addEventListener(name, value)
    
    # Lepszy text handling potrzebuje!
    if name is 'text'
      @node.textContent = value
#      @node.innerText = value
      
    #if name is 'text'
      #return @text.nodeValue = value if @text
      
      #assert !@node.firstChild?, 'Element is not text only.' # FIXME error text
      #@text = document.createTextNode(value)
      #@node.appendChild(@text)

  remove: (name, old_value) ->
    switch @get_attribute_type(name)
      
      when pkg.ATTRIBUTE
        @node.removeAttribute(name)
        return

      when pkg.STYLE
        @node.style[name] = undefined
        return

      when pkg.EVENT
        @node.removeEventListener(name, old_value)
        return

    if name is 'text' && @text?
      @text.parentNode.removeChild(@text)


  get_attribute_type: (name) ->
    return if name is 'text'

    return pkg.ATTRIBUTE if name in pkg.ATTRIBUTES
    return pkg.EVENT     if name in pkg.EVENTS
    return pkg.STYLE

  attach: ->
    return @_parent.injectBefore(@node, @_after.node) if @_after
    return @_parent.appendChild(@node)

  detach: ->
    @_parent.removeChild(@node)
