group
  name: 'storage.get'
  before: ->
    @storage = new core.Storage()
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
  before: ->
    @arr = ['one_part']
  run: ->
    @storage.get(@arr)

test
  name: '2 length'
  before: ->
    @arr = ['user', 'name']
  run: ->
    @storage.get(@arr)

test
  name: '5 length'
  before: ->
    @arr = ['simple', 'path', 'with', 'five', 'parts']
  run: ->
    @storage.get(@arr)

