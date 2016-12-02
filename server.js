var express        = require('express');
var app            = express();
var load           = require('express-load');
var bodyParser     = require('body-parser');
var router         = express.Router();
var models = require("./models");

app.all('*', function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, x-youmovin-app-token, MerchantId, MerchantKey");
        res.header("Access-Control-Expose-Headers", "X-TokenRefreshed");
		res.header('Cache-Control', 'no-cache');
		next();
	});

app.set('router', router);
app.use(router);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

load('./services')
	.then('./controllers')
	.then('./routes')
	.into(app);

var http = require('http').Server(app);

var port = process.env.PORT || 8084;

models.sequelize.sync().then(function () {
  http.listen(port);

  console.log('sw-profile listening on port ' + port);

  exports = module.exports = app;
});
