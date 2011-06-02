###

executor
  order: '1.2'

  services:
    nodes: 'nodes'
    index: 'nodes.indexed'

  # How can I use that to get info if the executor should be runned?
  requests:
    arr: 'dom.attach'

  run: ->
    for req in @arr
      parent = @nodes.resolve(req.parentID)
      before = if req.beforeID then @nodes.resolve(req.beforeID) else null
      @index.setCached(req.node, parent, before)


  ui.into document.body, [
  type: 'div'
  attrs:
    id: 'cokolwiek'
    class: 'fafa'
  content: [
    type: 'span'
    attrs:
      text: 'title'
      font: 'ui'
    content: [
      type: 'span'
      attrs:
        text: '!'
        font: 'b'
    ]
  ,
    type: 'br'
  ,
    type: 'span'
    attrs:
      text: 'some text'
  ]
,
  type: 'div'
]

ui.into document.body,

  # I could use the fist line to define all in custom syntax. id, class, etc
  # But if so, there would be no uid there...
  ui.append 'div #fafa'
    id: 'cokolwiek'
    class: 'fafa'

  ui.append 'br', # musze miec tutaj , jak chce wciecie a nie definiuje attrybutow!
                  # To dziala zamiast wciec! Brak wciecia i ',' definiuje dziecko tez :/

    ui.append 'span'
      text: 'title'
      font: 'ui'

      ui.append 'span'
        text: '!'
        font: 'b'

        ui.append 'br'

    ui.append 'span'
      text: 'some text'

  ui.append 'div'

# Here I would like to import all dom, tpl, text functions from ui namespace in batch
# It should be easy to import in batch for this use case!
ui.into '#body',                # only id is accepted at the moment

  dom 'div #left'
    uid: 'left'                 # Defines uid - that element can be a target of ui.into

    dom 'h1 .title .center',    # Defines classes for the element. All spaces are trimmed.
      text '=Navigation'        # Defines text after = There can be space before first letter - trim it
      text 'b] =!'              # Probably needed syntax for defining attrs or default attr (here font)

    tpl 'menu:left'             # Invokes template. Can specify additional arguments to customize
    
  dom 'div #main'
    uid: 'main'

  dom 'div #right'
    uid: 'right'

ui.define 'menu:left',
  dom 'ul',
    dom 'li =first'
    dom 'li =second'

# Template definition
ui.define 'template'

# Experimenting...
ui.cond
  if: current_user.is_logged()

  ui.append 'span'
    text: current_user.email

ui.loop
  item: i
  array: '..data'

# Have to build in a way, that I could run it multiple times.
