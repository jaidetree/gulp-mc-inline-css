var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-inline-css';

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}

// Plugin level function (dealing with files)
function gulpInlineCSS(apikey, opts) {
  if (!apikey) {
    throw PluginError(PLUGIN_NAME, "Missing MailChimp API Key");
  }
  prefixText = new Buffer(prefixText); // allocate ahead of time

  // Creating a stream through which each file will pass
  var stream = through.obj(function (file, enc, callback) {
    if (file.isNull()) {
      this.push(file); // Do nothing if no contents
      return callback();
    }

    if (file.isBuffer()) {
      file.contents = Buffer.concat([prefixText, file.contents]);
      this.push(file);
      return callback();
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
