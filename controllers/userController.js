var models = require('../models');
//var jsonUtils = require('../utils/jsonUtils');
var q = require('q');
var User = models.User;

module.exports = function(app) {

  var cryptService = app.services.cryptService;

  var UserController = {

    findById: function(req, res){
      res.json(User.build({email: 'teste', password: 'teste'}));
    },

    authenticate: function(req, res){
      var email = req.query.email;
      var password = req.query.password;

      if(!email || !password){
        emailOrPasswordEmpyt(res);
        return;
      }

      User.findOne({where: {email: email}}).then(function(user){
        if(user){
          if(cryptService.comparePassword(password, user.get('password'))){
            userFound(user, res);
          }else {
            wrongPassword(res);
          }
        }else {
          userNotFound(res);
        }
      });
    },

    create: function(req, res){

    	cryptService.cryptPassword(req.body.password).then(function(hashedPassword){
    		User.build({email: req.body.email, password: hashedPassword, userName: req.body.userName}).save().then(function(user){

    			userCreated(user, res);

    		}).catch(function(error){

    			errorCreatingUser(res, error);

    		});

    	});
    }

  };

  var userCreated = function(user, res){
    buildResponse(res, 201, 'User Created', user);
  };

  var userFound = function(user, res){
    buildResponse(res, 200, 'User Found', user);
  };

  var userNotFound = function(res){
    buildResponse(res, 404, 'User Not Found');
  };

  var wrongPassword = function(res){
    buildResponse(res, 400, 'Wrong Password');
  };

  var emailOrPasswordEmpyt = function(res){
    buildResponse(res, 400, 'Email e Senha são obrigatórios');
  }

  var errorCreatingUser = function(res, err){
    buildResponse(res, 500, 'User not Created', null, error);
  };

  var buildResponse = function(res, statusCode, message, user, error){
    var jsonResponse = {};
    if(!!message){
      jsonResponse.message = message;
    }
    if(!!user){
      jsonResponse.user = user;
    }
    if(!!error){
      jsonResponse.error = error;
    }
    res.status(statusCode).json(jsonResponse);
  }

  var buildUserFilterJson = function(json){
    var defer = q.defer();

    var filterJson = {};

    if(json.email){
      filterJson.email = json.email;
    }
    if(json.id){
      filterJson.id = json.id;
    }

    defer.resolve(filterJson);

    return defer.promise;
  };

  return UserController;
}
