class core.Runtime

  constructor: ->
    @_requests = []
    @_services = {}
    @_executors = {}

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
  register_executor: (type, executor) ->
    if core.app.is_running()
      throw new Error 'Cannot register new executors if app is running'
    @_executors[type] = executor

  #
  # Registers the given request for later processing in a batch.
  # - Request will be executed with all other accumulated requests on flush().
  # - Requests should be threated as readonly.
  # @param String type
  # @param {...} req
  #
  push_request: (type, request) ->
    @_requests.push {type: type, req: request}

  #
  # Executes provided function inside the service with specified name.
  # @param String name
  # @param -> fn
  #
  execute_on_service: (name, fn) ->
    if !@_services[name]
      throw new Error "Service #{name} not found."
    return fn.call @_services[name]

  #
  # Flushes the accumulated requests into application changes.
  # - Clears services using cleanup() method if defined.
  #
  flush: ->
    while @_requests.length != 0
      {type, req} = @_requests.shift()

      core.assert @_executors[type], "Executor for #{type} not found"
      @_executors[type].run req

    for service in @_services
      service.cleanup() if service.cleanup
    return

  #
  # Setups executors and services on application startup.
  #
  _setup: =>
    @_setup_resource service  for _, service of @_services
    @_setup_resource executor for _, executor of @_executors

  #
  # Setups the resource after application is loaded.
  # - Performs depedency injection of requested services.
  # - Setups the resource if necessary.
  # @param resource
  #
  _setup_resource: (resource) ->
    for key, name of resource.services || {}
      if !@_services[name]
        throw new Error "Service #{name} not found."
      resource[key] = @_services[name]

    resource.setup() if resource.setup
