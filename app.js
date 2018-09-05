var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// insert code here

app.get('/heartbeat', function(req, res) {
  res.send("Application Heartbeat: the application is running");
});

app.post('/heartbeat', function(req, res) {
  res.send("Cannot post to heartbeat");
});

app.put('/heartbeat', function(req, res) {
  res.send("Cannot put to heartbeat");
});
app.delete('/heartbeat', function(req, res) {
  res.send("Cannot delete heartbeat");
});

app.get('/heartbeat/format/index.html', function(req, res) {
  res.send("HTML: Application Heartbeat");
});

app.get('/heartbeat/subpath/*', function(req, res) {
  res.send(req.url);
});

app.get('/people/:username', function(req, res) {
	var username = req.params.username;
	res.send("You requested user " + username);
});

app.get('/blog/posts/:id', function(req, res) {
	var postID = req.params.id;
	res.send("You requested blog post " + postID);
});

app.get('/blog/posts/:id/update', function(req, res) {
	var postID = req.params.id;
	res.send("You want to update blog post " + postID);
});

app.get('/blog/posts/:id/delete', function(req, res) {
	var postID = req.params.id;
	res.send("You want to delete blog post " + postID);
});

app.get('/blog/posts/:id/comments', function(req, res) {
	var postID = req.params.id;
	res.send("You want to view the blog post's commments " + postID);
});

app.get('/blog/posts/:postid/comments/:commentid', function(req, res) {
	var postID = req.params.postid;
	var commentID = req.params.commentid;
	res.send("You want to view the comment " + commentID + " for blog post " + postID);
});

// end insert code

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
