assert = require '../core/assert'

class Environments

  constructor: ->
    @_envs = {}

  #
  # Registers environment with the given name.
  #
  # @param String name
  # @param {} env
  #
  register: (name, env) ->
    env.after ?= ->
    env.before ?= ->

    @_envs[name] = env

  #
  # Returns environment corresponding to the given name.
  #
  # @param String name
  #
  get: (name) ->
    assert @_envs[name], "Environment '#{name}' not found"
    return @_envs[name]


return new Environments()
