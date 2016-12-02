module.exports = function(app){
  var habilityController = app.controllers.habilityController;

  app.post('/v1/habilities', habilityController.create);
  app.delete('/v1/habilities/:id', habilityController.delete);

  app.put('/v1/habilities/:id', habilityController.update);
  app.get('/v1/habilities/list', habilityController.list);

  app.get('/v1/habilities/:id', habilityController.findOne);
}
