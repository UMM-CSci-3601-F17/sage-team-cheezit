module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            { pattern: 'src/test.js', watched: false }
        ],
        exclude: [

        ],
        preprocessors: {
            'src/test.js': ['webpack', 'sourcemap']
        },
        webpack: require('./webpack.test.js'),
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    })
}