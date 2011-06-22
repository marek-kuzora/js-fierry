group
  name: 'storage.get'
  before: ->
    @storage = new core.storage.Global()
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

group
  name: 'storage.get.array'

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

###
group
  name: 'storage.get.dao'

test
  name: '1 length'
  before: ->
    @dao = [true, 'one_part', ['one_part']]
  run: ->
    @storage.get(@dao)

test
  name: '2 length'
  before: ->
    @dao = [true, 'user.name', ['user', 'name']]
  run: ->
    @storage.get(@dao)

test
  name: '5 length'
  before: ->
    @dao = [true, 'simple.path.with.five.parts', ['simple', 'path', 'with', 'five', 'parts']]
  run: ->
    @storage.get(@dao)
