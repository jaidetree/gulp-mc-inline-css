# gulp-inline-css [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]
> Takes HTML style tags and converts it to inline CSS using MailChimp's CSS Inliner API for Gulp 3

## Usage

First, install `gulp-mc-inline-css` as a development dependency:

```shell
npm install --save-dev gulp-mc-inline-css
```

Then, add it to your `gulpfile.js`:

```javascript
var inline = require('gulp-mc-inline-css');

gulp.task('inliner', function() {
  gulp.src('client/html/*.html')
    .pipe(inline(APIKEY))
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
  .pipe(inline(config.APIKEY))
  .pipe(gulp.dest('dist/email'));
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

[travis-url]: http://travis-ci.org/jayzawrotny/gulp-mc-inline-css
[travis-image]: https://secure.travis-ci.org/jayzawrotny/gulp-mc-inline-css.png?branch=master
[npm-url]: https://npmjs.org/package/gulp-mc-inline-css
[npm-image]: https://badge.fury.io/js/gulp-mc-inline-css.png
