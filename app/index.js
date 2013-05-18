'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var JekyllGenerator = module.exports = function JekyllGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    // setup the test-framework property, Gruntfile template will need this
    this.testFramework = options['test-framework'] || 'mocha';

    // for hooks to resolve on mocha by default
    if (!options['test-framework']) {
        options['test-framework'] = 'mocha';
    }
    // resolved to mocha by default (could be switched to jasmine for instance)
    this.hookFor('test-framework', { as: 'app' });

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
    this.layoutFile = this.readFileAsString(path.join(this.sourceRoot(), '_layouts/default.html'));
    this.mainJsFile = '';

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(JekyllGenerator, yeoman.generators.NamedBase);

JekyllGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // welcome message
    var welcome =
    '\n     _-----_' +
    '\n    |       |' +
    '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
    '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
    '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
    '\n    /___A___\\   \'__________________________\'' +
    '\n     |  ~  |'.yellow +
    '\n   __' + '\'.___.\''.yellow + '__' +
    '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

    console.log(welcome);

    var prompts = [{
        name: 'someOption',
        message: 'Would you like to enable this option?',
        default: 'Y/n',
        warning: 'Yes: Enabling this will be totally awesome!'
    }];

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }

        this.someOption = (/y/i).test(props.someOption);

        cb();
    }.bind(this));

    this.bootstrap = false;
    this.fontawesome = false;

};

JekyllGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

JekyllGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

JekyllGenerator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

JekyllGenerator.prototype.bower = function bower() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

JekyllGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

JekyllGenerator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

JekyllGenerator.prototype.h5bp = function h5bp() {
    this.copy('favicon.ico', 'app/favicon.ico');
    this.copy('404.html', 'app/404.html');
    this.copy('robots.txt', 'app/robots.txt');
    this.copy('htaccess', 'app/.htaccess');
};

JekyllGenerator.prototype.mainStylesheet = function mainStylesheet() {
    if (this.bootstrap) {
        var css = css + '@import "../bower_components/bootstrap/less/bootstrap.less";\n@import "../bower_components/bootstrap/less/responsive.less"; // Don\'t forget to comment lines 22 to remove the second import call to **mixin.less**\n\n';

        if (this.fontawesome) {
            css = css + '@import "../bower_components/font-awesome/less/font-awesome.less";\n@FontAwesomePath: "../fonts";\n';
        } else {
            css = css + '@iconSpritePath: "../images/glyphicons-halflings.png";\n@iconWhiteSpritePath: "../images/glyphicons-halflings-white.png";\n\n';
        }
        css = css + '.hero-unit {\n  margin: 50px auto 0 auto;\n}';
        this.write('app/assets/styles/main.less', css);
    } else {
        this.copy('h5bp.css', 'app/assets/styles/h5bp.css');
        this.layoutFile = this.appendStyles(this.layoutFile, '/assets/styles/main.css', [
            '/bower_components/normalize-css/normalize.css',
            '/assets/styles/h5bp.css'
        ]);

    }

};

JekyllGenerator.prototype.writeIndex = function writeIndex() {
    // prepare default content text
    var defaults = ['HTML5 Boilerplate'];
    var contentText = [
        '        <div class="container">',
        '            <div class="hero-unit">',
        '                <h1>\'Allo, \'Allo!</h1>',
        '                <p>You now have</p>',
        '                <ul>'
    ];

    this.layoutFile = this.appendScripts(this.layoutFile, '/assets/scripts/main.js', [
        '/bower_components/jquery/jquery.js',
        '/assets/scripts/main.js'
    ]);


    if (this.bootstrap) {
        // wire Twitter Bootstrap plugins
        this.layoutFile = this.appendScripts(this.layoutFile, '/assets/scripts/vendor/bootstrap.js', [
            '/bower_components/bootstrap/js/bootstrap-affix.js',
            '/bower_components/bootstrap/js/bootstrap-alert.js',
            '/bower_components/bootstrap/js/bootstrap-dropdown.js',
            '/bower_components/bootstrap/js/bootstrap-tooltip.js',
            '/bower_components/bootstrap/js/bootstrap-modal.js',
            '/bower_components/bootstrap/js/bootstrap-transition.js',
            '/bower_components/bootstrap/js/bootstrap-button.js',
            '/bower_components/bootstrap/js/bootstrap-popover.js',
            '/bower_components/bootstrap/js/bootstrap-typeahead.js',
            '/bower_components/bootstrap/js/bootstrap-carousel.js',
            '/bower_components/bootstrap/js/bootstrap-scrollspy.js',
            '/bower_components/bootstrap/js/bootstrap-collapse.js',
            '/bower_components/bootstrap/js/bootstrap-tab.js'
        ]);
    }

    if (this.fontawesome) {
        defaults.push('Font Awesome');
    }
    if (this.bootstrap) {
        defaults.push('Twitter Bootstrap');
    }

    this.mainJsFile = 'console.log(\'\\\'Allo \\\'Allo!\');';

    // iterate over defaults and create content string
    defaults.forEach(function (el) {
        contentText.push('                    <li>' + el  + '</li>');
    });

    contentText = contentText.concat([
        '                </ul>',
        '                <p>installed.</p>',
        '                <h3>Enjoy coding! - Yeoman</h3>',
        '            </div>',
        '        </div>',
        ''
    ]);

    // append the default content
    this.indexFile = this.indexFile.replace('<generated-content>', contentText.join('\n'));
};

JekyllGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/assets/scripts');
    this.mkdir('app/assets/styles');
    this.mkdir('app/assets/images');
    this.mkdir('app/assets/fonts');
    this.mkdir('app/_includes');
    this.mkdir('app/_plugins');
    this.copy('_layouts/post.html', 'app/_layouts/post.html');
    this.directory('_posts', 'app/_posts');
    this.write('app/_layouts/default.html', this.layoutFile);
    this.write('app/index.html', this.indexFile);
    this.write('app/assets/scripts/main.js', this.mainJsFile);
};
