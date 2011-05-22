class pkg.ConsoleVisitor

  on_group_start: (group) ->
     console.group(group.name)

  on_group_end: (group) ->
    console.groupEnd()

  on_test: (test) ->
    name = test.name.substr(test.name.lastIndexOf('.')+1)
    res = test.get_result()

    console.log(name, "---", Math.round(res.get_average()), "ops")
