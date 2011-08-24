#
# Registry for collecting mixins definition and enabling client
# classes to install these mixins via install() method.
#
# @singleton
#
class core.Installer

  constructor: ->
    @_reg = {}

  #
  # Registers the mixin definition. Will throw an error if mixin
  # with the given name is already registered.
  #
  # @param String name
  # @param Function fn
  #
  register: (name, fn) ->
    Env.assert !@_reg[name], "Mixin #{name} already registered."
    @_reg[name] = fn

  #
  # Installs mixin into the given class using provided
  # configuration. Will throw an error if the mixin with the 
  # given name is not found.
  #
  # @param String name
  # @param Function cls
  # @param {...} conf
  #
  install: (name, cls, conf = {}) ->
    Env.assert @_reg[name], "Mixin #{name} not found."
    @_reg[name](cls, conf)


#
# Global singleton instance and its public API.
#
INSTALLER = new core.Installer()

core.register_mixin = (name, fn) ->
  INSTALLER.register(name, fn)

core.install = (name, cls, conf) ->
  INSTALLER.install(name, cls, conf)
