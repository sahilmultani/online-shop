module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        sass: {
			dist: {
				files: {					
					'wp-content/themes/prj_online_shop/assets/css/home.css': 'wp-content/themes/prj_online_shop/assets/scss/home.scss',
				}
			}
		},
        watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		}
    });

    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["watch"]);
};
