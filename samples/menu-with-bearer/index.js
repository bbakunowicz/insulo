var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var apiRouter = require('./routes/api');

var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

module.exports = app;
