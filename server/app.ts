import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import { connect } from 'mongoose';
import { linksRouter } from './routes/links.routes';
import { usersRouter } from './routes/users.routes';
import { indexRouter } from './routes/index.routes';
import { mongoUri } from './config/config';

const app: express.Application = express();
app.disable('x-powered-by');
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api', linksRouter);
app.use('/api', usersRouter);
app.use('/', indexRouter);

// CONNECT TO MONGODB -------------------------------
connect(mongoUri, (err) => {
  if (err) {
    console.log('Could not connect to MongoDB!');
  }
});


if (app.get('env') === 'production') {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../client')));
}

// catch 404 and forward to error handler
// app.use(function (req: express.Request, res: express.Response, next) {
app.use(function (req, res, next) {
  next(new Error('Not Found'));
});

// production error handler
// no stacktrace leaked to user
// app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
app.use(function (err: any, req, res, next) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

// var port = process.env.PORT || config.port;

// app.listen(port, () => console.log('Server started on port ' + port));

export { app }
