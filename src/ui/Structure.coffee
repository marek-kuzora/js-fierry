class pkg.Structure
  
  # In @_struct I would like to have already binded html elements.
  constructor: ->
    @_reg = {}
    @_refs = @_retrospect_html(document.body)
    @_struct = {} # don't want to recreate html, just retrospect the existing html!

  # Do I want to add here html element? Or define all of that as dom-ready instead of dom?
  # If it would be 'dom-ready' it could be easy to attach later @into things.
  #_retrospect_html: (e) ->
  #  return {type: 'dom', dom: '#text', attrs: {value: e.nodeValue}} if dom.is_text(e)
  #  hash = {type: 'dom', attrs: {}}

  #  hash.dom = e.nodeName.toLowerCase()
  #  hash.uid = e.getAttribute('id')
  #  hash.nodes = (@_retrospect_html(n) for n in e.childNodes)

  #  for a in e.attributes
  #    hash.attrs[a.nodeName] = a.nodeValue

  #  if hash.uid then @_reg[hash.uid] = hash
  #  return hash

  _retrospect_html: (e) ->
    h = {type: 'dom-ready', html: e}

    h.uid   = e.getAttribute('id') unless e instanceof Text
    h.nodes = (@_retrospect_html(n) for n in e.childNodes)
    
    if h.uid then @_reg[h.uid] = {ref: h, struct: []}
    return h

  #
  # Need to point change into workingUI!
  # Need a working_ui first ;-D
  #
  inject_into: (id, nodes...) ->
    children = @_reg[id].ref.nodes
    children.push(node) for node in nodes
    #struct_nodes = @_reg[id].nodes #references to working struct for update?
