var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, {
      type    : 'input',
      name    : 'description',
      message : 'Your project description',
    }, {
      type    : 'input',
      name    : 'author',
      message : 'Author (who are you?)',
      default : this.user.git.name()
    }, {
      type    : 'input',
      name    : 'version',
      message : 'version',
      default : "1.0.0"
    }]).then((answers) => {
      this.userConfig = {
        name: answers.name,
        description: answers.description,
        version: answers.version,
        author: answers.author
      };

    });
  }

  createPackage() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('./package.json'),
      {
        name: this.config.name,
        description: this.description,
        author: this.config.author,
        version: this.config.version
      }
    );
  }

  createIndex() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('./index.html'),
      { name: this.config.name }
    );
  }

  copyDotfiles() {
    this.fs.copy(
      this.templatePath('./.*'),
      this.destinationPath('./')
    );
  }

  copyGulpfile() {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('./gulpfile.js')
    );
  }

  copyDefaultFiles() {
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('./src')
    );
  }

  createEmptyFolders() {
    mkdirp.sync(this.destinationPath('./src/img'));
    mkdirp.sync(this.destinationPath('./img'));
    mkdirp.sync(this.destinationPath('./js'));
    mkdirp.sync(this.destinationPath('./css'));
  }

  install() {
    this.npmInstall();
  }

  end () {
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', "scaffolding"]);

    this.log('Time to start coding! 🤓')
  }

};