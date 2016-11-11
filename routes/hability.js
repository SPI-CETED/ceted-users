module.exports = function(app){
  var habilityController = app.controllers.habilityController;

  app.post('/v1/habilities', habilityController.create);
  app.delete('/v1/habilities/:id', habilityController.delete);
}
