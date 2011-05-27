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
  push: (r) ->
    @_requests.push(r)

  #
  # Registers a service under the given name.
  # @param String name
  # @param Object service
  #
  register_service: (name, service) ->
    assert app.is_stopped(), 'Cannot register new services if app is running'
    @_services[name] = service

  #
  # Registers the executor for requests processing.
	# @param {order, run, ...} executor
	#
  register_executor: (type, exec) ->
    assert app.is_stopped(), 'Cannot register new executors if app is running'
    @_executors[type] = exec

  #
  # Setups the executors after application is loaded.
  # Performes depedency injection on services & executors
  #
  setup: =>
    for service of @_services
      for name in service.services
        assert @_services[name], "Service #{name} not found"
        service[name] = @_services[name]

    for exec of @_executors
      for name in exec.services
         assert @_services[name], "Service #{name} not found"
         exec[name] = @_services[name]

  #
  # Flushes the accumulated requests into application changes.
  # Clears services using cleanup() method if defined.
  #
  flush: ->
    until array.empty(@_requests)
      r = @_requests.shift()

      assert @_requests[r.type], "Executor for #{r.type} not found"
      @_executors[r.type].run(r)

    for service in @_services
      service.cleanup() if service.cleanup

    @_requests = {}
