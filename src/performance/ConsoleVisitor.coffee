class pkg.ConsoleVisitor
  
  onGroupStart: (group) ->
     console.group(group.name)

  onGroupEnd: (group) ->
    console.groupEnd()

  onTest: (test) ->
    name = test.name.substr(test.name.lastIndexOf('.')+1)
    res = test.getResult()

    console.log(name, "---", Math.round(res.getAverage()), "ops")
