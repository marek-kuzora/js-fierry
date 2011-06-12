group
  name: 'storage.get'
  before: ->
    @storage = new core.storage.Storage()
    @storage._root =
      user:
        name: 'Bilbo'
        surname: 'Baggins'
        status: 'VIP'
      simple:
        path:
          with:
            five:
              parts: true
      one_part: 'yep'

test
  name: '1 length'
  run: ->
    @storage.get(['one_part'])

test
  name: '2 length'
  run: ->
    @storage.get(['user', 'name'])

test
  name: '5 length'
  run: ->
    @storage.get(['simple', 'path', 'with', 'five', 'parts'])
