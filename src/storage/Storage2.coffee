class pkg.Storage2

  constructor: ->
    @_nps = {}
    @_rules = {}

  register_rule: (arr) ->
    assert app.is_stopped(), 'Application should be stopped'

    head = arr[0]
    @_rules[head] ?= []
    @_rules[head].push(arr)

  _get_np: (arr, str) ->
    str = arr.join('.') unless str

    return @_nps[str] ?= do =>
      np = @_get_np_path(arr)
      @_nps[np] ?= new pkg.NotifyPoint()

  _get_np_path: (arr) ->
    max = ''
    rules = @_rules[arr[0]]

    if rules
       # rule is array - if string then need to ==, else it need to be true
      for rule in rules
        tmp = ''

        for part, i in rule
          if part is true or part is arr[i]
            tmp += arr[i] # kropki do dodania np ;P
          else
            break
        max = tmp if tmp.length > max.length # niepoprawnie dziala jesli nie trafi w regule!
    return max
