var inline = require('../');
var should = require('should');
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;
var config = require('../config/mailchimp.json');
var path = require('path');
require('mocha');

describe('gulp-inline-css', function () {
  describe('inline()', function () {
    
    it('should make the CSS inline and remove the style tag from the head', function (done) {
      var stream = inline(config.APIKEY, true);
      var fakeFile = new File({
        cwd: './test',
        base: './test',
        path: './test/file.html',
        contents: new Buffer('<html><head><style type="text/css">div{background: #000; color: #fff;}</style></head><body><div>Hello World</div></body></html>')
      });

      stream.on('data', function (newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        var newFilePath = path.resolve(newFile.path);
        var expectedFilePath = path.resolve('./test/file.html');
        newFilePath.should.equal(expectedFilePath);

        newFile.relative.should.equal('file.html');
        String(newFile.contents).should.containDeep('div style="');
        String(newFile.contents).should.not.containDeep('<style');
        Buffer.isBuffer(newFile.contents).should.equal(true);
        done();
      });
      stream.write(fakeFile);
      stream.end();
    });

    it('should make the CSS inline and keep the style tag in the head', function (done) {
      var stream = inline(config.APIKEY, false);
      var fakeFile = new File({
        cwd: './test',
        base: './test',
        path: './test/file.html',
        contents: new Buffer('<html><head><style type="text/css">div{background: #000; color: #fff;}</style></head><body><div>Hello World</div></body></html>')
      });

      stream.on('data', function (newFile) {
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        var newFilePath = path.resolve(newFile.path);
        var expectedFilePath = path.resolve('./test/file.html');
        newFilePath.should.equal(expectedFilePath);

        newFile.relative.should.equal('file.html');
        String(newFile.contents).should.containDeep('div style="');
        String(newFile.contents).should.containDeep('<style');
        Buffer.isBuffer(newFile.contents).should.equal(true);
        done();
      });
      stream.write(fakeFile);
      stream.end();
    });

  });
});


