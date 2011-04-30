class pkg.ProgressListener

  constructor: ->
    @_count = 0
    @_group = ''

  #
  # Logs count & names of found test cases.
  # @param tests
  #
  tests_found: (tests) =>
    console.log "Found", tests.length, "test cases."

  #
  # Logs execution time of each test case.
  # @param test
  #
  test_finished: (test) =>
    group = test.group.name
    @_switch_groups(group) if group != @_group
    
    if @_is_last_entry()
      console.log @_get_output_name(test), @_get_output_ops(test), "ops/ms"

  #
  # Changes currently active group preserving the group structure.
  # @param group - String
  #
  _switch_groups: (group) ->
    curr = group.split('.')
    prev = @_group.split('.')

    i = 0
    i++ while curr[i] == prev[i]

    console.groupEnd() for j in [i..prev.length - 1]
    console.group(curr[j]) for j in [i..curr.length - 1]

    @_group = group

  #
  # Returns currently active group 'dot-length'.
  #
  _get_group_length: ->
    return @_group.split('.').length - 1

  #
  # Returns test output name.
  # @param test
  #
  _get_output_name: (test) ->
    return string.rpad(test.name, @_get_padding())

  #
  # Returns test output ops.
  # @param test
  #
  _get_output_ops: (test) ->
    return Math.round(test.getResult().getAverage() * 100) / 100

  #
  # Returns true if this is the last result from the current test.
  #
  _is_last_entry: ->
    return ++@_count % pkg.EXECUTE_RETRY == 0

  #
  # Returns padding for outputting test name.
  #
  _get_padding: ->
    return 50 - @_get_group_length() * 2

  #
  # Closes currently open console's group when all tests are finished.
  #
  tests_finished: =>
    console.groupEnd() for i in [0..@_get_group_length()]
