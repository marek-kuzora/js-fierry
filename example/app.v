/run header:body
  /div
    /id 'header'
    /h1 'The freaking Erlang tutorial!'

/run container:body
  /div
    /id 'container'

    /div
      /id 'left-sidebar'

      /div
        /tag 'header'
        /p '1. Creating new project'

      /div
        /tag 'content'
        /ol
          /id 'task-steps'
          /li
            "Start new project by running command 'fierry -n example/source'. 
            The tool should initialize the project."
          /li
            "Create empty directory for the project. 
            Use command 'mkdir example' and enter that directory."

    /div
      /id 'main-content'
        
      /div
        /tag 'header'
        /p 'Editing: /source/app.coffee'
      
      /div
        /tag 'content'

    /div
      /id 'right-sidebar'

      /div
        /tag 'header'
        /p 'File System'

      /div
        /tag 'content'

        /div
          /tag 'file'
          /div 'source'
            /tag 'file-item'
          /div
            /tag 'file'
            /div 'app.coffee'
              /tag 'file-item'
        /div
          /tag 'file'
          /div 'release'
            /tag 'file-item'
          /div
            /tag 'file'
            /div 'example.html'
              /tag 'file-item'
        /div
          /tag 'file'
          /div '.build.yml'
            /tag 'file-item'

/run footer:body
  /div
    /id 'footer'
    /p "Task 1 of 5 | Step 3 of 8."
