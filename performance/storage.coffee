storage = require '/source/storage/storage'
path    = require '/source/generators/path'
rules   = require '/source/generators/rules'
env     = require '/source/performance/environments'


#
# Environment definitions.
#
env.register 'storage.paths',
  before: ->
    @i = 0
    @path_str_5 = path.array(10000, 5)
    @path_arr_5 = (str.split('.') for str in @path_str_5)

    @path_str_4 = path.array(10000, 4)
    @path_arr_4 = (str.split('.') for str in @path_str_4)

    @path_str_3 = path.array(10000, 3)
    @path_arr_3 = (str.split('.') for str in @path_str_3)

    @path_str_2 = path.array(10000, 2)
    @path_arr_2 = (str.split('.') for str in @path_str_2)

    @rules_1 = rules.array(1)
    @rules_5 = rules.array(5)

env.register 'storage.data',
  before: ->
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


#
# Registers main group.
#
group '/dao'
group '/storage'


#
# Require test cases.
#
require 'storage/storage_get'
require 'storage/storage_np'
require 'storage/dao_compile'
require 'storage/dao_create'
require 'storage/dao_get'
