var through = require('through2');
var gutil = require('gulp-util');
var MailChimpAPI = require('mailchimp').MailChimpAPI;
var PluginError = gutil.PluginError;
var path = require('path');
var api;

// Consts
const PLUGIN_NAME = 'gulp-inline-css';

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}


function gulpInlineCSS(apikey, opt) {
  if (!apikey) {
    throw new PluginError(PLUGIN_NAME, "Missing MailChimp API Key");
  }
  if (!opt) opt = {};
  
  try { 
    api = new MailChimpAPI(apikey, { version : '2.0' });
  } catch (error) {
    console.log(error.message);
  }

  // Creating a stream through which each file will pass
  var stream = through.obj(function (file, enc, callback) {
    if (file.isNull()) {
      this.push(file); // Do nothing if no contents
      return callback();
    }

    if (file.isBuffer()) {
      gutil.log('Inlining CSS of', gutil.colors.magenta(file.path) + '...');
      api.call('helper', 'inline-css', { 'html': file.contents.toString('utf8'), 'strip_css': true  }, function (error, data) {
        if (error) {
          // TODO: Emit an error message
          console.log(error.message);
        } else {
          // file.path = gutil.replaceExtension(file.path, '.email');
          gutil.log(gutil.colors.magenta(path.basename(file.path)), 'was', gutil.colors.green('inlined'));
          file.contents = new Buffer(data.html);
        }
        this.push(file);
        return callback();
      }.bind(this));
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(prefixStream(prefixText));
      this.push(file);
      return callback();
    }
  });

  // returning the file stream
  return stream;
}

// Exporting the plugin main function
module.exports = gulpInlineCSS;
