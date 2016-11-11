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
        }

    };

    var habilityCreated = function(hability, res){
        buildResponse(res, 201, 'Hability Created', hability);
    };

    var errorCreatingHability = function(res, err){
        buildResponse(res, 500, 'Hability not Created', null, err);
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