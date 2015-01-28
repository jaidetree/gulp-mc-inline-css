# gulp-inline-css [![NPM version][npm-image]][npm-url]
> Takes HTML style tags and converts it to inline CSS using MailChimp's CSS Inliner API for Gulp 3

## Usage

First, install `gulp-mc-inline-css` as a development dependency:

```shell
npm install gulp-mc-inline-css --save-dev
```

Create `mailchimp.json` file in the `config` folder and add your MailChimp API key.

```javascript
{
  "APIKEY": "your key goes here"
}
```

Then, require both in your `gulpfile.js`:

```javascript
var inline = require('gulp-mc-inline-css');
var config = require('config/mailchimp');

gulp.task('inliner', function() {
  gulp.src('client/html/*.html')
    .pipe(inline(config.APIKEY))
    .pipe(gulp.dest('dist/email'));
});
```

<small><em>To run tests: `npm test`. Requires mocha to be installed globally. `npm install mocha -g`</em></small>

## API

### inliner(APIKEY, stripCSS)

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
gulp.src('client/*.html')
  .pipe(inline(config.APIKEY))
  .pipe(gulp.dest('dist/email.html'));
```
#### stripCSS
Type: `boolean`
Default: `false`

Boolean value indicating to the MailChimp API whether to strip CSS from the head tag.

```javascript
var config = require('./config.json');
gulp.src('client/*.html')
  .pipe(inline(config.APIKEY, true))
  .pipe(gulp.dest('dist/email.html'));
```

## Results

Converts the below HTML to the following with stripCSS set to `false`.

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
    <style>
      div { color: #fff; background: #000; }
    </style>
  </head>
  <body>
    <div style="color:#fff;background:#000;">Hello World</div> 
  </body>
</html>
```

***

Converts the below HTML to the following with stripCSS set to `true`.

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
