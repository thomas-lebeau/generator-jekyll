/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('jekyll generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('jekyll:app', [
                '../../app', [
                    helpers.createDummyGenerator(),
                    'mocha:app'
                ]
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            ['bower.json', /"name": "temp"/],
            ['package.json', /"name": "temp"/],
            'Gruntfile.js',
            'app/404.html',
            'app/favicon.ico',
            'app/robots.txt',
            'app/index.html',
            'app/assets/scripts/main.js'
        ];

        helpers.mockPrompt(this.app, {
            'someOption': 'Y'
        });

        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
