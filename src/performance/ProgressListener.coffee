class pkg.ProgressListener

  constructor: ->
    @_count = 0
    @_group = ''

  #
  # Logs count & names of found test cases.
  # @param tests
  #
  onTestsFound: (tests) =>
    console.log "Found", tests.length, "test cases."
    #names = (test.name for test in tests)
    #console.log names

  #
  # Logs execution time of each test case.
  # @param test
  #
  onTestFinished: (test) =>
    [group, name] = string.split_index(test.name, test.name.lastIndexOf('.'))

    if group != @_group
      console.groupEnd()
      console.group(group)
      @_group = group
    
    if ++@_count % pkg.EXECUTE_RETRY == 0
      name = string.rpad(name+":", 20)
      arg = Math.round(test.getResult().getAverage())
      console.log name, arg, "ops/ms"

  #
  # Closes currently open console's group when all tests are finished.
  #
  onTestsFinished: =>
    console.groupEnd()
