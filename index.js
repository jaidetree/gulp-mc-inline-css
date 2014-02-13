var through = require('through2');
var gutil = require('gulp-util');
var MailChimpAPI = require('mailchimp').MailChimpAPI;
var PluginError = gutil.PluginError;
var api;

// Consts
const PLUGIN_NAME = 'gulp-inline-css';

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}


// Plugin level function (dealing with files)
function gulpInlineCSS(apikey, opt) {
  if (!apikey) {
    throw new PluginError(PLUGIN_NAME, "Missing MailChimp API Key");
  }
  if (!opt) opt = {};

  //prefixText = new Buffer(prefixText); // allocate ahead of time
  
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
      // file.contents = Buffer.concat([file.contents]);
      gutil.log('Inlining CSS of', gutil.colors.magenta(path.file));
      api.call('helper', 'inline-css', { 'html': file.contents.toString('utf8'), 'strip_css': true  }, function (error, data) {
        if (error) {
          console.log(error.message);
        } else {
          //console.log(JSON.stringify(data)); // Do something with your data!
          file.path = gutil.replaceExtension(file.path, '.email');
          file.contents = new Buffer(data.html);
          this.push(file);
          return callback();
        }
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
};

// Exporting the plugin main function
module.exports = gulpInlineCSS;
