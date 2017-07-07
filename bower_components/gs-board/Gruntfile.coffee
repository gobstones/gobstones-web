'use strict'

version = '0.0.1'

LIVERELOAD_PORT = 35730
lrSnippet = require('connect-livereload')(port: LIVERELOAD_PORT)
exec = require('child_process').execSync;

# var conf = require('./conf.'+process.env.NODE_ENV);
mountFolder = (connect, dir) ->
  connect.static require('path').resolve(dir)

app_name = require('./bower.json').name

# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->

  unless app_name
    throw new TypeError('must specify an application name in bower.json file')

  grunt.log.write 'application name: ' + app_name + '\n'

  require('load-grunt-tasks') grunt
  require('time-grunt') grunt
  # configurable paths

  yeomanConfig =
    bower:   'bower_components'
    src:     'src'
    dist:    'dist'
    tmp:     'tmp'
  do ->
    (maybe_dist = grunt.option('dist')) and
    (typeof maybe_dist is 'string') and
    yeomanConfig.dist = maybe_dist
  do ->
    (maybe_tmp = grunt.option('tmp')) and
    (typeof maybe_tmp is 'string') and
    yeomanConfig.tmp = maybe_tmp

  grunt.loadNpmTasks 'grunt-angular-templates'
  grunt.loadNpmTasks 'grunt-bake'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-html-angular-validate'
  grunt.loadNpmTasks 'grunt-preprocess'
  grunt.loadNpmTasks 'grunt-string-replace'
  grunt.loadNpmTasks 'grunt-minify-polymer'

  grunt.registerTask "default", "server"

  grunt.initConfig
    yeoman: yeomanConfig

    # VULCANIZE ALL WITH POLYMER
    vulcanize:
      default:
        options:
          inlineScripts: true
          inlineCss: true
        files:
          "dist/polymer.html": "compiled-polymer.html"
          "dist/gs-board.html": "compiled-component.html"

    # MINIFY THE VULCANIZE OUTPUT
    minifyPolymer:
      default:
        files:
          "dist/polymer.html": "dist/polymer.html"
          "dist/gs-board.html": "dist/gs-board.html"

    #################################################
    #                  livereload                   #
    #################################################
    # watch: cada vez que un archivo cambia
    # dentro de 'files' se ejecutan las correspodientes 'tasks'
    watch:

      coffee_components:
        files: ['<%= yeoman.src %>/components/**/*.coffee']
        tasks: ['scripts:components','components_build:tmp_dist']
      coffee_demo:
        files: ['<%= yeoman.src %>/demo/**/*.coffee']
        tasks: ['scripts:demo']
      sass_common_and_components:
        files: ['<%= yeoman.src %>/{components,common}/**/*.scss']
        tasks: ['sass:src_tmp','components_build:tmp_dist']
      sass_demo:
        files: ['<%= yeoman.src %>/demo/**/*.scss']
        tasks: ['sass:demo']
      html_components:
        files: ['<%= yeoman.src %>/components/**/*.html']
        tasks: ['html:components','components_build:tmp_dist']
      html_demo:
        files: ['<%= yeoman.src %>/demo/**/*.html']
        tasks: ['html:demo']
      json_components:
        files: ['<%= yeoman.src %>/components/**/*.json']
        tasks: ['copy:json_src_tmp','scripts:components','components_build:tmp_dist']

      # watch.livereload: files which demand the page reload
      livereload:
        options:
          livereload: LIVERELOAD_PORT
        files: [
          '<%= yeoman.dist %>/**/*'
          'demo/**/*'
        ]

    connect:
      options:
        port: 9002
        # default 'localhost'
        # Change this to '0.0.0.0' to access the server from outside.
        hostname: "localhost"
      livereload:
        options:
          middleware: (connect) ->
            [lrSnippet, mountFolder(connect, '.')]

    open:
      server:
        url: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/bower_components/' + app_name + '/demo'

    clean:
      dist:
        files: [
          dot: true
          src: ['<%= yeoman.dist %>/**/*','!<%= yeoman.dist %>/bower_components/**']
        ]
      tmp:
        files: [
          dot: true
          src: ['<%= yeoman.tmp %>/**/*']
        ]
      dist_demo:
        files: [
          dot: true
          src: ['demo/**/*']
        ]

    #################################################
    #                    styles                     #
    #################################################

    sass:
      src_tmp:
        options:
          style: 'expanded'
        files: [
          expand: true
          cwd: '<%= yeoman.src %>'
          src: '**/*.scss'
          dest: '<%= yeoman.tmp %>'
          ext: '.css'
        ]
      demo:
        options:
          style: 'expanded'
        files: [
          expand: true
          cwd: '<%= yeoman.src %>/demo'
          src: '**/*.scss'
          dest: 'demo'
          ext: '.css'
        ]
      #not in use
      dist_compress:
        options:
          style: 'compressed'
        files: [
          expand: true
          cwd: 'repositories'
          src: '**/dist/*.scss'
          dest: 'repositories'
          ext: '.min.css'
        ]

    #################################################
    #                     html                      #
    #################################################

    preprocess:
      options:
        inline: true
        context:
          PRODUCTION: 'PRODUCTION'
          STAGGING:   'STAGGING'
          DEVELOP:    'DEVELOP'
          ENV:        'DEVELOP'
      src_tmp_html:
        files: [
          expand: true
          cwd: '<%= yeoman.src %>'
          src: '**/*.{htm,html}'
          dest: '<%= yeoman.tmp %>'
          ext: '.html'
        ]
      tmp_prepared_script:
        files: [
          expand: true
          cwd: '<%= yeoman.tmp %>'
          src: '**/*.coffee'
          dest: '<%= yeoman.tmp %>'
          ext: '.preprocessed.coffee'
        ]
      src_demo_html:
        files: [
          expand: true
          cwd: '<%= yeoman.src %>/demo'
          src: '**/*.{htm,html}'
          dest: 'demo'
          ext: '.html'
        ]
      src_demo_tmp_script:
        files: [
          expand: true
          cwd: '<%= yeoman.src %>/demo'
          src: '**/*.coffee'
          dest: '<%= yeoman.tmp %>/demo'
          ext: '.preprocessed.coffee'
        ]

    #################################################
    #                  copy helper                  #
    #################################################

    copy:
      json_src_tmp:
        files: [
          expand: true
          cwd: '<%= yeoman.src %>'
          src: '**/*.json'
          dest: '<%= yeoman.tmp %>'
        ]
      images:
        files: [
          expand: true
          cwd: '<%= yeoman.src %>'
          src: ['**/*.png', '**/*.svg']
          dest: 'dist/components'
        ]

    #################################################
    #                    scripts                    #
    #################################################

    coffee:
      tmp_preprocessed:
        options:
          bare: true
          sourceMap: false
          sourceRoot: ''
        files: [
          expand: true
          cwd: '<%= yeoman.tmp %>'
          src: ['**/*.preprocessed.coffee','!demo/**']
          dest: '<%= yeoman.tmp %>'
          ext: '.js'
        ]
      tmp_preprocessed_demo:
        options:
          sourceMap: false
          sourceRoot: ''
        files: [
          expand: true
          cwd: '<%= yeoman.tmp %>/demo'
          src: '**/*.preprocessed.coffee'
          dest: 'demo'
          ext: '.js'
        ]

    uglify:
      dist:
        files: [
          expand: true
          cwd: 'repositories'
          src: '**/dist/**/*.js'
          dest: 'repositories'
          ext: '.min.js'
        ]

    #################################################
    #                    polymer                    #
    #################################################

    components_prepare:
      src_tmp:
        options:
          script_name: 'script.coffee'
        files: [
          expand: true
          cwd: '<%= yeoman.src %>'
          src: '**/component.json'
          dest: '<%= yeoman.tmp %>/'
          ext: '.js'
        ]

    components_build:
      tmp_dist:
        options:
          html: 'template.html'
          script: 'script.js'
          style: 'style.css'
        files: [
          expand: true
          cwd: '<%= yeoman.tmp %>'
          src: ['**/component.json']
          dest: '<%= yeoman.dist %>/'
        ]

  grunt.registerMultiTask 'components_prepare', 'process json files', (target)->
    GRUNT_COMPONENT_NAME = '#GRUNT_COMPONENT_NAME'
    task_options = this.options()
    script_name = task_options.script_name or 'script.js'
    this.files.forEach (file)->
      json_src = require('path').parse file.src[0]
      json_dst = require('path').parse file.dest
      component = grunt.file.readJSON file.src[0]
      script_path = "#{json_src.dir}/#{script_name}"
      script_content = grunt.file.read script_path
      #TODO control name hyphen and report
      fixed_content = script_content.replace GRUNT_COMPONENT_NAME, component.name
      script_path_dest = "#{json_dst.dir}/#{script_name}"
      grunt.file.write script_path_dest, fixed_content

  grunt.registerMultiTask 'components_build', 'becomes files into polymer components', ()->
    task_options = this.options()
    new_line= '\n'
    new_line_re= /\n(?=[^\n$])/g
    indent= '  '

    mkindent = (text, amount)->
      amount = if amount > 0 then amount else 0
      space = ''
      while amount--
        space += indent
      space + text.replace(new_line_re, new_line + space)
    if task_options.compress
      new_line = indent = ''
      mkindent = (text, amount)-> text
    mkimport = (src)->"<link rel=\"import\" href=\"#{src}\">"
    mkdependency = (src)->"<script type=\"text/javascript\" src=\"#{src}\"></script>"
    mktag = (name, content, margin)->
      margin = margin or 0
      open_tag = '<'+name+'>'
      close_tag = '</'+name+'>'
      mkindent(open_tag, margin)+
      new_line +
      mkindent(content, margin+1) +
      new_line +
      mkindent(close_tag, margin)+
      new_line
    this.files.forEach (file)->
      json_src = require('path').parse file.src[0]
      json_dst = require('path').parse file.dest
      component = grunt.file.readJSON file.src[0]

      content = ''
      imports = component.imports or []
      for external_component in imports
        content += mkimport(external_component) + new_line
      dependencies = component.require or []
      for external_dependency in dependencies
        content += mkdependency(external_dependency) + new_line

      content += "<dom-module id=\"#{component.name}\">" + new_line

      style_path = "#{json_src.dir}/#{task_options.style}"
      style_content = grunt.file.read style_path
      style_tag = mktag 'style', style_content

      html_path = "#{json_src.dir}/#{task_options.html}"
      html_content = grunt.file.read html_path
      style_embedded = style_tag + new_line + html_content
      content += mktag 'template', style_embedded, 1

      script_path = "#{json_src.dir}/#{task_options.script}"
      script_content = grunt.file.read script_path
      content += mktag 'script', script_content, 1

      content += "</dom-module>"
      #grunt.log.write content

      reg_exp = new RegExp(component.name + '\/?$')
      if reg_exp.test json_dst.dir
        grunt.log.write 'replacing directory by file: ' + json_src.dir + '\n'
        file_dest = json_dst.dir.replace(reg_exp, '') + component.name + '.html'
      else
        grunt.log.write 'creating file into directory: ' + json_src.dir + '\n'
        file_dest = json_dst.dir + '/' + component.name + '.html'

      grunt.log.write 'file: ' + file_dest + '\n'

      grunt.file.write file_dest, content

      #grunt.log.write reg_exp  + '\n'
      #grunt.log.writeflags json_src
      #grunt.log.write json_src.dir + ' is equal ' + component.name + '\n'
      #mkimport('index.html')


  grunt.registerTask 'symlinks', (target) ->
    cwd = 'bower_components/' + app_name
    commands = [
      'rm -rf ' + cwd
      'mkdir -p ' + cwd
      'ln -s ../../demo ' + cwd + '/demo'
      'ln -s ../../dist ' + cwd + '/dist'
    ]
    for command in commands
      grunt.log.write command + '\n'
      exec command, cdw: __dirname

  grunt.registerTask 'scripts', (target) ->
    switch target
      when 'components'
        grunt.task.run [
          'components_prepare:src_tmp'
          'preprocess:tmp_prepared_script'
          'coffee:tmp_preprocessed'
        ]
      when 'demo'
        grunt.task.run [
          'preprocess:src_demo_tmp_script'
          'coffee:tmp_preprocessed_demo'
        ]

  grunt.registerTask 'html', (target) ->
    switch target
      when 'components'
        grunt.task.run [
          'preprocess:src_tmp_html'
        ]
      when 'demo'
        grunt.task.run [
          'preprocess:src_demo_html'
        ]

  grunt.registerTask 'demo', (target) ->
    grunt.task.run [
      'clean:dist_demo'
      'html:demo'
      'scripts:demo'
      'sass:demo'
    ]

  grunt.registerTask 'server', (target) ->
    grunt.task.run [
      'clean:dist'
      'clean:tmp'
      'copy:images'
      'copy:json_src_tmp'
      'preprocess:src_tmp_html'
      'scripts:components'
      'sass:src_tmp'
      'components_build:tmp_dist'
      'demo'
      'symlinks'
      'vulcanize'
      'minifyPolymer'
      'connect:livereload'
      'open'
      'watch'
    ]
