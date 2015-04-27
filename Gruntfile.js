module.exports = function(grunt) {
	grunt.initConfig({
    stylus: {
      compile: {
        options: {
          paths: ['src/stylus'],
					compress: false
        },
        files: {
          'src/css/style.css': 'src/stylus/style.styl'
        }
      }
    },
		watch: {
      stylus: {
        files: ['src/stylus/**/*'],
        tasks: ['stylus:compile'],   // This needs to be "tasks" (not "task")
        options: { livereload: true }
      },
			jade: {
				files: ['src/jade/**/*'],
				tasks: ['jade:compile'],
				options: { livereload: true }
			}
		},
		jade: {
			compile: {
    		options: {
      		data: {
        		debug: true
      		},
					pretty: true
    		},
    		files: {
      		"src/index.html": ["src/jade/*.jade"]
    		}
  		}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['stylus', 'jade', 'watch']);
};
