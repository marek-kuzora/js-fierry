class pkg.PfcListener

  onTestsFound: (tests) =>
    console.log "Tests found", tests

  onTestFinished: (test, arg) =>
    console.log "Test finished", test.name, Math.round(test.getResult().getAverage()), "ops"

  onTestsFinished: () =>
    console.log "All tests are done!"
