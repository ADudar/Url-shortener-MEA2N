
var express    = require('express'),
    bodyParser = require('body-parser');
    mongoose = require('mongoose'),
    linksRoutes = require('./routes/links.routes'),
    usersRoutes = require('./routes/users.routes'),
    indexRoutes = require('./routes/index.routes'),
    config = require('./config/config'),
    app        = express();  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', linksRoutes);
app.use('/api', usersRoutes);
app.use('/', indexRoutes);

// CONNECT TO MONGODB -------------------------------
mongoose.connect(config.mongoUri, (err) => {
    if (err) console.log('Could not connect to MongoDB!');
});


var port = process.env.PORT || config.port;  

app.listen(port, () => console.log('Server started on port ' + port));