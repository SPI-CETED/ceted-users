module.exports = function(app){
  var userController = app.controllers.userController;

  app.get('/v1/users/authenticate', userController.authenticate);
  app.get('/v1/users/:id', userController.findById);

  app.post('/v1/users', userController.create);
}