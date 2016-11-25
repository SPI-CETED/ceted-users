module.exports = function(app){
  var userController = app.controllers.userController;

  app.post('/v1/users/authenticate', userController.authenticate);
  app.get('/v1/users/list', userController.findAll);
  app.get('/v1/users/:id', userController.findById);

  app.post('/v1/users', userController.create);

  app.put('/v1/users/:id', userController.update);
}
