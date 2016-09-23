module.exports = function(app){
  var userController = app.controllers.userController;

  app.get('/v1/profiles/authenticate', userController.authenticate);
  app.get('/v1/profiles/:id', userController.findById);

  app.post('/v1/profiles', userController.create);
}
