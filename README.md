# gulp-inline-css [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]
> MailChimp HTML CSS Inline Converter plugin for gulp 3

## Usage

First, install `gulp-inline-css` as a development dependency:

```shell
npm install --save-dev gulp-inline-css
```

Then, add it to your `gulpfile.js`:

```javascript
var inline = require('gulp-inline-css');

gulp.task('inliner', function() {
  gulp.src('client/html/*.html')
    .pipe(inliner(APIKEY))
    .pipe(gulp.dest('dist/email');
});
```

## API

### inliner(APIKEY)

#### APIKEY
Type: `String`

A required string containing your MailChimp API Key. A best practice is to create a config.json file with an APIKEY and call inliner like so:

```json
{
 "APIKEY": "zowizjzowjoij#example#madeup#key"
}
```

```javascript
var config = require('./config.json');
gulp.src('client/css/*.css')
  .pipe(inliner(config.APIKEY))
  .pipe(csslint.reporter());
```

## Results

Converts the below HTML to the following

```HTML
<html>
  <head>
    <style>
      div { color: #fff; background: #000; }
    </style>
  </head>
  <body>
    <div>Hello World</div> 
  </body>
</html>
```

to

```HTML
<html>
  <head>

  </head>
  <body>
    <div style="color:#fff;background:#000;">Hello World</div> 
  </body>
</html>
```

[travis-url]: http://travis-ci.org/jayzawrotny/gulp-inline-css
[travis-image]: https://secure.travis-ci.org/lazd/gulp-inline-css.png?branch=master
[npm-url]: https://npmjs.org/package/gulp-inline-css
[npm-image]: https://badge.fury.io/js/gulp-inline-css.png
