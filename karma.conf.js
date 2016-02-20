module.exports = function(config){
  config.set({

    basePath : '',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-messages/angular-messages.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/bower_components/angular-material/angular-material-mocks.js',
      'app/bower_components/ng-range-slider/dist/ng-range-slider.js',
      'app/modules/app.js',
      'app/modules/search/search.js',
      'app/modules/search/controllers/search.controller.js',
      'app/modules/search/services/search.service.js',
      'app/modules/search/filters/range.filter.js',
      'tests/specs/**/*.spec.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
