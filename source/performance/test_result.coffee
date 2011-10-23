return class TestResult
  constructor: ->
    @_registry = []

  #
  # Registers new time-result for test entry.
  # @param arg - test case argument.
  # @param time - test case running time [ms].
  #
  register: (arg, time) ->
    @_registry.push(arg/time) unless time == 0

  #
  # Returns average number of operations per milisecond.
  #
  get_average: () ->
    sum = 0
    sum += ops for ops in @_registry
    return sum / @_registry.length

  #
  # Returns array of number of operations per milisecond.
  #
  get_all: () ->
    return @_registry
