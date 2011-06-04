class core.Runtime

  constructor: ->
    @_requests = []
    @_services = {}
    @_executors = {}

  #
  # Registers the given request for later processing in a batch.
  # Request will be executed with all other accumulated requests on flush().
  # Requests should be threated as readonly.
  # @param {type,...} r
  #

  #TODO maybe it is better to have push(type, req) and the type just define how to handle that data?
  # I would need to push into @_requests another hash! {req:req, type: type} ??
  # Or having @_requests as a hash or arrays instead of simple array.
  push: (r) ->
    @_requests.push(r)

  #
  # Registers a service under the given name.
  # @param String name
  # @param Object service
  #
  register_service: (name, service) ->
    if core.app.is_running()
      throw new Error 'Cannot register new services if app is running'
    @_services[name] = service

  #
  # Registers the executor for requests processing.
	# @param {order, run, ...} executor
	#
  register_executor: (type, exec) ->
    if core.app.is_running()
      throw new Error 'Cannot register new executors if app is running'
    @_executors[type] = exec

  #
  # Setups the executors after application is loaded.
  # Performes depedency injection on services & executors
  #
  setup: =>
    for _, service of @_services
      for key, name of service.services || []
        if !@_services[name]
          throw new Error "Service #{name} not found"
        service[key] = @_services[name]

    for _, exec of @_executors
      for key, name of exec.services || []
        if !@_services[name]
          throw new Error "Service #{name} not found"
        exec[key] = @_services[name]

  #
  # Flushes the accumulated requests into application changes.
  # Clears services using cleanup() method if defined.
  #
  flush: ->
    while @_requests.length != 0
      r = @_requests.shift()

      core.assert @_executors[r.type], "Executor for #{r.type} not found"
      @_executors[r.type].run(r)

    for service in @_services
      service.cleanup() if service.cleanup
    return
