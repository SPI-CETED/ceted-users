var models = require('../models');
var Hability = models.Hability;


module.exports = function(app) {

    var HabiltyController = {

        create : function(req, res){
          Hability.build(req.body).save().then(function(hability){

      			habilityCreated(hability, res);

      		}).catch(function(error){

      			errorCreatingHability(res, error);

      		});
        },

        delete : function(req, res){
            Hability.destroy({where: {id: req.params.id}}).then(function(){
                habilityDeleted(res);
            });
        },

        update: function(req, res){
          Hability.findOne({where: {id: req.params.id}}).then(function(hability){
            if(hability){
              hability.updateAttributes(req.body).then(function(hability){
                habilityUpdated(hability, res);
              }).catch(function(error){
                errorCreatingHability(res, error);
              });
            }else{
              habilityNotFound(res);
            }
          });
        },

        list: function(req, res){
          var limit = req.query.limit || 10;
          limit = parseInt(limit);
          var offset = req.query.offset || 0;
          offset = parseInt(offset);

          Hability.findAll({
            limit: limit,
            offset: offset,
            order: 'id DESC'
          }).then(function(habilities){
            var data = {};
            data.result = habilities;
            data.limit = limit;
            data.offset = offset;
            res.status(200).json(data);
          })
        }

    };

    var habilityFound = function(user, res){
      buildResponse(res, 200, 'Hability Found', user);
    };

    var habilityCreated = function(hability, res){
        buildResponse(res, 201, 'Hability Created', hability);
    };

    var habilityDeleted = function(res){
        buildResponse(res, 200, 'Hability Deleted');
    };

    var errorCreatingHability = function(res, err){
        buildResponse(res, 500, 'Hability not Created', null, err);
    };

    var habilityUpdated = function(hability, res){
      buildResponse(res, 201, 'Hability Updated', hability);
    };

    var errorUpdatingHability = function(res, err){
      buildResponse(res, 500, 'Hability not Updated', null, err);
    };

    var habilityNotFound = function(res){
      buildResponse(res, 404, 'Hability Not Found');
    };

    var buildResponse = function(res, statusCode, message, hability, error){
        var jsonResponse = {};
        if(!!message){
            jsonResponse.message = message;
        }
        if(!!hability){
            jsonResponse.hability = hability;
        }
        if(!!error){
            jsonResponse.error = error;
        }

        res.status(statusCode).json(jsonResponse);
    }

    return HabiltyController;

}
