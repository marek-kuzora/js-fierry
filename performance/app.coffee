{group, test, repeat} = require '/source/performance/registry'


#
# Exposing API for building test cases.
#
window['test']   = test
window['group']  = group
window['repeat'] = repeat


#
# Exposing API for running test cases.
#
window['run'] = require '/source/performance/runner'


#
# Requiring test cases
#
require 'array'
require 'create'
require 'function'
require 'object'
require 'storage'
require 'view'
