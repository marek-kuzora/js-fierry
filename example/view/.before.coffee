# Registering behaviors for actions
fv.register 'logger-root',
  get_scope: -> 'logger'

fv.register 'logger.log',
  create: (action) ->
    console.log "Created action with uid: #{action.uid}"

  update: (action, value) ->
    console.log "Updated action with uid: #{action.uid} with value: '#{value}'"

  dispose: (action) ->
    console.log "Disposed action with uid: #{action.uid}"

  get_scope: -> 'logger'

# Registering rules & setting data
storage.register_rule('started')
storage.register_rule('user.login')
storage.register_rule('view.active')
storage.register_rule('menu.items.*')

storage.set(['started'], null, true)
storage.set(['user', 'login'], null,
  age:     21
  name:    'Bilbo'
  status:  'guest'
  surname: 'Baggins'
)
storage.set(['view', 'active'], null, 2)
storage.set(['menu', 'items'], null, ['General', 'Fleets', 'Space', 'Settings'])
storage.set(['simple', 'path', 'with', 'five', 'parts'], null, new Date())

# Defining value functions
user_label = -> 'User name'
user_exact_label = -> core.get('..user.login.name', @) + ' ' + core.get('..user.login.surname', @)

menu_label = -> 'Menu items'
menu_0_label = -> core.get('..menu.items.0', @)
menu_1_label = -> core.get('..menu.items.1', @)
menu_2_label = -> core.get('..menu.items.2', @)
menu_3_label = -> core.get('..menu.items.3', @)

# Defining actions
user_exact_node = ->
  return [
    fv.create(@get_scope(), 'log', 1, null, [], user_exact_label, -> [])
  ]

menu_exact_nodes = ->
  return [
    fv.create(@get_scope(), 'log', 1, null, [], menu_0_label, -> [])
    fv.create(@get_scope(), 'log', 2, null, [], menu_1_label, -> [])
    fv.create(@get_scope(), 'log', 3, null, [], menu_2_label, -> [])
    fv.create(@get_scope(), 'log', 4, null, [], menu_3_label, -> [])
  ]

label_nodes = ->
  if core.get('..started', @)
    return [
      fv.create(@get_scope(), 'log', 1, null, [], user_label, user_exact_node)
    ]
  else
    return [
      fv.create(@get_scope(), 'log', 2, null, [], menu_label, menu_exact_nodes)
    ]

core.execute('logger-root', (->), label_nodes)

# A nastepnie ma byc dom i chce wygenerowac wszystko widocznie.
